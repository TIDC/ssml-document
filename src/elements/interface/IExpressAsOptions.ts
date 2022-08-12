import IElementOptions from "./IElementOptions";

export default interface IExpressAsOptions extends IElementOptions {
    style?: string;  //讲话风格
    styledegree?: number | string;  //讲话风格强度
    role?: string;  //讲话角色名称
}
