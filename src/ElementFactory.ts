import ICompilerOptions from "./lib/interface/ICompilerOptions";
import Element from "./elements/Element";
import { Audio, Break, Language, Lexicon, Paragraph, Phoneme, Prosody, Raw, SayAs, Sentence, Subsitute, Voice, Word } from "./elements";
import util from "./lib/util";

export default class ElementFactory {

    static createElement(data: any, compilerOptions?: ICompilerOptions, parent?: any) {
        if(Element.isInstance(data)) return data;
        if(util.isString(data))  //纯文本添加为Raw节点
            data = { type: Raw.type, value: data };
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        const element = new (({
            [Element.Type.Audio]: Audio,
            [Element.Type.Break]: Break,
            [Element.Type.Language]: Language,
            [Element.Type.Lexicon]: Lexicon,
            [Element.Type.Paragraph]: Paragraph,
            [Element.Type.Phoneme]: Phoneme,
            [Element.Type.Prosody]: Prosody,
            [Element.Type.SayAs]: SayAs,
            [Element.Type.Sentence]: Sentence,
            [Element.Type.Subsitute]: Subsitute,
            [Element.Type.Voice]: Voice,
            [Element.Type.Word]: Word,
            [Element.Type.Raw]: Raw
        } as any)[(data as any).type] || Element)(data, compilerOptions);
        element.parent = parent;
        return element;
    }

}