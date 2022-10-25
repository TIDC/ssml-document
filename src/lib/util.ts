import lodash from 'lodash';

const vowelTones = [
    "ā", "á", "ǎ", "à",
    "ō", "ó", "ǒ", "ò",
    "ē", "é", "ě", "è",
    "ī", "í", "ǐ", "ì",
    "ū", "ú", "ǔ", "ù",
    "ǖ", "ǘ", "ǚ", "ǜ"
];
const vowels = ["a", "o", "e", "i", "u", "ü"];
const vowelRegExp = new RegExp(vowelTones.join("|"), "g");

const util = {
    ...lodash,

    isUnixTimestamp(value: any) {
        return /^[0-9]{10}$/.test(`${value}`);
    },

    booleanParse(value: any) {
        switch(typeof value) {
            case "string": return ['true', 't', 'yes', 'y', 'on', '1'].indexOf(value.trim().toLowerCase()) !== -1;
            case "number": return value.valueOf() === 1;
            case "boolean": return value.valueOf();
        }
    },

    timeStringToMilliseconds(value: string) {
        if(!util.isString(value)) return Number(value);
        value = value.trim();
        const match = value.match(/^(\d+)(ms|s|m|h)$/);
        if(!match) return null;
        const [, num, unit] = match;
        let milliseconds = Number(num);
        if(unit === "s") milliseconds *= 1000;
        else if(unit === "m") milliseconds *= 1000 * 60;
        else if(unit === "h") milliseconds *= 1000 * 60 * 60;
        return milliseconds;
    },

    millisecondsToTimeString(value: number) {
        if(!util.isFinite(Number(value)))
            return util.durationParse(value as any);
        if(value < 1000)
            return value + "ms";
        if(value < 1000 * 60)
            return value / 1000 + "s";
        if(value < 1000 * 60 * 60)
            return value / (1000 * 60) + "m";
        return value / (1000 * 60 * 60) + "h";
    },

    durationParse(value: string) {
        return ({
            "x-weak": 250,
            "weak": 500,
            "medium": 750,
            "strong": 1000,
            "x-strong": 1250
        })[value] || value;
    },

    rateParse(value: string) {
        return ({
            "x-slow": 0.1,
            "slow": 0.5,
            "medium": 1.0,
            "fast": 1.5,
            "x-fast": 2.0
        })[value] || value;
    },

    pitchParse(value: string) {
        return ({
            "x-slow": 0.1,
            "slow": 0.5,
            "medium": 1.0,
            "high": 1.5,
            "x-high": 2
        })[value] || value;
    },

    volumeParse(value: string) {
        return ({
            "silent": 0,
            "x-soft": 10,
            "soft": 50,
            "medium": 100,
            "loud": 150,
            "x-loud": 200
        })[value] || value;
    },

    volumeValueParse(value: number) {
        if(value < 10) return "silent";
        else if(value < 50) return "x-soft";
        else if(value < 100) return "soft";
        else if(value < 150) return "medium";
        else if(value < 200) return "loud";
        else return "x-loud";
    },

    pinyin2sapi(value: string) {
        const regExp = new RegExp(/(([a-z]+)(\d))+/g);
        let match = null;
        let chunks = [];
        while((match = regExp.exec(value)) != null) {
            const [,, symbol, tone] = match;
            chunks.push(`${symbol} ${tone}`);
        }
        if(!chunks.length)  //无匹配音标时无音标处理
            chunks.push(value);
        return chunks.join(" - ");
    },

    pinyinConvert(value: string) {
        const spaceRegExp = /\s/g;
        let temp, offset = 0;
        let ph = value.split("");
        while ((temp = vowelRegExp.exec(value)) != null) {
            const toneIndex = vowelTones.indexOf(temp[0]);
            const vowelIndex = Math.floor(toneIndex / 4);
            const spaceMatch = spaceRegExp.exec(value);
            ph[temp.index + offset] = vowels[vowelIndex];
            if (spaceMatch)
                ph.splice(spaceMatch.index + offset, 0, `${toneIndex % 4 + 1}`);
            else
                ph.push(`${toneIndex % 4 + 1}`);
            offset++;
        }
        return ph.join("");
    }

};

export default util;
