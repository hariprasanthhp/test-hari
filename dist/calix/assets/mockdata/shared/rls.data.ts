export const Regions: any = [
    {
        "id": "064e9986-939c-4180-89e4-62dce0b6bdd7",
        "name": "Default",
        "fqn": "DEVICE=CMS11,REGION=Default",
        "isDeleted": false,
        "subRegions": []
    },
    {
        "id": "3b208e8e-d95e-47bc-9fa4-04d009486403",
        "name": "Texas",
        "fqn": "DEVICE=CMS11,REGION=Texas",
        "isDeleted": false,
        "subRegions": [
            "345eeb64-7924-4d9e-b122-7a5648dac44d"
        ]
    }
]


export const Locations: any = [
    {
        "id": "03ec49d0-0402-42f2-a38b-fac869619a96",
        "name": "Houston",
        "fqn": "DEVICE=CMS11,REGION=Texas,NETWORK_GROUP=Houston",
        "isDeleted": false
    },
    {
        "id": "7030b6a4-fa59-4f67-b7e1-74a6e681bfa1",
        "name": "Addison",
        "fqn": "DEVICE=CMS11,REGION=Texas,REGION=Dallas,NETWORK_GROUP=Addison",
        "isDeleted": false
    }
]


export const Systems: any = [
    {
        "uuid": "edda0781-774a-4d18-a024-fc43cb5c0c23",
        "name": "93.104",
        "fqn": "DEVICE=93.104",
        "isDeleted": false
    }
]

export const Interfaces: any = [{ "uuid": "dd301712-18a4-47c2-ba40-979318f9b22e", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp1", "name": "1/2/xp1" }, { "uuid": "d1f26a84-b860-4d39-a8cb-399e429610da", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp2", "name": "1/2/xp2" }, { "uuid": "f80b4e10-3725-4c28-a63b-96dff57cdeeb", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp3", "name": "1/2/xp3" }, { "uuid": "7f318b48-05ea-4b87-b0f2-77bc0e8d67b8", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp4", "name": "1/2/xp4" }, { "uuid": "66f22175-22f8-499a-bc66-06d33c2abfee", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp5", "name": "1/2/xp5" }, { "uuid": "34ee8ada-16e8-4ff3-a898-b1d1e6139446", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp6", "name": "1/2/xp6" }, { "uuid": "3e4f7405-1fd2-43aa-8b21-4b465eb458f1", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp7", "name": "1/2/xp7" }, { "uuid": "5afb4239-17bd-4f23-ac3e-e4a5f9ae1aed", "fqn": "DEVICE=Health_Testbed_10.245.93.103,PHY=1/2/xp8", "name": "1/2/xp8" }]

export const Ont: any = [{ "uuid": "bd069f0e-0897-4953-88df-f68ec362ee6a", "fqn": "DEVICE=Health_Testbed_10.245.93.103,ont-id=xgs_emerald", "name": "xgs_emerald", "fsan": "CXNK00CE96D7", "model": "GS4227W" }, { "uuid": "cff98ede-a8e2-4fcb-8d89-3046180f7f46", "fqn": "DEVICE=Health_Testbed_10.245.93.103,ont-id=flo99s", "name": "flo99s", "fsan": "GPON2210006E", "model": "XG-99S" }, { "uuid": "b4ee4d73-c6b0-44b9-91ba-8efa582900c8", "fqn": "DEVICE=Health_Testbed_10.245.93.103,ont-id=CXNK431732", "name": "CXNK431732", "fsan": "CXNK00431732", "model": "GP1100X" }]
