import IElementOptions from "./IElementOptions";

export default interface IAudioOptions extends IElementOptions {
    src?: string;  //音频来源
    fetchtimeout?: string;  //拉取音频超时时间
    fetchhint?: string;  //音频初始化方式
    maxage?: string;  //适用最大年龄
    maxstale?: string;  //适用最大超期时间
    clipBegin?: string;  //起始偏移量
    clipEnd?: string;  //结束偏移量
    speed?: string;  //音频播放速度
    repeatCount?: number;  //重复次数
    repeatDur?: number;  //持续时间
    soundLevel?: string;  //音频音量级别
}
