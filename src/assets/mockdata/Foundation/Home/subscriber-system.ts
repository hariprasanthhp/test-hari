export const subscriberchart = {
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    responsive: {
      rules: [
        {
          condition: {},
          _id: "highcharts-wsvanek-171"
        }
      ]
    },
    chart: {
      type: "line",
      style: {
        fontFamily: "Source Sans Pro,Regular",
        fontSize: "12px",
        color: "#4c4c4c"
      },
      plotBorderWidth: 1
    },
    colors: [
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
    xAxis: [
      {
        min: 0,
        gridLineWidth: 1,
        categories: [
          "10/13/22",
          "10/14/22",
          "10/15/22",
          "10/16/22",
          "10/17/22",
          "10/18/22",
          "10/19/22"
        ],
        tickmarkPlacement: "on",
        showLastLabel: true,
        tickInterval: 2,
        labels: {
          rotation: -25
        },
        index: 0,
        isX: true
      }
    ],
    yAxis: [
      {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: "Number of Systems",
          style: {
            color: "#727272"
          }
        },
        style: {
          fontFamily: "Source Sans Pro,Regular",
          fontSize: "13px",
          color: "#4c4c4c"
        },
        index: 0
      }
    ],
    lang: {
      noData: "No Data Available"
    },
    legend: {
      symbolRadius: 100,
      enabled: true
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      useHTML: true
    },
    series: [
      {
        name: "GM1020",
        data: [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        name: "GM1028",
        data: [
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ]
      },
      {
        name: "GM2037",
        data: [
          4,
          4,
          4,
          4,
          4,
          4,
          4
        ]
      },
      {
        name: "GS4227",
        data: [
          8,
          8,
          8,
          8,
          8,
          8,
          8
        ]
      },
      {
        name: "GS2026E",
        data: [
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ]
      },
      {
        name: "GS2028E",
        data: [
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ]
      },
      {
        name: "GS2037E",
        data: [
          7,
          7,
          7,
          7,
          7,
          7,
          7
        ]
      },
      {
        name: "GS2128G",
        data: [
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ]
      },
      {
        name: "GS4220E",
        data: [
          4,
          4,
          4,
          4,
          4,
          4,
          4
        ]
      },
      {
        name: "GS4227E",
        data: [
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ]
      },
      {
        name: "MGM1028",
        data: [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        name: "GPR2032H",
        data: [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        name: "MGS2028E",
        data: [
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ]
      },
      {
        name: "GS4220E-2",
        data: [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        name: "MGS2028E-2",
        data: [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      }
    ],
    plotOptions: {
      series: {
        cursor: "pointer",
        groupPadding: 0.1,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        },
        pointPlacement: "on",
        point: {
          events: {}
        }
      },
      states: {
        inactive: {
          enabled: false
        }
      }
    }
  }

export const subscriberdatares = [
    {
    "time":1665619200000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1665705600000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1665792000000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1665878400000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1665964800000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1666051200000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    },
    {
    "time":1666137600000,
    "GM1020":1,
    "GM1028":5,
    "GM2037":4,
    "GS4227":8,
    "GS2026E":3,
    "GS2028E":5,
    "GS2037E":7,
    "GS2128G":2,
    "GS4220E":4,
    "GS4227E":3,
    "MGM1028":1,
    "GPR2032H":1,
    "MGS2028E":2,
    "GS4220E-2":1,
    "MGS2028E-2":1
    }
    ]

    export const subscriberSystemsModel = [
      {
          "time": 1667347200000,
          "GM1020": 1,
          "GM1028": 11,
          "GM2037": 15,
          "GS2037": 1,
          "GS4227": 45,
          "GS2020E": 4,
          "GS2026E": 8,
          "GS2028E": 30,
          "GS2032H": 3,
          "GS2037E": 15,
          "GS2128G": 27,
          "GS4220E": 29,
          "GS4227E": 17,
          "GS4227W": 41,
          "GM1028-2": 2,
          "GPR2032H": 8,
          "GS2128XG": 0,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 2,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667433600000,
          "GM1020": 1,
          "GM1028": 12,
          "GM2037": 18,
          "GS2037": 1,
          "GS4227": 46,
          "GS2020E": 4,
          "GS2026E": 8,
          "GS2028E": 33,
          "GS2032H": 3,
          "GS2037E": 15,
          "GS2128G": 26,
          "GS4220E": 29,
          "GS4227E": 17,
          "GS4227W": 43,
          "GM1028-2": 2,
          "GPR2032H": 7,
          "GS2128XG": 0,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 2,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667520000000,
          "GM1020": 1,
          "GM1028": 14,
          "GM2037": 19,
          "GS2037": 1,
          "GS4227": 48,
          "GS2020E": 4,
          "GS2026E": 8,
          "GS2028E": 32,
          "GS2032H": 3,
          "GS2037E": 18,
          "GS2128G": 27,
          "GS4220E": 32,
          "GS4227E": 19,
          "GS4227W": 45,
          "GM1028-2": 2,
          "GPR2032H": 8,
          "GS2128XG": 1,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 2,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667606400000,
          "GM1020": 2,
          "GM1028": 15,
          "GM2037": 19,
          "GS2037": 2,
          "GS4227": 51,
          "GS2020E": 5,
          "GS2026E": 9,
          "GS2028E": 36,
          "GS2032H": 3,
          "GS2037E": 18,
          "GS2128G": 29,
          "GS4220E": 32,
          "GS4227E": 20,
          "GS4227W": 45,
          "GM1028-2": 2,
          "GPR2032H": 9,
          "GS2128XG": 1,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 3,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667692800000,
          "GM1020": 2,
          "GM1028": 15,
          "GM2037": 19,
          "GS2037": 2,
          "GS4227": 52,
          "GS2020E": 5,
          "GS2026E": 9,
          "GS2028E": 37,
          "GS2032H": 3,
          "GS2037E": 19,
          "GS2128G": 28,
          "GS4220E": 33,
          "GS4227E": 21,
          "GS4227W": 47,
          "GM1028-2": 2,
          "GPR2032H": 9,
          "GS2128XG": 1,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 3,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667779200000,
          "GM1020": 2,
          "GM1028": 15,
          "GM2037": 19,
          "GS2037": 2,
          "GS4227": 52,
          "GS2020E": 5,
          "GS2026E": 9,
          "GS2028E": 37,
          "GS2032H": 3,
          "GS2037E": 19,
          "GS2128G": 28,
          "GS4220E": 33,
          "GS4227E": 21,
          "GS4227W": 47,
          "GM1028-2": 2,
          "GPR2032H": 9,
          "GS2128XG": 1,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 3,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      },
      {
          "time": 1667865600000,
          "GM1020": 2,
          "GM1028": 12,
          "GM2037": 17,
          "GS2037": 2,
          "GS4227": 46,
          "GS2020E": 5,
          "GS2026E": 7,
          "GS2028E": 32,
          "GS2032H": 3,
          "GS2037E": 17,
          "GS2128G": 25,
          "GS4220E": 29,
          "GS4227E": 19,
          "GS4227W": 37,
          "GM1028-2": 2,
          "GPR2032H": 6,
          "GS2128XG": 1,
          "MGS2028E": 1,
          "MGS4220E": 1,
          "GS2028E-2": 2,
          "MGM1028-2": 1,
          "MGS2028E-2": 1,
          "MGS4227E-2": 2
      }
  ]