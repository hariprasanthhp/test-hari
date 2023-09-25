export const calloutcomeData: any =
    [
        {
            "uuid": "dc120474-df4b-4864-98ff-c2bbfb3143e6",
            "orgId": 470053,
            "name": "Account Inquiry",
            "ctime": "2021-10-04T11:35:27.000+0000",
            "mtime": "2022-09-16T15:50:53.000+0000",
            "selection": "single",
            "categories": {
                "Customer on Phone": {
                    "subcategories": null,
                    "selection": "single"
                },
                "Customer in-person": {
                    "subcategories": null,
                    "selection": "single"
                },
                "Customer not present": {
                    "subcategories": null,
                    "selection": "single"
                },
                "Call center escalation": {
                    "subcategories": null,
                    "selection": "single"
                }
            }
        },
        {
            "uuid": "24d8a95f-7e0d-4958-ba8f-cec6b202b0c8",
            "orgId": 470053,
            "name": "Test",
            "ctime": "2022-04-14T07:46:30.000+0000",
            "mtime": "2022-04-14T07:46:30.000+0000",
            "selection": "multiple",
            "categories": {
                "test": {
                    "subcategories": [
                        "gddgd",
                        "jdjhsdjh"
                    ],
                    "selection": "multiple"
                },
                "test4": {
                    "subcategories": [
                        "ghsghghsgh"
                    ],
                    "selection": "multiple"
                }
            }
        },
    ]
export const saveCalloutcomeData: any = {
    "orgId": 470053,
    "csrId": "7075058",
    "csrName": "test@calix.com",
    "categories": {
        "Customer on Phone": []
    },
    "callType": "Inbound",
    "status": "Account Inquiry",
    "subscriberId": "4302265e-bbd4-49a5-84a4-f8c41a41c1c5",
    "subscriberName": "Kevin-GS2037E2",
    "callStartTime": "2022-10-07T07:04:04.236Z",
    "callEndTime": "2022-10-07T10:04:43.402Z",
    "subscriberAccount": "Kevin-GS2037E2",
    "note": "",
    "deviceId": "CXNK00FF9B31",
    "deviceType": "GS2037E",
    "firmwareVersion": "22.3.0.0.33",
    "extref": ""
}

export const callHistoryData = {
    "tickets": [
        {
            "id": 19200,
            "createdDate": "2022-10-11",
            "orgId": 470053,
            "csrId": 8807257576192252000,
            "csrName": "AutomationRegression",
            "subscriberId": "4302265e-bbd4-49a5-84a4-f8c41a41c1c5",
            "subscriberName": "Kevin-GS2037E2",
            "subscriberAccount": "Kevin-GS2037E2",
            "status": "Account Inquiry",
            "rootcause": "Customer on Phone",
            "subRootcause": null,
            "deviceId": "CXNK00FF9B31",
            "deviceType": "GS2037E",
            "firmwareVersion": "22.3.0.0.33",
            "callStartTime": "2022-10-11T06:11:28.288+0000",
            "callEndTime": "2022-10-11T07:13:37.866+0000",
            "callType": "Inbound",
            "note": "Testing",
            "extref": "",
            "ctime": "2022-10-11T07:13:38.210+0000",
            "mtime": "2022-10-11T07:13:38.210+0000",
            "categories": {
                "Customer on Phone": []
            }
        },
        {
            "id": 19169,
            "createdDate": "2022-10-07",
            "orgId": 470053,
            "csrId": 7075058,
            "csrName": "test@calix.com",
            "subscriberId": "4302265e-bbd4-49a5-84a4-f8c41a41c1c5",
            "subscriberName": "Kevin-GS2037E2",
            "subscriberAccount": "Kevin-GS2037E2",
            "status": "Account Inquiry",
            "rootcause": "Customer on Phone",
            "subRootcause": null,
            "deviceId": "CXNK00FF9B31",
            "deviceType": "GS2037E",
            "firmwareVersion": "22.3.0.0.33",
            "callStartTime": "2022-10-07T07:04:04.236+0000",
            "callEndTime": "2022-10-07T10:04:43.402+0000",
            "callType": "Inbound",
            "note": "",
            "extref": "",
            "ctime": "2022-10-07T10:04:47.042+0000",
            "mtime": "2022-10-07T10:04:47.042+0000",
            "categories": {
                "Customer on Phone": []
            }
        }
    ],
    "totalPages": 1,
    "totalTickets": 8,
    "currentPage": 0
}

export const subscriberInfo = { "_id": "ececc931-b76b-4951-a068-1612fe4ac31b", "account": "aoh2021", "name": "Augustine Oh (California)", "phone": "+1-206-708-4311", "email": "augustine.oh@calix.com", "serviceAddress": "Arronia Ct, Pleasanton, CA 94588", "subscriberLocationId": "aoh2021", "service": {}, "service-detail": [], "devices": [{ "_id": "470053-487746-CXNK00778D46", "opMode": "RG", "opRole": "Controller", "serialNumber": "CXNK00778D46", "macAddress": "48:77:46:9a:06:9f", "productClass": "GigaSpire", "registrationId": "", "ipAddress": "192.168.1.66", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "ipV6SitePrefix": "", "manufacturer": "Calix", "modelName": "GS4227E", "dataModelName": "tr098", "softwareVersion": "22.3.500.451", "pppUsername": "", "manufacturerOUI": "487746", "hardwareVersion": "3000286703", "lastInformTime": "2022-10-18T14:17:32.148Z" }], "ipAddress": "192.168.1.66", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "pppUsername": "", "commandIQ": { "onboarded": true, "email": "augustine.oh@calix.com", "userId": "b4533952-ac9f-4454-a288-5e7e04a4fa82", "secondaryUsers": [], "fduser": false }, "insights": "N/A", "churnRisk": "N/A", "endpointId": "794efabe-68e6-4a3f-9531-6d5e174b883c", "pastMonthCall": 1 }

export const tileData = { "allIssues": [{ "code": "SOFTWARE_UPGRADE_FAILED", "serialNumber": "CXNK00778D46", "source": "CXNK00778D46", "sourceId": "CXNK00778D46", "type": "ROUTER", "severity": 0, "reason": "Software upgrade failed" }, { "code": "QOS_DAMP_ALERT", "subscriberId": "ececc931-b76b-4951-a068-1612fe4ac31b", "serialNumber": "CXNK00778D46", "source": "CXNK00778D46", "sourceId": "CXNK00778D46", "type": "SERVICE", "severity": 1, "reason": "Qos damp alert" }], "networkStatus": { "lastSpeedTestResult": [{ "id": "22101904533500364146", "ds": null, "dsLevel": 3, "dsTier": 1000, "us": null, "usLevel": 3, "usTier": 1000, "serverHost": "48240", "phyLinkRate": 1000, "hitCpuLimit": 0, "aveDownloadRate": 922.8892380952378, "aveUploadRate": 922.5060952380951, "trigger": "command-iq", "type": "ookla", "createTime": 1666155215000 }], "ssid": { "activeSSIDCount": 5, "data": { "primary-operator-ssid": [{ "Enable": "true", "SSID": "August Home (Stage)", "SSIDAdvertisementEnabled": "true", "BeaconType": "11iandWPA3", "BasicEncryptionModes": "", "BasicAuthenticationMode": "", "WPAEncryptionModes": "AESEncryption", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "AESEncryption", "IEEE11iAuthenticationMode": "SAEandPSKAuthentication", "freqBand": "2.4GHz", "isInL2Bridge": false, "id": "1", "SSIDName": "SSID1", "PRConfig": { "Enable": true, "WPAEncryptionModes": "AESEncryption", "IEEE11iEncryptionModes": "AESEncryption", "prid": "1" } }, { "Enable": "false", "SSID": "OP1", "SSIDAdvertisementEnabled": "true", "BeaconType": "WPA3", "BasicEncryptionModes": "None", "BasicAuthenticationMode": "None", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "IEEE11iAuthenticationMode": "SAEAuthentication", "freqBand": "2.4GHz", "isInL2Bridge": false, "id": "6", "SSIDName": "SSID6", "PRConfig": { "SSID": "OP1", "Enable": "false", "BeaconType": "WPA3", "KeyPassphrase": "2134567897654324", "WPAEncryptionModes": "", "BasicEncryptionModes": "None", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "BasicAuthenticationMode": "None", "SSIDAdvertisementEnabled": "true", "IEEE11iAuthenticationMode": "", "X_CALIX_SXACC_KeyPassphrase": "2134567897654324", "prid": "6" } }, { "Enable": "false", "SSID": "", "SSIDAdvertisementEnabled": "true", "BeaconType": "Basic", "BasicEncryptionModes": "None", "BasicAuthenticationMode": "None", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "IEEE11iAuthenticationMode": "", "freqBand": "2.4GHz", "isInL2Bridge": false, "id": "7", "SSIDName": "SSID7" }, { "Enable": "true", "SSID": "operator 1", "SSIDAdvertisementEnabled": "true", "BeaconType": "WPA3", "BasicEncryptionModes": "None", "BasicAuthenticationMode": "None", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "IEEE11iAuthenticationMode": "SAEAuthentication", "freqBand": "2.4GHz", "isInL2Bridge": false, "id": "8", "SSIDName": "SSID8", "PRConfig": { "SSID": "operator 1", "Enable": true, "BeaconType": "WPA3", "KeyPassphrase": "12345678", "WPAEncryptionModes": "", "BasicEncryptionModes": "None", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "BasicAuthenticationMode": "None", "SSIDAdvertisementEnabled": "true", "IEEE11iAuthenticationMode": "", "X_CALIX_SXACC_KeyPassphrase": "12345678", "prid": "8" } }, { "Enable": "true", "SSID": "August Home (Stage)", "SSIDAdvertisementEnabled": "true", "BeaconType": "11iandWPA3", "BasicEncryptionModes": "", "BasicAuthenticationMode": "", "WPAEncryptionModes": "AESEncryption", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "AESEncryption", "IEEE11iAuthenticationMode": "SAEandPSKAuthentication", "freqBand": "5GHz", "isInL2Bridge": false, "id": "9", "SSIDName": "SSID9", "PRConfig": { "Enable": true, "WPAEncryptionModes": "AESEncryption", "IEEE11iEncryptionModes": "AESEncryption", "prid": "9" } }, { "Enable": "false", "SSID": "5GHz_IPTV_SSID778D46", "SSIDAdvertisementEnabled": "false", "BeaconType": "11i", "BasicEncryptionModes": "", "BasicAuthenticationMode": "", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "AESEncryption", "IEEE11iAuthenticationMode": "PSKAuthentication", "freqBand": "5GHz", "isInL2Bridge": false, "id": "14", "SSIDName": "SSID14" }, { "Enable": "false", "SSID": "", "SSIDAdvertisementEnabled": "true", "BeaconType": "Basic", "BasicEncryptionModes": "None", "BasicAuthenticationMode": "None", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "IEEE11iAuthenticationMode": "", "freqBand": "5GHz", "isInL2Bridge": false, "id": "15", "SSIDName": "SSID15" }, { "Enable": "true", "SSID": "operator 2", "SSIDAdvertisementEnabled": "true", "BeaconType": "11iandWPA3", "BasicEncryptionModes": "None", "BasicAuthenticationMode": "None", "WPAEncryptionModes": "", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "IEEE11iAuthenticationMode": "SAEandPSKAuthentication", "freqBand": "5GHz", "isInL2Bridge": false, "id": "16", "SSIDName": "SSID16", "PRConfig": { "SSID": "operator 2", "Enable": true, "BeaconType": "11iandWPA3", "KeyPassphrase": "12345678", "WPAEncryptionModes": "", "BasicEncryptionModes": "None", "WPAAuthenticationMode": "", "IEEE11iEncryptionModes": "", "BasicAuthenticationMode": "None", "SSIDAdvertisementEnabled": "true", "IEEE11iAuthenticationMode": "", "X_CALIX_SXACC_KeyPassphrase": "12345678", "prid": "16" } }, { "Enable": "true", "SSID": "August Home (Stage)", "SSIDAdvertisementEnabled": "true", "BeaconType": "WPA3", "IEEE11iEncryptionModes": "AESEncryption", "IEEE11iAuthenticationMode": "SAEAuthentication", "freqBand": "6GHz", "isInL2Bridge": false, "id": "17", "SSIDName": "SSID17", "PRConfig": { "Enable": true, "WPAEncryptionModes": "AESEncryption", "IEEE11iEncryptionModes": "AESEncryption", "prid": "17" } }], "availability": { "maxUnifiedAvailable": 4, "maxBand24Available": 4, "maxBand5Available": 4, "maxBand6Available": 4, "smartQosAllowed": false } } }, "lanHostsList": { "connectedDeviceCount": 1 }, "appCount": { "enabledAppCount": 2, "subscriberAppCount": 3 }, "app": { "protectIQ": { "subscribed": true, "enabled": true, "agentConnected": true }, "experienceIQ": { "subscribed": true, "enabled": true, "agentConnected": true }, "arloSmart": { "email": "augustine.oh@calix.com", "userId": "9f9692af-dbbf-4b77-85e4-4ff8fd0ee31c", "2kCameras": -1, "plan": "PARTNER_UNLIMITED" }, "servifyCare": { "email": "augustine.oh@calix.com", "address": "Arronia Ct", "city": "Pleasanton", "state": "California", "postal": "94588", "userId": "dc045a43-7e0f-4108-a23f-1257a6dd2bd9", "planCode": "SERVIFYCAREBRONZE", "planPurchaseDate": "2022-10-11", "firstName": "Augustine", "lastName": "Oh" }, "myCommunityIQ": { "subscriber": { "enable": true, "communities": [{ "micrositeId": "3ab8dee0-7806-470e-adf4-5360e0cc655d" }] }, "passpoint": { "enable": false, "status": { "result": "succeeded", "activate": false, "hotspotConfig": true, "myCommIQ": true } } }, "bark": { "email": "aoh@calix.com", "userId": "4ae87329-4a83-40e6-a1d8-715498da6636", "planCode": "bark_junior" }, "smallBizIQ": { "enable": false, "status": { "result": "succeeded", "smallBizIQ": true } } } } }

export const serviceLimitDataAssign = {
    "lens": [
        {
            "month": "2022-06",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 0,
            "gamingUsage": 0,
            "totalUsage": 0,
            "wifiScore": 0,
            "connectDevicesCount": 0,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 0
        },
        {
            "month": "2022-07",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 0,
            "gamingUsage": 0,
            "totalUsage": 0,
            "wifiScore": 0,
            "connectDevicesCount": 0,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 0
        },
        {
            "month": "2022-08",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 0,
            "gamingUsage": 0,
            "totalUsage": 0,
            "wifiScore": 0,
            "connectDevicesCount": 0,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 0
        },
        {
            "month": "2022-09",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 0,
            "gamingUsage": 0,
            "totalUsage": 0,
            "wifiScore": 0,
            "connectDevicesCount": 0,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 0
        },
        {
            "month": "2022-10",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 44.92,
            "gamingUsage": 15.27,
            "totalUsage": 120,
            "wifiScore": 5,
            "connectDevicesCount": 3,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 18
        },
        {
            "month": "2022-11",
            "speedTest": 0,
            "competitor": 0,
            "streamingUsage": 0,
            "gamingUsage": 0,
            "totalUsage": 0,
            "wifiScore": 0,
            "connectDevicesCount": 0,
            "downstreamServiceLimit": 0,
            "upstreamServiceLimit": 0
        }
    ]
}