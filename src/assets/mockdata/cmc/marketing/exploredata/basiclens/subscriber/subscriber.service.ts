export const ActiveSubscribercount:any = {
            "activeSubscribers": 402
        }

export const Usercount: any = {
    "streamingUsers": 19,
    "gamingUsers": 321,
    "wfhUsers": 1
}

export const SubscriberDataUsage: any = [
    {
        "0-75": 372
    },
    {
        "76-200": 5
    },
    {
        "201-500": 1
    },
    {
        "501-1000": 1
    },
    {
        "1001-2000": 3
    },
    {
        "2001-3000": 3
    },
    {
        "3001+": 17
    }
]

export const streamingSubscribers: any = {
    "categories": [
        "<20M",
        "20M",
        "50M",
        "500M",
        "1G",
        "1000M"
    ],
    "series": [
        {
            "name": "Streaming",
            "data": [
                13,
                0,
                0,
                0,
                3,
                1
            ]
        },
        {
            "name": "Non-Streaming",
            "data": [
                102,
                11,
                90,
                194,
                8,
                0
            ]
        }
    ],
    "totals": {
        "<20M": 115,
        "20M": 11,
        "50M": 90,
        "500M": 194,
        "1G": 11,
        "1000M": 1
    }
}

export const serviceGamingSubscribers: any = {
    "categories": [
        "<20M",
        "20M",
        "50M",
        "500M",
        "1000M",
        "1G"
    ],
    "series": [
        {
            "name": "Gaming",
            "data": [
                78,
                11,
                30,
                194,
                0,
                8
            ]
        },
        {
            "name": "Non-Gaming",
            "data": [
                37,
                0,
                60,
                0,
                1,
                3
            ]
        }
    ],
    "totals": {
        "<20M": 115,
        "20M": 11,
        "50M": 90,
        "500M": 194,
        "1000M": 1,
        "1G": 11
    }
}

export const serviceWfhSubscribers: any = {
    "categories": [
        "<20M",
        "20M",
        "50M",
        "500M",
        "1G",
        "1000M"
    ],
    "series": [
        {
            "name": "WFH",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "name": "Non-WFH",
            "data": [
                115,
                11,
                90,
                194,
                11,
                1
            ]
        }
    ],
    "totals": {
        "<20M": 115,
        "20M": 11,
        "50M": 90,
        "500M": 194,
        "1G": 11,
        "1000M": 1
    }
}

export const subscriberActivityTrendsData: any = {
    "streaming": [
        {
            "2022-04": 13
        },
        {
            "2022-05": 13
        },
        {
            "2022-06": 14
        },
        {
            "2022-07": 14
        },
        {
            "2022-08": 14
        },
        {
            "2022-09": 17
        }
    ],
    "work from home": [
        {
            "2022-04": 0
        },
        {
            "2022-05": 0
        },
        {
            "2022-06": 0
        },
        {
            "2022-07": 0
        },
        {
            "2022-08": 0
        },
        {
            "2022-09": 0
        }
    ],
    "gaming": [
        {
            "2022-04": 504
        },
        {
            "2022-05": 504
        },
        {
            "2022-06": 175
        },
        {
            "2022-07": 175
        },
        {
            "2022-08": 179
        },
        {
            "2022-09": 321
        }
    ]
}

export const dataUsageTrendsMockData: any = {
    "categories": [
        "2022-04",
        "2022-05",
        "2022-06",
        "2022-07",
        "2022-08",
        "2022-09"
    ],
    "series": [
        {
            "name": "Total Usage(TB)",
            "data": [
                50550,
                134183,
                21098910,
                69312468,
                32603773,
                46353927
            ]
        },
        {
            "name": "Streaming Usage(TB)",
            "data": [
                21998,
                56881,
                21015771,
                69234660,
                32564311,
                46286495
            ]
        }
    ]
}

export const devicePerHousehold: any = [
    {
        "0-4": 0
    },
    {
        "5-9": 0
    },
    {
        "10-14": 0
    },
    {
        "15-19": 0
    },
    {
        "20+": 0
    }
]

// drilldown usercount apis
export const subscriberDataUsageDrilldown:any=[
    {
        "accountNumber": "660001",
        "name": "chen1",
        "phoneNumber": "6600000001",
        "serviceAddress": "house1",
        "billingAddress": "street1",
        "email": "chen1@gmail.com",
        "usoc": "data<20M",
        "serviceTier": "<20M",
        "region": "Tamil Nadu",
        "location": "Chennai",
        "technologyType": "Fiber",
        "customerType": "Residential",
        "optOut": "N",
        "downloadSpeed": 10,
        "uploadSpeed": 10,
        "attainableRate": 0,
        "downUsage": 0,
        "upUsage": 12.2,
        "totalUsage": 12.2
    },
   ]

export const streamingSubscriberDrilldown:any=[{
    "accountNumber": "510030",
    "name": "Pune30 sub3",
    "phoneNumber": "5100000030",
    "serviceAddress": "India",
    "billingAddress": "PO Box 123 IN 12345",
    "email": "pune30@gmail.com",
    "usoc": "data<20M",
    "serviceTier": "<20M",
    "region": "Maharashtra",
    "location": "Pune",
    "technologyType": "Fiber",
    "customerType": "Residential",
    "optOut": "Y",
    "downloadSpeed": 10,
    "uploadSpeed": 10,
    "attainableRate": 0,
    "streamingUsage": 491.2,
    "totalUsage": 566.5
}
]
export const gamingSubscriberDrilldown:any=[
    {
        "accountNumber": "660282",
        "name": "chen282",
        "phoneNumber": "6600000282",
        "serviceAddress": "house282",
        "billingAddress": "street282",
        "email": "chen282@gmail.com",
        "usoc": "data-500M",
        "serviceTier": "500M",
        "region": "Tamil Nadu",
        "location": "Chennai",
        "technologyType": "Fiber",
        "customerType": "Residential",
        "optOut": "N",
        "downloadSpeed": 500,
        "uploadSpeed": 500,
        "attainableRate": 0,
        "gamingUsage": 3,
        "totalUsage": 17.9
    },
    ]
export const wfhSubscriberDrilldown:any=[{
    
        "accountNumber": "510031",
        "name": "Pune31 newer",
        "phoneNumber": "5100000031",
        "serviceAddress": "India",
        "billingAddress": "PO Box 456 IN 12345",
        "email": "pune31@gmail.com",
        "usoc": "data<20M",
        "serviceTier": "<20M",
        "region": "Maharashtra",
        "location": "Pune",
        "technologyType": "Fiber",
        "customerType": "Residential",
        "optOut": "N",
        "downloadSpeed": 10,
        "uploadSpeed": 10,
        "attainableRate": 0,
        "wfhTime": 0
    }]

