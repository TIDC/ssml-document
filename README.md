# ssml-document
[![NPM](https://nodei.co/npm/ssml-document.png)](https://nodei.co/npm/ssml-document/)

Follow the [W3C SSML (Speech Synthesis Markup Language)](https://www.w3.org/TR/speech-synthesis/) specification to build SSML documents that meet the requirements of all major voice service providers.

遵循 [W3C SSML（语音合成标记语言）规范](https://www.w3.org/TR/speech-synthesis/)，构建符合所有主要语音服务提供商要求的 SSML 文档。

Currently supports the generation of SSML documents for these service providers: 
[Microsoft Azure](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [Aliyun](https://help.aliyun.com/document_detail/101645.html) / [Tencent Cloud](https://cloud.tencent.com/document/product/1073/49575) / [Google Cloud](https://cloud.google.com/text-to-speech/docs/ssml) / [Amazon AWS](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / Tencent YunXiaoWei / ...

当前支持生成这些服务商的SSML文档：
[微软云](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [阿里云](https://help.aliyun.com/document_detail/101645.html) / [腾讯云](https://cloud.tencent.com/document/product/1073/49575) / [谷歌云](https://cloud.google.com/text-to-speech/docs/ssml) / [亚马逊云](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / 腾讯云小微 / ...

Every month we check the development documents of these service providers to ensure that the library is not out of date.

每月我们会检查这些服务商的开发文档，以确保本库不会过时。

## Initialization
```sh
npm i ssml-document --save
```

## Basic Usage

Build microsoft-azure SSML:

构建微软云语音SSML：

```javascript
const { Document, ServiceProvider } = require("ssml-document");
const doc = new Document();
const ssml = doc
.voice("zh-CN-XiaoxiaoNeural")
.prosody({ rate: 1.2, pitch: 1.1 })
.say("Hello World")
.pause(500)
.say("GO GO GO")
.sayAs("123456", { interpretAs: "digits" })
.up()
.up()
.render({
    pretty: true,  //format SSML
    provider: ServiceProvider.Microsoft
});
console.log(ssml);
/*
<?xml version="1.0"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts">
  <voice name="zh-CN-XiaoxiaoNeural">
    <prosody pitch="110%" rate="120%">
      Hello World
      <break time="500ms"/>
      GO GO GO
      <say-as interpret-as="digits">123456</say-as>
    </prosody>
  </voice>
</speak>
*/
```

Build aliyun SSML:

构建阿里云语音SSML：

```javascript
const { Document, ServiceProvider } = require("ssml-document");
const doc = new Document();
const ssml = doc
.voice("aixia")
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
.up()
.render({ pretty: true, provider: ServiceProvider.Aliyun });
console.log(ssml);
/*
<speak voice="aixia" rate="100" pitch="50">
  我的身高
  <phoneme alphabet="py" ph="zhang3">长</phoneme>
  高了
  <s>
    欢迎来到
    <sub alias="万维网">W3C</sub>
  </s>
</speak>
*/
```

Building SSML based on elements:

基于元素构建SSML：

```javascript
const { Document, ServiceProvider, elements } = require("ssml-document");
const { Prosody, Paragraph } = elements;
const doc = new Document();
const prosody = new Prosody({ rate: 1.2, pitch: 1.1 });
const p = new Paragraph();
p.appendChild("Hello World");
prosody.appendChild(p);
doc.appendChild(prosody);
const ssml = doc.render({ provider: ServiceProvider.Amazon });
console.log(ssml);
//<speak><prosody pitch="110%" rate="120%"><p>Hello World</p></prosody></speak>
```

Build aggregated SSML for storage or transport:

构建用于存储或传输的聚合SSML：

```javascript
const { Document } = require("ssml-document");
const doc = new Document();
const ssml = doc
.voice("aixia")
.say("Hello World")
.break(2000)
.say("Bye")
.up()
.render({ pretty: true });  //no provider
console.log(ssml);
/*
<?xml version="1.0"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">
  <voice name="aixia">
    Hello World
    <break time="2s"/>
    Bye
  </voice>
</speak>
*/
```

Support for marking expected voice service providers in aggregated SSML:

支持在聚合SSML中标记期望的语音服务商：

```javascript
//Frontend code:
//前端代码：
const doc = new Document({ provider: ServiceProvider.Aliyun });
const ssml = doc
.voice("aida")
.say("Hello World")
.up()
.render({ pretty: true });  //no provider
console.log(ssml);
/*
<?xml version="1.0"?>
<speak provider="aliyun" version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">
  <voice name="aida">Hello World</voice>
</speak>
*/

//Backend code:
//后端代码：
const doc2 = Document.parse(ssml);
console.log(doc2.provider);  //aliyun
const ssml2 = doc2.render({ provider: doc2.provider });  //build aliyun SSML
console.log(ssml2);
//<speak voice="aida">Hello World</speak>
```

## Features
* Support the construction of SSML that meets the requirements of mainstream voice service providers 支持构建符合主流语音服务商要求的SSML
* Supports parsing and construction of aggregated SSML (intermediate state) 支持聚合SSML（中间态）的解析和构建
* Supports almost all SSML document tags 支持几乎全部的SSML文档标签
* Support for selectively constructing or discarding tags and attributes based on service providers 支持根据服务商选择性构建或丢弃标签与属性
* Support expression compilation to make content change dynamically 支持表达式编译使内容动态变化
* The library supports the following SSML tags and corresponding elements 该库支持以下SSML标签和对应的元素
    * speak - Document
    * voice - Voice
    * prosody - Prosody
    * p - Paragraph
    * s - Sentence
    * w - Word
    * break - Break
    * phoneme - Phoneme
    * say-as - SayAs
    * sub - Subsitute
    * audio - Audio
    * background-audio - BackgroundAudio
    * express-as - ExpressAs
    * emotion - Emotion
    * effect - Effect
    * emphasis - Emphasis
    * lang - Language
    * mark - Mark
    * bookmark - Bookmark
    * seq - Sequential
    * par - Paragraph
    * lexicon - Lexicon
    * auto-breath - AutoBreaths
    * silence - Silence

