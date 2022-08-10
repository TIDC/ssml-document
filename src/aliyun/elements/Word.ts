import Element from "./Element";

export default class Word extends Element {

    static type = Element.Type.Word;
    type = Element.Type.Word;
    static tagName = "w";


    get tagName() {
        return Word.tagName;
    }

}
