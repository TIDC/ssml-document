import ISubsituteOptions from './interface/ISubsituteOptions';
import ServiceProvider from '../enums/ServiceProvoder';
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

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
                return "sub";
            default:
                return null;
        }
    }

}
