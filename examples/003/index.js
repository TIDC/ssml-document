const fs = require("fs");
const path = require("path");

const { Document, elements: { Voice, Prosody, Paragraph, Break } } = require("../../dist");

const document = new Document();
const voice = new Voice({ name: "zh-CN-XiaoxiaoNeural" });
document.appendChild(voice);
const prosody = new Prosody({ rate: 1.2 });
voice.appendChild(prosody);
const p = new Paragraph();
p.appendChild("测试一下");
p.appendChild(new Break({ time: 2000 }));
p.appendChild("再测试一下");
prosody.appendChild(p);

const result = document.render({
    pretty: true,
    provider: "microsoft"
});

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
