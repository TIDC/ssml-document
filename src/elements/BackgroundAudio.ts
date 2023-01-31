import IBackgroundAudioOptions from './interface/IBackgroundAudioOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from '../lib/util';

export default class BackgroundAudio extends Element {

    static type = Element.Type.BackgroundAudio;
    type = Element.Type.BackgroundAudio;
    static tagName = "background-audio";
    src?: string;  //背景音频来源
    volume?: number;  //背景音频音量
    fadein?: number;  //背景音频淡入时长
    fadeout?: number;  //背景音频淡出时长

    constructor(options: IBackgroundAudioOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            volume: Number,
            fadein: Number,
            fadeout: Number
        }, {
            src: util.isString,
            volume: util.isFinite,
            fadein: util.isFinite,
            fadeout: util.isFinite
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Aliyun:
                return {
                    bgm: this.src,
                    backgroundMusicVolume: util.isFinite(Number(this.volume)) ? Number(this.volume) * 0.5 : this.volume
                };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return BackgroundAudio.tagName;
            case ServiceProvider.Microsoft:
                return "mstts:backgroundaudio";
            default:
                return super.getTagName(provider);
        }
    }

}
