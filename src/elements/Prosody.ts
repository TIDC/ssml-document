import Element from "./Element";

export default class Prosody extends Element {

    static type = Element.Type.Prosody;
    type = Element.Type.Prosody;
    static tagName = "prosody";


    get tagName() {
        return Prosody.tagName;
    }

}
