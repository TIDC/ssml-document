import IElementOptions from "./IElementOptions";

export default interface IProsodyOptions extends IElementOptions {
    pitch?: number | string;  //语音音调强度
    contour?: string;  //语音音高值
    range?: string;  //语音音高范围
    rate?: number | string;  //语音语速
    duration?: number | string;  //语音持续时长
    volume?: number | string;  //语音音量
}
