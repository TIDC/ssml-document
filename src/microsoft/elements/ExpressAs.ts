import Element from "./Element";

export default class ExpressAs extends Element {

    static type = Element.Type.ExpressAs;
    type = Element.Type.ExpressAs;
    static tagName = "express-as";


    get tagName() {
        return ExpressAs.tagName;
    }

}
