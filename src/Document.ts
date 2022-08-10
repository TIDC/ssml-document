import IDocumentOptions from "./interface/IDocumentOptions";
import Element from "./elements/Element";
import Base from "./Base";
import util from "./lib/util";

export default class Document extends Base {

    static type = "document";
    readonly type = "document";
    version?: string;  //文档版本号
    language?: string;  //语音语言
    "xml:base"?: string;  //文档基础URL
    xmlns?: string;  //文档xmlns
    children?: Element[] = [];  //文档子元素

    constructor(options: IDocumentOptions) {
        super(options);
        this.optionsInject(options, {
            children: (v: any) => (v || []).map((options: any) => {})
        }, {
            version: util.isString,
            language: util.isString,
            baseUrl: util.isString,
            xmlns: util.isString,
            children: util.isArray
        });
    }



}
