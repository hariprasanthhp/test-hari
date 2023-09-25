export const commandIqChartData = {
    "histories": [
        {
            "name": "CIQ",
            "date": 20221102,
            "value": 80,
            "time": 1667347200000
        },
        {
            "name": "CIQ",
            "date": 20221103,
            "value": 77,
            "time": 1667433600000
        },
        {
            "name": "CIQ",
            "date": 20221104,
            "value": 81,
            "time": 1667520000000
        },
        {
            "name": "CIQ",
            "date": 20221105,
            "value": 85,
            "time": 1667606400000
        },
        {
            "name": "CIQ",
            "date": 20221106,
            "value": 87,
            "time": 1667692800000
        },
        {
            "name": "CIQ",
            "date": 20221107,
            "value": 88,
            "time": 1667779200000
        },
        {
            "name": "CIQ",
            "date": 20221108,
            "value": 85,
            "time": 1667865600000
        }
    ]
};
export const commonSubscribersChartOptions = {
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
                "_id": "highcharts-i1lk8ep-33"
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
                "11/2/22",
                "11/3/22",
                "11/4/22",
                "11/5/22",
                "11/6/22",
                "11/7/22",
                "11/8/22"
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
                "text": "Number of Subscribers",
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
            "name": "CommandIQ",
            "data": [
                80,
                77,
                81,
                85,
                87,
                88,
                85
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
};

export const chartDataModifyArguement = [
    {
        "name": "CIQ",
        "date": 20221102,
        "value": 80,
        "time": 1667347200000
    },
    {
        "name": "CIQ",
        "date": 20221103,
        "value": 77,
        "time": 1667433600000
    },
    {
        "name": "CIQ",
        "date": 20221104,
        "value": 81,
        "time": 1667520000000
    },
    {
        "name": "CIQ",
        "date": 20221105,
        "value": 85,
        "time": 1667606400000
    },
    {
        "name": "CIQ",
        "date": 20221106,
        "value": 87,
        "time": 1667692800000
    },
    {
        "name": "CIQ",
        "date": 20221107,
        "value": 88,
        "time": 1667779200000
    },
    {
        "name": "CIQ",
        "date": 20221108,
        "value": 85,
        "time": 1667865600000
    }
]