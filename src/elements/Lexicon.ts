import ILexiconOptions from './interface/ILexiconOptions';
import Element from './Element';
import util from '../lib/util';

export default class Lexicon extends Element {

    static type = Element.Type.Lexicon;
    type = Element.Type.Lexicon;
    static tagName = "lexicon";
    uri?: string;  //外部PLS文档地址

    constructor(options: ILexiconOptions) {
        super(options);
        this.optionsInject(options, {}, {
            uri: util.isString
        });
    }

    get tagName() {
        return Lexicon.tagName;
    }

}
