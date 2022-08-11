import ISentenceOptions from './interface/ISentenceOptions';
import Element from "./Element";

export default class Sentence extends Element {

    static type = Element.Type.Sentence;
    type = Element.Type.Sentence;
    static tagName = "s";

    constructor(options: ISentenceOptions) {
        super(options);
        this.optionsInject(options, {}, {});
    }

    get tagName() {
        return Sentence.tagName;
    }

}
