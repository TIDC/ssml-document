
import IPhonemeOptions from './interface/IPhonemeOptions';
import Element from "./Element";
import util from "../lib/util";

export default class Phoneme extends Element {

    static type = Element.Type.Phoneme;
    type = Element.Type.Phoneme;
    alphabet?: string;  //音标表
    ph?: string;  //音标

    constructor(options: IPhonemeOptions) {
        super(options);
        this.optionsInject(options, {}, {
            alphabet: util.isString,
            ph: util.isString
        });
    }

    get tagName() {
        return "phoneme";
    }

}
