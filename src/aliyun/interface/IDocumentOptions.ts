import _IDocumentOptions from "../../interface/IDocumentOptions";

export default interface IDocumentOptions extends _IDocumentOptions {
    encodeType?: string;  //语音音频格式
    sampleRate?: string;  //语音音频采样率
    rate?: number;  //语音语速
    pitch?: number;  //语音音高
    volume?: number;  //语音音量
    effect?: string;  //语音音效
    effectValue?: string;  //语音音效值
    bgm?: string;  //语音背景音乐
    backgroundMusicVolume?: number;  //语音背景音乐音量
}
