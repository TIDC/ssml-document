import IElementOptions from "./IElementOptions";

export default interface IAudioOptions extends IElementOptions {
    src?: string;  //音频来源
    fetchtimeout?: string;  //拉取音频超时时间
    fetchhint?: string;  //音频初始化方式
    maxage?: string;  //适用最大年龄
    maxstale?: string;  //适用最大超期时间
}
