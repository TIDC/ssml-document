import { create } from 'xmlbuilder2';

import IBaseOptions from './interface/IBaseOptions';
import ICompilerOptions from './lib/interface/ICompilerOptions';
import ServiceProvider from './enums/ServiceProvoder';
import Compiler from './lib/Compiler';
import util from './lib/util';

class Base {

    compile?: boolean;  //是否编译
    debug?: boolean;  //是否为调试模式
    compilerOptions?: ICompilerOptions;  //编译器选项

    constructor(options?: IBaseOptions, compilerOptions?: ICompilerOptions) {
        if(!options) return;
        this.optionsInject(options, {
            compile: util.booleanParse,
            debug: util.booleanParse
        }, {
            compile: util.isBoolean,
            debug: util.isBoolean
        });
        this.compilerOptions = compilerOptions;
    }

    optionsCompile(options: any) {
        const compilerOptions = this.compilerOptions || {};
        compilerOptions.debug = this.debug;
        return new Compiler(compilerOptions).compile(options);
    }

    optionsInject(options: any = {}, initializers: any = {}, checkers: any = {}) {
        if(util.isArray(options))  //如果options为数组则制取首个
            options = options[0];
        const that = this as any;
        Object.keys(that).forEach(key => {
            if (/^_/.test(key) && !/^__/.test(key)) return;
            let value = options[key];
            if (util.isFunction(initializers[key])) value = initializers[key](value);
            if (util.isFunction(checkers[key]) && !checkers[key](value)) {
                if(util.isUndefined(that[key]) && util.isUndefined(options[key])) return;
                console.warn("invalid options:", options);
                throw new Error(`parameter ${key} invalid`);
            };
            if ((!util.isFunction(initializers[key]) && !util.isFunction(checkers[key])) || util.isUndefined(value)) return;
            that[key] = value;
        });
    }

    optionsExport(provider?: ServiceProvider, _excludeAttrNames?: string[]) {
        const excludeAttrNames = ["type", "children", "content", "compile", "debug", "compilerOptions", ...(_excludeAttrNames || [])];
        const options: any = {};
        for(let key in this) {
            if(excludeAttrNames.indexOf(key) !== -1)
                continue;
            options[key === "__type" ? "type" : key] = this[key];
        }
        return options;
    }
    
    createRootTag(name?: string, attrs?: any) {
        return name ? create().ele(name, attrs) : create();
    }

}

export default Base;
