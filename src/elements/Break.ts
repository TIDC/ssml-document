import IBreakOptions from "./interface/IBreakOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Break extends Element {

    static type = Element.Type.Break;
    static tagName = "break";
    type = Element.Type.Break;
    strength?: string;  //中断强度
    time?: string;  //暂停持续时间

    constructor(options: IBreakOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            time: util.millisecondsToTimeString
        }, {
            strength: util.isString,
            time: util.isString
        });
        this.children = [];  //自闭合标签
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
                delete options.strength;
            break;
            case ServiceProvider.XiaoBing:
                delete options.strength;
                options.time = `${util.timeStringToMilliseconds(options.time)}ms`;
            break;
            case ServiceProvider.YunXiaoWei:
                options.time = util.timeStringToMilliseconds(options.time);
            break;
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
            case ServiceProvider.Xmov:
            case ServiceProvider.XiaoBing:
            case ServiceProvider.Huoshanyun:    
                return Break.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
