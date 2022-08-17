import IProsodyOptions from './interface/IProsodyOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class Prosody extends Element {

    static type = Element.Type.Prosody;
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
            duration: util.millisecondsToTimeString
        }, {
            pitch: util.isString,
            contour: util.isString,
            range: util.isString,
            duration: util.isFinite,
            volume: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
                return "prosody";
            default:
                return null;
        }
    }

}
