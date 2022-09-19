import ICompilerOptions from "./lib/interface/ICompilerOptions";
import IDocumentOptions from "./interface/IDocumentOptions";
import IRenderOptions from "./interface/IRenderOptions";
import ServiceProvider from "./enums/ServiceProvoder";
import ElementFactory from "./ElementFactory";
import Element from "./elements/Element";
import { BackgroundAudio, Effect, Prosody, Voice } from "./elements";
import Base from "./Base";
import parser from './lib/parser';
import util from "./lib/util";

export default class Document extends Base {

    static type = "speak";
    static tagName = "speak";
    readonly type = "speak";
    version?: string;  //文档版本号
    "xml:lang"?: string;  //语音语言
    "xml:base"?: string;  //文档基础URL
    xmlns = "";  //文档URI
    encodeType?: string;  //音频编码类型
    sampleRate?: string;  //音频采样率
    bitrate?: string;  //音频码率
    provider?: ServiceProvider;  //预期产出提供商
    solution?: string;  //预期形象ID
    enableSubtitle?: boolean;  //是否开启字幕
    children?: Element[] = [];  //文档子节点
    #parent?: Document | Element;  //父级节点

    constructor(options: IDocumentOptions = {}, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.compile && (options = this.optionsCompile(options));
        this.optionsInject(options, {
            ["xml:lang"]: (v: any) => options.language || v,
            ["xml:base"]: (v: any) => options.baseUrl || v,
            version: (v: any) => util.defaultTo(v, "1.0"),
            xmlns: (v: any) => util.defaultTo(v, "http://www.w3.org/2001/10/synthesis"),
            enableSubtitle: util.booleanParse,
            children: (v: any) => (v || []).map((options: any) => {
                const node = ElementFactory.createElement(options, compilerOptions);
                node.parent = this;
                return node;
            })
        }, {
            version: util.isString,
            ["xml:lang"]: util.isString,
            ["xml:base"]: util.isString,
            xmlns: util.isString,
            encodeType: util.isString,
            sampleRate: util.isString,
            bitrate: util.isString,
            provider: util.isString,
            solution: util.isString,
            enableSubtitle: util.isBoolean,
            children: util.isArray
        });
    }

    appendChild(node: any) {
        this.children?.push(this.createNode(node));
    }

    createNode(node: any) {
        if(!Element.isInstance(node))
            node = ElementFactory.createElement(node, this.compilerOptions);
        node.parent = this;
        return node;
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider, ["version", "encodeType", "sampleRate", "bitrate", "solution", "enableSubtitle", "xmlns", "xml:base", "xml:lang"]);
        if(provider === ServiceProvider.Aggregation) {
            options.provider = this.provider;
            options.solution = this.solution;
            options.enableSubtitle = this.enableSubtitle;
        }
        switch(provider) {
            case ServiceProvider.Aggregation:
                options.version = this.version;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
            break;
            case ServiceProvider.W3C:
                options.version = this.version;
                options["xml:base"] = this.baseUrl;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
            break;
            case ServiceProvider.Aliyun:
                const voice = this.findOne("voice") as Voice;
                voice && Object.assign(options, voice.optionsExport(provider));
                const prosody = this.findOne("prosody") as Prosody;
                prosody && Object.assign(options, prosody.optionsExport(provider));
                const effect = this.findOne("effect") as Effect;
                effect && Object.assign(options, effect.optionsExport(provider));
                const backgroundAudio = this.findOne("backgroundAudio") as BackgroundAudio;
                backgroundAudio && Object.assign(options, backgroundAudio.optionsExport(provider));
                options.encodeType = this.encodeType;
                options.sampleRate = this.sampleRate;
            break;
            case ServiceProvider.Microsoft:
                options.version = this.version;
                options["xml:lang"] = this.language || "zh";  //必须声明跟文档语言
                options.xmlns = this.xmlns;
                options["xmlns:mstts"] = "https://www.w3.org/2001/mstts";
            break;
        }
        return options;
    }

    render(options: IRenderOptions = {}, parent?: any) {
        options.provider = options.provider || ServiceProvider.Aggregation;
        options.headless = util.isBoolean(options.headless) ? options.headless : this.getHeadlessDefaultStatus(options.provider);
        const tagName = this.getTagName(options.provider);
        let tag: any;
        if (tagName) {
            tag = parent ? parent.ele(tagName) : this.createRootTag(tagName);
            const _options = this.optionsExport(options.provider);
            for (let key in _options)
                tag.att(key, _options[key]);
        }
        else
            tag = parent || this.createRootTag("root");
        this.children?.forEach(node => node.render(options, tag));
        if (!parent) {
            return tag.end({
                prettyPrint: options.pretty,
                headless: util.isBoolean(options.headless) ? options.headless : true
            })
            .replace(/<root.*?>/, "")
            .replace(/<\/root>$/, "");
        }
        return tag;
    }

    findOne(key: string) {
        for (let node of this.children || []) {
            if (node.type === key)
                return node;
            const foundNode = node.findOne(key);
            if(foundNode) return foundNode;
        }
        return null;
    }

    getText(filter?: any): string {
        return this.children?.reduce((t, e) => t + e.getText(filter), "") as string;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Tencent:
                return "speak";
            default:
                return null;
        }
    }

    getHeadlessDefaultStatus(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
                return false;
            default:
                return true;
        }
    }

    up() {
        return this;
    }

    getRate(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.rate;
    }

    getPitch(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.pitch;
    }

    getVolume(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.volume;
    }
    
    getProsody() {
        return this.findOne("prosody") as Prosody;
    }

    get speaker() {
        const voice = this.findOne("voice") as Voice;
        if(!voice) return;
        return voice.name;
    }

    get rate() {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return;
        return prosody.rate || 1.0;
    }

    get pitch() {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return;
        return prosody.pitch || 1.0;
    }

    get volume() {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return;
        const volume = util.volumeParse(`${prosody.volume || 100}`);
        return util.isFinite(Number(volume)) ? Number(volume) : volume;
    }

    get format() {
        return this.encodeType?.toLowerCase();
    }

    get language() {
        return this["xml:lang"] as any;
    }

    set language(value: string) {
        this["xml:lang"] = value;
    }

    get baseUrl() {
        return this["xml:base"] as any;
    }

    set baseUrl(value: string) {
        this["xml:base"] = value;
    }

    set parent(node: Document | Element) {
        this.#parent = node;
    }

    get parent() {
        return this.#parent as any;
    }

    get textLength() {
        return this.getText().length;
    }

    static parse = parser.parseToDocument.bind(parser);

}
