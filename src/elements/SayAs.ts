import ISayAsOptions from './interface/ISayAsOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class SayAs extends Element {

    static type = Element.Type.SayAs;
    type = Element.Type.SayAs;

    constructor(options: ISayAsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }
    
    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Tencent:
                return "say-as";
            default:
                return null;
        }
    }

}
