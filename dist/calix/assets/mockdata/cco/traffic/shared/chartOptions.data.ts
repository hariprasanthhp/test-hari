export const TrafficChartOptions: any = {
    "chart": {
        "type": "column",
        "zoomType": "xy"
    },
    "title": {
        "text": "Network Traffic"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Criteria: Usage</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 07/26/2022 to 08/01/2022 [Coordinated Universal Time]</span>\n    <br><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Up Usage: 16.30 TB</span> <span style=\"font-size:16px; color:#ffffff\">...</span> <span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Down Usage: 16.30 TB</span>"
    },
    "xAxis": {
        "categories": [
            "07/26/2022",
            "07/27/2022",
            "07/28/2022",
            "07/29/2022",
            "07/30/2022",
            "07/31/2022",
            "08/01/2022"
        ],
        "labels": {
            "style": {
                "textOverflow": "none"
            }
        }
    },
    "yAxis": {
        "min": 0,
        "title": {
            "text": ""
        },
        "opposite": false,
        "tickLength": 2,
        "minRange": 1,
        "labels": {}
    },
    "legend": {
        "reversed": false
    },
    "lang": {
        "noData": "No Data Available"
    },
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "minPointLength": 3,
            "colors": [
                "#0027FF",
                "#5ACFEA"
            ]
        }
    },
    "tooltip": {},
    "series": [
        {
            "name": "Up Usage",
            "data": [
                2174580000000,
                2894688000000,
                2805048000000,
                2807570000000,
                2808020000000,
                2807944000000,
                null
            ],
            "color": "#0027FF",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Down Usage",
            "data": [
                2174612000000,
                2894690000000,
                2805048000000,
                2807520000000,
                2808020000000,
                2807944000000,
                null
            ],
            "color": "#5ACFEA",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Network_Traffic",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    }
}


export const TopApplicationChartOptions: any = {
    "chart": {
        "type": "bar",
        "zoomType": "xy"
    },
    "title": {
        "text": "Network Top Applications"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Criteria: Usage</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 07/01/2022 to 09/19/2022 [Coordinated Universal Time]</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down</span>"
    },
    "xAxis": {
        "categories": [
            "sherin_app"
        ],
        "labels": {
            "style": {
                "textOverflow": "ellipsis",
                "overflow": "hidden",
                "fontSize": "13px",
                "fontWeight": 500
            },
            "events": {}
        }
    },
    "yAxis": {
        "labels": {},
        "min": 0,
        "title": {
            "text": ""
        }
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "reversed": false
    },
    "credits": {
        "enabled": false
    },
    "plotOptions": {
        "series": {
            "minPointLength": 3,
            "color": "#0027FF",
            "point": {
                "events": {}
            }
        }
    },
    "tooltip": {},
    "series": [
        {
            "name": "Down Usage",
            "data": [
                58010043500
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Network_Top_Applications",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    }
}


export const TopLocationChartOptions: any = {
    "chart": {
        "type": "bar",
        "zoomType": "xy"
    },
    "title": {
        "text": "Network Top Locations"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Criteria: Usage</span>\n      <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/16/2022 to 09/22/2022 [Coordinated Universal Time]</span>\n      <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down</span>"
    },
    "xAxis": {
        "categories": [
            "Unknown",
            "Banglore-Ek",
            "Pune-Ek",
            "Chennai-Ek",
            "delhi",
            "chennai"
        ],
        "labels": {
            "style": {
                "textOverflow": "ellipsis",
                "overflow": "hidden",
                "fontSize": "13px",
                "fontWeight": 500
            },
            "events": {}
        }
    },
    "yAxis": {
        "labels": {},
        "min": 0,
        "title": {
            "text": ""
        },
        "minRange": 1
    },
    "legend": {
        "reversed": true
    },
    "credits": {
        "enabled": false
    },
    "lang": {
        "noData": "No Data Available"
    },
    "plotOptions": {
        "series": {
            "minPointLength": 3,
            "color": "#0027FF",
            "point": {
                "events": {}
            }
        }
    },
    "tooltip": {},
    "series": [
        {
            "name": "Down Usage",
            "data": [
                230060164240600,
                31211883314100,
                10332632295900,
                10281376404700,
                5822097587200,
                5805260057400
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Network_Top_Locations",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    }
}


export const TopSubscriberChartOptions: any = {
    "chart": {
        "type": "bar",
        "zoomType": "xy"
    },
    "title": {
        "text": "Network Top Subscribers"
    },
    "subtitle": {
        "text": "<span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Criteria: Usage</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/16/2022 to 09/22/2022 [Coordinated Universal Time]  </span>\n    <br><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Limit: 10 </span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down </span>"
    },
    "xAxis": {
        "categories": [
            "Cmsmapped6-check14",
            "ek010",
            "Cmsmapped61225-check143",
            "EkramahTest-2",
            "dhcpCXNK002_SherinTest1",
            "ek011",
            "ek010",
            "jackprattremax53_pooled_dhcp21",
            "cust7",
            "EK-Cmsmapped1"
        ],
        "labels": {
            "style": {
                "textOverflow": "ellipsis",
                "overflow": "hidden",
                "fontSize": "13px",
                "fontWeight": 500
            },
            "events": {}
        }
    },
    "yAxis": {
        "labels": {},
        "min": 0,
        "title": {
            "text": ""
        },
        "opposite": false,
        "tickLength": 2,
        "minRange": 1
    },
    "legend": {
        "reversed": false
    },
    "lang": {
        "noData": "No Data Available"
    },
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "minPointLength": 3,
            "color": "#0027FF",
            "point": {
                "events": {}
            }
        }
    },
    "tooltip": {},
    "series": [
        {
            "name": "Down Usage",
            "data": [
                75145246762100,
                60094662586800,
                45050495043600,
                21257023582000,
                15039167366400,
                15028815128800,
                15005153317100,
                5319065355200,
                5312376404100,
                5312336282300
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Network_Top_Subscribers",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    }
}

export const TopApplicationTrafficChartOptions: any = {
    "credits": {
        "enabled": false
    },
    "time": {
        "useUTC": false
    },
    "chart": {
        "type": "area",
        "zoomType": "xy"
    },
    "title": {
        "text": ""
    },
    "subtitle": {
        "text": ""
    },
    "xAxis": {
        "categories": [
            "09/21 00:30",
            "09/21 01:30",
            "09/21 02:30",
            "09/21 03:30",
            "09/21 04:30",
            "09/21 05:30",
            "09/21 06:30",
            "09/21 07:30",
            "09/21 08:30",
            "09/21 09:30",
            "09/21 10:30",
            "09/21 11:30",
            "09/21 12:30",
            "09/21 13:30",
            "09/21 14:30",
            "09/21 15:30",
            "09/21 16:30",
            "09/21 17:30",
            "09/21 18:30",
            "09/21 19:30",
            "09/21 20:30",
            "09/21 21:30",
            "09/21 22:30",
            "09/21 23:30"
        ],
        "labels": {
            "isFunction": true
        },
        "tickInterval": 3
    },
    "yAxis": {
        "labels": {},
        "title": {
            "text": "Down"
        },
        "stackLabels": {
            "enabled": false,
            "style": {
                "fontWeight": "bold"
            }
        },
        "tickPixelInterval": 55
    },
    "tooltip": {},
    "lang": {
        "noData": "No Data Available"
    },
    "plotOptions": {
        "area": {
            "stacking": "normal",
            "lineColor": "#ffffff",
            "lineWidth": 1,
            "marker": {
                "lineWidth": 1,
                "lineColor": "#ffffff"
            }
        },
        "series": {
            "cursor": "pointer",
            "point": {
                "events": {}
            }
        }
    },
    "series": [
        {
            "name": "Ek-Social",
            "data": [
                6709091132,
                6686619432,
                6361230885,
                6948091473,
                7221578717,
                6409394657,
                6854591468,
                6353027166,
                7033450842,
                6556199932,
                6168473714,
                6848962509,
                6284553278,
                5539469090,
                6211562575,
                6247328632,
                6921179986,
                6369201465,
                6575437247,
                7242862191,
                6518556272,
                6075247896,
                5978100948,
                6566315980
            ],
            "key": "75f33e41-16d3-405e-87c7-fa5b7f64100e",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "legend": {
        "align": "center",
        "verticalAlign": "bottom",
        "x": 0,
        "y": 0,
        "lineHeight": 10
    },
    "interactive": true,
    "datetimeSupported": true,
    "treemapSupported": true,
    "colors": [
        "#E87B00",
        "#44367D",
        "#8bbc21",
        "#910000",
        "#1aadce",
        "#492970",
        "#f28f43",
        "#77a1e5",
        "#c42525",
        "#a6c96a"
    ],
    "exporting": {
        "enabled": false
    }
}


export const MonthlyUsageByApplicationChartOptions: any = {
    "chart": {
        "type": "column",
        "zoomType": "xy"
    },
    "title": {
        "text": "Monthly Usage By Application"
    },
    "subtitle": {
        "text": "<span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Location:  All</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/01/2021 to 08/31/2022 [Coordinated Universal Time]  </span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down </span>"
    },
    "xAxis": {
        "categories": [
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022"
        ],
        "tickPositions": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ],
        "alignTicks": false,
        "labels": {
            "style": {
                "textOverflow": "none"
            }
        }
    },
    "lang": {
        "noData": "No Data Available"
    },
    "yAxis": {
        "labels": {},
        "min": 0,
        "title": {
            "text": ""
        },
        "opposite": false,
        "tickLength": 2
    },
    "legend": {
        "reversed": false
    },
    "tooltip": {},
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "minPointLength": 3,
            "colors": [
                "#0027FF",
                "#5ACFEA",
                "#FF8238",
                "#F7C343",
                "#B926F0",
                "#FF489D",
                "#E51A1A"
            ]
        }
    },
    "series": [
        {
            "name": "Amazon",
            "data": [
                149603036853,
                158155725837,
                7958040517413,
                15774279206440,
                15560444703415,
                7529471382080,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Unknown Application",
            "data": [
                null,
                null,
                null,
                null,
                2498928857270,
                null,
                null,
                null,
                null,
                117621333147240,
                null,
                145488134459460,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Zoom Video Conferencing",
            "data": [
                22813796846,
                24110547560,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Northern_Computers",
            "data": [
                22813725034,
                24110721566,
                2701278218280,
                4648021796325,
                null,
                4793517438570,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "RSVP",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                4199458500
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Go To Meeting",
            "data": [
                22813799608,
                24110340410,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Unknown",
            "data": [
                null,
                null,
                null,
                null,
                7983581263285,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Facebook",
            "data": [
                null,
                null,
                null,
                4418740899580,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Netflix_VisionNet",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                1546445354236800
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Pandora",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                4633548161585,
                18378533344540,
                23409779563725,
                9294341108100,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Google GGC",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                23412163812940,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "ElectronicArts",
            "data": [
                null,
                null,
                13140253905364,
                20377863388480,
                23233927572000,
                25752419012320,
                null,
                11576354395360,
                null,
                null,
                null,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "RIPE_Europe",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                65418676585275,
                98250879256140,
                125364066094215,
                67345283709600,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Facebook_Aureon_Caching",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                18378678779335,
                null,
                9295134388800,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Netflix WS-LXTN Caching",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                4633429169480,
                18379811407890,
                23411626144910,
                9294089902545,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "WebEx",
            "data": [
                115390268986,
                121956583808,
                8081524864475,
                15880931604895,
                135469013472800,
                153136450321320,
                null,
                68820889386330,
                103417910423085,
                131776495980800,
                67352726440275,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#FF8238",
        "#F7C343",
        "#B926F0",
        "#FF489D",
        "#E51A1A",
        "#90be6d",
        "#277da1"
    ],
    "exporting": {
        "filename": "Monthly_Usage_By_Application",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    }
}

export const MonthlyUsageByServiceChartOptions: any = {
    "chart": {
        "type": "column",
        "zoomType": "xy"
    },
    "title": {
        "text": "Monthly Usage By Service Category"
    },
    "subtitle": {
        "text": "<span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Location:  All</span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/01/2021 to 08/31/2022 [Coordinated Universal Time]  </span>\n    <span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down </span>"
    },
    "xAxis": {
        "categories": [
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022",
            "09/2021",
            "10/2021",
            "11/2021",
            "12/2021",
            "01/2022",
            "02/2022",
            "03/2022",
            "04/2022",
            "05/2022",
            "06/2022",
            "07/2022",
            "08/2022"
        ],
        "labels": {
            "style": {
                "textOverflow": "none"
            }
        }
    },
    "yAxis": {
        "labels": {},
        "min": 0,
        "title": {
            "text": ""
        },
        "opposite": false,
        "tickLength": 2
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "reversed": false
    },
    "tooltip": {},
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "minPointLength": 3,
            "colors": [
                "#0027FF",
                "#5ACFEA",
                "#FF8238",
                "#F7C343",
                "#B926F0",
                "#FF489D",
                "#E51A1A"
            ],
            "cursor": "pointer",
            "point": {
                "events": {}
            }
        }
    },
    "series": [
        {
            "name": "Business",
            "data": [
                183831590474,
                194288193344,
                13364738891323,
                24944821220380,
                145378240101475,
                162481182274170,
                null,
                73017199768050,
                109731150847400,
                139606484763790,
                67353913372830,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "testimport",
            "data": [
                9448187940,
                7770507760,
                1479131919632,
                2807329608820,
                3931906705510,
                3029401992850,
                null,
                1332094408420,
                1346425657610,
                4724438933440,
                827400890,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Unknown and Other",
            "data": [
                159850955217,
                168993681141,
                21098294422777,
                36152142594920,
                38794372275415,
                33282619296200,
                null,
                14956473987920,
                22496060295920,
                29976298812650,
                5126344036390,
                4199458500
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Messaging and Collaboration",
            "data": [
                8545254975,
                9024167070,
                2333455512210,
                4026136542750,
                4395728646900,
                4152920865300,
                null,
                1864247845500,
                2804663222550,
                3479808963150,
                570018600,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Web Cloud Storage Hosting",
            "data": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                65418676585275,
                98250879256140,
                125364066094215,
                67345283709600,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Streaming Media",
            "data": [
                null,
                null,
                2820435723900,
                4880378592225,
                5336585961615,
                5036098044150,
                null,
                16161186123890,
                58533139119540,
                79969883814990,
                30049138826715,
                1546445354236800
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Social",
            "data": [
                21831759390,
                22633149885,
                6932538215460,
                12471567890080,
                14976407601100,
                13073112006420,
                null,
                10462000052760,
                26112409003845,
                37832012862280,
                9297654238640,
                null
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "colors": [
        "#0027FF",
        "#5ACFEA",
        "#FF8238",
        "#F7C343",
        "#B926F0",
        "#FF489D",
        "#E51A1A",
        "#90be6d",
        "#277da1"
    ],
    "exporting": {
        "enabled": false
    },
    "credits": {
        "enabled": false
    }
}

export const SubscriberDistributionChartOptions: any ={
    "chart": {
        "type": "column"
    },
    "title": {
        "text": "All - Downstream"
    },
    "subtitle": {
        "text": ""
    },
    "xAxis": {
        "categories": [
            "<5G",
            "5G-20G",
            "20G-40G",
            "40G-50G",
            "50G-100G",
            "100-250G",
            ">250G"
        ],
        "labels": {
            "style": {
                "textOverflow": "none"
            }
        }
    },
    "yAxis": {
        "min": 0,
        "title": {
            "text": "Percentage %"
        },
        "opposite": false,
        "minRange": 1
    },
    "legend": {
        "reversed": false
    },
    "lang": {
        "noData": "No Data Available"
    },
    "plotOptions": {
        "series": {
            "colors": [
                "#0027FF",
                "#5ACFEA"
            ],
            "cursor": "pointer"
        }
    },
    "tooltip": {},
    "exporting": {
        "enabled": false
    },
    "series": [
        {
            "name": "% of Subscribers",
            "data": [
                7.69,
                0,
                0,
                0,
                7.69,
                0,
                84.62
            ],
            "color": "#0027FF"
        },
        {
            "name": "% of Bytes",
            "data": [
                0,
                0,
                0,
                0,
                0.02,
                0,
                99.98
            ],
            "color": "#5ACFEA"
        }
    ],
    "credits": {
        "enabled": false
    }
}


export const RateChartOptions: any = {
    "chart": {
        "type": "line"
    },
    "time": {
        "useUTC": false
    },
    "title": {
        "text": "Subscriber Rate"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Subscriber: CXNK00349733_ec:4f:82:a2:76:36_10.245.239.205</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Rate: Average</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/23/2022  to 09/29/2022  [India Standard Time]</span>"
    },
    "xAxis": {
        "categories": [
            "09/23 00:30",
            "09/23 01:30",
            "09/23 02:30",
            "09/23 03:30",
            "09/23 04:30",
            "09/23 05:30",
            "09/23 06:30",
            "09/23 07:30",
            "09/23 08:30",
            "09/23 09:30",
            "09/23 10:30",
            "09/23 11:30",
            "09/23 12:30",
            "09/23 13:30",
            "09/23 14:30",
            "09/23 15:30",
            "09/23 16:30",
            "09/23 17:30"
        ],
        "labels": {
            "rotation": -65
        },
        "tickInterval": 7
    },
    "yAxis": {
        "title": {
            "text": ""
        },
        "labels": {},
        "min": 0,
        "minRange": 1
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "align": "center",
        "verticalAlign": "bottom",
        "layout": "horizontal",
        "symbolRadius": 0
    },
    "tooltip": {},
    "plotOptions": {
        "series": {
            "marker": {
                "enabled": false
            }
        },
        "column": {
            "stacking": "normal",
            "dataLabels": {
                "enabled": false
            }
        }
    },
    "series": [
        {
            "name": "Average Up Rate",
            "color": "#82BF00",
            "data": [
                5000000,
                5000000,
                5000000,
                4933333,
                4975000,
                4958333,
                5000000,
                5000000,
                5000000,
                5000000,
                4991667,
                4950000,
                5000000,
                5000000,
                7400000,
                26600000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Average Down Rate",
            "color": "#0279FF",
            "data": [
                5000000,
                5000000,
                5000000,
                4933333,
                4975000,
                4966667,
                5000000,
                5000000,
                5000000,
                5000000,
                4975000,
                4966667,
                5000000,
                5000000,
                7400000,
                26600000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Subscriber_Rate",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    }
}


export const UsageChartOptions: any = {
    "chart": {
        "type": "column",
        "zoomType": "xy"
    },
    "time": {
        "useUTC": false
    },
    "title": {
        "text": "Subscriber Usage"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Subscriber: CXNK00349733_ec:4f:82:a2:76:36_10.245.239.205</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/23/2022 to 09/29/2022 [Coordinated Universal Time]</span><br/>\n    <span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Up Usage: 399.03 GB    Down Usage: 399.04 GB</span>"
    },
    "xAxis": {
        "categories": [
            "09/23/2022",
            "09/24/2022",
            "09/25/2022",
            "09/26/2022",
            "09/27/2022",
            "09/28/2022",
            "09/29/2022"
        ]
    },
    "yAxis": {
        "min": 0,
        "title": {
            "text": ""
        },
        "labels": {},
        "opposite": false,
        "tickLength": 2
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "reversed": false
    },
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "colors": [
                "#E87B00",
                "#44367D",
                "#8bbc21",
                "#910000",
                "#1aadce",
                "#492970",
                "#f28f43",
                "#77a1e5",
                "#c42525",
                "#a6c96a"
            ],
            "point": {
                "events": {}
            }
        }
    },
    "series": [
        {
            "name": "Up Usage",
            "data": [
                75322500000,
                64755000000,
                64725000000,
                64773750000,
                64743750000,
                64706250000,
                null
            ],
            "color": "#82BF00",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Down Usage",
            "data": [
                75371250000,
                64702500000,
                64736250000,
                64796250000,
                64710000000,
                64725000000,
                null
            ],
            "color": "#0279FF",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Subscriber_Usage",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    },
    "tooltip": {}
}

export const MonthlyUsageChartOptions: any = {
    "chart": {
        "type": "column",
        "zoomType": "xy"
    },
    "title": {
        "text": "Subscriber Monthly Usage"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Subscriber: walkercube10:walkercube10~CXNK00207CA4~walkercubename010</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 06/2022 to 08/2022 [Coordinated Universal Time]</span><br/>\n    <span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Up Usage: 1.50 TB    Down Usage:  1.50 TB</span>"
    },
    "xAxis": {
        "categories": [
            "06/2022",
            "07/2022",
            "08/2022"
        ]
    },
    "yAxis": {
        "min": 0,
        "title": {
            "text": ""
        },
        "labels": {},
        "opposite": false,
        "tickLength": 2
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "reversed": false
    },
    "plotOptions": {
        "column": {
            "stacking": "normal"
        },
        "series": {
            "colors": [
                "#E87B00",
                "#44367D",
                "#8bbc21",
                "#910000",
                "#1aadce",
                "#492970",
                "#f28f43",
                "#77a1e5",
                "#c42525",
                "#a6c96a"
            ],
            "point": {
                "events": {}
            }
        }
    },
    "series": [
        {
            "name": "Up Usage",
            "data": [
                82545000000,
                599152546872,
                814533750000
            ],
            "color": "#82BF00",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Down Usage",
            "data": [
                82380000000,
                599077546884,
                814563750000
            ],
            "color": "#0279FF",
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Subscriber_Monthly_Usage",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    },
    "tooltip": {}
}

export const EndpointTopApplicationChartOptions: any = {
    "chart": {
        "type": "bar",
        "zoomType": "xy",
        "height": 400
    },
    "title": {
        "text": "Top Applications"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Subscriber: walkercube10:walkercube10~CXNK00207CA4~walkercubename010</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Criteria: Usage</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/23/2022 to 09/29/2022 [Coordinated Universal Time]</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Direction: Down</span>"
    },
    "xAxis": {
        "categories": [
            "Disney",
            "Zynga",
            "Zoom Video Conferencing",
            "Apple_WWnet",
            "Facebook",
            "Spotify",
            "WhatsApp",
            "Instagram",
            "Snapchat",
            "LinkedIn"
        ]
    },
    "yAxis": {
        "min": 0,
        "title": {
            "text": ""
        },
        "labels": {}
    },
    "lang": {
        "noData": "No Data Available"
    },
    "legend": {
        "reversed": true
    },
    "plotOptions": {
        "series": {
            "color": "#0279FF",
            "point": {
                "events": {}
            }
        }
    },
    "tooltip": {},
    "series": [
        {
            "name": "Down Usage",
            "data": [
                135705000000,
                70980000000,
                70957500000,
                38636250000,
                38628750000,
                6300000000,
                6285000000,
                6285000000,
                6285000000,
                6285000000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "exporting": {
        "filename": "Subscriber_Top_Applications",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export"
            }
        }
    },
    "credits": {
        "enabled": false
    }
}

export const EndpointTopApplicationTrafficChartOptions: any = {
    "credits": {
        "enabled": false
    },
    "time": {
        "useUTC": false
    },
    "chart": {
        "type": "area",
        "zoomType": "xy"
    },
    "title": {
        "text": "Subscriber Top Application Traffic"
    },
    "subtitle": {
        "text": "<span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Subscriber: walkercube10:walkercube10~CXNK00207CA4~walkercubename010</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\">Rate: Average</span><span style=\"font-size:16px; color:#ffffff\">...</span><span style=\"font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;\"> Time Window: 09/28/2022 to 09/28/2022 [India Standard Time]</span><span style=\"font-size:16px; color:#ffffff\">...</span>"
    },
    "xAxis": {
        "categories": [
            "09/28 00:30",
            "09/28 01:30",
            "09/28 02:30",
            "09/28 03:30",
            "09/28 04:30",
            "09/28 05:30",
            "09/28 06:30",
            "09/28 07:30",
            "09/28 08:30",
            "09/28 09:30",
            "09/28 10:30",
            "09/28 11:30",
            "09/28 12:30",
            "09/28 13:30",
            "09/28 14:30",
            "09/28 15:30",
            "09/28 16:30",
            "09/28 17:30",
            "09/28 18:30",
            "09/28 19:30",
            "09/28 20:30"
        ],
        "labels": {
            "isFunction": true
        },
        "tickInterval": 3
    },
    "yAxis": {
        "labels": {},
        "title": {
            "text": "Up"
        },
        "stackLabels": {
            "enabled": false,
            "style": {
                "fontWeight": "bold"
            }
        },
        "tickPixelInterval": 55
    },
    "lang": {
        "noData": "No Data Available"
    },
    "tooltip": {},
    "plotOptions": {
        "area": {
            "stacking": "normal",
            "lineColor": "#ffffff",
            "lineWidth": 1,
            "marker": {
                "lineWidth": 1,
                "lineColor": "#ffffff"
            }
        }
    },
    "series": [
        {
            "name": "Zoom Video Conferencing",
            "data": [
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Apple_WWnet",
            "data": [
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Pinterest",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Instagram",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Zynga",
            "data": [
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000,
                1000000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "WhatsApp",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Facebook",
            "data": [
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000,
                500000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Spotify",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "Disney",
            "data": [
                2000000,
                2000000,
                2000000,
                2000000,
                2000000,
                2000000,
                2000000,
                2000000,
                2000000
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        },
        {
            "name": "LinkedIn",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "events": {},
            "point": {
                "events": {}
            },
            "customEvents": {
                "series": {},
                "point": {}
            }
        }
    ],
    "legend": {
        "align": "center",
        "verticalAlign": "bottom",
        "x": 0,
        "y": 0,
        "lineHeight": 10
    },
    "interactive": true,
    "datetimeSupported": true,
    "treemapSupported": true,
    "colors": [
        "#0279FF",
        "#82BF00",
        "#836EE8",
        "#FF8238",
        "#029A7C",
        "#F7C343",
        "#FF489D",
        "#C74900",
        "#2EC4B6",
        "#0054B2"
    ],
    "exporting": {
        "filename": "Subscriber_Top_Application_Traffic",
        "buttons": {
            "contextButton": {
                "menuItems": [
                    {
                        "textKey": "downloadPDF",
                        "text": "Export PDF"
                    },
                    {
                        "textKey": "downloadCSV",
                        "text": "Export CSV"
                    }
                ],
                "text": "Export",
                "className": "export_menu"
            }
        }
    }
}