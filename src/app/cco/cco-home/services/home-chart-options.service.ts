import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import * as Highcharts from "highcharts";
import { Router } from '@angular/router';
import { IssueService } from '../../issues/service/issue.service';
require('highcharts/highcharts-more.js')(Highcharts);

@Injectable({
  providedIn: 'root'
})
export class HomeChartOptionsService {

  filterDays = '7';
  filterDays$ = new Subject();
  systemStatusData$ = new Subject();

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
            color: '#4c4c4c'
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
  language: any;
  languageSubject: any;
  lineChartColors = ['#b3d974', '#fd9e4c', '#fc6784']
  constructor(
    private dateUtils: DateUtilsService,
    private translateService: TranslateService,
    private router: Router,
    private issueService: IssueService,

  ) {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  public getNetworkAvailabilityOptions(cData, yLabel?: any, showLegend?: boolean): any {

    let categories = [], outage = [], degrade = [];
    let chartData = [];


    var that = this;

    if (cData.length) {
      cData = this.sortByTimestamp(cData, 'time');
      cData.forEach(e => {
        categories.push(this.dateUtils.getChartFormatDate(e.time, 'M/d/yy', true));
        outage.push(e.outage);
        degrade.push(e.degrade);
      });

      chartData
    }



    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: null
      },
      xAxis: [{
        min: 0,

        gridLineWidth: 1,
        categories: categories,
        tickInterval: 5,
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: true,
          // labels: {
          //   formatter: function () {
          //     //var maxElement = Math.abs(this.axis.min);
          //     var maxElement = Math.abs(this.axis.max);
          //     var unit = that.getStackedUnit(maxElement);
          //     var m = this.value;
          //     m = Math.abs(m);
          //     let displayValue = (m / unit[0]).toFixed(2);
          //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
          //   },
          // },
          title: {
            text: (yLabel && this.language) ? this.language[yLabel] : (yLabel ? yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbol: 'square',
        enabled: showLegend ? true : false
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: [
        {
          name: `${this.language['Service Outage']}`,
          data: outage,
          //color: '#35c7fc'
        },
        {
          name: `${this.language['Service Degradation']}`,
          data: degrade,
          //color: '#F7C343',
          //yAxis: 1,
        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          //pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: false
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return options;
  }

  public getCommonSubscribersChartOptions(cData, yLabel?: any, showLegend?: boolean): Observable<any> {
    // let last_index = cData.categories.length - 1
    // if (cData.categories.length == 30) {
    //   var val = last_index + 1;
    //   cData.categories[val] = cData.categories[last_index];
    //   cData.series[0].data[val] = cData.series[0].data[last_index];
    // }
    let that = this;
    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c',
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA', '#b926f0', '#FF8238', '#029A7C', '#F7C343', '#FF489D'],
      title: {
        text: null
      },
      xAxis: [{
        min: 0,
        gridLineWidth: 1,
        categories: cData.categories,
        labels: {
          rotation: -25
        },
        //tickInterval: 5,
        tickmarkPlacement: 'on',
        tickInterval: (function () {
          let sLength = cData.series ? cData.series.length : 0;
          let xCategLength = cData.categories ? cData.categories.length : 0;
          let xAxisLen = Math.floor(xCategLength / sLength);
          let f = 1;
          if (xCategLength <= 6) {
            f = 1;
          } else if (xCategLength > 6 && xCategLength < 13) {
            f = 2;
          } else {
            f = Math.floor(xCategLength / 6) ? Math.floor(xCategLength / 6) : 1;
          }
          return f;
        })()
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          softMax: 1,
          allowDecimals: false,
          // labels: {
          //   formatter: function () {
          //     //var maxElement = Math.abs(this.axis.min);
          //     var maxElement = Math.abs(this.axis.max);
          //     var unit = that.getStackedUnit(maxElement);
          //     var m = this.value;
          //     m = Math.abs(m);
          //     let displayValue = (m / unit[0]).toFixed(2);
          //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
          //   },
          // },
          title: {
            text: (yLabel && this.language) ? this.language[yLabel] : (yLabel ? yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        symbol: 'square',
        enabled: showLegend ? true : false
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: [...cData.series],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          //pointPadding: 2, // Defaults to 0.1
          groupPadding: 0.1,
          marker: {
            enabled: false
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return of(options);
  }
  /////

  public getCommonSubscribersChart30recordsOptions(cData, yLabel?: any, showLegend?: boolean): Observable<any> {

    let that = this;
    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c',
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA', '#b926f0', '#FF8238', '#029A7C', '#F7C343', '#FF489D'],
      title: {
        text: null
      },
      xAxis: [{
        min: 0,
        gridLineWidth: 1,
        categories: cData.categories,
        labels: {
          rotation: -25
        },
        //tickInterval: 5,
        tickmarkPlacement: 'on',
        showLastLabel: true,
        tickPositions: [0, 5, 10, 15, 20, 25, 29],
        tickInterval: (function () {
          let sLength = cData.series ? cData.series.length : 0;
          let xCategLength = cData.categories ? cData.categories.length : 0;
          let xAxisLen = Math.floor(xCategLength / sLength);
          let f = 1;
          if (xCategLength <= 6) {
            f = 1;
          } else if (xCategLength > 6 && xCategLength < 13) {
            f = 2;
          } else {
            f = Math.floor(xCategLength / 6) ? Math.floor(xCategLength / 6) : 1;
          }
          return f;
        })(),
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          softMax: 1,
          allowDecimals: false,
          // labels: {
          //   formatter: function () {
          //     //var maxElement = Math.abs(this.axis.min);
          //     var maxElement = Math.abs(this.axis.max);
          //     var unit = that.getStackedUnit(maxElement);
          //     var m = this.value;
          //     m = Math.abs(m);
          //     let displayValue = (m / unit[0]).toFixed(2);
          //     return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
          //   },
          // },
          title: {
            text: (yLabel && this.language) ? this.language[yLabel] : (yLabel ? yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        symbol: 'square',
        enabled: showLegend ? true : false
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: [...cData.series],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          //pointPadding: 2, // Defaults to 0.1
          groupPadding: 0.1,
          marker: {
            enabled: false
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return of(options);
  }
  public getColumnChartOption(cData, yLabel?: any, showLegend?: boolean): Observable<any> {
    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        inverted: true,
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
      },
      colors: ['#0027FF', '#5ACFEA', '#fd9e4c', '#CBC75F'],
      title: {
        text: (this.language && this.language['Firmware Image Count (%) / Model']) ? this.language['Firmware Image Count (%) / Model'] : 'Firmware Image Count (%) / Model',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c',
        },
      },
      xAxis: {
        categories: [...cData.categories],
        title: {
          text: 'Model',
        },
      },
      yAxis: {
        opposite: true,
        min: 0,
        title: {
          text: null
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            // color: ( // theme
            //   Highcharts.defaultOptions.title.style &&
            //   Highcharts.defaultOptions.title.style.color
            // ) || 'gray'
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          data: [...cData.series]
        }
      ]
    };

    return of(options);
  }

  sortByTimestamp(list, key) {
    list?.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      return x[key] - y[key];
    });
    return list;
  }

  public getOptions(cData, yLabel?: any, showLegend?: boolean): any {

    let categories = [], outage = [], degrade = [];

    if (cData && cData['loss-of-pon'] && cData['loss-of-pon'].length) {
      let data = cData['loss-of-pon'];
      data.forEach(e => {
        categories.push(this.dateUtils.getChartFormatDate(e.epochtime, 'M/d/yy', true));
        outage.push(e.count);
        //degrade.push(e.count);
      });

    }

    if (cData && cData['ont-us-sdber']) {

      let length = cData['ont-us-sdber'].length;
      for (let i = 0; i < length; i++) {
        degrade.push(cData['ont-us-sdber'][i].count);
      }

    }

    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: null
      },
      xAxis: [{
        min: 0,
        gridLineWidth: 1,
        categories: categories,
        //tickInterval: 5,
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: false,

          title: {
            text: (yLabel ? this.language[yLabel] || yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbolRadius: 100
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: [
        {
          name: `${this.language['Service Outage']}`,
          data: outage,
          //color: '#35c7fc'
        },
        {
          name: `${this.language['Service Degradation']}`,
          data: degrade,
          //color: '#F7C343',
          //yAxis: 1,
        }],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          //pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: categories.length == 1 ? true : false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return options;
  }

  public getBarOptions(cData, yLabel?: any, showLegend?: boolean): any {

    let categories = [], outage = [];

    if (cData && cData['loss-of-pon'] && cData['loss-of-pon'].length) {
      let data = cData['loss-of-pon'];
      data.forEach(e => {
        categories.push(this.dateUtils.getChartFormatDate(e.epochtime, 'M/d/yy', true));
        outage.push(e.count ? e.count : 0);
        //degrade.push(e.count);
      });

    }
    let that = this;
    let options: any = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: null
      },
      xAxis: {
        categories: categories,
      },
      yAxis: [
        {
          min: 0,
          softMax: 1,
          allowDecimals: false,
          title: {
            text: (yLabel ? this.language[yLabel] || yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbolRadius: 100
      },
      lang: {
        noData: !outage?.length ? this.language["No Data Available"] : " "
      },
      series: [{
        name: `${this.language['Loss of PON Alarms'] || 'Loss of PON Alarms'}`,
        data: outage
      }],
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        },
        series: {
          minPointLength: 3,
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                let xAxisValue = this.category;
                that.navigateByUrl(cData, xAxisValue, 'serviceDisruption');
              }
            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          return `<span style="font-size:10px">${this.point.category}</span><table><tr><td style="color:${this.series.color};padding:0">${this.series.name}: </td><td style="padding:0"> &nbsp ${Highcharts.numberFormat(this.point.y, 0, '', '')}</td></tr></table>`
        },
        useHTML: true
      }
    }

    if (categories?.length === 30) {
      options.xAxis.labels = {
        step: 1,
        rotation: -60
      };
    }

    return options;
  }
  public navigateByUrl(data: any, xAxisValue: any, type: any) {
    let url = ``, filters = {};
    if (type == 'serviceDisruption') {
      url = `cco/alerts/system/history-reports`;
      let fields = {
        date: [new Date(xAxisValue), new Date(xAxisValue)]
      }
      let diffDays = this.issueService.getDateParam(fields, false);
      let diffDates = diffDays?.split(',');
      let FromDate, ToDate;
      if (diffDates && diffDates.length > 0) {
        FromDate = new Date(Number(diffDates[0]));
        ToDate = new Date(Number(diffDates[1]));
      }
      filters = {
        date: [FromDate, ToDate],
        eventName: ['loss-of-pon']
      }

    }

    this.router.navigate([url], { state: { filters: filters } });
  }
  public getSubscriberOptions(cData, yLabel?: any, showLegend?: boolean): any {

    let categories = [], outage = [], degrade = [];
    let chartData = [];


    var that = this;

    if (cData && cData['subscriber'] && cData['subscriber'].length) {
      let data = cData['subscriber'];
      data.forEach(e => {
        categories.push(this.dateUtils.getChartFormatDate(e.epochtime, 'M/d/yy', true));
        outage.push(e.count);
        //degrade.push(e.count);
      });


    }


    if (cData && cData['serviceDegrade']) {

      let length = cData['serviceDegrade'].length;

      if (!categories.length) {
        for (let i = 0; i < length; i++) {
          categories.push(this.dateUtils.getChartFormatDate(cData['serviceDegrade'][i].epochtime, 'M/d/yy', true));
        }

      }

      for (let i = 0; i < length; i++) {
        degrade.push(cData['serviceDegrade'][i].count);
      }


    }

    let options = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'line',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
        plotBorderWidth: 1,
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: null
      },
      xAxis: [{
        min: 0,
        gridLineWidth: 1,
        categories: categories,
        //tickInterval: 5,
        //crosshair: true,
      }],
      yAxis: [
        { // Primary yAxis
          min: 0,
          allowDecimals: false,

          title: {
            text: (yLabel ? this.language[yLabel] || yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbolRadius: 100
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        useHTML: true,
        // formatter: function () {
        //   var s = '<b>' + this.x + '</b>';
        //   this.points.forEach(point => {
        //     //  s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + 'Number of Subscribers' + ': ' + point.y;
        //   });

        //   return s;
        // },

      },
      series: [
        {
          name: `${this.language['Number of Subscribers Impacted']}`,
          data: outage,
        },
        {
          name: `${this.language['Service Degradation']}`,
          data: degrade,
        }
      ],
      plotOptions: {
        series: {
          // ...this.plotOptions,
          cursor: 'pointer',
          //pointPadding: 2, // Defaults to 0.1
          // groupPadding: 0.1,
          marker: {
            enabled: categories.length == 1 ? true : false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            },
          },
          pointPlacement: 'on',
          point: {
            events: {

            }
          }
        },
        states: {
          inactive: {
            enabled: false
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
          },
        }]
      }
    }

    return options;
  }

  public getSubscriberBarOptions(cData, yLabel?: any, showLegend?: boolean): any {

    let categories = [], outage = [];

    if (cData && cData['subscriber'] && cData['subscriber'].length) {
      let data = cData['subscriber'];
      data.forEach(e => {
        categories.push(this.dateUtils.getChartFormatDate(e.epochtime, 'M/d/yy', true));
        outage.push(e.count ? e.count : 0);
        //degrade.push(e.count);
      });
    }
    let that = this;
    let options: any = {
      ...this.commonHighChartOptions,
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        style: {
          fontFamily: 'Source Sans Pro,Regular',
          fontSize: '12px',
          color: '#4c4c4c'
        },
      },
      colors: ['#0027FF', '#5ACFEA'],
      title: {
        text: null
      },
      xAxis: {
        categories: categories,
        // showLastLabel: true,
        // endOnTick: false,
      },
      yAxis: [
        {
          min: 0,
          softMax: 1,
          allowDecimals: false,
          title: {
            text: (yLabel ? this.language[yLabel] || yLabel : ''),
            style: {
              color: '#727272'
            }
          },
          style: {
            fontFamily: 'Source Sans Pro,Regular',
            fontSize: '13px',
            color: '#4c4c4c'
          }
        }
      ],
      legend: {
        symbolRadius: 100
      },
      lang: {
        noData: !outage?.length ? this.language["No Data Available"] : ""
      },
      series: [
        {
          name: `${this.language['Subscribers affected by ONT or PON Alarms'] || 'Subscribers affected by ONT or PON Alarms'}`,
          data: outage,
        }
      ],
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        },
        series: {
          minPointLength: 3,
          cursor: 'pointer',
          point: {
            events: {}
          }
        },

      },
      tooltip: {
        formatter: function () {
          return `<span style="font-size:10px">${this.point.category}</span><table><tr><td style="color:${this.series.color};padding:0">${this.series.name}: </td><td style="padding:0"> &nbsp ${Highcharts.numberFormat(this.point.y, 0, '', '')}</td></tr></table>`
        },
        useHTML: true
      }
    }

    if (categories?.length === 30) {
      options.xAxis.labels = {
        step: 1,
        rotation: -60
      };
    }

    return options;
  }

  setFilterDays(value) {
    this.filterDays = value;
    this.filterDays$.next(value);
  }

  setSystemStatusData(data) {
    this.systemStatusData$.next(data);
  }

  loadSystemStatusData() {

  }

  setpercentage(a, b, degit?: any) {
    //return ((100 * ((a - b) / ((a + b) / 2))).toFixed(degit ? degit : 0))
    return ((100 * ((a - b) / b)).toFixed(degit ? degit : 2))
  }

  checkPositvNegativ(returnqlickdata) {
    if (returnqlickdata == '0') {
      return '+';
    }
    if (returnqlickdata.charAt(0) == '-')
      return '-';
    else
      return '+';
  }

}
