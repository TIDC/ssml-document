import IElementOptions from "../elements/interface/IElementOptions";
import IBaseOptions from "./IBaseOptions";
import Element from "../elements/Element";

export default interface IDocumentOptions extends IBaseOptions {
    version?: string;  //文档版本号
    "xml:lang"?: string;  //语音语言
    language?: string;  //语音语言扩展属性
    "xml:base"?: string;  //文档基础URL
    baseUrl?: string;  //文档基础URL扩展属性
    xmlns?: string;  //文档URI
    encodeType?: string;  //音频编码类型
    sampleRate?: string;  //音频采样率
    children?: (Element | IElementOptions)[];  //文档子节点
}
