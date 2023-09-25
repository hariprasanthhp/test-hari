export const chartdatahome = {
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
          _id: "highcharts-2zo8knb-33"
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
      crosshairs: true
    },
    series: [
      {
        name: "RG",
        data: [
          34,
          34,
          34,
          34,
          34,
          34,
          34
        ]
      },
      {
        name: "Mesh(SAT)",
        data: [
          14,
          14,
          14,
          14,
          14,
          14,
          14
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

export const chartdatares = [
    {
      time: 1665619200000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1665705600000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1665792000000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1665878400000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1665964800000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1666051200000,
      RG: 49,
      WAP: 18,
      ExosRG: 34,
      ExosWAP: 14
    },
    {
      time: 1666137600000,
      RG: 49,
      WAP: 17,
      ExosRG: 34,
      ExosWAP: 14
    }
  ]


  export const systemTypeChartData =[
    {
        "time": 1667347200000,
        "RG": 257,
        "WAP": 67,
        "ExosRG": 212,
        "ExosWAP": 53
    },
    {
        "time": 1667433600000,
        "RG": 262,
        "WAP": 75,
        "ExosRG": 214,
        "ExosWAP": 59
    },
    {
        "time": 1667520000000,
        "RG": 274,
        "WAP": 80,
        "ExosRG": 226,
        "ExosWAP": 64
    },
    {
        "time": 1667606400000,
        "RG": 283,
        "WAP": 87,
        "ExosRG": 235,
        "ExosWAP": 72
    },
    {
        "time": 1667692800000,
        "RG": 287,
        "WAP": 89,
        "ExosRG": 239,
        "ExosWAP": 74
    },
    {
        "time": 1667779200000,
        "RG": 287,
        "WAP": 89,
        "ExosRG": 239,
        "ExosWAP": 74
    },
    {
        "time": 1667865600000,
        "RG": 254,
        "WAP": 74,
        "ExosRG": 210,
        "ExosWAP": 60
    }
]