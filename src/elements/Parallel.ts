import IParallelOptions from './interface/IParallelOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Parallel extends Element {

    static type = Element.Type.Parallel;
    static tagName = "par";
    type = Element.Type.Parallel;

    constructor(options: IParallelOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
                return Parallel.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
