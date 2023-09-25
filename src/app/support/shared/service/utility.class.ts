import { BedtimeModel } from "../../support-application/shared/models/bed-time.model";
import { EncryptionModes } from "../models/encrption-modes-model";
import { MetaField } from "../models/ssid-meta-fields.model";
import { SupportRadioObjectModel } from "../models/support-radio-object.model";

export const DEFAULT_VALUE = "";
export const SecurityTypes = [
    { id: DEFAULT_VALUE, name: DEFAULT_VALUE },
    { id: "WPAand11i", name: "WPA WPA2 Personal" },
    { id: "WPA", name: "WPA Personal" },
    { id: "11i", name: "WPA2-Personal" },
    { id: "Basic", name: "Security Off" }
];
export const EncryptionTypes = [
    { id: DEFAULT_VALUE, name: DEFAULT_VALUE },
    { id: "AESEncryption", name: "AES" },
    { id: "TKIPEncryption", name: "TKIP" },
    { id: "TKIPandAESEncryption", name: "Both" }];

export const fivegEncryptionTypes = [
    { id: DEFAULT_VALUE, name: DEFAULT_VALUE },
    { id: "AESEncryption", name: "AES" }];

export const encryptionStoreToDisplay = {
    'AESEncryption': 'AES',
    'TKIPEncryption': 'TKIP',
    'TKIPandAESEncryption': 'Both'
};

// export const securityNameToDisplay = {
//     'SecurityOff': 'Security Off',
//     'WPA-PSK': 'WPA-Personal',
//     'WPA2-PSK': 'WPA2-Personal',
//     'WPA/WPA2-PSK': 'WPA - WPA2-Personal',
//     'WPA3-PSK': 'WPA3-Personal',
//     'WPA2/WPA3-PSK': 'WPA2 - WPA3-Personal'
// };


export const securityNameToDisplay = {
    'SecurityOff': 'Security Off',
    'WPA-PSK': 'WPA-Personal',
    'WPA2-PSK': 'WPA2-Personal',
    'WPA/WPA2-PSK': 'WPA WPA2-Personal',
    'WPA3-PSK': 'WPA3-Personal',
    'WPA2/WPA3-PSK': 'WPA2 WPA3-Personal',
    'WPA3-SAE': 'WPA3-SAE'
};


export const ssidMetaPattern = /^[ssid,SSID]{4}[0-9]+/
export const IpPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
/* /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[1-9])$/ */
export const SSIDNamePattern = /^[a-zA-Z0-9\_\!\@\#\$\%\^\&\*\(\)\-\=\+\~\`\,\s\.\?\|\[\]\{\}\"\;\:\,\<\>\\\/\']*$/
export function convertIpAddressToNumber(value) {
    var values = value.split('.');
    var num = (((values[0] * 256) + parseInt(values[1])) * 256 + parseInt(values[2])) * 256 + parseInt(values[3]);
    return num;
}
export const NamePatternError = "The SSID Name may only contain letters [a-zA-Z], numbers [0-9], spaces, or [_!@#$%^&*()-=+~`,.?|[]{}\";:<>/'] , head or trailing spaces are not allowed"

export function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    let temp = url.split('/')
    hostname = temp[0] + "//" + temp[2]
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
export function CreateMetaFieldObject(obj: SupportRadioObjectModel, metaArrayObj: MetaField[], ssidList) {
    var returnObj = {};
    var selectedFieldMeta = metaArrayObj?.filter(x => x.featureName == obj.SSIDName)[0]

    if (selectedFieldMeta) {
        selectedFieldMeta.fields.forEach(x => {
            if (typeof x.writable === "boolean") {
                returnObj[x.name] = x.writable
            } else {
                let ssid: any = Object.keys(x.writable)

                var primarySSIDObj = ssidList?.filter(x => x.SSIDName == ssid[0].split('.')[0])

                returnObj[x.name] = enableFlagUpdate(primarySSIDObj[0]);
            }

        })
    }
    return returnObj;
}
export function enableFlagUpdate(obj: SupportRadioObjectModel) {
    return obj.Enable;
}
export function FetchSecurityOptionsFromSSIDMeta(obj: SupportRadioObjectModel, metaArrayObj: MetaField[], securityOptions: any[]) {
    var returnObj = [];
    var selectedFieldMeta = metaArrayObj?.filter(x => x.featureName == obj.SSIDName)[0]

    if (selectedFieldMeta) {
        selectedFieldMeta.fields.forEach(x => {
            if (securityOptions) {
                securityOptions.forEach(option => {
                    if (x.name === "BeaconType") {
                        if (x.valueList) {
                            x.valueList.forEach(val => {
                                if (val == option.id || val == option.name) {
                                    returnObj.push(option);
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    return returnObj;
}
export function wifiFetchSecurityOptionsFromSSIDMeta(obj: any, metaArrayObj: MetaField[], securityOptions: any[]) {
    var returnObj = [];
    var selectedFieldMeta = obj;  //metaArrayObj.filter(x => x.featureName == obj.SSIDName)[0]

    if (selectedFieldMeta) {
        selectedFieldMeta.fields.forEach(x => {
            if (securityOptions) {
                securityOptions.forEach(option => {
                    if (x.name === "BeaconType") {
                        if (x.valueList) {
                            x.valueList.forEach(val => {
                                if (val == option.id || val == option.name) {
                                    returnObj.push(option);
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    return returnObj;
}

export const basicEncryptionModesParamName = 'BasicEncryptionModes';
export const wpaEncryptionModesParamName = 'WPAEncryptionModes';
export const ieee11iEncryptionModesParamName = 'IEEE11iEncryptionModes';

export function checkMultileFrequency(arr: EncryptionModes[]) {
    var returnBool = false;

    if (arr && arr?.length != 0) {
        arr.forEach(x => {
            if (Object.keys(x).length != 0) {
                if (x.id.match("2.4G") || x.id.match("5G") || x.id.match("6G")) {
                    returnBool = true
                }
            }
        })
    }
    return returnBool;
}

export function seperateRadioList(ssidObject: any[]) {
    var radio24G = [];
    var radio5G = [];
    var radio6G = [];
    ssidObject.forEach(x => {
        if (x.freqBand == '2.4GHz') {
            radio24G.push(x);
        } else if (x.freqBand == '5GHz') {
            radio5G.push(x);
        }
        else if (x.freqBand == '6GHz') {
            radio6G.push(x);
        }
    })
    return { '2.4G': radio24G, '5G': radio5G, '6G': radio6G }
}

export function fetchRadioEncryption(raidoType: string, obj: EncryptionModes[]) {
    switch (raidoType) {
        case "2.4G": {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].id.match("2.4G")) {
                    return obj[i];
                }
            }
        }
        case "5G": {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].id.match("5G")) {
                    return obj[i];
                }
            }
        }
        case "6G": {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].id.match("6G")) {
                    return obj[i];
                }
            }
        }
        default: {

        }
    }
}

export function constructSecurityValues(metaFiled: any) {
    var returnSecurityOptions = [];
    var securityOptions = metaFiled.properties.filter(x => x.featureName.includes("SecurityOptions"))[0]
    if (securityOptions && securityOptions.configuration) {
        let keys = Object.keys(securityOptions.configuration);
        keys.forEach(x => {
            if (securityOptions.configuration[x]) {
                returnSecurityOptions.push({
                    id: securityOptions.configuration[x].BeaconType,
                    name: x
                })
            }
        })
    }
    return returnSecurityOptions;
}

export function constructEncyptionModeValues(metaFiled: any, securityName: string) {
    var securityOptions = metaFiled?.properties?.filter(x => x.featureName.includes("SecurityOptions"))[0]
    if (securityOptions && securityOptions.configuration) {
        let paramName = [basicEncryptionModesParamName, wpaEncryptionModesParamName, ieee11iEncryptionModesParamName]
        return fetchConfigurationEncryption(securityOptions.configuration, paramName, securityName)
    }
}

export function fetchConfigurationEncryption(configurations: any, encryptionName: any[], securityName: string) {
    var returnConfigObj = [];
    Object.keys(securityNameToDisplay).forEach(securityOption => {
        if (configurations[securityOption] && configurations[securityOption].BeaconType == securityName) {
            for (let i = 0; i < encryptionName.length; i++) {
                let encName = encryptionName[i];
                var value = configurations[securityOption][encName];
                if (value) {
                    if (isNonEmptyArrayOfStrings(value)) {
                        value.forEach(val => {
                            returnConfigObj.push(constructEncryptionObject(val));
                        })
                        return;
                    } else {
                        if (typeof value !== 'string') {
                            let val2G = [];
                            let val5G = [];
                            let val6G = [];
                            Object.keys(value).forEach(val => {
                                if (val.match('2.4G')) {
                                    value[val].forEach(encVal => {
                                        val2G.push(constructEncryptionObject(encVal));
                                    })
                                }
                                if (val.match('5G')) {
                                    value[val].forEach(encVal => {
                                        val5G.push(constructEncryptionObject(encVal));
                                    })
                                }
                                if (val.match('6G')) {
                                    value[val].forEach(encVal => {
                                        val6G.push(constructEncryptionObject(encVal));
                                    })
                                }
                            })
                            returnConfigObj.push({ id: '2.4G', name: val2G });
                            returnConfigObj.push({ id: '5G', name: val5G });
                            returnConfigObj.push({ id: '6G', name: val6G });
                            return
                        }
                    }
                }
            }
        }
    })
    return returnConfigObj;
}
export function isNonEmptyArrayOfStrings(value: any): boolean {
    return Array.isArray(value) && value.length && value.every(item => typeof item === "string");
}

export function constructEncryptionObject(encrptionMode: string) {
    var returnEncryptionModesObj = {};

    switch (encrptionMode) {
        case 'AESEncryption': returnEncryptionModesObj = { id: "AESEncryption", name: "AES" }; break;
        case 'TKIPEncryption': returnEncryptionModesObj = { id: "TKIPEncryption", name: "TKIP" }; break;
        case 'TKIPandAESEncryption': returnEncryptionModesObj = { id: "TKIPandAESEncryption", name: "Both" }; break;
        case 'tkip+aes': returnEncryptionModesObj = { id: "tkip+aes", name: "TKIP+AES" }; break;
        case 'aes': returnEncryptionModesObj = { id: "aes", name: "AES" }; break;
    }
    return returnEncryptionModesObj;
}

// export function fetchBeconTypeName(security: string) {
//     var securityName;
//     switch (security) {
//         case 'WPAand11i': securityName = "WPA WPA2 Personal"; break;
//         case '11i': securityName = "WPA2-Personal"; break;
//         case 'Basic': securityName = "Security Off"; break;
//         case 'WPA3': securityName = "WPA3-Personal"; break;
//         case '11iandWPA3': securityName = "WPA2 WPA3 Personal"; break;
//     }
//     return securityName;
// }


export function fetchBeconTypeName(security: string) {
    var securityName;
    switch (security) {
        case 'WPAand11i': securityName = "WPA-WPA2-Personal"; break;
        case '11i': securityName = "WPA2-Personal"; break;
        case 'Basic': securityName = "Security Off"; break;
        case 'WPA3': securityName = "WPA3-Personal"; break;
        case '11iandWPA3': securityName = "WPA2-WPA3 Personal"; break;
    }
    return securityName;
}

export function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
export function convertToBoolean(input: string): boolean | undefined {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return false;
    }
}
//used to remove null/undefined values from object
export function cleanObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
        }
    }
    return obj
}

export function cleanArray(arr: any[]) {
    var filtered = arr.filter(function (el) {
        return el != null;
    });
    return filtered;
}

export function deleteFromObject(obj, val) {
    delete obj[val];
    return obj
}

export function deepCopy(obj) {
    if (obj instanceof Array) {
        return obj.slice();
    }
    else {
        return JSON.parse(JSON.stringify(obj))
    }
}

export function getFormattedTimeZone(date: Date) {
    var offset = new Date(date).getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

export function createBinaryFile(convertFile: File) {
    var reader, base64Content, match;
    if (convertFile) {
        reader = new FileReader();
        // Start reading.
        reader.readAsDataURL(convertFile);
        reader.onerror = function () {

        };
        return reader.onload = () => {
            match = /^data:.*;base64,(.*)$/.exec(reader.result);
            if (match != null) {
                base64Content = match[1];
            } else {

            }
            return base64Content;
        };
    }
};

export function constructSecurityList(optionList: any, wifiType: string, metaData: any) {
    let ssid = 1;
    var returnSecurityOptions = [];
    if (wifiType == 'X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID') {
        ssid = 1;
    } else if (wifiType == 'X_CALIX_SXACC_PRIMARY_5GHZ_SSID') {
        ssid = 9;
    } else if (wifiType == 'X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID') {
        ssid = 2;
    } else if (wifiType == 'X_CALIX_SXACC_GUEST_5GHZ_SSID') {
        ssid = 10;
    }
    else if (wifiType == 'X_CALIX_SXACC_PRIMARY_6GHZ_SSID') {
        ssid = 17;
    } else if (wifiType == 'X_CALIX_SXACC_GUEST_6GHZ_SSID') {
        ssid = 18;
    }
    let feature = metaData.properties.filter(x => x.featureName == 'SSID' + ssid);
    if (feature.length) {
        let beacons = feature[0].fields.filter(x => x.name == 'BeaconType').length ? feature[0].fields.filter(x => x.name == 'BeaconType')[0]?.valueList : [];
        returnSecurityOptions = optionList.filter(x => beacons.includes(x.id));
        return returnSecurityOptions;
    } else {
        return optionList
    }


}