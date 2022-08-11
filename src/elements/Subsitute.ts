import ISubsituteOptions from './interface/ISubsituteOptions';
import Element from "./Element";
import util from "../lib/util";

export default class Subsitute extends Element {

    static type = Element.Type.Subsitute;
    type = Element.Type.Subsitute;
    alias?: string;  //朗读别名

    constructor(options: ISubsituteOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            alias: util.isString
        });
    }

    get tagName() {
        return "sub";
    }

}
