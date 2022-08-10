import Element from "./Element";

export default class Paragraph extends Element {

    static type = Element.Type.Paragraph;
    type = Element.Type.Paragraph;
    static tagName = "p";


    get tagName() {
        return Paragraph.tagName;
    }

}
