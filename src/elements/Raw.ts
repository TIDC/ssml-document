import IRawOptions from './interface/IRawOptions';
import Element from './Element';

export default class Raw extends Element {

    static type = Element.Type.Raw;
    type = Element.Type.Raw;

    constructor(options: IRawOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }

    render(options: any, parent?: any) {
        if(!parent) return this.value || "";
        parent.txt(this.getText());
    }

    getText(filter?: any) {
        if(filter && this.parent && !filter[this.parent.type])
            return "";
        return this.value || "";
    }

    static isInstance(value: any) {
        return value instanceof Raw;
    }

}
