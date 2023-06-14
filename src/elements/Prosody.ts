import IProsodyOptions from './interface/IProsodyOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class Prosody extends Element {

    static type = Element.Type.Prosody;
    static tagName = "prosody";
    type = Element.Type.Prosody;
    pitch?: number | string;  //语音音调强度
    contour?: string;  //语音音高值
    range?: string;  //语音音高范围
    rate?: number | string;  //语音语速
    duration?: number;  //语音持续时长
    volume?: number | string;  //语音音量

    constructor(options: IProsodyOptions = {}, ...args: any[]) {
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
                options.rate = util.isFinite(Number(options.rate)) ? parseInt(`${options.rate * 100}`) + "%" : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? parseInt(`${options.pitch * 100}`) + "%" : options.pitch;
                break;
            case ServiceProvider.Microsoft:
                options.pitch = util.isFinite(Number(options.pitch)) ? parseInt(`${options.pitch * 50 - 50}`) + "%" : options.pitch;
                break;
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                options.rate = util.isFinite(Number(options.rate)) ? parseInt(`${options.rate * 100}`) + "%" : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? parseInt(`${options.pitch * 100}`) + "%" : options.pitch;
                options.volume = util.isFinite(Number(options.volume)) ? util.volumeValueParse(Number(options.volume)) : options.volume;
                if (provider === ServiceProvider.Amazon) {
                    options.duration && (options["amazon:max-duration"] = options.duration);
                    delete options.duration;
                }
                return util.omit(options, ["contour", "range"]);
            case ServiceProvider.Aliyun:
                return {
                    rate: util.isFinite(Number(options.rate)) ? Number(options.rate) * 500 - 500 : options.rate,
                    pitch: util.isFinite(Number(options.pitch)) ? Number(options.pitch) * 500 - 500 : options.pitch,
                    volume: util.isFinite(Number(options.volume)) ? Number(options.volume) * 0.5 : options.volume
                };
            case ServiceProvider.YunXiaoWei:
                options.rate = util.isFinite(Number(options.rate)) ? Number((options.rate * 0.5 + 0.5).toFixed(1)) : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? Number((options.pitch * 0.5 + 0.5).toFixed(1)) : options.pitch;
                break;
            case ServiceProvider.XiaoBing:
                options.rate = util.isFinite(Number(options.rate)) ? Number((options.rate * 0.5 + 0.5).toFixed(1)) : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? Number((options.pitch * 0.5 + 0.5).toFixed(1)) : options.pitch;
                break;
            case ServiceProvider.Xmov:
                options.rate = util.isFinite(Number(options.rate)) ? Number((options.rate * 0.5 + 0.5).toFixed(1)) : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? Number((options.pitch * 0.5 + 0.5).toFixed(1)) : options.pitch;
                break;
            case ServiceProvider.Huoshanyun:
                options.rate = util.isFinite(Number(options.rate)) ? Math.floor(Number(((options.rate * 2 - 1) * 10))) : options.rate;
                options.pitch = util.isFinite(Number(options.pitch)) ? Math.floor(Number((Math.log(options.pitch) / Math.log(Math.E) * 12 / 0.69314718056 + 10))) : options.pitch;
                options.volume = util.isFinite(Number(options.volume)) ? Number(options.volume) * 0.1 : options.volume
                break;
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Prosody.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    get editable() {
        return true;
    }

    static isInstance(value: any) {
        return value instanceof Prosody;
    }
    
}
