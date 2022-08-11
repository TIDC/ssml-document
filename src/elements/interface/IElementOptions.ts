import IBaseOptions from "../../interface/IBaseOptions";
import Element from "../Element";

export default interface IElementOptions extends IBaseOptions {
    content?: string,  //元素内容
    children?: (Element | IElementOptions)[];  //元素子节点
}
