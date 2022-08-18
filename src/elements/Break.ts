import IBreakOptions from "./interface/IBreakOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Break extends Element {

    static type = Element.Type.Break;
    type = Element.Type.Break;
    strength?: string;  //中断强度
    time?: string;  //暂停持续时间

    constructor(options: IBreakOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            strength: util.isString,
            time: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Tencent:
            case ServiceProvider.YunXiaoWei:
                return "break";
            default:
                return null;
        }
    }

}
