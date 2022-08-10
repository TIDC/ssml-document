import Element from "./Element";

export default class Sentence extends Element {

    static type = Element.Type.Sentence;
    type = Element.Type.Sentence;
    static tagName = "s";


    get tagName() {
        return Sentence.tagName;
    }

}
