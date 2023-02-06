import IRawOptions from './interface/IRawOptions';
import Element from './Element';
import ServiceProvider from "../enums/ServiceProvoder";

export default class Raw extends Element {

    static type = Element.Type.Raw;
    type = Element.Type.Raw;

    constructor(options: IRawOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
        this.children = [];  //自闭合标签
    }

    render(options: any, parent?: any) {
        if(!parent) return this.value || "";
        let text = this.getText();
        switch(options.provider) {
            case ServiceProvider.Xmov:
                text = text
                .replace(/(\d+)\-(\d+)/g, "$1至$2")
                .replace(/\-(\d+)/g, "负$1");
            break;
        }
        parent.txt(text);
    }

    renderHTML(options: any, parent?: any) {
        super.renderHTML(options, parent);
        parent && parent.txt(this.parent.getLabelText(options) || this.value || "");
    }

    getText(filter?: any) {
        if(filter && this.parent && filter[this.parent.type] === false)
            return "";
        return this.value || "";
    }

    static isInstance(value: any) {
        return value instanceof Raw;
    }

}
