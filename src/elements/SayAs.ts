import ISayAsOptions from './interface/ISayAsOptions';
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
            case ServiceProvider.Huoshanyun:
                return util.pick(options, ["interpret-as"]);
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
            case ServiceProvider.XiaoBing:
            case ServiceProvider.Huoshanyun:
                return SayAs.tagName;
            default:
                return super.getTagName(provider);
        }
    }

    set interpretAs(value: string) {
        this["interpret-as"] = value;
    }

    get interpretAs() {
        return this["interpret-as"];
    }

}
