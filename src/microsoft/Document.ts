import ICompilerOptions from "../lib/interface/ICompilerOptions";
import IDocumentOptions from './interface/IDocumentOptions';
import _Document from '../Document';
import ElementFactory from './ElementFactory';

export default class Document extends _Document {

    constructor(options: IDocumentOptions, compilerOptions?: ICompilerOptions) {
        super(options, compilerOptions, ElementFactory);
    }

}
