export const usageByApplicatonChartOptions:any={
    "colors": [
        "#5ACFEA",
        "#B926F0",
        "#b3d974",
        "#FF8238",
        "#FF489D"
    ],
    "chart": {
        "type": "pie",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "exporting": {
        "enabled": false
    },
    "credits": {
        "enabled": false
    },
    "title": {
        "text": ""
    },
    "accessibility": {
        "announceNewData": {
            "enabled": true
        },
        "point": {
            "valueSuffix": "%"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "cursor": "pointer",
            "point": {
                "events": {}
            },
            "states": {
                "inactive": {
                    "enabled": false
                },
                "select": {
                    "enabled": true,
                    "color": null,
                    "borderWidth": 2,
                    "borderColor": "#AAAAAA"
                }
            },
            "dataLabels": {
                "enabled": true,
                "format": "{point.name}"
            }
        },
        "pie": {
            "size": "80%",
            "allowPointSelect": true,
            "cursor": "pointer",
            "borderWidth": 0,
            "dataLabels": {
                "enabled": true,
                "format": "{point.name}",
                "crop": false,
                "distance": 2,
                "overflow": "visible",
                "style": {
                    "width": "70px",
                    "height": "100px",
                    "fontFamily": "Source Sans Pro,Regular",
                    "fontSize": "14px",
                    "color": "#1A1F22",
                    "fontStyle": "normal",
                    "lineHeight": "18px"
                }
            }
        }
    },
    "tooltip": {
        "opacity": "1",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "legend": {
        "reversed": false,
        "align": "center",
        "itemStyle": {
            "fontSize": "10px"
        }
    },
    "series": [
        {
            "colorByPoint": true,
            "data": [
                {
                    "name": "Streaming Media",
                    "y": 9121244
                },
                {
                    "name": "Unknown and Other",
                    "y": 10884
                },
                {
                    "name": "Entertainment",
                    "y": 10444
                },
                {
                    "name": "Gaming",
                    "y": 6758
                },
                {
                    "name": "Other",
                    "y": 12471
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const socialHeatmapChartOptions:any={
    "exporting": {
        "enabled": false
    },
    "credits": {
        "enabled": false
    },
    "title": {
        "text": ""
    },
    "responsive": {
        "rules": [
            {
                "condition": {},
                "chartOptions": {
                    "chart": {
                        "color": "#4c4c4c"
                    },
                    "subtitle": {
                        "text": null
                    },
                    "navigator": {
                        "enabled": false
                    }
                },
                "_id": "highcharts-ug4lh2p-16"
            }
        ]
    },
    "chart": {
        "plotBorderWidth": 1,
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "className": "heat-map",
    "legend": {
        "enabled": false,
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "xAxis": {
        "categories": [
            "00 AM",
            "02",
            "04",
            "06",
            "08",
            "10",
            "12 PM",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24"
        ],
        "type": "datetime",
        "labels": {
            "autoRotationLimit": 80,
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        },
        "title": {
            "useHTML": true,
            "text": "<p class=\"gmt-text gmttext-app-tz\" id=\"gmt-text\">Time <span>(GMT+5:30)</span></p>",
            "align": "left",
            "style": {
                "stacking": "normal",
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "yAxis": {
        "categories": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "title": null,
        "reversed": true,
        "labels": {
            "align": "left",
            "reserveSpace": true,
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "style": {
            "stacking": "normal",
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colorAxis": {
        "min": 0,
        "max": 100,
        "stops": [
            [
                0,
                "#fefefe"
            ],
            [
                0.01,
                "#fafcfd"
            ],
            [
                0.1,
                "#dcebf3"
            ],
            [
                0.11,
                "#daeaf2"
            ],
            [
                0.2,
                "#c7dbe9"
            ],
            [
                0.21,
                "#d0dee8"
            ],
            [
                0.3,
                "#b4cce0"
            ],
            [
                0.31,
                "#b0c9df"
            ],
            [
                0.4,
                "#a0bdd7"
            ],
            [
                0.41,
                "#aec3d9"
            ],
            [
                0.49,
                "#6984ba"
            ],
            [
                0.5,
                "#f3df8f"
            ],
            [
                0.51,
                "#f0e0a3"
            ],
            [
                0.6,
                "#e9ba79"
            ],
            [
                0.61,
                "#e9b672"
            ],
            [
                0.7,
                "#df9257"
            ],
            [
                0.71,
                "#de8f55"
            ],
            [
                0.8,
                "#ce7a50"
            ],
            [
                0.81,
                "#ca6a3a"
            ],
            [
                0.9,
                "#b84822"
            ],
            [
                0.99,
                "#b74620"
            ],
            [
                1,
                "#b74620"
            ]
        ]
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "lang": {
        "noData": "No Data Available"
    },
    "series": [
        {
            "type": "heatmap",
            "animation": {
                "duration": 1000
            },
            "data": [
                [
                    0,
                    0,
                    53
                ],
                [
                    1,
                    0,
                    58
                ],
                [
                    2,
                    0,
                    49
                ],
                [
                    3,
                    0,
                    44
                ],
                [
                    4,
                    0,
                    44
                ],
                [
                    5,
                    0,
                    44
                ],
                [
                    6,
                    0,
                    44
                ],
                [
                    7,
                    0,
                    44
                ],
                [
                    8,
                    0,
                    44
                ],
                [
                    9,
                    0,
                    44
                ],
                [
                    10,
                    0,
                    37
                ],
                [
                    11,
                    0,
                    31
                ],
                [
                    0,
                    1,
                    31
                ],
                [
                    1,
                    1,
                    37
                ],
                [
                    2,
                    1,
                    35
                ],
                [
                    3,
                    1,
                    36
                ],
                [
                    4,
                    1,
                    36
                ],
                [
                    5,
                    1,
                    40
                ],
                [
                    6,
                    1,
                    51
                ],
                [
                    7,
                    1,
                    41
                ],
                [
                    8,
                    1,
                    32
                ],
                [
                    9,
                    1,
                    31
                ],
                [
                    10,
                    1,
                    32
                ],
                [
                    11,
                    1,
                    27
                ],
                [
                    0,
                    2,
                    10
                ],
                [
                    1,
                    2,
                    16
                ],
                [
                    2,
                    2,
                    14
                ],
                [
                    3,
                    2,
                    19
                ],
                [
                    4,
                    2,
                    25
                ],
                [
                    5,
                    2,
                    39
                ],
                [
                    6,
                    2,
                    44
                ],
                [
                    7,
                    2,
                    44
                ],
                [
                    8,
                    2,
                    44
                ],
                [
                    9,
                    2,
                    44
                ],
                [
                    10,
                    2,
                    44
                ],
                [
                    11,
                    2,
                    44
                ],
                [
                    0,
                    3,
                    44
                ],
                [
                    1,
                    3,
                    43
                ],
                [
                    2,
                    3,
                    42
                ],
                [
                    3,
                    3,
                    44
                ],
                [
                    4,
                    3,
                    44
                ],
                [
                    5,
                    3,
                    44
                ],
                [
                    6,
                    3,
                    44
                ],
                [
                    7,
                    3,
                    44
                ],
                [
                    8,
                    3,
                    44
                ],
                [
                    9,
                    3,
                    44
                ],
                [
                    10,
                    3,
                    44
                ],
                [
                    11,
                    3,
                    44
                ],
                [
                    0,
                    4,
                    44
                ],
                [
                    1,
                    4,
                    43
                ],
                [
                    2,
                    4,
                    43
                ],
                [
                    3,
                    4,
                    46
                ],
                [
                    4,
                    4,
                    46
                ],
                [
                    5,
                    4,
                    46
                ],
                [
                    6,
                    4,
                    46
                ],
                [
                    7,
                    4,
                    42
                ],
                [
                    8,
                    4,
                    42
                ],
                [
                    9,
                    4,
                    42
                ],
                [
                    10,
                    4,
                    42
                ],
                [
                    11,
                    4,
                    42
                ],
                [
                    0,
                    5,
                    42
                ],
                [
                    1,
                    5,
                    46
                ],
                [
                    2,
                    5,
                    44
                ],
                [
                    3,
                    5,
                    46
                ],
                [
                    4,
                    5,
                    46
                ],
                [
                    5,
                    5,
                    46
                ],
                [
                    6,
                    5,
                    46
                ],
                [
                    7,
                    5,
                    42
                ],
                [
                    8,
                    5,
                    42
                ],
                [
                    9,
                    5,
                    42
                ],
                [
                    10,
                    5,
                    42
                ],
                [
                    11,
                    5,
                    42
                ],
                [
                    0,
                    6,
                    42
                ],
                [
                    1,
                    6,
                    46
                ],
                [
                    2,
                    6,
                    49
                ],
                [
                    3,
                    6,
                    58
                ],
                [
                    4,
                    6,
                    56
                ],
                [
                    5,
                    6,
                    58
                ],
                [
                    6,
                    6,
                    58
                ],
                [
                    7,
                    6,
                    52
                ],
                [
                    8,
                    6,
                    52
                ],
                [
                    9,
                    6,
                    52
                ],
                [
                    10,
                    6,
                    53
                ],
                [
                    11,
                    6,
                    53
                ]
            ],
            "dataLabels": {
                "enabled": false
            }
        }
    ],
    "plotOptions": {
        "series": {
            "point": {
                "events": {}
            }
        }
    }
}