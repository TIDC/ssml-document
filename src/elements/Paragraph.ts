import IParagraphOptions from './interface/IParagraphOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Paragraph extends Element {

    static type = Element.Type.Paragraph;
    type = Element.Type.Paragraph;

    constructor(options: IParagraphOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.YunXiaoWei:
                return "p";
            default:
                return null;
        }
    }

}
