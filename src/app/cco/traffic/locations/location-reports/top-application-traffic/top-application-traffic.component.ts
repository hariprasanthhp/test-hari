import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { saveAs } from 'file-saver';
import * as $ from 'jquery';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { LocationReportApiService } from '../../reports/location-report-api.service';
import { ChartOptionsService } from '../../../shared/chart-options.service';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

(function (Highcharts: any) {
  Highcharts.exportLocationCharts = function (charts, options) {

    // Merge the options
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

    // Post to export server
    options.url = environment.highchartExportURL;
    Highcharts.post(options.url, {
      filename: options.filename || 'Location-Top-Application-Traffic',
      type: options.type,
      scale: 1.9,
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
  selector: 'app-top-application-traffic',
  templateUrl: './top-application-traffic.component.html',
  styleUrls: ['./top-application-traffic.component.scss']
})
export class TopApplicationTrafficComponent implements OnInit {

  error: boolean;
  errorInfo: string = '';
  language: any;
  pageAvailable: boolean = false;
  loading: boolean = false;
  filters: any;
  Highcharts = Highcharts;
  chart: any;
  chartCallback: any;
  upUsage: string = '';
  downUsage: string = '';
  subscribe: any
  data: any;
  upChart: any;
  downChart: any;
  renderOnce: boolean = false;
  hasScopeAccess = false;
  constructor(
    private router: Router,
    private customTranslateService: CustomTranslateService,
    private service: LocationReportApiService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private chartOptionService: ChartOptionsService
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
      this.upUsage = this.language.upUsageTitle;
      this.downUsage = this.language.downUsageTitle;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.upUsage = data.upUsageTitle;
      this.downUsage = data.downUsageTitle;
      if (this.renderOnce) {
        this.renderChart()
      }
    });

  }

  ngOnInit() {

    let scopes = this.sso.getScopes();
    if (environment.VALIDATE_SCOPE && window.location.pathname.indexOf('/cco/traffic/') > -1) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location.report') !== -1) {
            this.hasScopeAccess = true;
            break;
          }
        }
      }
    } else {
      this.hasScopeAccess = true;
    }

    this.closeAlert();
  }

  loadChartData(data: any) {
    data.groupBy = 'application'
    this.filters = data;
    this.loading = true;
    this.chartOptionService.btnDisabled = true;
    this.error = false;
    let upoptions: any;
    let downoptions: any;
    this.subscribe = this.service.getAppTraffic(data).subscribe((res: any) => {
      this.data = res;
      if (data['rateSelected'] == 'Average') {
        upoptions = this.makeAreaChartOptions(this.getData(res, "usRate"), 'usRate', 'Up', data);
        downoptions = this.makeAreaChartOptions(this.getData(res, "dsRate"), 'dsRate', 'Down', data);

      } else {
        data['rateSelected'] = 'Max';
        upoptions = this.makeAreaChartOptions(this.getData(res, "peakUsRate"), 'peakUsRate', 'Up', data);
        downoptions = this.makeAreaChartOptions(this.getData(res, "peakDsRate"), 'peakDsRate', 'Down', data);
      }
      if (document.getElementById('container-up') && document.getElementById('container-up')) {
        this.upChart = this.Highcharts.chart('container-up', upoptions);
        this.downChart = this.Highcharts.chart('container-down', downoptions);
      }
      this.loading = false;
      this.chartOptionService.btnDisabled = false;
      this.renderOnce = true;
    }, (err: any) => {
      this.pageErrorHandle(err);
      this.chartOptionService.btnDisabled = false;
    });
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
    if (document.getElementById('container-up') && document.getElementById('container-up')) {
      this.upChart = this.Highcharts.chart('container-up', upoptions);
      this.downChart = this.Highcharts.chart('container-down', downoptions);
    }
  }

  makeAreaChartOptions(res: any, type, rate, params: any): any {
    let that = this;
    let pipe = new DatePipe('en-US');
    let LocationNames = "";
    let LocationParams = "";
    if (params['locationsSelectedNames']) {
      LocationNames = params['locationsSelectedNames'];
      LocationParams = this.chartOptionService.getTitleLocationNames(params['locationsSelectedNames'])
    }

    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    // let timezoneName = 'Coordinated Universal Time';
    let subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.Location}: ${LocationParams}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Rate: ${params['rateSelected'] === 'Max' ? this.language['Peak'] : this.language['Average']}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><br><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.limit}: ${params['limit']}</span><span style="font-size:16px; color:#ffffff">...</span>`;
    var seriesName = [];

    if (res.length) {
      res.forEach((element: any) => {
        if (element[type] === -1) {
          element[type] = 0;
        }
        if (!element.name) {
          element.name = element.key;
        }
        if (element.name && seriesName.indexOf(element.name) === -1) {
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
          v.name = v.key;
        }
        if (v.name === value) {
          obj.key = v.key;
          obj.data.push(v[type]);
          //xAxisCategories.push(this.dateUtils.getChartFormat(v.startPeriodSec));
          xAxisCategories.push(this.chartOptionService.getDateTime(v.startPeriodSec, true, 'MM/dd HH:mm'));
        }
      });
      seriesData.push(obj);
    });
    let yAxistitle = seriesData.length > 0 ? (this.language[rate] == '' ? rate : this.language[rate]) : "";
    if (seriesData.length == 0) {
      seriesData = [{
        name: rate + " Rate",
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
      },
      title: {
        text: rate === 'Down' ? '' : this.language['Location'] + ' ' + this.language['Top Application Traffic']
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
          text: yAxistitle
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
      lang: {
        noData: this.language["No Data Available"]
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
        },
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                let y = this;
                let applicationsSelected = [];
                applicationsSelected.push(seriesData[y.series.index].key);
                let locationsSelected = params.locationsSelected ? params.locationsSelected : [];
                let filter = {
                  startDate: moment(params.startDate).format("YYYY-MM-DD"),
                  endDate: moment(params.endDate).format("YYYY-MM-DD"),
                  criteria: 'rate',
                  applicationsSelected: applicationsSelected,
                  locationsSelected: locationsSelected,
                  typeSelected: 'traffic',
                  isApplicationGroup: 'no'
                }
                let url = '/cco/traffic/applications/reports';
                if (!(window.location.pathname.indexOf('/cco/traffic/') > -1)) {
                  url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/application/reports' : '/organization-admin/flowAnalyze/traffic/application/reports';
                }
                that.router.navigate([url], { queryParams: filter });
              }
            }
          }
        }
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
        filename: 'Location_Top_Application_Traffic',
        buttons: {
          contextButton: {
            menuItems: [
              {
                textKey: 'downloadPDF',
                text: this.language.exportPDF,
                onclick: function () {
                  that.exportTrafficChart();
                }
              },
              {
                textKey: 'downloadCSV',
                text: this.language.exportCsv,
                onclick: function () {
                  let UpdataExport = [];
                  let DowndataExport = [];
                  let UpextraData: string = '';
                  let DownextraData: string = '';
                  let Rate = params['rateSelected'] == 'Max' ? 'Peak' : params['rateSelected'];
                  UpextraData = `Location Top Application Traffic\r\nLocation: ${LocationNames}\r\nRate: ${Rate}\r\nTime Window: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLimit: ${params.limit}\r\nUpstream Traffic\r\n`;
                  DownextraData = `\r\nDownstream Traffic\r\n`
                  for (var i = 0; i < res.length; i++) {
                    if (res[i].name) {
                      UpdataExport.push(
                        {
                          'Date Time': that.chartOptionService.getDateTime(res[i].startPeriodSec, true, 'MM/dd HH:mm'),
                          'Name': res[i].name ? res[i].name : 'Other',
                          'Usage(Byte)': (res[i].usOctets && res[i].usOctets !== -1) ? res[i].usOctets : 0,
                          'Max Up Rate(bps)': (res[i].peakUsRate && res[i].peakUsRate !== -1) ? res[i].peakUsRate : 0,
                          'Average Up Rate(bps)': (res[i].usRate && res[i].usRate !== -1) ? res[i].usRate : 0
                        }
                      )
                    }
                  }
                  for (var i = 0; i < res.length; i++) {
                    if (res[i].name) {
                      DowndataExport.push(
                        {
                          'Date Time': that.chartOptionService.getDateTime(res[i].startPeriodSec, true, 'MM/dd HH:mm'),
                          'Name': res[i].name ? res[i].name : 'Other',
                          'Usage(Byte)': (res[i].dsOctets && res[i].dsOctets !== -1) ? res[i].dsOctets : 0,
                          'Max Down Rate(bps)': (res[i].peakDsRate && res[i].peakDsRate !== -1) ? res[i].peakDsRate : 0,
                          'Average Down Rate(bps)': (res[i].dsRate && res[i].dsRate !== -1) ? res[i].dsRate : 0
                        }
                      )
                    }
                  }
                  that.downLoadCSV('Location_Top_Application_Traffic', UpdataExport, DowndataExport, UpextraData, DownextraData);
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

  topApplicationTrafficTooltip(m) {
    let unit: any;
    return unit = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
  };

  topApplicationTrafficColors() {
    var arr = ['#0027FF', '#5ACFEA', '#FF8238', '#F7C343', '#B926F0', '#FF489D', '#E51A1A', '#77a1e5', '#c42525', '#a6c96a'];
    return arr;
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

    (Highcharts as any).exportLocationCharts([this.upChart, this.downChart], {
      type: 'application/pdf'
    });
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  getSize(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
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
    let downHeaders = [];
    for (let key in DownchartData[maxIndex]) {
      if (downHeaders.indexOf(key) === -1) {
        downHeaders.push(key);
      }
    }
    let fName = name + '.csv';
    let fType = 'text/csv;charset=utf-8'
    let UpcsvData = this.ConvertToCSV(data, headers);
    let DowncsvData = this.ConvertToCSV(DownchartData, downHeaders);
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

  getData(data: any, type: any) {
    if (Array.isArray(data) && data.length > 0) {
      return data.some(element => element[type] > 0) ? data : [];
    } else {
      return [];
    }
  }
}


