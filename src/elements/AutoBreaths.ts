import IAutoBreathsOptions from './interface/IAutoBreathsOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class AutoBreaths extends Element {

    static type = Element.Type.AutoBreaths;
    static tagName = "auto-breaths";
    type = Element.Type.AutoBreaths;

    constructor(options: IAutoBreathsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return AutoBreaths.tagName;
            case ServiceProvider.Amazon:
                return "amazon:auto-breaths";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "心跳";
        return `[${labelText}]${super.getText(undefined, options)}[/${labelText}]`;
    }

}
