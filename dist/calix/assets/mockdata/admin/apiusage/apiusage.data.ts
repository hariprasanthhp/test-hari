export const last6MonthsData:any=[
    {
        "month": "11/2022",
        "count": 298,
        "dailyCount": ""
    },
    {
        "month": "10/2022",
        "count": 64395,
        "dailyCount": "0,9,1608,105,2307,2514,2015,214,35,1953,3080,2814,2123,2395,206,48,3716,6262,4846,5792,3642,822,16,1422,2448,3210,5251,3025,973,688"
    }
]

export const quotaValues:any={
    "allowed_count": "1000000",
    "used_count": "671",
    "available_count": "999329",
    "expiry_time": "1669852800000",
    "org_id": "50",
    "failed": "false"
}
export const apiUsageChartOptions:any= {
    chart: {
      type: 'line',
      zoomType: 'xy',
    },
    time: {
      useUTC: false,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    mapNavigation: {
      enableMouseWheelZoom: true,
    },
    tooltip: {
      formatter: function () {
        var y = `<b>${this.x}</b><br><b>API Calls: ${(Math.round(this.y * 100) / 100).toLocaleString()}</b>`
        return y
      }
    },
    xAxis: {
      categories: ['Nov,01'] ,
      tickInterval: 1,
      labels: {
        allowOverlap: false,
        maxStaggerLines: 1,
      },
    },
    yAxis: {
      title: {
        text: 'Daily API Calls',
      },
      min: 0,
      minRange: 1,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      symbolRadius: 0,
    },
    lang: {
      noData: 'No Data Available',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        showInLegend: false,
        name: 'API Calls',
        color: '#0027FF',
        data:  ['100'],
      },
    ],
    credits: {
      enabled: false,
    },
  };