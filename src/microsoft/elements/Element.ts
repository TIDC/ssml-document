import IElementOptions from "./interface/IElementOptions";
import ICompilerOptions from "../../lib/interface/ICompilerOptions";
import ElementFactory from "../ElementFactory";
import _Element from '../../elements/Element';

export default class Element extends _Element {

    constructor(options: IElementOptions, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions, ElementFactory);
    }

}
