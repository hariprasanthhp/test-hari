export const addDeviceObj = {
    addDeviceTab: ['Device', 'Services'],
    configurationObj: {
        defaultLanValidation: false,
        seriviceList: [
            {
                BridgeMemberPort: undefined,
                IPTVSSID: false,
                Mode: "RG Routed",
                VLAN: 201,
                configurations: {
                    category: "Data Service",
                    parameterValues: {
                        FramingType: "PPPoE",
                        Mode: "RG Routed",
                        NATEnabled: true,
                        ServiceConnectionType: "PPPOE",
                        VlanTagAction: true,
                        X_000631_IPv4Enabled: true,
                        X_000631_VlanMux8021p: 2,
                        X_000631_VlanMuxID: 201,
                        defaultConnectionService: false,
                        productFamily: "EXOS"
                    }
                },
                defaultConnectionService: false,
                name: "wan-0110-5",
                orgId: "470053",
                _id: "033d2837-1f3e-447e-982c-c5dd47cd2390"
            },
            {
                BridgeMemberPort: undefined,
                IPTVSSID: false,
                Mode: "RG Routed",
                VLAN: 7,
                configurations: {
                    category: "Data Service",
                    parameterValues: {
                        FramingType: "PPPoE",
                        Mode: "RG Routed",
                        NATEnabled: true,
                        ServiceConnectionType: "PPPOE",
                        VlanTagAction: true,
                        X_000631_IPv4Enabled: true,
                        X_000631_VlanMux8021p: 2,
                        X_000631_VlanMuxID: 201,
                        defaultConnectionService: false,
                        productFamily: "EXOS"
                    }
                },
                defaultConnectionService: false,
                name: "hdata01_b1",
                orgId: "470053",
                _id: "535fccfe-0685-4e93-b4b9-8a77e18296ec"
            },
        ],
        serviceBWList: [
            {
                configurations: [{
                    category: "Bandwidth",
                    parameterValues: { UpstreamCIR: '0k', DownstreamCIR: '0k' }
                }],
                description: "",
                innerProfileCategory: "Bandwidth",
                name: "BW_0",
                orgId: "470053",
                _id: "97268d40-ebb9-41d4-aeef-87b5ecc9c55a"
            }
        ],
        serviceDialPlan: [
            {
                description: "5678",
                longTimer: 10,
                name: "lisa_test01",
                orgId: "470053",
                rules: ['^911n', '^411', '^311', '^[2-9][0-9]{9}', '^1[2-9][0-9]{9}', '^011[0-9]*T', '^S[0-9]{2}'],
                shortTimer: 5,
                _id: "20c3d122-ab5a-41bd-90dc-fe338177b7b7"
            }
        ]
    },
    device: {
        deviceMode: undefined,
        isDisableModel: false,
        isStaticGroup: "No",
        regId: undefined,
        selectedModel: undefined,
        selectedStaticGroup: []
    },
    isNewRecord: true,
    isUnifiedPrimarySSID: false,
    services: {
        configuredService: "Yes",
        dataService: {
            PPPoEPwd: "",
            PPPoEUsername: "",
            bandwidth: "",
            isDataService: true,
            priority: "",
            vLAN: ""
        },
        ontDataService: [],
        ontVideoService: [],
        showDataServiceByDefault: false,
        showVideoServiceByDefault: false,
        videoService: { isVideoService: false, vLAN: '', priority: '', bandwidth: '' },
        voiceService: {
            addressType: "DHCP",
            defaultGateway: "",
            dialPlan: "system-default",
            dnsServers: "",
            faxRelay: false,
            ipAddress: "",
            lineOne: {
                direConnectNum: undefined,
                directConnectTimer: 0,
                isCallWaiting: true,
                isCallerId: true,
                isDirectCon: false,
                isThreeWayCalling: true,
                isVoiceService: false,
                messageWaitIndi: true,
                password: undefined,
                systemLoss: "ANSI",
                systemRXLoss: -9,
                systemTXLoss: -3,
                uri: undefined,
                username: undefined,

            },
            lineTwo: {
                direConnectNum: undefined,
                directConnectTimer: 0,
                isCallWaiting: true,
                isCallerId: true,
                isDirectCon: false,
                isThreeWayCalling: true,
                isVoiceService: false,
                messageWaitIndi: true,
                password: undefined,
                systemLoss: "ANSI",
                systemRXLoss: -9,
                systemTXLoss: -3,
                uri: undefined,
                username: undefined
            },
            serviceType: "SIP",
            subnetMask: ""
        },
        wifiSSID: {
            UNIFIED_PRIMARY_SSID: {},
            X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID: {
                broadcastEnabled: undefined,
                encryption: "",
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false
            },
            X_CALIX_SXACC_GUEST_5GHZ_SSID: {
                broadcastEnabled: undefined,
                enableDfsChannels: undefined,
                encryption: "",
                mumimoEnabled: undefined,
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false
            },
            X_CALIX_SXACC_GUEST_6GHZ_SSID: {
                broadcastEnabled: undefined,
                enableDfsChannels: undefined,
                encryption: "",
                mumimoEnabled: undefined,
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false
            },
            X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
                broadcastEnabled: undefined,
                encryption: "",
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false
            },
            X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
                broadcastEnabled: undefined,
                enableDfsChannels: undefined,
                encryption: "",
                mumimoEnabled: undefined,
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false
            },
            X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
                broadcastEnabled: undefined,
                enableDfsChannels: undefined,
                encryption: "",
                mumimoEnabled: undefined,
                passphrase: "",
                securityType: "",
                serviceEnabled: undefined,
                showPassPhrase: false

            },
            isUnifiedPrimarySSID: false,
            toggeledUnifiedPrimarySSID: false
        }
    },
    settings: {
        isPowerSaving: true,
        lanPortFour: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 },
        lanPortOne: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 },
        lanPortThree: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 },
        lanPortTwo: { adminState: 'Enable', powerSaving: true, speed: 'Auto', duplex: 'Auto', DHCPLeaseLimit: 0 }
    },
    showDeviceIDErrorMsg: false,
    showModeErrorMsg: false,
    showModelErrorMsg: false,
    toggeledUnifiedPrimarySSID: false
}

export const device_List = [
    {
        allowInheritance: true,
        completedCount: 15,
        description: "elite",
        name: "testdd",
        orgId: "470053",
        type: "static",
        uncompletedCount: 98,
        workflowCount: 113,
        _id: "6417c961-aced-472d-a570-14f3547cadc1"
    }
]

export const config_list = [
    {
        _id: "9dbd0067-c0b8-42a5-a256-d4f22efd9c9d",
        name: "fwu_gc_data+video(l2 APAS)321+voip_810",
        orgId: "470053",
        description: "",
        configurations: [
            {
                category: "Data Service",
                parameterValues: {
                    Mode: "RG Routed",
                    version: "dualStack",
                    NATEnabled: true,
                    FramingType: "IPoE",
                    IAPD_Control: true,
                    VlanTagAction: false,
                    productFamily: "GigaCenter",
                    AddressingType: "DHCP",
                    ConnectionType: "IP_Routed",
                    X_000631_VlanMuxID: -1,
                    X_000631_IPv4Enabled: true,
                    X_000631_IPv6Enabled: true,
                    ServiceConnectionType: "DHCP",
                    X_000631_VlanMux8021p: -1,
                    IPv6DNSWANConnectionPath: "%IPV6_DATA_WAN_CONNECTION%",
                    X_CALIX_SXACC_BW_PROFILE: "a5cb52a0-54c3-4ab5-bcf8-f6b1029a86ff",
                    defaultConnectionService: true,
                    X_000631_Dhcp6cForAddress: false,
                    X_000631_Dhcp6cForPrefixDelegation: true
                }
            },
            {
                category: "Voice Service",
                parameterValues: {
                    Type: "SIP",
                    Model: "GigaCenter",
                    ipType: "IPv4",
                    RTPPort: 49152,
                    TimerT1: 500,
                    TimerT2: 4000,
                    DNSPrimary: "",
                    DTMFMethod: "InBand",
                    SwitchType: "None",
                    CountryCode: "US",
                    ProxyServer: "10.245.252.2",
                    RTPCodec1st: "G.711MuLaw",
                    DNSSecondary: "",
                    RTPDscpValue: 46,
                    ReleaseTimer: 10,
                    PacketRate1st: "10",
                    PacketRate2nd: "10",
                    PacketRate3rd: "10",
                    VlanTagAction: true,
                    LocalHookFlash: true,
                    HookFlashMethod: "None",
                    ProxyServerPort: 5060,
                    UserAgentDomain: "",
                    ControlDscpValue: 46,
                    RTPDscpInputType: true,
                    RegistrationPeriod: 3600,
                    ServiceFramingType: "IPoE",
                    X_000631_IGMPProxy: false,
                    X_000631_VlanMuxID: 810,
                    ProxyServerSecondary: "",
                    CallWaitingTonePrefix: "CallWaitingTone",
                    DistinctiveRingPrefix: "Bellcore-dr",
                    ServiceConnectionType: "DHCP",
                    SilenceSuppression1st: false,
                    SilenceSuppression2nd: false,
                    SilenceSuppression3rd: false,
                    X_000631_VlanMux8021p: 6,
                    ProxyServerPortSecondary: 5060
                }
            },
            {
                category: "Video Service",
                parameterValues: {
                    Mode: "RG L2 Bridged",
                    OUI_Enable: true,
                    VLAN_Enable: true,
                    VlanTagAction: true,
                    productFamily: "GigaCenter",
                    OUI_FilterList: "e4:83:99:5d:03:38,00:02:02:55:08:61,00:03:e6:68:b3:b0,00:03:e6:91:be:8a,cc:7d:37:f8:a0:39,68:63:59:5d:ff:06,e4:83:99:5d:18:74",
                    X_000631_IGMPProxy: true,
                    X_000631_VlanMuxID: 321,
                    APAS_EnableIPTV_SSID: true,
                    ServiceConnectionType: "Bridged",
                    X_000631_VlanMux8021p: 4,
                    AnyPortAnyServiceEnabled: true
                }
            }
        ],
        innerProfileRefs: [
            "a5cb52a0-54c3-4ab5-bcf8-f6b1029a86ff"
        ]
    }
]

export const static_grp_list = [
    {
        _id: "3ec8c097-0f5f-479e-8ee8-cfcd8652f019",
        type: "FSAN",
        orgId: "470053",
        groupId: "0bf8ef59-9f83-4eb2-ada0-e11e597ac846",
        createTime: "2022-09-26T15:33:48.284Z",
        memberInfo: "SASDFDSFDSFSD"
    }
]
export const static_grp_list_valid = {
    "0bf8ef59-9f83-4eb2-ada0-e11e597ac846": "FSAN"
}


