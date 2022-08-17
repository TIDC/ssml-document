import IElementOptions from "./IElementOptions";

export default interface IEmphasisOptions extends IElementOptions {
    category?: string;  //说话情绪
    intensity?: number | string;  //情绪强度
}
