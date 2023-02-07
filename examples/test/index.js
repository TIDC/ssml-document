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
console.log(document.getDuration(), document.exportActions())
const result = document.render({
    provider: document.provider,
    pretty: true
});

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
