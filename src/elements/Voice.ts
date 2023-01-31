import IVoiceOptions from './interface/IVoiceOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from './Element';
import util from '../lib/util';

export default class Voice extends Element {

    static type = Element.Type.Voice;
    static tagName = "voice";
    type = Element.Type.Voice;
    gender?: string;  //发音音色性别
    age?: number;  //发音音色年龄
    variant?: string;  //发音变体
    name?: string;  //发音音色
    languages?: string;  //发音语言列表
    required?: string;  //发音特征列表
    ordering?: string;  //发音特征列表顺序

    constructor(options: IVoiceOptions, ...args: any[]) {
        super(options, ...args);
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

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch (provider) {
            case ServiceProvider.Microsoft:
                return util.pick(options, ["name"]);
            case ServiceProvider.Aliyun:
                return { voice: options.name };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Microsoft:
                return Voice.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
