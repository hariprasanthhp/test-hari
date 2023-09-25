export const subscriberDataUsageChartOption:any={
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
                "_id": "highcharts-uztd4vc-16"
            }
        ]
    },
    "colors": [
        "#0027FF"
    ],
    "chart": {
        "type": "column",
        "inverted": false,
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        },
        "events": {}
    },
    "xAxis": {
        "categories": [
            "0GB-75GB",
            "76GB-200GB",
            "201GB-500GB",
            "501GB-1.00TB",
            "1.01TB-2.00TB",
            "2.01TB-3.00TB",
            "3.01TB+"
        ],
        "crosshair": true,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40,
            "rotation": -25
        },
        "title": {
            "useHTML": true,
            "text": "<p class=\"giga-text\" id=\"giga\" style=\"font-size:12px !important;margin-top:5px;\">Usage</p>",
            "align": "middle",
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
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "reversedStacks": false,
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "text": "Subscribers"
        },
        "stackLabels": {
            "enabled": true,
            "allowOverlap": true,
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
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "maxPointWidth": 24,
            "borderRadius": 0,
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
            }
        },
        "column": {
            "stacking": "normal",
            "minPointLength": 3,
            "borderWidth": 0,
            "dataLabels": {
                "enabled": false
            }
        }
    },
    "legend": {
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "series": [
        {
            "showInLegend": false,
            "data": [
                {
                    "y": 417
                },
                {
                    "y": 0
                },
                {
                    "y": 6
                },
                {
                    "y": 1
                },
                {
                    "y": 3
                },
                {
                    "y": 3
                },
                {
                    "y": 15
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const streamingSubscriberChartOption:any={
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
                "_id": "highcharts-4d7e42f-16"
            }
        ]
    },
    "chart": {
        "type": "column",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#FF489D",
        "#B926F0",
        "#F7C343",
        "#5ACFEA",
        "#836ee8",
        "#ff8238",
        "#029a7c",
        "#f7c343",
        "#ff489d",
        "#28527a",
        "#5ACFEA",
        "#e9896a",
        "#b3d974",
        "#5ACFEA",
        "#5ACFEA",
        "#FF8238",
        "#ff96c5",
        "#ffcccd",
        "#efdeco",
        "#DB7093",
        "#DA70D6",
        "#D8BFD8"
    ],
    "xAxis": {
        "categories": [
            "<20M",
            "20M",
            "50M",
            "500M",
            "1G",
            "1000M"
        ],
        "crosshair": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "reversedStacks": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "text": "Subscribers"
        },
        "stackLabels": {
            "enabled": true,
            "allowOverlap": true,
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "legend": {
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "maxPointWidth": 16,
            "borderRadius": 0,
            "cursor": "pointer",
            "states": {
                "inactive": {
                    "enabled": false
                },
                "select": {
                    "color": null,
                    "borderWidth": 2,
                    "borderColor": "Grey"
                }
            },
            "point": {
                "events": {}
            },
            "marker": {
                "enabled": false
            },
            "events": {}
        },
        "column": {
            "stacking": "normal",
            "minPointLength": 3,
            "borderWidth": 0
        }
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "Streaming",
            "data": [
                {
                    "y": 13
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 3
                },
                {
                    "y": 1
                }
            ]
        },
        {
            "name": "Non-Streaming",
            "data": [
                {
                    "y": 102
                },
                {
                    "y": 11
                },
                {
                    "y": 90
                },
                {
                    "y": 194
                },
                {
                    "y": 8
                },
                {
                    "y": 0
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const gamingSubscriberChartOption:any={
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
                "_id": "highcharts-ky2ai6d-16"
            }
        ]
    },
    "chart": {
        "type": "column",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#FF489D",
        "#B926F0",
        "#F7C343",
        "#5ACFEA",
        "#836ee8",
        "#ff8238",
        "#029a7c",
        "#f7c343",
        "#ff489d",
        "#28527a",
        "#5ACFEA",
        "#e9896a",
        "#b3d974",
        "#5ACFEA",
        "#5ACFEA",
        "#FF8238",
        "#ff96c5",
        "#ffcccd",
        "#efdeco",
        "#DB7093",
        "#DA70D6",
        "#D8BFD8"
    ],
    "xAxis": {
        "categories": [
            "<20M",
            "20M",
            "50M",
            "500M",
            "1000M",
            "1G"
        ],
        "crosshair": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "reversedStacks": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "text": "Subscribers"
        },
        "stackLabels": {
            "enabled": true,
            "allowOverlap": true,
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "legend": {
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "maxPointWidth": 16,
            "borderRadius": 0,
            "cursor": "pointer",
            "states": {
                "inactive": {
                    "enabled": false
                },
                "select": {
                    "color": null,
                    "borderWidth": 2,
                    "borderColor": "Grey"
                }
            },
            "point": {
                "events": {}
            },
            "marker": {
                "enabled": false
            },
            "events": {}
        },
        "column": {
            "stacking": "normal",
            "minPointLength": 3,
            "borderWidth": 0
        }
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "Gaming",
            "data": [
                {
                    "y": 78
                },
                {
                    "y": 11
                },
                {
                    "y": 30
                },
                {
                    "y": 194
                },
                {
                    "y": 0
                },
                {
                    "y": 8
                }
            ]
        },
        {
            "name": "Non-Gaming",
            "data": [
                {
                    "y": 37
                },
                {
                    "y": 0
                },
                {
                    "y": 60
                },
                {
                    "y": 0
                },
                {
                    "y": 1
                },
                {
                    "y": 3
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const wfhSubscribersChartOption:any={
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
                "_id": "highcharts-aplmf1w-18"
            }
        ]
    },
    "chart": {
        "type": "column",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#FF489D",
        "#B926F0",
        "#F7C343",
        "#5ACFEA",
        "#836ee8",
        "#ff8238",
        "#029a7c",
        "#f7c343",
        "#ff489d",
        "#28527a",
        "#5ACFEA",
        "#e9896a",
        "#b3d974",
        "#5ACFEA",
        "#5ACFEA",
        "#FF8238",
        "#ff96c5",
        "#ffcccd",
        "#efdeco",
        "#DB7093",
        "#DA70D6",
        "#D8BFD8"
    ],
    "xAxis": {
        "categories": [
            "<20M",
            "20M",
            "50M",
            "500M",
            "1G",
            "1000M"
        ],
        "crosshair": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "reversedStacks": false,
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "title": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "text": "Subscribers"
        },
        "stackLabels": {
            "enabled": true,
            "allowOverlap": true,
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        }
    },
    "legend": {
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "maxPointWidth": 16,
            "borderRadius": 0,
            "cursor": "pointer",
            "states": {
                "inactive": {
                    "enabled": false
                },
                "select": {
                    "color": null,
                    "borderWidth": 2,
                    "borderColor": "Grey"
                }
            },
            "point": {
                "events": {}
            },
            "marker": {
                "enabled": false
            },
            "events": {}
        },
        "column": {
            "stacking": "normal",
            "minPointLength": 3,
            "borderWidth": 0
        }
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "WFH",
            "data": [
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                }
            ]
        },
        {
            "name": "Non-WFH",
            "data": [
                {
                    "y": 115
                },
                {
                    "y": 11
                },
                {
                    "y": 90
                },
                {
                    "y": 194
                },
                {
                    "y": 11
                },
                {
                    "y": 1
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const dataUsageTrendsChartOption:any={
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
                "_id": "highcharts-3bktpyg-16"
            }
        ]
    },
    "chart": {
        "type": "line",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#5ACFEA",
        "#FF8238",
        "#0027FF"
    ],
    "xAxis": {
        "categories": [
            "Apr-22",
            "May-22",
            "Jun-22",
            "Jul-22",
            "Aug-22",
            "Sep-22"
        ],
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "title": {
            "text": "Usage",
            "style": {
                "stacking": "normal",
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "labels": {},
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "legend": {
        "reversed": false,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "plotOptions": {
        "states": {
            "inactive": {
                "enabled": false
            }
        },
        "series": {
            "marker": {
                "enabled": false
            },
            "states": {
                "inactive": {
                    "enabled": false
                }
            },
            "point": {
                "events": {}
            }
        }
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "Total Usage(TB)",
            "data": [
                49.365234375,
                131.0380859375,
                20604.404296875,
                67687.95703125,
                31839.6220703125,
                45267.5068359375
            ]
        },
        {
            "name": "Streaming Usage(TB)",
            "data": [
                21.482421875,
                55.5478515625,
                20523.2138671875,
                67611.97265625,
                31801.0849609375,
                45201.6552734375
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const subscriberActivityTrendsChartOption:any={
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
                "_id": "highcharts-13hpnwx-18"
            }
        ]
    },
    "chart": {
        "type": "line",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#5ACFEA",
        "#FF8238",
        "#0027FF"
    ],
    "xAxis": {
        "categories": [
            "Apr-22",
            "May-22",
            "Jun-22",
            "Jul-22",
            "Aug-22",
            "Sep-22"
        ],
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "title": {
            "text": "Subscribers",
            "style": {
                "stacking": "normal",
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            }
        },
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        }
    },
    "legend": {
        "reversed": false,
        "align": "center",
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "tooltip": {
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "plotOptions": {
        "series": {
            "states": {
                "inactive": {
                    "enabled": false
                }
            },
            "marker": {
                "enabled": false
            },
            "point": {
                "events": {}
            }
        }
    },
    "series": [
        {
            "name": "Streaming Subscribers",
            "data": [
                13,
                13,
                14,
                14,
                14,
                17
            ]
        },
        {
            "name": "Work From Home Subscribers",
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
            "name": "Gaming Subscribers",
            "data": [
                504,
                504,
                175,
                175,
                179,
                321
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const devicePerHouseholdChartOption:any={
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
                "_id": "highcharts-srqrkug-11"
            }
        ]
    },
    "chart": {
        "type": "column",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "colors": [
        "#0027FF"
    ],
    "xAxis": {
        "categories": [
            "0-4",
            "5-9",
            "10-14",
            "15-19",
            "20+"
        ],
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "autoRotationLimit": 40
        },
        "title": {
            "useHTML": true,
            "text": "<p class=\"giga-text\" id=\"giga\" style=\"font-size:14px !important;margin-top:20px;\">Devices</p>",
            "style": {
                "stacking": "normal",
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal",
                "lineHeight": "18px"
            },
            "align": "middle",
            "margin": -15
        }
    },
    "yAxis": {
        "min": 0,
        "softMax": 1,
        "allowDecimals": false,
        "title": {
            "text": "Subscribers",
            "style": {
                "stacking": "normal",
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        },
        "labels": {
            "style": {
                "fontFamily": "Source Sans Pro,Regular",
                "fontSize": "14px",
                "color": "#1A1F22",
                "fontStyle": "normal"
            }
        }
    },
    "legend": {
        "reversed": false,
        "align": "left",
        "symbolHeight": 0.001,
        "symbolWidth": 0.001,
        "symbolRadius": 0.001,
        "itemStyle": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "plotOptions": {
        "series": {
            "allowPointSelect": true,
            "maxPointWidth": 24,
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
            }
        },
        "column": {
            "minPointLength": 3,
            "borderWidth": 0,
            "dataLabels": {
                "enabled": true,
                "useHTML": false,
                "allowOverlap": true,
                "x": 0,
                "style": {
                    "stacking": "normal",
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
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "",
            "data": [
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                },
                {
                    "y": 0
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

