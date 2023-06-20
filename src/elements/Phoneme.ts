import IPhonemeOptions from './interface/IPhonemeOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util";

export default class Phoneme extends Element {

    static type = Element.Type.Phoneme;
    static tagName = "phoneme";
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
            case ServiceProvider.Xmov:
                if(this.alphabet === "py" && ph) {
                    options.py = ph;
                    delete options.alphabet;
                    delete options.ph;
                }
            break;
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
            case ServiceProvider.Eta:
            case ServiceProvider.XiaoBing:
            case ServiceProvider.Huoshanyun:
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
                return this.alphabet === "py" ? null : Phoneme.tagName;
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.Microsoft:
                return Phoneme.tagName;
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
            case ServiceProvider.Eta:
            case ServiceProvider.Xmov:
            case ServiceProvider.XiaoBing:
            case ServiceProvider.Huoshanyun:
                return this.alphabet === "py" ? Phoneme.tagName : null;
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        return `[${super.getText(undefined, options)}=${this.ph}]`;
    }

    static isInstance(value: any) {
        return value instanceof Phoneme;
    }

}
