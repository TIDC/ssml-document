import IParagraphOptions from './interface/IParagraphOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Paragraph extends Element {

    static type = Element.Type.Paragraph;
    static tagName = "p";
    type = Element.Type.Paragraph;

    constructor(options: IParagraphOptions, ...args: any[]) {
        super(options, ...args);
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Paragraph.tagName;
            case ServiceProvider.Aliyun:
                return "s";
            default:
                return super.getTagName(provider);
        }
    }

    get editable() {
        return true;
    }

    static isInstance(value: any) {
        return value instanceof Paragraph;
    }

}
