import IBookmarkOptions from './interface/IBookmarkOptions';
import Element from './Element';
import util from '../../lib/util';

export default class Bookmark extends Element {

    static type = Element.Type.Bookmark;
    type = Element.Type.Bookmark;
    mark?: string;  //标识

    constructor(options: IBookmarkOptions) {
        super(options);
        this.optionsInject(options, {}, {
            mark: util.isString
        });
    }

    get tagName() {
        return "bookmark";
    }

}
