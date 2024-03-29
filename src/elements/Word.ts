import IWordOptions from './interface/IWordOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from '../lib/util';

export default class Word extends Element {

    static type = Element.Type.Word;
    static tagName = "w";
    type = Element.Type.Word;
    role?: string;  //词性

    constructor(options: IWordOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            role: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider, ["role"]);
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.Amazon:
                this.role && (options["role"] = this.role);
                break;
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.XiaoBing:
                return Word.tagName;
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
                return "s";
            case ServiceProvider.Huoshanyun:
                return "word";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "分词";
        return `[${labelText}]${super.getText(undefined, options)}[/${labelText}]`;
    }

    static isInstance(value: any) {
        return value instanceof Word;
    }

}
