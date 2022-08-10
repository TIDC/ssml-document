import IVoiceOptions from './interface/IVoiceOptions';
import Element from './Element';
import util from '../lib/util';

export default class Voice extends Element {

    static type = Element.Type.Voice;
    type = Element.Type.Voice;
    static tagName = "voice";
    gender?: string;  //发音音色性别
    age?: number;  //发音音色年龄
    variant?: string;  //发音变体
    name?: string;  //发音音色
    languages?: string;  //发音语言列表
    required?: string;  //发音特征列表
    ordering?: string;  //发音特征列表顺序
    children?: Element[] = [];  //元素子节点

    constructor(options: IVoiceOptions) {
        super(options);
        this.optionsInject(options, {
            age: Number,
            children: (v: any) => (v || []).map((options: any) => {})
        }, {
            gender: util.isString,
            age: util.isFinite,
            variant: util.isString,
            name: util.isString,
            languages: util.isString,
            required: util.isString,
            ordering: util.isString,
            children: util.isArray
        });
    }

    get tagName() {
        return Voice.tagName;
    }

}
