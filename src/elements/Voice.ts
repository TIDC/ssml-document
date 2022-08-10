import Element from "./Element";

export default class Voice extends Element {

    static type = Element.Type.Voice;
    type = Element.Type.Voice;
    static tagName = "voice";


    get tagName() {
        return Voice.tagName;
    }

}
