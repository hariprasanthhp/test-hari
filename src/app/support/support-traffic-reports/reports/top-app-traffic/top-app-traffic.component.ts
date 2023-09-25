declare var require: any;
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Router } from '@angular/router';

import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';

import { ReportApiService } from '../service/report-api.service';
import { DateUtilsService } from '../../../../shared-utils/date-utils.service'

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

import * as $ from 'jquery';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

(function (Highcharts: any) {
  Highcharts.exportCharts = function (charts, options) {

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
      const cWidth = chart.chartWidth;
      const cHeight = chart.chartHeight;
      chart.setSize(
        cWidth,
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
  selector: 'app-top-app-traffic',
  templateUrl: './top-app-traffic.component.html',
  styleUrls: ['./top-app-traffic.component.scss']
})
export class TopAppTrafficComponent implements OnInit, OnDestroy {
  error: boolean;
  errorInfo: string = '';
  language: any;
  pageAvailable: boolean = false;

  page: any;
  loading: boolean = false;
  filters: any;

  Highcharts = Highcharts;
  trafficChartData: any;
  trafficChartOptions: any;
  trafficRateOtions: any;
  chart: any;
  chartCallback: any;
  chartConstructor = "chart";
  breadcrumb: any;
  usageChartData: any;
  afterFirstClick = false;
  oneToOneFlag = true;
  updateFlag = false;
  upUsage: string = '';
  downUsage: string = '';

  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private service: ReportApiService,
    private dateUtils: DateUtilsService,
    private commonOrgService: CommonService,
    private excel: ExportExcelService,
    private sso: SsoAuthService
  ) {

    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;

      //console.log(this.upUsage);
      //console.log(this.downUsage);
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
    });

    const self = this;
    this.chartCallback = chart => {
      // saving chart reference
      self.chart = chart;
    };
  }

  ngOnInit() {
    this.page = {
      main_route: 'network',
      sub_route: 'top-applications',
      showLocation: false,
      showApplication: false,
      showCriteria: false,
      showStartDate: true,
      showEndDate: true,
      showLimit: true,
      showGroup: false,
      showDirection: false,
      showRate: true

    };

    this.sso.setActionLog('CSC', 'pageHit', 'reports - top application traffic', window.location.href, 'top application traffic reports intiated');

  }

  subscribe: any
  data: any;

  topAppsChartData: any;
  topAppsChartOptions: any;
  topAppsPieChartOptions: any;
  chartType = 'bar';

  upChart: any;
  downChart: any;
  loadChartData(data: any) {
    ////console.log('data', data);

    data.groupBy = 'application'
    this.topAppsPieChartOptions = null;
    this.topAppsChartOptions = null;

    this.filters = data;
    this.loading = true;
    let upoptions: any;
    let downoptions: any;
    this.subscribe = this.service.getAppTraffic(data).subscribe((res: any) => {
      this.data = res;
      if (data['rateSelected'] == 'Average') {
        data['rateSelected'] = 'Max';
        upoptions = this.makeAreaChartOptions(res, 'usRate', 'Up', data);
        downoptions = this.makeAreaChartOptions(res, 'dsRate', 'Down', data);

      } else {
        upoptions = this.makeAreaChartOptions(res, 'peakUsRate', 'Up', data);
        downoptions = this.makeAreaChartOptions(res, 'peakDsRate', 'Down', data);
      }



      this.upChart = this.Highcharts.chart('container-up', upoptions);
      this.downChart = this.Highcharts.chart('container-down', downoptions);

      this.loading = false;

    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });


  }

  makeAreaChartOptions(res: any, type, rate, params: any): any {
    let that = this;
    let pipe = new DatePipe('en-US');

    //let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    let timezoneName = 'UTC';
    let subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Rate: ${params['rateSelected'] === 'Max' ? this.language['Average'] : this.language[params['rateSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><span style="font-size:16px; color:#ffffff">...</span>`;
    var seriesName = [];

    if (res.length) {
      res.forEach((element: any) => {
        if (!element.name) {
          element.name = "Other";
        }
        if (seriesName.indexOf(element.name) === -1) {
          seriesName.push(element.name);
        }
      });
    }

    if (!seriesName.length) {

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
          //xAxisCategories.push(this.dateUtils.getChartFormat(v.startPeriodSec));
          xAxisCategories.push(this.dateUtils.getChartFormatNew(v.startPeriodSec));
        }
      });
      seriesData.push(obj);
    });

    console.log(seriesData);
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
        text: rate === 'Down' ? '' : subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        labels: {
          formatter: function () {
            //return moment(this.value).format('MM/DD HH:mm');                        
            return this.value.length > 23 ? this.value.substring(0, 19) + '...' : this.value;
          },
          "isFunction": true
        },
        tickInterval: (function () {
          var x = (res.length).toString();
          var l = x.length;
          var b = parseInt(x);
          var f = Math.round((b * l) / 100);
          if (f < 10) {
            f = 10
          } else if (f > 100) {
            f = 100
          };
          console.log(f);
          // let f = 1;
          // if (res && res.length <= 12) {
          //   f = 1;
          // } else if (res && res.length > 40) {
          //   f = Math.floor(res.length / 25) + 2;
          // }
          return f;
        })()
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
            return (y.value / unit[0]).toFixed(1) + (y.isFirst ? unit[1] : '');
          }
        },
        title: {
          text: rate
        },
        stackLabels: {
          enabled: false,
          style: {
            fontWeight: 'bold',
            //color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        },
        tickPixelInterval: 55
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
      lang: {
        noData: that.language["No Data Available"]
      },
      series: seriesData,
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
        lineHeight: 10
      },
      "interactive": true,
      "datetimeSupported": true,
      "treemapSupported": true,
      colors: colors
    }

    if (rate !== 'Down') {
      options['exporting'] = {
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF,
              onclick: function () {
                that.exportTrafficChart();
              }
            }, {
              textKey: 'downloadCSV',
              text: this.language.exportCSV,
              onclick: function () {
                let dataExport = [];
                let extraData: string = '';
                extraData = `Subscriber: CXNK0064E48F\r\ ${this.language.criteria}: ${this.language[params['criteriaSelected']]}\r\n ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]`;
                for (var i = 0; i < res.length; i++) {
                  // dataExport.push(
                  //   {
                  //     'Date Time': that.dateUtils.getChartFormatDate(data[i].startPeriodSec),
                  //     'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets : 0,
                  //     'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets : 0
                  //   }
                  // )
                }
                that.excel.downLoadCSV('Subscriber-Top-Application-Traffic', res, extraData);
              }
            }],
            text: that.language['export'],
            className: 'export_menu',
            //symbol: 'url(/images/report/export.png)'
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



  topApplicationTrafficYaxis(y) {
    return function (y) {
      var m = y.axis.series[0].dataMax;
      var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
      return (y.value / unit[0]).toFixed(1) + (y.isFirst ? unit[1] : '');
    }
  };
  topApplicationTrafficTooltip(m) {
    let unit: any;
    return unit = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
  };


  topApplicationTrafficColors() {
    var arr = ['#E87B00', '#44367D', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    if (3 <= 10) {
      return arr;
    } else {
      var num = 3 - 10;
      for (var i = 0; i < num; i++) {
        var colorStr: any = arr[i];
        var curColor: any = new Object();
        curColor.r = parseInt(colorStr.substr(1, 2), 16);
        curColor.g = parseInt(colorStr.substr(3, 2), 16);
        curColor.b = parseInt(colorStr.substr(5, 2), 16);
        if (curColor.r > 202) {
          curColor.r = curColor.r >= 218 ? (curColor.r - 202).toString(16) : '0' + (curColor.r - 202).toString(16);
        } else {
          curColor.r = (curColor.r + 53).toString(16);
        }
        if (curColor.g > 202) {
          curColor.g = curColor.g >= 218 ? (curColor.g - 202).toString(16) : '0' + (curColor.g - 202).toString(16);
        } else {
          curColor.g = (curColor.g + 53).toString(16);
        }
        if (curColor.b > 202) {
          curColor.b = curColor.b >= 218 ? (curColor.b - 202).toString(16) : '0' + (curColor.b - 202).toString(16);
        } else {
          curColor.b = (curColor.b + 53).toString(16);
        }
        var strColor = '#' + curColor.r + curColor.g + curColor.b;
        arr.push(strColor);
      }
      return arr;
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
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

    (Highcharts as any).exportCharts([this.upChart, this.downChart], {
      type: 'application/pdf'
    });
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

}
