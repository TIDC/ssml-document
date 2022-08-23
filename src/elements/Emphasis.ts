import IEmphasisOptions from "./interface/IEmphasisOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Emphasis extends Element {

    static type = Element.Type.Emphasis;
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
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return "emphasis";
            default:
                return super.getTagName(provider);
        }
    }

}
