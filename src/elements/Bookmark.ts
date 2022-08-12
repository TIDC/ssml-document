import IBookmarkOptions from './interface/IBookmarkOptions';
import Element from '../elements/Element';
import util from '../lib/util';

export default class Bookmark extends Element {

    static type = Element.Type.Bookmark;
    type = Element.Type.Bookmark;
    mark?: string;  //标识

    constructor(options: IBookmarkOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            mark: util.isString
        });
    }

    get tagName() {
        return "bookmark";
    }

}
