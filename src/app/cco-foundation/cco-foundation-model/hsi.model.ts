export class HSIModel {
  _id?: string
  orgId?: string;
  wifiSsidExos?: WifiSsidExos[];
  timezonePosix?: TimezonePosix;
  userCredentials?: UserCredentials;
  constructor(_id?: string, orgId?: string, wifiSsidExos?: WifiSsidExos[],
    timezonePosix?: TimezonePosix, userCredentials?: UserCredentials) {
    this.orgId = orgId || null;
    this._id = _id || null;
    this.wifiSsidExos = wifiSsidExos || [new WifiSsidExos()];
    this.timezonePosix = timezonePosix || new TimezonePosix();
    this.userCredentials = userCredentials || new UserCredentials();
  }
}

export class WifiSsidExos {
  SSID?: string;
  Enable?: boolean;
  WlanIndex?: string;
  BeaconType?: string;
  PreSharedKey?: SharedKey;
  WPA2andWPA3Encryption?: string;
  X_000631_SplitHorizon?: boolean;
  IEEE11iEncryptionModes?: string;
  MACAddressControlEnabled?: boolean;
  SSIDAdvertisementEnabled?: boolean;
  X_000631_IntraSsidIsolation?: boolean;
  constructor(SSID?: string,
    Enable?: boolean,
    WlanIndex?: string,
    BeaconType?: string,
    PreSharedKey?: SharedKey,
    WPA2andWPA3Encryption?: string,
    X_000631_SplitHorizon?: boolean,
    IEEE11iEncryptionModes?: string,
    MACAddressControlEnabled?: boolean,
    SSIDAdvertisementEnabled?: boolean,
    X_000631_IntraSsidIsolation?: boolean,) {
    this.SSID = SSID || null;
    this.Enable = Enable || false;
    this.WlanIndex = WlanIndex || null;
    this.BeaconType = BeaconType || null;
    this.PreSharedKey = PreSharedKey || { 1: { KeyPassphrase: null } };
    this.WPA2andWPA3Encryption = WPA2andWPA3Encryption || null;
    this.X_000631_SplitHorizon = X_000631_SplitHorizon || null;
    this.IEEE11iEncryptionModes = IEEE11iEncryptionModes || null;
    this.MACAddressControlEnabled = MACAddressControlEnabled || null;
    this.SSIDAdvertisementEnabled = SSIDAdvertisementEnabled || null;
    this.X_000631_IntraSsidIsolation = X_000631_IntraSsidIsolation || null;
  }
}

export class SharedKey {
  "1"?: {
    KeyPassphrase?: string
  }
}

export class TimezonePosix {
  Tz?: string;
  TzName?: string;
  TzValue?: string;
  NTPEnable?: boolean;
  NTPServer1?: string;
  NTPServer2?: string;
  NTPServer3?: string;
  NTPServer4?: string;
  NTPServer5?: string;
  constructor(Tz?: string, TzName?: string, TzValue?: string, NTPEnable?: boolean,
    NTPServer1?: string, NTPServer2?: string, NTPServer3?: string,
    NTPServer4?: string, NTPServer5?: string,) {
    this.Tz = Tz || null;
    this.TzName = TzName || null;
    this.TzValue = TzValue || null;
    this.NTPEnable = NTPEnable || null;
    this.NTPServer1 = NTPServer1 || null;
    this.NTPServer2 = NTPServer2 || null;
    this.NTPServer3 = NTPServer3 || null;
    this.NTPServer4 = NTPServer4 || null;
    this.NTPServer5 = NTPServer5 || null;
  }
}

export class UserCredentials {
  Password?: string;
  Username?: string;
  constructor(Password?: string, Username?: string) {
    this.Password = Password || null;
    this.Username = Username || null;
  }
}