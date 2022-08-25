import IMarkOptions from './interface/IMarkOptions';
import ServiceProvider from '../enums/ServiceProvoder';
import Element from './Element';
import util from '../lib/util';

export default class Mark extends Element {

    static type = Element.Type.Mark;
    static tagName = "mark";
    type = Element.Type.Mark;
    name?: string;  //标识名称

    constructor(options: IMarkOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            name: util.isString
        });
    }

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.W3C:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
                return Mark.tagName;
            default:
                return super.getTagName(provider);
        }
    }

}
