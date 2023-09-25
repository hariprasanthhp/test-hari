export const subscriber_data = {
    metadata: { totalHits: 2 },
    records: [
        {
            account: "cxnk09092021 acc",
            devices: [{ deviceId: "8765434567" }],
            email: "cxnk09092021@gmail.com",
            name: "cxnk09092021 name",
            orgId: "470053",
            phone: "9876543216",
            serviceAddress: "cxnk09092021 addres",
            subscriberId: "f19201ab-4782-4922-9e5c-75e02c14d40f",
            subscriberLocationId: "cxnk09092021a loc"
        },
        {
            account: "st1510fBulkxc",
            devices: [{ deviceId: "CXNK7326323" }, { deviceId: "CXNk7327" }],
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

export const add_subscriber_data = {
    deviceId: "sometesting",
    isNeedAssociateDeviceToSubscriber: true,
    provisioningRecord: {
        deviceId: "sometesting",
        modelName: "GS4227E",
        opMode: "RG",
        orgId: "12890622",
        subscriberId: "ff10682e-23fc-4f57-8d0d-1cab7e6a1d81",
        wifi: {
            X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID: { Enable: true },
            X_CALIX_SXACC_PRIMARY_5GHZ_SSID: { Enable: true },
            X_CALIX_SXACC_PRIMARY_6GHZ_SSID: { Enable: true }
        }
    },
    subscriber: {
        account: "Passpoint_Jing03",
        email: "lijingarlo03@163.com",
        name: "Passpoint_Jing03",
        subscriberLocationId: "998765479",
        _id: "ff10682e-23fc-4f57-8d0d-1cab7e6a1d81"
    }
}

export const add_system = {
    account: "dg-844e",
    devices: [],
    email: "",
    name: "dg-844e",
    orgId: "470053",
    phone: "",
    serviceAddress: "",
    subscriberId: "fdc3f52f-9ef7-4c19-9130-ca1d562c7670",
    subscriberLocationId: "dg-844e"
}

export const subscriber = {
    account: "dg-844e",
    devices: [{
        deviceId: "CXNK00207C99",
        ipAddress: "10.245.53.68",
        macAddress: "ec:4f:82:11:8f:8a",
        manufacturer: "Calix",
        modelName: "844E-2",
        opMode: "RG",
        opModeWithOnt: "RG",
        registrationId: "",
        serialNumber: "CXNK00207C99",
        softwareVersion: "12.2.13.0.19",
        _id: "470053-EC4F82-CXNK00207C99"
    }],
    email: "",
    name: "dg-844e",
    orgId: "470053",
    phone: "",
    serviceAddress: "",
    subscriberId: "fdc3f52f-9ef7-4c19-9130-ca1d562c7670",
    subscriberLocationId: "dg-844e"
}

export const add_subscriber = {
    "subscriberLocationId": "12345678765",
    "account": "test1123",
    "name": "test1123",
    "phone": "",
    "email": "",
    "serviceAddress": "",
    "lat": 0,
    "lon": 0,
    "orgId": "470053",
    "source": "GUI",
    "_id": "149f0140-b26a-4789-bd42-9253cac4f603",
    "hubbLocationId": "",
    "fccSubscriberId": ""
}

export const edit_subscriber = {
    account: "dg-844e",
    devices: ["CXNK00207C99"],
    email: "",
    name: "dg-844e",
    phone: "",
    serviceAddress: "",
    services: [],
    subscriberLocationId: "dg-844e",
    _id: "fdc3f52f-9ef7-4c19-9130-ca1d562c7670"
}

export const edit_pr_data = {
    deviceId: "CXNK00207C99",
    modelName: "844E-2",
    opMode: "RG",
    orgId: "470053",
    staticGroupMember: [],
    subscriberId: "fdc3f52f-9ef7-4c19-9130-ca1d562c7670",
    wifi: {
        9: { Enable: true, WPAEncryptionModes: 'AESEncryption', IEEE11iEncryptionModes: 'AESEncryption' },
        X_CALIX_SXACC_5GHZ_SSID_1: { Enable: true, WPAEncryptionModes: 'AESEncryption', IEEE11iEncryptionModes: 'AESEncryption' },
        X_CALIX_SXACC_PRIMARY_5GHZ_SSID: { Enable: true, WPAEncryptionModes: 'AESEncryption', IEEE11iEncryptionModes: 'AESEncryption' }

    },
    _id: "34f83088-c7a7-45ad-9708-9f292aaf7705"
}

export const edit_dInfo_data = {
    deviceId: "CXNK00207C99",
    modelName: "844E-2",
    opMode: "RG",
    opModeWithOnt: "RG",
    orgId: "470053",
    staticGroupMember: [],
    subscriberId: "fdc3f52f-9ef7-4c19-9130-ca1d562c7670",
    wifi: {}
}

export const delete_device = {
    deviceId: "CXNK00207C99",
    ipAddress: "10.245.53.68",
    macAddress: "ec:4f:82:11:8f:8a",
    manufacturer: "Calix",
    modelName: "844E-2",
    opMode: "RG",
    opModeWithOnt: "RG",
    registrationId: "",
    serialNumber: "CXNK00207C99",
    softwareVersion: "12.2.13.0.19",
    _id: "470053-EC4F82-CXNK00207C99"
}

export function subscriber_record() {
    return Promise.resolve(subscriber_data)
}

export const error = {
    "error": "Invalid filter",
    "errors": "Invalid filter",
    "cause": "error[1]: no viable alternative at input '<EOF>'"
}

export const pr_error = {
    "error": "param deviceId is required"
}

export const delete_factory_res = {
    "factoryResetOnRma": true,
    "factoryResetOnDelete": true,
    "deleteAssociatedSystems": true
}

export const environment = {
    "production": false,
    "apiHost": "https://stage.api.calix.ai/v1/shad",
    "API_BASE": "https://stage.api.calix.ai",
    "API_DOMAIN_NAME": "https://stage.api.calix.ai/v1/shad",
    "CALIX_ALEXA_API_HOST": "",
    "ADMIN_API_BASE_URL": "https://stage.api.calix.ai/v1/shad/map/v1/admin/calix",
    "SP_API_BASE_URL": "https://stage.api.calix.ai/v1/shad",
    "BILLING_API_BASE_URL": "https://stage.api.calix.ai/map/v1/internal",
    "BILLING_TOKEN": "",
    "BING_API_KEY": "AphMsjhoY9yqrb7enLjcXxZDIKzb_H5MMObpAAjLdIJiVms_zECO6mWgaR3F-5DR",
    "GO_JS_KEY": "73f942e4b26728a800ca0d2b113f69ee1bb37f3b9ed11bf05e5041f4ea5f68443089ec2d01d38b9081fe1aff1979c4dd8dcc6c2a9e48013ce166d38945b286ace13f77ba435c448aa25373c3ccfd2fa0ac2a63e2c4e027a4da2adcf3f9b8c09d5febecd057ca07",
    "MOBILE_API_BASE_URL": "https://stage.api.calix.ai/v1/shad/map/v1/mobile",
    "CALIX_ALEXA_MOBILE_API_HOST": "",
    "SSO_API_URL": "https://stage.api.calix.ai",
    "X_CALIX_CLIENTID": "kK1cJ0mRp7iSmTFt3vAGO44vobsu36op",
    "faAdminURL": "https://stage.api.calix.ai/v1/fa/config/",
    "calixAdminURL": "https://stage.api.calix.ai/v1/admin/",
    "faFrontEnd": "https://stage.api.calix.ai/v1/fa/",
    "cmcBaseURL": "https://stage.api.calix.ai/v1/cmc/",
    "faAdminOrgId": 50,
    "AUTH_API_HOST": "https://stage.api.calix.ai/v1/authentication",
    "UI_BASE_URL": "http://localhost:4200",
    "CMC_API_BASE_URL": "https://stage.api.calix.ai/v1/cmc/",
    "faAdminCorrelatorURL": "https://stage.api.calix.ai/v1/fa/correlator/",
    "CALIX_ADMIN_BASE_URL": "https://stage.api.calix.ai/v1/admin/",
    "CALIX_ADMIN_ORG_BASE_URL": "https://stage.api.calix.ai/v1/org/admin/",
    "FA_API_BASE_URL": "https://stage.api.calix.ai/v1/fa/",
    "X_CALIX_SECURE_CLIENTID": "6QcEcYE6c3kZCklO",
    "CSC_BASE_URL": "",
    "CSC_LOGOUT_URL": "",
    "CMC_DOWNLOAD_CSV_URL": "http://localhost:4200/download/",
    "CSC_TOS_MD_HASH": "XZOMRFuSeugCBDLfIVGBSw==",
    "CSC_BASIC_TOS_MD_HASH": "XZOMRFuSeugCBDLfIVGBSw==",
    "CMC_TOS_MD_HASH": "XZOMRFuSeugCBDLfIVGBSw==",
    "CCO_TOS_MD_HASH": "XZOMRFuSeugCBDLfIVGBSw==",
    "FOUNDATION_TOS_MD_HASH": "XZOMRFuSeugCBDLfIVGBSw==",
    "TOS_API_URL": "https://stage.api.calix.ai/v1/calix/authz/tos",
    "FLOW_BASE_URL": "https://stage.api.calix.ai/v1/flow/",
    "IMAGE_UPLOAD_AWS_ACCESS_KEY": "",
    "IMAGE_UPLOAD_AWS_ACCESS_SECRET": "",
    "IMAGE_UPLOAD_BUCKET": "",
    "CMC_DOWNLOAD_CSV_BUCKET": "",
    "CMC_DOWNLOAD_CSV_AWS_ACCESS_KEY": "",
    "CMC_DOWNLOAD_CSV_AWS_ACCESS_SECRET": "",
    "SYS_ADMIN_ROUTE": "systemAdministration",
    "ORG_ADMIN_ROUTE": "organization-admin",
    "SUPPORT_URL": "https://stage.api.calix.ai/v1/csc",
    "API_BASE_URL": "https://stage.api.calix.ai/v1/",
    "UI_ASSETS_URL": "http://localhost:4200/assets",
    "VALIDATE_SCOPE": true,
    "SUMMARY_URL": "https://clouddashboards-stg.calix.com/ticket/single/?appid=fe340011-d818-4750-b84d-f5456674a714&sheet=fa36e4e1-0de5-48b5-8571-43284aca1263",
    "MAP_URL": "https://clouddashboards-stg.calix.com/ticket/single/?appid=fe340011-d818-4750-b84d-f5456674a714&obj=BMAA",
    "SMART_TABLE_URL": "https://clouddashboards-stg.calix.com/ticket/single/?appid=fe340011-d818-4750-b84d-f5456674a714&obj=tXCJYE",
    "ADVANCED_URL": "https://clouddashboards-stg.calix.com/ticket/extensions/InfoXD_New/InfoXD_New.html?",
    "APP_ID": "fe340011-d818-4750-b84d-f5456674a714",
    "QLIK_CONFIG": {
        "host": "clouddashboards-stg.calix.com",
        "prefix": "/ticket/",
        "port": 443,
        "isSecure": true
    },
    "IS_PRE_PRODUCTION": false,
    "CALIX_URL": "https://stage.api.calix.ai/v1/calix/",
    "APP_ID_QLIK": "y6b2per1608308687294",
    "BOARD_ID_QLIK": "2cbuhe01608205645836",
    "CCO_REPORTS_BASE_URL": "https://stage.api.calix.ai/v1/fa-reporter/",
    "MAILCHIMP_CLIENT_ID": "306831470960",
    "MAILCHIMP_CLIENT_SECRET": "67570d73661b1b716362b319f2b99d233112b50e56d20b9e03",
    "FA_ADMIN_CONFIG_URL": "https://stage.api.calix.ai/v1/fa-config/",
    "FOUNDATION_BASE_URL": "https://stage.api.calix.ai/v1/foundation/",
    "TRAFFIC_SOCKET_URL": "wss://rtwsgw-stg.calix.com",
    "FOUNDATION_SERVICES_URL": "https://stage.api.calix.ai/v1/billing/",
    "HUBSPOT_CLIENT_ID": "d74f8f35-dba7-4849-bedb-898a92b196ee",
    "HUBSPOT_CLIENT_SECRET_ID": "d2548b99-da25-4e7a-b0ef-e028d69799bb",
    "CONSTANT_CLIENT_ID": "7f2371c2-bf83-4fed-902b-840711f22a65",
    "VALIDATE_FOUNDATION_SCOPE": true,
    "COC_SERVICES_ACTIVATION_URL": "https://stage.api.calix.ai/v1/svc/activation",
    "CCO_DASHBOARD_STREAM_ID": "e1mg7db1626871735441",
    "CSC_DASHBOARD_STREAM_ID": "41ifky01626783869132",
    "MYCOMMUNITYIQ_URL": "https://stage.api.calix.ai/v1/mycommunityiq",
    "OPERATIONS_HOME_ACTIVE_ALARMS_COLORS": {
        "critical": "#C70000",
        "major": "#FC7235",
        "minor": "#F3B426",
        "warning": "#f7e9c1",
        "info": "#7cb5ec"
    },
    "OPERATIONS": {
        "HEALTH": {
            "HEALTH_BAR_CHART_COLORS": {
                "first": "#0027FF",
                "second": "#5ACFEA"
            },
            "HEALTH_DELETED_BAR_CHART_COLORS": {
                "first": "#0027FF80",
                "second": "#5ACFEA80"
            },
            "TIMESERIES": {
                "PON": {
                    "usbiperr": "#0027FF",
                    "dsbiperr": "#5ACFEA",
                    "usOct": "#0027FF",
                    "dsOct": "#5ACFEA",
                    "rxPkt": "#B926F0",
                    "txPkt": "#FF8238",
                    "rxDis": "#029A7C",
                    "txDis": "#F7C343",
                    "rxErr": "#FF489D",
                    "txErr": "#F7500F",
                    "usRate": "#0279ff",
                    "dsRate": "#82bf00",
                    "rxErrToPktRatio": "#836ee8",
                    "txErrToPktRatio": "#DE428E",
                    "rxDisToPktRatio": "#6574A6",
                    "txDisToPktRatio": "#41EAD4"
                },
                "UPLINK": {
                    "oct": "#0027FF",
                    "pkt": "#5ACFEA",
                    "txPkt": "#B926F0",
                    "rxPkt": "#FF8238",
                    "rxOct": "#029A7C",
                    "txOct": "#F7C343",
                    "rxDis": "#FF489D",
                    "txDis": "#F7500F",
                    "rxErr": "#836ee8",
                    "txErr": "#DE428E",
                    "usRate": "#0279ff",
                    "dsRate": "#82bf00",
                    "rxErrToPktRatio": "#6574A6",
                    "txErrToPktRatio": "#41EAD4",
                    "rxDisToPktRatio": "#BB8B1A",
                    "txDisToPktRatio": "#A44A3F"
                },
                "ONT": {
                    "usbiperr": "#0027FF",
                    "dsBipErr": "#5ACFEA",
                    "usFecTotCodeWord": "#B926F0",
                    "dsFecTotCodeWord": "#FF8238",
                    "upTime": "#029A7C",
                    "neOptSignalLvl": "#F7C343",
                    "rxOptPwr": "#FF489D",
                    "txOptPwr": "#F7500F",
                    "usFecCor": "#6a994e",
                    "dsFecCor": "#a98467",
                    "usFecUncorCodeWord": "#5f0f40",
                    "dsFecUncorCodeWord": "#7b2cbf",
                    "dsPonErr": "#197278",
                    "usPonErr": "#ce4257"
                }
            },
            "DELETED_TRANSPARENT": {
                "first": "#0027FF00",
                "second": "#5ACFEA00"
            },
            "BAR_TRANSPARENT": {
                "first": "#FFFFFF00",
                "second": "#00000000"
            }
        }
    },
    "SUPPORT": {
        "WIFI": {
            "AIRTIME_ANALYSIS": [
                "#0279FF",
                "#5ACFEA",
                "#FF8238"
            ]
        }
    },
    "highchartExportURL": "",
    "QLIK_SUMMARY_URL_AQUI": "",
    "QLIK_MAP_URL_AQUI": "",
    "APP_ID_PRO": "",
    "BOARD_ID_PRO": "",
    "BOARD_ID_PRO_ADV": "",
    "APP_ID_AQUISITION": ""
}

export const feature_properties_res = {
    "modelName": "GPR2032H",
    "dataModelName": null,
    "opMode": null,
    "opRole": null,
    "softwareVersion": null,
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
            "featureName": "RouterTemperature",
            "resultType": "DeviceCapability",
            "supported": true
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
            "featureName": "L2FilterBridgeReference",
            "resultType": "IndexArray",
            "dimensions": 1,
            "fields": [
                {
                    "name": "FilterEnable",
                    "type": "Boolean"
                },
                {
                    "name": "FilterBridgeReference",
                    "type": "Integer"
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
            "featureName": "RadioStatistics2.4G",
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
                }
            ]
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
            "featureName": "RadioStatistics6G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "UpgradeSoftware",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SpeedTest",
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
            "featureName": "RadioStatistics5G",
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
    ]
}

export const featuremockjson = {
    "modelName":"GS4227E-2",
    "dataModelName":null,
    "opMode":null,
    "opRole":null,
    "softwareVersion":null,
    "properties":[
    {
    "featureName":"RadioAirtime2.4G",
    "resultType":"Object",
    "fields":[
    {
    "name":"ChannelUtilization",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"ChannelInterferenceTime",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"WANInfo",
    "resultType":"Object",
    "fields":[
    {
    "name":"Name",
    "type":"String",
    "writable":false
    },
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"Uptime",
    "type":"Integer",
    "writable":false,
    "note":"Unit is second."
    },
    {
    "name":"IPv6ConnectionStatus",
    "type":"String",
    "writable":false
    },
    {
    "name":"MACAddress",
    "type":"IPAddress",
    "writable":false
    },
    {
    "name":"DownstreamRate",
    "type":"Integer",
    "writable":false,
    "note":"0 means Not Limited. Unit is Kbps."
    },
    {
    "name":"UpstreamRate",
    "type":"Integer",
    "writable":false,
    "note":"Unit is Kbps."
    },
    {
    "name":"VlanID",
    "type":"String",
    "writable":false
    },
    {
    "name":"VlanPriority",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"IPv6AddressingType",
    "type":"String",
    "writable":false
    },
    {
    "name":"ConnectionType",
    "type":"String",
    "writable":false
    },
    {
    "name":"DefaultIPv6Gateway",
    "type":"String",
    "writable":false
    },
    {
    "name":"IPv6DNSServer",
    "type":"String",
    "writable":false
    },
    {
    "name":"ExternalIPv6Address",
    "type":"String",
    "writable":false
    },
    {
    "name":"IANA",
    "type":"String",
    "writable":false
    },
    {
    "name":"GRP",
    "type":"String",
    "writable":false
    },
    {
    "name":"BytesReceived",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"BytesSent",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsReceived",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsSent",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"AutoChannel6G",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true
    }
    },
    {
    "featureName":"RadioAirtime5G",
    "resultType":"Object",
    "fields":[
    {
    "name":"ChannelUtilization",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"ChannelInterferenceTime",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"WpsStateBackhaul",
    "resultType":"Object",
    "fields":[
    {
    "name":"State",
    "type":"String",
    "writable":false
    }
    ]
    },
    {
    "featureName":"SSID14",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID15",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID12",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID13",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID10",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID11",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SignalingProtocol",
    "resultType":"Object",
    "fields":[
    {
    "name":"SignalingProtocol",
    "type":"String",
    "writable":false
    }
    ]
    },
    {
    "featureName":"SplitWan",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"WanAccessTypeOptions",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true,
    "valueList":[
    "GPON",
    "XGSPON",
    "CopperEthernet"
    ]
    }
    },
    {
    "featureName":"HistoricalRadioAirtime",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"RouterTemperature",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"DeviceLog",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"SiteScan",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"WpsState2.4G",
    "resultType":"Object",
    "fields":[
    {
    "name":"State",
    "type":"String",
    "writable":false
    }
    ]
    },
    {
    "featureName":"OpModeOptions",
    "resultType":"RawConfiguration",
    "configuration":{
    "RG":{
    "writable":false
    },
    "SMB":{
    "writable":false
    },
    "WAP":{
    "writable":false
    }
    }
    },
    {
    "featureName":"SSID3",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID4",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID5",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID6",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID7",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"WpsStateIptv",
    "resultType":"Object",
    "fields":[
    {
    "name":"State",
    "type":"String",
    "writable":false
    }
    ]
    },
    {
    "featureName":"SSID8",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID9",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"L2FilterBridgeReference",
    "resultType":"IndexArray",
    "dimensions":1,
    "fields":[
    {
    "name":"FilterEnable",
    "type":"Boolean"
    },
    {
    "name":"FilterBridgeReference",
    "type":"Integer"
    }
    ]
    },
    {
    "featureName":"AutoChannel2.4G",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true
    }
    },
    {
    "featureName":"SSID23",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID24",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID21",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID22",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"DHCPv6",
    "resultType":"Object",
    "fields":[
    {
    "name":"RAService",
    "type":"String",
    "valueList":[
    "server",
    "disabled"
    ],
    "writable":true
    },
    {
    "name":"DHCPv6Service",
    "type":"String",
    "valueList":[
    "server",
    "disabled"
    ],
    "writable":true
    },
    {
    "name":"DHCPv6Mode",
    "type":"String",
    "valueList":[
    "A-flag",
    "M-and-A",
    "M-flag"
    ],
    "writable":true
    },
    {
    "name":"IPv6DNSServers",
    "type":"String",
    "writable":true,
    "note":"Primary DNS server and secondary DNS server are separated by ','."
    }
    ]
    },
    {
    "featureName":"SSID1",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID2",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID20",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID18",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID19",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"SSID16",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    },
    {
    "name":"BasicEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"BasicAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"WPAAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"DataModel",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"SSID17",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"SSID",
    "type":"String",
    "writable":true
    },
    {
    "name":"SSIDAdvertisementEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "WPA3"
    ],
    "writable":true
    },
    {
    "name":"IEEE11iEncryptionModes",
    "type":"String",
    "writable":true
    },
    {
    "name":"IEEE11iAuthenticationMode",
    "type":"String",
    "writable":true
    },
    {
    "name":"KeyPassphrase",
    "type":"String",
    "writable":true
    }
    ]
    },
    {
    "featureName":"Ping",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"WpsState5G",
    "resultType":"Object",
    "fields":[
    {
    "name":"State",
    "type":"String",
    "writable":false
    }
    ]
    },
    {
    "featureName":"SecurityOptions",
    "resultType":"RawConfiguration",
    "configuration":{
    "WPA2-PSK":{
    "BeaconType":"11i",
    "IEEE11iEncryptionModes":[
    "AESEncryption"
    ],
    "IEEE11iAuthenticationMode":"PSKAuthentication"
    },
    "WPA3-PSK":{
    "BeaconType":"WPA3",
    "IEEE11iEncryptionModes":[
    "AESEncryption"
    ],
    "IEEE11iAuthenticationMode":"SAEAuthentication"
    },
    "SecurityOff":{
    "BeaconType":"Basic",
    "BasicEncryptionModes":"None",
    "BasicAuthenticationMode":"None"
    },
    "WPA/WPA2-PSK":{
    "BeaconType":"WPAand11i",
    "WPAEncryptionModes":[
    "AESEncryption"
    ],
    "WPAAuthenticationMode":"PSKAuthentication",
    "IEEE11iEncryptionModes":[
    "AESEncryption"
    ],
    "IEEE11iAuthenticationMode":"PSKAuthentication"
    },
    "WPA2/WPA3-PSK":{
    "BeaconType":"11iandWPA3",
    "IEEE11iEncryptionModes":[
    "AESEncryption"
    ],
    "IEEE11iAuthenticationMode":"SAEandPSKAuthentication"
    }
    }
    },
    {
    "featureName":"PrimarySSID5GState",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    }
    ]
    },
    {
    "featureName":"SteeringEvent",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"RadioStatus5G",
    "resultType":"Object",
    "fields":[
    {
    "name":"NoiseLevel",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsSent",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsReceived",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsReTransmittedDownstream",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsDroppedDownstream",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"MUMIMO",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"RadioEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"Mode",
    "type":"String",
    "valueList":[
    {
    "value":"n",
    "displayName":"802.11n Only"
    },
    {
    "value":"ac",
    "displayName":"802.11ac and 802.11n"
    },
    {
    "value":"ax",
    "displayName":"802.11ax, 802.11ac and 802.11n"
    }
    ],
    "writable":true
    },
    {
    "name":"Bandwidth",
    "type":"String",
    "valueList":{
    "n":[
    "20MHz",
    "40MHz"
    ],
    "ac":[
    "20MHz",
    "40MHz",
    "80MHz"
    ],
    "ax":[
    "20MHz",
    "40MHz",
    "80MHz"
    ]
    },
    "writable":true
    },
    {
    "name":"Channel",
    "type":"String",
    "valueList":{
    "dfsEnabled":{
    "20MHz":[
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
    "40MHz":[
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
    "80MHz":[
    36,
    52,
    100,
    132,
    149
    ]
    },
    "dfsDisabled":{
    "20MHz":[
    36,
    40,
    44,
    48,
    149,
    153,
    157,
    161
    ],
    "40MHz":[
    36,
    44,
    149,
    157
    ],
    "80MHz":[
    36,
    149
    ]
    }
    },
    "writable":true
    },
    {
    "name":"AutoChannelEnable",
    "type":"String",
    "writable":true
    },
    {
    "name":"PowerLevel",
    "type":"Integer",
    "valueList":[
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
    "writable":true
    },
    {
    "name":"DFS",
    "type":"Boolean",
    "writable":true,
    "note":"Should be unwritable if RegulatoryDomain is GY"
    }
    ]
    },
    {
    "featureName":"UpgradeSoftware",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"SpeedTest",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"TraceRoute",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"UPnP",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"NATEnable",
    "type":"Boolean",
    "writable":true
    }
    ]
    },
    {
    "featureName":"DownstreamReport",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"RadioStatus6G",
    "resultType":"Object",
    "fields":[
    {
    "name":"MUMIMO",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"RadioEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"Mode",
    "type":"String",
    "valueList":[
    {
    "value":"ax",
    "displayName":"802.11ax, 802.11ac and 802.11n"
    }
    ],
    "writable":true
    },
    {
    "name":"Bandwidth",
    "type":"String",
    "valueList":{
    "ax":[
    "80MHz",
    "160MHz"
    ]
    },
    "writable":true
    },
    {
    "name":"Channel",
    "type":"String",
    "valueList":{
    "80MHz":[
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
    "160MHz":[
    37,
    69,
    101,
    133,
    165,
    197
    ]
    },
    "writable":true
    },
    {
    "name":"AutoChannelEnable",
    "type":"String",
    "writable":true
    },
    {
    "name":"PowerLevel",
    "type":"Integer",
    "valueList":[
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
    "writable":true
    },
    {
    "name":"PSCOnly",
    "type":"Boolean",
    "writable":false
    }
    ]
    },
    {
    "featureName":"BackupRestore",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"RemoteAccessGui",
    "resultType":"RawConfiguration",
    "configuration":{
    "needTimer":true,
    "formElement":{
    "auth":"auth",
    "nonce":"nonce",
    "username":"Username"
    },
    "urlAppendix":"/login.cgi"
    }
    },
    {
    "featureName":"AutoChannel5G",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true
    }
    },
    {
    "featureName":"RadioStatus2.4G",
    "resultType":"Object",
    "fields":[
    {
    "name":"RadioEnabled",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"Mode",
    "type":"String",
    "valueList":[
    {
    "value":"n",
    "displayName":"802.11n Only"
    },
    {
    "value":"ng",
    "displayName":"802.11n and 802.11g"
    },
    {
    "value":"ax",
    "displayName":"802.11ax, 802.11n and 802.11g"
    }
    ],
    "writable":true
    },
    {
    "name":"Bandwidth",
    "type":"String",
    "valueList":{
    "n":[
    "20MHz",
    "40MHz"
    ],
    "ax":[
    "20MHz",
    "40MHz"
    ],
    "ng":[
    "20MHz",
    "40MHz"
    ]
    },
    "writable":true
    },
    {
    "name":"Channel",
    "type":"String",
    "valueList":{
    "20MHz":[
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
    "40MHz":[
    1,
    2,
    3,
    4,
    5,
    6,
    7
    ]
    },
    "writable":true
    },
    {
    "name":"AutoChannelEnable",
    "type":"String",
    "writable":true
    },
    {
    "name":"PowerLevel",
    "type":"Integer",
    "valueList":[
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
    "writable":true
    },
    {
    "name":"NoiseLevel",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsSent",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsReceived",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsReTransmittedDownstream",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"PacketsDroppedDownstream",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"DHCP",
    "resultType":"Object",
    "fields":[
    {
    "name":"DHCPServerEnable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"HostName",
    "type":"String",
    "writable":true
    },
    {
    "name":"DomainName",
    "type":"String",
    "writable":true
    },
    {
    "name":"DeviceIPAddress",
    "type":"IPAddress",
    "writable":true
    },
    {
    "name":"BeginningIPAddress",
    "type":"IPAddress",
    "writable":true
    },
    {
    "name":"EndingIPAddress",
    "type":"IPAddress",
    "writable":true
    },
    {
    "name":"SubnetMask",
    "type":"IPAddress",
    "writable":true
    },
    {
    "name":"DHCPLeaseTime",
    "type":"Integer",
    "writable":true,
    "note":"-1 indicates an infinite lease.",
    "unit":"s"
    },
    {
    "name":"DNSServers",
    "type":"string",
    "writable":true,
    "note":"Primary DNS server and secondary DNS server are separated by ','."
    }
    ]
    },
    {
    "featureName":"Reboot",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true,
    "execTimeout":600
    }
    },
    {
    "featureName":"Firewall",
    "resultType":"Object",
    "fields":[
    {
    "name":"StealthMode",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"InValue",
    "type":"String",
    "writable":true
    },
    {
    "name":"OutValue",
    "type":"String",
    "writable":true
    },
    {
    "name":"SecurityLevel",
    "type":"String",
    "valueList":[
    {
    "value":"High",
    "displayName":"High"
    },
    {
    "value":"X_000631_Medium",
    "displayName":"Medium"
    },
    {
    "value":"Low",
    "displayName":"Low"
    },
    {
    "value":"Off",
    "displayName":"Off"
    }
    ],
    "writable":true
    }
    ]
    },
    {
    "featureName":"DMZ",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"IPAddress",
    "type":"IPAddress",
    "writable":true
    }
    ]
    },
    {
    "featureName":"ChannelChangeLogs2.4G",
    "resultType":"Array",
    "dimensions":1,
    "fields":[
    {
    "name":"TimeStamp",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"ReasonCode",
    "type":"Binary",
    "writable":false
    },
    {
    "name":"NewChannel",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"IptvState",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":true
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    }
    ]
    },
    {
    "featureName":"ChannelChangeLogs5G",
    "resultType":"Array",
    "dimensions":1,
    "fields":[
    {
    "name":"TimeStamp",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"ReasonCode",
    "type":"Binary",
    "writable":false
    },
    {
    "name":"NewChannel",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"ConnectToDevice",
    "resultType":"Object",
    "fields":[
    {
    "name":"IPAddress",
    "type":"String",
    "writable":false
    },
    {
    "name":"Port",
    "type":"String",
    "writable":false
    },
    {
    "name":"Protocol",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Username",
    "type":"String",
    "writable":false
    },
    {
    "name":"Password",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Nonce",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"SSIDManager",
    "resultType":"DeviceCapability",
    "supported":true
    },
    {
    "featureName":"DeviceStatus",
    "resultType":"Object",
    "fields":[
    {
    "name":"PeriodicInformEnable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"PeriodicInformInterval",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Uptime",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"PrimarySSID2.4GState",
    "resultType":"Object",
    "fields":[
    {
    "name":"Enable",
    "type":"Boolean",
    "writable":false
    },
    {
    "name":"BeaconType",
    "type":"String",
    "valueList":[
    "Basic",
    "11i",
    "WPAand11i",
    "WPA3",
    "11iandWPA3"
    ],
    "writable":true
    }
    ]
    },
    {
    "featureName":"VoiceStatus",
    "resultType":"Array",
    "dimensions":1,
    "fields":[
    {
    "name":"Status.Config",
    "type":"String",
    "writable":false
    },
    {
    "name":"Status.Service",
    "type":"String",
    "writable":false
    },
    {
    "name":"Status.Hook",
    "type":"String",
    "writable":false
    },
    {
    "name":"Status.Call",
    "type":"String",
    "writable":false
    },
    {
    "name":"Stats.IncomingCalls.Attempts",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.IncomingCalls.Completions",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.IncomingCalls.Failed",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.IncomingCalls.PeerDisconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.IncomingCalls.Disconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.OutgoingCalls.Attempts",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.OutgoingCalls.Completions",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.OutgoingCalls.Failed",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.OutgoingCalls.PeerDisconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.OutgoingCalls.Disconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.EmergencyCalls.Attempts",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.EmergencyCalls.Completions",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.EmergencyCalls.Failed",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.EmergencyCalls.PeerDisconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.EmergencyCalls.Disconnects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.RegisterRequests",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.RegisterChallenges",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.RegisterRejects",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.RegisterGrants",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.NotifyWaiting",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.SIPStats.NotifyNoMsgs",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.RTPStats.PacketsSent",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.RTPStats.PacketsReceived",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.RTPStats.Errors.Missing",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.RTPStats.Errors.Underruns",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.DHCP.Discovers",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.DHCP.Acks",
    "type":"Integer",
    "writable":false
    },
    {
    "name":"Stats.DHCP.Nacks",
    "type":"Integer",
    "writable":false
    }
    ]
    },
    {
    "featureName":"FactoryReset",
    "resultType":"RawConfiguration",
    "configuration":{
    "supported":true,
    "execTimeout":600
    }
    }
    ]
    }