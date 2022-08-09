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
    }

};
