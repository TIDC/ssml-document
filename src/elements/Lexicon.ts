import ILexiconOptions from './interface/ILexiconOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from './Element';
import util from '../lib/util';

export default class Lexicon extends Element {

    static type = Element.Type.Lexicon;
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
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
                return "lexicon";
            default:
                return null;
        }
    }

}
