import IActionOptions from "./interface/IActionOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Action extends Element {

    static type = Element.Type.Action;
    type = Element.Type.Action;
    __type = '';  //动作类型

    constructor(options: IActionOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            type: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.YunXiaoWei:
                return "insert-action";
            default:
                return null;
        }
    }

}
