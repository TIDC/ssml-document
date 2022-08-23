import IWordOptions from './interface/IWordOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from '../lib/util';

export default class Word extends Element {

    static type = Element.Type.Word;
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
            case ServiceProvider.Amazon:
                this.role && (options["role"] = this.role);
                break;
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
                return "w";
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
                return "s";
            default:
                return super.getTagName(provider);
        }
    }

}
