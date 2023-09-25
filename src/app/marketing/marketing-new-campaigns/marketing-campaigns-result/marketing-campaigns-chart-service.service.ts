import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var require: any;
import * as Highcharts from "highcharts/highstock";
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
const IndicatorsCore = require("highcharts/indicators/indicators");
IndicatorsCore(Highcharts);
const IndicatorZigZag = require("highcharts/indicators/zigzag");
IndicatorZigZag(Highcharts);
const borderRadius = require('highcharts-border-radius')
borderRadius(Highcharts);
import { TranslateService } from 'src/app-services/translate.service';
// const $: any = require('jquery');
import * as constants from "../../shared/constants/marketing.constants";
@Injectable({
  providedIn: 'root'
})
export class MarketingCampaignsChartServiceService {
  language: any
  languageSubject: any
  isRerender: boolean
  stackedAqiteColors = ['#0027FF', '#5ACFEA']
  stackedAqiteColors1 = ['#0027FF', '#5ACFEA', '#A3A5ED', '#F7C343']
  commonHighChartOptions = {
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    responsive: {
      rules: [{
        condition: {
        },
        chartOptions: {
          chart: {
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: false
          }
        }
      }]
    }
  };
  styleOptions = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '12px',
    color: '#4c4c4c'
  }
  styleOptions_yaxis = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '13px',
    color: '#4c4c4c'
  }
  styleOptions_xaxis = {
    fontFamily: 'Source Sans Pro,Regular',
    fontSize: '13px',
    color: '#4c4c4c'
  }
  styleOptions_tooltip =
    {
      fontFamily: 'Source Sans Pro,Regular',
      fontSize: '13px',
      color: '#4c4c4c'
    }
  xAxisLabels = {
    style: {
      fontSize: '13px'
    },
    autoRotationLimit: -30
  }
  linePlotOptions = {
    states: {
      inactive: {
        enabled: false
      }
    }
  }
  plotOptions = {
    stacking: 'normal',
    series: {
      allowPointSelect: true,
    },
    states: {
      inactive: {
        enabled: false
      },
      select: {
        color: null,
        borderWidth: 7,
        borderColor: 'rgb(170, 170, 170)'
      }
    }
  }
  constructor(
    private translateService: TranslateService,
  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.isRerender = true;
    });
  }
  public areaChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'area',
        border: 0,
      },
      plotOptions: {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 450],
            stops: [
              [0, '#5ACFEA'],
              [1, new Highcharts.Color('#5ACFEA').setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            enabled: false
          },
        }
      },
      legend: {
        symbolHeight: .001,
        symbolWidth: .001,
        symbolRadius: .001,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        title: {
          text: 'Conversions (%)'
        },
        // lineWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
        plotLines: [{
          value: 24099,
          zIndex: 1111,
          width: 1,
          dashStyle: "Dash",
          color: '#0027FF',
          label: {
            useHTML: true,
            text: '<button class="btn-default primary" style="font-size: 10px; margin-top:4px">Target</button>',
            align: 'right'
          },
        }],
      },
      series: [{
        name: 'Date/Time',
        color: '#5ACFEA',
        data: [
          null, null, null, null, null, 6, 11, 32, 110, 235,
          369, 640, 1005, 1436, 2063, 3057, 4618, 4954, 4804, 4761, 4717, 4368, 6444,
          10577, 10527, 10475, 10421, 4368, 6444, 10358, 10295, 10104, 11009, 12144, 12555, 13076, 14747, 14747,
          17287, 20434, 21004, 24126, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 27387, 27342,
          24401, 24344, 23586, 22380, 27387, 27342, 24344, 23586, 22380, 27387, 27342, 24344, 23586, 27387, 27342,
          24826, 24605, 25579, 25722, 26662, 26956, 27826, 27912, 28999, 28965, 29224, 29459, 31056, 31982, 32040, 31233,
          null, null, null, null, null, null, null, null, null, null,
        ]
      },]
    }
    //  this.addComment(object)
    return of(object);
  }
  public serviceTierTechnologyOptions(data): Observable<{}> {

    let data_cat = []
    let data_ser = []
    let seriesdata = []
    for (var i = 0; i < data.length; i++) {
      data_cat.push(data[i].channelName)
      data_ser.push(data[i].channelSize)
    }
    // console.log(data_ser, "series")
    // console.log(data_cat, 'categories')

    let serviceTierTechnologyOptions = {
      ...this.commonHighChartOptions,
      colors: this.stackedAqiteColors,
      chart: {
        type: 'column',
        style: {
          ...this.styleOptions
        },
        container: {
          onclick: null
        }
      },
      xAxis: {
        categories: data_cat,
        title: {
          text: this.language.segmentChannels,
          style: {
            stacking: 'normal',
            ...this.styleOptions
          },
        },
        labels: {
          ...this.xAxisLabels,
          rotation: -30,
          style: {
            ...this.styleOptions_xaxis
          },
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        series: {
          ...this.plotOptions,
          allowPointSelect: false,
          maxPointWidth: 24,
          point: {
            events: {}
          },
          states: {
            inactive: {
              enabled: false
            },
          },
        },
        column: {
          borderWidth: 0,
          minPointLength: 3,
        }
      },
      // series: data.series,
      series: [{
        showInLegend: false,
        data: data_ser,
        name: ''
      }],
      tooltip: {
        formatter: function () {
          return `${data_cat[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
        },
        style: {
          ...this.styleOptions_tooltip
        }
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: this.language.Audience_Members,
          style: {
            stacking: 'normal',
            ...this.styleOptions
          },
        },
        labels:
        {
          // formatter: function () {
          //   var label = this.axis.defaultLabelFormatter.call(this);
          //   // Use thousands separator for four-digit numbers too
          //   if (/^[0-9]{4,}$/.test(label)) {
          //     return Highcharts.numberFormat(this.value, 0);
          //   }
          //   return label;
          // },
          style: {
            ...this.styleOptions_yaxis
          },
        },
        // tooltip: {
        //   formatter: function () {
        //     return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
        //   },
        //   style: {
        //     ...this.styleOptions_tooltip
        //   }
        // },
        gridLineColor: '#E6E6E6',
        stackLabels: {
          enabled: true,
          allowOverlap: true,
          style: {
            ...this.styleOptions
          },
        },
        reversedStacks: false,
      },
    };
    return of(serviceTierTechnologyOptions);
  }
  public stackedBarStreamChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedAqiteColors,
      yAxis: {
        labels: {
          formatter: function () {
            {
              return this.value.toFixed(0) >= 1000 ? (this.value / 1000).toFixed(0) + 'K' : this.value.toFixed(0)
            }
          }
        },
        title: {
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Subscribers'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
            color: '#4c4c4c'
          },
          formatter: function () {
            return this.total + '%';
          },
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        crosshair: false,
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          maxPointWidth: 8,
          borderRadius: 0,
          states: {
            inactive: {
              enabled: false
            }
          },
        },
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Streaming',
        borderRadiusTopLeft: 30,
        borderRadiusTopRight: 30,
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Non-Streaming',
        data: [2, 2, 3, 2, 1]
      }]
    }
    return of(object);
  }


  public revenueTrendsOption(data, axixval, text_val, from, to): Observable<{}> {

    // let category = this.addMonthOnCategories(axixval);
    let aquisationTrendsOption = {

      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: this.stackedAqiteColors,
      xAxis: {
        categories: axixval,
        //  labels: { ...this.xAxisLabels },
        labels: {
          rotation: -35
        },
        plotBands: [{
          color: '#F8F8FA', // Color value
          from: from, // Start of the plot band
          to: to // End of the plot band
        }]
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: text_val,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },

        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },

      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },
      // tooltip: {
      //   formatter: function () {
      //     return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      tooltip: {
        // formatter: function () {
        //   return `${Highcharts.numberFormat(this.point.y, 0, '', ',')}`;
        // },
        // style: {
        //   ...this.styleOptions_tooltip
        // }
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
      },
      series: data

    };
    if (from == -1) {
      delete aquisationTrendsOption.xAxis.plotBands
    }
    return of(aquisationTrendsOption);
  }
  public revenue_campTrendsOption(data, axixval, text_val, from, to): Observable<{}> {

    // let category = this.addMonthOnCategories(axixval);
    let aquisationTrendsOption = {

      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: this.stackedAqiteColors1,
      xAxis: {
        categories: axixval,
        // labels: { ...this.xAxisLabels },
        labels: {
          rotation: -35
        },
        plotBands: [{
          color: '#F8F8FA', // Color value
          from: from, // Start of the plot band
          to: to // End of the plot band
        }]
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: text_val,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },
        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },

      // tooltip: {
      //   formatter: function () {
      //     return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      // tooltip: {
      //   formatter: function () {
      //     return `${Highcharts.numberFormat(this.point.y, 0, '', ',')}`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      tooltip: {
        // formatter: function () {
        //   return `${Highcharts.numberFormat(this.point.y, 0, '', ',')}`;
        // },
        // style: {
        //   ...this.styleOptions_tooltip
        // }
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
      },
      series: data

    };
    if (from == -1) {
      delete aquisationTrendsOption.xAxis.plotBands
    }
    return of(aquisationTrendsOption);
  }
  addMonthOnCategories(categoryArray) {
    let newMonth: any;
    let newCategories = [];
    categoryArray.forEach(element => {
      let type: any = typeof element;
      let category: any;
      if (type == 'object') {
        element = element[0];
      }
      newMonth = element.split('-');
      category = `${constants.monthsArray[+newMonth[1]]}-${+newMonth[0] - 2000}`;
      newCategories.push(category)

    });
    return newCategories;
  }


  public triggered(data, axixval,name,val): Observable<{}> {
    let aquisationTrendsOption = {

      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: this.stackedAqiteColors1,
      xAxis: {
        categories: axixval,
      // labels: { ...this.xAxisLabels },
        labels: {
          rotation: -35
        },
        plotBands: [{
          color: '#F8F8FA', // Color value
        }]
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: name,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },
        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },
      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },

      // tooltip: {
      //   formatter: function () {
      //     return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      // tooltip: {
      //   formatter: function () {
      //     return `${Highcharts.numberFormat(this.point.y, 0, '', ',')}`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      tooltip: {
        // formatter: function () {
        //   return `${Highcharts.numberFormat(this.point.y, 0, '', ',')}`;
        // },
        // style: {
        //   ...this.styleOptions_tooltip
        // }
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
      },
      series: data

    };
    // if (from == -1) {
    //   delete aquisationTrendsOption.xAxis.plotBands
    // }
    return of(aquisationTrendsOption);
  }


  public revenuenewTrendsOption(data, axixval, text_val, from, to): Observable<{}> {

    // let category = this.addMonthOnCategories(axixval);
    let aquisationTrendsOption = {

      ...this.commonHighChartOptions,
      chart: {
        type: 'line',
        style: {
          ...this.styleOptions
        }
      },
      colors: this.stackedAqiteColors,
      xAxis: {
        categories: axixval,
        //  labels: { ...this.xAxisLabels },
        labels: {
          rotation: -35
        },
        plotBands: [{
          color: '#F8F8FA', // Color value
          from: from, // Start of the plot band
          to: to // End of the plot band
        }]
      },
      yAxis: {
        min: 0,
        softMax: 1,
        allowDecimals: false,
        title: {
          text: text_val,
          style: {
            stacking: 'normal',
            ...this.styleOptions_yaxis
          },
        },

        labels:
        {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            // Use thousands separator for four-digit numbers too
            if (/^[0-9]{4,}$/.test(label)) {
              return Highcharts.numberFormat(this.value, 0);
            }
            return label;
          },
          style: {
            ...this.styleOptions
          }
        },
      },

      legend: {
        reversed: false,
        itemStyle: {
          ...this.styleOptions
        }
      },
      plotOptions: {
        ...this.linePlotOptions,
        series: {
          marker: {
            enabled: false
          },
          states: {
            inactive: {
              enabled: false
            }
          },
          point: {
            events: {

            }
          }
        }
      },
      // tooltip: {
      //   formatter: function () {
      //     return `${data.categories[this.point.x]}: <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')} Subscribers</b> <br/>`;
      //   },
      //   style: {
      //     ...this.styleOptions_tooltip
      //   }
      // },
      tooltip: {
        formatter: function () {
            return  this.x +'<br>'+
               '<b>'+`Campaign Audience : $${this.y}`+ '</b>';
        },
           lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
    },
      series: data

    };
    if (from == -1) {
      delete aquisationTrendsOption.xAxis.plotBands
    }
    return of(aquisationTrendsOption);
  }
}