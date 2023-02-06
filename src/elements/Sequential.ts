import ISequentialOptions from './interface/ISequentialOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Sequential extends Element {

    static type = Element.Type.Sequential;
    static tagName = "seq";
    type = Element.Type.Sequential;

    constructor(options: ISequentialOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
                return Sequential.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "序列";
        return `[${labelText}]${super.getText(undefined, options)}[/${labelText}]`;
    }

}
