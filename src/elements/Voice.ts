import IVoiceOptions from './interface/IVoiceOptions';
import Element from './Element';
import util from '../lib/util';

export default class Voice extends Element {

    static type = Element.Type.Voice;
    type = Element.Type.Voice;
    gender?: string;  //发音音色性别
    age?: number;  //发音音色年龄
    variant?: string;  //发音变体
    name?: string;  //发音音色
    languages?: string;  //发音语言列表
    required?: string;  //发音特征列表
    ordering?: string;  //发音特征列表顺序

    constructor(options: IVoiceOptions) {
        super(options);
        this.optionsInject(options, {
            age: Number
        }, {
            gender: util.isString,
            age: util.isFinite,
            variant: util.isString,
            name: util.isString,
            languages: util.isString,
            required: util.isString,
            ordering: util.isString
        });
    }

    get tagName() {
        return "voice";
    }

}
