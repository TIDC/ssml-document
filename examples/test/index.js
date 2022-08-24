const fs = require("fs");
const path = require("path");

const { Document } = require("../../dist");

const aggregationSSML = '<?xml version="1.0"?>\
<speak compile="true" version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">\
  <voice name="aixia">\
    <s if="{{Math.random() > 0.5}}" for="{{s1}}">{{item}}<break time="100"></s>\
    <s else="true" for="{{s2}}">{{item}}<break time="100"></s>\
  </voice>\
</speak>';
const document = Document.parse(aggregationSSML, {
    dataset: {
        s1: ["Oh", "my", "god"],
        s2: ["Holy", "crap"]
    }
});
const ssml = document.render({
    provider: document.provider,
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
