import IEffectOptions from "./interface/IEffectOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Effect extends Element {

    static type = Element.Type.Effect;
    static tagName = "effect";
    type = Element.Type.Effect;
    name = '';  //音效名称
    phonation?: string;  //发音方式
    level?: string;  //音效强度
    "vocal-tract-length"?: string;  //声道长度

    constructor(options: IEffectOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            name: util.isString,
            phonation: util.isString,
            level: util.isString,
            ["vocal-tract-length"]: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Aliyun:
                return {
                    effect: this.name,
                    effectValue: this.level
                };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return Effect.tagName;
            case ServiceProvider.Amazon:
                return "amazon:effect";
            default:
                return super.getTagName(provider);
        }
    }

    set vocalTractLength(value: string) {
        this["vocal-tract-length"] = value;
    }

    get vocalTractLength() {
        return this["vocal-tract-length"] as any;
    }

}
