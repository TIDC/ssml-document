import IActionOptions from "./interface/IActionOptions";
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from "../enums/ServiceProvoder";
import Element from "./Element";
import util from "../lib/util";

export default class Action extends Element {

    static type = Element.Type.Action;
    static tagName = "action";
    type = Element.Type.Action;
    __type = '';  //动作类型
    rate?: number;  //动作速度
    duration?: string;  //动作时长

    constructor(options: IActionOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            rate: Number,
            duration: util.millisecondsToTimeString
        }, {
            __type: util.isString,
            rate: util.isFinite,
            duration: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        if(provider !== ServiceProvider.Aggregation)
            delete options.name;
        switch(provider) {
            case ServiceProvider.Xmov:
                delete options.type;
            break;
        }
        return options;
    }

    render(options: IRenderOptions = {}, parent?: any) {
        const tag = super.render(options, parent);
        if(options.provider === ServiceProvider.Xmov) {
            const actionType = this.__type.indexOf("P_") === -1 ? "action" : "action_and_expression";
            const actionDuration = (util.timeStringToMilliseconds(`${this.duration}`) || 0) / 1000;
            const _tag = tag
            .ele("visible").txt("true").up()
            .ele("name").txt(util.uniqueId("action_")).up()
            .ele("user-type").txt("user_action").up();
            this.duration && _tag.ele("duration").txt(Math.floor(actionDuration * 100) / 100).up();
            _tag
            .ele("type").txt(actionType).up()
            .ele("data")
            .ele(actionType).txt(this.__type).up()
            .ele("rate").txt(this.rate || 1).up();
            return _tag;
        }
        return tag;
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "动作";
        return `[${labelText}:${this.name || this.__type || ""}]`;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return Action.tagName;
            case ServiceProvider.YunXiaoWei:
                return "insert-action";
            case ServiceProvider.Xmov:
                return "ue4event"
            default:
                return super.getTagName(provider);
        }
    }

    static isInstance(value: any) {
        return value instanceof Action;
    }

}
