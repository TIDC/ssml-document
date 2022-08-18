import ICompilerOptions from "./lib/interface/ICompilerOptions";
import Element from "./elements/Element";
import { Audio, Break, BackgroundAudio, Bookmark, ExpressAs, Silence, Language, Lexicon, Paragraph, Phoneme, Prosody, Raw, SayAs, Sentence, Subsitute, Voice, Word } from "./elements";
import util from "./lib/util";

export default class ElementFactory {

    static createElement(data: any, compilerOptions?: ICompilerOptions) {
        if(Element.isInstance(data)) return data;
        if(util.isString(data))  //纯文本添加为Raw节点
            data = { type: Raw.type, value: data };
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        return new (this.getElementTarget((data as any).type) || Raw)(data, compilerOptions, this);
    }

    static getElementTarget(type: string) {
        return ({
            [Element.Type.Audio]: Audio,
            [Element.Type.Break]: Break,
            [Element.Type.Language]: Language,
            [Element.TypeAlias.Language]: Language,
            [Element.Type.Lexicon]: Lexicon,
            [Element.Type.Paragraph]: Paragraph,
            [Element.TypeAlias.Paragraph]: Paragraph,
            [Element.Type.Phoneme]: Phoneme,
            [Element.Type.Prosody]: Prosody,
            [Element.Type.SayAs]: SayAs,
            [Element.TypeAlias.SayAs]: SayAs,
            [Element.Type.Sentence]: Sentence,
            [Element.TypeAlias.Sentence]: Sentence,
            [Element.Type.Subsitute]: Subsitute,
            [Element.TypeAlias.Subsitute]: Subsitute,
            [Element.Type.Voice]: Voice,
            [Element.Type.BackgroundAudio]: BackgroundAudio,
            [Element.TypeAlias.BackgroundAudio]: BackgroundAudio,
            [Element.TypeAlias.BackgroundAudio2]: BackgroundAudio,
            [Element.Type.Bookmark]: Bookmark,
            [Element.Type.ExpressAs]: ExpressAs,
            [Element.TypeAlias.ExpressAs]: ExpressAs,
            [Element.Type.Silence]: Silence,
            [Element.Type.Word]: Word,
            [Element.TypeAlias.Word]: Word,
            [Element.Type.Raw]: Raw
        })[type] || null;
    }

}
