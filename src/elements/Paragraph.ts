import IParagraphOptions from './interface/IParagraphOptions';
import Element from "./Element";

export default class Paragraph extends Element {

    static type = Element.Type.Paragraph;
    type = Element.Type.Paragraph;
    static tagName = "p";

    constructor(options: IParagraphOptions) {
        super(options);
        this.optionsInject(options, {}, {});
    }

    get tagName() {
        return Paragraph.tagName;
    }

}
