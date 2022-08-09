import ICompilerOptions from './interface/ICompilerOptions';
import extension from './extension';
import util from './util';

const DISABLE_TARGETS_SCRIPT = `const ${["require", "process", "eval", "Buffer", "Function", "fetch", "global", "window", "alert"].join("={},")}={};`;  //禁用的方法和对象

export default class Compiler {

    global: any;  //全局对象
    dataset: any;  //数据集对象
    debug: boolean = false;  //是否为调试模式

    constructor(options?: ICompilerOptions) {
        const { dataset = {}, script = "", functions, debug = false } = options || {};
        this.dataset = util.cloneDeep(dataset);
        this.global = this.generateGlobal(script, functions);  //生成全局对象
        this.debug = debug;
    }

    compile(value: any, scope: any = {}): any {
        if (util.isString(value)) {  //字符串处理
            const expressions = this.extractExpressions(value);
            if (!expressions.length) return value;  //未找到表达式直接返回原始值
            return expressions.reduce((result: any, expressionObject: any) => {
                const { expression, regExp } = expressionObject;
                const evalResult = this.eval(expression, scope);
                return util.isNil(evalResult) ? result : result.replace(regExp, evalResult);
            }, value);
        }
        else if (util.isObject(value)) {  //对象处理
            if (util.isArray(value)) {  //数组处理
                let children: any[] = [];
                const _scope = util.omit(scope, ["ifFlag"]);  //过滤条件分歧标志限制作用域
                value.forEach(v => {
                    const result = this.compile(util.cloneDeep(v), _scope);
                    if (result === null) return;  //如果返回null则此节点丢弃
                    if (util.isArray(result))
                        children = [...children, ...result];
                    else
                        children.push(result);
                });
                return children;
            }
            const attrs = value as any;
            const { for: $for, forItem, forIndex, if: $if, elif, else: $else } = attrs;
            if (util.isString($if)) {  //如果分歧
                if (!$if.length) {  //如果为空则丢弃节点
                    scope.ifFlag = false;
                    return null;
                }
                const expressions = this.extractExpressions($if);
                if (expressions.length) {
                    const { expression } = expressions[0];
                    const result = this.eval(expression, scope);
                    if (!result) {
                        scope.ifFlag = false;
                        return null;
                    }
                }
                scope.ifFlag = true;  //设置分歧为真
            }
            else if (util.isString(elif)) {  //否则如果分歧
                if (!util.isBoolean(scope.ifFlag)) throw new Error("elif attribute node must follow the if attribute node");
                if (!elif.length || scope.ifFlag) {  //如果此条件为空或上个条件分歧为真则本节点丢弃
                    scope.ifFlag = false;
                    return null;
                }
                const expressions = this.extractExpressions(elif);
                if (expressions.length) {
                    const { expression } = expressions[0];
                    const result = this.eval(expression, scope);
                    if (!result) {
                        scope.ifFlag = false;
                        return null;
                    }
                }
                scope.ifFlag = true;  //设置分歧为真
            }
            else if ($else) {  //否则分歧
                if (!util.isBoolean(scope.ifFlag)) throw new Error("else attribute node must follow the if or elif attribute node");
                if (scope.ifFlag) {  //如果上个条件分歧为真则本节点丢弃
                    delete scope.ifFlag;
                    return null;
                }
            }
            if (util.isString($for)) {  //循环体
                delete attrs.for;
                const expressions = this.extractExpressions($for);
                if (!expressions.length) return null;  //没有表达式则丢弃本节点
                const { expression } = expressions[0];
                const list = this.eval(expression, scope);
                if (util.isNumber(list)) {
                    const items = [];
                    for (let i = 0; i < list; i++) {
                        const item = this.compile(attrs, {
                            ...scope,
                            [forItem || 'item']: i,
                            [forIndex || 'index']: i,
                        });
                        items.push(item);
                    }
                    return items;
                }
                if (!util.isArray(list) || !list.length) return null;  //如果返回非数组或为空数组则丢弃本节点
                return list.map((v, i) => {
                    const item = util.cloneDeep(attrs);  //克隆节点
                    return this.compile(item, {
                        ...scope,
                        [forIndex || 'index']: i, //设置for-index标注的变量或默认index作用域值供下层节点访问
                        [forItem || 'item']: v, //设置for-item标注的变量或默认item作用域值供下层节点访问
                    });  //将原节点和新节点指向最新生成的节点
                });  //如果为数组则克隆节点并渲染
            }
            const result: any = {};
            for (let key in attrs)
                result[key] = this.compile(attrs[key], scope);
            return result;
        }
        return value;
    }

    eval(expression: string, _scope: any = {}) {
        let result = null;
        try {
            const scope = { ...this.global, ..._scope };
            const evalFun = this.prepareFunctionScript(`return ${expression}`, scope);
            result = evalFun();
        }
        catch (err) {
            this.debug && console.error(`expression ${expression} evaluate error:`, err);
        }
        return result;
    }

    extractExpressions(value: any) {
        if (!util.isString(value)) return [];
        const match = value.toString().match(/(?<={{).*?(?=}})/g); //匹配所有的表达式
        if (!match) return [];
        return match.map((expression: string) => ({
            expression,
            regExp: new RegExp(`\\{\\{${util.escapeRegExp(expression)}\\}\\}`, 'g')
        }));
    }

    generateGlobal(script: string, extendFunctions: any) {
        const { functions } = extension;
        const scope = { ...this.dataset, ...functions, ...extendFunctions };
        return {
            ...scope,
            ...this.prepareFunctionScript(script, scope)() || {}
        };
    }

    prepareFunctionScript(script: string, data: any = {}) {
        const expression = `const {${Object.keys(data).join(",")}}=this;`;
        return Function(expression + DISABLE_TARGETS_SCRIPT + script).bind(data);
    }

}
