import IProsodyOptions from './interface/IProsodyOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class Prosody extends Element {

    static type = Element.Type.Prosody;
    static tagName = "prosody";
    type = Element.Type.Prosody;
    pitch?: string;  //语音音调强度
    contour?: string;  //语音音高值
    range?: string;  //语音音高范围
    rate?: string;  //语音语速
    duration?: number;  //语音持续时长
    volume?: string;  //语音音量

    constructor(options: IProsodyOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            pitch: util.pitchParse,
            rate: util.rateParse,
            duration: util.millisecondsToTimeString,
            volume: util.volumeParse
        }, {
            pitch: (v: any) => util.isString(v) || util.isFinite(v),
            contour: util.isString,
            range: util.isString,
            rate: (v: any) => util.isString(v) || util.isFinite(v),
            duration: util.isString,
            volume: (v: any) => util.isString(v) || util.isFinite(v)
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
                options.rate = util.isFinite(Number(options.rate)) ? parseInt(`${options.rate * 100}`) + "%" : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? parseInt(`${options.pitch * 100}`) + "%" : options.pitch;
                break;
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                options.rate = util.isFinite(Number(options.rate)) ? parseInt(`${options.rate * 100}`) + "%" : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? parseInt(`${options.pitch * 100}`) + "%" : options.pitch;
                options.volume = util.isFinite(Number(this.volume)) ? util.volumeValueParse(Number(this.volume)) : this.volume;
                if (provider === ServiceProvider.Amazon) {
                    options.duration && (options["amazon:max-duration"] = options.duration);
                    delete options.duration;
                }
                return util.omit(options, ["contour", "range"]);
            case ServiceProvider.Aliyun:
                return {
                    rate: util.isFinite(Number(this.rate)) ? Number(this.rate) * 500 - 500 : this.rate,
                    pitch: util.isFinite(Number(this.pitch)) ? Number(this.pitch) * 500 - 500 : this.pitch,
                    volume: util.isFinite(Number(this.volume)) ? Number(this.volume) * 0.5 : this.volume
                };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Prosody.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
