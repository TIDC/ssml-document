import Element from "./Element";

export default class Audio extends Element {

    static type = Element.Type.Audio;
    type = Element.Type.Audio;
    static tagName = "audio";
    
    
    
    get tagName() {
        return Audio.tagName;
    }

};