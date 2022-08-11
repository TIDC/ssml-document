const { version, elements: { Voice }, Aliyun, Microsoft } = require("./");
const { Document } = Microsoft;

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
                }
            ]
        }
    ]
});
console.log(document.render({ pretty: true }));
