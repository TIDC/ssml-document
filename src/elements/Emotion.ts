import IEmotionOptions from "./interface/IEmotionOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Emotion extends Element {

    static type = Element.Type.Emotion;
    type = Element.Type.Emotion;
    category = '';  //说话情绪
    intensity?: number;  //情绪强度

    constructor(options: IEmotionOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            intensity: Number
        }, {
            category: util.isString,
            intensity: util.isFinite
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aliyun:
                return "emotion";
            case ServiceProvider.Amazon:
                return "amazon:domain";
            case ServiceProvider.Microsoft:
                return "mstts:express-as";
            default:
                return null;
        }
    }

}