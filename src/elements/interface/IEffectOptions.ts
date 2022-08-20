import IElementOptions from "./IElementOptions";

export default interface IEffectOptions extends IElementOptions {
    name?: string;  //音效名称
    phonation?: string;  //发音方式
    "vocal-tract-length"?: string;  //声道长度
}
