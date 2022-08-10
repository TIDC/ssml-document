import Element from "./Element";

export default class Lexicon extends Element {

    static type = Element.Type.Lexicon;
    type = Element.Type.Lexicon;
    static tagName = "lexicon";


    get tagName() {
        return Lexicon.tagName;
    }

}
