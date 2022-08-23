const fs = require("fs");
const path = require("path");

const { Document } = require("../../dist");

const content = fs.readFileSync(path.join(__dirname, "ssml.xml")).toString();

const document = Document.parse(content);

const result = document.render({
    pretty: true
});

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
