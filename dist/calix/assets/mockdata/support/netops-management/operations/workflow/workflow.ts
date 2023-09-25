export const workflow_list = [
    {
        _id: "6ce3a553-73b0-47be-ad88-5a70094d4fda",
        name: "Jing_2028_backup",
        orgId: "470053",
        start: "2020-09-30T02:06:36.404Z",
        state: "Suspended",
        groups: [
            "bde0b713-8211-4c8a-9b89-c0d0f650bc54"
        ],
        actions: [
            {
                actionType: "Reboot"
            }
        ],
        cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"manufacturer\":\"Calix\",\"serialNumber\":{\"$regex\":\"^CXNK0088ADE5$\"}}]}',
        createTime: "2020-09-30T02:06:36.404Z",
        execPolicy: {
            initialTrigger: {
                type: "CPE Event",
                cpeEvent: "CC EVENT - New CPE Discovered"
            }
        },
        description: "",
        fullGroupExecute: false,
        bPriorNewAndFailed: true
    },
    {
        _id: "727a1f44-7965-482d-a568-664173c45114",
        name: "hazel1-844E-SPID123456",
        orgId: "470053",
        start: "2020-11-06T06:16:15.993Z",
        state: "In Progress",
        groups: [
            "7baef606-e2be-47b4-b493-88421c59404b",
            "60e52fa0-3d22-4051-b386-5d4d5a0d0729"
        ],
        actions: [
            {
                fileId: "5fa4e4a20b0ae1a76e87d5d5",
                actionType: "Download Configuration File",
                fileStruct: {
                    _id: "5fa4e4a20b0ae1a76e87d5d5",
                    name: "goldencfgspid",
                    size: 0,
                    type: "Configuration File",
                    orgId: "470053",
                    version: "3.3.3.3",
                    password: "11f2adb",
                    username: "f4cbc08",
                    description: "hhhhhhhhhhhhhhhhh-spid-844E",
                    numberOfDownloads: 2
                },
                profileName: "goldencfgspid"
            }
        ],
        cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"serialNumber\":{\"$regex\":\"^CXNK00284625$\"}}]}',
        createTime: "2020-11-06T06:16:15.993Z",
        execPolicy: {
            initialTrigger: {
                type: "CPE Event",
                cpeEvent: "CC EVENT - New CPE Discovered"
            }
        },
        description: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhtrt",
        staticGroups: [
            "60e52fa0-3d22-4051-b386-5d4d5a0d0729"
        ],
        fullGroupExecute: false,
        bPriorNewAndFailed: true
    },
    {
        _id: "a5261e9d-9b9e-41a8-8ce8-412e5e55d0b5",
        name: "floria_1221",
        orgId: "470053",
        start: "2020-12-21T10:10:23.891Z",
        state: "Suspended",
        groups: [
            "f79995c8-23a7-4d06-be8a-8d98a1b965d1",
            "9f161579-09d1-42f8-b4c1-d7432bf14d54"
        ],
        actions: [
            {
                fileId: "5fe074490b0ac41336c9eb02",
                actionType: "Download Configuration File",
                fileStruct: {
                    _id: "5fe074490b0ac41336c9eb02",
                    name: "goldencfg_6",
                    size: 0,
                    type: "Configuration File",
                    orgId: "470053",
                    version: "10.10.20.40",
                    password: "e45b3a8",
                    username: "d6aff5e",
                    description: "",
                    numberOfDownloads: 1
                },
                profileName: "goldencfg_6"
            },
            {
                fileId: "6296c68d8f0810200fe059e6",
                actionType: "Download SW/FW Image",
                fileStruct: {
                    _id: "6296c68d8f0810200fe059e6",
                    name: "FullRel_SIGNED_EXOS_PH_R22.2.0.0.img",
                    size: 75579792,
                    type: "SW/FW Image",
                    orgId: "0",
                    models: [
                        "GS4227W"
                    ],
                    version: "22.2.0.0.46",
                    password: "b0ed7fc",
                    username: "fe4354f",
                    uploadTime: {
                        $date: 1654048400338
                    },
                    description: "Calix Uploaded Release Image",
                    manufacturer: "Calix",
                    numberOfDownloads: 0
                },
                profileName: "FullRel_SIGNED_EXOS_PH_R22.2.0.0.img"
            }
        ],
        cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"serialNumber\":{\"$regex\":\"^CXNK00EEEFFF$\"}},{\"manufacturer\":\"Calix\",\"serialNumber\":{\"$regex\":\"^CXNK005A85CF$\"}}]}',
        createTime: "2020-12-21T10:10:23.891Z",
        execPolicy: {
            initialTrigger: {
                type: "CPE Event",
                cpeEvent: "CC EVENT - New CPE Discovered"
            }
        },
        description: "",
        fullGroupExecute: false,
        bPriorNewAndFailed: true
    },
    {
        _id: "644b605a-848a-430b-922f-28effac7f998",
        name: "on disc34t45er",
        orgId: "470053",
        start: "2020-12-24T02:37:36.490Z",
        state: "In Progress",
        groups: [
            "23d87aff-ee4f-43a0-b3d9-6bbc7c4be418"
        ],
        actions: [
            {
                fileId: "5f2bcbb50b0a0dd2da81b8b6",
                actionType: "Download Configuration File",
                fileStruct: {
                    _id: "5f2bcbb50b0a0dd2da81b8b6",
                    name: "goldencfg_10.1.2.3_844GE",
                    size: 0,
                    type: "Configuration File",
                    orgId: "470053",
                    version: "10.1.2.3",
                    password: "29565ea",
                    username: "dfcdb67",
                    description: "",
                    numberOfDownloads: 15
                },
                profileName: "goldencfg_10.1.2.3_844GE"
            }
        ],
        cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"manufacturer\":\"Calix\",\"serialNumber\":{\"$regex\":\"^CXNK0021F517$\"}}]}',
        createTime: "2020-12-24T02:37:36.490Z",
        execPolicy: {
            initialTrigger: {
                type: "CPE Event",
                cpeEvent: "CC EVENT - New CPE Discovered"
            }
        },
        description: "",
        fullGroupExecute: false,
        bPriorNewAndFailed: true
    },
    {
        "_id": "633039c1-d2a9-4ebb-bced-360aafff8ee4",
        "name": "kjhgfdbg",
        "orgId": "10009",
        "start": "2022-12-15T13:09:28.057Z",
        "state": "Suspended",
        "groups": [
            "b88b0764-055d-4792-ae9b-36ad1b3a3bdd"
        ],
        "actions": [
            {
                "actionType": "SmartBiz Bulk Activation",
                "actionConfig": {
                    "enable": true
                }
            },
            {
                actionType: "Reboot"
            },
            {
                "actionType": "ExperienceIQ Bulk Activation",
                "bulkActivationConfig": {
                    "enable": true,
                    "subscribe": true
                }
            },
            {
                "actionType": "ProtectIQ Bulk Activation",
                "bulkActivationConfig": {
                    "enable": false,
                    "subscribe": true
                }
            }
        ],
        "cpeMatcher": "{\"orgId\":\"10009\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"manufacturer\":\"Calix\"}]}",
        "createTime": "2022-12-15T13:09:28.057Z",
        "execPolicy": {
            "initialTrigger": {
                "type": "CPE Event",
                "cpeEvent": "CC EVENT - New CPE Discovered"
            }
        },
        "description": "",
        "fullGroupExecute": false,
        "bPriorNewAndFailed": true
    },
    {
        "_id": "efe9cff0-c7f4-47be-a3da-79ba16863026",
        "name": "Default Onboarding Workflow",
        "type": "Onboarding Discovery",
        "orgId": "470053",
        "start": "2021-06-02T08:58:29.381Z",
        "state": "Suspended",
        "source": "Foundation",
        "actions": [
            {
                "actionType": "Download Official Image"
            },
            {
                "actionType": "Apply Onboarding Settings"
            }
        ],
        "cpeMatcher": "{\"orgId\":\"470053\",\"productClass\":{\"$in\":[\"GigaSpire\",\"GigaMesh\",\"GigaPro\"]}}",
        "createTime": "2021-06-02T08:58:29.381Z",
        "execPolicy": {
            "initialTrigger": {
                "type": "CPE Event",
                "cpeEvent": "CC EVENT - New CPE Discovered"
            }
        },
        "description": "Workflow for basic settings during EXOS system onboarding"
    },
    {
        "_id": "a3ea2654-225c-4e31-8572-9ece86de4da8",
        "name": "Default Upgrade Scheduler",
        "type": "Onboarding Scheduler",
        "orgId": "470053",
        "start": "2021-12-31T08:45:01.063Z",
        "state": "Suspended",
        "source": "Foundation",
        "actions": [
            {
                "actionType": "Download Official Image"
            }
        ],
        "lastExec": {
            "end": null,
            "start": "2021-12-31T08:45:01.063Z",
            "execId": "2021-12-31T08:45:00.000Z",
            "suspended": "2021-12-31T08:45:12.459Z"
        },
        "execCount": 1,
        "cpeMatcher": "{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"productClass\":{\"$in\":[\"GigaSpire\",\"GigaMesh\",\"GigaPoint\",\"GigaPro\"]}}",
        "createTime": "2021-10-11T07:43:48.812Z",
        "execPolicy": {
            "window": {
                "type": "weekly",
                "weekdays": [
                    "WEN",
                    "THU",
                    "FRI"
                ],
                "frequency": 1,
                "windowLength": 3600,
                "startDateTime": "2023-05-18T08:47:00.916Z"
            },
            "initialTrigger": {
                "type": "Maintenance Window"
            }
        },
        "workerNode": "172.37.4.194",
        "description": "Workflow schedule for upgrade of EXOS systems",
        "fullGroupExecute": true,
        "bPriorNewAndFailed": true
    }

]

export const workflow_wiz_microsite = [
    {
        id: "d1e63c5d-3e9c-48bf-a4ad-a9f9c0fbab33",
        communityName: "c-k12",
        communityDesc: "Community for K12 students",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-k12/logo/F2hel.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    },
    {
        id: "ca30e208-afd5-4681-9a22-54d7e32b6de3",
        communityName: "dfxvdfv",
        communityDesc: "dfgedfv",
        brandingType: "Custom",
        logo: null,
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "b11166c6-4f23-4930-bca3-603a3663d276",
        communityName: "wrsdfew",
        communityDesc: "ewfw4efdwerd",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "0e6ccb0a-5f9f-4432-95c8-40d5990a8a86",
        communityName: "c-default",
        communityDesc: "Community for BSP subscribers",
        brandingType: "Custom",
        logo: null,
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    },
    {
        id: "5f79bf20-8a71-423e-a93a-3f893e857b29",
        communityName: "786754346789",
        communityDesc: "dtfcygvuhbirtcyvuio",
        brandingType: "Custom",
        logo: null,
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "a074e771-5b23-4863-963f-1e63051fc53f",
        communityName: "joytest2",
        communityDesc: "Auto-Test",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/joytest2/logo/VVJj4.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "111395bf-f4df-4537-aad6-fbc91b02e2f4",
        communityName: "11112222",
        communityDesc: "SFDCSADCXCXWDASCDSXC",
        brandingType: "Custom",
        logo: null,
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "df2a2281-1cb7-409a-8a50-4da771006761",
        communityName: "434344-3",
        communityDesc: "6rs7tfweysfc",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "8a188b64-878d-40c0-b590-8d099b4de4be",
        communityName: "tdgfrdvdfx",
        communityDesc: "vdfbvdfvdf",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "16adbdf2-9df3-4b8f-b849-b8c59dcc3fa8",
        communityName: "rydb",
        communityDesc: "ubsdfcbewdxncwdsxcwdsx sdxcsdcwe",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/rydb/logo/JQLxO.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "8de94fc8-cbc0-4a69-b20c-e8d517542369",
        communityName: "at-testing7",
        communityDesc: "testing123",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing7/logo/Q3Bzf.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "97ea857d-a14a-4f9e-8c23-428fc15be1e8",
        communityName: "grvdgfbvrgdf",
        communityDesc: "fdgvfdv",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6af387cb-ba3a-4a46-a69f-0df35d261760",
        communityName: "cxvcx",
        communityDesc: "vxc",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/cxvcx/logo/qsZpn.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "51946c13-0482-4bfe-9925-58c298aeaaf2",
        communityName: "zat-testing17",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/zat-testing17/logo/uWBZV.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6abe3138-9acc-48e9-ba98-a1bf22216fd2",
        communityName: "yuxing",
        communityDesc: "yuing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/yuxing/logo/zH72t.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6a3971e3-0764-4007-acf6-e418c01638cc",
        communityName: "33q331",
        communityDesc: "13wqesq",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "cc8f980e-6d4b-4efc-879a-8f37b5993a50",
        communityName: "fghnbr4tf",
        communityDesc: "dtfbvetdfgv",
        brandingType: "Custom",
        logo: null,
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "fc9715cd-ebde-4d84-9789-f3f5164a023e",
        communityName: "c-13plus",
        communityDesc: "Community for College students",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-13plus/logo/T1Q7X.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    },
    {
        id: "b4885603-82ca-46ee-82d6-ca92c0c2ff30",
        communityName: "fghjk",
        communityDesc: "dfghjk",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/fghjk/logo/RweBs.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "ca03dbf5-b618-42da-af34-061a0559e53d",
        communityName: "c-firstresponders",
        communityDesc: "Community for first responders",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-firstresponders/logo/pVL9R.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    },
    {
        id: "6ae67506-0438-4359-9656-e3e505c236b8",
        communityName: "at-test3",
        communityDesc: "don't delete",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-test3/logo/hov9Y.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "41aa3e68-d8fb-46a8-9f97-6a46fd9b4598",
        communityName: "paulpasspoint",
        communityDesc: "Paul",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/paulpasspoint/logo/aGBPz.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6399ca08-55ad-46d0-96d4-3b218252f774",
        communityName: "at-testing4",
        communityDesc: "testingh",
        brandingType: "Custom",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing4/logo/q9Ah2_1.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "3ab8dee0-7806-470e-adf4-5360e0cc655d",
        communityName: "aoh-hotspot-stg",
        communityDesc: "Augustine Home SmartTown",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/aoh-hotspot-stg/logo/SjyJI.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "cc0e8305-9be5-4dcd-a8a3-62ce13fb4378",
        communityName: "at-testing3",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing3/logo/PR665.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "511f89ed-d36a-4d3f-a408-09a7bc0f2909",
        communityName: "at-testing5",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing5/logo/xL0ZW.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "13f64b58-6578-40f3-ac1b-ff66aaf28c53",
        communityName: "aetgethbtdfgv",
        communityDesc: "erdfgvrdfgvdrfx",
        brandingType: "Custom",
        logo: null,
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "0f1e1908-c951-41f1-9425-2537ee84af3b",
        communityName: "c-ymca",
        communityDesc: "Community for YMCA members",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-ymca/logo/C6QH9.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    },
    {
        id: "6089d813-930a-4cda-915f-e04c740dccf9",
        communityName: "dfgfdgfd",
        communityDesc: "dfgfdgdf",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/dfgfdgfd/logo/ikyoK.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "d4e26d1c-a8bd-4741-938a-0298de354d76",
        communityName: "at-testing6",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing6/logo/ITkfN.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6cc79baf-3776-40dd-a3a9-08ce0e2851c0",
        communityName: "ysl123",
        communityDesc: "ysl123",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/ysl123/logo/jE5MY.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "00070b14-fdd8-4990-a9f3-74989d4c5bce",
        communityName: "cvcvcv",
        communityDesc: "xcxcv",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/cvcvcv/logo/csfJ1.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "a62f5ddc-bd81-4a9a-9e7b-1f4e678130c4",
        communityName: "at-testing2",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing2/logo/DbgZf.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "8f35d7c2-5490-4823-bdaf-3e3da8333f57",
        communityName: "c-library",
        communityDesc: "Community for library users",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-library/logo/q67a4.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    }
]

export const workflow_data_byId = {
    _id: "6ce3a553-73b0-47be-ad88-5a70094d4fda",
    name: "Jing_2028_backup",
    orgId: "470053",
    start: "2020-09-30T02:06:36.404Z",
    state: "Suspended",
    groups: [
        "bde0b713-8211-4c8a-9b89-c0d0f650bc54"
    ],
    actions: [
        {
            actionType: "Reboot"
        }
    ],
    cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"$or\":[{\"manufacturer\":\"Calix\",\"serialNumber\":{\"$regex\":\"^CXNK0088ADE5$\"}}]}',
    createTime: {
        $date: 1601431596404
    },
    execPolicy: {
        initialTrigger: {
            type: "CPE Event",
            cpeEvent: "CC EVENT - New CPE Discovered"
        }
    },
    description: "",
    fullGroupExecute: false,
    bPriorNewAndFailed: true
}

export const workflow_add_inputData = {
    orgId: 470053,
    name: "justTest",
    selectedDeviceGroup: "Yes",
    groups: [
      "6417c961-aced-472d-a570-14f3547cadc1"
    ],
    actions: [
        {
            "actionType": "SmartBiz Bulk Activation",
            "actionConfig": {
                "enable": true
            },
            "profileName": "SmartBiz: Unsubscribed"
        },
        {
            "actionType": "Edge Suites Bulk Activation",
            "actionConfig": {
                "enable": true
            }
        },
        {
            actionType: "Reboot"
        },
        {
            "actionType": "ExperienceIQ Bulk Activation",
            "bulkActivationConfig": {
                "enable": true,
                "subscribe": true
            }
        },
        {
            "actionType": "ProtectIQ Bulk Activation",
            "bulkActivationConfig": {
                "enable": false,
                "subscribe": true
            }
        }
    ],
    execPolicy: {
      initialTrigger: {
        type: "CPE Event",
        cpeEvent: "CC EVENT - New CPE Discovered"
      }
    },
    policy: {},
    description: "",
    fullGroupExecute: false,
    bPriorNewAndFailed: true,
    levelPassed: 4,
    source: "",
    startTime: "2022-10-19T06:33:37.364Z"
  }

export const workflow_start_data = {
    orgId: 470053,
    name: '',
    selectedDeviceGroup: '',
    groups: [],
    actions: [],
    execPolicy: {},
    policy: {},
    description: '',
    fullGroupExecute: false,
    bPriorNewAndFailed: false,
    levelPassed: 0,
    source: ''
}

export const hsiRes = {
    _id: "8f3a2f0e-73d8-4db5-94ed-c3673894a9c8",
    orgId: "470053",
    timezonePosix: {
      Tz: "Asia/Kolkata",
      TzName: "Asia/Kolkata",
      TzValue: "IST-5:30",
      NTPEnable: true,
      NTPServer1: "time.facebook.com",
      NTPServer2: "2.2.2.2",
      NTPServer3: "3.3.3.3",
      NTPServer4: "4.4.4.4"
    },
    userCredentials: {
      Password: "Testing@1670290255635",
      Username: "autotest1670290255635"
    },
    wifiSsidExos: [{SSID:'SSID1',Enable:true,WlanIndex:'1',PreSharedKey:{1:{KeyPassphrase: null }}},{SSID:'SSID9',Enable:true,WlanIndex:'2'},{SSID:'SSID17',Enable:false,WlanIndex:'3',PreSharedKey:{1:{KeyPassphrase: null }}}]
  }