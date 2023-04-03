import IRawOptions from './interface/IRawOptions';
import Element from './Element';
import ServiceProvider from "../enums/ServiceProvoder";

const symbols = [",", "，", "。", "?", "!", ".", "/", "@", "#", "<", ">", "(", ")", "[", "]", "-", "+", "=", "——", "~", "'", "\"", "“", "”", "{", "}", ":", "：", ";", "；", " ", "\n"];

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
        parent.txt(text.replace(/&nbsp;/g, " "));
    }

    renderHTML(options: any, parent?: any) {
        const tag = super.renderHTML(options, parent);
        tag.txt(this.parent.getLabelText(options) || this.value || "");
    }

    getDuration(options: any = {}) {
        // const rate = options.rate 
        const duration = (this.value?.split("") || [])
        .reduce((total, word: string) => {
            if(symbols.includes(word))
                return total + 100;
            else
                return total += 220;
        }, 0)
        return duration;
    }

    getText(filter?: any) {
        if(filter && this.parent && filter[this.parent.type] === false)
            return "";
        return this.value || "";
    }

    static isInstance(value: any) {
        return value instanceof Raw;
    }

    get editable() {
        return this.parent.editable;
    }

}
