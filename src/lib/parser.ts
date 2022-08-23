import { parseDocument } from 'htmlparser2';

import ICompilerOptions from './interface/ICompilerOptions';
import Document from '../Document';
import Raw from '../elements/Raw';
import ElementFactory from '../ElementFactory';
import util from './util';

const PARSER_OPTIONS = { xmlMode: true };

export default {

    parseToDocument(value: any, compilerOptions?: ICompilerOptions) {
        const root = this.parseToXMLDocument(value);
        let documentObject, scriptObject;
        for (let o of root.children) {
            if (o.name === "speak" || o.name === Document.type)
                documentObject = o;
            else if(o.name === "script")
                scriptObject = o;
        }
        if (!documentObject)
            throw new Error("document tag not found");
        if(scriptObject) {
            if(!compilerOptions) compilerOptions = {};
            compilerOptions.script = scriptObject.children.reduce((t: any, v: any) => t + (v.data || ""), "");
        }
        const document = this.parseAttributes(documentObject.attribs);
        document.children = [];
        for(let o of documentObject.children) {
            if(o.name)
                document.children.push(this.parseToElement(o, compilerOptions));
        }
        return new Document(document, compilerOptions);
    },

    parseToElement(value: any, compilerOptions?: ICompilerOptions) {
        const root = this.parseToXMLDocument(value);
        let elementObject;
        for (let o of root.children) {
            if (o.name) {
                elementObject = o;
                break;
            }
        }
        if (!elementObject)
            throw new Error("element tag not found");
        const element = {
            type: elementObject.name,
            ...this.parseAttributes(elementObject.attribs),
            children: []
        };
        for(let o of elementObject.children) {
            if(o.name)
                element.children.push(this.parseToElement(o, compilerOptions));
            else if(o.type === "text" && o.data) {
                const text = o.data.trim();
                if(!text.length) continue;
                element.children.push({
                    type: Raw.type,
                    value: text,
                    ...o.attribs
                });
            }
        }
        return util.isString(value) ? ElementFactory.createElement(element, compilerOptions) : element;
    },

    parseAttributes(value: any) {
        const attributes: any = {};
        for(let key in value)
            attributes[key === "type" ? "__type" : key] = value[key];
        return attributes;
    },

    parseToXMLDocument(value: any) {
        if (util.isString(value)) {
            const root = parseDocument(value, PARSER_OPTIONS);
            return root.children.find(v => v.type === "tag" && v.name === "root") || root;
        }
        else if(value && value.type !== "root" && value.name !== "root")
            return { children: [value] };
        else
            return value;
    }

};
