import Element from "./Element";

export default class Word extends Element {

    static type = Element.Type.Word;
    type = Element.Type.Word;


    get tagName() {
        return "w";
    }

}
