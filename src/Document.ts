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

    static type = "document";
    readonly type = "document";
    version?: string;  //文档版本号
    "xml:lang"?: string;  //语音语言
    "xml:base"?: string;  //文档基础URL
    xmlns = "";  //文档URI
    encodeType?: string;  //音频编码类型
    sampleRate?: string;  //音频采样率
    children?: Element[] = [];  //文档子节点

    constructor(options: IDocumentOptions = {}, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.optionsInject(options, {
            ["xml:lang"]: (v: any) => options.language || v,
            ["xml:base"]: (v: any) => options.baseUrl || v,
            version: (v: any) => util.defaultTo(v, "1.0"),
            xmlns: (v: any) => util.defaultTo(v, "http://www.w3.org/2001/10/synthesis"),
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
            children: util.isArray
        });
    }

    appendChild(node: any) {
        if(!Element.isInstance(node))
            node = ElementFactory.createElement(node, this.compilerOptions);
        node.parent = this;
        this.children?.push(node);
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider, ["version", "encodeType", "sampleRate", "xmlns", "xml:base", "xml:lang"]);
        switch(provider) {
            case ServiceProvider.W3C:
                options.version = this.version;
                options["xml:base"] = this.baseUrl;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
            break;
            case ServiceProvider.Aliyun:
                const voice = this.find("voice") as Voice;
                voice && Object.assign(options, voice.optionsExport(provider));
                const prosody = this.find("prosody") as Prosody;
                prosody && Object.assign(options, prosody.optionsExport(provider));
                const effect = this.find("effect") as Effect;
                effect && Object.assign(options, effect.optionsExport(provider));
                const backgroundAudio = this.find("backgroundAudio") as BackgroundAudio;
                backgroundAudio && Object.assign(options, backgroundAudio.optionsExport(provider));
                options.encodeType = this.encodeType;
                options.sampleRate = this.sampleRate;
            break;
            case ServiceProvider.Microsoft:
                options.version = this.version;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
                options["xmlns:mstts"] = "https://www.w3.org/2001/mstts";
            break;
        }
        return options;
    }

    render(options: IRenderOptions = {}) {
        const tagName = this.getTagName(options.provider || ServiceProvider.Aggregation);
        const tag = this.createRootTag(tagName || "root", this.optionsExport(options.provider));
        this.children?.forEach(node => node.render(options, tag));
        const content = tag.end({
            prettyPrint: options.pretty,
            headless: options.headless,
        });
        if(tagName)
            return content;
        return content.replace(/<root.*?>/, "").replace(/<\/root>$/, "");
    }

    find(key: string) {
        for (let node of this.children || []) {
            if (node.type === key)
                return node;
            const foundNode = node.find(key);
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

    static parse = parser.parseToDocument.bind(parser);

}
