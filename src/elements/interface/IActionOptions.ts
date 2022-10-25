import IElementOptions from "./IElementOptions";

export default interface IActionOptions extends IElementOptions {
    type?: string;  //动作类型
    rate?: number | string;  //动作速度
    duration?: string;  //动作时长
}
