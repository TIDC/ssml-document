import IWordOptions from './interface/IWordOptions';
import Element from "./Element";

export default class Word extends Element {

    static type = Element.Type.Word;
    type = Element.Type.Word;

    constructor(options: IWordOptions, ...args: any[]) {
        super(options, ...args);
    }

    get tagName() {
        return "w";
    }

}
