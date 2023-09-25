export const arloaccountmock = {
    systemId: "CXNK00778D46",
    status: "Active",
    modelName: "GS4227E",
    edgeSuites: {
      protectIQ: {
        subscribed: true,
        enabled: true,
        agentConnected: true
      },
      experienceIQ: {
        subscribed: true,
        enabled: true,
        agentConnected: true
      },
      arloSmart: {
        email: "augustine.oh@calix.com",
        userId: "9f9692af-dbbf-4b77-85e4-4ff8fd0ee31c",
        "2kCameras": -1,
        plan: "PARTNER_UNLIMITED",
        arloPlan: "Unlimited"
      },
      servifyCare: {
        email: "augustine.oh@calix.com",
        address: "Arronia Ct",
        city: "Pleasanton",
        state: "California",
        postal: "94588",
        userId: "dc045a43-7e0f-4108-a23f-1257a6dd2bd9",
        planCode: "SERVIFYCAREBRONZE",
        planPurchaseDate: "2022-10-11",
        firstName: "Augustine",
        lastName: "Oh"
      },
      myCommunityIQ: {
        subscriber: {
          enable: true,
          communities: [
            {
              micrositeId: "3ab8dee0-7806-470e-adf4-5360e0cc655d"
            }
          ]
        },
        passpoint: {
          enable: false,
          status: {
            result: "succeeded",
            activate: false,
            hotspotConfig: true,
            myCommIQ: true
          }
        }
      },
      bark: {
        email: "aoh@calix.com",
        userId: "4ae87329-4a83-40e6-a1d8-715498da6636",
        planCode: "bark_junior"
      },
      smallBizIQ: {
        enable: false,
        status: {
          result: "succeeded",
          smallBizIQ: true
        }
      }
    },
    rgService: {
      services: [
        {
          Enable: true,
          ProfileId: "5fa70adf-2e33-41e6-8025-207bb7b1ef30",
          Name: "teststage",
          category: "Voice Service"
        }
      ],
      data: {
        Enable: true
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
      subscriberLocationId: "aoh2021",
      account: "aoh2021",
      name: "Augustine Oh (DO NOT TOUCH MY RG)",
      phone: "+1-206-708-4311",
      email: "augustine.oh@calix.com",
      serviceAddress: "Arronia Ct, Pleasanton, CA 94588"
    }
  }

export const arlohealth = {
  healths: [
    {
      health_name: "Notifications",
      status: true,
      statusName: "All Good",
      desc: "Users are able to sign in to their accounts",
      created: 1646040872193,
      updated: 0
    },
    {
      health_name: "Library",
      status: true,
      statusName: "All Good",
      desc: "Users are able to access their video library",
      created: 1646040872196,
      updated: 0
    },
    {
      health_name: "Video Recording",
      status: true,
      statusName: "All Good",
      desc: "Arlo cameras are able to record videos",
      created: 1646040872652,
      updated: 0
    },
    {
      health_name: "Live Streaming",
      status: true,
      statusName: "All Good",
      desc: "Live video streaming service is available",
      created: 1646040872187,
      updated: 0
    },
    {
      health_name: "Log In",
      status: true,
      statusName: "All Good",
      desc: "Users are able to sign in to their accounts",
      created: 1646040872190,
      updated: 0
    }
  ]
}

export const arlodevices : any = [
  {
  "devices":[
  {
  "deviceId":"A471067YAB8F4",
  "parentId":"A471067YAB8F4",
  "deviceType":"camera",
  "deviceName":"Essential Camera",
  "modelId":"VMC2030A",
  "firmwareVersion":"",
  "imageUrl":"https://arlolastimage-z2.s3.amazonaws.com/1460154bc061495783ca3add73e4d757/KPTK5BX-207-61253645/A471067YAB8F4/lastImage.jpg?AWSAccessKeyId=AKIA2BAHQO5QZGD7VOMI&Expires=1665617828&Signature=irAW9i4xl5vFmABpaUE5SiOCChU%3D",
  "status":"provisioned",
  "connectivity":{
  "type":"wifi",
  "connected":true,
  "signalStrength":3,
  "mepStatus":"unknown"
  },
  "xCloudId":"K2DEV-2740-336-127087220",
  "supportAutomation":true,
  "planId":"Arlo-Secure-Unlimited-Plan",
  "battery":"Ok",
  "batteryPercent":"27",
  "created":1665531428214,
  "updated":1666768405535,
  "ipAddress":"192.168.2.128",
  "macAddress":"a4:11:62:89:15:dd",
  "hasMacMatched":true
  }
  ]
  },
  [
  {
  "HostName":"VMC2030-AB8F4",
  "MACAddress":"a4:11:62:89:15:dd",
  "IPAddress":"192.168.2.128",
  "Connection":"2.4GHz",
  "AccessPoint":"GM2037",
  "SSID":"August Home (Stage)",
  "Mode":"11n",
  "Signal-strength":-53,
  "DS-packet-drops":0,
  "SNR":42,
  "Airtime-usage":0,
  "DS-phy-rate":72200,
  "US-phy-rate":43300,
  "DS-retx-packets":3,
  "Status":"online",
  "Address-source":"dhcp",
  "Model":"Arlo Essential",
  "Manufacture":"Arlo",
  "Code-version":"Unknown",
  "Lease-time-expiry":1666795816000,
  "Connection-type":"WiFi",
  "Band":"2.4",
  "Channel-number":2,
  "RX-bandwidth-usage":33.33,
  "TX-bandwidth-usage":33.33,
  "Client-efficiency-score":1,
  "TX-bytes":168,
  "RX-bytes":168,
  "AccessPointSerialNumber":"CXNK00E4F519",
  "AccessPointHostName":"LivingRoom SAT 1",
  "Client-type":8
  },
  {
  "HostName":"Calix iPhone 32:4e:57:14:38:28",
  "MACAddress":"32:4e:57:14:38:28",
  "IPAddress":"192.168.2.149",
  "Connection":"5GHz",
  "AccessPoint":"GM2037",
  "SSID":"August Home (Stage)",
  "Mode":"11ax",
  "Signal-strength":-68,
  "DS-packet-drops":0,
  "SNR":27,
  "Airtime-usage":0,
  "DS-phy-rate":720600,
  "US-phy-rate":360300,
  "DS-retx-packets":4,
  "Status":"online",
  "Address-source":"dhcp",
  "Model":"iPhone 13",
  "Manufacture":"Apple",
  "Code-version":"iOS",
  "Lease-time-expiry":1666790442000,
  "Connection-type":"WiFi",
  "Band":"5",
  "Channel-number":44,
  "RX-bandwidth-usage":66.67,
  "TX-bandwidth-usage":66.67,
  "Client-efficiency-score":0.375,
  "TX-bytes":336,
  "RX-bytes":336,
  "AccessPointSerialNumber":"CXNK00E4F519",
  "AccessPointHostName":"LivingRoom SAT 1",
  "Client-type":1
  },
  {
  "HostName":"AugustineWatch",
  "MACAddress":"2a:dc:71:dc:e1:3f",
  "Status":"offline",
  "Model":"Unknown",
  "Manufacture":"Unknown",
  "Code-version":"Unknown",
  "Client-type":1
  },
  {
  "HostName":"AugusticBookSub",
  "MACAddress":"3c:22:fb:e9:a7:50",
  "Status":"offline",
  "Model":"MacBook Pro 2020",
  "Manufacture":"Apple",
  "Code-version":"macOS",
  "Client-type":2
  },
  {
  "HostName":"Augusti12ProMax",
  "MACAddress":"0e:be:15:97:96:f4",
  "Status":"offline",
  "Model":"iPhone 12 Pro Max",
  "Manufacture":"Apple",
  "Code-version":"iOS",
  "Client-type":1
  },
  {
  "HostName":"Suahs-MBP",
  "MACAddress":"1c:91:80:cf:8e:04",
  "Status":"offline",
  "Model":"MacBook Air 2020",
  "Manufacture":"Apple",
  "Code-version":"macOS",
  "Client-type":2
  },
  {
  "HostName":"Chrome OS device",
  "MACAddress":"14:f6:d8:87:4c:c2",
  "Status":"offline",
  "Model":"Chrome OS Device",
  "Manufacture":"Unknown",
  "Code-version":"Chrome OS",
  "Client-type":2
  },
  {
  "HostName":"",
  "MACAddress":"02:06:2f:db:68:a5",
  "Status":"offline",
  "Model":"",
  "Manufacture":"",
  "Code-version":"",
  "Client-type":0
  },
  {
  "HostName":"",
  "MACAddress":"c6:66:1f:56:11:77",
  "Status":"offline",
  "Model":"",
  "Manufacture":"",
  "Code-version":"",
  "Client-type":0
  },
  {
  "HostName":"SAMSUNG Galaxy A Series",
  "MACAddress":"f2:8c:cf:e2:ff:39",
  "Status":"offline",
  "Model":"Galaxy A Series",
  "Manufacture":"SAMSUNG",
  "Code-version":"Android",
  "Client-type":1
  },
  {
  "HostName":"Retnas-iPhone",
  "MACAddress":"30:d9:d9:43:57:b0",
  "Status":"offline",
  "Model":"iPhone",
  "Manufacture":"Apple",
  "Code-version":"iOS",
  "Client-type":1
  }
  ]
  ]
export const devicedata = [
  {
  "_id":"102-60DB98-CXNK00AFB902",
  "serialNumber":"CXNK00AFB902",
  "macAddress":"60:db:98:6f:30:6a",
  "registrationId":"",
  "ipAddress":"10.57.61.72",
  "modelName":"GS4227",
  "softwareVersion":"22.4.0.0.37",
  "opMode":"RG",
  "manufacturer":"Calix",
  "deviceId":"CXNK00AFB902",
  "ont":{
  "uuid":"314ab0fd-516b-4f0b-af3e-7f9b8a48676f",
  "model":"GS4227",
  "vendorId":"CXNK",
  "serialNo":"AFB902",
  "macAddr":"60:db:98:6f:30:6a"
  },
  "secondIpAddress":"10.57.60.167",
  "opModeWithOnt":"ONT/RG"
  }
  ]
export const deviceupdateinfo = {
"devices":[
{
"deviceId":"A471067YAB8F4",
"parentId":"A471067YAB8F4",
"deviceType":"camera",
"deviceName":"Essential Camera",
"modelId":"VMC2030A",
"firmwareVersion":"",
"imageUrl":"https://arlolastimage-z2.s3.amazonaws.com/1460154bc061495783ca3add73e4d757/KPTK5BX-207-61253645/A471067YAB8F4/lastImage.jpg?AWSAccessKeyId=AKIA2BAHQO5QZGD7VOMI&Expires=1665617828&Signature=irAW9i4xl5vFmABpaUE5SiOCChU%3D",
"status":"provisioned",
"connectivity":{
"type":"wifi",
"connected":true,
"signalStrength":3,
"mepStatus":"unknown"
},
"xCloudId":"K2DEV-2740-336-127087220",
"supportAutomation":true,
"planId":"Arlo-Secure-Unlimited-Plan",
"battery":"Ok",
"batteryPercent":"100",
"created":1665531428214,
"updated":1668499196927,
"ipAddress":"192.168.2.128",
"macAddress":"a4:11:62:89:15:dd"
}
]
}

export const updatedevicemock =[
  {
  "deviceId":"A471067YAB8F4",
  "parentId":"A471067YAB8F4",
  "deviceType":"camera",
  "deviceName":"Essential Camera",
  "modelId":"VMC2030A",
  "firmwareVersion":"",
  "imageUrl":"https://arlolastimage-z2.s3.amazonaws.com/1460154bc061495783ca3add73e4d757/KPTK5BX-207-61253645/A471067YAB8F4/lastImage.jpg?AWSAccessKeyId=AKIA2BAHQO5QZGD7VOMI&Expires=1665617828&Signature=irAW9i4xl5vFmABpaUE5SiOCChU%3D",
  "status":"provisioned",
  "connectivity":{
  "type":"wifi",
  "connected":true,
  "signalStrength":3,
  "mepStatus":"unknown"
  },
  "xCloudId":"K2DEV-2740-336-127087220",
  "supportAutomation":true,
  "planId":"Arlo-Secure-Unlimited-Plan",
  "battery":"Ok",
  "batteryPercent":"100",
  "created":1665531428214,
  "updated":1669197572496,
  "ipAddress":"192.168.2.128",
  "macAddress":"a4:11:62:89:15:dd",
  "hasMacMatched":true
  }
  ]