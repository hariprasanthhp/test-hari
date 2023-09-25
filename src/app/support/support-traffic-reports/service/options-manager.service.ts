import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isDOMElement } from 'highcharts';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { FaUtilsService } from './fa-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import * as moment from 'moment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ReportApiService } from '../reports/service/report-api.service';
import * as Highcharts from 'highcharts';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class OptionsManagerService {
  language: any;
  constructor(
    private router: Router,
    private utils: FaUtilsService,
    private dateUtils: DateUtilsService,
    private excel: ExportExcelService,
    private customTranslateService: CustomTranslateService,
    private sso: SsoAuthService,
    private service: ReportApiService

  ) {
    this.language = this.customTranslateService.defualtLanguage;

    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

    });
  }

  makeOptionsForTraffic(data: any, type: any, params?: any): any {
    var that = this;
    let pipe = new DatePipe('en-US');
    let upUsage: any, upUsageTotal = 0;
    let downUsage: any, downUsageTotal = 0;

    // let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    let timezoneName = that.language['Coordinated Universal Time']  //'Coordinated Universal Time';
    let diff = moment(params.endDate).diff(moment(params.startDate), "hour");
    let subTitle = '';

    let categories = [];
    let seriesData1 = [];
    let seriesData2 = [];

    for (let i = 0; i < data.length; i++) {
      let period = this.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true);
      if (params['granularity'] === '1hour') {
        period = this.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/dd HH:mm');
      }
      categories.push(period);

      seriesData1.push((data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : null);
      seriesData2.push((data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : null);

      upUsageTotal += (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : 0;
      downUsageTotal += (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : 0;

    }

    let upUsageUnit = this.getStackedUnit(upUsageTotal);
    let downUsageUnit = this.getStackedUnit(downUsageTotal);
    upUsage = (upUsageTotal / upUsageUnit[0]).toFixed(2) + ' ' + upUsageUnit[1];
    downUsage = (downUsageTotal / downUsageUnit[0]).toFixed(2) + ' ' + downUsageUnit[1];
    const self = this;

    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      time: {
        useUTC: false
      },
      title: {
        text: this.language['subscriberUsage']
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var s;
            var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
            s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' : ' ' + unit[1]);
            return s;
          }
        },
        opposite: false,
        tickLength: 2
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        reversed: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          //color: '#E87B00',
          colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
          // cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: [],
      exporting: {
        filename: 'Subscriber_Usage',
        buttons: {
          contextButton: {
            menuItems: [
              {
                textKey: 'downloadPDF',
                text: this.language.exportPDF || 'Export PDF',
                onclick: function () {
                  this.exportChart({
                    type: 'application/pdf'
                  });
                }
              },
              {
                textKey: 'downloadCSV',
                text: this.language.exportCsv || 'Export CSV',
                onclick: function () {
                  let dataExport = [];
                  let extraData: string = '';
                  let subscriber = ``;
                  if (that.sso.getTrafficReportChartSubscriberInfo()) {
                    subscriber = `${self.language.Subscriber}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`
                  }
                  extraData = `${self.language.subscriberUsage}\r\n${subscriber}${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n${that.language['upUsageTitle']}: ${upUsage}    ${that.language['downUsageTitle']}: ${downUsage}\r\n`;
                  for (var i = 0; i < data.length; i++) {
                    dataExport.push(
                      {
                        [self.language['Date Time']]: that.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'),
                        [self.language['Up Usage(Byte)']]: (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets.toLocaleString() : 0,
                        [self.language['Down Usage(Byte)']]: (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets.toLocaleString() : 0
                      }
                    )
                  }
                  that.excel.downLoadCSV('Subscriber_Usage', dataExport, extraData);
                }
              }
            ],
            text: that.language['export'],
            //className: 'export_menu',
            // symbol: 'url(/assets/images/export.png)'
          }
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var name = this.x || this.point.name;
          var unit = that.getUnit(m);
          return '<p><strong>' + name + '</strong><br/><span> ' + this.series.name + ': <strong>' + (this.y / unit[0]).toFixed(2) + ' ' + unit[1] + '</strong><br/></span></p>';
        }
      },
    };

    options.series = [{
      name: this.language['upUsageTitle'],
      data: seriesData1,
      color: "#82BF00" // green
    }, {
      name: this.language['downUsageTitle'],
      data: seriesData2,
      color: "#0279FF" // blue
    }];


    options.xAxis['categories'] = categories;
    let subscriber = ``;
    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><br/>
    <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['upUsageTitle']}: ${upUsage}    ${this.language['downUsageTitle']}: ${downUsage}</span>`;
    options.subtitle.text = subTitle;

    return options;
  }

  dataFormingForRTBC(data, dataType) {
    let categories = [];
    let seriesData1 = [];
    if (dataType === 'upData') {
      data.upData = data.upData.slice(0, 5);
      for (let i = 0; i < data.upData.length; i++) {
        categories.push(data.upData[i].name);

        seriesData1.push({
          y: data.upData[i].value,
          id: data.upData[i].id,
          name: data.upData[i].name
        });
      }
    } else {
      data.downData = data.downData.slice(0, 5);
      for (let i = 0; i < data.downData.length; i++) {
        categories.push(data.downData[i].name);
        seriesData1.push({
          y: data.downData[i].value,
          id: data.downData[i].id,
          name: data.downData[i].name
        });
      }
    }
    let series = [{ name: dataType, data: seriesData1 }];

  }
  makeOptionsForRTBC(data: any, type: any, dataType?: any, sliceNum?: any, fsView?: any): any {
    let that = this;
    sliceNum = sliceNum ? sliceNum : 5;
    let categories = [];
    let seriesData1 = [];
    let tickAmount = fsView ? 6 : 3;

    let options: any = {
      chart: {
        type: 'bar',
        zoomType: "xy",
        height: 180,
        renderTo: 'container'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: ''
        },
        opposite: true,
        tickLength: 2,
        tickAmount: tickAmount,
        startOnTick: false,
        endOnTick: false,
        labels: {
          formatter: function () {
            // let ret = `${that.utils.bitsToSize(this.value, true)}`
            let ret = `${that.bitsToSize(this.value, false)}`
            return ret;
          },
          rotation: 0
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          color: '#0027FF',
          cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: [],
      tooltip: {
        formatter: function () {
          let ret = `${this.x} <br/> ${that.utils.bitsToSize(this.y, false)}`
          return ret;
        }
      },
    };
    let xData = [], ids = [];
    if (type === 'bar') {
      if (dataType === 'upData') {
        data.upData = data.upData.slice(0, sliceNum);
        for (let i = 0; i < data.upData.length; i++) {
          categories.push(data.upData[i].name);
          seriesData1.push(data.upData[i].value);
          xData.push(data.upData[i].name);
          ids.push(data.upData[i].id);
        }
      } else {
        data.downData = data.downData.slice(0, sliceNum);
        for (let i = 0; i < data.downData.length; i++) {
          categories.push(data.downData[i].name);
          seriesData1.push(data.downData[i].value);
          xData.push(data.downData[i].name);
          ids.push(data.downData[i].id);
        }
      }
      options.series = [{
        data: seriesData1,
        // xData: xData,
        // id: ids
      }];
    }

    options.xAxis['categories'] = categories;

    return options;
  }

  makeOptionsForAreaChart(data: any, dType: any, params?: any): any {
    let categories = [];
    let seriesData = [];

    let options: any = {
      chart: {
        type: 'area',
        zoomType: "xy"
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: []
    };



    let cData = [];
    for (let i = 0; i < data.length; i++) {

      if (dType == 'up') {
        cData.push({
          name: data[i].name,
          data: [data[i].usOctets]
        });
      } else {
        cData.push({
          name: data[i].name,
          data: [data[i].dsOctets]
        });
      }

    }

    options.xAxis.categories = [params.startDate];

    options.series = cData;



    return options;

  }

  makeOptionsForLineChart(data: any, dType: any, params?: any): any {

    let up = this.language['max_up_rate'];
    let down = this.language['max_down_rate'];
    let that = this;
    let categories = [];
    let upData = [];
    let downData = [];
    let subsId = `${this.sso.getReportChartSubscriberInfo()}`;

    if (params['rateSelected'] == 'Average') {
      up = this.language['Average_Up_Rate'];
      down = this.language['Average_Down_Rate'];
    }

    let pipe = new DatePipe('en-US');
    let startDate = new Date(params.startDate);
    let endDate = new Date(params.endDate);
    let granularity = this.service.getGranularityByChart(startDate, endDate, 'rate');

    for (let i = 0; i < data.length; i++) {

      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'));

      // upData.push(data[i].peakUsRate);
      // downData.push(data[i].dsRate);
      // upRateTotal += data[i].peakUsRate ? data[i].peakUsRate : 0;
      // downRateTotal += data[i].peakDsRate ? data[i].peakDsRate : 0;

    }

    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    // let timezoneName = 'UTC';
    let diff = moment(params.endDate).diff(moment(params.startDate), "hour");
    let subscriber = ``;
    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    let subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Rate: ${this.language[params['rateSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>`

    let options: any = {
      chart: {
        type: 'line'
      },
      time: {
        useUTC: false
      },
      title: {
        text: this.language['subscriberRate']
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: [],
        labels: {
          rotation: -65,
          formatter: function () {
            let label = this.value;
            if (this.isLast) {
              let len = this.axis.categories.length;
              // label = this.axis.categories[len - 1];
            }
            return label;
          }
        },
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          formatter: function () {
            return that.utils.bitsToSize(this.value, true);
          }
        },
        min: 0,
        minRange: 1
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolRadius: 0,
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + ' <b><br/>' + this.series.name + ': <b>' + that.utils.bitsToSize(this.y, false) + '</b>';
        }
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        },
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
            //color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: [
        {
          name: up,
          color: '#82BF00', // green
          data: []
        }, {
          name: down,
          color: '#0279FF', // blue
          data: []
        }
      ],
      exporting: {
        filename: 'Subscriber_Rate',
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF || 'Export PDF',
              onclick: function () {
                this.exportChart({
                  type: 'application/pdf'
                });
              }
            }, {
              textKey: 'downloadCSV',
              text: this.language.exportCsv || 'Export CSV',
              onclick: function () {
                let dataExport = [];
                let extraData: string = '';
                let subscriber = ``;
                if (that.sso.getTrafficReportChartSubscriberInfo()) {
                  subscriber = `${that.language['Subscriber']}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`;
                }
                extraData = `Subscriber Rate\r\n${subscriber}${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nRate: ${params['rateSelected']}\r\n`;
                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'),
                      'Max Up Rate(bps)': (data[i].peakUsRate && data[i].peakUsRate !== -1) ? data[i].peakUsRate : 0,
                      // 'Max Up Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                      'Max Down Rate(bps)': (data[i].peakDsRate && data[i].peakDsRate !== -1) ? data[i].peakDsRate : 0,
                      'Average Up Rate(bps)': (data[i].usRate && data[i].usRate !== -1) ? data[i].usRate : 0,
                      'Average Down Rate(bps)': (data[i].dsRate && data[i].dsRate !== -1) ? data[i].dsRate : 0,
                      // 'Max Down Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                      // 'Average Up Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                      // 'Average Down Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0,
                    }
                  )
                }
                that.excel.downLoadCSV('Subscriber_Rate', dataExport, extraData);
              }
            }],
            text: that.language['export'],
            //className: 'export_menu',
            // symbol: 'url(/assets/images/export.png)'
          }
        }
      },
      credits: {
        enabled: false
      }
    }



    let cData = [];
    for (let i = 0; i < data.length; i++) {

      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'));

      if (params['rateSelected'] == 'Average') {
        upData.push(data[i].usRate);
        downData.push(data[i].dsRate);
      } else {
        upData.push(data[i].peakUsRate);
        downData.push(data[i].peakDsRate);
      }

    }

    options.xAxis.categories = categories;
    if (categories && categories.length <= 45) {
      options.xAxis['tickInterval'] = 1;
    } else if (categories && categories.length > 45) {
      options.xAxis['tickInterval'] = Math.floor(categories.length / 45);
    }
    options.series[0].data = upData;
    options.series[1].data = downData;

    return options;

  }

  makeOptionsForMonthlyUsage(data: any, type: any, params?: any): any {
    //data = JSON.parse("[{\"dateMonth\":\"2020-08\",\"upUsage\":12774687764,\"downUsage\":347449409818},{\"dateMonth\":\"2020-09\",\"upUsage\":16539630495,\"downUsage\":587600950182},{\"dateMonth\":\"2020-10\",\"upUsage\":14156405546,\"downUsage\":509860217630}]");
    var that = this;
    let pipe = new DatePipe('en-US');

    // let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    let timezoneName = that.language['Coordinated Universal Time']  //'Coordinated Universal Time';
    let date = new Date();
    let monthCount = params.monthCount ? params.monthCount : 1;
    let firstDay = new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    let startDate = this.dateUtils.getMonthYear(firstDay);
    let subsId = '';
    let endDate = this.dateUtils.getMonthYear(lastDay);

    let subTitle = '';
    let upUsage: any, upUsageTotal = 0;
    let downUsage: any, downUsageTotal = 0;


    let categories = [];
    let seriesData1 = [];
    let seriesData2 = [];

    for (let i = 0; i < data.length; i++) {
      //let period = this.dateUtils.getChartFormatDate(data[i].startPeriodSec, 'MM/yyyy');
      let period = this.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/yyyy');
      categories.push(period);

      seriesData1.push((data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : null);
      seriesData2.push((data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : null);

      upUsageTotal += (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : 0;
      downUsageTotal += (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : 0;

    }

    let upUsageUnit = this.getStackedUnit(upUsageTotal);
    let downUsageUnit = this.getStackedUnit(downUsageTotal);
    upUsage = (upUsageTotal / upUsageUnit[0]).toFixed(2) + ' ' + upUsageUnit[1];
    downUsage = (downUsageTotal / downUsageUnit[0]).toFixed(2) + ' ' + downUsageUnit[1];

    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: this.language['subscriberMonthlyUsage']
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var s;
            var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
            s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' : ' ' + unit[1]);
            return s;
          }
        },
        opposite: false,
        tickLength: 2
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        reversed: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          //color: '#E87B00',
          colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
          // cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: [],
      exporting: {
        filename: 'Subscriber_Monthly_Usage',
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF || 'Export PDF',
              onclick: function () {
                this.exportChart({
                  type: 'application/pdf'
                });
              }
            }, {
              textKey: 'downloadCSV',
              text: this.language.exportCsv || 'Export CSV',
              onclick: function () {
                let dataExport = [];
                let extraData: string = '';
                let subscriber = ``;
                if (that.sso.getTrafficReportChartSubscriberInfo()) {
                  subscriber = `${that.language['Subscriber']}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`;
                }
                extraData = `${that.language['subscriberMonthlyUsage']}\r\n${subscriber}${that.language['time_win']}: ${startDate} - ${endDate} [${timezoneName}]\r\n${that.language['upUsageTitle']}: ${upUsage}    ${that.language['downUsageTitle']}: ${downUsage}\r\n`;
                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/yyyy'),
                      'Up Usage(Byte)': (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets.toLocaleString() : 0,
                      'Down Usage(Byte)': (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets.toLocaleString() : 0
                    }
                  )
                }
                that.excel.downLoadCSV('Subscriber_Monthly_Usage', dataExport, extraData);
              }
            }],
            text: 'Export',
            //className: 'export_menu',
            // symbol: 'url(/assets/images/export.png)'
          }
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var name = this.x || this.point.name;
          var unit = that.getUnit(m);
          return '<p><strong>' + name + '</strong><br/><span> ' + this.series.name + ': <strong>' + (this.y / unit[0]).toFixed(2) + ' ' + unit[1] + '</strong><br/></span></p>';
        }
      }
    };






    options.series = [{
      name: this.language['upUsageTitle'],
      data: seriesData1,
      color: "#82BF00" // green
    }, {
      name: this.language['downUsageTitle'],
      data: seriesData2,
      color: "#0279FF" // blue
    }];



    options.xAxis['categories'] = categories;
    let subscriber = ``;
    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${startDate} to ${endDate} [${timezoneName}]</span><br/>
    <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['upUsageTitle']}: ${upUsage}    ${this.language['downUsageTitle']}:  ${downUsage}</span>`;
    options.subtitle.text = subTitle;


    return options;
  }

  convertDate(ts) {
    var date = new Date(ts);
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }



  /**
   * setTopEP
   */
  public setTopEP(data: any) {
    if (data) {
      localStorage.setItem('calix.topep_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.topep_data');
    }

  }

  public getTopEP() {
    return localStorage.getItem('calix.topep_data') ? JSON.parse(localStorage.getItem('calix.topep_data')) : [];
  }

  public setTopApp(data: any) {
    if (data) {
      localStorage.setItem('calix.topapp_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.topapp_data');
    }
  }

  public getTopApp() {
    return localStorage.getItem('calix.topapp_data') ? JSON.parse(localStorage.getItem('calix.topapp_data')) : [];
  }

  public setTopLoc(data: any) {
    if (data) {
      localStorage.setItem('calix.toploc_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('calix.toploc_data');
    }
  }

  public getTopLoc() {
    return localStorage.getItem('calix.toploc_data') ? JSON.parse(localStorage.getItem('calix.toploc_data')) : [];
  }

  getStackedUnit(m) {
    let unit: any;
    if (m > 1000000000000) {
      unit = [1000000000000, 'TB'];//1099511627776
    } else if (m > 1000000000) {
      unit = [1000000000, 'GB'];//1073741824
    } else if (m > 1000000) {
      unit = [1000000, 'MB'];//1048576
    } else if (m > 1000) {
      unit = [1000, 'KB'];//1024
    } else {
      unit = [1, ''];
    }
    return unit;
  }

  /***begin-aswin-06-05-2021-localstorage-realtime-graphdata */
  defaultData = {
    downData: [],
    downPercentage: "",
    downTotal: "",
    graphType: "",
    sendTime: (new Date()).getTime(),
    upData: [],
    upPercentage: "",
    upTotal: ""
  }
  public setNetworkRealTimeGraphData(key: string, data: any) {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.removeItem(key);
    }
  }

  public getNetworkRealTimeGraphData(key) {
    this.defaultData['graphType'] = key;
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : this.defaultData;
  }
  /***end-aswin-06-05-2021-localstorage-realtime-graphdata */


  bitsToSize(bits: any, round?: any) {
    let bytes = bits;

    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    if (bytes == 0) return '0 bps';

    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    if (round) {
      return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
    }

    if (i < 0) {
      i = 0;
    }
    let n = 1;
    if (Number.isInteger(+Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 1))) {
      n = 0;
    }

    return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), n) + ' ' + sizes[i];
  }

  getDateTime(time, utc?, format?) {
    let offset = -1 * (new Date().getTimezoneOffset() * 60)
    if (utc) {
      time = parseInt(time + offset) * 1000;
    } else {
      time = parseInt(time) * 1000;
    }
    let date = DateTime.fromMillis(time);
    let dateString = '';
    if (format) {
      dateString = date.toUTC().toFormat(format);
    } else {
      dateString = date.toUTC().toFormat('MM/dd/yyyy');
    }
    return dateString;
  }

  getUnit(m) {
    let unit: any;
    if (m > 1000000000000) {
      unit = [1000000000000, 'TB'];
    } else if (m > 1000000000) {
      unit = [1000000000, 'GB'];
    } else if (m > 1000000) {
      unit = [1000000, 'MB'];
    } else if (m > 1000) {
      unit = [1000, 'KB'];
    } else {
      unit = [1, 'KB'];
    }
    return unit;
  }

}

