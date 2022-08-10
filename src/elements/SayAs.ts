import Element from "./Element";

export default class SayAs extends Element {

    static type = Element.Type.SayAs;
    type = Element.Type.SayAs;
    static tagName = "say-as";


    get tagName() {
        return SayAs.tagName;
    }

}
