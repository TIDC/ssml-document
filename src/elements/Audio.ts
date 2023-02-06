import IAudioOptions from "./interface/IAudioOptions";
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Audio extends Element {

    static type = Element.Type.Audio;
    static tagName = "audio";
    type = Element.Type.Audio;
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

    constructor(options: IAudioOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            repeatDur: Number
        }, {
            src: util.isString,
            fetchtimeout: util.isString,
            fetchhint: util.isString,
            maxage: util.isString,
            maxstale: util.isString,
            clipBegin: util.isString,
            clipEnd: util.isString,
            speed: util.isString,
            repeatCount: util.isString,
            repeatDur: util.isFinite,
            soundLevel: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.W3C:
                return util.omit(options, ["clipBegin", "clipEnd", "speed", "repeatCount", "repeatDur", "soundLevel"]);
            case ServiceProvider.Google:
                return util.omit(options, ["fetchtimeout", "fetchhint", "maxage", "maxstale"]);
            case ServiceProvider.Microsoft:
                return { src: options.src };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Huoshanyun:
                return Audio.tagName;
            case ServiceProvider.Aliyun:
                return "soundEvent";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "音频";
        return `[${labelText}:${this.name || this.src}]`;
    }

};