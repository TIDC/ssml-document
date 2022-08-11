import ISilenceOptions from './interface/ISilenceOptions';
import Element from "./Element";
import util from '../../lib/util';

export default class Silence extends Element {

    static type = Element.Type.Silence;
    type = Element.Type.Silence;
    static tagName = "mstts:silence";
    __type?: string;  //静音类型
    __value?: string;  //静音时长

    constructor(options: ISilenceOptions) {
        super(options);
        this.optionsInject(options, {}, {
            __type: util.isString,
            __value: util.isString
        });
    }

    get tagName() {
        return Silence.tagName;
    }

}
