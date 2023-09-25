export const locations: any = [
    {
        "address": "",
        "geo": "",
        "name": "XGS_Manual",
        "subnetsV4": "10.245.45.0/24",
        "subnetsV6": null,
        "region": "",
        "orgId": 12896222,
        "tenantId": 0,
        "_id": "d0579ce8-49fd-44ce-904b-ff0713fe3a5b"
    },
    {
        "address": "",
        "geo": "",
        "name": "Location-FWU-239-214",
        "subnetsV4": "10.245.239.214/32",
        "subnetsV6": null,
        "region": "",
        "orgId": 12896222,
        "tenantId": 0,
        "_id": "21076ef9-6e82-4b92-b879-578ef125e838"
    }
]

export const applications: any = [
    {
        "name": "Multicast",
        "addressesV4": "239.255.255.250",
        "addressesV6": null,
        "protocol": null,
        "ports": "",
        "rangePorts": "",
        "orgId": 0,
        "tenantId": 0,
        "_id": "e48a915f-2393-4917-bf6e-2f7280b5f7aa"
    },
    {
        "name": "Netflix_VisionNet",
        "addressesV4": "70.33.56.182/32;70.33.57.1 ;70.33.57.75 ",
        "addressesV6": null,
        "protocol": null,
        "ports": "",
        "rangePorts": "",
        "orgId": 0,
        "tenantId": 0,
        "_id": "a35fa8b4-b775-4070-933d-5ba2ce7e9f20"
    }
]


export const applicationGroup: any = [
    {
        "trafficTypeName": "Business",
        "marketingCloudAppName": "Web Ex",
        "socialChannel": false,
        "marketingCloudTopApp": false,
        "orgId": 0,
        "tenantId": 0,
        "applicationName": null,
        "applicationId": "9e19bd59-4d69-43c1-9397-2243ba9c48e6",
        "_id": "d29987f1-4037-4344-b12f-27bf70fd57ce"
    },
    {
        "trafficTypeName": "Streaming Media",
        "marketingCloudAppName": "Disney",
        "socialChannel": false,
        "marketingCloudTopApp": false,
        "orgId": 0,
        "tenantId": 0,
        "applicationName": null,
        "applicationId": "134dac7b-7207-472b-a21a-42ba827b95ca",
        "_id": "55a593d0-8f8a-4350-a18b-e73b1b675c7f"
    }
]


export const modifiedApplication: any = [
    {
        "name": "Multicast",
        "addressesV4": "239.255.255.250",
        "addressesV6": null,
        "protocol": null,
        "ports": "",
        "rangePorts": "",
        "orgId": 0,
        "tenantId": 0,
        "_id": "e48a915f-2393-4917-bf6e-2f7280b5f7aa",
        "type": "Global",
        "label": "Multicast",
        "value": "e48a915f-2393-4917-bf6e-2f7280b5f7aa",
        "app": "Multicast"
    },
    {
        "name": "Netflix_VisionNet",
        "addressesV4": "70.33.56.182/32;70.33.57.1 ;70.33.57.75 ",
        "addressesV6": null,
        "protocol": null,
        "ports": "",
        "rangePorts": "",
        "orgId": 0,
        "tenantId": 0,
        "_id": "a35fa8b4-b775-4070-933d-5ba2ce7e9f20",
        "type": "Global",
        "label": "Netflix_VisionNet",
        "value": "a35fa8b4-b775-4070-933d-5ba2ce7e9f20",
        "app": "Netflix_VisionNet"
    }
]


export const modifiedLocation: any = [
    {
        "name": "XGS_Manual",
        "value": "d0579ce8-49fd-44ce-904b-ff0713fe3a5b",
        "region": null
    },
    {
        "name": "Location-FWU-239-214",
        "value": "21076ef9-6e82-4b92-b879-578ef125e838",
        "region": null
    }
]


export const subscriberDetails: any = {
    "subscriberLocationId": "walkcube011",
    "account": "walkercubeacc011",
    "name": "walkercubename011",
    "phone": "2552240011",
    "email": "CXNK40000011@calix.com",
    "billingAddress": "202 1st St NE, Choteau, MT 59422, United States",
    "serviceAddress": "202 1st St NE, Choteau, MT 59422, United States",
    "location": "Choteau",
    "region": "MONTANA",
    "customerType": "Residential",
    "techType": "Cable",
    "attainableRate": 100,
    "optout": false,
    "devices": [
        "CXNK0021F516"
    ],
    "services": [
        {
            "usoc": "ARC4",
            "type": "data",
            "group": "100M",
            "customerType": "Residential",
            "description": "10M/1M Residential Broadband",
            "techType": "DSL",
            "upSpeed": 100,
            "downSpeed": 100,
            "endpointMappingOption1": "10.245.239.204",
            "endpointMappingOption2": "",
            "endpointMappingOption3": "",
            "endpointMappingOption4": "",
            "voiceInterfaces": [],
            "_id": "8feae1fc-b0c9-4b6c-b521-66168e10cc30"
        }
    ],
    "field1": "10.245.239.204",
    "field2": "",
    "field3": "",
    "field4": "",
    "field5": "",
    "lat": 47.71,
    "lon": -112.1803,
    "country": "US",
    "state": "MONTANA",
    "city": "Choteau",
    "street": "1st St",
    "postcode": "59422",
    "_id": "4872f531-116a-4d1f-a323-35980cd83df2"
}


export const ontDetails: any = {
    "metadata": {
        "totalHits": 1
    },
    "records": [
        {
            "orgId": "12896222",
            "devices": [
                {
                    "deviceId": "CXNK0021F516",
                    "serialNumber": "CXNK0021F516",
                    "macAddress": "ec:4f:82:24:b7:2d",
                    "registrationId": "",
                    "ipAddress": "10.245.239.204",
                    "modelName": "844G-2",
                    "softwareVersion": "12.2.12.5.9",
                    "opMode": "RG",
                    "_id": "12896222-EC4F82-CXNK0021F516",
                    "manufacturer": "Calix",
                    "ont": {
                        "uuid": "12c4c348-83ad-4803-b9cf-a6819d4f10e2",
                        "model": "844G-2",
                        "vendorId": "CXNK",
                        "serialNo": "CXNK0021F516",
                        "macAddr": "ec:4f:82:24:b7:2d"
                    },
                    "opModeWithOnt": "ONT/RG"
                }
            ],
            "subscriberLocationId": "walkcube011",
            "account": "walkercubeacc011",
            "name": "walkercubename011",
            "phone": "2552240011",
            "email": "CXNK40000011@calix.com",
            "serviceAddress": "202 1st St NE, Choteau, MT 59422, United States",
            "subscriberId": "4872f531-116a-4d1f-a323-35980cd83df2"
        }
    ]
}


export const deviceData: any = [{
    "deviceId": "CXNK0021F516",
    "serialNumber": "CXNK0021F516",
    "macAddress": "ec:4f:82:24:b7:2d",
    "registrationId": "",
    "ipAddress": "10.245.239.204",
    "modelName": "844G-2",
    "softwareVersion": "12.2.12.5.9",
    "opMode": "RG",
    "_id": "12896222-EC4F82-CXNK0021F516",
    "manufacturer": "Calix",
    "ont": {
        "uuid": "12c4c348-83ad-4803-b9cf-a6819d4f10e2",
        "model": "844G-2",
        "vendorId": "CXNK",
        "serialNo": "CXNK0021F516",
        "macAddr": "ec:4f:82:24:b7:2d"
    },
    "opModeWithOnt": "ONT/RG"
}]


export const ONTData: any = {
    "uuid": "12c4c348-83ad-4803-b9cf-a6819d4f10e2",
    "model": "844G-2",
    "vendorId": "CXNK",
    "serialNo": "CXNK0021F516",
    "macAddr": "ec:4f:82:24:b7:2d"
}


export const unmappedEndpointDetails: any = [
    {
        "orgId": 12896222,
        "tenantId": 0,
        "ipAddress": "10.245.239.125",
        "isSource": true,
        "createTime": "2022-08-31T01:03:57.184+0000",
        "updateTime": "2022-10-06T09:35:46.272+0000"
    }
]