import lodash from 'lodash';

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
        if(!this.isString(value)) return Number(value);
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
        if(value < 1000)
            return value + "ms";
        if(value < 1000 * 60)
            return value / 1000 + "s";
        if(value < 1000 * 60 * 60)
            return value / (1000 * 60) + "m";
        return value / (1000 * 60 * 60) + "h";
    }

};
