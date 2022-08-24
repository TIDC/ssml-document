import IElementOptions from "./interface/IElementOptions";
import IRenderOptions from "../interface/IRenderOptions";
import ICompilerOptions from "../lib/interface/ICompilerOptions";
import ElementFactory from "../ElementFactory";
import ElementTypes from "../enums/ElementTypes";
import ElementTypesAlias from "../enums/ElementTypesAlias";
import ServiceProvider from "../enums/ServiceProvoder";
import Document from "../Document";
import Base from "../Base";
import util from "../lib/util";

export default class Element extends Base {

    static Type = ElementTypes;
    static TypeAlias = ElementTypesAlias;
    static type = ElementTypes.Element;
    type = ElementTypes.Element;
    content?: string;  //元素内容
    value?: string;  //元素值
    provider?: ServiceProvider;  //预期产出提供商
    children?: Element[] = [];  //元素子节点
    #parent?: Document | Element;  //父级节点

    constructor(options: IElementOptions = {}, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.compile && Object.assign(options, this.optionsCompile(options));
        this.optionsInject(options, {
            provider: (v: any) => util.defaultTo(v, ServiceProvider.Aggregation),
            children: (v: any) => (v || []).map((options: any) => {
                const node = ElementFactory.createElement(options, compilerOptions);
                node.parent = this;
                return node;
            })
        }, {
            content: util.isString,
            value: util.isString,
            provider: util.isString,
            children: util.isArray
        });
    }

    appendChild(node: any) {
        if(!Element.isInstance(node))
            node = ElementFactory.createElement(node, this.compilerOptions);
        node.parent = this;
        this.children?.push(node);
    }

    render(options: IRenderOptions = {}, parent?: any) {
        options.provider = options.provider || ServiceProvider.Aggregation;
        const tagName = this.getTagName(options.provider);
        let tag: any;
        if (tagName) {
            tag = parent ? parent.ele(tagName) : this.createRootTag(tagName);
            const _options = this.optionsExport(options.provider);
            for (let key in _options)
                tag.att(key, _options[key]);
        }
        else
            tag = parent;
        this.content && tag.txt(this.content);
        this.children?.forEach(node => node.render(options, tag));
        if (!parent)
            return tag.end({
                prettyPrint: options.pretty,
                headless: util.isBoolean(options.headless) ? options.headless : true
            });
        return tag;
    }

    find(key: string): Element | null {
        for (let node of this.children || []) {
            if (node.type === key)
                return node;
            const foundNode = node.find(key);
            if(foundNode) return foundNode;
        }
        return null;
    }

    getText(filter?: any): string {
        return this.children?.reduce((t, e) => t + e.getText(filter), "") as string;
    }

    up() {
        return this.parent || this;
    }

    static create(value: any, compilerOptions?: ICompilerOptions): Element {
        return Element.isInstance(value) ? value : ElementFactory.createElement(value, compilerOptions);
    }

    static isInstance(value: any) {
        return value instanceof Element;
    }

    getTagName(provider?: ServiceProvider): string | null {
        return null;
    }

    set parent(node: Document | Element) {
        this.#parent = node;
    }

    get parent() {
        return this.#parent as any;
    }

}