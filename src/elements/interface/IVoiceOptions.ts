import IElementOptions from "./IElementOptions";

export default interface IVoiceOptions extends IElementOptions {
    gender?: string;  //发音音色性别
    age?: number | string;  //发音音色年龄
    variant?: string;  //发音变体
    name?: string;  //发音音色
    languages?: string;  //发音语言列表
    required?: string;  //发音特征列表
    ordering?: string;  //发音特征列表顺序
}
