import IElementOptions from "./IElementOptions";

export default interface IBackgroundAudioOptions extends IElementOptions {
    src?: string;  //背景音频来源
    volume?: number | string;  //背景音频音量
    fadein?: number | string;  //背景音频淡入时长
    fadeout?: number | string;  //背景音频淡出时长
}
