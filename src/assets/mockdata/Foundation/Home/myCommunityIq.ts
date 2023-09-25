export const mycommunityiqChart = {
    "exporting": {
        "enabled": false
    },
    "credits": {
        "enabled": false
    },
    "title": {
        "text": null
    },
    "responsive": {
        "rules": [
            {
                "condition": {},
                "_id": "highcharts-2lxf2v0-247"
            }
        ]
    },
    "chart": {
        "type": "line",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "12px",
            "color": "#4c4c4c"
        },
        "plotBorderWidth": 1
    },
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#B926F0",
        "#FF8238",
        "#029A7C",
        "#F7C343",
        "#FF489D",
        "#F7500F",
        "#0279ff",
        "#82bf00",
        "#836ee8",
        "#DE428E",
        "#6574A6",
        "#41EAD4",
        "#BB8B1A",
        "#A44A3F",
        "#277DA1",
        "#FFC9B9",
        "#219EBC",
        "#7678ed",
        "#8a817c",
        "#7f7f7f",
        "#136f63",
        "#92b6b1",
        "#662e9b"
    ],
    "xAxis": [
        {
            "min": 0,
            "gridLineWidth": 1,
            "categories": [
                "10/23/22",
                "10/24/22",
                "10/25/22",
                "10/26/22",
                "10/27/22",
                "10/28/22",
                "10/29/22"
            ],
            "tickmarkPlacement": "on",
            "showLastLabel": true,
            "tickInterval": 2,
            "labels": {
                "rotation": -25
            },
            "index": 0,
            "isX": true
        }
    ],
    "yAxis": [
        {
            "min": 0,
            "softMax": 1,
            "allowDecimals": false,
            "title": {
                "text": "Number of Systems",
                "style": {
                    "color": "#727272"
                }
            },
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "13px",
                "color": "#4c4c4c"
            },
            "index": 0
        }
    ],
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "symbolRadius": 100,
        "enabled": true
    },
    "tooltip": {
        "shared": true,
        "crosshairs": true
    },
    "series": [
        {
            "name": "SmartTown Wi-Fi",
            "data": [
                12,
                12,
                12,
                12,
                10,
                10,
                11
            ]
        },
        {
            "name": "Eduroam",
            "data": [
                11,
                11,
                11,
                11,
                5,
                5,
                5
            ]
        },
        {
            "name": "SmallBizIQ",
            "data": [
                2,
                2,
                2,
                3,
                3,
                2,
                2
            ]
        }
    ],
    "plotOptions": {
        "series": {
            "cursor": "pointer",
            "groupPadding": 0.1,
            "marker": {
                "enabled": false,
                "symbol": "circle",
                "radius": 2,
                "states": {
                    "hover": {
                        "enabled": true
                    }
                }
            },
            "pointPlacement": "on",
            "point": {
                "events": {}
            }
        },
        "states": {
            "inactive": {
                "enabled": false
            }
        }
    }
}

export const makeParallelRequest = [
    [
        {
            "time": 1667347200000,
            "count": 11
        },
        {
            "time": 1667433600000,
            "count": 12
        },
        {
            "time": 1667520000000,
            "count": 12
        },
        {
            "time": 1667606400000,
            "count": 12
        },
        {
            "time": 1667692800000,
            "count": 12
        },
        {
            "time": 1667779200000,
            "count": 12
        },
        {
            "time": 1667865600000,
            "count": 13
        }
    ],
    [
        {
            "time": 1667347200000,
            "count": 5
        },
        {
            "time": 1667433600000,
            "count": 5
        },
        {
            "time": 1667520000000,
            "count": 5
        },
        {
            "time": 1667606400000,
            "count": 5
        },
        {
            "time": 1667692800000,
            "count": 5
        },
        {
            "time": 1667779200000,
            "count": 5
        },
        {
            "time": 1667865600000,
            "count": 5
        }
    ],
    {
        "histories": [
            {
                "name": "SMALLBIZIQ",
                "date": 20221102,
                "value": 3,
                "time": 1667347200000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221103,
                "value": 3,
                "time": 1667433600000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221104,
                "value": 4,
                "time": 1667520000000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221105,
                "value": 4,
                "time": 1667606400000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221106,
                "value": 4,
                "time": 1667692800000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221107,
                "value": 5,
                "time": 1667779200000
            },
            {
                "name": "SMALLBIZIQ",
                "date": 20221108,
                "value": 4,
                "time": 1667865600000
            }
        ]
    }
]