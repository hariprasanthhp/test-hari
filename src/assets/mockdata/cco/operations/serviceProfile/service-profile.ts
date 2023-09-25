export const serviceDefinitions: any = [
    {
        "name": "sd_data_may5",
        "serviceTemplateName": "st_data_may5",
        "tagAction": null,
        "tierName": "bw_data_may5",
        "napNodeId": null,
        "description": null,
        "ouiMatchListName": null,
        "id": "d91e6638-2f01-4c52-a94e-255162431753",
        "sop_uuid": "ee3b663b-3361-4ccc-9608-8777d87c497d",
        "multicastVlanName": null,
        "multicastRangeName": null
      }
]

export const serviceTemplates: any = [
    {
        "name": "RSE_ST_DATA",
        "serviceType": "DATA",
        "ceVlan": null,
        "version": "v4",
        "vlanMode": "N2ONE",
        "vlans": null,
        "subscribersPerVlan": 200,
        "multicastProfile": null,
        "dialPlan": null,
        "sipProfile": null,
        "h248Profile": null,
        "description": null,
        "acsJsonb": null,
        "id": null,
        "exaRgMgmtProfile": null,
        "primaryDnsServer": null,
        "secondaryDnsServer": null,
        "igmpProfile": null
      }
]

export const bandwidthTiers: any = [
    {
        "name": "tb12a-700-one",
        "upstreamPir": 100000,
        "upstreamCir": 30000,
        "downstreamPir": 100000,
        "downstreamCir": 70000,
        "description": null,
        "id": null,
        "sop_uuid": null
      }
]

export const ouiMatchList: any = [
    {
        "ouiListUuid": "48796518-5a0b-485c-853e-9ea4753e0722",
        "name": "testoui",
        "ouiListValues": [
          "33:55:66",
          "44:66:66"
        ],
        "isdeleted": false,
        "description": null
      }
]

export const multicastRange: any = [
    {
        "name": "test54mul",
        "filters": [
          {
            "end": "224.0.1.1",
            "start": "224.0.1.0"
          }
        ],
        "description": null,
        "id": "37f08f2d-67c7-4c24-abc1-7debe6681027",
        "sop_uuid": "00ea1e15-88b5-4cfb-ad7b-9552f41eb5c8",
        "isdeleted": false
      }
]

export const multicastVlan: any = [
    {
        "name": "test54",
        "vlans": [
          {
            "ranges": [
              {
                "end": "224.0.1.1",
                "start": "224.0.1.0"
              }
            ],
            "vlanId": 10
          }
        ],
        "description": null,
        "id": "6285227f-cc8b-4d53-9ac0-86639c5ee1d1",
        "sop_uuid": "8b24ce05-d3cc-4357-9b65-f611a562b3de",
        "isdeleted": false
      }
]