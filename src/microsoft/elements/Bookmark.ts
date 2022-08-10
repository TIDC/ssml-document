import Element from "./Element";

export default class Bookmark extends Element {

    static type = Element.Type.Bookmark;
    type = Element.Type.Bookmark;
    static tagName = "bookmark";


    get tagName() {
        return Bookmark.tagName;
    }

}
