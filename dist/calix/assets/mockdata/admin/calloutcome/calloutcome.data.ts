export const callOutComeStatus: any = [
    {
        "uuid": "5681ccc0-42b6-4603-a0fd-b4a94a5e28f5",
        "orgId": 10009,
        "name": "Account Inquiry",
        "ctime": "2021-10-06T12:30:33.000+0000",
        "mtime": "2022-08-05T13:34:10.000+0000",
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
        "uuid": null,
        "orgId": 10009,
        "name": "Escalated",
        "ctime": "2022-10-31T11:08:05.000+0000",
        "mtime": "2022-10-31T11:08:05.000+0000",
        "selection": "single",
        "categories": null
    },
    {
        "uuid": null,
        "orgId": 10009,
        "name": "Resolved",
        "ctime": "2022-10-31T11:08:05.000+0000",
        "mtime": "2022-10-31T11:08:05.000+0000",
        "selection": "multiple",
        "categories": {
            "IT": {
                "subcategories": [
                    "PC/laptop issue",
                    "3rd party software issue",
                    "Email setup/issue"
                ],
                "selection": "multiple"
            },
            "WAN": {
                "subcategories": [
                    "No speed",
                    "Poor speeds",
                    "WAN saturation"
                ],
                "selection": "multiple"
            },
            "Other": {
                "subcategories": [
                    "Unknown"
                ],
                "selection": "multiple"
            },
            "Wi-Fi": {
                "subcategories": [
                    "Wi-Fi interference",
                    "SSID/password issue",
                    "Wi-Fi coverage"
                ],
                "selection": "multiple"
            },
            "Gateway": {
                "subcategories": [
                    "Upgrade",
                    "Replacement",
                    "Reboot",
                    "Gateway offline",
                    "Gateway ethernet cable"
                ],
                "selection": "multiple"
            },
            "Hardware": {
                "subcategories": [
                    "Faulty device",
                    "End of life device",
                    "Mesh unit unresponsive",
                    "Inside wire issue",
                    "OSS/BSS programming issue",
                    "STB unresponsive"
                ],
                "selection": "multiple"
            },
            "Education": {
                "subcategories": [
                    "Internet education",
                    "CommandIQ education",
                    "IPTV education"
                ],
                "selection": "multiple"
            },
            "Client Devices": {
                "subcategories": [
                    "Legacy device",
                    "Low PHY rate",
                    "Low signal strength",
                    "Low SNR"
                ],
                "selection": "multiple"
            }
        }
    },
    {
        "uuid": null,
        "orgId": 10009,
        "name": "Truck Roll",
        "ctime": "2022-10-31T11:08:05.000+0000",
        "mtime": "2022-10-31T11:08:05.000+0000",
        "selection": "single",
        "categories": {
            "Hardware issue": {
                "subcategories": null,
                "selection": null
            },
            "User-owned equipment": {
                "subcategories": null,
                "selection": null
            }
        }
    },
    {
        "uuid": "d93c7025-3622-4ac7-8fb3-401efeb1e78f",
        "orgId": 10009,
        "name": "Other",
        "ctime": "2022-10-27T14:54:44.000+0000",
        "mtime": "2022-10-27T14:54:44.000+0000",
        "selection": "single",
        "categories": {}
    }
]

export const updateStatusDetails: any = {
    "uuid": "361bb4b8-420a-44f8-865a-cca3ae96c66d",
    "orgId": 10009,
    "name": "Others",
    "ctime": "2022-10-31T12:26:28.000+0000",
    "mtime": "2022-10-31T12:26:28.000+0000",
    "selection": "single",
    "categories": {}
}

export const addStatusDetails: any = {
    "uuid": "4ff6cb13-d1d7-4d8a-9e39-c526ce1c2210",
    "orgId": 10009,
    "name": "otherenquiry",
    "ctime": "2022-10-31T12:38:04.000+0000",
    "mtime": "2022-10-31T12:38:04.000+0000",
    "selection": "multiple",
    "categories": {
        "": {
            "subcategories": [],
            "selection": "multiple"
        }
    }
}
export const statusTypes: any = [
    {
        "statusTypeName": "Truck Roll",
        "statusTypeCode": "T_ROLL"
    },
    {
        "statusTypeName": "Escalated",
        "statusTypeCode": "ESCLTD"
    },
    {
        "statusTypeName": "First Call Resolution",
        "statusTypeCode": "FCR"
    }
]
export const addDetailsOptions = {
    "statusForCategories": true,
    "subCategories": [
        "Test1",
        "Test2"
    ],
    "categoryName": "Test ",
    "subCategoryName": "",
    "enableAddDetailsOption": true,
    "enableSubCategoryName": false
}
export const detailsOptions = {
    "statusForCategories": true,
    "subCategories": [
        "Test1",
        "Test2",
        "Test3"
    ],
    "categoryName": "Test c1",
    "subCategoryName": "Test3",
    "enableAddDetailsOption": true,
    "enableSubCategoryName": false
}
export const enableCategories = [
    {
        "statusForCategories": true,
        "subCategories": [
            "Test1",
            "Test2",
            "Test3"
        ],
        "categoryName": "Test c1",
        "subCategoryName": "",
        "enableAddDetailsOption": true
    },
    {
        "statusForCategories": true,
        "subCategories": [
            "Test1",
            "Test2"
        ],
        "categoryName": "Test c2",
        "subCategoryName": "",
        "enableAddDetailsOption": true
    }
]
export const editData = {
    "uuid": "458517fc-169a-430b-91a3-c9757b9669d4",
    "orgId": 470053,
    "name": "Test category",
    "statusType": "T_ROLL",
    "ctime": "2023-01-17T04:55:55.000+0000",
    "mtime": "2023-01-17T04:55:55.000+0000",
    "selection": "multiple",
    "categories": {
        "Test c1": {
            "subcategories": [
                "Test1",
                "Test2"
            ],
            "selection": "multiple"
        },
        "Test c2": {
            "subcategories": [
                "Test1",
                "Test2"
            ],
            "selection": "multiple"
        }
    }
}