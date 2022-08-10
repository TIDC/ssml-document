import IBaseOptions from "../../interface/IBaseOptions";
import Element from "../Element";

export default interface IElementOptions extends IBaseOptions {
    children?: (IElementOptions | Element)[];  //元素子节点
}
