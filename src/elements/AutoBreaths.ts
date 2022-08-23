import IAutoBreathsOptions from './interface/IAutoBreathsOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from "./Element";

export default class AutoBreaths extends Element {

    static type = Element.Type.AutoBreaths;
    type = Element.Type.AutoBreaths;

    constructor(options: IAutoBreathsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
                return "auto-breaths";
            case ServiceProvider.Amazon:
                return "amazon:auto-breaths";
            default:
                return super.getTagName(provider);
        }
    }

}
