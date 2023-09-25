import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';
import { EndpointReportsService } from '../endpoint-reports.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

(function (Highcharts: any) {
  Highcharts.exportEndpointCharts = function (charts, options) {

    // Merge the options
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

    // Post to export server

    options.url = environment.highchartExportURL;
    Highcharts.post(options.url, {
      filename: options.filename || 'Subscriber-Top-Application-Traffic',
      type: options.type,
      width: options.width,
      svg: Highcharts.getSVG(charts)
    });
  };


  Highcharts.getSVG = function (charts) {
    var svgArr = [],
      top = 0,
      width = 0;
    charts.forEach(chart => {
      //console.log(chart, 'chart')
      const cWidth = chart.chartWidth;
      const cHeight = chart.chartHeight;
      chart.setSize(
        cWidth + 100,
        cHeight + (100 * chart.legend.pages.length | 0)
      );
      chart.options.legend.navigation.enabled = false;
      var svg = chart.getSVG(),
        // Get width/height of SVG for export
        svgWidth = +svg.match(
          /^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/
        )[1],
        svgHeight = +svg.match(
          /^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/
        )[1];

      svg = svg.replace(
        '<svg',
        '<g transform="translate(0,' + top + ')" '
      );
      svg = svg.replace('</svg>', '</g>');

      top += svgHeight;
      width = Math.max(width, svgWidth);
      svgArr.push(svg);
      chart.options.legend.navigation.enabled = true;
      chart.setSize(
        cWidth,
        cHeight
      );
    });

    return '<svg height="' + top + '" width="' + width +
      '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      svgArr.join('') + '</svg>';
  };
}

)(Highcharts);

@Component({
  selector: 'app-top-application-traffic',
  templateUrl: './top-application-traffic.component.html',
  styleUrls: ['./top-application-traffic.component.scss']
})
export class TopApplicationTrafficComponent implements OnInit {

  error: boolean;
  errorInfo: string = '';
  language: any;
  pageAvailable: boolean = false;
  page: any;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  upUsage: string = '';
  downUsage: string = '';
  subscribe: any
  data: any;
  topAppsChartOptions: any;
  topAppsPieChartOptions: any;
  upChart: any;
  downChart: any;

  constructor(
    private customTranslateService: CustomTranslateService,
    private service: EndpointReportsService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private options: ChartOptionsService
  ) {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.renderChart();
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
    });

  }

  ngOnInit() {
    this.page = {
      main_route: 'endpoints',
      sub_route: 'top-applications-traffic',
      showStartDate: true,
      showEndDate: true,
      showLimit: true,
      showDirection: false,
      showRate: true
    };

  }


  loadChartData(data: any) {
    data.groupBy = 'application';
    this.topAppsPieChartOptions = null;
    this.topAppsChartOptions = null;
    this.filters = data;
    this.loading = true;
    let upoptions: any;
    let downoptions: any;
    this.subscribe = this.service.getAppTraffic(data).subscribe((res: any) => {
      this.data = res;
      this.options.btnDisabled = false;
      if (data['rateSelected'] == 'Average') {
        upoptions = this.makeAreaChartOptions(this.getData(res, "usRate"), 'usRate', 'Up', this.filters);
        downoptions = this.makeAreaChartOptions(this.getData(res, "dsRate"), 'dsRate', 'Down', this.filters);

      } else {
        this.filters['rateSelected'] = 'Max';
        upoptions = this.makeAreaChartOptions(this.getData(res, "peakUsRate"), 'peakUsRate', 'Up', this.filters);
        downoptions = this.makeAreaChartOptions(this.getData(res, "peakDsRate"), 'peakDsRate', 'Down', this.filters);
      }
      if(document.getElementById('container-up') && document.getElementById('container-down')){
        this.upChart = this.Highcharts.chart('container-up', upoptions);
        this.downChart = this.Highcharts.chart('container-down', downoptions);
      }
      this.loading = false;
    }, (err: any) => {
      this.pageErrorHandle(err);
      this.options.btnDisabled = false;
    });

  }

  makeAreaChartOptions(res: any, type, rate, params: any): any {
    let that = this;
    let pipe = new DatePipe('en-US');

    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    // let timezoneName = 'UTC';
    let subscriber = ``;
    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    let subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Rate: ${params['rateSelected'] === 'Max' ? this.language['Peak'] : this.language['Average']}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><span style="font-size:16px; color:#ffffff">...</span>`;
    var seriesName = [];

    if (res.length) {
      res.forEach((element: any) => {
        if (element[type] === -1) {
          element[type] = 0;
        }
        if (!element.name) {
          element.name = "Other";
        }
        if (seriesName.indexOf(element.name) === -1) {
          seriesName.push(element.name);
        }
      });
    }

    var seriesData = [];
    var xAxisCategories = [];
    $.each(seriesName, (key, value) => {
      var obj: any = {};
      obj.name = value;
      obj.data = [];
      $.each(res, (k, v) => {
        if (!v.name) {
          v.name = "Other";
        }
        if (v.name === value) {
          obj.data.push(v[type]);
          xAxisCategories.push(this.options.getDateTime(v.startPeriodSec, true, 'MM/dd HH:mm'));
          // xAxisCategories.push(this.dateUtils.getUTCDateFormatFromUTCTime(v.startPeriodSec, true, 'MM/dd HH:mm'));
        }
      });
      seriesData.push(obj);
    });
    if (seriesData.length == 0) {
      seriesData = [{
        name: rate,
        data: []
      }]
    }
    let colors = this.topApplicationTrafficColors();
    let options = {
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      chart: {
        type: 'area',
        zoomType: 'xy'
      },
      title: {
        text: rate === 'Down' ? '' : this.language['subscriberToponTraffic']
      },
      subtitle: {
        text: rate === 'Down' ? '' : subTitle,
        widthAdjust: -200
      },
      xAxis: {
        categories: xAxisCategories,
        labels: {
          formatter: function () {
            return this.value.length > 23 ? this.value.substring(0, 19) + '...' : this.value;
          },
          "isFunction": true
        },
        tickInterval: (function () {
          let sLength = seriesName.length;
          let xCategLength = xAxisCategories.length;
          let xAxisLen = Math.floor(xCategLength / sLength);
          let f = 1;
          if (xAxisLen <= 10) {
            f = 1;
          } else if (xAxisLen > 10 && xAxisLen < 20) {
            f = 2;
          } else {
            f = Math.floor(xAxisLen / 8) ? Math.floor(xAxisLen / 8) : 1;
          }
          return f;
        })()
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
            return (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');
          }
        },
        title: {
          text: rate
        },
        stackLabels: {
          enabled: false,
          style: {
            fontWeight: 'bold',
          }
        },
        tickPixelInterval: 55
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      tooltip: {
        formatter: function () {
          let val: any = that.topApplicationTrafficTooltip(this.y)[0];
          return '<p><strong>' + this.series.name + '</strong><br/><strong>' + this.x + '</strong><br/><span>' + params['rateSelected'] + ' ' + rate + ' ' + 'Rate' + ': <strong>' + (this.y / val).toFixed(2) + ' ' + that.topApplicationTrafficTooltip(this.y)[1] + '</strong><br/></span></p>';
        }
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
            //enabled: false
          }
        }
      },
      series: seriesData,
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
        lineHeight: 10,
        itemStyle: {
          width: '150px',
          textOverflow: 'clip',
        }
      },
      "interactive": true,
      "datetimeSupported": true,
      "treemapSupported": true,
      colors: colors
    }

    if (rate !== 'Down') {
      options['exporting'] = {
        filename: 'Subscriber_Top_Application_Traffic',
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF || 'Export PDF',
              onclick: function () {
                that.exportTrafficChart();
              }
            }, {
              textKey: 'downloadCSV',
              text: this.language.exportCsv || 'Export CSV',
              onclick: function () {
                let UpdataExport = [];
                let DowndataExport = [];
                let UpextraData: string = '';
                let DownextraData: string = '';
                let Rate = params['rateSelected'] === 'Max' ? that.language['Peak'] : that.language['Average'];
                let subscriber = ``;
                if (that.sso.getTrafficReportChartSubscriberInfo()) {
                  subscriber = `Subscriber: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`;
                }
                UpextraData = `Subscriber Top Application Traffic\r\n${subscriber}${that.language.rate}: ${Rate}\r\n${that.language.criteria}: ${that.language.rate}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nUpstream Traffic\r\n`;
                DownextraData = `\r\nDownstream Traffic\r\n`
                for (var i = 0; i < res.length; i++) {
                  if (res[i].name) {
                    UpdataExport.push(
                      {
                        'Date Time': that.options.getDateTime(res[i].startPeriodSec, true, 'MM/dd HH:mm'),
                        'Name': res[i].name ? res[i].name : 'Other',
                        'Usage(Byte)': (res[i].usOctets && res[i].usOctets !== -1) ? res[i].usOctets.toLocaleString() : 0,
                        'Max Up Rate(bps)': (res[i].peakUsRate && res[i].peakUsRate !== -1) ? res[i].peakUsRate.toLocaleString() : 0,
                        'Average Up Rate(bps)': (res[i].usRate && res[i].usRate !== -1) ? res[i].usRate.toLocaleString() : 0
                      }
                    )
                  }
                }
                for (var i = 0; i < res.length; i++) {
                  if (res[i].name) {
                    DowndataExport.push(
                      {
                        'Date Time': that.options.getDateTime(res[i].startPeriodSec, true, 'MM/dd HH:mm'),
                        'Name': res[i].name ? res[i].name : 'Other',
                        'Usage(Byte)': (res[i].dsOctets && res[i].dsOctets !== -1) ? res[i].dsOctets.toLocaleString() : 0,
                        'Max Down Rate(bps)': (res[i].peakDsRate && res[i].peakDsRate !== -1) ? res[i].peakDsRate.toLocaleString() : 0,
                        'Average Down Rate(bps)': (res[i].dsRate && res[i].dsRate !== -1) ? res[i].dsRate.toLocaleString() : 0
                      }
                    )
                  }
                }
                that.downLoadCSV('Subscriber_Top_Application_Traffic', UpdataExport, DowndataExport, UpextraData, DownextraData);

              }
            }],
            text: that.language['export'],
            className: 'export_menu',
          }
        }
      }
    } else {
      options['exporting'] = {
        enabled: false
      }
    }
    return options;

  }

  topApplicationTrafficTooltip(m) {
    let unit: any;
    return unit = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
  };

  topApplicationTrafficColors() {
    return ['#0279FF', '#82BF00', '#836EE8', '#FF8238', '#029A7C', '#F7C343', '#FF489D', '#C74900', '#2EC4B6', '#0054B2']; // newly added color codes
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    this.loading = false;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  closeAlert() {
    this.error = false;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  exportTrafficChart() {

    (Highcharts as any).exportEndpointCharts([this.upChart, this.downChart], {
      type: 'application/pdf'
    });
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  downLoadCSV(name: string, UpchartData: any, DownchartData: any, UpextraData?: any, DownextraData?: any) {
    let data = UpchartData;
    let headers = [];
    /* to get max length object */
    let maxSize = 0;
    let maxIndex = 0;
    let i = 0;
    for (let obj of data) {
      let size = this.getSize(obj);
      if (size > maxSize) {
        maxSize = size;
        maxIndex = i;
      }
      i++;
    }
    for (let key in data[maxIndex]) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
      }
    }
    let fName = name + '.csv';
    let fType = 'text/csv;charset=utf-8'
    let UpcsvData = this.ConvertToCSV(data, headers);
    let DowncsvData = this.ConvertToCSV(DownchartData, headers);
    let csvData = UpextraData + UpcsvData + DownextraData + DowncsvData;
    var blob = new Blob([csvData], { type: fType });
    saveAs(blob, fName);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        line += '\"' + (array[i][head] != undefined ? array[i][head] : '') + '\"' + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }

  getSize(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  renderChart() {
    let upoptions: any;
    let downoptions: any;
    if (this.filters['rateSelected'] == 'Average') {
      upoptions = this.makeAreaChartOptions(this.getData(this.data, "usRate"), 'usRate', 'Up', this.filters);
      downoptions = this.makeAreaChartOptions(this.getData(this.data, "dsRate"), 'dsRate', 'Down', this.filters);
    } else {
      this.filters['rateSelected'] = 'Max';
      upoptions = this.makeAreaChartOptions(this.getData(this.data, "peakUsRate"), 'peakUsRate', 'Up', this.filters);
      downoptions = this.makeAreaChartOptions(this.getData(this.data, "peakDsRate"), 'peakDsRate', 'Down', this.filters);
    }
    this.upChart = this.Highcharts.chart('container-up', upoptions);
    this.downChart = this.Highcharts.chart('container-down', downoptions);
  }

  getData(data: any, type: any) {
    if (Array.isArray(data) && data.length > 0) {
      return data.some(element => element[type] > 0) ? data : [];
    } else {
      return [];
    }
  }

}