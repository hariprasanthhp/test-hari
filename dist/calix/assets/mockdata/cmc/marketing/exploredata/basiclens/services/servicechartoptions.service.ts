export const serviceTierChartOptions:any={
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
                "_id": "highcharts-xrqnyj8-123"
            }
        ]
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
            "<20M",
            "20M",
            "50M",
            "300M",
            "500M",
            "1000M",
            "1G"
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
            "name": "Fiber",
            "data": [
                {
                    "y": 131
                },
                {
                    "y": 11
                },
                {
                    "y": 90
                },
                {
                    "y": 5
                },
                {
                    "y": 194
                },
                {
                    "y": 1
                },
                {
                    "y": 13
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const householdDeviceTrendsChartOptions:any={
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
                    "yAxis": [
                        {
                            "labels": {
                                "align": "right",
                                "x": 15,
                                "y": 5
                            },
                            "title": {
                                "x": 15
                            },
                            "showLastLabel": true
                        },
                        {
                            "labels": {
                                "align": "left",
                                "x": -15,
                                "y": 5
                            },
                            "title": {
                                "x": -15
                            },
                            "showLastLabel": true
                        },
                        {
                            "visible": false
                        }
                    ]
                }
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
    "xAxis": [
        {
            "categories": [
                "Apr-22",
                "May-22",
                "Jun-22",
                "Jul-22",
                "Aug-22",
                "Sep-22"
            ],
            "crosshair": true,
            "labels": {
                "style": {
                    "fontFamily": "Source Sans Pro,Regular",
                    "fontSize": "14px",
                    "color": "#1A1F22",
                    "fontStyle": "normal",
                    "lineHeight": "18px"
                }
            }
        }
    ],
    "yAxis": [
        {
            "min": 0,
            "allowDecimals": false,
            "labels": {
                "style": {
                    "color": "#5ACFEA",
                    "fontSize": "13px"
                }
            },
            "title": {
                "text": " Wi-Fi Score",
                "style": {
                    "color": "#5ACFEA",
                    "fontSize": "12px"
                }
            },
            "opposite": true
        },
        {
            "min": 0,
            "allowDecimals": false,
            "labels": {
                "style": {
                    "color": "#0027FF",
                    "fontSize": "13px"
                }
            },
            "title": {
                "style": {
                    "color": "#0027FF",
                    "fontSize": "12px"
                },
                "text": "Device(s)"
            }
        }
    ],
    "tooltip": {
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
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal",
            "lineHeight": "18px"
        }
    },
    "series": [
        {
            "name": "Average Home Device Count",
            "yAxis": 1,
            "data": [
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ]
            ]
        },
        {
            "name": " Wi-Fi Score",
            "data": [
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ],
                [
                    0
                ]
            ]
        }
    ],
    "plotOptions": {
        "series": {
            "stacking": "normal",
            "series": {
                "allowPointSelect": true
            },
            "states": {
                "inactive": {
                    "enabled": false
                },
                "select": {
                    "color": null,
                    "borderWidth": 7,
                    "borderColor": "rgb(170, 170, 170)"
                }
            },
            "cursor": "pointer",
            "maxPointWidth": 24,
            "borderRadius": 0,
            "borderWidth": 0,
            "minPointLength": 3,
            "marker": {
                "enabled": false
            },
            "point": {
                "events": {}
            }
        }
    },
    "lang": {
        "noData": "No Data Available"
    }
}

export const edgeIqSuiteSubscribersChartOption:any={
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
                "_id": "highcharts-xrqnyj8-123"
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
        "#0027FF",
        "#FF489D",
        "#FF8238",
        "#B926F0",
        "#BDB76B",
        "#FFE4B5",
        "#CD853F",
        "#E9967A",
        "#A52A2A",
        "#DC143C",
        "#FF00FF",
        "#800080",
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
        "#D8BFD8",
        "#DDA0DD",
        "#9370DB",
        "#FFC0CB",
        "#7B68EE",
        "#5F9EA0",
        "#2F4F4F",
        "#66CDAA",
        "#3CB371",
        "#90EE90",
        "#6B8E23",
        "#00CED1",
        "#00FF00",
        "#FF8C00",
        "#D2691E",
        "#FF4500",
        "#B22222",
        "#FFA500",
        "#800000",
        "#008B45",
        "#36648B",
        "#551011",
        "#551A8B",
        "#543948",
        "#A6D785",
        "#A5435C",
        "#B3C95A",
        "#C71585",
        "#DCA2CD",
        "#EECBAD",
        "#FFC125",
        "#ADEAEA",
        "#9F9F5F",
        "#8C1717",
        "#8B6508",
        "#86C67C",
        "#7FFFD4",
        "#4DBD33"
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
    "tooltip": {
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
            "name": "ExperienceIQ",
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
            "name": "ProtectIQ",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const ecosystemSubscriberChartOptions:any={
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
                "_id": "highcharts-xrqnyj8-123"
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
        "#0027FF",
        "#FF489D",
        "#FF8238",
        "#B926F0",
        "#BDB76B",
        "#FFE4B5",
        "#CD853F",
        "#E9967A",
        "#A52A2A",
        "#DC143C",
        "#FF00FF",
        "#800080",
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
        "#D8BFD8",
        "#DDA0DD",
        "#9370DB",
        "#FFC0CB",
        "#7B68EE",
        "#5F9EA0",
        "#2F4F4F",
        "#66CDAA",
        "#3CB371",
        "#90EE90",
        "#6B8E23",
        "#00CED1",
        "#00FF00",
        "#FF8C00",
        "#D2691E",
        "#FF4500",
        "#B22222",
        "#FFA500",
        "#800000",
        "#008B45",
        "#36648B",
        "#551011",
        "#551A8B",
        "#543948",
        "#A6D785",
        "#A5435C",
        "#B3C95A",
        "#C71585",
        "#DCA2CD",
        "#EECBAD",
        "#FFC125",
        "#ADEAEA",
        "#9F9F5F",
        "#8C1717",
        "#8B6508",
        "#86C67C",
        "#7FFFD4",
        "#4DBD33"
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
    "tooltip": {
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
            "name": "Arlo",
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
            "name": "Servify",
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
            "name": "Bark",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const wifiCategoryTrendsChartOptions:any={
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
                "_id": "highcharts-fbh9zvh-144"
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
    "color": [
        "#0027FF",
        "#FF489D",
        "#FF8238",
        "#B926F0",
        "#BDB76B",
        "#FFE4B5",
        "#CD853F",
        "#E9967A",
        "#A52A2A",
        "#DC143C",
        "#FF00FF",
        "#800080",
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
        "#D8BFD8",
        "#DDA0DD",
        "#9370DB",
        "#FFC0CB",
        "#7B68EE",
        "#5F9EA0",
        "#2F4F4F",
        "#66CDAA",
        "#3CB371",
        "#90EE90",
        "#6B8E23",
        "#00CED1",
        "#00FF00",
        "#FF8C00",
        "#D2691E",
        "#FF4500",
        "#B22222",
        "#FFA500",
        "#800000",
        "#008B45",
        "#36648B",
        "#551011",
        "#551A8B",
        "#543948",
        "#A6D785",
        "#A5435C",
        "#B3C95A",
        "#C71585",
        "#DCA2CD",
        "#EECBAD",
        "#FFC125",
        "#ADEAEA",
        "#9F9F5F",
        "#8C1717",
        "#8B6508",
        "#86C67C",
        "#7FFFD4",
        "#4DBD33"
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
        "crosshair": true,
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
        "allowDecimals": false,
        "title": {
            "text": "Device(s)",
            "style": {
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
            "name": "Computer",
            "data": [
                0,
                0,
                0,
                1,
                0,
                1
            ]
        },
        {
            "name": "Media Player",
            "data": [
                0,
                0,
                0,
                1,
                0,
                0
            ]
        },
        {
            "name": "Unknown",
            "data": [
                0,
                0,
                0,
                1,
                0,
                1
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}

export const blockedThreatsChartOptions:any={
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
            "size": "100%",
            "allowPointSelect": true,
            "cursor": "pointer",
            "dataLabels": {
                "enabled": true,
                "format": "{point.name}",
                "crop": false,
                "distance": 10,
                "overflow": "visible",
                "style": {
                    "width": "100px",
                    "color": "#4c4c4c",
                    "fontSize": "12px"
                }
            }
        }
    },
    "tooltip": {
        "headerFormat": "{series.name}",
        "pointFormat": "{point.key}<br><b>{point.name}: {point.percentage:.1f}%</b><br><b>{point.y}</b>",
        "style": {
            "fontFamily": "Source Sans Pro,Regular",
            "fontSize": "14px",
            "color": "#1A1F22",
            "fontStyle": "normal"
        }
    },
    "series": [
        {
            "name": "Total Number of Threats",
            "colorByPoint": true,
            "data": [
                {
                    "name": "Web Threats",
                    "realName": "WG",
                    "y": 2
                },
                {
                    "name": "Virus",
                    "realName": "AV",
                    "y": 0
                },
                {
                    "name": "Intrusions",
                    "realName": "IPS",
                    "y": 0
                }
            ]
        }
    ],
    "lang": {
        "noData": "No Data Available"
    }
}


