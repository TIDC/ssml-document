import IEmotionOptions from "./interface/IEmotionOptions";
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Emotion extends Element {

    static type = Element.Type.Emotion;
    static tagName = "emotion";
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

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Microsoft:
                return {
                    style: this.category,
                    styledegree: this.intensity
                };
            case ServiceProvider.Amazon:
                return { name: this.category };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.Aliyun:
                return Emotion.tagName;
            case ServiceProvider.Amazon:
                return "amazon:domain";
            case ServiceProvider.Microsoft:
                return "mstts:express-as";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "情感";
        return `[${labelText}:${this.category || this.name}]${super.getText(undefined, options)}[/${labelText}:${this.category || this.name}]`;
    }

    get editable() {
        return true;
    }

}
