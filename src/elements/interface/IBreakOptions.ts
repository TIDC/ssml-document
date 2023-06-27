import IElementOptions from "./IElementOptions";

export default interface IBreakOptions extends IElementOptions {
    strength?: string;  //中断强度
    time?: number | string;  //暂停持续时间
}
