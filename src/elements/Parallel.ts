import IParallelOptions from './interface/IParallelOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Parallel extends Element {

    static type = Element.Type.Parallel;
    static tagName = "par";
    type = Element.Type.Parallel;

    constructor(options: IParallelOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
                return Parallel.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "批次";
        return `[${labelText}]${super.getText(undefined, options)}[/${labelText}]`;
    }

    static isInstance(value: any) {
        return value instanceof Parallel;
    }

}
