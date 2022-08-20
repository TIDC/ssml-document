import IEffectOptions from "./interface/IEffectOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Effect extends Element {

    static type = Element.Type.Effect;
    type = Element.Type.Effect;
    name = '';  //音效名称

    constructor(options: IEffectOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            name: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Amazon:
                return "amazon:effect";
            default:
                return null;
        }
    }

}
