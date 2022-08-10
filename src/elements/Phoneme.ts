import Element from "./Element";

export default class Phoneme extends Element {

    static type = Element.Type.Phoneme;
    type = Element.Type.Phoneme;
    static tagName = "phoneme";


    get tagName() {
        return Phoneme.tagName;
    }

}
