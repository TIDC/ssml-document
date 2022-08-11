import Element from "./Element";

export default class SayAs extends Element {

    static type = Element.Type.SayAs;
    type = Element.Type.SayAs;


    get tagName() {
        return "say-as";
    }

}
