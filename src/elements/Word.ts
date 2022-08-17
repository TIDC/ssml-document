import IWordOptions from './interface/IWordOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Word extends Element {

    static type = Element.Type.Word;
    type = Element.Type.Word;

    constructor(options: IWordOptions, ...args: any[]) {
        super(options, ...args);
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
                return "w";
            default:
                return null;
        }
    }

}
