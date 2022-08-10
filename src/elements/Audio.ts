import IAudioOptions from "./interface/IAudioOptions";
import Element from "./Element";
import util from "../lib/util";

export default class Audio extends Element {

    static type = Element.Type.Audio;
    type = Element.Type.Audio;
    static tagName = "audio";
    src?: string;  //音频来源
    fetchtimeout?: string;  //拉取音频超时时间
    fetchhint?: string;  //音频初始化方式
    maxage?: string;  //适用最大年龄
    maxstale?: string;  //适用最大超期时间

    constructor(options: IAudioOptions) {
        super(options);
        this.optionsInject(options, {}, {
            src: util.isString,
            fetchtimeout: util.isString,
            fetchhint: util.isString,
            maxage: util.isString,
            maxstale: util.isString
        });
    }
    
    get tagName() {
        return Audio.tagName;
    }

};