import ICompilerOptions from "./lib/interface/ICompilerOptions";
import IDocumentOptions from "./interface/IDocumentOptions";
import IRenderOptions from "./interface/IRenderOptions";
import ServiceProvider from "./enums/ServiceProvoder";
import ElementFactory from "./ElementFactory";
import Element from "./elements/Element";
import { BackgroundAudio, Effect, Emotion, Prosody, Voice } from "./elements";
import Base from "./Base";
import parser from './lib/parser';
import util from "./lib/util";

export default class Document extends Base {

    static type = "speak";
    static tagName = "speak";
    readonly type = "speak";
    version?: string;  //文档版本号
    "xml:lang"?: string;  //语音语言
    "xml:base"?: string;  //文档基础URL
    xmlns = "";  //文档URI
    sampleRate?: string;  //音频采样率
    bitrate?: string;  //音频码率
    provider?: ServiceProvider;  //预期产出提供商
    solution?: string;  //预期形象ID
    pose?: string;  //预期形象姿势ID
    enableSubtitle?: boolean;  //是否开启字幕
    format?: string;  //预期内容格式
    children?: Element[] = [];  //文档子节点
    #parent?: Document | Element;  //父级节点

    constructor(options: IDocumentOptions = {}, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions);
        this.compile && (options = this.optionsCompile(options));
        this.optionsInject(options, {
            ["xml:lang"]: (v: any) => options.language || v,
            ["xml:base"]: (v: any) => options.baseUrl || v,
            version: (v: any) => util.defaultTo(v, "1.0"),
            xmlns: (v: any) => util.defaultTo(v, "http://www.w3.org/2001/10/synthesis"),
            enableSubtitle: util.booleanParse,
            children: (v: any) => (v || []).map((options: any) => {
                const node = ElementFactory.createElement(options, compilerOptions);
                node.parent = this;
                return node;
            })
        }, {
            version: util.isString,
            ["xml:lang"]: util.isString,
            ["xml:base"]: util.isString,
            xmlns: util.isString,
            encodeType: util.isString,
            sampleRate: util.isString,
            bitrate: util.isString,
            provider: util.isString,
            solution: util.isString,
            pose: util.isString,
            format: util.isString,
            enableSubtitle: util.isBoolean,
            children: util.isArray
        });
        this.init(options);
    }

    init(options: IDocumentOptions) {
        options["enable-subtitle"] && (this.enableSubtitle = util.booleanParse(options["enable-subtitle"]));
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

    clone() {
        const document = new Document(util.omit(this, ["children"]));
        document.children = this.children?.map(node => {
            const _node = node.clone(this.compilerOptions);
            _node.parent = document;
            return _node;
        }) || [];
        return document;
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider, ["version", "format", "sampleRate", "bitrate", "solution", "pose", "enableSubtitle", "xmlns", "xml:base", "xml:lang"]);
        if(provider === ServiceProvider.Aggregation) {
            options.provider = this.provider;
            options.solution = this.solution;
            options.pose = this.pose;
            options.enableSubtitle = this.enableSubtitle;
            options.format = this.format;
        }
        let prosody;
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                options.version = this.version;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
            break;
            case ServiceProvider.W3C:
                options.version = this.version;
                options["xml:base"] = this.baseUrl;
                options["xml:lang"] = this.language;
                options.xmlns = this.xmlns;
            break;
            case ServiceProvider.Aliyun:
                const voice = this.findOne("voice") as Voice;
                voice && Object.assign(options, voice.optionsExport(provider));
                prosody = this.findOne("prosody") as Prosody;
                prosody && Object.assign(options, prosody.optionsExport(provider));
                const effect = this.findOne("effect") as Effect;
                effect && Object.assign(options, effect.optionsExport(provider));
                const backgroundAudio = this.findOne("backgroundAudio") as BackgroundAudio;
                backgroundAudio && Object.assign(options, backgroundAudio.optionsExport(provider));
                options.encodeType = this.format;
                options.sampleRate = this.sampleRate;
            break;
            case ServiceProvider.Microsoft:
                options.version = this.version;
                options["xml:lang"] = this.language || "zh";  //必须声明跟文档语言
                options.xmlns = this.xmlns;
                options["xmlns:mstts"] = "https://www.w3.org/2001/mstts";
            break;
            case ServiceProvider.Xmov:
                options.speed = this.getRate(ServiceProvider.Xmov);
                options.pitch = this.getPitch(ServiceProvider.Xmov);
            break;
        }
        return options;
    }

    render(options: IRenderOptions = {}, parent?: any) {
        options.provider = options.provider || ServiceProvider.Aggregation;
        options.headless = util.isBoolean(options.headless) ? options.headless : this.getHeadlessDefaultStatus(options.provider);
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

    /**
     * 渲染HTML
     */
    renderHTML(options: IRenderOptions = {}, parent?: any) {
        const tag = parent ? parent.ele("div") : this.createRootTag("div");
        options.className && tag.att("class", options.className);
        tag.att("contenteditable", true);
        const data = util.omit(this, ["children", "compile", "debug", "compilerOptions"]) as any;
        for(let key in data)
            tag.att(`data-${key}`, data[key]);
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

    findOne(key: string) {
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

    getTagName(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Aliyun:
            case ServiceProvider.Microsoft:
            case ServiceProvider.Google:
            case ServiceProvider.Amazon:
            case ServiceProvider.Tencent:
            case ServiceProvider.Xmov:
            case ServiceProvider.Huoshanyun:
                return "speak";
            default:
                return null;
        }
    }

    getHeadlessDefaultStatus(provider?: ServiceProvider) {
        switch (provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
            case ServiceProvider.W3C:
            case ServiceProvider.Microsoft:
                return false;
            default:
                return true;
        }
    }

    up() {
        return this;
    }

    getRate(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.rate;
    }

    getPitch(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.pitch;
    }

    getVolume(provider?: ServiceProvider) {
        return this.getProsody()?.optionsExport(provider)?.volume;
    }
    
    getProsody() {
        return this.findOne("prosody") as Prosody;
    }

    get category() {
        const emotion = this.findOne("emotion") as Emotion;
        if(!emotion) return;
        return emotion.category;
    }

    set speaker(value) {
        const voice = this.findOne("voice") as Voice;
        if(!voice) return;
        voice.name = value;
    }
    
    get speaker() {
        const voice = this.findOne("voice") as Voice;
        if(!voice) return;
        return voice.name;
    }

    set rate(value: number) {
        let prosody = this.findOne("prosody") as Prosody;
        if(!prosody) {
            prosody = new Prosody();
            let voice = this.findOne("voice") as Voice;
            if(!voice) {
                voice = new Voice();
                voice.children = this.children;
                this.children = [voice];
            }
            prosody.children = voice.children;
            voice.children = [prosody];
        }
        prosody.rate = value;
    }

    get rate(): number {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return 1.0;
        return (prosody.rate || 1.0) as number;
    }

    set pitch(value: number) {
        let prosody = this.findOne("prosody") as Prosody;
        if(!prosody) {
            prosody = new Prosody();
            let voice = this.findOne("voice") as Voice;
            if(!voice) {
                voice = new Voice();
                voice.children = this.children;
                this.children = [voice];
            }
            prosody.children = voice.children;
            voice.children = [prosody];
        }
        prosody.pitch = value;
    }

    get pitch() {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return 1.0;
        return (prosody.pitch || 1.0) as number;
    }

    set volume(value: number | string) {
        let prosody = this.findOne("prosody") as Prosody;
        if(!prosody) {
            prosody = new Prosody();
            let voice = this.findOne("voice") as Voice;
            if(!voice) {
                voice = new Voice();
                voice.children = this.children;
                this.children = [voice];
            }
            prosody.children = voice.children;
            voice.children = [prosody];
        }
        prosody.volume = value;
    }

    get volume(): number | string {
        const prosody = this.findOne("prosody") as Prosody;
        if(!prosody) return 100;
        const volume = util.volumeParse(`${prosody.volume || 100}`);
        return util.isFinite(Number(volume)) ? Number(volume) : volume;
    }

    get language() {
        return this["xml:lang"] as any;
    }

    set language(value: string) {
        this["xml:lang"] = value;
    }

    get baseUrl() {
        return this["xml:base"] as any;
    }

    set baseUrl(value: string) {
        this["xml:base"] = value;
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
        return true;
    }

    static parse = parser.parseToDocument.bind(parser);

    static parseHTML = parser.parseHTMLToDocument.bind(parser);

}
