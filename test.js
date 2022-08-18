const { version, Document, elements: { Voice } } = require("./");

const document = Document.parse("<speak><voice name=\"xiaohai\"><prosody duration=\"1000\"><p>听我说谢谢你</p></prosody></voice></speak>");
console.log(document.render({
    provider: "amazon",
    pretty: true
}));
