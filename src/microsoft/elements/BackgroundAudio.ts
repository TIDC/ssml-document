import Element from "./Element";

export default class BackgroundAudio extends Element {

    static type = Element.Type.BackgroundAudio;
    type = Element.Type.BackgroundAudio;
    static tagName = "mstts:backgroundaudio";


    get tagName() {
        return BackgroundAudio.tagName;
    }

}
