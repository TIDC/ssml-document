const fs = require("fs");
const path = require("path");

const { Document } = require("../../dist");

const content = fs.readFileSync(path.join(__dirname, "ssml.xml")).toString();
const date = new Date();
const document = Document.parse(content, {
    dataset: {
        time: date.getHours() + ":" + date.getMinutes()
    }
});
console.log(document.renderHTML({
    className: "thinkive-editor"
}))
const document2 = Document.parseHTML(document.renderHTML({
    className: "thinkive-editor",
    classNamePrefix: "thinkive-"
}))
document2.volume = 120;
const result = document2.render({
    provider: document2.provider,
    pretty: true
});

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
