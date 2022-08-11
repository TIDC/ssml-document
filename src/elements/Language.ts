import ILanguageOptions from "./interface/ILanguageOptions";
import Element from "./Element";
import util from "../lib/util";

export default class Language extends Element {

    static type = Element.Type.Language;
    type = Element.Type.Language;
    "xml:lang"?: string;  //语音语言

    constructor(options: ILanguageOptions) {
        super(options);
        this.optionsInject(options, {}, {
            ["xml:lang"]: util.isString
        });
    }

    get tagName() {
        return "lang";
    }

}
