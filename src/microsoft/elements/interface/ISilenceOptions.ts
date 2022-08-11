import IElementOptions from "./IElementOptions";

export default interface ISilenceOptions extends IElementOptions {
    type?: string;  //静音类型
    value?: number | string;  //静音时长
}
