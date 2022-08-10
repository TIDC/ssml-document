import IEmphasisOptions from "./interface/IEmphasisOptions";
import Element from "./Element";
import util from "../lib/util";

export default class Emphasis extends Element {

    static type = Element.Type.Emphasis;
    type = Element.Type.Emphasis;
    static tagName = "emphasis";
    level?: string;  //强调强度

    constructor(options: IEmphasisOptions) {
        super(options);
        this.optionsInject(options, {}, {
            level: util.isString
        });
    }

    get tagName() {
        return Emphasis.tagName;
    }

}
