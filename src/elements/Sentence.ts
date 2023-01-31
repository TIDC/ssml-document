import ISentenceOptions from './interface/ISentenceOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Sentence extends Element {

    static type = Element.Type.Sentence;
    static tagName = "s";
    type = Element.Type.Sentence;

    constructor(options: ISentenceOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
                return Sentence.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
