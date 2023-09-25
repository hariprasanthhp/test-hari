export const videodetails: any = 
{"orgId":"470053","serialNumber":"CXNK00FF9B45","videoMulticastSystems":{"message":"Device does not support feature VideoMulticastSystems","data":[{"MulticastSubscriber":[{"Tci":"Tci","JoinedTime":5,"SourceIpAddress":"192.168.0.4","GroupIpAddress":"192.168.4.5","ClientIpAddress":"192.168.6.7"}]}]},"wanInfo":{"data":[{"path":"InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.4","bIsData":false,"bIsVoice":false,"bIsVideo":true,"bIsMgmtWan":false,"Name":"IPTV","Enable":"true","Uptime":"715086","bIsV4":true,"bIsV6":false,"ConnectionStatus":"Connected","MACAddress":"b8:94:70:29:96:94","VlanId":"4010","VlanPriority":"0","BytesReceived":"0","BytesSent":"0","PacketsReceived":"0","PacketsSent":"0","AddressingType":"DHCP","ConnectionType":"IP_Bridged","DefaultGateway":"N/A","SubnetMask":"N/A","DNSServers":"N/A","ExternalIPAddress":"N/A","DownstreamRate":"1000","UpstreamRate":"1000","BridgeLANInterface":[]}]}}

export const videodetailsforip: any = 
{"orgId":"470053","serialNumber":"CXNK00FF9B45","videoMulticastSystems":{"message":"Device does not support feature VideoMulticastSystems","data":[{"MulticastSubscriber":[{"Tci":"Tci","JoinedTime":5,"SourceIpAddress":"0","GroupIpAddress":"0","ClientIpAddress":"0"}]}]},"wanInfo":{"data":[{"path":"InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.4","bIsData":false,"bIsVoice":false,"bIsVideo":true,"bIsMgmtWan":false,"Name":"IPTV","Enable":"true","Uptime":"715086","bIsV4":true,"bIsV6":false,"ConnectionStatus":"Connected","MACAddress":"b8:94:70:29:96:94","VlanId":"4010","VlanPriority":"0","BytesReceived":"0","BytesSent":"0","PacketsReceived":"0","PacketsSent":"0","AddressingType":"DHCP","ConnectionType":"IP_Bridged","DefaultGateway":"N/A","SubnetMask":"N/A","DNSServers":"N/A","ExternalIPAddress":"N/A","DownstreamRate":"1000","UpstreamRate":"1000","BridgeLANInterface":[]}]}}

export const videodetailswaninfoempty: any = 
{"orgId":"470053","serialNumber":"CXNK00FF9B45","videoMulticastSystems":{"message":"Device does not support feature VideoMulticastSystems","data":[{"path":"InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.4","bIsData":false,"bIsVoice":false,}]},"wanInfo":{}}

export const videodetailwowaninfo: any = 
{"orgId":"470053","serialNumber":"CXNK00FF9B45","videoMulticastSystems":{"message":"Device does not support feature VideoMulticastSystems","data":[{"path":"InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.4","bIsData":false,"bIsVoice":false,}]},"wanInfo":{"data":[]}}


export const deviceInfo : any =[{"_id":"470053-487746-CXNK00778D46","serialNumber":"CXNK00778D46","macAddress":"48:77:46:9a:06:9f","registrationId":"","ipAddress":"192.168.1.66","modelName":"GS4227E","softwareVersion":"22.3.500.451","opMode":"RG","manufacturer":"Calix","pppUsername":"","secondIpAddress":"2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64","deviceId":"CXNK00778D46","opModeWithOnt":"RG"},{"deviceId":"CXNK00E4F519","serialNumber":"CXNK00E4F519","macAddress":"f8:85:f9:23:01:2a","registrationId":"","ipAddress":"192.168.2.100","modelName":"GM2037","softwareVersion":"21.4.901.151","opMode":"WAP","_id":"470053-F885F9-CXNK00E4F519","manufacturer":"Calix","wapGatewaySn":"CXNK00778D46","opModeWithOnt":"WAP"}]

export const videoapidataerror : any =[{"status":401, "message":"user invalid"}]

export const metaDatarestructure: any = {
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