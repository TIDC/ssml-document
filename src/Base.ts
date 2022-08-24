import { create } from 'xmlbuilder2';

import IBaseOptions from './interface/IBaseOptions';
import ICompilerOptions from './lib/interface/ICompilerOptions';
import { IProsodyOptions, ISayAsOptions, IExpressAsOptions, IEmotionOptions, IAudioOptions, IPhonemeOptions } from './elements/interface';
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
        this.compilerOptions = compilerOptions;
    }

    optionsCompile(options: any) {
        const compilerOptions = this.compilerOptions || {};
        compilerOptions.debug = this.debug;
        return new Compiler(compilerOptions).compile(options);
    }

    optionsInject(options: any = {}, initializers: any = {}, checkers: any = {}) {
        if(util.isArray(options))  //如果options为数组则制取首个
            options = options[0];
        const that = this as any;
        Object.keys(that).forEach(key => {
            if (/^_/.test(key) && !/^__/.test(key)) return;
            let value = options[key];
            if (util.isFunction(initializers[key])) value = initializers[key](value);
            if (util.isFunction(checkers[key]) && !checkers[key](value)) {
                if(util.isUndefined(that[key]) && util.isUndefined(options[key])) return;
                console.warn("invalid options:", options);
                throw new Error(`parameter ${key} invalid`);
            };
            if ((!util.isFunction(initializers[key]) && !util.isFunction(checkers[key])) || util.isUndefined(value)) return;
            that[key] = value;
        });
    }

    optionsExport(provider?: ServiceProvider, _excludeAttrNames?: string[]) {
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

    prosody(options: IProsodyOptions) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Prosody, ...options });
        this.appendChild(node);
        return node;
    }

    say(content: string) {
        this.appendChild(`${content}`);
        return this;
    }

    sayAs(content: string, options: ISayAsOptions) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.SayAs,
            ["interpret-as"]: options.interpret,
            ...options
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return this;
    }

    expressAs(content: string, options: IExpressAsOptions) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.ExpressAs,
            ...options
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return node;
    }

    emotion(content: string, options: IEmotionOptions) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({
            type: Element.Type.Emotion,
            ...options
        });
        content && node.appendChild(content);
        this.appendChild(node);
        return node;
    }

    p(content?: string) {
        const node = Element.create({ type: Element.Type.Paragraph })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return node;
    }

    s(content?: string) {
        const node = Element.create({ type: Element.Type.Sentence })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return node;
    }

    w(content?: string) {
        const node = Element.create({ type: Element.Type.Word })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }

    sub(content: string, alias: string) {
        const node = Element.create({ type: Element.Type.Subsitute, alias })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }
    
    phoneme(content: string, options: IPhonemeOptions) {
        options = util.isObject(options) ? options : {};
        const node = Element.create({ type: Element.Type.Phoneme, ...options })
        content && node.appendChild(`${content}`);
        this.appendChild(node);
        return this;
    }

    break(value: any) {
        this.appendChild(Element.create({ type: Element.Type.Break, time: value }));
        return this;
    }

    pause(value: any) {
        return this.break(value);
    }

    audio(options: IAudioOptions) {
        options = util.isObject(options) ? options : {};
        this.appendChild(Element.create({ type: Element.Type.Audio, ...options }));
        return this;
    }

}

export default Base;
