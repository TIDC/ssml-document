import ISoundEventOptions from './interface/ISoundEventOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class SoundEvent extends Element {

    static type = Element.Type.SoundEvent;
    static tagName = "sound-event";
    type = Element.Type.SoundEvent;
    src?: string;  //提示音来源

    constructor(options: ISoundEventOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            src: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Microsoft:
                return "audio";
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return SoundEvent.tagName;
            case ServiceProvider.Aliyun:
                return "soundEvent";
            default:
                return super.getTagName(provider);
        }
    }

}
