import ICompilerOptions from "./lib/interface/ICompilerOptions";
import IDocumentOptions from "./interface/IDocumentOptions";
import IRenderOptions from "./interface/IRenderOptions";
import ServiceProvider from "./enums/ServiceProvoder";
import Element from "./elements/Element";
import ElementFactory from "./ElementFactory";
import Base from "./Base";
import util from "./lib/util";

export default class Document extends Base {

    static type = "document";
    readonly type = "document";
    version?: string;  //文档版本号
    "xml:lang"?: string;  //语音语言
    "xml:base"?: string;  //文档基础URL
    xmlns = "";  //文档URI
    children?: Element[] = [];  //文档子节点

    constructor(options: IDocumentOptions, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.optionsInject(options, {
            ["xml:lang"]: (v: any) => options.language || v,
            ["xml:base"]: (v: any) => options.baseUrl || v,
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
            children: util.isArray
        });
    }

    render(options: IRenderOptions = {}) {
        const tagName = this.getTagName(options.provider || ServiceProvider.W3C);
        const tag = this.createRootTag(tagName || "root", this.optionsExport());
        this.children?.forEach(node => node.render(options, tag));
        const content = tag.end({
            prettyPrint: options.pretty,
            headless: options.headless
        });
        if(tagName)
            return content;
        return content.replace(/<root.*?>/, "").replace(/<\/root>$/, "");
    }

    getText(filter?: any): string {
        return this.children?.reduce((t, e) => t + e.getText(filter), "") as string;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Microsoft:
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

}
