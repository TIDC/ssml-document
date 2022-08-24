# ssml-document
[![NPM](https://nodei.co/npm/ssml-document.png)](https://nodei.co/npm/ssml-document/)

Follow the [W3C SSML (Speech Synthesis Markup Language)](https://www.w3.org/TR/speech-synthesis/) specification to build SSML documents that meet the requirements of all major voice service providers.

遵循 [W3C SSML（语音合成标记语言）规范](https://www.w3.org/TR/speech-synthesis/)，构建符合所有主要语音服务提供商要求的 SSML 文档。

Currently supports the generation of SSML documents for these service providers: 
[Microsoft Azure](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [Aliyun](https://help.aliyun.com/document_detail/101645.html) / [Tencent Cloud](https://cloud.tencent.com/document/product/1073/49575) / [Google Cloud](https://cloud.google.com/text-to-speech/docs/ssml) / [Amazon AWS](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / Tencent YunXiaoWei / ...

当前支持生成这些服务商的SSML文档: 
[微软云](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [阿里云](https://help.aliyun.com/document_detail/101645.html) / [腾讯云](https://cloud.tencent.com/document/product/1073/49575) / [谷歌云](https://cloud.google.com/text-to-speech/docs/ssml) / [亚马逊云](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / 腾讯云小微 / ...

Every month we check the development documents of these service providers to ensure that the library is not out of date.

每月我们会检查这些服务商的开发文档，以确保本库不会过时。

## Basic Usage

build microsoft-azure ssml:

```javascript
const { Document, ServiceProvider } = require("ssml-document");
const doc = new Document();
const ssml = doc
.prosody({ rate: 1.2, pitch: 1.1 })
.say("Hello World")
.pause(500)
.say("GO GO GO")
.sayAs("123456", { interpretAs: "digits" })
.up()
.render({ provider: ServiceProvider.Microsoft });
console.log(ssml);
//<?xml version="1.0"?><speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts"><prosody pitch="110%" rate="120%">Hello World<break time="500ms"/>GO GO GO</prosody></speak>
```

build aliyun ssml:

```javascript
const { Document, ServiceProvider } = require("ssml-document");
const doc = new Document();
const ssml = doc
.prosody({ rate: 1.2, pitch: 1.1 })
.say("我的身高")
.phoneme("长", {
    alphabet: "py",
    ph: "zhǎng"  //or zhang3
})
.say("高了")
.s("欢迎来到")
.sub("W3C", "万维网")
.up()
.up()
.render({ provider: ServiceProvider.Aliyun });
console.log(ssml);
//<speak rate="100" pitch="50">我的身高<phoneme alphabet="py" ph="zhang3">长</phoneme>高了<s>欢迎来到<sub alias="万维网">W3C</sub></s></speak>
```

