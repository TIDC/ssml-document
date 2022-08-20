import IElementOptions from "./IElementOptions";

export default interface ISayAsOptions extends IElementOptions {
    "interpret-as"?: string;  //内容类型
    format?: string;  //内容格式
    detail?: string;  //内容详细级别
};
