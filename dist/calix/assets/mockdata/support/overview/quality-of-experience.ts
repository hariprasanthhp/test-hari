export const qoe=[
    {
        "fsan_sn":"CXNK00778D47","router_mac":"48:77:46:9a:06:a8","rawData":[
            {
                "date":"20220912","time":"1815","dl_created":1663026300,"homeScore":0.0,"status":"known","wanDownTime":0,"wanService":"GOOD","qoeScore":-1,"qoeHelpingText":["Homescore not available"],"qoeHelpingCode":["QOE_HELP_0007"],"wanserviceHelpingCode":[],"wanserviceHelpingText":[],"wanContinuity":"GOOD"
            },{
                "date":"20220912","time":"1830","dl_created":1663027200,"homeScore":0.0,"status":"known","wanDownTime":0,"wanService":"GOOD","qoeScore":-1,"qoeHelpingText":["Homescore not available"],"qoeHelpingCode":["QOE_HELP_0007"],"wanserviceHelpingCode":[],"wanserviceHelpingText":[],"wanContinuity":"GOOD"
            },
        ],
        "avgHomeScore":15.411312
    }
]

export const qoeobj =[
    {
        _id: "470053-B89470-CXNK01019BD3",
        serialNumber: "CXNK01019BD3",
        macAddress: "b8:94:70:2f:70:91",
        registrationId: "",
        ipAddress: "10.245.241.80",
        modelName: "GS2128G",
        softwareVersion: "22.4.500.322",
        opMode: "RG",
        manufacturer: "Calix",
        pppUsername: "test",
        secondIpAddress: "240e:6a0:37:400:1100:2200:6380:74d7/128",
        deviceId: "CXNK01019BD3",
        opModeWithOnt: "RG"
      }
]
export const subInfo = {
  "_id":"f8e9a0c9-1a76-4a75-af10-c677d017b2b6",
  "account":"TestGod",
  "name":"GodTest (SMB device Don't Touch, it only for csc testing purpose )",
  "phone":"7878654329",
  "email":"godtest@calix.com",
  "serviceAddress":"ashok nager",
  "subscriberLocationId":"New Chennai",
  "service":{
  },
  "service-detail":[
  ],
  "devices":[
  {
  "_id":"470053-D0768F-CXNK00923490",
  "opMode":"RG",
  "opRole":"Controller",
  "bSmbMode":true,
  "serialNumber":"CXNK00923490",
  "macAddress":"d0:76:8f:8f:bc:32",
  "productClass":"GigaSpire",
  "registrationId":"",
  "ipAddress":"192.168.2.28",
  "manufacturer":"Calix",
  "modelName":"GS4220E",
  "dataModelName":"tr098",
  "softwareVersion":"23.2.500.281",
  "manufacturerOUI":"D0768F",
  "hardwareVersion":"3000286511",
  "hardwareSerialNumber":"422010134834",
  "lastInformTime":"2023-04-17T06:17:32.991Z"
  },
  {
  "_id":"470053-D0768F-CXNK0099C752",
  "opMode":"WAP",
  "opRole":"Satellite",
  "bSmbMode":true,
  "serialNumber":"CXNK0099C752",
  "macAddress":"d0:76:8f:bc:34:c5",
  "productClass":"GigaMesh",
  "registrationId":"",
  "ipAddress":"172.17.0.242",
  "manufacturer":"Calix",
  "modelName":"GM1028",
  "dataModelName":"tr098",
  "softwareVersion":"23.1.500.488",
  "manufacturerOUI":"D0768F",
  "hardwareVersion":"3000287811",
  "hardwareSerialNumber":"422012121627",
  "wapGatewaySn":"CXNK00923490",
  "lastInformTime":"2023-04-17T06:25:40.706Z"
  }
  ],
  "ipAddress":"192.168.2.28",
  "commandIQ":{
  "onboarded":true,
  "email":"smbgod@calix.com",
  "userId":"0dd0d2da-f565-46af-9126-6e86e4c3fba3",
  "secondaryUsers":[
  ],
  "referrer":"SMBIQ",
  "fduser":false
  },
  "insights":"N/A",
  "churnRisk":"N/A",
  "endpointIdName":"CXNK00923490",
  "pastMonthCall":5,
  "isSmbOnboarded":true
  }

export const rebootAndUpgradeEventMock = 
[
{
"_id":"639e129e-1911-4824-82c9-31b89b166196",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-13T05:35:42.653Z"
},
{
"_id":"5b1a1b96-82b0-4bf5-a004-61793c44bfa4",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-12T12:31:52.301Z"
},
{
"_id":"c97565a9-371c-4aa3-9370-636cf6cfebc1",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-12T10:17:56.392Z"
},
{
"_id":"859779c4-c99f-4241-88d7-e8671e128f1c",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-12T09:58:33.331Z"
},
{
"_id":"9d7f23ec-2dbf-490c-9feb-ac5347192d47",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-11T10:58:08.732Z"
},
{
"_id":"4b95ea8e-3fb3-4524-8169-e9ce886bd5da",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-11T09:32:44.580Z"
},
{
"_id":"fba46966-3912-4f55-8f1c-e848ec0e5f22",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-11T07:41:37.968Z"
},
{
"_id":"3c374d38-105d-492c-802b-6baca939473c",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-05T21:06:10.999Z"
},
{
"_id":"7483ee7e-ccb0-4540-a23f-21a64b788dc4",
"type":"SW Upgrade Success",
"orgId":"470053",
"source":"Autonomous",
"details":{
"version":"23.1.500.425",
"fromVersion":"23.1.500.400"
},
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2023-01-05T12:54:35.225Z"
},
{
"_id":"a16770b0-6866-4d4f-9dda-136a592ff24b",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-30T11:35:56.476Z"
},
{
"_id":"6c9d6864-3701-49ac-8d75-b9e02d9ead8f",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-30T11:18:50.945Z"
},
{
"_id":"bcef22b7-ad22-4803-a243-56f74b57e6da",
"type":"Reboot Success",
"orgId":"470053",
"source":"Operator",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-30T10:58:18.760Z"
},
{
"_id":"6449c701-074b-4580-bccd-e46e4b4a6a83",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-29T09:11:19.055Z"
},
{
"_id":"3796a0f9-b50d-454c-8c4e-82621293be7f",
"type":"Reboot Success",
"orgId":"470053",
"source":"Operator",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-29T07:35:30.165Z"
},
{
"_id":"6e786960-f873-452f-b392-b7b3d60583a1",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-28T13:35:11.978Z"
},
{
"_id":"78dfac84-213d-4645-bc2d-40904d91130d",
"type":"SW Upgrade Success",
"orgId":"470053",
"source":"Autonomous",
"details":{
"version":"23.1.500.400",
"fromVersion":"22.4.500.201"
},
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-27T09:23:50.170Z"
},
{
"_id":"1b7f7349-4e0d-4193-9260-fb4675845f3b",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-27T09:03:41.546Z"
},
{
"_id":"eb115bee-b70d-45a0-93ef-cbfa0c4a7b2e",
"type":"Reboot Success",
"orgId":"470053",
"source":"Autonomous",
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-27T06:45:53.805Z"
},
{
"_id":"536156a8-c6bf-4c3f-9e5b-d4acaa445dd3",
"type":"Reboot Success",
"orgId":"470053",
"source":"System",
"details":{
"workflow":"q21313"
},
"deviceSn":"CXNK00923490",
"severity":"Info",
"timestamp":"2022-12-26T14:55:31.558Z"
}
]

export const chartqoe = 
  {
    fsan_sn: "CXNK01019BD3",
    router_mac: "b8:94:70:2f:70:91",
    rawData: [
      {
        date: "20221009",
        time: "1230",
        dl_created: 1665338400,
        homeScore: 41.16866666666667,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 3,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1245",
        dl_created: 1665339300,
        homeScore: 55.99866666666665,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 3,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1300",
        dl_created: 1665340200,
        homeScore: 56.428000000000004,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 3,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1315",
        dl_created: 1665341100,
        homeScore: 39.516000000000005,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 2,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1330",
        dl_created: 1665342000,
        homeScore: 29.189333333333334,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 2,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1345",
        dl_created: 1665342900,
        homeScore: 28.55333333333333,
        status: "known",
        wanDownTime: 0,
        wanService: "GOOD",
        qoeScore: 2,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005"
        ],
        wanserviceHelpingCode: [],
        wanserviceHelpingText: [],
        wanContinuity: "GOOD"
      },
      {
        date: "20221009",
        time: "1400",
        dl_created: 1665343800,
        homeScore: 38.96,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Observed Poor Client(s) Efficiency",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0005",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1415",
        dl_created: 1665344700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1430",
        dl_created: 1665345600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1445",
        dl_created: 1665346500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1500",
        dl_created: 1665347400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1515",
        dl_created: 1665348300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1530",
        dl_created: 1665349200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1545",
        dl_created: 1665350100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1600",
        dl_created: 1665351000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1615",
        dl_created: 1665351900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1630",
        dl_created: 1665352800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1645",
        dl_created: 1665353700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1700",
        dl_created: 1665354600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1715",
        dl_created: 1665355500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1730",
        dl_created: 1665356400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1745",
        dl_created: 1665357300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1800",
        dl_created: 1665358200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1815",
        dl_created: 1665359100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1830",
        dl_created: 1665360000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1845",
        dl_created: 1665360900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1900",
        dl_created: 1665361800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1915",
        dl_created: 1665362700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1930",
        dl_created: 1665363600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "1945",
        dl_created: 1665364500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2000",
        dl_created: 1665365400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2015",
        dl_created: 1665366300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2030",
        dl_created: 1665367200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2045",
        dl_created: 1665368100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2100",
        dl_created: 1665369000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2115",
        dl_created: 1665369900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2130",
        dl_created: 1665370800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2145",
        dl_created: 1665371700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2200",
        dl_created: 1665372600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2215",
        dl_created: 1665373500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2230",
        dl_created: 1665374400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2245",
        dl_created: 1665375300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2300",
        dl_created: 1665376200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2315",
        dl_created: 1665377100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2330",
        dl_created: 1665378000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221009",
        time: "2345",
        dl_created: 1665378900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0000",
        dl_created: 1665379800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0015",
        dl_created: 1665380700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0030",
        dl_created: 1665381600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0045",
        dl_created: 1665382500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0100",
        dl_created: 1665383400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0115",
        dl_created: 1665384300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0130",
        dl_created: 1665385200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0145",
        dl_created: 1665386100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0200",
        dl_created: 1665387000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0215",
        dl_created: 1665387900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0230",
        dl_created: 1665388800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0245",
        dl_created: 1665389700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0300",
        dl_created: 1665390600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0315",
        dl_created: 1665391500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0330",
        dl_created: 1665392400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0345",
        dl_created: 1665393300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0400",
        dl_created: 1665394200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0415",
        dl_created: 1665395100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0430",
        dl_created: 1665396000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0445",
        dl_created: 1665396900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0500",
        dl_created: 1665397800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0515",
        dl_created: 1665398700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0530",
        dl_created: 1665399600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0545",
        dl_created: 1665400500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0600",
        dl_created: 1665401400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0615",
        dl_created: 1665402300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0630",
        dl_created: 1665403200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0645",
        dl_created: 1665404100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0700",
        dl_created: 1665405000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0715",
        dl_created: 1665405900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0730",
        dl_created: 1665406800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0745",
        dl_created: 1665407700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0800",
        dl_created: 1665408600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0815",
        dl_created: 1665409500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0830",
        dl_created: 1665410400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0845",
        dl_created: 1665411300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0900",
        dl_created: 1665412200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0915",
        dl_created: 1665413100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0930",
        dl_created: 1665414000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "0945",
        dl_created: 1665414900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1000",
        dl_created: 1665415800,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1015",
        dl_created: 1665416700,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1030",
        dl_created: 1665417600,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1045",
        dl_created: 1665418500,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1100",
        dl_created: 1665419400,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1115",
        dl_created: 1665420300,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1130",
        dl_created: 1665421200,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1145",
        dl_created: 1665422100,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1200",
        dl_created: 1665423000,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      },
      {
        date: "20221010",
        time: "1215",
        dl_created: 1665423900,
        status: "unknown",
        wanDownTime: 0,
        wanService: "BAD(GREY)",
        qoeScore: -2,
        qoeHelpingText: [
          "Homescore not available",
          "Wan Continuity not available"
        ],
        qoeHelpingCode: [
          "QOE_HELP_0007",
          "QOE_HELP_0008"
        ],
        wanserviceHelpingCode: [
          "QOE_HELP_0008"
        ],
        wanserviceHelpingText: [
          "Wan Continuity not available"
        ],
        wanContinuity: "BAD(GREY)"
      }
    ],
    avgHomeScore: 41.402
  }
     
export const wanshow = [
  {
  "_id":"696cff52-bea8-4310-9f50-12c4605e3d61",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-11T11:22:42.437Z"
  },
  {
  "_id":"49271bf0-86c4-4909-b54b-638759f50866",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-11T10:49:53.528Z"
  },
  {
  "_id":"777e5c8b-2d12-44cf-bde4-5a3010166f6b",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-11T05:55:21.588Z"
  },
  {
  "_id":"67fae0eb-cdcd-4984-b22f-b0c4dfe21160",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-10T14:15:38.296Z"
  },
  {
  "_id":"7c0534ed-09e7-49d4-884a-3241b0ab5e11",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-10T13:50:21.167Z"
  },
  {
  "_id":"a91cf5da-78d8-446b-910d-d1e2b7b12a04",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-10T12:23:32.987Z"
  },
  {
  "_id":"892e8126-16d4-4caa-8ac8-a6aa9583328d",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.329",
  "fromVersion":"22.4.500.319"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-10T06:21:25.329Z"
  },
  {
  "_id":"aeb98468-e948-4b01-a9a7-080ab62065a2",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"System",
  "details":{
  "workflow":"Test workflowf"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-09T01:59:33.733Z"
  },
  {
  "_id":"abd9d87b-55bd-42bf-915c-49539b76f5d2",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"System",
  "details":{
  "workflow":"Test workflowf"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T10:48:45.940Z"
  },
  {
  "_id":"9e8ef7ff-ebd6-40c4-97d3-6fdd7bd0f1fe",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T10:44:53.189Z"
  },
  {
  "_id":"db9b5bcc-3bc8-4d7a-ae27-24d3f0d40b36",
  "type":"Reboot Failure",
  "orgId":"470053",
  "source":"System",
  "details":{
  "error":"System Operation Timed out!",
  "failure":"System Operation Timed out!",
  "workflow":"Test workflowf"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Critical",
  "timestamp":"2022-10-08T10:20:39.735Z"
  },
  {
  "_id":"848f9c2d-adcf-4486-be26-8b4e53088716",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T10:10:20.638Z"
  },
  {
  "_id":"45703442-7255-45cb-acb8-ab95018080ac",
  "type":"Reboot Failure",
  "orgId":"470053",
  "source":"System",
  "details":{
  "error":"System Operation Timed out!",
  "failure":"System Operation Timed out!",
  "workflow":"Test workflowf"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Critical",
  "timestamp":"2022-10-08T09:57:58.734Z"
  },
  {
  "_id":"7d11d3b9-f64d-4b39-8d5b-4645d69d65cc",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T09:47:17.431Z"
  },
  {
  "_id":"ea774bb7-d66d-4034-9bf5-474669f963fa",
  "type":"Reboot Failure",
  "orgId":"470053",
  "source":"System",
  "details":{
  "error":"System Operation Timed out!",
  "failure":"System Operation Timed out!",
  "workflow":"Test workflowf"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Critical",
  "timestamp":"2022-10-08T09:47:05.733Z"
  },
  {
  "_id":"ce81e42c-0e59-401f-960e-641ce550a0ce",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T06:07:59.186Z"
  },
  {
  "_id":"b8aa172e-31b1-41a3-afd7-8c3c94f42a5b",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T03:18:05.358Z"
  },
  {
  "_id":"6878786f-b8bc-42d5-9e7c-a9fba573f7ce",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.319",
  "fromVersion":"22.4.500.289"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T03:03:47.130Z"
  },
  {
  "_id":"7a39c199-1406-489e-9602-f8db7b20f8dc",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-10-08T02:18:07.960Z"
  },
  {
  "_id":"2b12d3cf-5c71-47de-a63c-35e76ff02b51",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-30T03:07:59.461Z"
  },
  {
  "_id":"463481bc-47d8-4611-89e8-5cb02db6525f",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"System",
  "details":{
  "workflow":"asdxasxs"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-29T14:21:25.363Z"
  },
  {
  "_id":"30482b7f-0c90-437a-ae94-cc99cd506e14",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-29T09:50:57.563Z"
  },
  {
  "_id":"c12e698d-594c-487e-918e-7c6cfc9126ba",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-29T08:22:47.231Z"
  },
  {
  "_id":"b0e11232-21fb-4a0b-b1e5-536d56064723",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.289",
  "fromVersion":"22.4.500.277"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-29T02:00:36.197Z"
  },
  {
  "_id":"037f7b93-898f-4bb9-b237-c3602b6c5edb",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.277",
  "fromVersion":"22.4.500.283"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-28T09:45:06.635Z"
  },
  {
  "_id":"f818daec-7c1d-4e12-91ec-d9fea6b96dc4",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-28T09:37:01.417Z"
  },
  {
  "_id":"e125744f-69b0-4c28-a8c2-618a3506ba9a",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.283",
  "fromVersion":"22.4.500.275"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-28T09:03:29.480Z"
  },
  {
  "_id":"707574e8-b652-41fa-a812-993c239e543f",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-28T07:28:02.692Z"
  },
  {
  "_id":"257cef6a-26ac-4971-89cf-2afa579b1b46",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-28T05:55:29.749Z"
  },
  {
  "_id":"493373a8-b79d-404f-a641-df948cbf20af",
  "type":"Reboot Success",
  "orgId":"470053",
  "source":"Autonomous",
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-27T03:08:02.888Z"
  },
  {
  "_id":"07adf056-f7f5-4ff6-97d3-2687bfcdb0a0",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.275",
  "fromVersion":"22.4.500.260"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-27T01:50:25.389Z"
  },
  {
  "_id":"06738f6d-7c97-4515-be15-97df9b4fc899",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.260",
  "fromVersion":"22.4.500.270"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-27T01:42:51.690Z"
  },
  {
  "_id":"03514456-7785-434a-930d-80e5de451801",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.270",
  "fromVersion":"22.4.500.260"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-26T09:39:53.630Z"
  },
  {
  "_id":"771f0eda-bccf-4f0f-a887-04e87f33ef8f",
  "type":"SW Upgrade Success",
  "orgId":"470053",
  "source":"Autonomous",
  "details":{
  "version":"22.4.500.260",
  "fromVersion":"22.4.500.249"
  },
  "deviceSn":"CXNK01019C87",
  "severity":"Info",
  "timestamp":"2022-09-23T08:12:41.042Z"
  }
  ]
export const qoechartval = [
  {
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [],
      labels: {
        rotation: -45,
        style: {
          fontSize: "10px"
        }
      },
      overflow: false,
      tickInterval: 1
    },
    tooltip: {},
    yAxis: {
      min: 1,
      max: 5,
      tickInterval: 1,
      title: {
        text: "QoE Score",
        style: {
          fontSize: "15px"
        },
        margin: 40
      },
      lineColor: "#ddd"
    },
    plotOptions: {
      series: {
        point: {
          events: {}
        }
      }
    },
    series: [
      {
        type: "line",
        min: 1,
        max: 5,
        data: [],
        marker: {
          radius: 4
        },
        zoneAxis: "x",
        zones: [],
        color: "#0A77FB"
      }
    ]
  }
]

export const clientEfficency =
  {
    y: 37,
    pointDate: "11:30 AM",
    pointDateTime: "10/11/2022 11:30 AM"
  }
export const wholehome = {
  "router_mac":"b8:94:70:2f:76:e5",
  "rawData":[
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"1e:85:f9:29:0d:da",
  "eff_score":24.16,
  "timestamp_str":"2022-10-11 06:02:53.242",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":19.76,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":25.7,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":23.89,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":24.42,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":44.2,
  "timestamp_str":"2022-10-11 06:02:53.242",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":50,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.4,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":20.63,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":41.02,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":43.3,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":19.4,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":60,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":10.17,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":17.4,
  "timestamp_str":"2022-10-11 06:04:28.978",
  "date":"20221011",
  "time":"1134",
  "dl_created":1665468240
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":29.77,
  "timestamp_str":"2022-10-11 06:05:29.050",
  "date":"20221011",
  "time":"1135",
  "dl_created":1665468300
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":30.55,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":26.32,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":35.9,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":50.38,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":37.77,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":26.89,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":28.97,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":57.9,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.43,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.35,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":61.92,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":22.75,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":74.51,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":24.23,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":23.1,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":22.55,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":22.69,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":65.65,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":63.4,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":28.57,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.25,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":56.38,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":37.91,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.29,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":43.24,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":65.44,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.69,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  }
  ],
  "average-effciency-score":[
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"1e:85:f9:29:0d:da",
  "eff_score":24.16,
  "is_online_now":false
  },
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":27.208461538461542,
  "client_name":"ARRIS STB",
  "is_online_now":true
  },
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":51.07312499999999,
  "client_name":"ARRIS STB",
  "is_online_now":true
  }
  ]
  }
export const getAverageScore = 
{
  "router_mac":"b8:94:70:2f:76:e5",
  "rawData":[
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"1e:85:f9:29:0d:da",
  "eff_score":24.16,
  "timestamp_str":"2022-10-11 06:02:53.242",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":19.76,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":25.7,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":23.89,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":24.42,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":44.2,
  "timestamp_str":"2022-10-11 06:02:53.242",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":50,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.4,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":20.63,
  "timestamp_str":"2022-10-11 06:02:55.101",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":41.02,
  "timestamp_str":"2022-10-11 06:02:53.694",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":43.3,
  "timestamp_str":"2022-10-11 06:02:54.148",
  "date":"20221011",
  "time":"1132",
  "dl_created":1665468120
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":19.4,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":60,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":10.17,
  "timestamp_str":"2022-10-11 06:03:12.566",
  "date":"20221011",
  "time":"1133",
  "dl_created":1665468180
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":17.4,
  "timestamp_str":"2022-10-11 06:04:28.978",
  "date":"20221011",
  "time":"1134",
  "dl_created":1665468240
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":29.77,
  "timestamp_str":"2022-10-11 06:05:29.050",
  "date":"20221011",
  "time":"1135",
  "dl_created":1665468300
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":30.55,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":26.32,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":35.9,
  "timestamp_str":"2022-10-11 06:06:29.053",
  "date":"20221011",
  "time":"1136",
  "dl_created":1665468360
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":50.38,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":37.77,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":26.89,
  "timestamp_str":"2022-10-11 06:07:29.063",
  "date":"20221011",
  "time":"1137",
  "dl_created":1665468420
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":28.97,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":57.9,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.43,
  "timestamp_str":"2022-10-11 06:08:29.055",
  "date":"20221011",
  "time":"1138",
  "dl_created":1665468480
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.35,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":61.92,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":22.75,
  "timestamp_str":"2022-10-11 06:09:29.473",
  "date":"20221011",
  "time":"1139",
  "dl_created":1665468540
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":74.51,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":24.23,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":23.1,
  "timestamp_str":"2022-10-11 06:10:29.483",
  "date":"20221011",
  "time":"1140",
  "dl_created":1665468600
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":22.55,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":22.69,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":65.65,
  "timestamp_str":"2022-10-11 06:11:29.495",
  "date":"20221011",
  "time":"1141",
  "dl_created":1665468660
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":63.4,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":28.57,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":23.25,
  "timestamp_str":"2022-10-11 06:12:29.049",
  "date":"20221011",
  "time":"1142",
  "dl_created":1665468720
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":56.38,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":37.91,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.29,
  "timestamp_str":"2022-10-11 06:13:29.464",
  "date":"20221011",
  "time":"1143",
  "dl_created":1665468780
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":43.24,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":65.44,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  },
  {
  "fsan_sn":"CXNK01019C87",
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"f8:85:f9:29:0d:d6",
  "eff_score":26.69,
  "timestamp_str":"2022-10-11 06:14:29.476",
  "date":"20221011",
  "time":"1144",
  "dl_created":1665468840
  }
  ],
  "average-effciency-score":[
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"1e:85:f9:29:0d:da",
  "eff_score":24.16,
  "is_online_now":false
  },
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:e8",
  "eff_score":27.208461538461542,
  "client_name":"ARRIS STB",
  "is_online_now":true
  },
  {
  "router_mac":"b8:94:70:2f:76:e5",
  "station_mac_addr":"5c:b0:66:59:f6:ea",
  "eff_score":51.07312499999999,
  "client_name":"ARRIS STB",
  "is_online_now":true
  }
  ]
  }

export const chartpopup ={
  "router_mac":"d0:76:8f:8f:bc:32",
  "rawData":[
  {
  "fsan_sn":"CXNK00923490",
  "router_mac":"d0:76:8f:8f:bc:32",
  "station_mac_addr":"3c:55:76:ef:8d:c1",
  "eff_score":14.3,
  "timestamp_str":"2022-10-11 14:45:36.006",
  "date":"20221011",
  "time":"2015",
  "dl_created":1665499500
  },
  {
  "fsan_sn":"CXNK00923490",
  "router_mac":"d0:76:8f:8f:bc:32",
  "station_mac_addr":"3c:55:76:ef:8d:c1",
  "eff_score":96.72,
  "timestamp_str":"2022-10-11 14:53:32.765",
  "date":"20221011",
  "time":"2023",
  "dl_created":1665499980
  },
  {
  "fsan_sn":"CXNK00923490",
  "router_mac":"d0:76:8f:8f:bc:32",
  "station_mac_addr":"3c:55:76:ef:8d:c1",
  "eff_score":13.13,
  "timestamp_str":"2022-10-11 14:57:32.069",
  "date":"20221011",
  "time":"2027",
  "dl_created":1665500220
  }
  ],
  "average-effciency-score":[
  {
  "router_mac":"d0:76:8f:8f:bc:32",
  "station_mac_addr":"3c:55:76:ef:8d:c1",
  "eff_score":41.38333333333333,
  "is_online_now":false
  }
  ]
  }
export const devicemock = [
  {
  "deviceId":"CXNK0064CF1A",
  "serialNumber":"CXNK0064CF1A",
  "macAddress":"44:65:7f:68:1d:89",
  "registrationId":"",
  "ipAddress":"172.16.1.150",
  "modelName":"GS2020E",
  "softwareVersion":"22.4.0.0.42",
  "opMode":"RG",
  "_id":"102-44657F-CXNK0064CF1A",
  "manufacturer":"Calix",
  "opModeWithOnt":"RG"
  }
  ]
export const wanshowmock = [
  {
  "_id":"8292c9bc-fc23-4a1f-a35d-ca5a374bfd6a",
  "type":"Reboot Success",
  "orgId":"102",
  "source":"Autonomous",
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-11-10T21:32:16.916Z"
  },
  {
  "_id":"35c7bf41-df00-4e6e-a818-9af2f53dd164",
  "type":"SW Upgrade Success",
  "orgId":"102",
  "source":"System",
  "details":{
  "version":"22.4.0.0.42",
  "workflow":"Installation Upgrade U12",
  "fromVersion":"22.3.0.0.30",
  "SW/FW Image name":"FullRel_EXOS_E1_R22.4.0.0_22.4.0.0.42.img"
  },
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-11-03T13:27:19.656Z"
  },
  {
  "_id":"765c1065-d4eb-41bc-af03-05e2183cdd11",
  "type":"SW Upgrade Success",
  "orgId":"102",
  "source":"System",
  "details":{
  "version":"22.3.0.0.30",
  "fromVersion":"22.4.0.0.42",
  "SW/FW Image name":"FullRel_EXOS_E1_R22.3.0.0.img"
  },
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-11-03T13:03:35.257Z"
  },
  {
  "_id":"1ca10a35-51e9-4c2c-bf62-3e7698f751e4",
  "type":"SW Upgrade Success",
  "orgId":"102",
  "source":"System",
  "details":{
  "version":"22.4.0.0.42",
  "fromVersion":"22.4.500.386",
  "SW/FW Image name":"FullRel_EXOS_E1_R22.4.0.0_22.4.0.0.42.img"
  },
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-11-03T12:52:10.113Z"
  },
  {
  "_id":"45bdb524-5fee-479a-8a73-4bfd904e6e56",
  "type":"Reboot Success",
  "orgId":"102",
  "source":"Autonomous",
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-10-20T17:03:32.956Z"
  },
  {
  "_id":"dd1dd784-7bc3-4bbd-9b20-9452af9339ad",
  "type":"SW Upgrade Success",
  "orgId":"102",
  "source":"System",
  "details":{
  "version":"22.4.500.386",
  "fromVersion":"22.4.500.313",
  "SW/FW Image name":"FullRel_EXOS_E1_R22.4.500_22.4.500.386.img"
  },
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-10-19T19:21:38.461Z"
  },
  {
  "_id":"e9bd2a19-ac85-45af-b973-0cfd114a6812",
  "type":"Reboot Success",
  "orgId":"102",
  "source":"Autonomous",
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-10-19T14:28:21.901Z"
  },
  {
  "_id":"93015594-704c-48d0-a7bf-b3391f013350",
  "type":"SW Upgrade Success",
  "orgId":"102",
  "source":"System",
  "details":{
  "version":"22.4.500.313",
  "workflow":"Installation Upgrade U12",
  "fromVersion":"21.1.0.0.53",
  "SW/FW Image name":"FullRel_EXOS_E1_R22.4.500_22.4.500.313.img"
  },
  "deviceSn":"CXNK0064CF1A",
  "severity":"Info",
  "timestamp":"2022-10-19T14:23:20.086Z"
  }
  ]
export const summarymock = {
  "fsan_sn":"CXNK0064CF1A",
  "router_mac":"44:65:7f:68:1d:89",
  "rawData":[
  {
  "date":"20221113",
  "time":"1715",
  "dl_created":1668339900,
  "homeScore":86.14533333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1730",
  "dl_created":1668340800,
  "homeScore":90.92,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1745",
  "dl_created":1668341700,
  "homeScore":91.42333333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1800",
  "dl_created":1668342600,
  "homeScore":90.24600000000001,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1815",
  "dl_created":1668343500,
  "homeScore":91.49733333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1830",
  "dl_created":1668344400,
  "homeScore":93.08666666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1845",
  "dl_created":1668345300,
  "homeScore":97.12133333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1900",
  "dl_created":1668346200,
  "homeScore":99.68866666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1915",
  "dl_created":1668347100,
  "homeScore":89.02333333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1930",
  "dl_created":1668348000,
  "homeScore":90.33266666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"1945",
  "dl_created":1668348900,
  "homeScore":90,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2000",
  "dl_created":1668349800,
  "homeScore":83.55199999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2015",
  "dl_created":1668350700,
  "homeScore":85.988,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2030",
  "dl_created":1668351600,
  "homeScore":88.43599999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2045",
  "dl_created":1668352500,
  "homeScore":88.73333333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2100",
  "dl_created":1668353400,
  "homeScore":88.86666666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2115",
  "dl_created":1668354300,
  "homeScore":87.60666666666664,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2130",
  "dl_created":1668355200,
  "homeScore":90.31933333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2145",
  "dl_created":1668356100,
  "homeScore":90.33266666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2200",
  "dl_created":1668357000,
  "homeScore":90.33333333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2215",
  "dl_created":1668357900,
  "homeScore":53.402,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":3,
  "qoeHelpingText":[
  "Observed Poor Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0005"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2230",
  "dl_created":1668358800,
  "homeScore":61.04333333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2245",
  "dl_created":1668359700,
  "homeScore":77.90066666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2300",
  "dl_created":1668360600,
  "homeScore":83.92733333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2315",
  "dl_created":1668361500,
  "homeScore":90.416,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2330",
  "dl_created":1668362400,
  "homeScore":92.49066666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221113",
  "time":"2345",
  "dl_created":1668363300,
  "homeScore":90.81533333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0000",
  "dl_created":1668364200,
  "homeScore":91.91533333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0015",
  "dl_created":1668365100,
  "homeScore":94.142,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0030",
  "dl_created":1668366000,
  "homeScore":97.76533333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0045",
  "dl_created":1668366900,
  "homeScore":96.728,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0100",
  "dl_created":1668367800,
  "homeScore":96.16799999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0115",
  "dl_created":1668368700,
  "homeScore":95.998,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0130",
  "dl_created":1668369600,
  "homeScore":96.03266666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0145",
  "dl_created":1668370500,
  "homeScore":98.81466666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0200",
  "dl_created":1668371400,
  "homeScore":100,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0215",
  "dl_created":1668372300,
  "homeScore":95.13733333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0230",
  "dl_created":1668373200,
  "homeScore":95.18466666666664,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0245",
  "dl_created":1668374100,
  "homeScore":99.66066666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0300",
  "dl_created":1668375000,
  "homeScore":93.84866666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0315",
  "dl_created":1668375900,
  "homeScore":94.88666666666664,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0330",
  "dl_created":1668376800,
  "homeScore":81.84666666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0345",
  "dl_created":1668377700,
  "homeScore":95.42933333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0400",
  "dl_created":1668378600,
  "homeScore":99.4,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0415",
  "dl_created":1668379500,
  "homeScore":93.42066666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0430",
  "dl_created":1668380400,
  "homeScore":79.43533333333335,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0445",
  "dl_created":1668381300,
  "homeScore":91.144,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0500",
  "dl_created":1668382200,
  "homeScore":96.60933333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0515",
  "dl_created":1668383100,
  "homeScore":97.47666666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0530",
  "dl_created":1668384000,
  "homeScore":99.06666666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0545",
  "dl_created":1668384900,
  "homeScore":96.63933333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0600",
  "dl_created":1668385800,
  "homeScore":100,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0615",
  "dl_created":1668386700,
  "homeScore":85.72266666666668,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0630",
  "dl_created":1668387600,
  "homeScore":90.316,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0645",
  "dl_created":1668388500,
  "homeScore":92.09933333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0700",
  "dl_created":1668389400,
  "homeScore":86.69266666666665,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0715",
  "dl_created":1668390300,
  "homeScore":91.47999999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0730",
  "dl_created":1668391200,
  "homeScore":90.43866666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0745",
  "dl_created":1668392100,
  "homeScore":91.85999999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0800",
  "dl_created":1668393000,
  "homeScore":90.57999999999998,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0815",
  "dl_created":1668393900,
  "homeScore":76.93133333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0830",
  "dl_created":1668394800,
  "homeScore":93.68466666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0845",
  "dl_created":1668395700,
  "homeScore":93.93266666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0900",
  "dl_created":1668396600,
  "homeScore":88.96066666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0915",
  "dl_created":1668397500,
  "homeScore":94.836,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0930",
  "dl_created":1668398400,
  "homeScore":92.01333333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"0945",
  "dl_created":1668399300,
  "homeScore":93.31466666666665,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1000",
  "dl_created":1668400200,
  "homeScore":89.68133333333331,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1015",
  "dl_created":1668401100,
  "homeScore":92.71866666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1030",
  "dl_created":1668402000,
  "homeScore":92.45599999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1045",
  "dl_created":1668402900,
  "homeScore":94.80133333333335,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1100",
  "dl_created":1668403800,
  "homeScore":91.794,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1115",
  "dl_created":1668404700,
  "homeScore":95.99133333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1130",
  "dl_created":1668405600,
  "homeScore":95.87333333333335,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1145",
  "dl_created":1668406500,
  "homeScore":92.48133333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1200",
  "dl_created":1668407400,
  "homeScore":92.50866666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1215",
  "dl_created":1668408300,
  "homeScore":79.75333333333333,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1230",
  "dl_created":1668409200,
  "homeScore":95.68599999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1245",
  "dl_created":1668410100,
  "homeScore":92.13266666666665,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1300",
  "dl_created":1668411000,
  "homeScore":94.78666666666666,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1315",
  "dl_created":1668411900,
  "homeScore":92.33399999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1330",
  "dl_created":1668412800,
  "homeScore":94.49666666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1345",
  "dl_created":1668413700,
  "homeScore":92.564,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1400",
  "dl_created":1668414600,
  "homeScore":72.18666666666667,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1415",
  "dl_created":1668415500,
  "homeScore":73.326,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1430",
  "dl_created":1668416400,
  "homeScore":87.908,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1445",
  "dl_created":1668417300,
  "homeScore":94.29133333333334,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1500",
  "dl_created":1668418200,
  "homeScore":72.45800000000001,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":4,
  "qoeHelpingText":[
  "Observed Low Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0004"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1515",
  "dl_created":1668419100,
  "homeScore":85.692,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1530",
  "dl_created":1668420000,
  "homeScore":91.648,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1545",
  "dl_created":1668420900,
  "homeScore":93.144,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1600",
  "dl_created":1668421800,
  "homeScore":92.56933333333332,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1615",
  "dl_created":1668422700,
  "homeScore":93.38599999999998,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1630",
  "dl_created":1668423600,
  "homeScore":89.11599999999999,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1645",
  "dl_created":1668424500,
  "homeScore":93.81200000000003,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  },
  {
  "date":"20221114",
  "time":"1700",
  "dl_created":1668425400,
  "homeScore":91.31199999999998,
  "status":"known",
  "wanDownTime":0,
  "wanService":"GOOD",
  "qoeScore":5,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ],
  "wanContinuity":"GOOD"
  }
  ],
  "avgHomeScore":90.56425
  }


export const summarymock7Days = {
  "fsan_sn":"CXNK00923490",
  "router_mac":"d0:76:8f:8f:bc:32",
  "rawData":[
  {
  "date":"20230411",
  "time":"0000",
  "dl_created":1681171200,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230412",
  "time":"0000",
  "dl_created":1681257600,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230413",
  "time":"0000",
  "dl_created":1681344000,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":3,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230414",
  "time":"0000",
  "dl_created":1681430400,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230415",
  "time":"0000",
  "dl_created":1681516800,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230416",
  "time":"0000",
  "dl_created":1681603200,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230417",
  "time":"0000",
  "dl_created":1681689600,
  "homeScore":0.0016666666,
  "wanContinuity":"GOOD",
  "fairCnt":0,
  "goodCnt":38,
  "poorCnt":0,
  "unkwnCnt":0,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":3,
  "wanService":"GOOD",
  "qoeScore":-1,
  "qoeHelpingText":[
  ],
  "qoeHelpingCode":[
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ]
  }
  ],
  "dailyData":[
  {
  "date":"20230411",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230412",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230413",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230414",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230415",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230416",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230417",
  "fsan_sn":"CXNK00923490",
  "homeScore":0.0016666666,
  "wanserviceHelpingCode":[
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"GOOD",
  "poorCnt":0,
  "qoeHelpingText":[
  ],
  "wanserviceHelpingText":[
  ],
  "qoeScore":-1,
  "goodCnt":38,
  "fairCnt":0,
  "wanService":"GOOD"
  }
  ],
  "avgHomeScore":0.0016666666
  }



export const qoescoremock = {
  "category":"08:15 PM"
}

export const qoescoremock7 = {
  "category":"04/18/2023"
}
export const qoescoremock1 = {
  "category":"04/12/2023"
}
export const qoescoremock2 = {
  "category":"04/13/2023"
}

export const qoescoremock3 = {
  "category":"04/14/2023"
}

export const qoescoremock4 = {
  "category":"04/15/2023"
}
export const qoescoremock5 = {
  "category":"04/16/2023"
}

export const qoescoremock6 = {
  "category":"04/17/2023"
}

export const clienteffvalue = {
  "y":93,
  "pointDate":"03:00 AM",
  "pointDateTime":"11/14/2022 03:00 AM"
  }
export const clienteffvalue1 = {
    "y":93,
    "pointDate":"11/14/2022",
    "pointDateTime":"11/14/2022"
    }


export const summaryDataGet15Mins = {
  "fsan_sn":"CXNK00923490",
  "router_mac":"d0:76:8f:8f:bc:32",
  "rawData":[
  {
  "date":"20230412",
  "time":"0000",
  "dl_created":1681257600,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230413",
  "time":"0000",
  "dl_created":1681344000,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":3,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230414",
  "time":"0000",
  "dl_created":1681430400,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230415",
  "time":"0000",
  "dl_created":1681516800,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230416",
  "time":"0000",
  "dl_created":1681603200,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":2,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230417",
  "time":"0000",
  "dl_created":1681689600,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "latency":3,
  "wanService":"BAD(GREY)",
  "qoeScore":-1,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "wanContinuity":"BAD(GREY)"
  },
  {
  "date":"20230418",
  "time":"0000",
  "dl_created":1681776000,
  "homeScore":4.868901,
  "wanContinuity":"GOOD",
  "fairCnt":0,
  "goodCnt":37,
  "poorCnt":0,
  "unkwnCnt":0,
  "upSpeed":"OK",
  "downSpeed":"GOOD",
  "wanService":"GOOD",
  "qoeScore":1,
  "qoeHelpingText":[
  "Observed Poor Client(s) Efficiency"
  ],
  "qoeHelpingCode":[
  "QOE_HELP_0005"
  ],
  "wanserviceHelpingCode":[
  ],
  "wanserviceHelpingText":[
  ]
  }
  ],
  "dailyData":[
  {
  "date":"20230412",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230413",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230414",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230415",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230416",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230417",
  "fsan_sn":"CXNK00923490",
  "homeScore":-1,
  "wanserviceHelpingCode":[
  "QOE_HELP_0008"
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0007",
  "QOE_HELP_0008"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"BAD(GREY)",
  "poorCnt":0,
  "qoeHelpingText":[
  "Homescore not available",
  "Wan Continuity not available"
  ],
  "wanserviceHelpingText":[
  "Wan Continuity not available"
  ],
  "qoeScore":-1,
  "goodCnt":0,
  "fairCnt":0,
  "wanService":"BAD(GREY)"
  },
  {
  "date":"20230418",
  "fsan_sn":"CXNK00923490",
  "homeScore":4.868901,
  "wanserviceHelpingCode":[
  ],
  "unkwnCnt":0,
  "qoeHelpingCode":[
  "QOE_HELP_0005"
  ],
  "router_mac":"d0:76:8f:8f:bc:32",
  "wanContinuity":"GOOD",
  "poorCnt":0,
  "qoeHelpingText":[
  "Observed Poor Client(s) Efficiency"
  ],
  "wanserviceHelpingText":[
  ],
  "qoeScore":1,
  "goodCnt":37,
  "fairCnt":0,
  "wanService":"GOOD"
  }
  ],
  "avgHomeScore":4.868901
  }