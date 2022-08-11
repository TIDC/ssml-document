import IMarkOptions from './interface/IMarkOptions';
import Element from './Element';
import util from '../lib/util';

export default class Mark extends Element {

    static type = Element.Type.Mark;
    type = Element.Type.Mark;
    name?: string;  //标识名称

    constructor(options: IMarkOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            name: util.isString
        });
    }

    get tagName() {
        return "mark";
    }

}
