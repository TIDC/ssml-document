import IBookmarkOptions from './interface/IBookmarkOptions';
import IRenderOptions from "../interface/IRenderOptions";
import ServiceProvider from '../enums/ServiceProvoder';
import Element from '../elements/Element';
import util from '../lib/util';

export default class Bookmark extends Element {

    static type = Element.Type.Bookmark;
    static tagName = "bookmark";
    type = Element.Type.Bookmark;
    mark?: string;  //标识

    constructor(options: IBookmarkOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {
            mark: util.isString
        });
    }

    optionsExport(provider?: ServiceProvider) {
        const options = super.optionsExport(provider);
        switch(provider) {
            case ServiceProvider.Amazon:
                return { name: this.mark };
        }
        return options;
    }

    getTagName(provider?: ServiceProvider) {
        switch(provider) {
            case ServiceProvider.Aggregation:
            case ServiceProvider.Thinkive:
                return Bookmark.tagName;
            case ServiceProvider.Amazon:
                return "mark";
            case ServiceProvider.Microsoft:
                return "mstts:bookmark";
            default:
                return super.getTagName(provider);
        }
    }

    getLabelText(options: IRenderOptions = {}) {
        const labelText = (options.labelMap || {})[this.type as string] || "书签";
        return `[${labelText}:${this.name || this.mark}]`;
    }

    static isInstance(value: any) {
        return value instanceof Bookmark;
    }

}
