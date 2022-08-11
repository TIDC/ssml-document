import ISayAsOptions from './interface/ISayAsOptions';
import Element from "./Element";

export default class SayAs extends Element {

    static type = Element.Type.SayAs;
    type = Element.Type.SayAs;

    constructor(options: ISayAsOptions, ...args: any[]) {
        super(options, ...args);
        this.optionsInject(options, {}, {});
    }
    
    get tagName() {
        return "say-as";
    }

}
