export function getListData() {
    return {
        "systemId": "CXNK00982CE9",
        "status": "Active",
        "modelName": "844GE-1",
        "edgeSuites": {
          "protectIQ": {
            "subscribed": true
          },
          "experienceIQ": {
            "subscribed": true
          }
        },
        "rgService": {
          "services": [
            {
              "Enable": true,
              "ProfileId": "f24e83af-9ee6-4053-a3a2-7a8dca152283",
              "Name": "ywu_844_rg_video",
              "category": "Video Service"
            }
          ],
          "data": {
            "Enable": true,
            "pppoe": {
              
            }
          },
          "voice": {
            "Line": {
              "1": {
                "Enable": "Enabled",
                "SIP": {
                  "URI": "2012034862",
                  "AuthPassword": "123456",
                  "AuthUserName": "2012034862"
                },
                "CallingFeatures": {
                  "MWIEnable": true,
                  "CallerIDEnable": true,
                  "CallWaitingEnable": true,
                  "X_000631_DirectConnectEnable": false,
                  "X_000631_ThreewayCallingEnable": true
                },
                "VoiceProcessing": {
                  "ReceiveGain": -90,
                  "TransmitGain": -30
                }
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
            "Enable": true
          }
        },
        "subscriber": {
          "subscriberLocationId": "ywu_844_lab_ae",
          "account": "ywu_844_lab_ae",
          "name": "ywu_844_lab_ae",
          "phone": "13800100100",
          "email": "ywu41@calix.com",
          "serviceAddress": "cdc"
        }
      }
}

export function getDeviceInfo() {
    return {"_id":"470053-D0768F-CXNK00982CE9","opMode":"RG","ipAddress":"10.245.53.220","modelName":"844GE-1","createTime":"2022-10-13T08:27:17.171Z","macAddress":"d0:76:8f:ad:b3:bf","subnetMask":"255.255.255.0","stunEnabled":true,"lastBootTime":"2022-10-20T12:47:15.805Z","manufacturer":"Calix","productClass":"ONT","serialNumber":"CXNK00982CE9","changeCounter":54,"dataModelName":"tr098","wanAccessType":"AE","defaultGateway":"10.245.53.1","lastInformTime":"2022-10-25T15:15:32.140Z","registrationId":"","timezoneOffset":"+08:00","hardwareVersion":"3000228516","manufacturerOUI":"D0768F","secondIpAddress":"(null)","softwareVersion":"12.2.13.0.17","provRecordStatus":"Succeeded","STUNServerAddress":"stun-stg.calix.com","secondWanInterface":"InternetGatewayDevice.WANDevice.3.WANConnectionDevice.1.WANIPConnection.2","periodicInformInterval":86400,"wanSecDCSConnectionPath":null,"udpConnectionRequestAddr":"208.44.123.146:57895","lastUpdateToDbTime":1666710926634,"hardwareSerialNumber":"422012001455","wanConnType":"IPoE"}
}
export function getMicrosites() {
    return  [{
        "id": "b11166c6-4f23-4930-bca3-603a3663d276",
        "communityName": "wrsdfew",
        "communityDesc": "ewfw4efdwerd",
        "brandingType": "Custom",
        "logo": null,
        "communityType": "Non-permanent",
        "status": "READY",
        "isPredefinedCommunity": false
      }]
}

export function subscribersummary() {
    return  {
      "_id": "fa36acc5-4ee3-42a0-a168-ad925382f2b0",
      "account": "Eric_CE958A_0916",
      "name": "Eric_CE958A_0916",
      "phone": "",
      "email": "",
      "serviceAddress": "",
      "subscriberLocationId": "Eric_CE958A_0916",
      "service": {
        
      },
      "service-detail": [
        
      ],
      "devices": [
        {
          "_id": "12617080-84D343-CXNK00CE958A",
          "opMode": "RG",
          "opRole": "Controller",
          "serialNumber": "CXNK00CE958A",
          "macAddress": "84:d3:43:c8:55:b1",
          "productClass": "GigaSpire",
          "registrationId": "",
          "ipAddress": "10.245.188.217",
          "secondIpAddress": "240e:6a0:37:800:1010:2020:696f:5d6a/128",
          "ipV6SitePrefix": "240e:6a0:37:80a::/64",
          "manufacturer": "Calix",
          "modelName": "GS4227W",
          "dataModelName": "tr098",
          "softwareVersion": "22.3.0.0.33",
          "manufacturerOUI": "84D343",
          "hardwareVersion": "3000292902",
          "lastInformTime": "2022-10-31T13:45:47.864Z"
        }
      ],
      "ipAddress": "10.245.188.217",
      "secondIpAddress": "240e:6a0:37:800:1010:2020:696f:5d6a/128",
      "commandIQ": {
        "onboarded": false,
        "email": "",
        "userId": "0485c388-f57b-4532-8436-44152f69f627",
        "secondaryUsers": [
          
        ],
        "fduser": false
      },
      "insights": "N/A",
      "churnRisk": "N/A",
      "endpointId": "27c124c1-90ff-4eaf-be1e-bcf42b676688",
      "pastMonthCall": 0
    }
}
export function provisioningRecord() {
  return {"_id":"70cad611-ab7d-4e00-8807-fa43040760d3","orgId":"12617080","opMode":"RG","deviceId":"CXNK00CE958A","modelName":"GS4227W","subscriberId":"938bd817-d94a-4f5c-aa94-eb5204c93729","lastPassphraseUpdateTime5G":{"$date":1666252518530},"lastPassphraseUpdateTime6G":{"$date":1666252518530},"lastPassphraseUpdateTime24G":{"$date":1666252518530},"wifi":{},"staticGroupMember":[{"_id":"768acc1c-af2b-4fb8-9619-3b83923ac9bc","type":"FSAN","orgId":"12617080","groupId":"6276c6e2-238a-4ae9-b49c-c6ce074212ab","createTime":{"$date":1666252518559},"memberInfo":"CXNK00CE958A","deviceRecordId":"12617080-84D343-CXNK00CE958A"},{"_id":"09dd4844-9de9-4861-9e08-ae18454cd267","type":"FSAN","orgId":"12617080","groupId":"2832d911-9cff-4609-9a4e-89dee06b6c46","createTime":{"$date":1664805226189},"memberInfo":"CXNK00CE958A","deviceRecordId":"12617080-84D343-CXNK00CE958A"}]}
}
export const serviceProvisioned = {
  "data":{
  "usoc":"232_614_data_1to1_100_SDT",
  "type":"data",
  "description":"sfsfdf",
  "activate":true,
  "cVlan":2323,
  "voiceInterfaces":[
  ],
  "staticIpAddress":"1.2.3.4",
  "staticNetmask":"255.255.254.0",
  "staticGateway":"12.23.2.1",
  "pppoeUsername":"323232",
  "pppoePassword":"32323232323",
  "staticIpConfigurations":[
  ],
  "_id":"98fe8b7d-191a-4f39-ba7c-7b4dea3aec93"
  },
  "data1":{
  },
  "video":{
  "usoc":"R232_Video_SDT_Mar31",
  "type":"video",
  "description":"trhfghfgh",
  "activate":true,
  "voiceInterfaces":[
  ],
  "memberPorts":[
  ],
  "staticIpConfigurations":[
  ],
  "_id":"984458cd-fa8d-4ba8-8956-19e5b27956bb"
  },
  "voice":{
  "usoc":"gfgfgfgfg",
  "type":"voice",
  "description":"efdsfsd",
  "activate":true,
  "cVlan":2121,
  "voiceServiceType":"SIP",
  "faxT38":true,
  "voiceInterfaces":[
  {
  "name":"L1",
  "enable":true,
  "sipUri":"sdfsdfsf",
  "sipUsername":"dfdsfsd",
  "sipPassword":"dfsfs",
  "mwi":true,
  "callerId":true,
  "callWaiting":true,
  "directConnect":true,
  "directConnectNumber":"232323",
  "directConnectTimer":11,
  "threeWayCalling":true,
  "receiveGain":-90,
  "transmitGain":-30
  }
  ],
  "staticIpConfigurations":[
  {
  "deviceType":"RG",
  "staticIpAddress":"1.2.3.4",
  "staticNetmask":"255.255.248.0",
  "staticGateway":"255.255.248.1"
  }
  ],
  "_id":"9a53ec13-2671-4a30-93f6-fec7bb6f859b"
  }
  }

  export const DataPlanItem = 
  [
    {
    "name":"FIRSTPROFILE",
    "id":"",
    "sop_uuid":"",
    "tierName":"TESTBAND",
    "serviceTemplateName":"DATA123",
    "serviceType":"DATA"
    },
    {
    "name":"ArjunDataRG",
    "id":"",
    "sop_uuid":"",
    "tierName":"TESTBAND",
    "serviceTemplateName":"DATA123",
    "serviceType":"DATA"
    },
    {
    "name":"auto_test",
    "id":"",
    "sop_uuid":"",
    "tierName":"TESTBAND",
    "serviceTemplateName":"DATA123",
    "tagAction":"test",
    "serviceType":"DATA"
    },
    {
    "name":"dsfsdfsdg",
    "id":"",
    "sop_uuid":"f6b9448a-b8ef-4253-a9ec-ecb54cc4d085",
    "tierName":"TESTBAND",
    "serviceTemplateName":"ARJU123",
    "serviceType":"DATA"
    },
    {
    "name":"Testgr",
    "id":"b902f5af-8303-4377-9539-3a3c5a0ba760",
    "sop_uuid":"d0306e0e-6720-4ce6-8fa0-081328781560",
    "tierName":"tesbw",
    "serviceTemplateName":"Testgr",
    "serviceType":"DATA"
    },
    {
    "name":"Teststory",
    "id":"8fce42dc-18f0-4a40-b879-b63fe1be42b5",
    "sop_uuid":"3eb5bf82-3919-4c85-8eec-ac78a06bcc74",
    "tierName":"hvcvfv",
    "serviceTemplateName":"test546454",
    "serviceType":"DATA"
    },
    {
    "name":"testk",
    "id":"be5092fd-b24b-40ed-a51a-72fcb0142123",
    "sop_uuid":"",
    "serviceTemplateName":"DATA123",
    "serviceType":"DATA"
    },
    {
    "name":"dfsj",
    "id":"6887198b-d4af-446c-8bfd-8b7accaf14b2",
    "sop_uuid":"c6f366fe-c31b-4883-8192-fb356471dc8a",
    "tierName":"tesbw",
    "serviceTemplateName":"test546454",
    "serviceType":"DATA"
    },
    {
    "name":"SDP_test",
    "id":"bc2d6ab5-a3b5-4007-8584-695ed540a77b",
    "sop_uuid":"461cc71a-e0d7-435b-bfee-408c0573b452",
    "serviceTemplateName":"dev-test-data1",
    "serviceType":"DATA"
    },
    {
    "name":"Tesgd",
    "id":"9dfbed78-676e-477e-aead-b60f4a1a5f3a",
    "sop_uuid":"ed0a93df-c85d-42e1-8dd6-303fb5088dd0",
    "tierName":"TESTBAND",
    "serviceTemplateName":"test54vlan8",
    "serviceType":"DATA"
    },
    {
    "name":"fgvbvf",
    "id":"47b53a6d-ed65-43e3-9fc9-556e2ed007ae",
    "sop_uuid":"8e19d35e-37d7-48f3-acf8-4a5786faff17",
    "tierName":"NEWBAND",
    "serviceTemplateName":"test546454",
    "serviceType":"DATA"
    },
    {
    "name":"Nith122",
    "id":"8f8b9282-5b95-4f68-af05-86956d114ea5",
    "sop_uuid":"5f6f23f2-8a4b-4383-a188-79e3abdaa439",
    "serviceTemplateName":"Testgr",
    "serviceType":"DATA"
    },
    {
    "name":"werthjk",
    "id":"ac34e267-0c61-4c28-aa14-63633f0bda3a",
    "sop_uuid":"fecb5266-1a86-4ac7-94db-d7c8acf45a9b",
    "serviceTemplateName":"KAL_DATA",
    "serviceType":"DATA"
    },
    {
    "name":"GR12345",
    "id":"dfbff38f-7c60-44fd-87e2-cdb5c314b591",
    "sop_uuid":"c2939619-5003-4d3e-b0e1-4f81d1a70613",
    "serviceTemplateName":"KAL_DATA",
    "description":"sgfgdfgfdgdfg",
    "serviceType":"DATA"
    },
    {
    "name":"gfhjfg",
    "id":"2f911c82-cf7e-4878-91dc-849360cb90ea",
    "sop_uuid":"ceaf332d-bf45-4d03-a6b7-3591cea22bba",
    "serviceTemplateName":"TEST_DATA1",
    "serviceType":"DATA"
    }
    ]


export const datailsPageData = {
  "_id": "808e3360-654f-411f-bdf5-99090ef26722",
  "name": "hfghgfhfghf",
  "subscriberLocationId": "fghfhfgh",
  "service": {
      "data": "fhfghgfh",
      "video": "fghfhfghfhfgh",
      "voice": "dgfdhgfhjfghgfh"
  },
  "service-detail": [
      {
          "usoc": "rgl216011ds",
          "type": "data",
          "description": "fhfghgfh",
          "activate": true,
          "voiceInterfaces": [],
          "staticIpConfigurations": [],
          "_id": "a32e0c11-19dc-407f-86d4-5aa6f456d639"
      },
      {
          "usoc": "DDNNSS",
          "type": "video",
          "description": "fghfhfghfhfgh",
          "activate": true,
          "voiceInterfaces": [],
          "memberPorts": [],
          "staticIpConfigurations": [],
          "_id": "ce0ffc8c-0e9a-4a31-8a0f-5604fedecfb6"
      },
      {
          "usoc": "FionaorgCOCCSC_SIP_SD_04_13",
          "type": "voice",
          "description": "dgfdhgfhjfghgfh",
          "activate": true,
          "voiceServiceType": "SIP",
          "faxT38": false,
          "voiceInterfaces": [
              {
                  "name": "L1",
                  "enable": true,
                  "sipUri": "fghfghfhfg",
                  "sipUsername": "hfghfgh",
                  "sipPassword": "ghfhfgghg",
                  "mwi": false,
                  "callerId": false,
                  "callWaiting": false,
                  "directConnect": false,
                  "directConnectNumber": "",
                  "threeWayCalling": false,
                  "receiveGain": -90,
                  "transmitGain": -30
              }
          ],
          "staticIpConfigurations": [],
          "_id": "e4cba582-2685-4fb9-8a49-4605030d3c95"
      }
  ],
  "insights": "N/A",
  "churnRisk": "N/A",
  "pastMonthCall": 0,
  "isSmbOnboarded": false
}
export const systemInfo = {
  "sn": "ffdhghgh",
  "subscriberId": "808e3360-654f-411f-bdf5-99090ef26722",
  "regId": "",
  "from": "view"
}

export const summarydetail = {
  "subscriberLocationId": "789",
  "account": "mytest",
  "name": "mytest",
  "phone": "423423",
  "email": "gg@gg.com",
  "highValue": false,
  "devices": [
      "bbnbn"
  ],
  "services": [
      {
          "usoc": "rt1804",
          "type": "data",
          "description": "sdsafsdfdf",
          "activate": true,
          "sVlan": 3113,
          "voiceInterfaces": [],
          "staticIpAddress": "1.3.3.3",
          "staticNetmask": "255.0.0.0",
          "staticGateway": "2.3.2.2",
          "pppoeUsername": "wrtsdgdfsg",
          "pppoePassword": "sdhgdfhdfh",
          "staticIpConfigurations": [],
          "interface": "g2",
          "_id": "4f8b92ae-0a8a-4ff6-be99-026d83c7dc50"
      },
      {
          "usoc": "tsfdsd444",
          "type": "video",
          "description": "sdgfdgdfgdfg",
          "activate": true,
          "sVlan": 131,
          "voiceInterfaces": [],
          "staticIpConfigurations": [],
          "interface": "x1",
          "_id": "c88489a8-aa54-4ed0-861c-f8c37a0564fb"
      },
      {
          "usoc": "d_sdt_voice_SIP_tagged",
          "type": "voice",
          "description": "sdfdsfdsfsd",
          "activate": true,
          "sVlan": 1321,
          "voiceServiceType": "SIP",
          "faxT38": true,
          "voiceInterfaces": [
              {
                  "name": "L1",
                  "enable": true,
                  "sipUri": "rydtryrty",
                  "sipUsername": "tryrdy",
                  "sipPassword": "ytryrty",
                  "mwi": true,
                  "callerId": true,
                  "callWaiting": true,
                  "directConnect": true,
                  "directConnectNumber": "5345454",
                  "directConnectTimer": 21,
                  "threeWayCalling": true,
                  "receiveGain": -90,
                  "transmitGain": -30
              }
          ],
          "staticIpConfigurations": [
              {
                  "deviceType": "RG",
                  "staticIpAddress": "1.2.3.4",
                  "staticNetmask": "255.0.0.0",
                  "staticGateway": "2.3.4.3"
              }
          ],
          "interface": "g2",
          "_id": "a7d73561-2119-41c9-838a-d0e510dbc645"
      }
  ],
  "_id": "aad0b4e8-c0a3-45b9-8153-615e78b3d412"
}

export const cocSystemDetails = {
  "subscriberLocationId": "789",
  "account": "mytest",
  "name": "mytest",
  "phone": "423423",
  "email": "gg@gg.com",
  "highValue": false,
  "devices": [
      "bbnbn"
  ],
  "services": [
      {
          "usoc": "rt1804",
          "type": "data",
          "description": "sdsafsdfdf",
          "activate": true,
          "sVlan": 3113,
          "voiceInterfaces": [],
          "staticIpAddress": "1.3.3.3",
          "staticNetmask": "255.0.0.0",
          "staticGateway": "2.3.2.2",
          "pppoeUsername": "wrtsdgdfsg",
          "pppoePassword": "sdhgdfhdfh",
          "staticIpConfigurations": [],
          "interface": "g2",
          "_id": "4f8b92ae-0a8a-4ff6-be99-026d83c7dc50"
      },
      {
          "usoc": "tsfdsd444",
          "type": "video",
          "description": "sdgfdgdfgdfg",
          "activate": true,
          "sVlan": 131,
          "voiceInterfaces": [],
          "staticIpConfigurations": [],
          "interface": "x1",
          "_id": "c88489a8-aa54-4ed0-861c-f8c37a0564fb"
      },
      {
          "usoc": "d_sdt_voice_SIP_tagged",
          "type": "voice",
          "description": "sdfdsfdsfsd",
          "activate": true,
          "sVlan": 1321,
          "voiceServiceType": "SIP",
          "faxT38": true,
          "voiceInterfaces": [
              {
                  "name": "L1",
                  "enable": true,
                  "sipUri": "rydtryrty",
                  "sipUsername": "tryrdy",
                  "sipPassword": "ytryrty",
                  "mwi": true,
                  "callerId": true,
                  "callWaiting": true,
                  "directConnect": true,
                  "directConnectNumber": "5345454",
                  "directConnectTimer": 21,
                  "threeWayCalling": true,
                  "receiveGain": -90,
                  "transmitGain": -30
              }
          ],
          "staticIpConfigurations": [
              {
                  "deviceType": "RG",
                  "staticIpAddress": "1.2.3.4",
                  "staticNetmask": "255.0.0.0",
                  "staticGateway": "2.3.4.3"
              }
          ],
          "interface": "g2",
          "_id": "a7d73561-2119-41c9-838a-d0e510dbc645"
      }
  ],
  "_id": "aad0b4e8-c0a3-45b9-8153-615e78b3d412"
}
