const { version, Document, elements: { Voice } } = require("./");

const document = Document.parse("<speak><voice name=\"xiaohai\" gender=\"17\"><prosody duration=\"1000\"><p>听我说<say-as interpret-as=\"string\" format=\"date\">谢谢</say-as>你</p></prosody></voice></speak>");
console.log(document.render({
    provider: "aliyun",
    pretty: true
}));
