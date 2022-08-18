import IParallelOptions from './interface/IParallelOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class Parallel extends Element {

    static type = Element.Type.Parallel;
    type = Element.Type.Parallel;

    constructor(options: IParallelOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Google:
                return "par";
            default:
                return null;
        }
    }

}
