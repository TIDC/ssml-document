import ISequentialOptions from './interface/ISequentialOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Sequential extends Element {

    static type = Element.Type.Sequential;
    type = Element.Type.Sequential;

    constructor(options: ISequentialOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
                return "par";
            default:
                return null;
        }
    }

}
