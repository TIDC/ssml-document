import ISayAsOptions from './interface/ISayAsOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from '../lib/util';

export default class SayAs extends Element {

    static type = Element.Type.SayAs;
    static tagName = "say-as";
    type = Element.Type.SayAs;
    "interpret-as" = '';  //内容类型
    format?: string;  //内容格式
    detail?: string;  //内容详细级别

    constructor(options: ISayAsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            ["interpret-as"]: util.isString,
            format: util.isString,
            detail: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider); //为了生成的ssml标准点，把产商不需要的属性进行去除，不构建到ssml里，以下厂商在say-as标签中 只需要interpret-as属性
        switch(provider) {
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.XiaoBing:
                return util.pick(options, ["interpret-as"]);
            case ServiceProvider.Huoshanyun:
                if(this.interpretAs === "cardinal")
                    options["interpret-as"] = "number";
                return util.pick(options, ["interpret-as"]);
            case ServiceProvider.Microsoft:
                if(this.interpretAs === "digits")
                    options["interpret-as"] = "number_digit";
            break;
        }
        return options;
    }
    
    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
            case ServiceProvider.Scenetime:
            case ServiceProvider.Eta:
            case ServiceProvider.XiaoBing:
            case ServiceProvider.Huoshanyun:
                return SayAs.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        return `[${this.name || this.interpretAsText}]${super.getText(undefined, options)}[/${this.name || this.interpretAsText}]`;
    }

    set interpretAs(value: string) {
        this["interpret-as"] = value;
    }

    get interpretAs() {
        return this["interpret-as"];
    }

    get interpretAsText() {
        return {
            cardinal: "整数或小数发音",
            number: "整数或小数发音",
            digits: "数字发音",
            number_digit: "数字发音",
            fraction: "分数发音",
            telephone: "电话号码发音",
            name: "人名发音",
            address: "地址发音",
            id: "昵称发音",
            characters: "字符发音",
            "spell-out": "字符发音",
            punctuation: "标点符号发音",
            date: "日期发音",
            time: "时间发音",
            duration: "时长发音",
            ordinal: "选项发音",
            currency: "金额发音",
            measure: "计量单位发音"
        }[this.interpretAs] || this.interpretAs;
    }

    static isInstance(value: any) {
        return value instanceof SayAs;
    }

}
