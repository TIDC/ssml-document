import ILanguageOptions from "./interface/ILanguageOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Language extends Element {

    static type = Element.Type.Language;
    static tagName = "lang";
    type = Element.Type.Language;
    "xml:lang"?: string;  //语音语言

    constructor(options: ILanguageOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            ["xml:lang"]: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Microsoft:
                return Language.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    get language() {
        return this["xml:lang"] as any;
    }

    set language(value: string) {
        this["xml:lang"] = value;
    }

}
