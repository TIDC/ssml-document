import IElementOptions from "./interface/IElementOptions";
import ICompilerOptions from "../lib/interface/ICompilerOptions";
import ElementFactory from "../ElementFactory";
import ElementTypes from "../enums/ElementTypes";
import Document from "../Document";
import Base from "../Base";
import util from "../lib/util";

export default class Element extends Base {

    static Type = ElementTypes;
    static type = ElementTypes.Element;
    type = ElementTypes.Element;
    content?: string;  //元素内容
    value?: string;  //元素值
    children?: Element[] = [];  //元素子节点
    #parent?: Document | Element;  //父级节点

    constructor(options: IElementOptions, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.optionsInject(options, {
            children: (v: any) => (v || []).map((options: any) => ElementFactory.createElement(options, compilerOptions, this))
        }, {
            content: util.isString,
            value: util.isString,
            children: util.isArray
        });
    }

    render(options: { pretty?: boolean, headless?: boolean } = {}, parent?: any) {
        const tag = parent ? parent.ele(this.tagName) : this.createRootTag(this.tagName);
        const _options = this.optionsExport();
        for(let key in _options)
            tag.att(key, _options[key]);
        this.content && tag.txt(this.content);
        this.children?.forEach(node => node.render(undefined, tag));
        if(!parent)
            return tag.end({
                prettyPrint: options.pretty,
                headless: options.headless
            });
    }

    getText(filter?: any): string {
        return this.children?.reduce((t, e) => t + e.getText(filter), "") as string;
    }

    static create(value: any, compilerOptions?: ICompilerOptions, parent?: any) {
        return Element.isInstance(value) ? value : ElementFactory.createElement(value, compilerOptions, parent);
    }

    static isInstance(value: any) {
        return value instanceof Element;
    }

    get tagName() {
        return "element";
    }

    set parent(node: Document | Element) {
        this.#parent = node;
    }

    get parent() {
        return this.#parent as any;
    }

}
