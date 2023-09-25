import { convertToBoolean } from "../service/utility.class";

export class SupportRadioObjectModel {
    id?: string;
    Enable?: boolean;
    SSID?: string;
    SSIDName?: string;
    SSIDAdvertisementEnabled?: boolean;
    BeaconType?: string;
    BasicEncryptionModes?: string;
    BasicAuthenticationMode?: string;
    WPAEncryptionModes?: string;
    IEEE11iEncryptionModes?: string;
    IEEE11iAuthenticationMode?: string;
    KeyPassphrase?: string;
    WPAAuthenticationMode?: string;
    PRConfig?: PrConfigModel;
    freqBand?: string
    featureNo?: number;
    isUnifiedPrimary: boolean = false;
    isRreserved6ghzName: boolean = false;
    isInL2Bridge: boolean;
    constructor(params?: SupportRadioObjectModel) {       
        this.id = params?.id || null;
        if (typeof params?.Enable == "string") {
            this.Enable = convertToBoolean(params.Enable);
        } else {
            this.Enable = params?.Enable;
        }
        this.SSID = params?.SSID || null;
        this.SSIDName = params?.SSIDName || null;
        if (typeof params?.SSIDAdvertisementEnabled == "string") {
            this.SSIDAdvertisementEnabled = convertToBoolean(params?.SSIDAdvertisementEnabled);
        } else {
            this.SSIDAdvertisementEnabled = params?.SSIDAdvertisementEnabled;
        }
        this.BeaconType = params?.BeaconType || null;
        this.BasicEncryptionModes = params?.BasicEncryptionModes || null;
        this.BasicAuthenticationMode = params?.BasicAuthenticationMode || null;
        this.WPAEncryptionModes = params?.WPAEncryptionModes || null;
        this.IEEE11iEncryptionModes = params?.IEEE11iEncryptionModes || null;
        this.IEEE11iAuthenticationMode = params?.IEEE11iAuthenticationMode || null;
        if (params?.KeyPassphrase || params?.KeyPassphrase == "") {
            this.KeyPassphrase = params?.KeyPassphrase;
        }
        this.WPAAuthenticationMode = params?.WPAAuthenticationMode || null;
        if (params?.PRConfig) {
            this.PRConfig = new PrConfigModel(params?.PRConfig) || null;
        }
        this.freqBand = params?.freqBand || null
        this.featureNo = params?.featureNo || null
        this.isInL2Bridge = params?.isInL2Bridge;
    }
}
export class PrConfigModel {

    BasicAuthenticationMode?: string;
    BasicEncryptionModes?: string;
    BeaconType?: string;
    Enable?: boolean;
    IEEE11iAuthenticationMode?: string;
    IEEE11iEncryptionModes?: string;
    KeyPassphrase?: string;
    SSID?: string;
    SSIDName?: string;
    SSIDAdvertisementEnabled?: boolean;
    WPAEncryptionModes?: string;
    X_CALIX_SXACC_KeyPassphrase?: string;
    prid?: string;
    constructor(params?: PrConfigModel) {
        this.BasicAuthenticationMode = params?.BasicAuthenticationMode;
        this.BasicEncryptionModes = params?.BasicEncryptionModes
        this.BeaconType = params?.BeaconType;
        if (typeof params?.Enable == "string") {
            this.Enable = convertToBoolean(params.Enable);
        } else {
            this.Enable = params?.Enable;
        }
        this.IEEE11iAuthenticationMode = params?.IEEE11iAuthenticationMode
        this.IEEE11iEncryptionModes = params?.IEEE11iEncryptionModes;
        this.KeyPassphrase = params?.KeyPassphrase;
        this.SSID = params?.SSID;
        this.SSIDName = params?.SSIDName;
        if (typeof params?.SSIDAdvertisementEnabled == "string") {
            this.SSIDAdvertisementEnabled = convertToBoolean(params?.SSIDAdvertisementEnabled);
        } else {
            this.SSIDAdvertisementEnabled = params?.SSIDAdvertisementEnabled;
        }
        this.WPAEncryptionModes = params?.WPAEncryptionModes
        this.X_CALIX_SXACC_KeyPassphrase = params?.X_CALIX_SXACC_KeyPassphrase;
        this.prid = params?.prid;
    }

}
