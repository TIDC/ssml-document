import ISilenceOptions from './interface/ISilenceOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from '../lib/util';

export default class Silence extends Element {

    static type = Element.Type.Silence;
    static tagName = "silence";
    type = Element.Type.Silence;
    __type?: string;  //静音类型
    __value?: string;  //静音时长

    constructor(options: ISilenceOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            __type: util.isString,
            __value: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return Silence.tagName;
            case ServiceProvider.Microsoft:
                return "mstts:silence";
            default:
                return super.getTagName(provider);
        }
    }

    getDuration() {
        return this.__value ? util.timeStringToMilliseconds(this.__value) : 0;
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "静音";
        return `[${labelText}:${util.millisecondsToTimeString(util.timeStringToMilliseconds(this.value || 0) || 0)}]`;
    }

    static isInstance(value: any) {
        return value instanceof Silence;
    }

}
