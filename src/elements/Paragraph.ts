import IParagraphOptions from './interface/IParagraphOptions';
import Element from "./Element";

export default class Paragraph extends Element {

    static type = Element.Type.Paragraph;
    type = Element.Type.Paragraph;

    constructor(options: IParagraphOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    get tagName() {
        return "p";
    }

}
