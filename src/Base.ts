import { create } from 'xmlbuilder2';

import IBaseOptions from './interface/IBaseOptions';
import ICompilerOptions from './lib/interface/ICompilerOptions';
import { IProsodyOptions, ISayAsOptions, IExpressAsOptions, IEmotionOptions, IAudioOptions, IPhonemeOptions, IEffectOptions, IVoiceOptions } from './elements/interface';
import ServiceProvider from './enums/ServiceProvoder';
import Compiler from './lib/Compiler';
import Element from './elements/Element';
import util from './lib/util';

class Base {

    compile?: boolean;  //是否编译
    debug?: boolean;  //是否为调试模式
    compilerOptions?: ICompilerOptions;  //编译器选项

    constructor(options?: IBaseOptions, compilerOptions?: ICompilerOptions) {
        if(!options) return;
        this.optionsInject(options, {
            compile: util.booleanParse,
            debug: util.booleanParse
        }, {
            compile: util.isBoolean,
            debug: util.isBoolean
        });
        this.compilerOptions = { ...compilerOptions, debug: this.debug };
    }

    optionsCompile(options: any) {
        const compilerOptions = this.compilerOptions || {};
        compilerOptions.debug = this.debug;
        return new Compiler(compilerOptions).compile(options);
    }

    optionsInject(options: any = {}, initializers: any = {}, checkers: any = {}) {
        if (util.isArray(options))  //如果options为数组则制取首个
            options = options[0];
        const that = this as any;
        Object.keys(that).forEach(key => {
            if (/^_/.test(key) && !/^__/.test(key)) return;
            let value = options[key];
            if (util.isFunction(initializers[key])) value = initializers[key](value);
            if (util.isFunction(checkers[key]) && !checkers[key](value)) {
                if (util.isUndefined(that[key]) && util.isUndefined(options[key])) return;
                console.warn("invalid options:", options);
                throw new Error(`parameter ${key} invalid`);
            };
            if ((!util.isFunction(initializers[key]) && !util.isFunction(checkers[key])) || util.isUndefined(value)) return;
            that[key] = value;
        });
    }

    optionsExport(provider?: ServiceProvider | string, _excludeAttrNames?: string[]) {
        const excludeAttrNames = ["type", "children", "content", "provider", "compile", "debug", "compilerOptions", ...(_excludeAttrNames || [])];
        const options: any = {};
        for(let key in this) {
            if(excludeAttrNames.indexOf(key) !== -1)
                continue;
            const targetKey = ({
                __type: "type",
                __value: "value"
              } as any)[key] || key;
            options[targetKey] = this[key];
        }
        return options;
    }
    
    createRootTag(name?: string, attrs?: any) {
        return name ? create().ele(name, attrs) : create();
    }

    appendChild(node: any) {}

    voice(name: string, options?: IVoiceOptions, compile?: boolean) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Voice, ...options, name, compile });
        this.appendChild(node);
        return node;
    }

    prosody(options: IProsodyOptions, compile?: boolean) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Prosody, ...options, compile });
        this.appendChild(node);
        return node;
    }

    effect(options: IEffectOptions, compile?: boolean) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Effect, ...options, compile });
        this.appendChild(node);
        return node;
    }

    say(content: string, compile?: boolean) {
        this.appendChild(Element.create({ type: Element.Type.Raw, value: `${content}`, compile }));
        return this;
    }

    sayAs(options: ISayAsOptions, compile?: boolean): Base;
    sayAs(content: string, options?: ISayAsOptions, compile?: boolean): Base;
    sayAs(...args: any[]) {
        let content, options: ISayAsOptions, compile;
        if(util.isString(args[0]))
            ([content, options, compile] = args);
        else
            ([options, compile] = args);
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.SayAs,
            ["interpret-as"]: options.interpret || options.interpretAs,
            ...options,
            compile
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return this;
    }

    expressAs(options: IExpressAsOptions, compile?: boolean): Element;
    expressAs(content: string, options?: IExpressAsOptions, compile?: boolean): Element;
    expressAs(...args: any[]) {
        let content, options, compile;
        if(util.isString(args[0]))
            ([content, options, compile] = args);
        else
            ([options, compile] = args);
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.ExpressAs,
            ...options,
            compile
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return node;
    }

    emotion(options: IEmotionOptions, compile?: boolean): Element;
    emotion(content: string, options?: IEmotionOptions, compile?: boolean): Element;
    emotion(...args: any[]) {
        let content, options, compile;
        if(util.isString(args[0]))
            ([content, options, compile] = args);
        else
            ([options, compile] = args);
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.Emotion,
            ...options,
            compile
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return node;
    }

    emphasis(level: string, compile?: boolean): Base;
    emphasis(content: string, level?: string, compile?: boolean): Base;
    emphasis(...args: any[]) {
        let content, level, compile;
        if(util.isString(args[0]))
            ([content, level, compile] = args);
        else
            ([level, compile] = args);
        const node = Element.create({ type: Element.Type.Emphasis, level, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }

    p(content?: string, compile?: boolean) {
        const node = Element.create({ type: Element.Type.Paragraph, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return node;
    }

    s(content?: string, compile?: boolean) {
        const node = Element.create({ type: Element.Type.Sentence, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return node;
    }

    w(content?: string, compile?: boolean) {
        const node = Element.create({ type: Element.Type.Word, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }

    sub(alias: string, compile?: boolean): Base;
    sub(content: string, alias: string, compile?: boolean): Base;
    sub(...args: any[]) {
        let content, alias, compile;
        if(util.isString(args[0]))
            ([content, alias, compile] = args);
        else
            ([alias, compile] = args);
        const node = Element.create({ type: Element.Type.Subsitute, alias, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }
    
    phoneme(options: IPhonemeOptions, compile?: boolean): Base
    phoneme(content: string, options?: IPhonemeOptions, compile?: boolean): Base;
    phoneme(...args: any[]) {
        let content, options, compile;
        if(util.isString(args[0]))
            ([content, options, compile] = args);
        else
            ([options, compile] = args);
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Phoneme, ...options, compile })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }

    break(time: any, compile?: boolean) {
        this.appendChild(Element.create({ type: Element.Type.Break, time, compile }));
        return this;
    }

    pause(value: any, compile?: boolean) {
        return this.break(value, compile);
    }

    audio(options: IAudioOptions, compile?: boolean) {
        options = util.isObject(options) ? options : {};
        this.appendChild(Element.create({ type: Element.Type.Audio, ...options, compile }));
        return this;
    }

    action(type: string, compile?: boolean) {
        this.appendChild(Element.create({ type: Element.Type.Action, __type: type, compile }));
        return this;
    }

    toJSON() {
        return util.omit(this, ["compile", "debug", "compilerOptions"]);
    }

}

export default Base;
