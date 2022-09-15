# ssml-document
[![NPM](https://nodei.co/npm/ssml-document.png)](https://nodei.co/npm/ssml-document/)

Follow the [W3C SSML (Speech Synthesis Markup Language)](https://www.w3.org/TR/speech-synthesis/) specification to build SSML documents that meet the requirements of all major voice service providers.

遵循 [W3C SSML（语音合成标记语言）规范](https://www.w3.org/TR/speech-synthesis/)，构建符合所有主要语音服务提供商要求的 SSML 文档。

Currently supports the generation of SSML documents for these service providers: 
[Microsoft Azure](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [Aliyun](https://help.aliyun.com/document_detail/101645.html) / [Tencent Cloud](https://cloud.tencent.com/document/product/1073/49575) / [Google Cloud](https://cloud.google.com/text-to-speech/docs/ssml) / [Amazon AWS](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / Tencent YunXiaoWei / XMOV ...

当前支持生成这些服务商的SSML文档：
[微软云](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/speech-synthesis-markup) / [阿里云](https://help.aliyun.com/document_detail/101645.html) / [腾讯云](https://cloud.tencent.com/document/product/1073/49575) / [谷歌云](https://cloud.google.com/text-to-speech/docs/ssml) / [亚马逊云](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) / 腾讯云小微 / XMOV魔珐科技 ...

Every month we check the development documents of these service providers to ensure that the library is not out of date.

每月我们会检查这些服务商的开发文档，以确保本库不会过时。

## Initialization
```sh
npm i ssml-document --save
```

## Features
* Support the construction of SSML that meets the requirements of mainstream voice service providers 支持构建符合主流语音服务商要求的SSML
* Supports parsing and construction of aggregated SSML (intermediate state) 支持聚合SSML（中间态）的解析和构建
* Supports almost all SSML document tags 支持几乎全部的SSML文档标签
* Support for selectively constructing or discarding tags and attributes based on service providers 支持根据服务商选择性构建或丢弃标签与属性
* Support expression compilation to make content change dynamically 支持JavaScript表达式求值使内容动态变化
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
    * par - Parallel
    * lexicon - Lexicon
    * auto-breaths - AutoBreaths
    * silence - Silence

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
const { Document } = require("ssml-document");
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

Get speech rate, pitch, volume and speaker parameters.

获取语音语速、语调、音量以及发音人参数

```javascript
const { Document } = require("ssml-document");
const doc = new Document();
doc.voice("aixia")
  .prosody({ rate: 1.2, pitch: 1.1 })
  .say("Example Text");
console.log(doc.rate, doc.pitch, doc.volume, doc.speaker);
//1.2 1.1 100 aixia
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

Setting the compile attribute for tags enables JavaScript syntax expression evaluation:

给标签设置compile属性启用JavaScript语法表达式求值:

```javascript
const { Document } = require("ssml-document");
const aggregationSSML = '<?xml version="1.0"?>\
<speak compile="true" version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">\
  <voice name="aixia">\
    Master, {{[\"today is a beautiful day\",\"have a good day from now\",\"the weather is not bad today\"][parseInt(Math.random() * 3)]}}.\
    <break time="500"/>\
    The current time is {{time}}.\
  </voice>\
</speak>';
const date = new Date();
const doc = Document.parse(aggregationSSML, {
    dataset: {
        time: date.getHours() + ":" + date.getMinutes()
    }
});
const ssml = doc.render({
    provider: doc.provider,
    pretty: true
});
console.log(ssml);
/*
<?xml version="1.0"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">
  <voice name="aixia">
    Master, have a good day from now.
    <break time="500ms"/>
    The current time is 22:48.
  </voice>
</speak>
*/
```

Setting for/if/elif/else attributes for tags can also implement loops and conditional divergence.
给标签设置 for/if/elif/else 属性还能够实现循环和条件分歧。

```javascript
const { Document } = require("ssml-document");
const aggregationSSML = '<?xml version="1.0"?>\
<speak compile="true" version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">\
  <voice name="aixia">\
    <s if="{{Math.random() > 0.5}}" for="{{s1}}">{{item}}<break time="100"></s>\
    <s else="true" for="{{s2}}">{{item}}<break time="100"></s>\
  </voice>\
</speak>';
const doc = Document.parse(aggregationSSML, {
    dataset: {
        s1: ["Oh", "my", "god"],
        s2: ["Holy", "crap"]
    }
});
const ssml = doc.render({
    provider: doc.provider,
    pretty: true
});
console.log(ssml);
/*
<?xml version="1.0"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">
  <voice name="aixia">
    <s>
      Holy
      <break time="100ms"/>
    </s>
    <s>
      crap
      <break time="100ms"/>
    </s>
  </voice>
</speak>
*/
```

## Elements

### Document
```
Tag: speak
Support: w3c / microsoft / aliyun / tencent / google / amazon
```

### Voice
```
Tag: voice
Support: w3c / microsoft / google
```

### Prosody
```
Tag: prosody
Support: w3c / microsoft / google / amazon
```


### Paragraph
```
Tag: p
Support: w3c / microsoft / aliyun / google / amazon
```


### Sentence
```
Tag: s
Support: w3c / microsoft / aliyun / google / amazon
```

### Word
```
Tag: w
Support: w3c / aliyun / google / amazon
```

### Break
```
Tag: break
Support: w3c / microsoft / aliyun / tencent / google / amazon / yunXiaoWei
```

### Phoneme
```
Tag: phoneme
Support: w3c / microsoft / aliyun / tencent / google / amazon / yunXiaoWei
```

### SayAs
```
Tag: say-as
Support: w3c / microsoft / aliyun / tencent / google / amazon
```

### Subsitute
```
Tag: sub
Support: w3c / aliyun / tencent / google / amazon
```

### Audio
```
Tag: audio
Support: w3c / microsoft / aliyun* / google
```

### BackgroundAudio
```
Tag: background-audio / backgroundAudio / backgroundaudio
Support: microsoft / aliyun*
```

### ExpressAs
```
Tag: express-as
Support: microsoft / aliyun* / amazon*
```

### Emotion
```
Tag: emotion
Support: microsoft* / aliyun / amazon*
```

### Effect
```
Tag: effect
Support: aliyun* / amazon
```

### Emphasis
```
Tag: emphasis
Support: w3c / microsoft / google / amazon
```

### Language
```
Tag: lang
Support: w3c / microsoft / google
```

### Mark
```
Tag: mark
Support: w3c / google / amazon
```

### Bookmark
```
Tag: bookmark
Support: microsoft
```

### Sequential
```
Tag: seq
Support: microsoft
```

### Parallel
```
Tag: par
Support: w3c / google
```

### Sequential
```
Tag: seq
Support: w3c / google
```

### Lexicon
```
Tag: lexicon
Support: w3c / microsoft
```

### AutoBreaths
```
Tag: auto-breaths
Support: amazon
```

### Silence
```
Tag: silence
Support: microsoft
```
