import ICompilerOptions from "./lib/interface/ICompilerOptions";
import Element from "./elements/Element";
import { Audio, Action, AutoBreaths, Break, BackgroundAudio, Bookmark, ExpressAs, Emotion, Effect, Silence, Language, Lexicon, Paragraph, Phoneme, Parallel, Prosody, Raw, SayAs, SoundEvent, Sentence, Subsitute, Sequential, Voice, Word, Emphasis, Mark } from "./elements";
import util from "./lib/util";

export default class ElementFactory {

    static createElement(data: any, compilerOptions?: ICompilerOptions) {
        if(Element.isInstance(data)) return data;
        if(util.isString(data))  //纯文本添加为Raw节点
            data = { type: Raw.type, value: data };
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        return new (this.getElementTarget((data as any).type))(data, compilerOptions, this);
    }

    static getElementTarget(type: string) {
        return ({
            [Element.Type.Audio]: Audio,
            [Element.Type.Action]: Action,
            [Element.TypeAlias.Action]: Action,
            [Element.Type.AutoBreaths]: AutoBreaths,
            [Element.TypeAlias.AutoBreaths]: AutoBreaths,
            [Element.Type.Break]: Break,
            [Element.Type.ExpressAs]: ExpressAs,
            [Element.TypeAlias.ExpressAs]: ExpressAs,
            [Element.Type.Emotion]: Emotion,
            [Element.Type.Effect]: Effect,
            [Element.Type.Emphasis]: Emphasis,
            [Element.Type.Language]: Language,
            [Element.TypeAlias.Language]: Language,
            [Element.Type.Lexicon]: Lexicon,
            [Element.Type.Paragraph]: Paragraph,
            [Element.TypeAlias.Paragraph]: Paragraph,
            [Element.Type.Phoneme]: Phoneme,
            [Element.Type.Parallel]: Parallel,
            [Element.TypeAlias.Parallel]: Parallel,
            [Element.Type.Prosody]: Prosody,
            [Element.Type.SayAs]: SayAs,
            [Element.TypeAlias.SayAs]: SayAs,
            [Element.Type.Sentence]: Sentence,
            [Element.TypeAlias.Sentence]: Sentence,
            [Element.Type.Subsitute]: Subsitute,
            [Element.TypeAlias.Subsitute]: Subsitute,
            [Element.Type.SoundEvent]: SoundEvent,
            [Element.TypeAlias.SoundEvent]: SoundEvent,
            [Element.Type.Sequential]: Sequential,
            [Element.TypeAlias.Sequential]: Sequential,
            [Element.Type.Voice]: Voice,
            [Element.Type.BackgroundAudio]: BackgroundAudio,
            [Element.TypeAlias.BackgroundAudio]: BackgroundAudio,
            [Element.TypeAlias.BackgroundAudio2]: BackgroundAudio,
            [Element.Type.Bookmark]: Bookmark,
            [Element.Type.Silence]: Silence,
            [Element.Type.Word]: Word,
            [Element.TypeAlias.Word]: Word,
            [Element.Type.Mark]: Mark,
            [Element.Type.Raw]: Raw
        })[type] || Element;
    }

}
