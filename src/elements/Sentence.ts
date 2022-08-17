import ISentenceOptions from './interface/ISentenceOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Sentence extends Element {

    static type = Element.Type.Sentence;
    type = Element.Type.Sentence;

    constructor(options: ISentenceOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
                return "s";
            default:
                return null;
        }
    }

}
