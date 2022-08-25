import IExpressAsOptions from './interface/IExpressAsOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";
import util from "../lib/util"; 

export default class ExpressAs extends Element {

    static type = Element.Type.ExpressAs;
    static tagName = "express-as";
    type = Element.Type.ExpressAs;
    style?: string;  //讲话风格
    styledegree?: number;  //讲话风格强度
    role?: string;  //讲话角色名称

    constructor(options: IExpressAsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {
            styledegree: Number
        }, {
            style: util.isString,
            styledegree: isFinite,
            role: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Aliyun:
                return {
                    category: this.style,
                    intensity: this.styledegree
                };
            case ServiceProvider.Amazon:
                return { name: this.style };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
                return ExpressAs.tagName;
            case ServiceProvider.Aliyun:
                return "emotion";
            case ServiceProvider.Amazon:
                return "amazon:domain";
            case ServiceProvider.Microsoft:
                return "mstts:express-as";
            default:
                return super.getTagName(provider);
        }
    }

}
