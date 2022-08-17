
import IPhonemeOptions from './interface/IPhonemeOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class Phoneme extends Element {

    static type = Element.Type.Phoneme;
    type = Element.Type.Phoneme;
    alphabet?: string;  //音标表
    ph?: string;  //音标

    constructor(options: IPhonemeOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            alphabet: util.isString,
            ph: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
                return "phoneme";
            default:
                return null;
        }
    }

}
