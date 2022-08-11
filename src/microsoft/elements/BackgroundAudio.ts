import IBackgroundAudioOptions from './interface/IBackgroundAudioOptions';
import Element from "./Element";
import util from '../../lib/util';

export default class BackgroundAudio extends Element {

    static type = Element.Type.BackgroundAudio;
    type = Element.Type.BackgroundAudio;
    static tagName = "mstts:backgroundaudio";
    src?: string;  //背景音频来源
    volume?: number;  //背景音频音量
    fadein?: number;  //背景音频淡入时长
    fadeout?: number;  //背景音频淡出时长

    constructor(options: IBackgroundAudioOptions) {
        super(options);
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

    get tagName() {
        return BackgroundAudio.tagName;
    }

}
