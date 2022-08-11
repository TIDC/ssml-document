import IBreakOptions from "./interface/IBreakOptions";
import Element from "./Element";
import util from "../lib/util";

export default class Break extends Element {

    static type = Element.Type.Break;
    type = Element.Type.Break;
    strength?: string;  //中断强度
    time?: string;  //暂停持续时间

    constructor(options: IBreakOptions) {
        super(options);
        this.optionsInject(options, {}, {
            strength: util.isString,
            time: util.isString
        });
    }

    get tagName() {
        return "break";
    }

}
