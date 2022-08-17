const { version, Document, elements: { Voice }, Aliyun, Microsoft } = require("./");

const document = new Document({
    version: "1.0",
    language: "zh-CN",
    children: [
        {
            type: "voice",
            name: "crazy",
            children: [
                {
                    type: "backgroundAudio",
                    src: "http://sssss"
                },
                {
                    type: "expressAs",
                    style: "service"
                },
                {
                    type: "paragraph",
                    children: [
                        "KFC Crazy Thursday V me 50"
                    ]
                },
                {
                    type: "word",
                    children: ["Test"]
                }
            ]
        }
    ]
});
console.log(document.render({
    provider: "yunXiaoWei",
    pretty: true
}));
