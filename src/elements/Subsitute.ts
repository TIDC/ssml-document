import ISubsituteOptions from './interface/ISubsituteOptions';
import Element from "./Element";
import util from "../lib/util";

export default class Subsitute extends Element {

    static type = Element.Type.Subsitute;
    type = Element.Type.Subsitute;
    static tagName = "sub";
    alias?: string;  //朗读别名

    constructor(options: ISubsituteOptions) {
        super(options);
        this.optionsInject(options, {}, {
            alias: util.isString
        });
    }

    get tagName() {
        return Subsitute.tagName;
    }

}
