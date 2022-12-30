const fs = require("fs");
const path = require("path");

const { Document, elements: { Voice, Prosody, Paragraph, Break } } = require("../../dist");

const document = new Document();
const voice = new Voice({ name: "test-voice" });
document.appendChild(voice);
const prosody = new Prosody({ rate: 1.2, pitch: 1.1, volume: 80 });
voice.appendChild(prosody);
const p = new Paragraph();
p.appendChild("测试一下");
p.appendChild(new Break({ time: 2000 }));
p.appendChild("再测试一下");
prosody.appendChild(p);

fs.writeFileSync(path.join(__dirname, "aggregation.xml"), document.render({
    pretty: true
}));

fs.writeFileSync(path.join(__dirname, "w3c.xml"), document.render({
    pretty: true,
    provider: "w3c"
}));

fs.writeFileSync(path.join(__dirname, "aliyun.xml"), document.render({
    pretty: true,
    provider: "aliyun"
}));

fs.writeFileSync(path.join(__dirname, "microsoft.xml"), document.render({
    pretty: true,
    provider: "microsoft"
}));

fs.writeFileSync(path.join(__dirname, "tencent.xml"), document.render({
    pretty: true,
    provider: "tencent"
}));

fs.writeFileSync(path.join(__dirname, "amazon.xml"), document.render({
    pretty: true,
    provider: "amazon"
}));

fs.writeFileSync(path.join(__dirname, "google.xml"), document.render({
    pretty: true,
    provider: "google"
}));

fs.writeFileSync(path.join(__dirname, "yunXiaoWei.xml"), document.render({
    provider: "yunXiaoWei"
}));
fs.writeFileSync(path.join(__dirname, "huoshanyun.xml"), document.render({
    provider: "huoshanyun"
}));
