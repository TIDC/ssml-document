import IMarkOptions from './interface/IMarkOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from './Element';

export default class Mark extends Element {

    static type = Element.Type.Mark;
    static tagName = "mark";
    type = Element.Type.Mark;
    mark?: string;  //标识

    constructor(options: IMarkOptions, ...args: any[]) {
        super(options, ...args);
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Microsoft:
                return { mark: this.mark };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Mark.tagName;
            case ServiceProvider.Microsoft:
                return "mstts:bookmark";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "标识";
        return `[${labelText}:${this.name}]`;
    }

    static isInstance(value: any) {
        return value instanceof Mark;
    }

}
