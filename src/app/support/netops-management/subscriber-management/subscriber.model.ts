export interface ISubscriberAddDeviceModel {
    addDeviceTab?: string[],
    device?: IDeviceModel,
    services?: IServiceModel,
    settings?: ISettingsModel,
    showModeErrorMsg?: boolean,
    showDeviceIDErrorMsg?: boolean,
    showModelErrorMsg?: boolean,
    configurationObj?: any,
    isNewRecord?: boolean
    rgConfigMode?: string,
    isUnifiedPrimarySSID: boolean,
    toggeledUnifiedPrimarySSID: boolean
}

export interface IDeviceModel {
    regId?: string,
    selectedModel?: string,
    deviceMode?: string,
    isStaticGroup?: string,
    isDisableModel?: boolean,
    selectedStaticGroup?: string[]
    subscriberId?: any,
    manufacturer?: any
}

export interface IServiceModel {
    configuredService?: string
    ontDataService?: IDataServiceModel[],
    ontVideoService?: IVideoServiceModel[],
    dataService?: IDataServiceModel,
    videoService?: IVideoServiceModel,
    voiceService?: IVocieServiceModel,
    wifiSSID?: IwifiSSIDModel,
    showDataServiceByDefault: boolean,
    showVideoServiceByDefault: boolean,
    isCMS?: boolean
}

export interface ISettingsModel {
    isPowerSaving?: boolean,
    lanPortOne?: ILanPortModel,
    lanPortTwo?: ILanPortModel,
    lanPortThree?: ILanPortModel,
    lanPortFour?: ILanPortModel,
    lanPortFive?: ILanPortModel,
}

export interface ILanPortModel {
    adminState?: string,
    powerSaving?: boolean,
    speed?: string,
    duplex?: string,
    DHCPLeaseLimit?: number
}

export interface IDataServiceModel {
    PPPoEUsername?: string,
    PPPoEPwd?: string,
    vLAN?: string,
    priority?: string,
    bandwidth?: string,
    isDataService?: boolean,
    serviceProfile?: any,
    isServiceEnabled?: boolean,
    bandwidthProfile?: string
    inValidVLan?: boolean;
    isBWOverRide?: boolean;
    isVLANOverRide?: boolean;
    isAPAS?: boolean;
    bridgeMBRPort?: string[];
}

export interface IVideoServiceModel {
    isVideoService?: boolean,
    vLAN?: string,
    priority?: string,
    bandwidth?: string,
    serviceProfile?: any,
    isServiceEnabled?: boolean,
    bandwidthProfile?: string,
    inValidVLan?: boolean;
    isBWOverRide?: boolean;
    isVLANOverRide?: boolean;
    isAPAS?: boolean;
    bridgeMBRPort?: string[];
}

export interface IVocieServiceModel {
    showVocieService?: boolean,
    serviceType?: any,
    VoiceProfile?: any,
    faxRelay?: boolean,
    dialPlan?: string,
    addressType?: string,
    ipAddress?: string,
    subnetMask?: string,
    defaultGateway?: string,
    dnsServers?: string,
    ipHostName?: string,
    inValidIpHostName?: boolean;
    inValidgateway?: boolean;
    inValidSubnet?: boolean;
    inValidIP?: boolean;
    inValidDNSServer?: boolean;
    lineOne?: IVoiceLineServiceModel,
    lineTwo?: IVoiceLineServiceModel
}

export interface IVoiceLineServiceModel {
    isVoiceService?: boolean,
    username?: string,
    password?: string,
    uri?: string,
    isCallWaiting?: boolean,
    isCallerId?: boolean,
    isThreeWayCalling?: boolean,
    messageWaitIndi?: boolean,
    isDirectCon?: boolean,
    direConnectNum?: string,
    directConnectTimer?: number,
    systemLoss?: string,
    systemTXLoss?: number,
    systemRXLoss?: number,
    inValidDireConnectNum?: boolean,
    inValidURI?: boolean,
    inValidPWD?: boolean,
    inValidUserName?: boolean,
    inValidDireConnectTime?: boolean,
    terminateId?: string,
    inValidTerminateId?: boolean,
    inValidsystemTXLoss?: boolean,
    inValidsystemRXLoss?: boolean,
    isGR303?: boolean,
    CRV?: string,
    inValidCRV?: boolean
}

export interface IwifiSSISubDModel {
    encryption?: string,
    showPassPhrase?: boolean,
    passphrase?: string,
    securityType?: string,
    broadcastEnabled?: string,
    serviceEnabled?: string,
    name?: string,
    mumimoEnabled?: string,
    enableDfsChannels?: string

}

export interface IwifiSSIDModel {
    X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID?: IwifiSSISubDModel,
    X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID?: IwifiSSISubDModel,
    X_CALIX_SXACC_PRIMARY_5GHZ_SSID?: IwifiSSISubDModel,
    X_CALIX_SXACC_GUEST_5GHZ_SSID?: IwifiSSISubDModel,
    X_CALIX_SXACC_PRIMARY_6GHZ_SSID?: IwifiSSISubDModel,
    X_CALIX_SXACC_GUEST_6GHZ_SSID?: IwifiSSISubDModel,

    UNIFIED_PRIMARY_SSID?: IwifiSSISubDModel,

}