import _ElementFactory from '../ElementFactory';
import Element from "./elements/Element";
import { BackgroundAudio, Bookmark, ExpressAs, Silence } from "./elements";

export default class ElementFactory extends _ElementFactory {

    static getElementTarget(type: string) {
        const Target = _ElementFactory.getElementTarget(type);
        if(Target) return Target;
        return ({
            [Element.Type.BackgroundAudio]: BackgroundAudio,
            [Element.Type.Bookmark]: Bookmark,
            [Element.Type.ExpressAs]: ExpressAs,
            [Element.Type.Silence]: Silence
        })[type] || null;
    }

}
