import { parseDocument } from 'htmlparser2';

import ICompilerOptions from './interface/ICompilerOptions';
import util from './util';

const PARSER_OPTIONS = { xmlMode: true };

export default {

    

    parseAttributes(value: any) {
        const attributes: any = {};
        for(let key in value) {
            const index = key.indexOf("-");
            if(index !== -1) {
                const oKey = key.substring(0, index);
                const vkey = key.substring(index + 1);
                if(!attributes[oKey])
                    attributes[oKey] = {};
                attributes[oKey][vkey] = value[key];
            }
            else
                attributes[key] = value[key];
        }
        return attributes;
    },

    parseToDocument(value: any) {
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
