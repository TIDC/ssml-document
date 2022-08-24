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

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        let ph;
        if(this.alphabet === "py" && this.ph)
            ph = util.pinyinConvert(this.ph);
        switch(provider) {
            case ServiceProvider.Microsoft:
                if(this.alphabet === "py" && ph) {
                    options.alphabet = "sapi";
                    options.ph = util.pinyin2sapi(ph);
                }
            break;
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
                if(this.alphabet === "py" && ph)
                    options.ph = ph;
            break;
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return this.alphabet === "py" ? null : "phoneme";
            case ServiceProvider.Aggregation:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
                return "phoneme";
            default:
                return super.getTagName(provider);
        }
    }

}
