import ISentenceOptions from './interface/ISentenceOptions';
import Element from "./Element";

export default class Sentence extends Element {

    static type = Element.Type.Sentence;
    type = Element.Type.Sentence;

    constructor(options: ISentenceOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    get tagName() {
        return "s";
    }

}
