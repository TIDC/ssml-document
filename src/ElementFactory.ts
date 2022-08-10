import ICompilerOptions from "./lib/interface/ICompilerOptions";
import { Element, Audio, Bookmark, Break, Language, Lexicon, Paragraph, Phoneme, Prosody, Raw, SayAs, Sentence, Subsitute, Voice, Word } from "./elements";
import util from "./lib/util";

export default class ElementFactory {

    static createElement(data: any, compilerOptions?: ICompilerOptions, parent?: any) {
        if(Element.isInstance(data)) return data;
        if(util.isString(data))  //纯文本添加为Raw节点
            data = { type: Raw.type, value: data };
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        const element = new (({
            
        } as any)[(data as any).type] || Element)(data, compilerOptions);
        element.parent = parent;
        return element;
    }

}