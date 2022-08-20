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

export default {
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
        if(!lodash.isString(value)) return Number(value);
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
        if(!lodash.isFinite(Number(value))) return value;
        if(value < 1000)
            return value + "ms";
        if(value < 1000 * 60)
            return value / 1000 + "s";
        if(value < 1000 * 60 * 60)
            return value / (1000 * 60) + "m";
        return value / (1000 * 60 * 60) + "h";
    },

    pinyin2sapi(value: string) {
        const regExp = new RegExp(/(([a-z]+)(\d))+/g);
        let match = null;
        let chunks = [];
        while((match = regExp.exec(value)) != null) {
            const [,, symbol, tone] = match;
            chunks.push(`${symbol} ${tone}`);
        }
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
