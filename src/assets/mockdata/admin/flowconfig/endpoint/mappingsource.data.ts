export const getOrgListMappingSource:any={
    "orgId": 50,
    "tenantId": 0,
    "mappingPrecedence": "CUSTOM,DHCP,CC,RADIUS,AA,RDNS,AXOS,MAC",
    "subscriberMatchRule": "registration_id",
    "nameFormat": "[{\"name\":\"CUSTOM\",\"rules\":[{\"attrs\":[\"cmSerialNumber\",\"cmRegistrationId\",\"cmAccount\",\"cmPhone\",\"cmRegion\",\"cmMappedName\",\"cmNetworkName\",\"cmDeviceType\",\"cmNetworkAid\",\"cmPortType\",\"cmSubscriberInfo\",\"cmBrasIp\",\"cmSubscriberDesc\",\"cmVlan\",\"cmOrgSpecific\",\"cmRouterIf\",\"cmDslamNode\",\"cmDslamVendor\"],\"delimiter\":\"_\"}]},{\"name\":\"DHCP\",\"rules\":[{\"attrs\":[\"dhcpCircuitId\"],\"delimiter\":\"\"},{\"attrs\":[\"macAddress\"],\"delimiter\":\"\"}]},{\"name\":\"CC\",\"rules\":[{\"attrs\":[\"serialNumber\",\"registrationId\"],\"delimiter\":\"/\"},{\"attrs\":[\"subscriberAccount\"],\"delimiter\":\"\"},{\"attrs\":[\"subscriberName\"],\"delimiter\":\"\"}]},{\"name\":\"RADIUS\",\"rules\":[{\"attrs\":[\"radiusUserName\"],\"delimiter\":\"\"}]},{\"name\":\"AA\",\"rules\":[{\"attrs\":[\"cmRegistrationId\"],\"delimiter\":\"\"}]},{\"name\":\"RDNS\",\"rules\":[{\"attrs\":[\"cmRegion\",\"cmRegistrationId\",\"cmDeviceType\",\"cmNetworkAid\",\"cmMappedName\",\"cmPhone\",\"cmSubscriberDesc\",\"cmDslamVendor\",\"cmVlan\",\"cmRouterIf\",\"cmSubscriberInfo\"],\"delimiter\":\"~\"},{\"attrs\":[\"cmPortType\",\"cmOrgSpecific\"],\"delimiter\":\"_\"},{\"attrs\":[\"cmDslamNode\"],\"delimiter\":\"\"},{\"attrs\":[\"cmBrasIp\"],\"delimiter\":\"\"}]},{\"name\":\"AXOS\",\"rules\":[{\"attrs\":[\"cmSerialNumber\"],\"delimiter\":\"\"},{\"attrs\":[\"ipAddress\"],\"delimiter\":\"\"}]},{\"name\":\"MAC\",\"rules\":[{\"attrs\":[\"cmRegistrationId\",\"cmPhone\",\"cmMappedName\",\"cmRegion\",\"cmNetworkName\",\"cmSubscriberInfo\",\"cmSubscriberDesc\",\"cmPortType\",\"cmNetworkAid\",\"cmOrgSpecific\",\"cmRouterIf\",\"cmVlan\",\"cmDslamVendor\",\"cmDslamNode\",\"cmDeviceType\",\"cmBrasIp\"],\"delimiter\":\"_\"}]}]",
    "aggregationRules": "[]",
    "realtimeLateflowDelay": 240,
    "retentionPeriodDays": 41,
    "templateTimeoutHours": 24,
    "entitlement": "CSC,CMC,REPORT1MINAGG,COC,ALLOWUNMAPPED",
    "enableSubscriberAssoc": true,
    "_id": "   225"
}

export const dhcpKeyData:any={
    "orgId": 50,
    "tenantId": 0,
    "macAddress": false,
    "remoteId": false,
    "circuitId": false,
    "subscriberId": false,
    "clientHostName": false,
    "macAsFallback": false,
    "_id": "2c9ec6618338392001833bf86b320013"
}

export const selectedList:any=[
    {
        "name": "DHCP",
        "rules": [
            {
                "attrs": [
                    "dhcpRemoteId"
                ],
                "delimiter": "_"
            }
        ],
        "data": [
            "DHCP Remote Id"
        ],
        "key": "DHCP"
    },
    {
        "name": "RADIUS",
        "rules": [
            {
                "attrs": [
                    "radiusUserName"
                ],
                "delimiter": ""
            }
        ],
        "data": [
            "Radius User Name"
        ],
        "key": "RADIUS"
    },
    {
        "name": "CC",
        "rules": [
            {
                "attrs": [
                    "subscriberAccount",
                    "subscriberName",
                    "serialNumber"
                ],
                "delimiter": "_"
            }
        ],
        "data": [
            "Location ID_Subscriber Name_Serial Number"
        ],
        "key": "CC"
    },
    {
        "name": "AA",
        "rules": [
            {
                "attrs": [
                    "cmPhone"
                ],
                "delimiter": ""
            }
        ],
        "data": [
            "Phone"
        ],
        "key": "AA"
    },
    {
        "name": "SMx",
        "rules": [
            {
                "attrs": [
                    "cmSerialNumber"
                ],
                "delimiter": ""
            }
        ],
        "data": [
            "Serial Number"
        ],
        "key": "SMx"
    },
    {
        "name": "CUSTOM",
        "rules": [
            {
                "attrs": [
                    "cmSerialNumber",
                    "cmRegion"
                ],
                "delimiter": "_"
            }
        ],
        "data": [
            "Serial Number_Region"
        ],
        "key": "CUSTOM"
    }
]

export const unselectList:any=[
    {
        "id": 6,
        "name": "RDNS",
        "data": [
            "Name"
        ],
        "key": "RDNS"
    },
    {
        "id": 7,
        "name": "MAC",
        "data": [
            "Name"
        ],
        "key": "MAC"
    },
    {
        "id": 8,
        "name": "ASSIGNED",
        "data": [
            "Name"
        ],
        "key": "ASSIGNED"
    },
    {
        "id": 9,
        "name": "AXOS",
        "data": [
            "Name"
        ],
        "key": "AXOS"
    },
    {
        "id": 10,
        "name": "EXA",
        "data": [
            "Name"
        ],
        "key": "EXA"
    }
]

export const currentRuleData :any= {
    "name": "RADIUS",
    "rules": [
      {
        "attrs": [
          "radiusUserName"
        ],
        "delimiter": "_"
      }
    ],
    "data": [
      "Radius User Name"
    ],
    "key": "RADIUS"
  };
  export const aggregationData :any= {
    "data": [],
    "key": "AA",
    "name": "AA",
    "rules": [
      {
        "attrs": [
          "cmSerialNumber"
        ],
        "delimiter": ""
      }
    ]
  }

  export const subscribeRuleData :any= {
    "data": [],
    "key": "DHCP",
    "name": "DHCP",
    "rules": [
      {
        "attrs": [
          "ip_address"
        ],
        "delimiter": ""
      }
    ]
  }

  export const deleteMappingItem :any= {
    "id": 6,
    "name": "RDNS",
    "data": [
      "Name"
    ],
    "key": "RDNS"
  }
