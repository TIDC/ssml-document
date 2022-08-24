const fs = require("fs");
const path = require("path");

const { Document } = require("../../dist");

const content = fs.readFileSync(path.join(__dirname, "ssml.xml")).toString();
// const document = Document.parse(content);

const document = new Document({ compile: true });
document
.prosody({ rate: 1.1 })
.say("你好啊")
.pause(5000)
.say("哈哈哈")
.p("56666")
.emotion("哈哈哈哈哈", { category: "cry" })
.up()
.w("abc")
.sub("W3C", "万维网{{1 + 1}}")
.phoneme("长", {
    alphabet: "py",
    ph: "zhǎng"
})
.sayAs("123456", { interpret: "digits" })
.up()
.say("啊啊啊")
.action("test")
.up()
.say("6666");

const result = document.render({
    provider: document.provider,
    pretty: true
});

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
