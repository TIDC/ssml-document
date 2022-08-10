import Element from "./Element";

export default class Language extends Element {

    static type = Element.Type.Language;
    type = Element.Type.Language;
    static tagName = "lang";


    get tagName() {
        return Language.tagName;
    }

}
