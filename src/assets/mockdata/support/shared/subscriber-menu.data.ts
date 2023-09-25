export const deviceInfoDetails: any = [
    {
        "deviceId": "FEEEA5",
        "serialNumber": "CXNK00FEEEA5",
        "macAddress": "b8:94:70:23:0f:a3",
        "registrationId": "FEEEA5",
        "ipAddress": "172.16.1.141",
        "modelName": "GS2037E",
        "softwareVersion": "22.3.0.0.33",
        "opMode": "RG",
        "_id": "102-B89470-CXNK00FEEEA5",
        "manufacturer": "Calix",
        "opModeWithOnt": "RG"
    },
    {
        "deviceId": "CXNK00E4F54F",
        "serialNumber": "CXNK00E4F54F",
        "macAddress": "f8:85:f9:23:02:a4",
        "registrationId": "",
        "ipAddress": "192.168.51.121",
        "modelName": "GM2037",
        "softwareVersion": "22.4.0.0.39",
        "opMode": "WAP",
        "_id": "102-F885F9-CXNK00E4F54F",
        "manufacturer": "Calix",
        "wapGatewaySn": "CXNK00FEEEA5",
        "opModeWithOnt": "WAP"
    }
];

export const meshDeviceInfoDetails: any = [
    {
        "deviceId": "CXNK00E4F54F",
        "serialNumber": "CXNK00E4F54F",
        "macAddress": "f8:85:f9:23:02:a4",
        "registrationId": "",
        "ipAddress": "192.168.51.121",
        "modelName": "GM2037",
        "softwareVersion": "22.4.0.0.39",
        "opMode": "WAP",
        "_id": "102-F885F9-CXNK00E4F54F",
        "manufacturer": "Calix",
        "wapGatewaySn": "CXNK00FEEEA5",
        "opModeWithOnt": "WAP"
    }
];

export const featureProperties: any = [
    {
        "featureName": "RadioAirtime2.4G",
        "resultType": "Object",
        "fields": [
            {
                "name": "ChannelUtilization",
                "type": "Integer",
                "writable": false
            },
            {
                "name": "ChannelInterferenceTime",
                "type": "Integer",
                "writable": false
            }
        ]
    },
    {
        "featureName": "WANInfo",
        "resultType": "Object",
        "fields": [
            {
                "name": "Name",
                "type": "String",
                "writable": false
            },
            {
                "name": "Enable",
                "type": "Boolean",
                "writable": false
            },
            {
                "name": "Uptime",
                "type": "Integer",
                "writable": false,
                "note": "Unit is second."
            },
            {
                "name": "IPv6ConnectionStatus",
                "type": "String",
                "writable": false
            },
            {
                "name": "MACAddress",
                "type": "IPAddress",
                "writable": false
            },
            {
                "name": "DownstreamRate",
                "type": "Integer",
                "writable": false,
                "note": "0 means Not Limited. Unit is Kbps."
            },
            {
                "name": "UpstreamRate",
                "type": "Integer",
                "writable": false,
                "note": "Unit is Kbps."
            },
            {
                "name": "VlanID",
                "type": "String",
                "writable": false
            },
            {
                "name": "VlanPriority",
                "type": "Integer",
                "writable": false
            },
            {
                "name": "IPv6AddressingType",
                "type": "String",
                "writable": false
            },
            {
                "name": "ConnectionType",
                "type": "String",
                "writable": false
            },
            {
                "name": "DefaultIPv6Gateway",
                "type": "String",
                "writable": false
            },
            {
                "name": "IPv6DNSServer",
                "type": "String",
                "writable": false
            },
            {
                "name": "ExternalIPv6Address",
                "type": "String",
                "writable": false
            },
            {
                "name": "IANA",
                "type": "String",
                "writable": false
            },
            {
                "name": "GRP",
                "type": "String",
                "writable": false
            },
            {
                "name": "BytesReceived",
                "type": "Integer",
                "writable": false
            },
            {
                "name": "BytesSent",
                "type": "Integer",
                "writable": false
            },
            {
                "name": "PacketsReceived",
                "type": "Integer",
                "writable": false
            },
            {
                "name": "PacketsSent",
                "type": "Integer",
                "writable": false
            }
        ]
    },
];

export const metaData: any = {
    "modelName": "GS2037E",
    "dataModelName": "tr098",
    "opMode": "RG",
    "opRole": "Controller",
    "bSmbMode": false,
    "softwareVersion": "22.3.0.0.33",
    "properties": [
        {
            "featureName": "RadioAirtime2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ChannelUtilization",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ChannelInterferenceTime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "WANInfo",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Name",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "Uptime",
                    "type": "Integer",
                    "writable": false,
                    "note": "Unit is second."
                },
                {
                    "name": "IPv6ConnectionStatus",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MACAddress",
                    "type": "IPAddress",
                    "writable": false
                },
                {
                    "name": "DownstreamRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "0 means Not Limited. Unit is Kbps."
                },
                {
                    "name": "UpstreamRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "Unit is Kbps."
                },
                {
                    "name": "VlanID",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "VlanPriority",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "IPv6AddressingType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "ConnectionType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "DefaultIPv6Gateway",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IPv6DNSServer",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "ExternalIPv6Address",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IANA",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "GRP",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "BytesReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "BytesSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "AutoChannel6G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "RadioAirtime5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ChannelUtilization",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ChannelInterferenceTime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "WpsStateBackhaul",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID14",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "LanPort",
            "resultType": "IndexArray",
            "fields": [
                {
                    "name": "Name",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "AdminStatus",
                    "type": "Boolean",
                    "writable": false,
                    "note": "Value true for 'Up' and false for 'Down'"
                },
                {
                    "name": "Operational",
                    "type": "String",
                    "writable": false,
                    "note": "Value 'Up' for 'Connected' and 'NoLink' for 'Disconnected'"
                },
                {
                    "name": "MACAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MaxBitRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "Value 'Auto' or '-1' for 'Auto'",
                    "unit": "Mbps"
                },
                {
                    "name": "DuplexMode",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID15",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID12",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID13",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID10",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID11",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SplitWan",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WanAccessTypeOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "valueList": [
                    "GPON",
                    "XGSPON",
                    "CopperEthernet"
                ]
            }
        },
        {
            "featureName": "HistoricalRadioAirtime",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "ChannelChangeLogs6G",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "TimeStamp",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ReasonCode",
                    "type": "Binary",
                    "writable": false
                },
                {
                    "name": "NewChannel",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "RouterTemperature",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "PortMapping",
            "resultType": "IndexArray",
            "dimensions": 1,
            "fields": [
                {
                    "name": "PortMappingEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "PortMappingDescription",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "InternalClient",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "ExternalPort",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "ExternalPortEnd",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "InternalPort",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "PortMappingProtocol",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DeviceLog",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SiteScan",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WpsState2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "OpModeOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "RG": {
                    "writable": false
                },
                "WAP": {
                    "writable": false
                }
            }
        },
        {
            "featureName": "SSID3",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID4",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID5",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID6",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID7",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "WpsStateIptv",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID8",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID9",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "LanHosts",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "HostName",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "HostNameAlias",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IPAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MACAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "InterfaceType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "AddressSource",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "LeaseTimeRemaining",
                    "type": "Integer",
                    "writable": false,
                    "unit": "Timestamp"
                },
                {
                    "name": "Icon",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Active",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "AccessPoint",
                    "type": "String"
                }
            ]
        },
        {
            "featureName": "AutoChannel2.4G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "SSID23",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID24",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "Topology",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SSID21",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID22",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DHCPv6",
            "resultType": "Object",
            "fields": [
                {
                    "name": "RAService",
                    "type": "String",
                    "valueList": [
                        "server",
                        "disabled"
                    ],
                    "writable": true
                },
                {
                    "name": "DHCPv6Service",
                    "type": "String",
                    "valueList": [
                        "server",
                        "disabled"
                    ],
                    "writable": true
                },
                {
                    "name": "DHCPv6Mode",
                    "type": "String",
                    "valueList": [
                        "A-flag",
                        "M-and-A",
                        "M-flag"
                    ],
                    "writable": true
                },
                {
                    "name": "IPv6DNSServers",
                    "type": "String",
                    "writable": true,
                    "note": "Primary DNS server and secondary DNS server are separated by ','."
                }
            ]
        },
        {
            "featureName": "SSID1",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID2",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID20",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID18",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID19",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID16",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DataModel",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SSID17",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "Ping",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WpsState5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SecurityOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "WPA2-PSK": {
                    "BeaconType": "11i",
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
                "SecurityOff": {
                    "BeaconType": "Basic",
                    "BasicEncryptionModes": "None",
                    "BasicAuthenticationMode": "None"
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
                "WPA2/WPA3-PSK": {
                    "BeaconType": "11iandWPA3",
                    "IEEE11iEncryptionModes": [
                        "AESEncryption"
                    ],
                    "IEEE11iAuthenticationMode": "SAEandPSKAuthentication"
                }
            }
        },
        {
            "featureName": "PrimarySSID5GState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SteeringEvent",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RadioStatus5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "n",
                            "displayName": "802.11n Only"
                        },
                        {
                            "value": "ac",
                            "displayName": "802.11ac and 802.11n"
                        },
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11ac and 802.11n"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "n": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ac": [
                            "20MHz",
                            "40MHz",
                            "80MHz"
                        ],
                        "ax": [
                            "20MHz",
                            "40MHz",
                            "80MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "dfsEnabled": {
                            "20MHz": [
                                36,
                                40,
                                44,
                                48,
                                52,
                                56,
                                60,
                                64,
                                100,
                                104,
                                108,
                                112,
                                132,
                                136,
                                149,
                                153,
                                157,
                                161
                            ],
                            "40MHz": [
                                36,
                                44,
                                52,
                                60,
                                100,
                                108,
                                132,
                                149,
                                157
                            ],
                            "80MHz": [
                                36,
                                52,
                                100,
                                132,
                                149
                            ]
                        },
                        "dfsDisabled": {
                            "20MHz": [
                                36,
                                40,
                                44,
                                48,
                                149,
                                153,
                                157,
                                161
                            ],
                            "40MHz": [
                                36,
                                44,
                                149,
                                157
                            ],
                            "80MHz": [
                                36,
                                149
                            ]
                        }
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "DFS",
                    "type": "Boolean",
                    "writable": true,
                    "note": "Should be unwritable if RegulatoryDomain is GY"
                }
            ]
        },
        {
            "featureName": "QoE",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "UpgradeSoftware",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SecondaryNetwork",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ssid",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "password",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "encryptionType",
                    "type": "Integer",
                    "valueList": [
                        0,
                        1,
                        2,
                        5,
                        6
                    ],
                    "writable": true
                },
                {
                    "name": "type",
                    "type": "Integer",
                    "valueList": [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ],
                    "writable": true
                },
                {
                    "name": "isolated",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "smartQos",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "eventName",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "isIndefinite",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SpeedTest",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SiteScan6G",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "UnifiedSSID",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "TraceRoute",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "UPnP",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "NATEnable",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DownstreamReport",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RadioStatus6G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11ac and 802.11n"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "ax": [
                            "80MHz",
                            "160MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "80MHz": [
                            37,
                            53,
                            69,
                            85,
                            101,
                            117,
                            133,
                            149,
                            165,
                            181,
                            197,
                            213
                        ],
                        "160MHz": [
                            37,
                            69,
                            101,
                            133,
                            165,
                            197
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "PSCOnly",
                    "type": "Boolean",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "BackupRestore",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RadioAirtime6G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ChannelUtilization",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ChannelInterferenceTime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "RemoteAccessGui",
            "resultType": "RawConfiguration",
            "configuration": {
                "needTimer": true,
                "formElement": {
                    "auth": "auth",
                    "nonce": "nonce",
                    "username": "Username"
                },
                "urlAppendix": "/login.cgi"
            }
        },
        {
            "featureName": "AutoChannel5G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "RadioStatus2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "n",
                            "displayName": "802.11n Only"
                        },
                        {
                            "value": "ng",
                            "displayName": "802.11n and 802.11g"
                        },
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11n and 802.11g"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "n": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ax": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ng": [
                            "20MHz",
                            "40MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "20MHz": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11
                        ],
                        "40MHz": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "DHCP",
            "resultType": "Object",
            "fields": [
                {
                    "name": "DHCPServerEnable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "HostName",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "DomainName",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "DeviceIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "BeginningIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "EndingIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "SubnetMask",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "DHCPLeaseTime",
                    "type": "Integer",
                    "writable": true,
                    "note": "-1 indicates an infinite lease.",
                    "unit": "s"
                },
                {
                    "name": "DNSServers",
                    "type": "string",
                    "writable": true,
                    "note": "Primary DNS server and secondary DNS server are separated by ','."
                }
            ]
        },
        {
            "featureName": "Reboot",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "execTimeout": 300
            }
        },
        {
            "featureName": "Firewall",
            "resultType": "Object",
            "fields": [
                {
                    "name": "StealthMode",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "InValue",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "OutValue",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SecurityLevel",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "High",
                            "displayName": "High"
                        },
                        {
                            "value": "X_000631_Medium",
                            "displayName": "Medium"
                        },
                        {
                            "value": "Low",
                            "displayName": "Low"
                        },
                        {
                            "value": "Off",
                            "displayName": "Off"
                        }
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DMZ",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "IPAddress",
                    "type": "IPAddress",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "ChannelChangeLogs2.4G",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "TimeStamp",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ReasonCode",
                    "type": "Binary",
                    "writable": false
                },
                {
                    "name": "NewChannel",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "IptvState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "ChannelChangeLogs5G",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "TimeStamp",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ReasonCode",
                    "type": "Binary",
                    "writable": false
                },
                {
                    "name": "NewChannel",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "ConnectToDevice",
            "resultType": "Object",
            "fields": [
                {
                    "name": "IPAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Port",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Protocol",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Username",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Password",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Nonce",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSIDManager",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "DeviceStatus",
            "resultType": "Object",
            "fields": [
                {
                    "name": "PeriodicInformEnable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "PeriodicInformInterval",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Uptime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "PrimarySSID2.4GState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "FactoryReset",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "execTimeout": 300
            }
        }
    ],
    "RadioAirtime24G": {
        "ChannelUtilization": {
            "name": "ChannelUtilization",
            "type": "Integer",
            "writable": false
        },
        "ChannelInterferenceTime": {
            "name": "ChannelInterferenceTime",
            "type": "Integer",
            "writable": false
        }
    },
    "WANInfo": {
        "Name": {
            "name": "Name",
            "type": "String",
            "writable": false
        },
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "Uptime": {
            "name": "Uptime",
            "type": "Integer",
            "writable": false,
            "note": "Unit is second."
        },
        "IPv6ConnectionStatus": {
            "name": "IPv6ConnectionStatus",
            "type": "String",
            "writable": false
        },
        "MACAddress": {
            "name": "MACAddress",
            "type": "IPAddress",
            "writable": false
        },
        "DownstreamRate": {
            "name": "DownstreamRate",
            "type": "Integer",
            "writable": false,
            "note": "0 means Not Limited. Unit is Kbps."
        },
        "UpstreamRate": {
            "name": "UpstreamRate",
            "type": "Integer",
            "writable": false,
            "note": "Unit is Kbps."
        },
        "VlanID": {
            "name": "VlanID",
            "type": "String",
            "writable": false
        },
        "VlanPriority": {
            "name": "VlanPriority",
            "type": "Integer",
            "writable": false
        },
        "IPv6AddressingType": {
            "name": "IPv6AddressingType",
            "type": "String",
            "writable": false
        },
        "ConnectionType": {
            "name": "ConnectionType",
            "type": "String",
            "writable": false
        },
        "DefaultIPv6Gateway": {
            "name": "DefaultIPv6Gateway",
            "type": "String",
            "writable": false
        },
        "IPv6DNSServer": {
            "name": "IPv6DNSServer",
            "type": "String",
            "writable": false
        },
        "ExternalIPv6Address": {
            "name": "ExternalIPv6Address",
            "type": "String",
            "writable": false
        },
        "IANA": {
            "name": "IANA",
            "type": "String",
            "writable": false
        },
        "GRP": {
            "name": "GRP",
            "type": "String",
            "writable": false
        },
        "BytesReceived": {
            "name": "BytesReceived",
            "type": "Integer",
            "writable": false
        },
        "BytesSent": {
            "name": "BytesSent",
            "type": "Integer",
            "writable": false
        },
        "PacketsReceived": {
            "name": "PacketsReceived",
            "type": "Integer",
            "writable": false
        },
        "PacketsSent": {
            "name": "PacketsSent",
            "type": "Integer",
            "writable": false
        }
    },
    "AutoChannel6G": {
        "config": {
            "supported": true
        }
    },
    "RadioAirtime5G": {
        "ChannelUtilization": {
            "name": "ChannelUtilization",
            "type": "Integer",
            "writable": false
        },
        "ChannelInterferenceTime": {
            "name": "ChannelInterferenceTime",
            "type": "Integer",
            "writable": false
        }
    },
    "WpsStateBackhaul": {
        "State": {
            "name": "State",
            "type": "String",
            "writable": false
        }
    },
    "SSID14": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "LanPort": {
        "Name": {
            "name": "Name",
            "type": "String",
            "writable": false
        },
        "AdminStatus": {
            "name": "AdminStatus",
            "type": "Boolean",
            "writable": false,
            "note": "Value true for 'Up' and false for 'Down'"
        },
        "Operational": {
            "name": "Operational",
            "type": "String",
            "writable": false,
            "note": "Value 'Up' for 'Connected' and 'NoLink' for 'Disconnected'"
        },
        "MACAddress": {
            "name": "MACAddress",
            "type": "String",
            "writable": false
        },
        "MaxBitRate": {
            "name": "MaxBitRate",
            "type": "Integer",
            "writable": false,
            "note": "Value 'Auto' or '-1' for 'Auto'",
            "unit": "Mbps"
        },
        "DuplexMode": {
            "name": "DuplexMode",
            "type": "String",
            "writable": false
        }
    },
    "SSID15": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID12": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID13": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID10": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID11": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SplitWan": {
        "supported": true
    },
    "WanAccessTypeOptions": {
        "config": {
            "supported": true,
            "valueList": [
                "GPON",
                "XGSPON",
                "CopperEthernet"
            ]
        }
    },
    "HistoricalRadioAirtime": {
        "supported": true
    },
    "ChannelChangeLogs6G": {
        "TimeStamp": {
            "name": "TimeStamp",
            "type": "Integer",
            "writable": false
        },
        "ReasonCode": {
            "name": "ReasonCode",
            "type": "Binary",
            "writable": false
        },
        "NewChannel": {
            "name": "NewChannel",
            "type": "Integer",
            "writable": false
        }
    },
    "RouterTemperature": {
        "supported": true
    },
    "PortMapping": {
        "PortMappingEnabled": {
            "name": "PortMappingEnabled",
            "type": "Boolean",
            "writable": true
        },
        "PortMappingDescription": {
            "name": "PortMappingDescription",
            "type": "String",
            "writable": true
        },
        "InternalClient": {
            "name": "InternalClient",
            "type": "IPAddress",
            "writable": true
        },
        "ExternalPort": {
            "name": "ExternalPort",
            "type": "Integer",
            "writable": true
        },
        "ExternalPortEnd": {
            "name": "ExternalPortEnd",
            "type": "Integer",
            "writable": true
        },
        "InternalPort": {
            "name": "InternalPort",
            "type": "Integer",
            "writable": true
        },
        "PortMappingProtocol": {
            "name": "PortMappingProtocol",
            "type": "String",
            "writable": true
        }
    },
    "DeviceLog": {
        "supported": true
    },
    "SiteScan": {
        "supported": true
    },
    "WpsState24G": {
        "State": {
            "name": "State",
            "type": "String",
            "writable": false
        }
    },
    "OpModeOptions": {
        "config": {
            "RG": {
                "writable": false
            },
            "WAP": {
                "writable": false
            }
        }
    },
    "SSID3": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID4": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID5": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID6": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID7": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "WpsStateIptv": {
        "State": {
            "name": "State",
            "type": "String",
            "writable": false
        }
    },
    "SSID8": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID9": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "LanHosts": {
        "HostName": {
            "name": "HostName",
            "type": "String",
            "writable": false
        },
        "HostNameAlias": {
            "name": "HostNameAlias",
            "type": "String",
            "writable": false
        },
        "IPAddress": {
            "name": "IPAddress",
            "type": "String",
            "writable": false
        },
        "MACAddress": {
            "name": "MACAddress",
            "type": "String",
            "writable": false
        },
        "InterfaceType": {
            "name": "InterfaceType",
            "type": "String",
            "writable": false
        },
        "AddressSource": {
            "name": "AddressSource",
            "type": "String",
            "writable": false
        },
        "LeaseTimeRemaining": {
            "name": "LeaseTimeRemaining",
            "type": "Integer",
            "writable": false,
            "unit": "Timestamp"
        },
        "Icon": {
            "name": "Icon",
            "type": "Integer",
            "writable": false
        },
        "Active": {
            "name": "Active",
            "type": "Boolean",
            "writable": false
        },
        "AccessPoint": {
            "name": "AccessPoint",
            "type": "String"
        }
    },
    "AutoChannel24G": {
        "config": {
            "supported": true
        }
    },
    "SSID23": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID24": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "Topology": {
        "supported": true
    },
    "SSID21": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID22": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "DHCPv6": {
        "RAService": {
            "name": "RAService",
            "type": "String",
            "valueList": [
                "server",
                "disabled"
            ],
            "writable": true
        },
        "DHCPv6Service": {
            "name": "DHCPv6Service",
            "type": "String",
            "valueList": [
                "server",
                "disabled"
            ],
            "writable": true
        },
        "DHCPv6Mode": {
            "name": "DHCPv6Mode",
            "type": "String",
            "valueList": [
                "A-flag",
                "M-and-A",
                "M-flag"
            ],
            "writable": true
        },
        "IPv6DNSServers": {
            "name": "IPv6DNSServers",
            "type": "String",
            "writable": true,
            "note": "Primary DNS server and secondary DNS server are separated by ','."
        }
    },
    "SSID1": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID2": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID20": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID18": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID19": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "SSID16": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        },
        "BasicEncryptionModes": {
            "name": "BasicEncryptionModes",
            "type": "String",
            "writable": true
        },
        "BasicAuthenticationMode": {
            "name": "BasicAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "WPAEncryptionModes": {
            "name": "WPAEncryptionModes",
            "type": "String",
            "writable": true
        },
        "WPAAuthenticationMode": {
            "name": "WPAAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "DataModel": {
        "supported": true
    },
    "SSID17": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "SSID": {
            "name": "SSID",
            "type": "String",
            "writable": true
        },
        "SSIDAdvertisementEnabled": {
            "name": "SSIDAdvertisementEnabled",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "WPA3"
            ],
            "writable": true
        },
        "IEEE11iEncryptionModes": {
            "name": "IEEE11iEncryptionModes",
            "type": "String",
            "writable": true
        },
        "IEEE11iAuthenticationMode": {
            "name": "IEEE11iAuthenticationMode",
            "type": "String",
            "writable": true
        },
        "KeyPassphrase": {
            "name": "KeyPassphrase",
            "type": "String",
            "writable": true
        }
    },
    "Ping": {
        "supported": true
    },
    "WpsState5G": {
        "State": {
            "name": "State",
            "type": "String",
            "writable": false
        }
    },
    "SecurityOptions": {
        "config": {
            "WPA2-PSK": {
                "BeaconType": "11i",
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
            "SecurityOff": {
                "BeaconType": "Basic",
                "BasicEncryptionModes": "None",
                "BasicAuthenticationMode": "None"
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
            "WPA2/WPA3-PSK": {
                "BeaconType": "11iandWPA3",
                "IEEE11iEncryptionModes": [
                    "AESEncryption"
                ],
                "IEEE11iAuthenticationMode": "SAEandPSKAuthentication"
            }
        }
    },
    "PrimarySSID5GState": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        }
    },
    "SteeringEvent": {
        "supported": true
    },
    "RadioStatus5G": {
        "NoiseLevel": {
            "name": "NoiseLevel",
            "type": "Integer",
            "writable": false
        },
        "PacketsSent": {
            "name": "PacketsSent",
            "type": "Integer",
            "writable": false
        },
        "PacketsReceived": {
            "name": "PacketsReceived",
            "type": "Integer",
            "writable": false
        },
        "PacketsReTransmittedDownstream": {
            "name": "PacketsReTransmittedDownstream",
            "type": "Integer",
            "writable": false
        },
        "PacketsDroppedDownstream": {
            "name": "PacketsDroppedDownstream",
            "type": "Integer",
            "writable": false
        },
        "MUMIMO": {
            "name": "MUMIMO",
            "type": "Boolean",
            "writable": true
        },
        "RadioEnabled": {
            "name": "RadioEnabled",
            "type": "Boolean",
            "writable": true
        },
        "Mode": {
            "name": "Mode",
            "type": "String",
            "valueList": [
                {
                    "value": "n",
                    "displayName": "802.11n Only"
                },
                {
                    "value": "ac",
                    "displayName": "802.11ac and 802.11n"
                },
                {
                    "value": "ax",
                    "displayName": "802.11ax, 802.11ac and 802.11n"
                }
            ],
            "writable": true
        },
        "Bandwidth": {
            "name": "Bandwidth",
            "type": "String",
            "valueList": {
                "n": [
                    "20MHz",
                    "40MHz"
                ],
                "ac": [
                    "20MHz",
                    "40MHz",
                    "80MHz"
                ],
                "ax": [
                    "20MHz",
                    "40MHz",
                    "80MHz"
                ]
            },
            "writable": true
        },
        "Channel": {
            "name": "Channel",
            "type": "String",
            "valueList": {
                "dfsEnabled": {
                    "20MHz": [
                        36,
                        40,
                        44,
                        48,
                        52,
                        56,
                        60,
                        64,
                        100,
                        104,
                        108,
                        112,
                        132,
                        136,
                        149,
                        153,
                        157,
                        161
                    ],
                    "40MHz": [
                        36,
                        44,
                        52,
                        60,
                        100,
                        108,
                        132,
                        149,
                        157
                    ],
                    "80MHz": [
                        36,
                        52,
                        100,
                        132,
                        149
                    ]
                },
                "dfsDisabled": {
                    "20MHz": [
                        36,
                        40,
                        44,
                        48,
                        149,
                        153,
                        157,
                        161
                    ],
                    "40MHz": [
                        36,
                        44,
                        149,
                        157
                    ],
                    "80MHz": [
                        36,
                        149
                    ]
                }
            },
            "writable": true
        },
        "AutoChannelEnable": {
            "name": "AutoChannelEnable",
            "type": "String",
            "writable": true
        },
        "PowerLevel": {
            "name": "PowerLevel",
            "type": "Integer",
            "valueList": [
                10,
                20,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "writable": true
        },
        "DFS": {
            "name": "DFS",
            "type": "Boolean",
            "writable": true,
            "note": "Should be unwritable if RegulatoryDomain is GY"
        }
    },
    "QoE": {
        "supported": true
    },
    "UpgradeSoftware": {
        "supported": true
    },
    "SecondaryNetwork": {
        "ssid": {
            "name": "ssid",
            "type": "String",
            "writable": true
        },
        "password": {
            "name": "password",
            "type": "String",
            "writable": true
        },
        "encryptionType": {
            "name": "encryptionType",
            "type": "Integer",
            "valueList": [
                0,
                1,
                2,
                5,
                6
            ],
            "writable": true
        },
        "type": {
            "name": "type",
            "type": "Integer",
            "valueList": [
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "writable": true
        },
        "isolated": {
            "name": "isolated",
            "type": "Boolean",
            "writable": true
        },
        "smartQos": {
            "name": "smartQos",
            "type": "Boolean",
            "writable": true
        },
        "eventName": {
            "name": "eventName",
            "type": "String",
            "writable": true
        },
        "isIndefinite": {
            "name": "isIndefinite",
            "type": "Boolean",
            "writable": true
        }
    },
    "SpeedTest": {
        "supported": true
    },
    "SiteScan6G": {
        "supported": true
    },
    "UnifiedSSID": {
        "supported": true
    },
    "TraceRoute": {
        "supported": true
    },
    "UPnP": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "NATEnable": {
            "name": "NATEnable",
            "type": "Boolean",
            "writable": true
        }
    },
    "DownstreamReport": {
        "supported": true
    },
    "RadioStatus6G": {
        "NoiseLevel": {
            "name": "NoiseLevel",
            "type": "Integer",
            "writable": false
        },
        "PacketsSent": {
            "name": "PacketsSent",
            "type": "Integer",
            "writable": false
        },
        "PacketsReceived": {
            "name": "PacketsReceived",
            "type": "Integer",
            "writable": false
        },
        "PacketsReTransmittedDownstream": {
            "name": "PacketsReTransmittedDownstream",
            "type": "Integer",
            "writable": false
        },
        "PacketsDroppedDownstream": {
            "name": "PacketsDroppedDownstream",
            "type": "Integer",
            "writable": false
        },
        "MUMIMO": {
            "name": "MUMIMO",
            "type": "Boolean",
            "writable": true
        },
        "RadioEnabled": {
            "name": "RadioEnabled",
            "type": "Boolean",
            "writable": true
        },
        "Mode": {
            "name": "Mode",
            "type": "String",
            "valueList": [
                {
                    "value": "ax",
                    "displayName": "802.11ax, 802.11ac and 802.11n"
                }
            ],
            "writable": true
        },
        "Bandwidth": {
            "name": "Bandwidth",
            "type": "String",
            "valueList": {
                "ax": [
                    "80MHz",
                    "160MHz"
                ]
            },
            "writable": true
        },
        "Channel": {
            "name": "Channel",
            "type": "String",
            "valueList": {
                "80MHz": [
                    37,
                    53,
                    69,
                    85,
                    101,
                    117,
                    133,
                    149,
                    165,
                    181,
                    197,
                    213
                ],
                "160MHz": [
                    37,
                    69,
                    101,
                    133,
                    165,
                    197
                ]
            },
            "writable": true
        },
        "AutoChannelEnable": {
            "name": "AutoChannelEnable",
            "type": "String",
            "writable": true
        },
        "PowerLevel": {
            "name": "PowerLevel",
            "type": "Integer",
            "valueList": [
                10,
                20,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "writable": true
        },
        "PSCOnly": {
            "name": "PSCOnly",
            "type": "Boolean",
            "writable": false
        }
    },
    "BackupRestore": {
        "supported": true
    },
    "RadioAirtime6G": {
        "ChannelUtilization": {
            "name": "ChannelUtilization",
            "type": "Integer",
            "writable": false
        },
        "ChannelInterferenceTime": {
            "name": "ChannelInterferenceTime",
            "type": "Integer",
            "writable": false
        }
    },
    "RemoteAccessGui": {
        "config": {
            "needTimer": true,
            "formElement": {
                "auth": "auth",
                "nonce": "nonce",
                "username": "Username"
            },
            "urlAppendix": "/login.cgi"
        }
    },
    "AutoChannel5G": {
        "config": {
            "supported": true
        }
    },
    "RadioStatus24G": {
        "RadioEnabled": {
            "name": "RadioEnabled",
            "type": "Boolean",
            "writable": true
        },
        "Mode": {
            "name": "Mode",
            "type": "String",
            "valueList": [
                {
                    "value": "n",
                    "displayName": "802.11n Only"
                },
                {
                    "value": "ng",
                    "displayName": "802.11n and 802.11g"
                },
                {
                    "value": "ax",
                    "displayName": "802.11ax, 802.11n and 802.11g"
                }
            ],
            "writable": true
        },
        "Bandwidth": {
            "name": "Bandwidth",
            "type": "String",
            "valueList": {
                "n": [
                    "20MHz",
                    "40MHz"
                ],
                "ax": [
                    "20MHz",
                    "40MHz"
                ],
                "ng": [
                    "20MHz",
                    "40MHz"
                ]
            },
            "writable": true
        },
        "Channel": {
            "name": "Channel",
            "type": "String",
            "valueList": {
                "20MHz": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11
                ],
                "40MHz": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ]
            },
            "writable": true
        },
        "AutoChannelEnable": {
            "name": "AutoChannelEnable",
            "type": "String",
            "writable": true
        },
        "PowerLevel": {
            "name": "PowerLevel",
            "type": "Integer",
            "valueList": [
                10,
                20,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "writable": true
        },
        "NoiseLevel": {
            "name": "NoiseLevel",
            "type": "Integer",
            "writable": false
        },
        "PacketsSent": {
            "name": "PacketsSent",
            "type": "Integer",
            "writable": false
        },
        "PacketsReceived": {
            "name": "PacketsReceived",
            "type": "Integer",
            "writable": false
        },
        "PacketsReTransmittedDownstream": {
            "name": "PacketsReTransmittedDownstream",
            "type": "Integer",
            "writable": false
        },
        "PacketsDroppedDownstream": {
            "name": "PacketsDroppedDownstream",
            "type": "Integer",
            "writable": false
        }
    },
    "DHCP": {
        "DHCPServerEnable": {
            "name": "DHCPServerEnable",
            "type": "Boolean",
            "writable": true
        },
        "HostName": {
            "name": "HostName",
            "type": "String",
            "writable": true
        },
        "DomainName": {
            "name": "DomainName",
            "type": "String",
            "writable": true
        },
        "DeviceIPAddress": {
            "name": "DeviceIPAddress",
            "type": "IPAddress",
            "writable": true
        },
        "BeginningIPAddress": {
            "name": "BeginningIPAddress",
            "type": "IPAddress",
            "writable": true
        },
        "EndingIPAddress": {
            "name": "EndingIPAddress",
            "type": "IPAddress",
            "writable": true
        },
        "SubnetMask": {
            "name": "SubnetMask",
            "type": "IPAddress",
            "writable": true
        },
        "DHCPLeaseTime": {
            "name": "DHCPLeaseTime",
            "type": "Integer",
            "writable": true,
            "note": "-1 indicates an infinite lease.",
            "unit": "s"
        },
        "DNSServers": {
            "name": "DNSServers",
            "type": "string",
            "writable": true,
            "note": "Primary DNS server and secondary DNS server are separated by ','."
        }
    },
    "Reboot": {
        "config": {
            "supported": true,
            "execTimeout": 300
        }
    },
    "Firewall": {
        "StealthMode": {
            "name": "StealthMode",
            "type": "Boolean",
            "writable": true
        },
        "InValue": {
            "name": "InValue",
            "type": "String",
            "writable": true
        },
        "OutValue": {
            "name": "OutValue",
            "type": "String",
            "writable": true
        },
        "SecurityLevel": {
            "name": "SecurityLevel",
            "type": "String",
            "valueList": [
                {
                    "value": "High",
                    "displayName": "High"
                },
                {
                    "value": "X_000631_Medium",
                    "displayName": "Medium"
                },
                {
                    "value": "Low",
                    "displayName": "Low"
                },
                {
                    "value": "Off",
                    "displayName": "Off"
                }
            ],
            "writable": true
        }
    },
    "DMZ": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "IPAddress": {
            "name": "IPAddress",
            "type": "IPAddress",
            "writable": true
        }
    },
    "ChannelChangeLogs24G": {
        "TimeStamp": {
            "name": "TimeStamp",
            "type": "Integer",
            "writable": false
        },
        "ReasonCode": {
            "name": "ReasonCode",
            "type": "Binary",
            "writable": false
        },
        "NewChannel": {
            "name": "NewChannel",
            "type": "Integer",
            "writable": false
        }
    },
    "IptvState": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": true
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        }
    },
    "ChannelChangeLogs5G": {
        "TimeStamp": {
            "name": "TimeStamp",
            "type": "Integer",
            "writable": false
        },
        "ReasonCode": {
            "name": "ReasonCode",
            "type": "Binary",
            "writable": false
        },
        "NewChannel": {
            "name": "NewChannel",
            "type": "Integer",
            "writable": false
        }
    },
    "ConnectToDevice": {
        "IPAddress": {
            "name": "IPAddress",
            "type": "String",
            "writable": false
        },
        "Port": {
            "name": "Port",
            "type": "String",
            "writable": false
        },
        "Protocol": {
            "name": "Protocol",
            "type": "Integer",
            "writable": false
        },
        "Username": {
            "name": "Username",
            "type": "String",
            "writable": false
        },
        "Password": {
            "name": "Password",
            "type": "Integer",
            "writable": false
        },
        "Nonce": {
            "name": "Nonce",
            "type": "Integer",
            "writable": false
        }
    },
    "SSIDManager": {
        "supported": true
    },
    "DeviceStatus": {
        "PeriodicInformEnable": {
            "name": "PeriodicInformEnable",
            "type": "Boolean",
            "writable": false
        },
        "PeriodicInformInterval": {
            "name": "PeriodicInformInterval",
            "type": "Integer",
            "writable": false
        },
        "Uptime": {
            "name": "Uptime",
            "type": "Integer",
            "writable": false
        }
    },
    "PrimarySSID24GState": {
        "Enable": {
            "name": "Enable",
            "type": "Boolean",
            "writable": false
        },
        "BeaconType": {
            "name": "BeaconType",
            "type": "String",
            "valueList": [
                "Basic",
                "11i",
                "WPAand11i",
                "WPA3",
                "11iandWPA3"
            ],
            "writable": true
        }
    },
    "FactoryReset": {
        "config": {
            "supported": true,
            "execTimeout": 300
        }
    }
};

export const scopes: any = {
    "cloud.rbac.csc.services.data.speed_test": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.calloutcome": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.applications.report": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.servify": [
        "read"
    ],
    "cloud.rbac.csc.cpe.comm_logs": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.event_history": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.data_model": [
        "read",
        "write"
    ],
    "cloud.cmc.insights": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.experienceiq.enablement": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.qoe": [
        "read"
    ],
    "cloud.rbac.csc.cpe.update_image": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.protectiq": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.ext_file_server": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.gfast": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.unmappedips": [
        "read",
        "write"
    ],
    "cloud.csc.report.unassociateddevices": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.systems.nwdelete": [
        "read",
        "write"
    ],
    "cloud.csc.dashboards": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.mycommunityiq": [
        "read"
    ],
    "cloud.rbac.csc.netops": [
        "read"
    ],
    "cloud.rbac.csc.services.data.trafficreports": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.experienceiq": [
        "read",
        "write"
    ],
    "cloud.csc.batch.workflows": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.subscriber.configurations": [
        "read"
    ],
    "cloud.csc.device.troubleshooting.xdsl": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems.cmndiqstatus": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.location": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations.config_files": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.voice": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.issues.report.activealarm": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.systems.subscriber": [
        "read",
        "write"
    ],
    "cloud.csc.device.cfg": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.lan": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.location.report": [
        "read",
        "write"
    ],
    "cloud.cmc.retention": [
        "read",
        "write"
    ],
    "cloud.csc.image": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.issues.report.historyalarm": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems.systemmodel": [
        "read",
        "write"
    ],
    "cloud.rbac.foundation.configurations": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems.systemstatus": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.services.video": [
        "read",
        "write"
    ],
    "cloud.csc.batch.policies": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.applications": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config": [
        "read"
    ],
    "cloud.rbac.coc.operations.network": [
        "read"
    ],
    "cloud.rbac.coc.insights.subscribersystems.revedgesuiteecosystemstatus": [
        "read",
        "write"
    ],
    "cloud.csc.image.upload": [
        "read",
        "write"
    ],
    "cloud.csc.scautorun": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.services.data.wan_status": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.connect_device": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.bark": [
        "read"
    ],
    "cloud.rbac.csc.ssidmanager": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.mgmt.devices_delete": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.search": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.delete_device": [
        "read",
        "write"
    ],
    "cloud.admin.org_access": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health.pon": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.data_model": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.calloutcomereports": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.secure_onboarding": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.systems.network": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.reboot": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.issues.report": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.speed_test": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.services.data": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.protectiq.enablement": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.wan": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations.device_group": [
        "read",
        "write"
    ],
    "cloud.csc.batch.profiles": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.wifi": [
        "read",
        "write"
    ],
    "cloud.csc.subscriber": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.reports": [
        "read"
    ],
    "cloud.rbac.csc.devices": [
        "read"
    ],
    "cloud.rbac.coc.health.ethernet": [
        "read",
        "write"
    ],
    "cloud.csc.batch.devicegroups": [
        "read",
        "write"
    ],
    "cloud.csc.device.trafficreports": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.self_heal": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.services": [
        "read",
        "write"
    ],
    "cloud.csc.app_suites.protect_iq": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.issues.current": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic": [
        "read",
        "write"
    ],
    "cloud.csc.image.extfs": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.stale_purge": [
        "read",
        "write"
    ],
    "cloud.admin.orgs": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.ssidmanager.ssidedit": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.mgmt.subscribers": [
        "read",
        "write"
    ],
    "cloud.rbac.cmc.subscriber": [
        "read"
    ],
    "cloud.csc.report.migrationlog": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.factory_reset": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health.pon.realtime": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems": [
        "read",
        "write"
    ],
    "cloud.csc.report.proactive": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.arlo": [
        "read"
    ],
    "cloud.rbac.csc.netops.mgmt": [
        "read",
        "write"
    ],
    "cloud.rbac.foundation.reports": [
        "read",
        "write"
    ],
    "cloud.rbac.cmc.exploredata": [
        "read",
        "write"
    ],
    "cloud.csc.report.calloutcome": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.network.policies": [
        "read"
    ],
    "cloud.rbac.csc.netops.operations.profiles": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.reboot": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.invreports": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.summary": [
        "read"
    ],
    "cloud.csc.device.systools.backup_restore": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.settings": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.dashboard": [
        "read"
    ],
    "cloud.csc.device.systools.event_history": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.protectiq.configuration": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.device_logs": [
        "read",
        "write"
    ],
    "cloud.csc.report": [
        "read",
        "write"
    ],
    "cloud.csc.device": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations.sw_images": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.gfast": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations.workflow": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.reports.inv_report": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.reports.unassociated_devices": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.trace_route": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps.experienceiq.configuration": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.subscriber.operations": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.networktrends.biperrors": [
        "read",
        "write"
    ],
    "cloud.rbac.foundation": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.comm_log": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.video": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.apps": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe": [
        "read",
        "write"
    ],
    "cloud.cmc.upsell": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health.pon.report": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.smartcheck": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.networktrends.activealarm": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.issues": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.unassociatedsystems": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.systems.nwdisconnect": [
        "read",
        "write"
    ],
    "cloud.csc.batch": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.systems": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.l2security": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.network.alarmnotifications": [
        "read"
    ],
    "cloud.rbac.csc.topology": [
        "read"
    ],
    "cloud.rbac.coc.operations.subscriber": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.connect_device": [
        "read",
        "write"
    ],
    "cloud.csc.app_suites.experience_iq": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health.ae": [
        "read",
        "write"
    ],
    "cloud.admin.roles": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.xdsl": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems.systemtype": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.health.ont": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.l2security": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.operations.perf_testing": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.auditreports": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.network": [
        "read",
        "write"
    ],
    "cloud.csc.app_suites": [
        "read",
        "write"
    ],
    "cloud.rbac.cmc.campaign": [
        "read",
        "write"
    ],
    "cloud.admin.users": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.backup_restore": [
        "read",
        "write"
    ],
    "cloud.csc.report.inv": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.device_logs": [
        "read",
        "write"
    ],
    "cloud.rbac.foundation.systems": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.ssidmanager.ssidcreate": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.epcountbymapper": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.location.realtime": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.network.report": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.cpe.ping": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.reports.auditreports": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.mgmt.devices": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.insights.subscribersystems.systembyrevenueedgeiqsuites": [
        "read",
        "write"
    ],
    "cloud.cmc.acquisition": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.dial_plan": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.report.ontdevices": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.site_scan": [
        "read"
    ],
    "cloud.rbac.coc.traffic.applications.realtime": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.ssidmanager.viewpassphrase": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.traffic.network.realtime": [
        "read",
        "write"
    ],
    "cloud.rbac.coc.operations.network.transformalarmrules": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.dashboards": [
        "read",
        "write"
    ],
    "cloud.rbac.foundation.insights": [
        "read",
        "write"
    ],
    "cloud.rbac.cmc.revenue": [
        "read"
    ],
    "cloud.rbac.coc.operations.report.mappedeplists": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.services.voice": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.config.subnet_config": [
        "read",
        "write"
    ],
    "cloud.csc.device.systools.factory_reset": [
        "read",
        "write"
    ],
    "cloud.csc.device.troubleshooting.wireless": [
        "read",
        "write"
    ],
    "cloud.rbac.csc.netops.reports.call_outcome": [
        "read",
        "write"
    ]
};

export const modelNameSerialNumbers = [
    {
        "modelName": "GS2037E",
        "serialNumber": "CXNK00FEEEA5",
        "opMode": "RG"
    },
    {
        "modelName": "GM2037",
        "serialNumber": "CXNK00E4F54F",
        "opMode": "WAP"
    },
    {
        "modelName": "GM1028",
        "serialNumber": "CXNK00AB3A5A",
        "opMode": "WAP"
    },
    {
        "modelName": "MGM1028",
        "serialNumber": "MSTC00000090",
        "opMode": "WAP"
    }
];

export const subscriberOverviewData = {
    "allIssues": [
        {
            "code": "WIFI_INTERFERENCE_HIGH_24G",
            "subscriberId": "9311195b-9ab1-4258-b5ba-87704f6d7e73",
            "serialNumber": "CXNK003CF268",
            "source": "CXNK003CF268",
            "sourceId": "CXNK003CF268",
            "type": "WIFI",
            "severity": 1,
            "reason": "2.4 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel"
        },
        {
            "code": "DS_SPEED_LOW_85",
            "subscriberId": "9311195b-9ab1-4258-b5ba-87704f6d7e73",
            "serialNumber": "CXNK003CF268",
            "source": "CXNK003CF268",
            "sourceId": "CXNK003CF268",
            "type": "WIFI",
            "severity": 1,
            "reason": "5 GHz Wi-Fi channel interference is above recommended thresholds. The system is attempting to find a better channel"
        },
        {
            "code": "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
            "subscriberId": "9311195b-9ab1-4258-b5ba-87704f6d7e73",
            "serialNumber": "CXNK003CF268",
            "source": "CXNK003CF268",
            "sourceId": "CXNK003CF268",
            "type": "WIFI",
            "severity": 0,
            "reason": "Detecting low channel score on 5 Ghz band, see site scan for more information and recommendations",
            "recommendation": "The access point is reporting a low channel score, which may mean a degraded Wi-Fi experience. Check site scan for recommendation on which channel to change to"
        },
        {
            "code": "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G",
            "subscriberId": "9311195b-9ab1-4258-b5ba-87704f6d7e73",
            "serialNumber": "CXNK003CF268",
            "source": "CXNK003CF268",
            "sourceId": "CXNK003CF268",
            "type": "WIFI",
            "severity": 0,
            "reason": "Detecting low channel score on 2.4 GHz band, see site scan for more information and recommendations",
            "recommendation": "The access point is reporting a low channel score, which may mean a degraded Wi-Fi experience. Check site scan for recommendation on which channel to change to. If the service is on the best channel, try and move as many clients to 5 Ghz band as possible"
        },
        {
            "code": "SOFTWARE_UPGRADE_FAILED",
            "serialNumber": "CXNK00BEDD42",
            "source": "CXNK00BEDD42",
            "sourceId": "CXNK00BEDD42",
            "type": "ROUTER",
            "severity": 0,
            "reason": "Software upgrade failed",
            "recommendation": "The software upgraded failed on the device. Please check the file used and attempt again"
        },
        {
            "code": "SOFTWARE_UPGRADE_FAILED",
            "serialNumber": "CXNK003CF268",
            "source": "CXNK003CF268",
            "sourceId": "CXNK003CF268",
            "type": "ROUTER",
            "severity": 0,
            "reason": "Software upgrade failed",
            "recommendation": "The software upgraded failed on the device. Please check the file used and attempt again"
        }
    ],
    "networkStatus": {
        "lastSpeedTestResult": [
            null
        ],
        "ssid": {
            "activeSSIDCount": 5,
            "data": {
                "primary-operator-ssid": [
                    {
                        "Enable": "true",
                        "SSID": "!!!844E-WAP2.411",
                        "SSIDAdvertisementEnabled": "true",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "1",
                        "SSIDName": "SSID1"
                    },
                    {
                        "Enable": "true",
                        "SSID": "!!!844E-WAP2.4guest",
                        "SSIDAdvertisementEnabled": "true",
                        "BeaconType": "11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "2",
                        "SSIDName": "SSID2"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_1",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "3",
                        "SSIDName": "SSID3"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_2",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "4",
                        "SSIDName": "SSID4"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_3",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "5",
                        "SSIDName": "SSID5"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_4",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "6",
                        "SSIDName": "SSID6"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_5",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "7",
                        "SSIDName": "SSID7"
                    },
                    {
                        "Enable": "false",
                        "SSID": "2.4GHz_Operator_6",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "2.4GHz",
                        "id": "8",
                        "SSIDName": "SSID8"
                    },
                    {
                        "Enable": "true",
                        "SSID": "!!!844E-WAP5",
                        "SSIDAdvertisementEnabled": "true",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "9",
                        "SSIDName": "SSID9"
                    },
                    {
                        "Enable": "true",
                        "SSID": "!!!844E-WAP5Gguest",
                        "SSIDAdvertisementEnabled": "true",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "10",
                        "SSIDName": "SSID10"
                    },
                    {
                        "Enable": "false",
                        "SSID": "5GHz_IPTV_SSID3CF268",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "11",
                        "SSIDName": "SSID11"
                    },
                    {
                        "Enable": "false",
                        "SSID": "5GHz_Operator_1",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "12",
                        "SSIDName": "SSID12"
                    },
                    {
                        "Enable": "false",
                        "SSID": "5GHz_Operator_2",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "13",
                        "SSIDName": "SSID13"
                    },
                    {
                        "Enable": "false",
                        "SSID": "5GHz_Operator_3",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "14",
                        "SSIDName": "SSID14"
                    },
                    {
                        "Enable": "false",
                        "SSID": "5GHz_Operator_4",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "15",
                        "SSIDName": "SSID15"
                    },
                    {
                        "Enable": "true",
                        "SSID": "5GHz_Backhaul_SSID3CF268",
                        "SSIDAdvertisementEnabled": "false",
                        "BeaconType": "WPAand11i",
                        "BasicEncryptionModes": "None",
                        "BasicAuthenticationMode": "None",
                        "WPAEncryptionModes": "AESEncryption",
                        "WPAAuthenticationMode": "PSKAuthentication",
                        "IEEE11iEncryptionModes": "AESEncryption",
                        "IEEE11iAuthenticationMode": "PSKAuthentication",
                        "freqBand": "5GHz",
                        "id": "16",
                        "SSIDName": "SSID16"
                    }
                ]
            }
        },
        "lanHostsList": {
            "connectedDeviceCount": 1
        },
        "appCount": {
            "enabledAppCount": 0,
            "subscriberAppCount": 0
        },
        "app": {
            "protectIQ": {
                "subscribed": false
            },
            "experienceIQ": {
                "subscribed": false
            }
        }
    }
};

export const codeList = [
    "LATENCY_HIGH",
    "VIRUS_ATTACK",
    "CLIENT_DEVICE_LOW_SIGNAL_DETECTED",
    "CLIENT_DEVICE_LOW_EFFICIENCY_SCORE_DETECTED",
    "CLIENT_DEVICE_LOW_PHY_RATE_DETECTED",
    "CLIENT_DEVICE_LEGACY_DEVICE_DETECTED",
    "REBOOT_ISSUE",
    "SOFTWARE_UPGRADE_FAILED",
    "STALE_SOFTWARE_VERSION",
    "GATEWAY_FAILED",
    "WIFI_RADIO_DISABLED_24G",
    "WIFI_RADIO_DISABLED_5G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_24G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_ON_5G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_24G",
    "LOW_CHANNEL_SCORE_WITH_SELFHEAL_OFF_5G",
    "BACKHAUL_TOO_CLOSE",
    "BACKHAUL_TOO_FAR",
    "MESH_DEGRADE",
    "ATTACK_DETECTED",
    "GATEWAY_FAILED",
    "WAP_FAILED",
    "SPEED_LOW_75",
    "SPEED_LOW_75_80",
    "TRAFFIC_HIGH",
    "WIFI_INTERFERENCE_HIGH_24G",
    "WIFI_INTERFERENCE_HIGH_5G",
    "QOS_DAMP_ALERT",
    "DS_SPEED_LOW_85",
    "US_SPEED_LOW_85",
    "DS_SPEED_LOW_75",
    "US_SPEED_LOW_75",
    "SFP_THERMAL_TOO_HIGH",
    "SFP_THERMAL_HIGH",
    "ONT_OFFLINE",
    "GC_MAX_DOWNSTREAM_ACHIEVED",
    "GC_MAX_UPSTREAM_ACHIEVED",
    "WFH_SSID_WITHOUT_CIQ",
    "MAP_CONNECTIVITY_FAILED",
    "WIFI_RADIO_DISABLED_6G",
    "THERMAL_HIGH",
    "THERMAL_TOO_HIGH",
    "UI_CREATED_ISSUE_FOR_TR069MAPDOWN",
    "NOT_CERTIFIED_AND_SFP_NOT_SUPPORTED",
    "LAN_DISABLED"
];

export const getRegIdInstanceResponse = [
    {
        "_id": "102-B89470-CXNK00FEEEA5",
        "opMode": "RG",
        "opRole": "Controller",
        "bSmbMode": false,
        "ipAddress": "172.16.1.141",
        "modelName": "GS2037E",
        "createTime": "2022-07-01T17:36:16.892Z",
        "macAddress": "b8:94:70:23:0f:a3",
        "subnetMask": "255.255.255.0",
        "stunEnabled": true,
        "lastBootTime": "2022-12-09T21:35:22.707Z",
        "manufacturer": "Calix",
        "productClass": "GigaSpire",
        "serialNumber": "CXNK00FEEEA5",
        "changeCounter": 26,
        "dataModelName": "tr098",
        "wanAccessType": "CopperEthernet",
        "defaultGateway": "172.16.1.1",
        "ipV6SitePrefix": null,
        "lastInformTime": "2023-01-19T10:33:49.703Z",
        "registrationId": "FEEEA5",
        "timezoneOffset": "-06:00",
        "hardwareVersion": "3000293001",
        "manufacturerOUI": "B89470",
        "softwareVersion": "22.3.0.0.33",
        "provRecordStatus": "Succeeded",
        "STUNServerAddress": "stun-stg.calix.com",
        "secondWanInterface": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1",
        "lastInformEventCodes": "6 CONNECTION REQUEST",
        "periodicInformInterval": 86400,
        "wanSecDCSConnectionPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1",
        "udpConnectionRequestAddr": "47.186.84.22:60018",
        "hardwareSerialNumber": "522204002127",
        "wanConnType": "IPoE"
    }
];

export const callOutcomeStatuses = [
    {
        "uuid": null,
        "orgId": 102,
        "name": "Account Inquiry",
        "statusType": "-",
        "ctime": "2023-01-20T11:03:33.000+0000",
        "mtime": "2023-01-20T11:03:33.000+0000",
        "selection": "single",
        "categories": {
            "Customer on Phone": {
                "subcategories": null,
                "selection": null
            },
            "Customer in-person": {
                "subcategories": null,
                "selection": null
            },
            "Customer not present": {
                "subcategories": null,
                "selection": null
            },
            "Call center escalation": {
                "subcategories": null,
                "selection": null
            }
        }
    },
    {
        "uuid": null,
        "orgId": 102,
        "name": "Escalated",
        "statusType": "ESCLTD",
        "ctime": "2023-01-20T11:03:33.000+0000",
        "mtime": "2023-01-20T11:03:33.000+0000",
        "selection": "single",
        "categories": null
    },
    {
        "uuid": "7bb0857e-2afb-4e07-8e50-e976f1b940e5",
        "orgId": 102,
        "name": "Forgot Password",
        "statusType": "-",
        "ctime": "2022-05-05T15:33:42.000+0000",
        "mtime": "2022-05-05T15:33:59.000+0000",
        "selection": "multiple",
        "categories": {
            "User issue": {
                "subcategories": [
                    "Password Changed not document",
                    "Password Changed lost document"
                ],
                "selection": "multiple"
            }
        }
    },
    {
        "uuid": "a69d6de0-905d-46da-b73a-8edfbb5177c4",
        "orgId": 102,
        "name": "Customer Angry",
        "statusType": "-",
        "ctime": "2021-07-15T16:01:23.000+0000",
        "mtime": "2021-07-15T18:45:14.000+0000",
        "selection": "multiple",
        "categories": {
            "Avengers Level Anger": {
                "subcategories": [
                    "Hulk Smash!",
                    "Cap Dropping F-Bombs Level Anger",
                    "Sore Muscles and Gout",
                    "Iron Man Losing SuperBot"
                ],
                "selection": "multiple"
            },
            "Henry Pym Level Anger": {
                "subcategories": [
                    "Ant Man Level Anger"
                ],
                "selection": "multiple"
            },
            "Scarlet Witch Level Anger": {
                "subcategories": [
                    "Dead Husband",
                    "Dead Children",
                    "No More Mutants!"
                ],
                "selection": "multiple"
            }
        }
    },
    {
        "uuid": null,
        "orgId": 102,
        "name": "Resolved",
        "statusType": "-",
        "ctime": "2023-01-20T11:03:33.000+0000",
        "mtime": "2023-01-20T11:03:33.000+0000",
        "selection": "multiple",
        "categories": {
            "IT": {
                "subcategories": [
                    "PC/laptop issue",
                    "3rd party software issue",
                    "Email setup/issue"
                ],
                "selection": "multiple"
            },
            "WAN": {
                "subcategories": [
                    "No speed",
                    "Poor speeds",
                    "WAN saturation"
                ],
                "selection": "multiple"
            },
            "Other": {
                "subcategories": [
                    "Unknown"
                ],
                "selection": "multiple"
            },
            "Wi-Fi": {
                "subcategories": [
                    "Wi-Fi interference",
                    "SSID/password issue",
                    "Wi-Fi coverage"
                ],
                "selection": "multiple"
            },
            "Gateway": {
                "subcategories": [
                    "Upgrade",
                    "Replacement",
                    "Reboot",
                    "Gateway offline",
                    "Gateway ethernet cable"
                ],
                "selection": "multiple"
            },
            "Hardware": {
                "subcategories": [
                    "Faulty device",
                    "End of life device",
                    "Mesh unit unresponsive",
                    "Inside wire issue",
                    "OSS/BSS programming issue",
                    "STB unresponsive"
                ],
                "selection": "multiple"
            },
            "Education": {
                "subcategories": [
                    "Internet education",
                    "CommandIQ education",
                    "IPTV education"
                ],
                "selection": "multiple"
            },
            "Client Devices": {
                "subcategories": [
                    "Legacy device",
                    "Low PHY rate",
                    "Low signal strength",
                    "Low SNR"
                ],
                "selection": "multiple"
            }
        }
    },
    {
        "uuid": "428e8835-4421-4e83-95c1-99f5bb01ba0b",
        "orgId": 102,
        "name": "Well, this is all you get (one Option, No Category)",
        "statusType": "-",
        "ctime": "2021-07-15T15:56:35.000+0000",
        "mtime": "2021-07-15T15:56:35.000+0000",
        "selection": "single",
        "categories": {
        }
    },
    {
        "uuid": "c2fbe4e2-7e88-48dc-9904-9d35153a2fae",
        "orgId": 102,
        "name": "Still In Work",
        "statusType": "-",
        "ctime": "2021-07-15T15:55:33.000+0000",
        "mtime": "2021-07-15T15:55:33.000+0000",
        "selection": "single",
        "categories": {
            "Nobody Cares": {
                "subcategories": null,
                "selection": "single"
            },
            "Smoke Everywhere": {
                "subcategories": null,
                "selection": "single"
            },
            "Customer Can't Reproduce": {
                "subcategories": null,
                "selection": "single"
            }
        }
    },
    {
        "uuid": "d4544312-55cc-4a8e-bf87-33a4debcc402",
        "orgId": 102,
        "name": "Truck Roll",
        "statusType": "T_ROLL",
        "ctime": "2021-09-29T06:05:44.000+0000",
        "mtime": "2022-04-13T17:20:57.000+0000",
        "selection": "single",
        "categories": {
            "Hardware issue": {
                "subcategories": null,
                "selection": "single"
            },
            "User-owned equipment": {
                "subcategories": null,
                "selection": "single"
            }
        }
    },
    {
        "uuid": "f3687e7f-b463-4ec0-8579-dbdab9087be5",
        "orgId": 102,
        "name": "Other",
        "statusType": "-",
        "ctime": "2022-02-10T20:35:07.000+0000",
        "mtime": "2022-02-10T20:35:07.000+0000",
        "selection": "single",
        "categories": {
        }
    }
];

export const deviceDetailsResponse = [
    {
        "HostName": "amazon-594464d68",
        "MACAddress": "08:7c:39:30:71:e5",
        "IPAddress": "192.168.51.119",
        "Connection": "5GHz",
        "AccessPoint": "RG GS2037E",
        "SSID": "MN4UH",
        "Mode": "11ac",
        "Signal-strength": -41,
        "DS-packet-drops": 0,
        "SNR": 52,
        "Airtime-usage": 0,
        "DS-phy-rate": 433300,
        "US-phy-rate": 433300,
        "DS-retx-packets": 3,
        "Status": "online",
        "Address-source": "dhcp",
        "Model": "Echo Show 8",
        "Manufacture": "Amazon",
        "Code-version": "Linux",
        "Lease-time-expiry": 1674479334000,
        "Connection-type": "WiFi",
        "Band": "5",
        "Channel-number": 100,
        "RX-bandwidth-usage": 11.88,
        "TX-bandwidth-usage": 1.97,
        "Client-efficiency-score": 1,
        "TX-bytes": 19906,
        "RX-bytes": 40257,
        "AccessPointSerialNumber": "CXNK00FEEEA5",
        "AccessPointHostName": "Office Router",
        "Client-type": 4
    },
    {
        "HostName": "Living Room TV",
        "MACAddress": "2c:64:1f:24:f7:16",
        "IPAddress": "192.168.51.182",
        "Connection": "5GHz",
        "AccessPoint": "",
        "SSID": "MN4UH",
        "Mode": "11ac",
        "Signal-strength": -56,
        "DS-packet-drops": 0,
        "SNR": 37,
        "Airtime-usage": 0,
        "DS-phy-rate": 780000,
        "US-phy-rate": 6000,
        "DS-retx-packets": 0,
        "Status": "online",
        "Address-source": "static",
        "Model": "OLED65-H1 65 Class 4K HDR Smart TV",
        "Manufacture": "VIZIO",
        "Code-version": "Linux",
        "Lease-time-expiry": 0,
        "Connection-type": "WiFi",
        "Band": "5",
        "Channel-number": 100,
        "RX-bandwidth-usage": 0,
        "TX-bandwidth-usage": 0,
        "Client-efficiency-score": 0.9,
        "TX-bytes": 0,
        "RX-bytes": 0,
        "AccessPointSerialNumber": "",
        "AccessPointHostName": "",
        "Client-type": 6
    },
    {
        "HostName": "MyQ-8B9",
        "MACAddress": "64:52:99:71:7e:17",
        "IPAddress": "192.168.51.189",
        "Connection": "2.4GHz",
        "AccessPoint": "RG GS2037E",
        "SSID": "MN4UH",
        "Mode": "11n",
        "Signal-strength": -51,
        "DS-packet-drops": 0,
        "SNR": 43,
        "Airtime-usage": 0,
        "DS-phy-rate": 58500,
        "US-phy-rate": 65000,
        "DS-retx-packets": 0,
        "Status": "online",
        "Address-source": "dhcp",
        "Model": "MyQ Smart Home",
        "Manufacture": "Chamberlain",
        "Code-version": "Linux",
        "Lease-time-expiry": 1674479624000,
        "Connection-type": "WiFi",
        "Band": "2.4",
        "Channel-number": 6,
        "RX-bandwidth-usage": 0.11,
        "TX-bandwidth-usage": 0.04,
        "Client-efficiency-score": 0.8141,
        "TX-bytes": 366,
        "RX-bytes": 366,
        "AccessPointSerialNumber": "CXNK00FEEEA5",
        "AccessPointHostName": "Office Router",
        "Client-type": 11
    }
];
export const outageResponeSubscriber = [
    {
        "deviceType": "ONT",
        "criticalcounts": 0,
        "majorCounts": 0,
        "minorCounts": 1,
        "infoCounts": 0,
        "warningCounts": 0,
        "subscriberName": "Eric-GS4220E-Triple-0406",
        "deviceUuid": "606aea46-112e-40af-9275-e2200f50e43b",
        "tenantId": 0,
        "deviceModel": "GP1000G",
        "deviceLocation": {
            "networkgroup_name": "E7_AXOS",
            "networkgroup_uuid": "55899efa-c550-4852-9b46-b14ce501b19d"
        },
        "deviceRegion": {
            "region_name": "Eric_AXOS",
            "region_uuid": "cc72c840-5770-4d63-9f99-4766fafaa06f"
        },
        "deviceName": "CXNK005E8C2C",
        "orgId": 12890522,
        "longitude": -87.7417559,
        "latitude": 41.7883503,
        "nonZeroSev": "MINOR",
        "subscriberId": "321239d7-3506-42e6-bfc4-73bed3bf5438",
        "fsan_serialnumber": "CXNK005E8C2C",
        "outage": false,
        "outageAlarmName": null,
        "outageAlarmId": null,
        "outageAlarmRaisedTime": 0
    }
];