import Element from "./Element";

export default class Subsitute extends Element {

    static type = Element.Type.Subsitute;
    type = Element.Type.Subsitute;
    static tagName = "sub";


    get tagName() {
        return Subsitute.tagName;
    }

}
