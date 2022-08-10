import Element from "./Element";

export default class Silence extends Element {

    static type = Element.Type.Silence;
    type = Element.Type.Silence;
    static tagName = "silence";


    get tagName() {
        return Silence.tagName;
    }

}
