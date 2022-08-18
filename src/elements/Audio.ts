import IAudioOptions from "./interface/IAudioOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Audio extends Element {

    static type = Element.Type.Audio;
    type = Element.Type.Audio;
    src?: string;  //音频来源
    fetchtimeout?: string;  //拉取音频超时时间
    fetchhint?: string;  //音频初始化方式
    maxage?: string;  //适用最大年龄
    maxstale?: string;  //适用最大超期时间

    constructor(options: IAudioOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            src: util.isString,
            fetchtimeout: util.isString,
            fetchhint: util.isString,
            maxage: util.isString,
            maxstale: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Microsoft:
                return "audio";
            default:
                return null;
        }
    }

};