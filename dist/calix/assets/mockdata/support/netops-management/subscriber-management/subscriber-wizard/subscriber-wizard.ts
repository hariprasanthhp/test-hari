export const addDeviceObj_with_data = {
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
        _id: "126f99de-474d-4c32-b5b3-f603dcd8e08e"
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
    selectedStaticGroup: [
      "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
      "06634ae1-c7cd-433a-8b5e-0546b422940e"
    ],
  },
  isNewRecord: true,
  isUnifiedPrimarySSID: !false,
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
    ontDataService: [{
      serviceProfile: {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '201',
      showPPPOE: true,
      isBWOverRide: false,
      isVLANOverRide: false
    }],
    ontVideoService: [{
      serviceProfile: {
        name: "Fiona_Video_321_L3",
        _id: "ff2efbd3-1f5b-4a4a-86b2-d56b20bd6760",
        orgId: "470053",
        configurations: {
          category: "Video Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_IGMPProxy: true,
            X_000631_VlanMuxID: 321,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 4
          }
        },
        VLAN: 321,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '321',
      bridgeMBRPort: [
        "1",
        "2",
        "3",
        "4"
      ],
      isVLANOverRide: false
    }],
    showDataServiceByDefault: false,
    showVideoServiceByDefault: false,
    videoService: { isVideoService: false, vLAN: '', priority: '', bandwidth: '', inValidVLan: false },
    voiceService: {
      serviceType: {
        name: "SIP Service - Meta - VLAN 1020",
        _id: "8459de8f-2fbd-4681-804e-39714ee92a48",
        orgId: "470053",
        configurations: {
          category: "Voice Service",
          parameterValues: {
            Type: "SIP",
            Model: "GigaCenter",
            RTPPort: 49152,
            TimerT1: 500,
            TimerT2: 4000,
            DNSPrimary: "",
            DTMFMethod: "InBand",
            SwitchType: "None",
            CountryCode: "US",
            ProxyServer: "10.0.20.10",
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
            X_000631_VlanMuxID: 2,
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
        VLAN: 2,
        defaultConnectionService: false,
        IPTVSSID: false
      },
      VoiceProfile: [
        {
          Enable: true,
          Overrides: {
            VlanId: 4093
          },
          ProfileId: "033d2837-1f3e-447e-982c-c5dd47cd2390",
          Name: "wan-0110-5",
          category: "Data Service",
          Mode: "RG Routed"
        },
        {
          Enable: true,
          ProfileId: "8459de8f-2fbd-4681-804e-39714ee92a48",
          Name: "SIP Service - Meta - VLAN 1020",
          category: "Voice Service"
        }
      ],
      faxRelay: true,
      dialPlan: "system-default",
      addressType: "DHCP",
      showVocieService: true,
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      ipHostName: "123.12.1.3"
    },
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12345677"
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12342132112"
      },
      UNIFIED_PRIMARY_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "11iandWPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      }
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

export const addDeviceObj_init = {
  isNewRecord: true,
  addDeviceTab: [
    "Device",
    "Services"
  ],
  configurationObj: {
    defaultLanValidation: false
  },
  showModeErrorMsg: false,
  showDeviceIDErrorMsg: false,
  showModelErrorMsg: false,
  isUnifiedPrimarySSID: false,
  toggeledUnifiedPrimarySSID: false,
  device: {
    isDisableModel: false,
    isStaticGroup: "No",
    selectedStaticGroup: []
  },
  services: {
    configuredService: "Yes",
    ontDataService: [],
    ontVideoService: [],
    dataService: {
      isDataService: true,
      vLAN: "",
      priority: "",
      bandwidth: "",
      PPPoEPwd: "",
      PPPoEUsername: ""
    },
    videoService: {
      isVideoService: false,
      vLAN: "",
      priority: "",
      bandwidth: ""
    },
    voiceService: {
      serviceType: "SIP",
      faxRelay: false,
      dialPlan: "system-default",
      addressType: "DHCP",
      ipAddress: "",
      subnetMask: "",
      defaultGateway: "",
      dnsServers: "",
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: false,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3
      }
    },
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      X_CALIX_SXACC_GUEST_5GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      X_CALIX_SXACC_GUEST_6GHZ_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      },
      isUnifiedPrimarySSID: false,
      toggeledUnifiedPrimarySSID: false,
      UNIFIED_PRIMARY_SSID: {
        encryption: "",
        showPassPhrase: false,
        passphrase: "",
        securityType: ""
      }
    },
    showVideoServiceByDefault: false,
    showDataServiceByDefault: false
  },
  settings: {
    isPowerSaving: true,
    lanPortOne: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortTwo: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortThree: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortFour: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    }
  }
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

export const device_type = [
  {
    _id: "a44705ca-f796-4ae1-8dc8-3b279fb09fe6",
    orgId: "470053",
    modelName: "844E-1",
    manufacturer: "Calix",
    productClass: "ENT",
    hardwareVersion: "3000219601",
    manufacturerOUI: "000631",
    softwareVersion: "12.2.5.7.4"
  }
]

export const pr_data = {
  _id: "e7fb5de8-7d04-46fd-9df4-3a1363133210",
  data: {
    Enable: true,
    VlanId: 100
  },
  wifi: {
    1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    9: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    17: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_2DOT4GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_5GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    },
    X_CALIX_SXACC_6GHZ_SSID_1: {
      Enable: true,
      WPAEncryptionModes: "AESEncryption",
      IEEE11iEncryptionModes: "AESEncryption"
    }
  },
  orgId: "470053",
  voice: {
    Line: {
      1: {
        Enable: "Disabled"
      },
      2: {
        Enable: "Disabled"
      }
    },
    FaxT38: {
      Enable: false
    },
    DialPlan: "system-default",
    ServiceType: "SIP",
    X_CALIX_SXACC_RG_WAN: {
      ServiceConnectionType: "DHCP"
    }
  },
  opMode: "RG",
  deviceId: "CXNK008A4948",
  modelName: "GS4227E",
  subscriberId: "f394386f-10e1-45af-b0a9-a99d730d6654",
  staticGroupMember: []
}
export const sub_system = {
  systemId: "CXNK008A4948",
  status: "Not Checked In",
  modelName: "GS4227E",
  edgeSuites: {
    protectIQ: {
      subscribed: true
    },
    experienceIQ: {
      subscribed: true
    },
    smallBizIQ: {
      enable: true,
      status: {
        result: "succeeded",
        smallBizIQ: true
      }
    }
  },
  rgService: {
    data: {
      Enable: true,
      VlanId: 100
    },
    voice: {
      Line: {
        1: {
          Enable: "Disabled"
        },
        2: {
          Enable: "Disabled"
        }
      },
      FaxT38: {
        Enable: false
      },
      DialPlan: "system-default",
      ServiceType: "SIP",
      X_CALIX_SXACC_RG_WAN: {
        ServiceConnectionType: "DHCP"
      }
    }
  },
  subscriber: {
    subscriberLocationId: "112233445566",
    account: "bw-4227e-2",
    name: "bw-4227e-2d",
    phone: "13655187150",
    email: "testuser423@gmail.com"
  }
}

export const dial_plan_res = [
  {
    "_id": "20c3d122-ab5a-41bd-90dc-fe338177b7b7",
    "name": "lisa_test01",
    "orgId": "470053",
    "rules": [
      "^911n",
      "^411",
      "^311",
      "^[2-9][0-9]{9}",
      "^1[2-9][0-9]{9}",
      "^011[0-9]*T",
      "^S[0-9]{2}"
    ],
    "longTimer": 10,
    "shortTimer": 5,
    "description": "5678"
  },
  {
    "_id": "62cf2bce-f17a-4da4-8566-a74f42fcc11e",
    "name": "lisa_test02",
    "orgId": "470053",
    "rules": [
      "^S99d[0-9]{2}*T",
      "^0T",
      "^00",
      "^01[2-9][0-9]{4}*T",
      "^011[2-9][0-9]{4}*T",
      "^0[2-9][0-9]{9}",
      "^[2-9]11",
      "^#[0-9]{2}*T",
      "^[2-9][0-9]{9}",
      "^1[0-9]{10}",
      "^[2-9]T",
      "^[2-4][0-9]T",
      "^S72d[1-9][0-9]{5}*T",
      "^S74d[2-9][1-9][0-9]{5}*T",
      "^S75d[2-9]{2}[0-9]{5}*T",
      "^S90d[1-9][0-9]{5}*T",
      "^S92d[1-9][0-9]{5}*T",
      "^S3[0-9]{2}",
      "^S15",
      "^S12d[0-9]{2}*T",
      "^S23",
      "^S27",
      "^S5[0-9]",
      "^S6[0-6]",
      "^S67d[1-9][0-9]{5}*T",
      "^S6[8-9]",
      "^S70",
      "^S73",
      "^S82d[1-9][0-9]{5}*T",
      "^S7[6-9]",
      "^S8[3-9]",
      "^S8[0-1]",
      "^S91",
      "^S93",
      "^S94",
      "^S99d[0-9]{2}*T",
      "^0T",
      "^00",
      "^01[2-9][0-9]{4}*T",
      "^011[2-9][0-9]{4}*T",
      "^0[2-9][0-9]{9}",
      "^[2-9]11",
      "^#[0-9]{2}*T",
      "^[2-9][0-9]{9}",
      "^1[0-9]{10}",
      "^[2-9]T",
      "^[2-4][0-9]T",
      "^S72d[1-9][0-9]{5}*T",
      "^S74d[2-9][1-9][0-9]{5}*T",
      "^S75d[2-9]{2}[0-9]{5}*T",
      "^S90d[1-9][0-9]{5}*T",
      "^S92d[1-9][0-9]{5}*T",
      "^S3[0-9]{2}",
      "^S15",
      "^S12d[0-9]{2}*T",
      "^S23",
      "^S27",
      "^S5[0-9]",
      "^S6[0-6]",
      "^S67d[1-9][0-9]{5}*T",
      "^S6[8-9]",
      "^S70",
      "^S73",
      "^S82d[1-9][0-9]{5}*T",
      "^S7[6-9]",
      "^S8[3-9]",
      "^S8[0-1]",
      "^S91",
      "^S93",
      "^S94",
      "^S99d[0-9]{2}*T",
      "^0T",
      "^00",
      "^01[2-9][0-9]{4}*T",
      "^011[2-9][0-9]{4}*T",
      "^0[2-9][0-9]{9}",
      "^[2-9]11",
      "^#[0-9]{2}*T",
      "^[2-9][0-9]{9}",
      "^1[0-9]{10}",
      "^[2-9]T",
      "^[2-4][0-9]T",
      "^S72d[1-9][0-9]{5}*T",
      "^S74d[2-9][1-9][0-9]{5}*T",
      "^S75d[2-9]{2}[0-9]{5}*T",
      "^S90d[1-9][0-9]{5}*T",
      "^S92d[1-9][0-9]{5}*T",
      "^S3[0-9]{2}",
      "^S15",
      "^S12d[0-9]{2}*T",
      "^S23",
      "^S27",
      "^S5[0-9]",
      "^S6[0-6]",
      "^S67d[1-9][0-9]{5}*T",
      "^S6[8-9]",
      "^S70",
      "^S73",
      "^S82d[1-9][0-9]{5}*T",
      "^S7[6-9]",
      "^S8[3-9]",
      "^S8[0-1]",
      "^S91",
      "^S93",
      "^S94",
      "^S99d[0-9]{2}*T",
      "^0T",
      "^00",
      "^01[2-9][0-9]{4}*T",
      "^011[2-9][0-9]{4}*T",
      "^0[2-9][0-9]{9}",
      "^[2-9]11",
      "^#[0-9]{2}*T",
      "^[2-9][0-9]{9}",
      "^1[0-9]{10}",
      "^[2-9]T",
      "^[2-4][0-9]T",
      "^S72d[1-9][0-9]{5}*T",
      "^S74d[2-9][1-9][0-9]{5}*T",
      "^S75d[2-9]{2}[0-9]{5}*T",
      "^S90d[1-9][0-9]{5}*T",
      "^S92d[1-9][0-9]{5}*T",
      "^S3[0-9]{2}",
      "^S15",
      "^S12d[0-9]{2}*T",
      "^S23",
      "^S27",
      "^S5[0-9]"
    ],
    "longTimer": 20,
    "shortTimer": 10,
    "description": "rsdfcwrfc"
  },
  {
    "_id": "a07c9291-48f3-4c7a-ae88-fe9e3c15730c",
    "name": "Lai_meta",
    "orgId": "470053",
    "rules": [
      "^[0-9]{10}"
    ],
    "longTimer": 16,
    "shortTimer": 4,
    "description": "sdfdds"
  },
  {
    "_id": "c4e3dcd1-014e-4bae-a4c5-3b5c405411fc",
    "name": "bian",
    "orgId": "470053",
    "rules": [
      "^[2-9][0-9]{9}"
    ],
    "longTimer": 19,
    "shortTimer": 11,
    "description": ""
  },
  {
    "_id": "f7b5fb47-ac8f-4635-8817-219642b8c515",
    "name": "844GE-soak",
    "orgId": "470053",
    "rules": [
      "^911n",
      "^S90d[0-9]{10}",
      "^[2-9][0-9]{9}",
      "^311"
    ],
    "longTimer": 16,
    "shortTimer": 4,
    "description": "for soak"
  },
  {
    "_id": "d0db56c4-d480-495c-9459-7f3d42fe04d0",
    "name": "ashwin45678",
    "orgId": "470053",
    "rules": [
      "^qedqede"
    ],
    "longTimer": 6,
    "shortTimer": 1,
    "description": "tresdt56yftvuy"
  },
  {
    "_id": "c04a8657-087a-4127-aae2-9b2359850a0a",
    "name": "aliu-sip",
    "orgId": "470053",
    "rules": [
      "^911",
      "^411",
      "^[2-9][0-9]{9}",
      "^1[2-9][0-9]{9}",
      "^011[0-9]*T",
      "^S[0-9]{2}"
    ],
    "longTimer": 16,
    "shortTimer": 4,
    "description": ""
  },
]

export const subscriber_data_res = {
  metadata: { totalHits: 1 },
  records: [
    {
      account: "st1510fBulkxc",
      devices: [{ deviceId: "sometesting1" },{ deviceId: "CXNK7326323" }],
      email: "st1510fBulkxc@gmail.com",
      name: "st1510fBulkxc",
      orgId: "470053",
      phone: "9876541230",
      serviceAddress: "st1510fBulkxc",
      subscriberId: "f139a009-c607-41e5-b3c7-fb88ebeea85a",
      subscriberLocationId: "st1510fBulkxc"
    }
  ]
}

export const edit_device_OntData = {
  "_id": "f506bbef-7bee-4317-867a-bda7bf9283dc",
  "wifi": {
    "1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "9": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "17": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_2DOT4GHZ_SSID_1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_PRIMARY_5GHZ_SSID": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_5GHZ_SSID_1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_PRIMARY_6GHZ_SSID": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_6GHZ_SSID_1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    }
  },
  "orgId": "470053",
  "ports": {
    "eth-1": {
      "Enable": true,
      "DuplexMode": "Auto",
      "MaxBitRate": "Auto",
      "DhcpLeaseLimit": 0,
      "OnBatteryEnable": false
    },
    "eth-2": {
      "Enable": true,
      "DuplexMode": "Auto",
      "MaxBitRate": "Auto",
      "DhcpLeaseLimit": 0,
      "OnBatteryEnable": false
    },
    "eth-3": {
      "Enable": true,
      "DuplexMode": "Auto",
      "MaxBitRate": "Auto",
      "DhcpLeaseLimit": 0,
      "OnBatteryEnable": false
    },
    "eth-4": {
      "Enable": true,
      "DuplexMode": "Auto",
      "MaxBitRate": "Auto",
      "DhcpLeaseLimit": 0,
      "OnBatteryEnable": false
    },
    "eth-5": {
      "Enable": true,
      "DuplexMode": "Auto",
      "MaxBitRate": "100",
      "DhcpLeaseLimit": 0,
      "OnBatteryEnable": false
    }
  },
  "opMode": "Managed ONT",
  "deviceId": "deleteme",
  "services": [
    {
      "Enable": true,
      "Overrides": {
        "VlanId": 4094
      },
      "ProfileId": "033d2837-1f3e-447e-982c-c5dd47cd2390",
      "Name": "wan-0110-5",
      "category": "Data Service",
      "Mode": "RG Routed"
    }
  ],
  "voice": {
    "Line": {
      "1": {
        "Enable": "Disabled"
      },
      "2": {
        "Enable": "Disabled"
      }
    },
    "FaxT38": {
      "Enable": true
    },
    "DialPlan": "system-default",
    "ServiceType": "SIP",
    "X_CALIX_SXACC_RG_WAN": {
      "ServiceConnectionType": "DHCP"
    },
    "X_000631_Opt81ClientFQDN": "123.12.1.3"
  },
  "modelName": "GS4237",
  "subscriberId": "92b54dc4-1191-49b8-b14a-0a4db0327a22",
  "enableRgOnBattery": false,
  "staticGroupMember": []
}

export const edit_device_rg = {
  "_id": "5954b657-18ed-4c30-8fbe-150589e9833e",
  "data": {
    "Pbit": 4,
    "pppoe": {
      "Password": "1231231",
      "Username": "adasda"
    },
    "Enable": true,
    "VlanId": 123,
    "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
  },
  "wifi": {
    "1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "9": {
      "SSID": "5gh",
      "Enable": true,
      "BeaconType": "WPA3",
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "SSIDAdvertisementEnabled": true,
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    },
    "17": {
      "SSID": "uni123",
      "Enable": true,
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    },
    "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_2DOT4GHZ_SSID_1": {
      "Enable": true,
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption"
    },
    "X_CALIX_SXACC_PRIMARY_5GHZ_SSID": {
      "SSID": "5gh",
      "Enable": true,
      "BeaconType": "WPA3",
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "SSIDAdvertisementEnabled": true,
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    },
    "X_CALIX_SXACC_5GHZ_SSID_1": {
      "SSID": "5gh",
      "Enable": true,
      "BeaconType": "WPA3",
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "SSIDAdvertisementEnabled": true,
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    },
    "X_CALIX_SXACC_PRIMARY_6GHZ_SSID": {
      "SSID": "uni123",
      "Enable": true,
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    },
    "X_CALIX_SXACC_6GHZ_SSID_1": {
      "SSID": "uni123",
      "Enable": true,
      "KeyPassphrase": "Test@123",
      "WPAEncryptionModes": "AESEncryption",
      "IEEE11iEncryptionModes": "AESEncryption",
      "X_CALIX_SXACC_KeyPassphrase": "Test@123"
    }
  },
  "orgId": "470053",
  "video": {
    "Pbit": 1,
    "Enable": true,
    "VlanId": 2121,
    "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
  },
  "voice": {
    "Line": {
      "1": {
        "Enable": "Disabled"
      },
      "2": {
        "Enable": "Disabled"
      }
    },
    "FaxT38": {
      "Enable": false
    },
    "DialPlan": "system-default",
    "ServiceType": "SIP",
    "X_CALIX_SXACC_RG_WAN": {
      "ServiceConnectionType": "DHCP"
    }
  },
  "opMode": "RG",
  "deviceId": "unitest100",
  "services": [
    {
      "Enable": true,
      "ProfileId": "e3b6de32-e59c-4ef1-aef5-84ef73297251",
      "Name": "aliu-u6-mgcp 600",
      "category": "Voice Service"
    }
  ],
  "modelName": "GS4227W",
  "subscriberId": "92b54dc4-1191-49b8-b14a-0a4db0327a22",
  "staticGroupMember": [],
}

export const addDeviceObj_with_all_data = {
  isNewRecord: !false,
  addDeviceTab: [
    "Device",
    "Services"
  ],
  showModeErrorMsg: false,
  showDeviceIDErrorMsg: false,
  showModelErrorMsg: false,
  configurationObj: {
    defaultLanValidation: false,
    serviceDialPlan: [
      {
        _id: "20c3d122-ab5a-41bd-90dc-fe338177b7b7",
        name: "lisa_test01",
        orgId: "470053",
        rules: [
          "^911n",
          "^411",
          "^311",
          "^[2-9][0-9]{9}",
          "^1[2-9][0-9]{9}",
          "^011[0-9]*T",
          "^S[0-9]{2}"
        ],
        longTimer: 10,
        shortTimer: 5,
        description: "5678"
      },
      {
        _id: "62cf2bce-f17a-4da4-8566-a74f42fcc11e",
        name: "lisa_test02",
        orgId: "470053",
        rules: [
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]",
          "^S6[0-6]",
          "^S67d[1-9][0-9]{5}*T",
          "^S6[8-9]",
          "^S70",
          "^S73",
          "^S82d[1-9][0-9]{5}*T",
          "^S7[6-9]",
          "^S8[3-9]",
          "^S8[0-1]",
          "^S91",
          "^S93",
          "^S94",
          "^S99d[0-9]{2}*T",
          "^0T",
          "^00",
          "^01[2-9][0-9]{4}*T",
          "^011[2-9][0-9]{4}*T",
          "^0[2-9][0-9]{9}",
          "^[2-9]11",
          "^#[0-9]{2}*T",
          "^[2-9][0-9]{9}",
          "^1[0-9]{10}",
          "^[2-9]T",
          "^[2-4][0-9]T",
          "^S72d[1-9][0-9]{5}*T",
          "^S74d[2-9][1-9][0-9]{5}*T",
          "^S75d[2-9]{2}[0-9]{5}*T",
          "^S90d[1-9][0-9]{5}*T",
          "^S92d[1-9][0-9]{5}*T",
          "^S3[0-9]{2}",
          "^S15",
          "^S12d[0-9]{2}*T",
          "^S23",
          "^S27",
          "^S5[0-9]"
        ],
        longTimer: 20,
        shortTimer: 10,
        description: "rsdfcwrfc"
      },
      {
        _id: "a07c9291-48f3-4c7a-ae88-fe9e3c15730c",
        name: "Lai_meta",
        orgId: "470053",
        rules: [
          "^[0-9]{10}"
        ],
        longTimer: 16,
        shortTimer: 4,
        description: "sdfdds"
      },
      {
        _id: "c4e3dcd1-014e-4bae-a4c5-3b5c405411fc",
        name: "bian",
        orgId: "470053",
        rules: [
          "^[2-9][0-9]{9}"
        ],
        longTimer: 19,
        shortTimer: 11,
        description: ""
      }
    ],
    seriviceList: [
      {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "hdata01_b1",
        _id: "535fccfe-0685-4e93-b4b9-8a77e18296ec",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "GigaCenter",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 7,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 0,
            X_CALIX_SXACC_BW_PROFILE: "7f8f23c8-8f54-44db-b084-340dff692713",
            defaultConnectionService: true
          }
        },
        VLAN: 7,
        Mode: "RG Routed",
        defaultConnectionService: true,
        IPTVSSID: false
      },
      {
        name: "exos16_data_service_48626",
        _id: "f2be97e1-8e51-4109-91e2-a2b190d23c18",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            version: "v4",
            NATEnabled: true,
            FramingType: "IPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            AddressingType: "DHCP",
            ConnectionType: "IP_Routed",
            X_000631_VlanMuxID: 901,
            X_000631_IPv4Enabled: true,
            X_000631_IPv6Enabled: false,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 1,
            defaultConnectionService: false
          }
        },
        VLAN: 901,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      {
        name: "laistillfather",
        _id: "0fcd102b-5466-40ce-b1cf-f39b2d575130",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "ONT Half Bridge",
            VLANID: 3000,
            Hairpin: false,
            productFamily: "GigaCenter",
            AdvancedSettings: false,
            ServiceConnectionType: "AE_L2_Bridged",
            X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS: [
              "4"
            ]
          }
        },
        VLAN: 3000,
        Mode: "ONT Half Bridge",
        BridgeMemberPort: [
          "4"
        ],
        defaultConnectionService: false,
        IPTVSSID: false
      }
    ],
    serviceBWList: [
      {
        _id: "",
        name: ""
      },
      {
        _id: "97268d40-ebb9-41d4-aeef-87b5ecc9c55a",
        name: "BW_0",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "0k",
              DownstreamCIR: "0k"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "2a846e06-fa47-4b5b-b20d-f14b5f75c716",
        name: "BW_1G_1G",
        orgId: "470053",
        description: "g",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "1000m",
              DownstreamCIR: "1000m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "222649a4-9639-46ac-a92b-c2bfe6ca2362",
        name: "bw 100",
        orgId: "470053",
        description: "Test",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "100m",
              DownstreamCIR: "100m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      },
      {
        _id: "1f271670-c29c-4f38-a89a-1a5b2802639b",
        name: "bandwidth",
        orgId: "470053",
        description: "",
        configurations: [
          {
            category: "Bandwidth",
            parameterValues: {
              UpstreamCIR: "128m",
              DownstreamCIR: "512m"
            }
          }
        ],
        innerProfileCategory: "Bandwidth"
      }
    ]
  },
  device: {
    regId: "edit123",
    selectedModel: "GS4227E-2",
    deviceMode: "RG",
    isDisableModel: false,
    isStaticGroup: "No",
    selectedStaticGroup: [
      "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
      "06634ae1-c7cd-433a-8b5e-0546b422940e"
    ],
    subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22"
  },
  isUnifiedPrimarySSID: false,
  toggeledUnifiedPrimarySSID: false,
  services: {
    configuredService: "No",
    dataService: {
      PPPoEUsername: "asfds",
      PPPoEPwd: "asdfs",
      vLAN: "123",
      priority: '3',
      bandwidth: "7f8f23c8-8f54-44db-b084-340dff692713",
      isDataService: true,
      inValidVLan: false
    },
    videoService: {
      isVideoService: true,
      vLAN: "2121",
      priority: '4',
      bandwidth: "7f8f23c8-8f54-44db-b084-340dff692713",
      inValidVLan: false
    },
    voiceService: {
      serviceType: "X_000631_TDMGW",
      faxRelay: false,
      dialPlan: "system-default",
      addressType: "DHCP",
      ipAddress: "",
      subnetMask: "",
      defaultGateway: "",
      dnsServers: "",
      lineOne: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: true,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3,
        inValidURI: false,
        inValidUserName: false,
        inValidPWD: false,
        inValidDireConnectNum: false
      },
      lineTwo: {
        isCallWaiting: true,
        isCallerId: true,
        isDirectCon: false,
        isThreeWayCalling: true,
        isVoiceService: true,
        directConnectTimer: 0,
        messageWaitIndi: true,
        systemLoss: "ANSI",
        systemRXLoss: -9,
        systemTXLoss: -3,
        inValidURI: false,
        inValidUserName: false,
        inValidPWD: false,
        inValidDireConnectNum: false
      },
      VoiceProfile: {
        name: "XLAE-800",
        _id: "b1a54e98-5ed4-44ed-b070-b92b45b425e3",
        orgId: "470053",
        configurations: {
          category: "Voice Service",
          parameterValues: {
            Type: "SIP",
            Model: "GigaCenter",
            ipType: "IPv4",
            RTPPort: 49152,
            TimerT1: 500,
            TimerT2: 4000,
            Revertive: false,
            DTMFMethod: "InBand",
            SwitchType: "None",
            CountryCode: "US",
            ProxyServer: "10.245.252.2",
            RTPCodec1st: "G.711MuLaw",
            RTPDscpValue: 46,
            ReleaseTimer: 10,
            PacketRate1st: "10",
            PacketRate2nd: "10",
            PacketRate3rd: "10",
            VlanTagAction: true,
            LocalHookFlash: true,
            HookFlashMethod: "None",
            ProxyServerPort: 5060,
            ControlDscpValue: 46,
            RTPDscpInputType: true,
            OptionsTimerSwitch: false,
            RegistrationPeriod: 3600,
            ServiceFramingType: "IPoE",
            X_000631_VlanMuxID: 800,
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
        VLAN: 800,
        defaultConnectionService: false,
        IPTVSSID: false
      }
    },
    ontDataService: [{
      serviceProfile: {
        name: "wan-0110-5",
        _id: "033d2837-1f3e-447e-982c-c5dd47cd2390",
        orgId: "470053",
        configurations: {
          category: "Data Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            FramingType: "PPPoE",
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_VlanMuxID: 201,
            X_000631_IPv4Enabled: true,
            ServiceConnectionType: "PPPOE",
            X_000631_VlanMux8021p: 2,
            defaultConnectionService: false
          }
        },
        VLAN: 201,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '201',
      showPPPOE: true,
      isBWOverRide: false,
      isVLANOverRide: false
    }],
    ontVideoService: [{
      serviceProfile: {
        name: "Fiona_Video_321_L3",
        _id: "ff2efbd3-1f5b-4a4a-86b2-d56b20bd6760",
        orgId: "470053",
        configurations: {
          category: "Video Service",
          parameterValues: {
            Mode: "RG Routed",
            NATEnabled: true,
            VlanTagAction: true,
            productFamily: "EXOS",
            X_000631_IGMPProxy: true,
            X_000631_VlanMuxID: 321,
            ServiceConnectionType: "DHCP",
            X_000631_VlanMux8021p: 4
          }
        },
        VLAN: 321,
        Mode: "RG Routed",
        defaultConnectionService: false,
        IPTVSSID: false
      },
      isServiceEnabled: true,
      vLAN: '321',
      bridgeMBRPort: [
        "1",
        "2",
        "3",
        "4"
      ],
      isVLANOverRide: false
    }],
    wifiSSID: {
      X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12345677"
      },
      X_CALIX_SXACC_PRIMARY_5GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      },
      X_CALIX_SXACC_PRIMARY_6GHZ_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "WPA3",
        encryption: "AESEncryption",
        passphrase: "12342132112"
      },
      UNIFIED_PRIMARY_SSID: {
        name: "123test",
        serviceEnabled: "true",
        securityType: "11iandWPA3",
        encryption: "AESEncryption",
        passphrase: "21311321313"
      }
    },
    showVideoServiceByDefault: true,
    showDataServiceByDefault: true,
    isCMS: false
  },
  settings: {
    isPowerSaving: true,
    lanPortOne: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortTwo: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortThree: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    },
    lanPortFour: {
      adminState: "Enable",
      powerSaving: true,
      speed: "Auto",
      duplex: "Auto",
      DHCPLeaseLimit: 0
    }
  },
  provisioningRecord: {
    "wifi": {
        "X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID": {
            "KeyPassphrase": "12345677"
        },
        "X_CALIX_SXACC_PRIMARY_5GHZ_SSID": {
            "KeyPassphrase": "21311321313"
        },
        "X_CALIX_SXACC_PRIMARY_6GHZ_SSID": {
            "KeyPassphrase": "12342132112"
        }
    },
    "orgId": "470053",
    "opMode": "RG",
    "deviceId": "edit123",
    "modelName": "GS4227E-2",
    "subscriberId": "92b54dc4-1191-49b8-b14a-0a4db0327a22",
    "_id": "be9fa35e-12d8-4eff-844c-3052beb20c61",
    "data": {
        "Pbit": 3,
        "pppoe": {
            "Password": "asdfs",
            "Username": "asfds"
        },
        "Enable": true,
        "VlanId": 123,
        "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
    },
    "video": {
        "Pbit": 4,
        "Enable": true,
        "VlanId": 2121,
        "BwProfile": "7f8f23c8-8f54-44db-b084-340dff692713"
    },
    "voice": {
        "Line": {
            "1": {
                "Enable": "Disabled"
            },
            "2": {
                "Enable": "Disabled"
            }
        },
        "DialPlan": "system-default",
        "ServiceType": "SIP",
        "X_CALIX_SXACC_RG_WAN": {
            "ServiceConnectionType": "DHCP"
        },
        "FaxT38": {
            "Enable": false
        }
    },
    "newStaticGroup": [
        {
            "type": null,
            "groupId": "06634ae1-c7cd-433a-8b5e-0546b422940e",
            "memberInfo": "edit123"
        },
        {
            "type": null,
            "groupId": "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
            "memberInfo": "edit123"
        }
    ],
    "oldStaticGroup": [
        {
            "_id": "bf50695c-94d8-4408-9fee-cba5886291f9",
            "groupId": "06634ae1-c7cd-433a-8b5e-0546b422940e",
            "memberInfo": "edit123"
        },
        {
            "_id": "8ba6e71a-d1e8-4fe3-b514-5a9908733074",
            "groupId": "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
            "memberInfo": "edit123"
        }
    ]
}
}

export const services_mock_res = [
  {
    usoc: "testchecking098",
    type: "data",
    activate: true,
    sVlan: 21,
    staticIpAddress: "10.1.1.1",
    staticNetmask: "255.255.255.255",
    staticGateway: "1.1.1.1",
    interface: "g4",
    _id: "d94c33ff-51c4-409d-b883-7e5a29738c2b"
  }
]

export const deviceInfo = {
  _id: "470053-D0768F-CXNK0088ADE5",
  opMode: "RG",
  opRole: "Controller",
  ipAddress: "10.245.53.184",
  modelName: "GS2028E",
  createTime: "2022-11-22T09:32:56.555Z",
  macAddress: "d0:76:8f:27:1e:65",
  subnetMask: "255.255.255.0",
  stunEnabled: true,
  lastBootTime: "2022-11-22T11:06:17.193Z",
  manufacturer: "Calix",
  productClass: "GigaSpire",
  serialNumber: "CXNK0088ADE5",
  changeCounter: 1,
  dataModelName: "tr098",
  wanAccessType: "CopperEthernet",
  defaultGateway: "10.245.53.1",
  ipV6SitePrefix: "240e:6a0:37:175::/64",
  lastInformTime: "2022-11-22T13:10:15.364Z",
  registrationId: "",
  timezoneOffset: "-06:00",
  hardwareVersion: "3000288010",
  manufacturerOUI: "D0768F",
  secondIpAddress: "240e:6a0:37:0:1010:2020:6de3:9afd/128",
  softwareVersion: "22.4.0.0.46",
  provRecordStatus: "Succeeded",
  STUNServerAddress: "stun-stg.calix.com",
  secondWanInterface: "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1",
  lastInformEventCodes: "6 CONNECTION REQUEST",
  periodicInformInterval: 86400,
  wanSecDCSConnectionPath: "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1",
  udpConnectionRequestAddr: "208.44.123.146:39776",
  hardwareSerialNumber: "422008102252",
  wanConnType: "IPoE"
}

export const securtiyOptions = [{
  "SecurityOff": {
      "BeaconType": "Basic",
      "BasicEncryptionModes": "None",
      "BasicAuthenticationMode": "None"
  },
  "WPA2-PSK": {
      "BeaconType": "11i",
      "IEEE11iEncryptionModes": [
          "AESEncryption"
      ],
      "IEEE11iAuthenticationMode": "PSKAuthentication"
  },
  "WPA/WPA2-PSK": {
      "BeaconType": "WPAand11i",
      "WPAEncryptionModes": [
          "AESEncryption"
      ],
      "WPAAuthenticationMode": "PSKAuthentication",
      "IEEE11iEncryptionModes": [
          "AESEncryption"
      ],
      "IEEE11iAuthenticationMode": "PSKAuthentication"
  },
  "WPA3-PSK": {
      "BeaconType": "WPA3",
      "IEEE11iEncryptionModes": [
          "AESEncryption"
      ],
      "IEEE11iAuthenticationMode": "SAEAuthentication"
  },
  "WPA2/WPA3-PSK": {
      "BeaconType": "11iandWPA3",
      "IEEE11iEncryptionModes": [
          "AESEncryption"
      ],
      "IEEE11iAuthenticationMode": "SAEandPSKAuthentication"
  }
}]