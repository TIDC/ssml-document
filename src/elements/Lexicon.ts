import ILexiconOptions from './interface/ILexiconOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from './Element';
import util from '../lib/util';

export default class Lexicon extends Element {

    static type = Element.Type.Lexicon;
    static tagName = "lexicon";
    type = Element.Type.Lexicon;
    uri?: string;  //外部PLS文档地址

    constructor(options: ILexiconOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            uri: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
                return Lexicon.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    static isInstance(value: any) {
        return value instanceof Lexicon;
    }

}
