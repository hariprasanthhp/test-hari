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

const $: any = require('jquery');
@Injectable({
  providedIn: 'root'
})
export class MarketingChartDataServiceService {
  pieChartColurs = ['#84bbf8', '#a3a5ed', '#b3d974', '#fd9e4c', '#fc6784']
  stackedColumnColors = ['#82BF1F', '#0279ff']
  stackedWfhColors = ['#0279ff', '#82BF1F']
  stackedAqiteColors = ['#84BBF8', '#FC6784', '#FD9E4C', '#A3A5ED', '#CBC75F']
  stackedSubsColors = ['#82BF1F', '#349885', '#0279FF']

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
            styledMode: true
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
  constructor() { }

  /////

  public exploreBarSubsChartData1_2(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      colors: ['#0279ff'],
      chart: {
        type: 'column',
        inverted: false // default
      },

      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },

      series: [{
        name: 'Gigabites',
        showInLegend: false,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
        data: [
          20, 40, 60, 80, 100, 80
        ]
      }],


    }
    return of(object);
  }


  //////

  public exploreBarSubsChartData(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      colors: ['#0279ff'],
      chart: {
        type: 'column',
        inverted: false // default
      },

      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },

      series: [{
        name: 'Gigabites',
        showInLegend: false,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
        data: [
          20, 40, 60, 80, 100, 80
        ]
      }],


    }
    return of(object);
  }
  ///game
  public stackedBarGamingChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedColumnColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        {
          borderRadiusTopLeft: '30px',
          borderRadiusTopRight: '30px',
          name: 'Non-Gaming',
          data: [2, 2, 3, 2, 1]
        },
        {
          name: 'Gaming',
          data: [5, 3, 4, 7, 2]
        }]
    }
    return of(object);
  }
  //stream
  public stackedBarStreamChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedColumnColors,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false,

          }
        }
      },

      series: [{
        name: 'Non-Streaming',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 2, 3, 2, 1]
      },
      {
        name: 'Streaming',
        data: [5, 3, 4, 7, 2]
      }]
    }
    return of(object);
  }

  //whf
  public stackedBarWfhChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedColumnColors,
      yAxis: {

        min: 0,
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
          states: {
            inactive: {
              enabled: false
            }
          },
        },

        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Non-WFH',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'WFH',
        data: [5, 3, 4, 7, 2]
      }]
    }
    return of(object);
  }

  //aquisit
  public stackedBarAquisiteChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedAqiteColors,
      yAxis: {

        min: 0,
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
            return this.total;
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: '100M+',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 1, 3, 3, 1]
      }, {
        name: '50M+',
        data: [2, 1, 3, 1, 1]
      }, {
        name: '15-49M',
        data: [2, 2, 3, 2, 1]
      }, {
        name: '5-14M',
        data: [2, 2, 3, 2, 1]
      }, {
        name: '<15M',
        data: [5, 3, 4, 7, 2]
      }]
    }
    return of(object);
  }


  ///tier
  public stackedBarTierChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedSubsColors,
      yAxis: {

        min: 0,
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
        states: {
          inactive: {
            enabled: false
          }
        },
        column: {
          stacking: 'normal',
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'VDSL',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 1, 3, 2, 1]
      },
      {
        name: 'Fiber',
        data: [2, 3, 3, 2, 1]
      },
      {
        name: 'ADSL',
        data: [5, 3, 4, 5, 2]
      }]
    }
    return of(object);
  }



  //pie

  public pieChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: this.pieChartColurs,

      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false,
            }
          },
        },
        pie: {
          size: '80%',
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            //useHTML: true,
            crop: false,
            distance: 2,
            overflow: "visible",
            style: {
              width: '100px',
              fontSize: '10px',
              font: 'Source Sans Pro,Regular',
              color: '#4C4C4C'
            },

          },
          // connectorColor: '#000000'
        }
      },

      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Streaming',
          y: 61.41,
          sliced: false,
          selected: true
        }, {
          name: 'Other',
          y: 11.84
        }, {
          name: 'Social',
          y: 10.85
        }, {
          name: 'Amazon',
          y: 4.67
        }, {
          name: 'Web,Hosting',
          y: 4.18
        }]
      }]
    }
    return of(object);
  }

  ///house
  public multiLineHouseholdChartOptions(): Observable<{}> {
    var dataset = [1, 2, 3, 4]

    let object = {
      ...this.commonHighChartOptions,

      colors: this.stackedColumnColors.reverse(),

      yAxis: [{

        title: {
          style: {
            color: '#0279ff',
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Devices'
        },
        labels: {
          formatter: function () {
            {
              let label = this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0)
              return '<span style="fill: #0279ff;">' + label + '</span>';

            }
          }
        }
      }, {
        title: {
          text: 'Wi-Fi',
          style: {
            color: '#82BF1F',
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
        },
        linkedTo: 0,
        opposite: true,
        labels: {
          formatter: function () {
            {
              let label = this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0)
              return '<span style="fill: #82BF1F;">' + label + '</span>';
            }
          }
        }
      }],

      legend: {
        enabled: true,
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6,

        itemStyle: {
          fontSize: '10px',
          font: 'Source Sans Pro,Regular',
          color: '#4C4C4C'
        },
      }, tooltip: {
        formatter: function () {
          return `${this.series.name} <br/> 
                        <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
        }
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep'],
        crosshair: false,

      },

      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
          marker: {
            enabled: false
          },
          // label: {
          //   connectorAllowed: false
          // },
        }
      },

      series: [{
        name: 'Average Home Device Count',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [7, 8, 1, 1, 3, 5]

      }, {
        name: 'Wi-Fi Score',
        data: [2, 1, 3, 0, 2, 4]
      }],


    }
    return of(object);
  }
  ////
  public multiLineAdoptionChartOptions(): Observable<{}> {
    var dataset = [1, 2, 3, 4]

    let object = {
      ...this.commonHighChartOptions,

      colors: this.stackedColumnColors.reverse(),

      yAxis: [{

        title: {
          style: {

            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Subscribers'
        },
        labels: {
          formatter: function () {
            {
              let label = this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0)
              return '<span style="fill: #0279ff;">' + label + '</span>';

            }
          }
        }
      }],

      legend: {
        enabled: true,
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6,

        itemStyle: {
          fontSize: '10px',
          font: 'Source Sans Pro,Regular',
          color: '#4C4C4C'
        },
      }, tooltip: {
        formatter: function () {
          return `${this.series.name} <br/> 
                        <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
        }
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep'],
        crosshair: false,

      },

      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
          marker: {
            enabled: false
          },
          // label: {
          //   connectorAllowed: false
          // },
        }
      },

      series: [{
        name: 'ExperienceIQ Module',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [7, 8, 1, 1, 3, 5]

      }, {
        name: 'ProtectIQ Module',
        data: [2, 1, 3, 0, 2, 4]
      }],


    }
    return of(object);
  }
  ////
  public multiLineWifiChartOptions(): Observable<{}> {
    var dataset = [1, 2, 3, 4]

    let object = {
      ...this.commonHighChartOptions,

      colors: this.stackedAqiteColors.reverse(),

      yAxis: [{

        title: {
          style: {

            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Devices'
        },
        labels: {
          formatter: function () {
            {
              let label = this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0)
              return '<span style="fill: #0279ff;">' + label + '</span>';

            }
          }
        }
      }],

      legend: {
        enabled: true,
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6,

        itemStyle: {
          fontSize: '10px',
          font: 'Source Sans Pro,Regular',
          color: '#4C4C4C'
        },
      }, tooltip: {
        formatter: function () {
          return `${this.series.name} <br/> 
                          <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
        }
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep'],
        crosshair: false,

      },

      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
          marker: {
            enabled: false
          },
          // label: {
          //   connectorAllowed: false
          // },
        }
      },

      series: [{
        name: 'Others',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [7, 8, 1, 1, 3, 5]

      }, {
        name: 'IOT',
        data: [2, 1, 3, 0, 2, 4]
      }, {
        name: 'GamingConsole',
        data: [7, 8, 1, 1, 3, 5]

      }, {
        name: 'Computer',
        data: [2, 1, 3, 0, 2, 4]
      }, {
        name: 'Camera',
        data: [3, 3, 3, 1, 3, 5]
      }],


    }
    return of(object);
  }
  ///
  //pie

  public pieChartBlockedThreatOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: this.pieChartColurs,

      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false,
            }
          },
        },
        pie: {
          size: '80%',
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            //useHTML: true,
            crop: false,
            distance: 2,
            overflow: "visible",
            style: {
              width: '100px',
              fontSize: '10px',
              font: 'Source Sans Pro,Regular',
              color: '#4C4C4C'
            },

          },
          // connectorColor: '#000000'
        }
      },

      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Web Threats',
          y: 61.41,
          sliced: false,
          selected: true
        }, {
          name: 'Virus',
          y: 11.84
        }, {
          name: 'Intrusions',
          y: 10.85
        }]
      }]
    }
    return of(object);
  }
  ////
  public heatHouseholdChartOptions(): Observable<{}> {
    let heatmapChartOptions = {
      ...this.commonHighChartOptions,
      chart: {
        plotBorderWidth: 1,
        type: 'heatmap',
      },

      className: 'heat-map',
      legend: {
        enabled: false,
        reversed: false,
      },
      xAxis: {
        categories: ["00 AM", "02", "04", "06", "08", "10", "12 PM", "14", "16", "18", "20", "22", "24"],
        tickWidth: 1,
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%I %p',
          hour: '%I %p',
          minute: '%I:%M %p'
        },
        title: {
          useHTML: true,
          text: `<p class="gmt-text" id="gmt-text" style="font-size:10px !important;margin-left: 10px">Time</p>`,
          align: 'left',
          style: {
            stacking: 'normal',
          },


        }


      },
      yAxis: {
        categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday ", "Friday ", "Saturday"],
        title: null,
        reversed: true,
        labels: {
          align: 'left',
          reserveSpace: true
        }
      },
      colorAxis: {
        min: 0,
        max: 100,
        stops: [
          [0, '#fefefe'],
          [0.01, '#fafcfd'],
          [0.10, '#dcebf3'],
          [0.11, '#daeaf2'],
          [0.20, '#c7dbe9'],
          [0.21, '#d0dee8'],
          [0.30, '#b4cce0'],
          [0.31, '#b0c9df'],
          [0.40, '#a0bdd7'],
          [0.41, '#aec3d9'],
          [0.49, '#6984ba'],
          [0.50, '#f3df8f'],
          [0.51, '#f0e0a3'],
          [0.60, '#e9ba79'],
          [0.61, '#e9b672'],
          [0.70, '#df9257'],
          [0.71, '#de8f55'],
          [0.80, '#ce7a50'],
          [0.81, '#ca6a3a'],
          [0.90, '#b84822'],
          [0.99, '#b74620'],
          [1, '#b74620']
        ],
      },
      tooltip: {
        formatter: function () {
          return `<b> ${this.series.yAxis.categories[this.point.y]}<b> <br/> 
                      Hours  <b> ${this.series.xAxis.categories[this.point.x]} - ${this.series.xAxis.categories[this.point.x + 1]}</b> <br/>  
                       ${this.point.value} % of Subscribers  `;
        }
      },

      series: [{
        animation: {
          duration: 1000
        },
        data: [[0, 0, 34], [1, 0, 34], [2, 0, 34], [3, 0, 34], [4, 0, 34], [5, 0, 30], [6, 0, 25], [7, 0, 22], [8, 0, 24], [9, 0, 32], [10, 0, 26], [11, 0, 35], [0, 1, 35], [1, 1, 35], [2, 1, 36], [3, 1, 37], [4, 1, 35], [5, 1, 28], [6, 1, 24], [7, 1, 23], [8, 1, 28], [9, 1, 32], [10, 1, 32], [11, 1, 32], [0, 2, 32], [1, 2, 35], [2, 2, 37], [3, 2, 38], [4, 2, 36], [5, 2, 29], [6, 2, 24], [7, 2, 23], [8, 2, 28], [9, 2, 32], [10, 2, 31], [11, 2, 32], [0, 3, 32], [1, 3, 34], [2, 3, 37], [3, 3, 38], [4, 3, 36], [5, 3, 30], [6, 3, 25], [7, 3, 24], [8, 3, 29], [9, 3, 32], [10, 3, 31], [11, 3, 32], [0, 4, 32], [1, 4, 34], [2, 4, 37], [3, 4, 38], [4, 4, 36], [5, 4, 29], [6, 4, 24], [7, 4, 23], [8, 4, 29], [9, 4, 32], [10, 4, 31], [11, 4, 31], [0, 5, 32], [1, 5, 34], [2, 5, 36], [3, 5, 38], [4, 5, 36], [5, 5, 29], [6, 5, 25], [7, 5, 23], [8, 5, 28], [9, 5, 32], [10, 5, 31], [11, 5, 31], [0, 6, 32], [1, 6, 34], [2, 6, 35], [3, 6, 36], [4, 6, 35], [5, 6, 30], [6, 6, 25], [7, 6, 23], [8, 6, 25], [9, 6, 33], [10, 6, 35], [11, 6, 34]],

        dataLabels: {
          enabled: false,
          color: '#000000'
        }
      }],
      plotOptions: {
        series: {
          point: {
            events: {

            }
          }
        }
      },

    };
    return of(heatmapChartOptions);
    //  return of(object);




  }

  /// chunk
  public stackedBarChunkChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedColumnColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Non-Gaming',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Gaming',
        data: [5, 3, 4, 7, 2]
      }]
    }
    return of(object);
  }
  //Risk

  public stackedBarRiskChartOptions(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedSubsColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Non-Gaming',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Gaming',
        data: [5, 3, 4, 7, 2]
      }
      ]
    }
    return of(object);
  }
  //service
  ///house
  public multiLineServiceChartOptions(): Observable<{}> {
    var dataset = [1, 2, 3, 4]

    let object = {
      ...this.commonHighChartOptions,

      colors: this.stackedColumnColors.reverse(),

      yAxis: [{

        title: {
          style: {
            color: '#0279ff',
            fontSize: '10px',
            font: 'Source Sans Pro,Regular',
          },
          text: 'Devices'
        },
        labels: {
          formatter: function () {
            {
              let label = this.value.toFixed(0) >= 1000 ? (this.value.toFixed(0) / 1000) + 'K' : this.value.toFixed(0)
              return '<span style="fill: #0279ff;">' + label + '</span>';

            }
          }
        }
      }],

      legend: {
        enabled: true,
        symbolHeight: 12,
        symbolWidth: 12,
        symbolRadius: 6,

        itemStyle: {
          fontSize: '10px',
          font: 'Source Sans Pro,Regular',
          color: '#4C4C4C'
        },
      }, tooltip: {
        formatter: function () {
          return `${this.series.name} <br/> 
                        <b>${Highcharts.numberFormat(this.point.y, 0, '', ',')}</b> <br/>`;
        }
      },
      xAxis: {
        categories: ['Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep'],
        crosshair: false,

      },

      plotOptions: {
        series: {
          states: {
            inactive: {
              enabled: false
            }
          },
          marker: {
            enabled: false
          },
          // label: {
          //   connectorAllowed: false
          // },
        }
      },

      series: [{
        name: 'Average Home Device Count',
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        data: [7, 8, 1, 1, 3, 5]

      }, {
        name: 'Wi-Fi Score',
        data: [2, 1, 3, 0, 2, 4]
      }],


    }
    return of(object);
  }


  ///
  public aquisationrate(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedAqiteColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        name: '1G',
        data: [2, 2, 3, 2, 1]
      }, {
        name: '300M+',
        data: [5, 3, 4, 7, 2]
      }
        , {
        name: '50M+',
        data: [5, 3, 4, 7, 2]
      }
        , {
        name: '20M+',
        data: [5, 3, 4, 7, 2]
      }
        , {
        name: '<20M',
        data: [5, 3, 4, 7, 2]
      }]
    }
    return of(object);
  }

  ///
  public aquisationrevenue(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedColumnColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        name: 'Current Revenue',
        data: [2, 2, 3, 2, 1]
      }, {
        name: 'Potential Revenue',
        data: [5, 3, 4, 7, 2]
      }
      ]
    }
    return of(object);
  }
  ///
  public Servicetier(): Observable<{}> {
    let object = {
      ...this.commonHighChartOptions,
      chart: {
        type: 'column',
        inverted: false
      },
      colors: this.stackedAqiteColors,
      yAxis: {

        min: 0,
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
          borderWidth: 0,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        borderRadiusTopLeft: '30px',
        borderRadiusTopRight: '30px',
        name: 'Fiber',
        data: [2, 2, 3, 2, 1]
      }
      ]
    }
    return of(object);
  }
}
