export const maskString = (input: string): string => {
    if (input) {
        const regExpNotMask = [
            new RegExp(/^(([0-9a-f]{0,4}:){1,7}[0-9a-f]{1,4}|([0-9]{1,3}\.){3}[0-9]{1,3})$/gsi),
            new RegExp(/^static-/gsi), new RegExp(/^unknown subscriber/gsi), new RegExp(/^resolving/gsi)
        ];
        if (regExpNotMask.some(re => re.test(input))) {
            return input;
        }
        const regExpEmailMask = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gsi);
        if (regExpEmailMask.test(input)) {
            return maskEmail(input);
        }

        return input.substring(0, 2) + '*********';
    }
    else {
        return "";
    }
}

const maskEmail = (input: string): string => {
    var splitted = input.split('@'); //sample@ex.co.us -> ['sample', 'ex.co.us']
    const firstPart = splitted[0].substring(0, 2) + '***'; // sa***
    const lastPart = splitted[1].substring(0, 2) + '***'; //ex***
    return firstPart + '@' + lastPart; // sa***@ex***
}