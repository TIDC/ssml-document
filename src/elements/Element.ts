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
    name?: string;  //yuansu名称
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
            name: util.isString,
            content: util.isString,
            value: util.isString,
            provider: util.isString,
            children: util.isArray
        });
    }

    appendChild(node: any) {
        this.children?.push(this.createNode(node));
    }

    createNode(node: any) {
        if(!Element.isInstance(node))
            node = ElementFactory.createElement(node, this.compilerOptions);
        node.parent = this;
        return node;
    }

    clone(compilerOptions?: ICompilerOptions): any {
        const element = ElementFactory.createElement(util.omit(this, ["children"]), compilerOptions);
        element.children = this.children?.map(node => {
            const _node = node.clone(compilerOptions);
            _node.parent = element;
            return _node;
        }) || [];
        return element;
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
            tag = parent || this.createRootTag("root");
        this.content && tag.txt(this.content);
        this.children?.forEach((node: any, index) => {
            const lastNode: any = index > 0 && this.children ? this.children[index - 1] : null;
            if(lastNode && node.type === "break" && lastNode.type === "break") {
                const time = (util.timeStringToMilliseconds(lastNode.time) || 0) + (util.timeStringToMilliseconds(node.time) || 0);
                time && (node.time = util.millisecondsToTimeString(time));
                return;
            }
            lastNode && lastNode.render(options, tag);
            if(this.children && index === this.children.length - 1)
                node.render(options, tag);
        });
        if (!parent) {
            return tag.end({
                prettyPrint: options.pretty,
                headless: util.isBoolean(options.headless) ? options.headless : true
            })
            .replace(/<root.*?>/, "")
            .replace(/<\/root>$/, "");
        }
        return tag;
    }

    renderHTML(options: IRenderOptions = {}, parent?: any) {
        const tag = parent ? parent.ele("span") : this.createRootTag("span");
        tag.att("class", (options.classNamePrefix || "") + this.type);
        tag.att("contenteditable", this.editable);
        const data = util.omit(this, ["children", "provider", "compile", "debug", "compilerOptions"]) as any;
        for(let key in data)
            tag.att(`data-${key}`, data[key]);
        this.content && tag.txt(this.content);
        if(!this.children?.length)
            tag.txt(this.getLabelText(options));
        this.children?.forEach(node => node.renderHTML(options, tag));
        if (!parent) {
            return tag.end({
                prettyPrint: options.pretty,
                headless: util.isBoolean(options.headless) ? options.headless : true,
                allowEmptyTags: true
            })
            .replace(/<root.*?>/, "")
            .replace(/<\/root>$/, "");
        }
        return tag;
    }

    /**
     * 渲染内容
     */
    renderContent(filter?: any, options?: IRenderOptions) {
        return this.getText(filter, options);
    }

    /**
     * 生成特征字符串
     */
    generateCharacteristicString(): string {
        const options = this.optionsExport(ServiceProvider.Aggregation);  //提取options
        const keys = Object.keys(options).sort();  //对options属性进行字典排序
        const head = keys.reduce((result, key) => options[key] ? (result + `${key}${options[key]}`) : result, "");  //将数据进行拼接生成头部部分
        return this.children?.reduce((result, node) => result + node.generateCharacteristicString(), head) || head;  //生成子元素特征字符串并拼接到尾部
    }

    findOne(key: string): Element | null {
        for (let node of this.children || []) {
            if (node.type === key)
                return node;
            const foundNode = node.findOne(key);
            if(foundNode) return foundNode;
        }
        return null;
    }

    getText(filter?: any, options?: IRenderOptions): string {
        return this.children?.reduce((t, e) => t + e.getText(filter, options), "") as string;
    }

    getLabelText(options: IRenderOptions = {}) {
        return "";
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

    get textLength() {
        return this.getText().length;
    }

    get editable() {
        return false;
    }

}