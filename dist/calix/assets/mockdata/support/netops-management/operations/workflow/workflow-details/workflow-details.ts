export const workflow_by_id = {
    _id: "ed1476ab-349f-4298-8651-90a38e2bd97d",
    end: "2022-10-23T12:19:58.179Z",
    name: "ABCD",
    orgId: "470053",
    start: "2022-10-23T12:19:57.876Z",
    state: "Completed",
    groups: [
        "7f4b18d5-8c5e-4fe4-8741-0f0a15853c42",
        "ffd0e2f2-546b-41d6-8784-6b6bb598d5f8"
    ],
    actions: [
        {
            appType: "ProtectIQ",
            actionType: "Edge Suites Provision"
        },
        {
            actionType: "SmartBiz Bulk Activation",
            actionConfig: {
                enable: true
            }
        },
        {
            "actionType": "ProtectIQ Bulk Activation",
            "bulkActivationConfig": {
                "enable": false,
                "subscribe": true
            }
        },
    ],
    cpeMatcher: '{\"orgId\":\"470053\",\"bDecommissioned\":{\"$exists\":false},\"productClass\":{\"$in\":[\"GigaSpire\",\"GigaMesh\",\"GigaPoint\",\"GigaPro\"]}}',
    createTime: {
        $date: 1666527597854
    },
    execPolicy: {
        window: {
            type: "daily",
            frequency: 1,
            recurrence: 1,
            windowLength: 3600,
            startDateTime: "2022-10-23T12:19:44.333Z"
        },
        initialTrigger: {
            type: "Maintenance Window"
        }
    },
    workerNode: "172.30.64.229",
    description: "some test might be here",
    fullGroupExecute: false,
    bPriorNewAndFailed: true
}

export const system_groups_res = [
    {
        _id: "6417c961-aced-472d-a570-14f3547cadc1",
        orgId: "470053",
        name: "testdd",
        description: "elite",
        type: "static",
        allowInheritance: true,
        workflowCount: 129,
        completedCount: 18,
        uncompletedCount: 111
    },
    {
        _id: "7f4b18d5-8c5e-4fe4-8741-0f0a15853c42",
        orgId: "470053",
        name: "ccloud",
        description: "devicegroups",
        type: "static",
        allowInheritance: true,
        workflowCount: 27,
        completedCount: 4,
        uncompletedCount: 23
    },
    {
        _id: "ffd0e2f2-546b-41d6-8784-6b6bb598d5f8",
        orgId: "470053",
        name: "calixcloud",
        description: "users",
        type: "static",
        allowInheritance: true,
        workflowCount: 19,
        completedCount: 4,
        uncompletedCount: 15
    },
    {
        _id: "00303fcc-22bd-42de-975f-3b0237aa9eb8",
        orgId: "470053",
        name: "Testreg123",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 9,
        completedCount: 1,
        uncompletedCount: 8,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS4227E"
        }
    },
    {
        _id: "007fbf1f-922e-470b-bd1c-5b26f111b2ef",
        orgId: "470053",
        name: "GS42212",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 6,
        completedCount: 2,
        uncompletedCount: 4,
        cpeFilter: {}
    },
    {
        _id: "01a8a13d-c7bf-408c-a804-d8dfce5c258d",
        orgId: "470053",
        name: "qaz",
        description: "zzzz",
        type: "dynamic",
        workflowCount: 4,
        completedCount: 2,
        uncompletedCount: 2,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "028df529-940c-4665-8cdd-28ca5734c35d",
        orgId: "470053",
        name: "ONT4",
        description: "ONT4",
        type: "dynamic",
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0043CE31$"
            }
        }
    },
    {
        _id: "0326e02c-5192-4bb5-95ae-1371c45238a6",
        orgId: "470053",
        name: "joyceCXNK01019BBF",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 6,
        completedCount: 5,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK01019BBF$"
            }
        }
    },
    {
        _id: "0399c28d-0946-4663-87c8-fd38286b88ae",
        orgId: "470053",
        name: "SISI-SOAK-E12",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 3,
        completedCount: 1,
        uncompletedCount: 2,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00CE959E$"
            }
        }
    },
    {
        _id: "05bbde92-15c4-4276-904a-3841b6f3e78c",
        orgId: "470053",
        name: "GS2037E-All",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 3,
        completedCount: 0,
        uncompletedCount: 3,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS2037E"
        }
    },
    {
        _id: "06634ae1-c7cd-433a-8b5e-0546b422940e",
        orgId: "470053",
        name: "27088-2",
        description: null,
        type: "static",
        allowInheritance: false,
        workflowCount: 4,
        completedCount: 0,
        uncompletedCount: 4,
        cpeFilter: {}
    },
    {
        _id: "06c96f8f-daba-48cb-a1e0-241cc2b9486a",
        orgId: "470053",
        name: "819G",
        description: "819G",
        type: "dynamic",
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "079c2560-08c9-4098-8be5-1b90b2a626b0",
        orgId: "470053",
        name: "ray-wap-4220",
        description: "",
        type: "dynamic",
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK007A3FD1$"
            }
        }
    },
    {
        _id: "0833cfdf-1b25-4613-9e27-8849b6eaafa0",
        orgId: "470053",
        name: "Jing_4227_CXNK00778D59",
        description: "",
        type: "dynamic",
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00778D59$"
            }
        }
    },
    {
        _id: "08574cbe-f7a4-47bd-ad1b-ddb4e774abd0",
        orgId: "470053",
        name: "joyce-u6",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 33,
        completedCount: 29,
        uncompletedCount: 4,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A5F0B6$"
            }
        }
    },
    {
        _id: "08717e82-3399-4a66-886c-7d658c23738e",
        orgId: "470053",
        name: "F94",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK007A3F94$"
            }
        }
    },
    {
        _id: "08c1106e-0137-4fa9-aeee-d4dbd5fa6e05",
        orgId: "470053",
        name: "ST-Soak-Static",
        description: "Yuan",
        type: "static",
        allowInheritance: true,
        workflowCount: 3,
        completedCount: 2,
        uncompletedCount: 1
    },
    {
        _id: "09cb3688-498b-44a3-a6a6-64ca1b1c5321",
        orgId: "470053",
        name: "grp_hulk_stress1",
        description: "Dynamic device group for automation",
        type: "dynamic",
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0088AD2E$"
            }
        }
    },
    {
        _id: "09cd600b-000c-4a6b-b7e7-d5db1b88a402",
        orgId: "470053",
        name: "joyceu4-2-CXNK00B57D5B",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00B57D5B$"
            }
        }
    },
    {
        _id: "0a157e3f-1475-483f-9f7e-640e859bdbdc",
        orgId: "470053",
        name: "sisi4220",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 13,
        completedCount: 12,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK007A3FD7$"
            }
        }
    },
    {
        _id: "0a88ff1c-6945-46ae-a2c2-f2a414974b52",
        orgId: "470053",
        name: "Testuser928",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "0acce059-5406-400f-9caf-25be53d53f04",
        orgId: "470053",
        name: "margo_4227w_CXNK00E4E52E",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00E4E52E$"
            }
        }
    },
    {
        _id: "0adf1c1d-a1a1-4c4a-9567-62bf3887d580",
        orgId: "470053",
        name: "hulk_topo1_wap0",
        description: "Dynamic device group for automation",
        type: "dynamic",
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0088AD2F$"
            }
        }
    },
    {
        _id: "0b8427b7-7bf3-43fb-9ec7-497ff32b4efc",
        orgId: "470053",
        name: "Fang_Test_GS4220E",
        description: "",
        type: "dynamic",
        workflowCount: 2,
        completedCount: 2,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0091F9A7$"
            }
        }
    },
    {
        _id: "0bd54b03-dd61-42f5-b532-5a2b591534b5",
        orgId: "470053",
        name: "ywu_844GE_LAB",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 2,
        completedCount: 1,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00982CE9$"
            }
        }
    },
    {
        _id: "0bf8ef59-9f83-4eb2-ada0-e11e597ac846",
        orgId: "470053",
        name: "joycefoundation",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {}
    },
    {
        _id: "0d361ff8-8108-4bd9-92e0-e8dfb502a7ee",
        orgId: "470053",
        name: "Test dynamic 23",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "844E-1",
            softwareVersion: "12.2.5.7.4",
            hardwareVersion: "3000219601",
            serialNumber: {
                $regex: "^CXNK$"
            },
            registrationId: {
                $regex: "^1234$"
            },
            opMode: "WAP"
        }
    },
    {
        _id: "0e1814e7-80c7-42e2-b551-6e8a4ad3ad94",
        orgId: "470053",
        name: "gloria_844E",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 3,
        completedCount: 3,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00284BB4$"
            }
        }
    },
    {
        _id: "0eec86b9-46b7-444b-a1f3-ae01be499bb6",
        orgId: "470053",
        name: "Jenny_GS4227E_CXNK00778D6C",
        description: "",
        type: "dynamic",
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00778D6C$"
            }
        }
    },
    {
        _id: "0f9946c8-74f8-40b3-a3d2-d5c9cf6a968e",
        orgId: "470053",
        name: "chenchen",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK008A79A9$"
            }
        }
    },
    {
        _id: "0fb13a98-2d1c-42c8-8d90-1ae5993e605b",
        orgId: "470053",
        name: "Jason_Temp_GM1020",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005881A0$"
            }
        }
    },
    {
        _id: "10210df3-a618-4c51-a4da-fac4b472755e",
        orgId: "470053",
        name: "CXNK1111",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00001111$"
            }
        }
    },
    {
        _id: "104740f9-7b62-47e2-8a98-b796aa47b181",
        orgId: "470053",
        name: "Clarence_U6E_3",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00FEEE49$"
            }
        }
    },
    {
        _id: "111dc32b-53eb-4e7f-98cb-a4bf01775809",
        orgId: "470053",
        name: "rt2210",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 1,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS4220E"
        }
    },
    {
        _id: "1173f378-0d03-4cff-9976-1f9184c949df",
        orgId: "470053",
        name: "sam_wireless_1020_satellite",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00589622$"
            }
        }
    },
    {
        _id: "11eeee67-3a71-4b8a-846c-859631036360",
        orgId: "470053",
        name: "Bryan - All Calix",
        description: "This is all Calix Devices, needed to test workflow defects",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "11fa0a3e-be54-4b48-a1db-e7b8b13a2558",
        orgId: "470053",
        name: "CXNK001D1D47",
        description: "",
        type: "dynamic",
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK001D1D47$"
            }
        }
    },
    {
        _id: "125888ba-91b5-422e-ba66-af5c47e7ecea",
        orgId: "470053",
        name: "joyce4220e",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A5F0B6$"
            }
        }
    },
    {
        _id: "1384a951-7701-4180-979b-6b9b80851b0c",
        orgId: "470053",
        name: "ywu_4220_2028_mul1",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A85113$"
            }
        }
    },
    {
        _id: "13c35861-ae44-455f-9084-d3cba5808927",
        orgId: "470053",
        name: "Jlee_RG_GS2020E",
        description: "EXOS-10702_Reproduce",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005AA951$"
            }
        }
    },
    {
        _id: "13f8c554-74d8-4e80-95c5-c2fd66931448",
        orgId: "470053",
        name: "joyceu6e-CXNK00FEEE3E",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00FEEE3E$"
            }
        }
    },
    {
        _id: "14a3123d-40b7-4e2e-a3ac-47cad4b0fba9",
        orgId: "470053",
        name: "autotest111",
        description: "",
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0
    },
    {
        _id: "14c7c19d-0902-4a78-a4f7-e42b7aff3a16",
        orgId: "470053",
        name: "SOAK_EXOS_E7_GM1028_SAT_CXNK00892D72",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00892D72$"
            }
        }
    },
    {
        _id: "14c88395-2434-4d6e-bb1f-6810617d75e8",
        orgId: "470053",
        name: "lisa_u6.x_gpon",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A4F5CD$"
            }
        }
    },
    {
        _id: "14d20c24-f6cd-4ca1-8cdd-9111a3e72877",
        orgId: "470053",
        name: "david.dong",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 1,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "14fea8ab-875d-462e-bb7f-879f90c79a2b",
        orgId: "470053",
        name: "kjbkll",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "150982d8-84fb-442d-890e-0f3bbf2a8648",
        orgId: "470053",
        name: "testreg657",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS4227E"
        }
    },
    {
        _id: "15f427ed-ae77-4427-9a57-2f00828dfb0f",
        orgId: "470053",
        name: "Test 22 Static",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "160ca723-da12-4d5b-896f-6e24845fcbfc",
        orgId: "470053",
        name: "1412757616346",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "1611e35f-3110-462a-955a-3cf03fb520e4",
        orgId: "470053",
        name: "xlzhang_eu",
        description: "xlzhang_eu",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00778D48$"
            }
        }
    },
    {
        _id: "1631c625-3ba8-4523-b058-615c8790336c",
        orgId: "470053",
        name: "steve-u4-2-dtm",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^MSTC00000203$"
            }
        }
    },
    {
        _id: "163c675a-963e-4a67-9bce-f1b73c21bd21",
        orgId: "470053",
        name: "chennai2",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS4227E",
            softwareVersion: "21.1.500.306"
        }
    },
    {
        _id: "16656f74-4534-4dfe-b6d0-988f0f546e82",
        orgId: "470053",
        name: "27088-5",
        description: null,
        type: "static",
        allowInheritance: false,
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {}
    },
    {
        _id: "167794ef-989d-4153-a141-03e3cfb128de",
        orgId: "470053",
        name: "hazel-2020RG",
        description: "ffffffffffffffffffffffffffff",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005763C1$"
            }
        }
    },
    {
        _id: "16983196-d74d-4f97-9246-0b35d7c58587",
        orgId: "470053",
        name: "anne_u6w",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00CE9464$"
            }
        }
    },
    {
        _id: "16c706cf-a47f-403c-80da-efb5debc271c",
        orgId: "470053",
        name: "WifiOTGAdityaxz",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "16df0288-9367-417c-814a-cb95014d3769",
        orgId: "470053",
        name: "gloria_844E_12.13",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 1,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00998199$"
            }
        }
    },
    {
        _id: "175e1d60-12e1-4cb4-aa44-02a62e743f7b",
        orgId: "470053",
        name: "EXOS-SOAK-E5",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A4F59B$"
            }
        }
    },
    {
        _id: "17aaab10-9c8f-47eb-ae4d-c8991d128624",
        orgId: "470053",
        name: "carl_2026",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005A8585$"
            }
        }
    },
    {
        _id: "17cc8227-aa0e-476f-8989-b61bf97bb229",
        orgId: "470053",
        name: "XL4227-798C",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            registrationId: {
                $regex: "^1234567890$"
            }
        }
    },
    {
        _id: "17f949b7-4a63-484c-b2cb-19c605c2a348",
        orgId: "470053",
        name: "test new reg 6",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            registrationId: {
                $regex: "^$"
            }
        }
    },
    {
        _id: "1847822c-2728-464a-a37c-cdf13007f05b",
        orgId: "470053",
        name: "Jason_Test_4227w_CXNK00CE96A2",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00CE96A2$"
            }
        }
    },
    {
        _id: "184ab4a3-5075-4fae-b31e-e1ae2b1fda37",
        orgId: "470053",
        name: "ansonu6x",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00A4F5FC$"
            }
        }
    },
    {
        _id: "186adb92-9675-45e8-b664-97b9931148df",
        orgId: "470053",
        name: "lijia",
        description: "",
        type: "static",
        allowInheritance: true,
        workflowCount: 20,
        completedCount: 12,
        uncompletedCount: 8
    },
    {
        _id: "186b9ac0-f5f2-463e-a619-5c091313afd9",
        orgId: "470053",
        name: "hffffffffg",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "189263c9-32af-4071-b7c5-f824c03b5418",
        orgId: "470053",
        name: "David Static",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "18b8f883-ddf7-475a-8342-2cbfff3ec3ff",
        orgId: "470053",
        name: "rmb-2026-s",
        description: "rmb-2026-s",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005A79EE$"
            }
        }
    },
    {
        _id: "18e5953b-07e8-46a5-9cd9-d377484a0eff",
        orgId: "470053",
        name: "Mar 16",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "844E-1",
            softwareVersion: "12.2.5.7.4",
            hardwareVersion: "3000219601",
            serialNumber: {
                $regex: "^CXNK1234567$"
            },
            opMode: "WAP"
        }
    },
    {
        _id: "190fb764-d387-43b6-bb6f-1cb6ddacee62",
        orgId: "470053",
        name: "hazel-Rep-2028-48:77:46:85:bf:d4",
        description: "hhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00766A18$"
            }
        }
    },
    {
        _id: "195ac619-6700-429b-b01b-0d98aea8463f",
        orgId: "470053",
        name: "demi-CXNK00B57D43-2028",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00B57D43$"
            }
        }
    },
    {
        _id: "198c7b51-f35b-466f-ad1e-6b00411b232b",
        orgId: "470053",
        name: "Jkong-CXNK001870A5",
        description: "844G",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK001870A5$"
            }
        }
    },
    {
        _id: "19c51f1d-7583-4448-81ac-054e058597f6",
        orgId: "470053",
        name: "test1_10_9",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "ZyXEL",
            modelName: {
                $in: [
                    "VMG4825-B10A"
                ]
            }
        }
    },
    {
        _id: "19db7030-b353-4db7-b204-52df8bc857fc",
        orgId: "470053",
        name: "CXNK00670776",
        description: "CXNK00670776",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00670776$"
            }
        }
    },
    {
        _id: "19f415a1-5e12-4bf9-8bd9-735603bab7dc",
        orgId: "470053",
        name: "Dynamiops",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "1a803d76-69e7-4620-9d04-e9090573fcb2",
        orgId: "470053",
        name: "TEST OLD CCO",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix"
        }
    },
    {
        _id: "1acd5334-f341-4ba4-9b24-31e50e1ec23e",
        orgId: "470053",
        name: "newdev2",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "1b09d8d8-2bfc-4fdb-92d5-cb72e0df17e6",
        orgId: "470053",
        name: "JingLi-GS4227W",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            serialNumber: {
                $regex: "^CXNK00CE9737$"
            }
        }
    },
    {
        _id: "1b206863-709a-4f74-86e0-750f90acb875",
        orgId: "470053",
        name: "bella-u4-dtm",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00B57D3A$"
            }
        }
    },
    {
        _id: "1b622113-a08b-4fd2-8eb9-e38feda7763b",
        orgId: "470053",
        name: "floria_844G",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK001CD4F9$"
            }
        }
    },
    {
        _id: "1b642801-a10f-45a1-80d5-40bfafdaef9b",
        orgId: "470053",
        name: "hazel-GM1020-OOB",
        description: "hhhhhhhhhhhhhhhhhhhhhhhhhhh",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00766970$"
            }
        }
    },
    {
        _id: "1b919e6f-bc0e-48b0-9a3f-29434250e2d6",
        orgId: "470053",
        name: "nancy-upgrade-1",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 10,
        completedCount: 10,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0093A5C2$"
            }
        }
    },
    {
        _id: "1c0d6121-947e-4be2-bcaa-8536a40edfa9",
        orgId: "470053",
        name: "GS4227-11",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: {
                $in: [
                    "GS4227"
                ]
            }
        }
    },
    {
        _id: "1c2174f9-d8fd-47fb-9556-c861da2d228d",
        orgId: "470053",
        name: "lisa_2037_front",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 2,
        completedCount: 2,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00FF9B45$"
            }
        }
    },
    {
        _id: "1c28c204-3765-4dae-bb92-8bfeacd59449",
        orgId: "470053",
        name: "GigaCenter_nj_dynamic_calix",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0020805D$"
            }
        }
    },
    {
        _id: "1cb8f71c-099d-41e2-bcbe-42ab765fa356",
        orgId: "470053",
        name: "cq_eagle_pilot_CXNK00E58246",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00E58246$"
            }
        }
    },
    {
        _id: "1cc205f5-5694-4f53-809e-9c24efc71d38",
        orgId: "470053",
        name: "Jason_GM1020_Topo3",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00892DA1$"
            }
        }
    },
    {
        _id: "1ceee4ad-a0be-4fb2-87cb-94548b5b4675",
        orgId: "470053",
        name: "nancy-test",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00B57D3F$"
            }
        }
    },
    {
        _id: "1d5498fc-cb55-4077-bb8d-2dd5f3ac45fa",
        orgId: "470053",
        name: "joyceu6x",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 1,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00AFB845$"
            }
        }
    },
    {
        _id: "1d88b50e-3bfc-440a-9d8b-41c555b5325a",
        orgId: "470053",
        name: "Regression evening",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "844E-1",
            softwareVersion: "12.2.5.7.4",
            hardwareVersion: "3000219601",
            serialNumber: {
                $regex: "^CVVVV$"
            },
            opMode: "WAP"
        }
    },
    {
        _id: "1d88cfc2-c5ba-4220-90ca-8999e24321c0",
        orgId: "470053",
        name: "MAr 16 static",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {}
    },
    {
        _id: "1d931012-7e75-4202-b264-1a09b78d929d",
        orgId: "470053",
        name: "GuoXiang_CXNK005A85A6",
        description: "",
        type: "dynamic",
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005A85A6$"
            }
        }
    },
    {
        _id: "1da92667-6a96-47b2-9cee-abad5abd9bf0",
        orgId: "470053",
        name: "fd-yuan-demi-u6x",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00AFB806$"
            }
        }
    },
    {
        _id: "1e0ceeea-9209-4c4b-9cff-1d527a6d6eb7",
        orgId: "470053",
        name: "carl_rg_2026",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK005764A0$"
            }
        }
    },
    {
        _id: "1e85d3e0-7ad2-45fe-a3f0-8a82d9720ed1",
        orgId: "470053",
        name: "GS2028lijiaCXNK00766295",
        description: "CXNK00766295",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS2028E",
            serialNumber: {
                $regex: "^CXNK00766295$"
            }
        }
    },
    {
        _id: "1e870d42-ba77-41c8-a4dc-10e3f2ce02e4",
        orgId: "470053",
        name: "27088-4",
        description: null,
        type: "static",
        allowInheritance: true,
        workflowCount: 2,
        completedCount: 0,
        uncompletedCount: 2,
        cpeFilter: {}
    },
    {
        _id: "1ec4f4b2-3e33-487a-9500-9a811ec11b5d",
        orgId: "470053",
        name: "lisa_foudationcsc_device",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GS2028E",
            softwareVersion: "21.3.500.384",
            opMode: "RG"
        }
    },
    {
        _id: "1f05b52b-30e7-4d5c-9b39-f8a61117f658",
        orgId: "470053",
        name: "ying_844E-4362",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 1,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK00284362$"
            }
        }
    },
    {
        _id: "1f28b274-238f-44cc-9375-107243ec6ce7",
        orgId: "470053",
        name: "ywu_4220",
        description: "ywu_4220_sat_1st_hop",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK008F61DC$"
            }
        }
    },
    {
        _id: "1f3f7dfd-e430-4b5d-bd9c-29c1213bbd32",
        orgId: "470053",
        name: "lisa_eagle_model",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            manufacturer: "Calix",
            modelName: "GM2037"
        }
    },
    {
        _id: "1f5776c8-5dc7-4b6d-ba6a-769e3dff2921",
        orgId: "470053",
        name: "XLU12-1020-NEW0718",
        description: null,
        type: "dynamic",
        allowInheritance: true,
        workflowCount: 2,
        completedCount: 2,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK0058899D$"
            }
        }
    },
    {
        _id: "1fa868a6-26a9-408e-bddf-983a1e91d63b",
        orgId: "470053",
        name: "hazel1-844GE",
        description: "hhhhhhhhhhhhhhhhhh",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            serialNumber: {
                $regex: "^CXNK001B82AF$"
            }
        }
    },
    {
        _id: "1ffaa05e-beb0-4a31-acba-5e64447004e9",
        orgId: "470053",
        name: "floria_dualstack",
        description: "",
        type: "static",
        allowInheritance: true,
        workflowCount: 1,
        completedCount: 0,
        uncompletedCount: 1
    },
    {
        _id: "201e7950-8979-4309-a900-b3b3581366bc",
        orgId: "470053",
        name: "test new reg 5",
        description: "",
        type: "dynamic",
        workflowCount: 0,
        completedCount: 0,
        uncompletedCount: 0,
        cpeFilter: {
            registrationId: {
                $regex: "^$"
            }
        }
    }
]

export const microsite_res = [
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
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/joytest2/logo/JSaGh.png",
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
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/cxvcx/logo/m9QlU.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "51946c13-0482-4bfe-9925-58c298aeaaf2",
        communityName: "zat-testing17",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/zat-testing17/logo/DK5mr.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6abe3138-9acc-48e9-ba98-a1bf22216fd2",
        communityName: "yuxing",
        communityDesc: "yuing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/yuxing/logo/7szuA.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "d1e63c5d-3e9c-48bf-a4ad-a9f9c0fbab33",
        communityName: "c-k12",
        communityDesc: "Community for K12 students",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-k12/logo/v47ee.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
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
        id: "b297e811-09f7-4e37-b1ee-525e655a2e08",
        communityName: "sdfsdf",
        communityDesc: "2312",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/sdfsdf/logo/SDXMT.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6ae67506-0438-4359-9656-e3e505c236b8",
        communityName: "at-test3",
        communityDesc: "don't delete",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-test3/logo/v8P47.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "3ab8dee0-7806-470e-adf4-5360e0cc655d",
        communityName: "aoh-hotspot-stg",
        communityDesc: "Augustine Home SmartTown",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/aoh-hotspot-stg/logo/54jaU.png",
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
        id: "cc0e8305-9be5-4dcd-a8a3-62ce13fb4378",
        communityName: "at-testing3",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing3/logo/LttbQ.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "511f89ed-d36a-4d3f-a408-09a7bc0f2909",
        communityName: "at-testing5",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing5/logo/Y574s.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "0f1e1908-c951-41f1-9425-2537ee84af3b",
        communityName: "c-ymca",
        communityDesc: "Community for YMCA members",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-ymca/logo/mTGVX.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
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
        id: "d4e26d1c-a8bd-4741-938a-0298de354d76",
        communityName: "at-testing6",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing6/logo/zZx8K.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6089d813-930a-4cda-915f-e04c740dccf9",
        communityName: "dfgfdgfd",
        communityDesc: "dfgfdgdf",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/dfgfdgfd/logo/8JrhC.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "6cc79baf-3776-40dd-a3a9-08ce0e2851c0",
        communityName: "ysl123",
        communityDesc: "ysl123",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/ysl123/logo/bWNaa.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "00070b14-fdd8-4990-a9f3-74989d4c5bce",
        communityName: "cvcvcv",
        communityDesc: "xcxcv",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/cvcvcv/logo/pCS2k.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "a62f5ddc-bd81-4a9a-9e7b-1f4e678130c4",
        communityName: "at-testing2",
        communityDesc: "testing",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/at-testing2/logo/2OwVw.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "d2275b66-7662-4fa5-9429-e20173da4f49",
        communityName: "sdffwresdfew",
        communityDesc: "ew",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/sdffwresdfew/logo/lV9GJ.png",
        communityType: "Non-permanent",
        status: "READY",
        isPredefinedCommunity: false
    },
    {
        id: "8f35d7c2-5490-4823-bdaf-3e3da8333f57",
        communityName: "c-library",
        communityDesc: "Community for library users",
        brandingType: "Default",
        logo: "https://stg-wifionthego-package.s3.us-west-2.amazonaws.com/eleven/PaAFW9yOyn/c-library/logo/poIZj.png",
        communityType: "Permanent",
        status: "READY",
        isPredefinedCommunity: true
    }
]