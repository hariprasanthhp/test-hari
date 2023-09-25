export const chartdatastatus = {
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
          _id: "highcharts-b3gemep-27"
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
        name: "Pre-Provisioned",
        data: [
          89,
          89,
          89,
          89,
          89,
          89,
          89
        ]
      },
      {
        name: "Active",
        data: [
          24,
          20,
          23,
          17,
          17,
          24,
          18
        ]
      },
      {
        name: "Not Checked In",
        data: [
          10,
          14,
          11,
          17,
          17,
          10,
          16
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

export const chartdataresstatus = [
    {
      time: 1665619200000,
      active: 24,
      offline: 10,
      rgActive: 34,
      rgOffline: 15,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1665705600000,
      active: 20,
      offline: 14,
      rgActive: 26,
      rgOffline: 23,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1665792000000,
      active: 23,
      offline: 11,
      rgActive: 33,
      rgOffline: 16,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1665878400000,
      active: 17,
      offline: 17,
      rgActive: 23,
      rgOffline: 26,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1665964800000,
      active: 17,
      offline: 17,
      rgActive: 23,
      rgOffline: 26,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1666051200000,
      active: 24,
      offline: 10,
      rgActive: 34,
      rgOffline: 15,
      unassociate: 0,
      preprovision: 89
    },
    {
      time: 1666137600000,
      active: 18,
      offline: 16,
      rgActive: 25,
      rgOffline: 24,
      unassociate: 0,
      preprovision: 89
    }
  ]

  export const systemstatusChartData = [
    {
        "time": 1667347200000,
        "active": 174,
        "offline": 38,
        "rgActive": 214,
        "rgOffline": 43,
        "unassociate": 111,
        "preprovision": 4680
    },
    {
        "time": 1667433600000,
        "active": 164,
        "offline": 50,
        "rgActive": 208,
        "rgOffline": 54,
        "unassociate": 114,
        "preprovision": 4705
    },
    {
        "time": 1667520000000,
        "active": 169,
        "offline": 57,
        "rgActive": 210,
        "rgOffline": 64,
        "unassociate": 117,
        "preprovision": 4721
    },
    {
        "time": 1667606400000,
        "active": 173,
        "offline": 62,
        "rgActive": 215,
        "rgOffline": 68,
        "unassociate": 122,
        "preprovision": 4723
    },
    {
        "time": 1667692800000,
        "active": 165,
        "offline": 74,
        "rgActive": 203,
        "rgOffline": 84,
        "unassociate": 124,
        "preprovision": 4722
    },
    {
        "time": 1667779200000,
        "active": 155,
        "offline": 84,
        "rgActive": 192,
        "rgOffline": 95,
        "unassociate": 124,
        "preprovision": 4721
    },
    {
        "time": 1667865600000,
        "active": 162,
        "offline": 48,
        "rgActive": 200,
        "rgOffline": 54,
        "unassociate": 102,
        "preprovision": 4726
    }
]