const { version, Document, elements: { Voice } } = require("./");

const document = Document.parse("<speak><voice name=\"xiaohai\"><p>听我说谢谢你</p></voice></speak>");
console.log(document.render({
    provider: "google",
    pretty: true
}));
