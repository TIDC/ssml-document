import ILexiconOptions from './interface/ILexiconOptions';
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

    get tagName() {
        return "lexicon";
    }

}
