export const sessionDeviceData = [
    {
        "_id": "470053-487746-CXNK00778D46",
        "serialNumber": "CXNK00778D46",
        "macAddress": "48:77:46:9a:06:9f",
        "registrationId": "",
        "ipAddress": "192.168.1.66",
        "modelName": "GS4227E",
        "softwareVersion": "22.3.500.451",
        "opMode": "RG",
        "manufacturer": "Calix",
        "pppUsername": "",
        "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64",
        "deviceId": "CXNK00778D46",
        "opModeWithOnt": "RG"
    },
    {
        "deviceId": "CXNK00E4F519",
        "serialNumber": "CXNK00E4F519",
        "macAddress": "f8:85:f9:23:01:2a",
        "registrationId": "",
        "ipAddress": "192.168.2.100",
        "modelName": "GM2037",
        "softwareVersion": "21.4.901.151",
        "opMode": "WAP",
        "_id": "470053-F885F9-CXNK00E4F519",
        "manufacturer": "Calix",
        "wapGatewaySn": "CXNK00778D46",
        "opModeWithOnt": "WAP"
    }
]
export const sessionsubscriber = {
    "systemId": "CXNK00923490",
    "status": "Active",
    "modelName": "GS4220E",
    "edgeSuites": {
      "protectIQ": {
        "subscribed": true,
        "install": true,
        "enabled": true,
        "agentConnected": true,
        "agentEnabled": true
      },
      "experienceIQ": {
        "subscribed": true,
        "install": true,
        "enabled": true,
        "agentConnected": true,
        "agentEnabled": true
      },
      "arloSmart": {
        "email": "Ahamed@calix.com",
        "userId": "6931757e-402a-4e06-bcdf-49115c84397c",
        "2kCameras": -1,
        "plan": "PARTNER_UNLIMITED_PLUS"
      },
      "servifyCare": {
        "email": "Ahammed@calix.com",
        "address": "Ashok Nager",
        "city": "california",
        "state": "California",
        "postal": "67666",
        "userId": "5f1a28c2-e95f-42de-ae56-9c338574e238",
        "planCode": "SERVIFYCARESILVER",
        "planPurchaseDate": "2023-06-28",
        "firstName": "Ahammed",
        "lastName": "A"
      },
      "myCommunityIQ": {
        "subscriber": {
          "enable": true,
          "communities": [
            {
              "micrositeId": "c859b213-7d07-4053-9f54-e077a0cadc51",
              "elevenSubId": "WFLxryrAvZY+dgpdO29cR"
            },
            {
              "micrositeId": "a84f9f9d-1cf0-4945-a3db-88ac05aebb16",
              "elevenSubId": ".C4SRS38fdC+jr4d3lnIM"
            }
          ]
        },
        "passpoint": {
          "enable": true,
          "communities": [
            {
              "micrositeId": "f79a354c-ce1f-4f35-a5c4-89ce63bca72d",
              "communityName": "2121",
              "restrictions": "None",
              "pid": "649c07bdf3395c359732f46f"
            },
            {
              "micrositeId": "cd811ec9-a228-45d0-96aa-c27ce916eae9",
              "communityName": "3533",
              "restrictions": "None",
              "pid": "649c07bdf3395c359732f46f"
            }
          ],
          "network": {
            "type": "Bridge",
            "vlanId": 123
          },
          "prioritizeTraffic": true,
          "status": {
            "result": "succeeded",
            "activate": true,
            "hotspotConfig": true,
            "myCommIQ": true,
            "restrictionApplied": true,
            "policyApplied": true
          }
        },
        "eduroam": {
          "enable": true,
          "secret": "1234",
          "primaryServer": "1.2.3.4",
          "secondaryServer": "4.3.2.1",
          "status": {
            "result": "succeeded",
            "activate": true,
            "hotspotConfig": true,
            "myCommIQ": true
          }
        },
        "network": {
          "type": "Bridge",
          "vlanId": 123
        },
        "prioritizeTraffic": true
      },
      "bark": {
        "email": "Ahamed@calix.com",
        "userId": "d6250a2f-c9a5-411a-9ad0-deb5b070c52e",
        "planCode": "bark_premium"
      },
      "smallBizIQ": {
        "enable": true,
        "status": {
          "result": "succeeded",
          "smallBizIQ": true
        }
      }
    },
    "rgService": {
      "data": {
        "Enable": true,
        "pppoe": {
          "Username": "Ahamed",
          "Password": "12345678"
        }
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
      "video": {
        "Enable": false
      }
    },
    "subscriber": {
      "subscriberId": "26d31774-9e69-45b6-ac4c-7c6b8950c558",
      "subscriberLocationId": "New Chennai",
      "account": "Ahamed",
      "name": "Ahamed",
      "phone": "+917418949135",
      "email": "Ahamed@calix.com",
      "serviceAddress": "Ashok Nager"
    }
  }
export const device_status = {
    status: {
        agentConnected: true,
        installed: true,
        needUpgrade: false
    }
}
export const onboarded_res = {
    onboarded: true,
    email: "augustine.oh@calix.com",
    userId: "b4533952-ac9f-4454-a288-5e7e04a4fa82",
    secondaryUsers: [],
    fduser: false
}
export const notification_res = {
    active_since: 1294,
    last_updated: "2022-10-25T02:43:36Z",
    packet_analyzed_today: 9856,
    virus_detected: 0,
    intrusions: 0,
    web_based_threats: 0
}
export const availability_res = {
    securityByPass: true,
    timeLimit: true,
    psd: true,
    safeSearch: true,
    youtubeRestriction: true,
    basicPCTimeLimits: true,
    proofService: true,
    qosService: true,
    ledDimming: true,
    ledOnOff: true,
    wps: true,
    satellite: true,
    passiveVPN: true,
    splitSsid: true,
    speedtestByCountry: true,
    defaultRestriction: true,
    wifi6: true,
    bwShapingOn: false,
    passpoint: true,
    DoH: true,
    icloudrelay: true,
    sfpModule: true
}
export const service_enable_disable = {
    "estimatedDelay": 6
}
export const subscriberStructure = {
    "_id": "92b54dc4-1191-49b8-b14a-0a4db0327a22",
    "account": "",
    "name": "123abcd",
    "phone": "",
    "email": "",
    "serviceAddress": "",
    "subscriberLocationId": "123abcd",
    "service": {},
    "service-detail": [],
    "devices": [
        {
            "_id": "470053-D0768F-CXNK008A7961",
            "opMode": "RG",
            "opRole": "Controller",
            "serialNumber": "CXNK008A7961",
            "macAddress": "d0:76:8f:42:50:b9",
            "productClass": "GigaSpire",
            "registrationId": "",
            "ipAddress": "10.245.53.79",
            "secondIpAddress": "240e:6a0:37:0:1010:2020:80bd:6bfd/128",
            "ipV6SitePrefix": "240e:6a0:37:3::/64",
            "manufacturer": "Calix",
            "modelName": "GS4227E",
            "dataModelName": "tr098",
            "softwareVersion": "22.4.500.346",
            "manufacturerOUI": "D0768F",
            "hardwareVersion": "3000286712",
            "lastInformTime": "2022-10-18T09:49:47.061Z"
        }
    ],
    "ipAddress": "10.245.53.79",
    "secondIpAddress": "240e:6a0:37:0:1010:2020:80bd:6bfd/128",
    "commandIQ": {
        "onboarded": false,
        "email": "",
        "userId": "2a722ff3-7fd3-4873-a3f9-4999ae94ab63",
        "secondaryUsers": [],
        "fduser": false
    },
    "insights": "N/A",
    "churnRisk": "N/A",
    "endpointId": "7c23afd5-277b-4e2a-9d28-5ec69cdc4ac0",
    "pastMonthCall": 0,
    "ipInfo": {
        "pppUsername": [
            null
        ],
        "ipAddress": [
            "10.245.53.79"
        ],
        "secondIpAddress": [
            "240e:6a0:37:0:1010:2020:80bd:6bfd/128"
        ]
    }
}
export const alert_res: any = {
    "total": 16,
    "unreadCount": 16,
    "datas": [
        {
            "notifId": "f6b1af60-a8bf-46a4-bd45-f86a9152e74b",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "58.220.59.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "i0.letvimg.com"
            },
            "isRead": false,
            "timestamp": 1666771008622
        },
        {
            "notifId": "aef83db1-9209-4c0d-88fb-7d78597108ed",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "121.226.246.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "sdk-m.le.com"
            },
            "isRead": false,
            "timestamp": 1666766230417
        },
        {
            "notifId": "5dee84b9-5214-4dc4-8b5f-3102729161aa",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "58.220.59.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "sdk-m.le.com"
            },
            "isRead": false,
            "timestamp": 1666765612132
        },
        {
            "notifId": "593b6a3c-eb39-4054-9ab6-c7f5a2ae42d9",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017913408",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/res/r/image/2021-3-5/baidulogo.png"
            },
            "isRead": false,
            "timestamp": 1666684187752
        },
        {
            "notifId": "7c3fe61b-8c52-43d8-a687-dd95b739a43c",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017913382",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc1.hao123img.com/res/r/image/2017-07-10/16c593b3396fd2ed58ce6851ff76b2d0.png"
            },
            "isRead": false,
            "timestamp": 1666684187500
        },
        {
            "notifId": "5ad59354-2ec7-48fe-afef-486245db27b2",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "240e:06a0:0037:062f:dcee:3495:c1f4:be32",
                "signatureId": "5020017912027",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/data/b7cf14241b120edffe1e65c79e4d48c5"
            },
            "isRead": false,
            "timestamp": 1666682008114
        },
        {
            "notifId": "cc69ba9d-f8e3-4d9b-b6af-dd31f2b201e9",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "240e:06a0:0037:062f:dcee:3495:c1f4:be32",
                "signatureId": "5020017912027",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/data/b7cf14241b120edffe1e65c79e4d48c5"
            },
            "isRead": false,
            "timestamp": 1666679631052
        },
        {
            "notifId": "bb9f4078-2960-49bc-87a8-e1bacdfc209a",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "58.220.59.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "sdk-m.le.com"
            },
            "isRead": false,
            "timestamp": 1666676797793
        },
        {
            "notifId": "d263bd94-8616-47a5-a06d-f2c937e45742",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "58.220.59.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "sdk-m.le.com"
            },
            "isRead": false,
            "timestamp": 1666595078222
        },
        {
            "notifId": "63788760-86c4-4b03-b752-1be7f2487f9a",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "121.226.246.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "i3.letvimg.com"
            },
            "isRead": false,
            "timestamp": 1666589112517
        },
        {
            "notifId": "fd127bab-096e-4b1b-a2ce-3fe5515b3942",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017912027",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/data/b7cf14241b120edffe1e65c79e4d48c5"
            },
            "isRead": false,
            "timestamp": 1666504876374
        },
        {
            "notifId": "85309676-2ed7-4b9f-8c72-d0a34ef99328",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017913382",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc1.hao123img.com/res/r/image/2017-07-10/16c593b3396fd2ed58ce6851ff76b2d0.png"
            },
            "isRead": false,
            "timestamp": 1666503489698
        },
        {
            "notifId": "206b98ce-731e-4f5c-9979-b8b847081b81",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017913408",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/res/r/image/2021-3-5/baidulogo.png"
            },
            "isRead": false,
            "timestamp": 1666503483687
        },
        {
            "notifId": "138d1b9b-6be0-41ef-a20f-f3d308283c01",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "58.220.59.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "sdk-m.le.com"
            },
            "isRead": false,
            "timestamp": 1666503111521
        },
        {
            "notifId": "96902e34-b740-42eb-83f9-a73d27df5135",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "WG",
                "targetStaName": "nanw-ontuser-99",
                "sourceIp": "240e:06a0:0037:062f:cc35:af0c:3ac1:5141",
                "signatureId": "5020017933125",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "",
                "file": "",
                "url": "sc0.hao123img.com/res/weather/v3/a0.png"
            },
            "isRead": false,
            "timestamp": 1666424152546
        },
        {
            "notifId": "841176bb-ece1-419a-83b2-aa65ebc0a5b7",
            "type": "SECURITY_ALARM",
            "securityAlarm": {
                "type": "IPS",
                "targetStaName": "nanw-ontuser104",
                "sourceIp": "121.226.246.3",
                "signatureId": "8101859115",
                "action": "BLOCK",
                "profileNmae": "",
                "message": "IE userdata behavior memory corruption",
                "file": "",
                "url": "i0.letvimg.com"
            },
            "isRead": false,
            "timestamp": 1666416504944
        }
    ]
}
export const trusted_list_res: any = {
    "whitelist": [{ "signatureId": "1020000010120", "msg": "malware.wicar.org/data/ms14_064_ole_xp.html", "type": "WG", "created": 1666858177913 }]
}
export const skipped_device_res = {
    "0": [
        {
            "mac": "68:63:59:03:8c:f1",
            "deviceId": "441a1ee9-ad8a-4f3b-a3b6-2fdfb1f49377",
            "os": "",
            "type": 0,
            "skip": false
        }
    ],
    "2": [
        {
            "mac": "00:50:56:9e:99:81",
            "deviceId": "14055e1e-639a-4e45-97fd-dbf4037a5d38",
            "name": "nancafe3-reautoarf-42",
            "os": "Linux",
            "type": 2,
            "skip": false
        },
        {
            "mac": "00:50:56:9e:ba:57",
            "deviceId": "0ee22806-8778-48d6-90e1-7db772b7f932",
            "name": "nanw-ontuser-71",
            "os": "Windows",
            "type": 2,
            "skip": false
        },
        {
            "mac": "00:50:56:9e:59:f1",
            "deviceId": "f46bd694-f725-4534-b9a2-3485709f1152",
            "name": "nanw-ontuser-72",
            "os": "Windows",
            "type": 2,
            "skip": false
        },
        {
            "mac": "00:50:56:9e:68:27",
            "deviceId": "b90d10d4-c982-46db-9fa5-e5e9b0d36396",
            "name": "nanw-ontuser-68",
            "os": "Windows",
            "type": 2,
            "skip": false
        }
    ]
}
export const security_setting_res = {
    routerMac: "48:77:46:9a:06:9f",
    securitySettings: {
        count: 2,
        data: [
            {
                type: 1,
                name: "PA",
                enabled: true
            },
            {
                type: 2,
                name: "PSD",
                enabled: true
            }
        ]
    }
}

export const newData = {
    onboarded: true,
    email: "hulk2_topo7@calix.com",
    userId: "8e0333df-2e07-4892-ae35-86b281b8847e",
    secondaryUsers: [],
    fduser: false
}
export const ssidPool = {
    "primary-operator-ssid": [],
    "secondary-ssid": [
        {
            "eventId": "6e3fcf10-0e70-48eb-812c-8ea1023e12e5",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_24G_2",
            "encryptionType": 5,
            "type": 4,
            "isolated": true,
            "smartQos": true,
            "band24": true,
            "band5": false,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "25a979f9-d46c-4b1e-b418-bdc98bad1a6f",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_24G_4",
            "encryptionType": 5,
            "type": 4,
            "isolated": true,
            "smartQos": true,
            "band24": true,
            "band5": false,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "6f0aeea7-07ae-47c9-aa20-3cd22afea2a7",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_24G_1",
            "encryptionType": 5,
            "type": 4,
            "isolated": true,
            "smartQos": true,
            "band24": true,
            "band5": false,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "0b9e5c92-b803-409f-94f8-e7ef83443a5b",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_5G_2",
            "encryptionType": 5,
            "type": 5,
            "isolated": true,
            "smartQos": true,
            "band24": false,
            "band5": true,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "46ba17eb-1afd-4de4-8766-6d14b5eb522d",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_5G_4",
            "encryptionType": 5,
            "type": 5,
            "isolated": true,
            "smartQos": true,
            "band24": false,
            "band5": true,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "08fa3915-b03c-484c-ad4f-0a6816ff840b",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_24G_3",
            "encryptionType": 5,
            "type": 4,
            "isolated": true,
            "smartQos": true,
            "band24": true,
            "band5": false,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "e43aad86-5ea4-4610-b686-9b8d02161b94",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_5G_3",
            "encryptionType": 5,
            "type": 5,
            "isolated": true,
            "smartQos": true,
            "band24": false,
            "band5": true,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        },
        {
            "eventId": "9909c352-b7b9-4fb8-b5d3-d40fb857ea96",
            "eventName": "",
            "isIndefinite": true,
            "duration": {
                "startTime": 0,
                "endTime": 0
            },
            "ssid": "ak_karlin_second_5G_1",
            "encryptionType": 5,
            "type": 5,
            "isolated": true,
            "smartQos": true,
            "band24": false,
            "band5": true,
            "band6": false,
            "impaired": false,
            "isMapSecondaySSID": true
        }
    ],
    "availability": {
        "maxUnifiedAvailable": 0,
        "maxBand24Available": 0,
        "maxBand5Available": 0,
        "maxBand6Available": 0,
        "smartQosAllowed": true
    }
}

export const availablityInfo = {
    "showSkippedDevice": true,
    "showSecuritySetting": true,
    "showDetail": true,
    "deviceInfo": "CXNK00923490",
    "undiscoveredGS": false,
    "subscriberStructure": {
        "_id": "26d31774-9e69-45b6-ac4c-7c6b8950c558",
        "account": "Raj",
        "name": "Raj",
        "phone": "5456789",
        "email": "Raj@calix.com",
        "serviceAddress": "Salem",
        "subscriberLocationId": "Salem city",
        "service": {},
        "service-detail": [],
        "devices": [
            {
                "_id": "470053-D0768F-CXNK00923490",
                "opMode": "RG",
                "opRole": "Controller",
                "bSmbMode": true,
                "serialNumber": "CXNK00923490",
                "macAddress": "d0:76:8f:8f:bc:32",
                "productClass": "GigaSpire",
                "registrationId": "",
                "ipAddress": "192.168.2.90",
                "manufacturer": "Calix",
                "modelName": "GS4220E",
                "dataModelName": "tr098",
                "softwareVersion": "23.3.500.368",
                "manufacturerOUI": "D0768F",
                "hardwareVersion": "3000286511",
                "hardwareSerialNumber": "422010134834",
                "lastInformTime": "2023-06-27T10:31:35.643Z"
            }
        ],
        "ipAddress": "192.168.2.90",
        "commandIQ": {
            "onboarded": true,
            "email": "raj@calix.com",
            "userId": "4cf701be-2197-49c9-85df-8ef611843da0",
            "secondaryUsers": [],
            "referrer": "SMBIQ",
            "fduser": false
        },
        "insights": "N/A",
        "churnRisk": "N/A",
        "endpointIdName": "CXNK00923490",
        "pastMonthCall": 29,
        "isSmbOnboarded": true,
        "ipInfo": {
            "pppUsername": [
                null
            ],
            "ipAddress": [
                "192.168.2.90"
            ],
            "secondIpAddress": [
                null
            ]
        }
    },
    "scopeFlag": {
        "experienceiq": true,
        "protectiq": true,
        "configRead": true,
        "configWrite": true,
        "enableRead": true,
        "enableWrite": true
    },
    "hasSubscriber": true
}

export const statusRes = {
    "status": {
      "agentConnected": true,
      "installed": true,
      "needUpgrade": false,
      "agentEnabled": true
    },
    "referrer": [
      "residential",
      "smarttown/passpoint",
      "smarttown/eduroam",
      "smb"
    ]
  }