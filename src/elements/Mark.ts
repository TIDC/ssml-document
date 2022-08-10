import IMarkOptions from './interface/IMarkOptions';
import Element from './Element';
import util from '../lib/util';

export default class Mark extends Element {

    static type = Element.Type.Mark;
    type = Element.Type.Mark;
    static tagName = "mark";
    name?: string;  //标识名称

    constructor(options: IMarkOptions) {
        super(options);
        this.optionsInject(options, {}, {
            name: util.isString
        });
    }

    get tagName() {
        return Mark.tagName;
    }

}
