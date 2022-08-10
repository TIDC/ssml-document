import Element from "./Element";

export default class Break extends Element {

    static type = Element.Type.Break;
    type = Element.Type.Break;
    static tagName = "break";


    get tagName() {
        return Break.tagName;
    }

}
