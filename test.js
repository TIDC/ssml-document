const fs = require("fs");
const { version, Document, elements: { Voice } } = require("./");

(async () => {
    const content = (await fs.promises.readFile("ssml.xml")).toString();
    const document = Document.parse(content);
    await fs.promises.writeFile("result.xml", document.render({
        provider: "yunXiaoWei",
        pretty: true
    }));
})()
.catch(err => console.error(err));