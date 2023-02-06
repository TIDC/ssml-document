import IEmphasisOptions from "./interface/IEmphasisOptions";
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Emphasis extends Element {

    static type = Element.Type.Emphasis;
    static tagName = "emphasis";
    type = Element.Type.Emphasis;
    level?: string;  //强调强度

    constructor(options: IEmphasisOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            level: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Emphasis.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "强调";
        return `[${labelText}]${super.getText(undefined, options)}[/${labelText}]`;
    }

}
