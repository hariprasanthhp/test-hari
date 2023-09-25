import { DatePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ConvertorService } from 'src/app/shared/services/convertor.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { FaUtilsService } from 'src/app/support/support-traffic-reports/service/fa-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import * as moment from 'moment';
import { DateTime } from "luxon";
import * as Highcharts from 'highcharts';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NetworkReportApiService } from '../network/reports/network-report-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartOptionsService {

  language: any;
  btnDisabled: boolean = false;
  trafficSchedulerFilter: any;
  schedulerDefinition: any;
  schedulerNotification: any;


  constructor(
    private utils: FaUtilsService,
    private dateUtils: DateUtilsService,
    private excel: ExportExcelService,
    private customTranslateService: CustomTranslateService,
    private commonOrgService: CommonService,
    private convert: ConvertorService,
    private router: Router,
    private sso: SsoAuthService,
    private service: NetworkReportApiService
  ) {
    this.language = this.customTranslateService.defualtLanguage;

    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;

    });
  }

  makeOptionsForNWTraffic(data: any, params?: any, module?: string): any {
    let that = this;
    let categories = [];
    let seriesData1 = [];
    let seriesData2 = [];
    let upUsage: any, upUsageTotal = 0, downUsage: any, downUsageTotal = 0;
    let pipe = new DatePipe('en-US');
    // let timezoneName = 'UTC';
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    let title = '', subTitle = '';
    let fileName = "";

    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    let granularity = this.getGranularity(params.startDate, params.endDate);
    timezoneName = "Coordinated Universal Time"
    if (data.length) {
      for (let i = 0; i < data.length; i++) {

        let period = this.getDateTime(data[i].startPeriodSec, false, 'MM/dd/yyyy');

        if (granularity === '1hour') {
          period = this.getDateTime(data[i].startPeriodSec, false, 'MM/dd HH:mm');
        }

        categories.push(period);
        seriesData1.push((data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : null);
        seriesData2.push((data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : null);

        upUsageTotal += (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : 0;
        downUsageTotal += (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : 0;
      }
    }
    let upUsageUnit = this.getStackedUnit(upUsageTotal);
    let downUsageUnit = this.getStackedUnit(downUsageTotal);
    upUsage = (upUsageTotal / upUsageUnit[0]).toFixed(2) + ' ' + upUsageUnit[1];
    downUsage = (downUsageTotal / downUsageUnit[0]).toFixed(2) + ' ' + downUsageUnit[1];

    if (module && module == 'locations') {
      fileName = "Location_Traffic";
      title = this.language.locationsTrafficTitle;
      let locationParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    } else if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
      fileName = "Application_Traffic";
      title = this.language['Application Traffic'];
      let locationParams = '';
      let appParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
      appParams = this.getTitleApplicationNames(params['applicationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.application}: ${appParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }
    else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
      fileName = "Application_Groups_Traffic";
      title = this.language['Application Groups Traffic'];
      let locationParams = '';
      let appParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
      appParams = this.getTitleApplicationNames(params['applicationGroupSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.applicationGroup}: ${appParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }
    else {
      fileName = "Network_Traffic";
      title = this.language.networkTrafficTitle
      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }


    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        opposite: false,
        tickLength: 2,
        minRange: 1,
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
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          colors: ["#0027FF", "#5ACFEA",],
        }
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit = that.getStackedUnit(m);
          var s = `<b>  ${this.x} </b><br/>
          <p> ${this.series.name} <span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          return s;
        },
      },
      series: [
        {
          name: this.language['Up Usage'] ? this.language['Up Usage'] : 'Up Usage',
          data: seriesData1,
          color: "#0027FF"
        }, {
          name: this.language['Down Usage'] ? this.language['Down Usage'] : 'Down Usage',
          data: seriesData2,
          color: "#5ACFEA"
        }
      ],
      exporting: {
        filename: fileName,
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
                let subsId = '';
                if (module && module == 'locations') {
                  let locationParams = params['locationsSelectedNames'];

                  extraData = `Locations Traffic\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}\r\n`;
                } else if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
                  let locationParams = params['locationsSelectedNames'];
                  let appParams = params['applicationsSelectedNames'];

                  extraData = `Applications Traffic\r\nApplications: ${appParams}\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }
                else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
                  let locationParams = params['locationsSelectedNames'];
                  let appParams = params['applicationGroupSelectedNames'];

                  extraData = `Application Groups Traffic\r\nApplication Groups: ${appParams}\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }
                else {
                  extraData = `Network Traffic\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}] \r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }

                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.getDateTime(data[i].startPeriodSec, false, (granularity === "1hour" ? 'MM/dd HH:mm' : "MM/dd/yyyy")),
                      'Up Usage(Bytes)': (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets.toLocaleString() : 0,
                      'Down Usage(Bytes)': (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets.toLocaleString() : 0
                    }
                  )
                }
                that.excel.downLoadCSV(fileName, dataExport, extraData);
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
    };

    return options;
  }


  makeOptionsForLineChart(data: any, params?: any, module?: string): any {
    let up = this.language['max_up_rate'];
    let down = this.language['maxDownRate'];
    let that = this;
    let categories = [];
    let upData = [];
    let downData = [];
    let subsId = '';
    let fileName = "";
    // let upRate: any, upRateTotal = 0, downRate: any, downRateTotal = 0;
    let upUsage: any, upUsageTotal = 0, downUsage: any, downUsageTotal = 0;

    let tickInterval = 1;
    let pipe = new DatePipe('en-US');

    for (let i = 0; i < data.length; i++) {
      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd/yyyy HH:mm'));
      upData.push((data[i].peakUsRate && data[i].peakUsRate !== -1) ? data[i].peakUsRate : null);
      downData.push((data[i].peakDsRate && data[i].peakDsRate !== -1) ? data[i].peakDsRate : null);
      // upRateTotal += data[i].peakUsRate ? data[i].peakUsRate : 0;
      // downRateTotal += data[i].peakDsRate ? data[i].peakDsRate : 0;
      upUsageTotal += (data[i].usOctets && data[i].usOctets !== -1) ? data[i].usOctets : 0;
      downUsageTotal += (data[i].dsOctets && data[i].dsOctets !== -1) ? data[i].dsOctets : 0;
    }

    if (categories && categories.length <= 45) {
      tickInterval = 1;
    } else if (categories && categories.length > 45) {
      tickInterval = Math.floor(categories.length / 45);
    }
    // if (categories.length > 90) {
    //   tickInterval = 14;
    // } else if (categories.length > 50) {
    //   tickInterval = 7;
    // }

    // upRate = this.utils.bitsToSize(upRateTotal, true);
    // downRate = this.utils.bitsToSize(downRateTotal, true);
    let upUsageUnit = this.getStackedUnit(upUsageTotal);
    let downUsageUnit = this.getStackedUnit(downUsageTotal);
    upUsage = (upUsageTotal / upUsageUnit[0]).toFixed(2) + ' ' + upUsageUnit[1];
    downUsage = (downUsageTotal / downUsageUnit[0]).toFixed(2) + ' ' + downUsageUnit[1];

    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    // let timezoneName = "Coordinated Universal Time";
    let title, subTitle = ``;
    let startTime = ``;
    let endTime = ``;
    let startDate = this.service.getStartUTCDate(params.startDate, 0);
    let endDate = this.service.getEndUTCDate(params.endDate);
    let dayDiff = moment(endDate).diff(moment(startDate), "days");
    if (params.criteriaSelected != 'usage' && dayDiff <= 3) {
      startTime = params.startTime >= 48 ? params.startTime - 48 : (params.startTime >= 24 ? params.startTime - 24 : params.startTime)
      endTime = params.endTime > 48 ? params.endTime - 48 : (params.endTime > 24 ? params.endTime - 24 : params.endTime)
      startTime = startTime.toString().length < 2 ? `0${startTime}:00` : `${startTime}:00`;
      endTime = endTime.toString().length < 2 ? `0${endTime}:00` : `${endTime}:00`;
      params.startDate = params.APIStartDate;
      params.endDate = this.getISOEndOfDay(params.APIendDate, endTime);

    }
    if (module && module == 'locations') {
      fileName = "Location_Traffic";
      title = this.language.locationsTrafficTitle;
      let locationParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    } else if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
      fileName = "Application_Traffic";
      title = this.language['Application Traffic'];
      let locationParams = '';
      let appParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
      appParams = this.getTitleApplicationNames(params['applicationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.application}: ${appParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }
    else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
      fileName = "Application_Groups_Traffic";
      title = this.language['Application Groups Traffic'];
      let locationParams = '';
      let appParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
      appParams = this.getTitleApplicationNames(params['applicationGroupSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.application}: ${appParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }
    else {
      fileName = "Network_Traffic";
      title = this.language.networkTrafficTitle
      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]</span>
    <br><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: ${upUsage}</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: ${downUsage}</span>`
    }

    let options: any = {
      chart: {
        type: 'line',
        zoomType: "xy",
        events: {
          load() {
            const chart = this;
            chart?.series.forEach(s => {
              s.points?.forEach((point, index) => {
                if (index > 0 && index < s.points.length - 1 && s.points[index - 1].y === null && s.points[index + 1].y === null) {
                  point.update({
                    marker: {
                      enabled: true
                    }
                  })
                }
              })
            });

          }
        }
      },
      // chart: {
      //   type: 'line',
      //   zoomType: "xy"
      // },
      time: {
        useUTC: false
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      mapNavigation: {
        enableMouseWheelZoom: true
      },
      xAxis: {
        categories: categories ? categories : [],
        tickInterval: tickInterval,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          },
          allowOverlap: false,
          maxStaggerLines: 1,
          formatter: function () {
            let label = this.value;
            if (this.isLast) {
              let len = this.axis.categories.length;
              label = this.axis.categories[len - 1];
            }
            return label;
          }
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          formatter: function () {
            return that.bitsToSize(this.value, false);
          }
        },
        min: 0,
        minRange: 1
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolRadius: 0,
      },
      tooltip: {
        formatter: function () {
          var unit = that.utils.bitsToSize(this.y, false);
          var s = `<b>${this.x}</b><br/>
          <p>${this.series.name} <span>:<b> ${unit} </b><br/></span></p>`;
          return s;
        }
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          marker: {
            enabled: (upData?.length == 1 || downData?.length == 1) ? true : false
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
          color: '#0027FF',
          data: upData ? upData : []
        }, {
          name: down,
          color: '#5ACFEA',
          data: downData ? downData : []
        },
      ],
      exporting: {
        filename: fileName,
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
                let subsId = '';
                if (module && module == 'locations') {
                  let locationParams = params['locationsSelectedNames'];

                  extraData = `Locations Traffic\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}\r\n`;
                }
                else if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
                  let locationParams = params['locationsSelectedNames']
                  let appParams = params['applicationsSelectedNames'];

                  extraData = `Applications Traffic\r\nApplications: ${appParams}\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }
                else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
                  let locationParams = params['locationsSelectedNames']
                  let appParams = params['applicationGroupSelectedNames'];

                  extraData = `Application Groups Traffic\r\nApplication Groups: ${appParams}\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]\r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }
                else {
                  extraData = `Network Traffic\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}] \r\nUp Usage: ${upUsage},Down Usage: ${downUsage}
                  \r\n`;
                }

                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.getDateTime(data[i].startPeriodSec, true, 'MM/dd/yyyy HH:mm'),
                      'Max Up Rate(bps)': (data[i].peakUsRate && data[i].peakUsRate !== -1) ? data[i].peakUsRate.toLocaleString() : 0,
                      'Max Down Rate(bps)': (data[i].peakDsRate && data[i].peakDsRate !== -1) ? data[i].peakDsRate.toLocaleString() : 0,
                    }
                  )
                }
                that.excel.downLoadCSV(fileName, dataExport, extraData);
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

    return options;

  }

  makeOptionsForApplications(data: any, type: any, params?: any, module?: string): any {
    let that = this;
    let categories = [];
    let seriesData = [];
    let direction = "";
    let fileName = "";

    let pipe = new DatePipe('en-US');
    // let timezoneName = 'Coordinated Universal Time';
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    if (params['criteriaSelected'] == 'usage') {
      timezoneName = 'Coordinated Universal Time';
    }
    let title = '', subTitle = '';
    direction = this.getSelectDirectionName(params.directionSelected);

    if (module && module == 'locations') {
      fileName = params.groupSelected == 'no' ? "Location_Top_Applications" : "Location_Top_Application_Groups"
      title = this.language.location + ' ' + (params.groupSelected == 'no' ? this.language.Top_Appln : this.language.Top_Application + ' ' + this.language.Groups);
      let locationParams = '';
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params.directionSelected ? direction : ''}</span>`
    } else {
      fileName = params.groupSelected == 'no' ? "Network_Top_Applications" : "Network_Top_Application_Groups"
      title = this.language.network + ' ' + (params.groupSelected == 'no' ? this.language.Top_Appln : this.language.Top_Application + ' ' + this.language.Groups);
      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params.directionSelected ? direction : ''}</span>`
    }

    let percentage = this.arraysObjectsPercentageCalculator;
    let options: any = {
      chart: {
        type: type,
        zoomType: "xy",
        events: {
          load: function () {
            that.axisLabelClickEvent(this);
          }
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            // cursor: 'pointer',
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: '13px',
            fontWeight: 500
          },
          formatter: function () {
            return that.showLabel(this.value);
          },
          events: {
            click: function () {
              let xAxisValue = this.axis.categories[this.pos];
              that.navigateByUrl(data, xAxisValue, params, 'App');
            }
          }
        }
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var s;
            if (params['criteriaSelected'] == 'usage') {
              var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
              s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');;
            } else {
              var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
              s = (y.isFirst ? 0 : (y.value / unit[0]).toFixed(1)) + (y.isFirst ? ' ' + unit[1] : '');
            }
            return s;
          }
        },
        min: 0,
        title: {
          text: ''
        }
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      legend: {
        reversed: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          minPointLength: 3,
          color: '#0027FF',
          //colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"]
          // cursor: 'pointer',
          point: {
            events: {
              mouseOver: function () {
                let xAxisValue = (type === 'bar' ? this.category : this.name);
                if (xAxisValue !== "Unknown" && xAxisValue !== "Unknown Application" && xAxisValue !== "Unknown and Other" && xAxisValue !== "00000000-0000-0000-0000-000000000000" && xAxisValue !== 'Unclassified Applications' && xAxisValue !== 'Unknown Application Group') {
                  this.graphic.attr({
                    cursor: 'pointer'
                  });
                }
              },
              click: function () {
                let xAxisValue = (type === 'bar' ? this.category : this.name);
                that.navigateByUrl(data, xAxisValue, params, 'App');
              }
            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit;
          var s;
          if (params['criteriaSelected'] == 'usage') {
            unit = that.getStackedUnit(m);
            s = `<b> ${this.key} </b><br/>
              <p>${this.series.name}<span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          } else {
            unit = that.utils.bitsToSize(m, false);
            s = `<b> ${this.key} </b><br/>
              <p>${this.series.name}<span>: <b>${unit}</b><br/></span></p>`
          }
          return s;
        },
      },
      series: [],
      exporting: {
        filename: fileName,
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
                if (module && module == 'locations') {
                  let locationParams = params['locationsSelectedNames'];
                  extraData = `${params.groupSelected == 'no' ? 'Locations Top Applications' : 'Locations Top Application Groups'}\r\nLocations: ${locationParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${params.directionSelected ? direction : ''}
                  \r\n`;
                } else {
                  extraData = `${params.groupSelected == 'no' ? 'Network Top Applications' : 'Network Top Application Groups'}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${params.directionSelected ? direction : ''}
                  \r\n`;
                }
                for (var i = 0; i < data.length; i++) {
                  if (params['criteriaSelected'] == 'usage') {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : data[i].key,
                        'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets.toLocaleString() : 0,
                        'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets.toLocaleString() : 0,
                        'Both(Down+Up) Usage(Byte)': data[i].totalOctets ? data[i].totalOctets.toLocaleString() : 0
                      }
                    )
                  } else {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : data[i].key,
                        'Up Max Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                        'Up Average Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                        'Down Max Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                        'Down Average Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0
                      }
                    )
                  }

                }
                that.excel.downLoadCSV(fileName, dataExport, extraData);
              }
            }],
            text: that.language['export'],
            //className: 'export_menu',
            // symbol: 'url(/assets/images/export.png)'
          }
        }
      },
    };

    if (type === 'bar') {
      if (params['criteriaSelected'] == 'usage') {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : data[i].key);
          if (params.directionSelected == 'both') {
            seriesData.push(data[i].dsOctets + data[i].usOctets);
          } else if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsOctets);
          } else {
            seriesData.push(data[i].usOctets);
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : data[i].key);
          if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsRate);
          } else {
            seriesData.push(data[i].usRate);
          }
        }
      }


      options.series = [{
        name: direction + ' ' + that.language[params['criteriaSelected']],
        data: seriesData
      }];
    } else if (type === 'pie') {

      if (params['criteriaSelected'] == 'usage') {
        for (let i = 0; i < data.length; i++) {
          if (params.directionSelected == 'both') {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].dsOctets + data[i].usOctets
            });
          } else if (params.directionSelected == 'Down') {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].dsOctets
            });
          } else {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].usOctets
            });
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          if (params.directionSelected == 'Down') {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].dsRate
            });
          } else {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].usRate
            });
          }
        }
      }


      options.series = [{
        //colorByPoint: true,
        data: seriesData,
        name: that.language[params['directionSelected']]
      }];

      options.plotOptions.pie = {
        size: '80%',
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        colors: ["#f3722c", "#f94144", "#f9c74f", "#f8961e", "#f9844a", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1", "#4361ee", "#bc4749", "#affc41", "#d4a373", "#8d99ae", "#c9ada7", "#735d78", "#403d39", "#d8d78f", "#43bccd", "#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
        dataLabels: {
          enabled: true,
          formatter: function () {
            let arrayofUsage: Array<any> = [];
            seriesData.forEach(el => {
              arrayofUsage.push(+el.y);
            });
            return `<b>${seriesData[this.point.x].name} ${percentage(arrayofUsage, seriesData[this.point.x].y, 1)} % </b> <br/>`;
          },
        }
      }
    }

    return options;
  }

  makeOptionsForLocations(data: any, type: any, params?: any, module?: string): any {
    let that = this;
    let categories = [];
    let seriesData = [];
    let direction = this.language.DOWN;

    let pipe = new DatePipe('en-US');
    // let timezoneName = 'Coordinated Universal Time';
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    if (params['criteriaSelected'] == 'usage') {
      timezoneName = 'Coordinated Universal Time';
    }
    let title = '', subTitle = '';
    let fileName = "";

    if (params.directionSelected == 'both') {
      data = this.commonOrgService.sortByColumn(data, 'desc', 'totalOctets', true);
      direction = this.language['Both(Down+Up)'];
    } else if (params.directionSelected == 'Down') {
      data = this.commonOrgService.sortByColumn(data, 'desc', 'dsOctets', true);
      direction = this.language['Down'];
    } else {
      data = this.commonOrgService.sortByColumn(data, 'desc', 'usOctets', true);
      direction = this.language['Up'];
    }

    if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
      fileName = "Application_Top_Locations";
      title = this.language['Application'] + ' ' + this.language['appsTopLocsTitle'];
      let appParams = '';
      appParams = this.getTitleApplicationNames(params['applicationsSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.application}: ${appParams}</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${direction ? direction : ''}</span>`
    } else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
      fileName = "Application_Groups_Top_Locations";
      title = this.language['applicationgroups'] + ' ' + this.language['appsTopLocsTitle'];
      let appParams = '';
      appParams = this.getTitleApplicationNames(params['applicationGroupSelectedNames']);

      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.applicationgroups}: ${appParams}</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${direction ? direction : ''}</span>`
    }
    else {
      fileName = "Network_Top_Locations";
      title = this.language.network + ' ' + this.language.networkTopLocsTitle;
      subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>
      <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${direction ? direction : ''}</span>`
    }

    let options: any = {
      chart: {
        type: type,
        zoomType: "xy",
        events: {
          load: function () {
            that.axisLabelClickEvent(this);
          }
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            // cursor: 'pointer',
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: '13px',
            fontWeight: 500
          },
          formatter: function () {
            return that.showLabel(this.value);
          },
          events: {
            click: function () {
              let xAxisValue = this.axis.categories[this.pos];
              that.navigateByUrl(data, xAxisValue, params, 'Loc');
            }
          }
        }
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var s;
            if (params['criteriaSelected'] == 'usage') {
              var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
              s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');;
            } else {
              var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
              s = (y.isFirst ? 0 : (y.value / unit[0]).toFixed(1)) + (y.isFirst ? ' ' + unit[1] : '');
            }
            return s;
          }
        },
        min: 0,
        title: {
          text: ''
        },
        minRange: 1
      },
      legend: {
        reversed: true
      },
      credits: {
        enabled: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          minPointLength: 3,
          color: '#0027FF',
          //colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"]
          // cursor: 'pointer',
          point: {
            events: {
              mouseOver: function () {
                let xAxisValue = (type === 'bar' ? this.category : this.name);
                if (xAxisValue !== "Unknown" && xAxisValue !== "Unknown Location" && xAxisValue !== "Unknown and Other" && xAxisValue !== "00000000-0000-0000-0000-000000000000") {
                  this.graphic.attr({
                    cursor: 'pointer'
                  });
                }
              },
              click: function () {
                let xAxisValue = (type === 'bar' ? this.category : this.name);
                that.navigateByUrl(data, xAxisValue, params, 'Loc');
              }
            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit;
          var s;
          if (params['criteriaSelected'] == 'usage') {
            unit = that.getStackedUnit(m);
            s = `<b> ${this.key} </b><br/>
                <p>${this.series.name}<span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          } else {
            unit = that.utils.bitsToSize(m, false);
            s = `<b> ${this.key} </b><br/>
                <p>${this.series.name}<span>: <b>${unit}</b><br/></span></p>`;
          }
          return s;
        },
      },
      series: [],
      exporting: {
        filename: fileName,
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
                if (module && module == 'applications' && params['applicationsSelectedNames']?.length > 0) {
                  let appParams = params['applicationsSelectedNames'];

                  extraData = `Applications Top Locations\r\nApplications: ${appParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${direction ? direction : ''}
                  \r\n`;
                } else if (module && module == 'applications' && params['applicationGroupSelectedNames']?.length > 0) {
                  let appParams = params['applicationGroupSelectedNames'];

                  extraData = `Application Groups Top Locations\r\nApplication Group: ${appParams}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${direction ? direction : ''}
                  \r\n`;
                }
                else {
                  extraData = `Network Top Locations\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${direction ? direction : ''}
                  \r\n`;
                }

                for (var i = 0; i < data.length; i++) {
                  if (params['criteriaSelected'] == 'usage') {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : '',
                        'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets.toLocaleString() : 0,
                        'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets.toLocaleString() : 0,
                        'Both(Down+Up) Usage(Byte)': data[i].totalOctets ? data[i].totalOctets.toLocaleString() : 0,
                        'SubnetIPv4': data[i].subnets ? data[i].subnets : '',
                        'SubnetIPv6': data[i].subnetsV6 ? data[i].subnetsV6 : ''
                      }
                    )
                  } else {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : data[i].key,
                        'Up Max Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                        'Up Average Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                        'Down Max Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                        'Down Average Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0,
                        'SubnetIPv4': data[i].subnets ? data[i].subnets : '',
                        'SubnetIPv6': data[i].subnetsV6 ? data[i].subnetsV6 : ''
                      }
                    )
                  }

                }
                that.excel.downLoadCSV(fileName, dataExport, extraData);
              }
            }],
            text: that.language['export'],
            //className: 'export_menu',
            // symbol: 'url(/assets/images/export.png)'
          }
        }
      },
    };



    if (type === 'bar') {
      if (params['criteriaSelected'] == 'usage') {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : data[i].key);
          if (params.directionSelected == 'both') {
            seriesData.push(data[i].totalOctets);
          } else if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsOctets);
          } else {
            seriesData.push(data[i].usOctets);
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : data[i].key);
          if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsRate);
          } else {
            seriesData.push(data[i].usRate);
          }
        }
      }

      options.series = [{
        name: direction + ' ' + that.language[params['criteriaSelected']],
        data: seriesData
      }];

    } else if (type === 'pie') {
      if (params['criteriaSelected'] == 'usage') {
        for (let i = 0; i < data.length; i++) {
          if (params.directionSelected == 'both') {
            seriesData.push({
              name: data[i].name,
              y: data[i].dsOctets + data[i].usOctets
            });
          } else if (params.directionSelected == 'Down') {
            seriesData.push({
              name: data[i].name,
              y: data[i].dsOctets
            });
          } else {
            seriesData.push({
              name: data[i].name,
              y: data[i].usOctets
            });
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          if (params.directionSelected == 'Down') {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].dsRate
            });
          } else {
            seriesData.push({
              name: (data[i].name ? data[i].name : data[i].key),
              y: data[i].usRate
            });
          }
        }
      }

      options.series = [{
        //colorByPoint: true,
        data: seriesData,
        name: direction,
      }];

      options.plotOptions.pie = {
        allowPointSelect: true,
        cursor: 'pointer',
      }
    }
    return options;
  }

  convertDate(ts) {
    var date = new Date(ts);
    var mm = (date.getMonth()).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }

  topSub_ChartOptions(data: any, params?: any): any {
    let that = this;
    let categories = [];
    let seriesData = [];
    let direction = this.getSelectDirectionName(params.directionSelected);

    if (data.length) {
      if (params['criteriaSelected'] == 'usage') {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : (data[i].title ? data[i].title : data[i].key));
          if (params.directionSelected == 'both') {
            seriesData.push(data[i].dsOctets + data[i].usOctets);
          } else if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsOctets);
          } else {
            seriesData.push(data[i].usOctets);
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name ? data[i].name : data[i].key);
          if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsRate);
          } else {
            seriesData.push(data[i].usRate);
          }
        }
      }
    }

    let titlePrefix = "network";
    let addApplication = '', addLocation = '';
    let appParams = '';
    let locationParams = '';
    let fileName = "Network_Top_Subscribers";
    if (params.From === 'Applications' && params['applicationsSelectedNames']?.length > 0) {
      fileName = "Application_Top_Subscribers";
      appParams = this.getTitleApplicationNames(params['applicationsSelectedNames']);
      addApplication = `<span style="font-size:16px; color:#ffffff" >...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.Application}: ${appParams} </span >`;
      titlePrefix = 'Application'
    }
    else if (params.From === 'Applications' && params['applicationGroupSelectedNames']?.length > 0) {
      fileName = "Application_Groups_Top_Subscribers";
      appParams = this.getTitleApplicationNames(params['applicationGroupSelectedNames']);
      addApplication = `<span style="font-size:16px; color:#ffffff" >...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.applicationGroup}: ${appParams} </span >`;
      titlePrefix = 'applicationGroup';
    }
    else if (params.From === 'Locations') {
      fileName = "Location_Top_Subscribers";
      locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
      addLocation = `<span style="font-size:16px; color:#ffffff" >...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.Location}: ${locationParams} </span >`;
      titlePrefix = 'Location'
    }
    let subTitle;
    let pipe = new DatePipe('en-US');
    // let timezoneName = 'Coordinated Universal Time';
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    if (params['criteriaSelected'] == 'usage') {
      timezoneName = 'Coordinated Universal Time';
    }
    let temp = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.criteria}: ${this.language[params['criteriaSelected']]}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <br><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.limit}: ${params['limit']} </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected'] ? direction : ""} </span>`

    if (addApplication) {
      subTitle = addApplication + temp;
    }
    else if (addLocation) {
      subTitle = addLocation + temp;
    }
    else {
      subTitle = temp;
    }

    let options: any = {
      chart: {
        type: 'bar',
        zoomType: "xy",
        events: {
          load: function () {
            that.axisLabelClickEvent(this);
          }
        }
      },
      title: {
        text: this.language[titlePrefix] + " " + this.language.networkTopSubsTitle,
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            // cursor: 'pointer',
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: '13px',
            fontWeight: 500
          },
          formatter: function () {
            return that.showLabel(this.value);
          },
          events: {
            click: function (event) {
              let xAxisValue = this.axis.categories[this.pos];
              //that.navigateByUrl(data, xAxisValue, params, 'Sub');
            }
          }
        }
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var s;
            if (params['criteriaSelected'] == 'usage') {
              var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
              s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');
            } else {
              var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
              s = (y.isFirst ? 0 : (y.value / unit[0]).toFixed(1)) + (y.isFirst ? ' ' + unit[1] : '');
            }
            return s;
          }
        },
        min: 0,
        title: {
          text: ''
        },
        opposite: false,
        tickLength: 2,
        minRange: 1,
        // type: 'logarithmic'
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          color: '#0027FF',
          // colors: ["#E87B00", "#44367D", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
          // cursor: 'pointer',
          point: {
            events: {
              mouseOver: function () {
                if (this.category !== "Unknown" && this.category !== "Unknown and Other" && this.category !== "00000000-0000-0000-0000-000000000000") {
                  this.graphic.attr({
                    cursor: 'pointer'
                  });
                }
              },
              click: function () {
                let xAxisValue = this.category;
                let xAxisKey = data[this.index].key;
                that.navigateByUrl(data, xAxisValue, params, 'Sub', xAxisKey);
              }
            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          let ipAddress: any;
          let macAddress: any;
          let serialNumber: any;
          let mappedBy: any;
          data.forEach(element => {
            if (element.name === this.x || element.title === this.x || element.key === this.x) {
              ipAddress = element.ipAddress ? element.ipAddress : '';
              macAddress = element.macAddress ? element.macAddress : '';
              serialNumber = element.serialNumber ? element.serialNumber : '';
              mappedBy = element.mappedBy ? element.mappedBy : '';
            }
          });
          var m = this.y;
          var unit;
          var s;
          let sub = ipAddress ? `<p>IP Address<span>: <b>${ipAddress}</b><br/></span></p> <br/>` : ``;
          sub = sub + (serialNumber ? `<p> Serial Number<span>: <b>${serialNumber}</b><br/></span></p> <br/>` : ``);
          sub = sub + (macAddress ? `<p> MAC Address<span>: <b>${macAddress}</b><br/></span></p> <br/>` : ``);
          sub = sub + (mappedBy ? `<p> Mapped By<span>: <b>${mappedBy}</b><br/></span></p> <br/>` : ``);
          if (params['criteriaSelected'] == 'usage') {
            unit = that.getStackedUnit(m);
            s = `<b> ${this.key} </b><br/>
                <p>${this.series.name} <span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p> <br/>
                ${sub}`

          } else {
            unit = that.utils.bitsToSize(m, false);
            s = `<b> ${this.key} </b><br/>
                <p>${this.series.name} <span>: <b>${unit}</b><br/></span></p> <br/>
                ${sub}`
          }
          return s;
        },
      },
      series: [],
      exporting: {
        filename: fileName,
        buttons: {
          contextButton: {
            menuItems: [{
              textKey: 'downloadPDF',
              text: this.language.exportPDF || 'Export PDF',
              onclick: function () {
                this.setSize(
                  this.chartWidth,
                  this.chartHeight
                );
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

                if (params.From === 'Applications' && params['applicationsSelectedNames']?.length > 0) {
                  extraData = `Applications Top Subscribers\r\nApplications : ${params['applicationsSelectedNames']}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLimit: ${params['limit']}\r\nDirection: ${params['directionSelected'] ? direction : ""}\r\n\r\n`;
                }
                else if (params.From === 'Applications' && params['applicationGroupSelectedNames']?.length > 0) {
                  extraData = `Application Groups Top Subscribers\r\nApplication Groups : ${params['applicationGroupSelectedNames']}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLimit: ${params['limit']}\r\nDirection: ${params['directionSelected'] ? direction : ""}\r\n\r\n`;
                }
                else if (params.From === 'Locations') {
                  extraData = `nLocations Top Subscribers\r\nLocations: ${params['locationsSelectedNames']}\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLimit: ${params['limit']}\r\nDirection: ${params['directionSelected'] ? direction : ""}\r\n\r\n`;
                }
                else {
                  extraData = `Top Subscribers\r\nCriteria: ${that.language[params['criteriaSelected']]}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLimit: ${params['limit']}\r\nDirection: ${params['directionSelected'] ? direction : ""}\r\n\r\n`;
                }
                for (var i = 0; i < data.length; i++) {
                  if (params['criteriaSelected'] == 'usage') {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : (data[i].title ? data[i].title : data[i].key),
                        'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets.toLocaleString() : 0,
                        'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets.toLocaleString() : 0,
                        'Both(Down+Up) Usage': data[i].totalOctets ? data[i].totalOctets.toLocaleString() : 0,
                        'IP Address': data[i].ipAddress ? data[i].ipAddress : "",
                        'Mapped By': data[i].mappedBy ? data[i].mappedBy : "",
                        'Endpoint Title': data[i].title ? data[i].title : "",
                        'Mapped Name': data[i].mappedName ? data[i].mappedName : "",
                        'Radius  User Name': data[i].radiusName ? data[i].radiusName : "",
                        'Serial Number': data[i].serialNumber ? data[i].serialNumber : "",
                        'MAC Address': data[i].macAddress ? data[i].macAddress : "",
                      }
                    )
                  } else {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : data[i].key,
                        'Up Max Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                        'Up Average Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                        'Down Max Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                        'Down Average Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0,
                        'IP Address': data[i].ipAddress ? data[i].ipAddress : "",
                        'Mapped By': data[i].mappedBy ? data[i].mappedBy : "",
                        'Endpoint Title': data[i].title ? data[i].title : "",
                        'Mapped Name': data[i].mappedName ? data[i].mappedName : "",
                        'Radius  User Name': data[i].radiusName ? data[i].radiusName : "",
                        'Serial Number': data[i].serialNumber ? data[i].serialNumber : "",
                        'MAC Address': data[i].macAddress ? data[i].macAddress : "",
                      }
                    )
                  }
                }
                that.excel.downLoadCSV(fileName, dataExport, extraData);
              }
            }],
            text: that.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    };

    options.series = [{
      name: direction + ' ' + that.language[params['criteriaSelected']],
      data: seriesData
    }];
    return options;
  }

  monthlyUsageByAppChartOptions(data: any, params?: any): any {
    let that = this;
    var seriesName = [];
    let direction = "";
    let date = this.getMonthlyUsageDates();
    let startDate = date.startDate;
    let endDate = date.endDate;

    if (params.directionSelected == 'both') {
      direction = this.language['Both(Down+Up)'] + " Usage";
    } else if (params.directionSelected == 'Down') {
      direction = this.language['Down'] + " Usage";
    } else {
      direction = this.language['Up'] + " Usage";
    }

    var seriesData = [];
    var xAxisCategories = [];
    if (data.length) {
      data.forEach((element: any) => {
        if (!element.name) {
          element.name = element.key;
        }
        if (seriesName.indexOf(element.name) === -1) {
          seriesName.push(element.name);
        }
        let categories = this.getUTCDateFormatFromUTCTime(element.startPeriodSec, true, "MM/yyyy");
        if (!xAxisCategories.includes(categories)) {
          xAxisCategories.push(categories);
        }
      });
    }

    let json: any = {};
    data.forEach(element => {
      if (!json[element['startPeriodSec']]) {
        json[element['startPeriodSec']] = [];
      }
      let value = 0;
      let name = element['name'] ? element['name'] : element['key'];
      if (params.directionSelected == 'both') {
        value = (element.totalOctets && element.totalOctets !== -1) ? element.totalOctets : null;
      } else if (params.directionSelected == 'Down') {
        value = (element.dsOctets && element.dsOctets !== -1) ? element.dsOctets : null;
      } else {
        value = (element.usOctets && element.usOctets !== -1) ? element.usOctets : null;
      }
      let isDuplicate = json[element['startPeriodSec']].filter((element) => {
        return element.name === name;
      })
      if (isDuplicate.length === 0) json[element['startPeriodSec']].push({ name, value });
    });

    let ouputData: any = {};
    seriesName.forEach(element => {
      Object.keys(json).forEach(key => {
        if (!ouputData[element]) {
          ouputData[element] = [];
        }
        let isPuhsed = false;
        json[key].forEach(item => {
          if (element === item.name) {
            isPuhsed = true;
            ouputData[element].push(item.value);
          }
        });
        if (!isPuhsed) {
          ouputData[element].push(null);
        }
      })
    });

    Object.keys(ouputData).forEach(key => {
      seriesData.push({
        name: key,
        data: ouputData[key]
      });
    })

    let locationParams = "";
    locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
    let titleDirection = this.getSelectDirectionName(params.directionSelected);
    let pipe = new DatePipe('en-US');
    let timezoneName = 'Coordinated Universal Time';
    let subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} to ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected'] ? titleDirection : ''} </span>`

    if (params.type === 'location') {
      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.Location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} to ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected'] ? titleDirection : ''} </span>`
    }

    if (seriesData.length == 0) {
      seriesData = [{
        name: direction,
        data: []
      }]
    }
    let colors = this.monthlyUsagebyAppColors();
    let name = `${this.language.network} ${this.language.monthusageapp} (Top 5)`;
    if (params.type === 'location') {
      name = `${this.language.location} ${this.language.monthusageapp} (Top 5)`;
    }
    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: name
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        alignTicks: false,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
            return (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');
          }
        },
        min: 0,
        title: {
          text: ''
        },
        opposite: false,
        tickLength: 2
      },
      legend: {
        reversed: false
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit = that.getStackedUnit(m);
          var s = `<b> ${this.series.name} </b><br/>
          <p> ${direction} <span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          return s;
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          colors: ["#0027FF", "#5ACFEA", "#FF8238", "#F7C343", "#B926F0", "#FF489D", "#E51A1A",]
        }
      },
      series: seriesData,
      colors: colors,
      exporting: {
        filename: params.type === 'location' ? 'Location_Monthly_Usage_By_Application' : 'Network_Monthly_Usage_By_Application',
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
                let name = params.type === 'location' ? 'Location_Monthly_Usage_By_Application' : 'Network_Monthly_Usage_By_Application';

                extraData = `Network Monthly Usage By Application\r\n${that.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} - ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection: ${params['directionSelected'] ? titleDirection : ''}\r\n`;
                if (params.type === 'location') {
                  extraData = `Location Monthly Usage By Application\r\n${that.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} - ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLocation : ${params['locationsSelectedNames']}\r\nDirection: ${params['directionSelected'] ? titleDirection : ''}\r\n`;
                }
                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/dd/yyyy'),
                      'Application Name': data[i].name ? data[i].name : data[i].key,
                      "Monthly Usage (Byte)": that.getCSVData(data[i], params['directionSelected'])
                    }
                  )
                }
                that.excel.downLoadCSV(name, dataExport, extraData);
              }
            }],
            text: that.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    };

    return options;
  }
  monthlyUsageByServiceChartOptions(data: any, params?: any) {
    let that = this;
    var seriesName = [];
    let direction = "";
    let date = this.getMonthlyUsageDates();
    let startDate = date.startDate;
    let endDate = date.endDate;

    if (params.directionSelected == 'both') {
      direction = this.language['Both(Down+Up)'] + ` ${this.language.Usage}`;
    } else if (params.directionSelected == 'Down') {
      direction = this.language['Down Usage'];
    } else {
      direction = this.language['Up Usage'];
    }
    if (data.length) {
      data.forEach((element: any) => {
        if (!element.name) {
          element.name = element.key;
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
      $.each(data, (k, v) => {
        if (!v.key) {
          v.name = v.key;
        }
        if (v.name === value) {
          if (params.directionSelected == 'both') {
            obj.data.push((v.totalOctets && v.totalOctets !== -1) ? v.totalOctets : null);
          } else if (params.directionSelected == 'Down') {
            obj.data.push((v.dsOctets && v.dsOctets !== -1) ? v.dsOctets : null);
          } else {
            obj.data.push((v.usOctets && v.usOctets !== -1) ? v.usOctets : null);
          }
          xAxisCategories.push(this.getUTCDateFormatFromUTCTime(v.startPeriodSec, true, "MM/yyyy"));
        }
      });
      seriesData.push(obj);
    });

    let locationParams = "";
    locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);
    let titleDirection = this.getSelectDirectionName(params.directionSelected);

    let pipe = new DatePipe('en-US');
    let timezoneName = 'Coordinated Universal Time';
    let subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} to ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected'] ? titleDirection : ''} </span>`

    if (params.type === 'location') {
      subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.Location}: ${locationParams}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} to ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected'] ? titleDirection : ''} </span>`
    }

    if (seriesData.length == 0) {
      seriesData = [{
        name: direction,
        data: []
      }]
    }
    let colors = this.monthlyUsagebyAppColors();
    let name = `${this.language.network} ${this.language.locationMenuMonthlyUsageByServiceCategory}`;
    if (params.type === 'location') {
      name = `${this.language.location} ${this.language.locationMenuMonthlyUsageByServiceCategory}`;
    }
    let options: any = {
      chart: {
        type: 'column',
        zoomType: "xy"
      },
      title: {
        text: name
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: xAxisCategories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        labels: {
          formatter: function () {
            let y = this;
            var m = y.axis.series[0].dataMax;
            var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
            return (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');
          }
        },
        min: 0,
        title: {
          text: ''
        },
        opposite: false,
        tickLength: 2
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      legend: {
        reversed: false
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit = that.getStackedUnit(m);
          var s = `<b> ${this.series.name} </b><br/>
          <p> ${direction} <span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          return s;
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          minPointLength: 3,
          colors: ["#0027FF", "#5ACFEA", "#FF8238", "#F7C343", "#B926F0", "#FF489D", "#E51A1A",],
          cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: seriesData,
      colors: colors,
      exporting: {
        enabled: false,
        // buttons: {
        //   contextButton: {
        //     menuItems: [{
        //       textKey: 'downloadPDF',
        //       text: 'Export PDF',
        //       onclick: function () {
        //         this.exportChart({
        //           type: 'application/pdf'
        //         });
        //       }
        //     }, {
        //       textKey: 'downloadCSV',
        //       text: 'Export CSV',
        //       onclick: function () {
        //         let dataExport = [];
        //         let extraData: string = '';

        //         extraData = `Monthly Usage By Application\r\n${that.language['time_win']}: ${pipe.transform(startDate, 'MM/dd/yyyy')} - ${pipe.transform(endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLocation : ${LocationNames}\r\nDirection: ${params['directionSelected']}\r\n`;
        //         for (var i = 0; i < data.length; i++) {
        //           dataExport.push(
        //             {
        //               'Date Time': that.dateUtils.getChartFormatDate(data[i].startPeriodSec),
        //               'Application Name': data[i].key,
        //               "Monthly Usage (Byte)": data[i].totalOctets
        //             }
        //           )
        //         }
        //         that.excel.downLoadCSV('Monthly_Usage_By_Application', dataExport, extraData);
        //       }
        //     }],
        //     text: that.language['export'],
        //   }
        // }
      },
      credits: {
        enabled: false
      }
    };
    return options;
  }

  monthlyUsageByServiceChartOptions1(data: any, params?: any): any {
    let that = this;
    let categories = [];
    let seriesData1 = [];
    let seriesData2 = [];

    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        let period = this.convertDate(data[i].startPeriodSec);
        categories.push(period);
        if (params.directionSelected == 'both') {
          seriesData1.push(data[i].usOctets);
          seriesData2.push(data[i].dsOctets);
        } else if (params.directionSelected == 'Down') {
          seriesData2.push(data[i].dsOctets);
        } else {
          seriesData1.push(data[i].usOctets);
        }
      }
    }

    let pipe = new DatePipe('en-US');
    let timezoneName = 'Coordinated Universal Time';
    let subTitle = `<span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.Location}: ${params.locationsSelected}</span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]  </span>
    <span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.direction}: ${params['directionSelected']} </span>
    <br><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language.upUsageTitle}: 28.85019 TB</span> <span style="font-size:16px; color:#ffffff">...</span> <span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language.downUsageTitle}: 125.85019 TB</span>`

    let options: any = {
      chart: {
        type: 'bar',
        zoomType: "xy"
      },
      title: {
        text: this.language.monthusageservice
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        opposite: false,
        tickLength: 2,
        minRange: 1
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
        series: {
          colors: ["#0027FF", "#5ACFEA", "#FF8238", "#F7C343", "#B926F0", "#FF489D", "#E51A1A",],
          cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      series: [],
      exporting: {
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

                // Data will flow for export
                extraData = `Monthly Usage By Service Category\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nLocation : ${params['locationsSelected']}\r\nDirection: ${params['directionSelected']}\r\n`;
                for (var i = 0; i < 10; i++) {
                  dataExport.push(
                    {
                      'Name': "Testing",
                      'Date Time': that.dateUtils.getChartFormat(params.startDate)
                    }
                  )
                }
                that.excel.downLoadCSV('Monthly_Usage_By_Service', dataExport, extraData);
              }
            }],
            text: that.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    };

    if (seriesData1.length > 0) {
      let obj = {
        name: this.language['Up Usage'] ? this.language['Up Usage'] : 'Up Usage',
        data: seriesData1,
        color: "#0027FF"
      }
      options.series.push(obj)
    }
    if (seriesData2.length > 0) {
      let obj = {
        name: this.language['Down Usage'] ? this.language['Down Usage'] : 'Down Usage',
        data: seriesData2,
        color: "#5ACFEA"
      }
      options.series.push(obj)
    }

    return options;
  }

  subDistributionChartOption(data: any, params?: any): any {
    let that = this;
    let categories = [];
    let seriesData1 = [];
    let seriesData2 = [];

    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        categories.push(data[i].strInterval);
        seriesData1.push(parseFloat(data[i].strSubPercent));
        seriesData2.push(parseFloat(data[i].strBytePercent));
      }
    }
    let pipe = new DatePipe('en-US');
    let timezoneName = 'Coordinated Universal Time';
    let Title = "";
    if (params.directionSelected == 'both') {
      Title = this.language["Both Direction"];
    } else if (params.directionSelected == 'Down') {
      Title = this.language['Downstream'];
    } else {
      Title = this.language['Upstream'];
    }

    let locationParams: any = '';
    locationParams = this.getTitleLocationNames(params['locationsSelectedNames']);

    const self = this;
    let options: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: (locationParams ? locationParams : 'All') + ' - ' + Title
      },
      subtitle: {
        text: ""
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            textOverflow: 'ellipsis'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: this.language.Percentage + ' %'
        },
        opposite: false,
        minRange: 1
      },
      legend: {
        reversed: false
      },
      lang: {
        noData: this.language["No Data Available"]
      },
      plotOptions: {
        series: {
          colors: ["#0027FF", "#5ACFEA",],
          cursor: 'pointer',
        }
      },
      tooltip: {
        formatter: function () {
          var s = `<b> ${this.key} </b><br/>
          <p> ${self.language.Percentage}: ${this.y}% <br/></span></p>`;
          return s;
        },
      },
      // exporting: {
      //   buttons: {
      //     contextButton: {
      //       menuItems: [{
      //         textKey: 'downloadPDF',
      //         text: 'Export PDF',
      //         onclick: function () {
      //           this.exportChart({
      //             type: 'application/pdf'
      //           });
      //         }
      //       }, {
      //         textKey: 'downloadCSV',
      //         text: 'Export CSV',
      //         onclick: function () {
      //           let dataExport = [];
      //           let extraData: string = '';
      //           extraData = `Subscriber Distribution\r\nLocation : ${params['locationsSelectedNames']}\r\nMonth : ${pipe.transform(params['monthSelected'], 'MM/dd/yyyy')} [${timezoneName}]\r\nDirection : ${params['directionSelected']}\r\nThreshold (KB): ${params['threshold']}\r\nAggregate : ${params['aggregateSelected']}\r\nEliminate Unknown: ${params['eliminateUnknownSelected']}\r\nThreshold Type: ${params['thresholdTypeSelected']}\r\n\r\n`;
      //           let total = this.language['Both(Down+Up)'];
      //           let subsCount = this.language['# of Subs'];
      //           let subsCPercent = this.language['% of Subs'];
      //           let bytesCount = this.language['# of Bytes(GB)'];
      //           let bytesPercent = this.language['% of Bytes'];
      //           for (var i = 0; i < 10; i++) {
      //             dataExport.push(
      //               {
      //                 total : data[i].strInterval ? data[i].strInterval : '',
      //                 subsCount : data[i].subCount ? data[i].subCount : 0,
      //                 subsCPercent : data[i].strSubPercent ? data[i].strSubPercent : '',
      //                 bytesCount : data[i].totalBytes ? data[i].totalBytes : 0,
      //                 bytesPercent : data[i].strBytePercent ? data[i].strBytePercent : ''
      //               }
      //             )
      //           }
      //           that.excel.downLoadCSV('Subscriber_Distributions', dataExport, extraData);
      //         }
      //       }],
      //       text: that.language['export'],
      //     }
      //   }
      // },
      exporting: {
        enabled: false
      },
      series: [],
      credits: {
        enabled: false
      }
    };

    if (seriesData1.length > 0) {
      let obj = {
        name: this.language['% of Subscribers'],
        data: seriesData1,
        color: "#0027FF"
      }
      options.series.push(obj)
    }
    if (seriesData2.length > 0) {
      let obj = {
        name: this.language['% of Bytes'],
        data: seriesData2,
        color: "#5ACFEA"
      }
      options.series.push(obj)
    }
    return options;
  }


  makeOptionsEndpointTopApp(data: any, type: any, params?: any, downloadData?: any): any {
    let title = this.language.Subscriber + ' ' + downloadData.title;
    let fName = '';
    downloadData.fileName == 'top-application-groups' ? fName = "Subscriber_Top_Application_Groups" : fName = "Subscriber_Top_Applications";
    let that = this;
    let pipe = new DatePipe('en-US');
    let capitalize = new TitleCasePipe();
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    if (params.criteriaSelected == 'usage') {
      timezoneName = 'Coordinated Universal Time';
    }

    let categories = [];
    let seriesData = [];
    let direction = this.language['Down'];
    if (params.directionSelected == 'both') {
      direction = this.language['Both(Down+Up)'];
    } else if (params.directionSelected == 'Down') {
      direction = this.language['Down'];
    } else {
      direction = this.language['Up'];
    }
    let subscriber = ``;
    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    let subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['criteria']}: ${this.language[params['criteriaSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['direction']}: ${direction}</span>`;

    let options: any = {
      chart: {
        type: type,
        zoomType: "xy"
      },
      title: {
        text: title
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
            if (params['criteriaSelected'] == 'usage') {
              var unit: any = m > 1000000000000 ? [1000000000000, 'TB'] : (m > 1000000000 ? [1000000000, 'GB'] : (m > 1000000 ? [1000000, 'MB'] : (m > 1000 ? [1000, 'KB'] : [1, 'B'])));
              s = (y.value / unit[0]).toFixed(1) + (y.isFirst ? ' ' + unit[1] : '');;
            } else {
              var unit: any = m > 1000000000000 ? [1000000000000, 'Tbps'] : (m > 1000000000 ? [1000000000, 'Gbps'] : (m > 1000000 ? [1000000, 'Mbps'] : (m > 1000 ? [1000, 'Kbps'] : [1, 'bps'])));
              s = (y.isFirst ? 0 : (y.value / unit[0]).toFixed(1)) + (y.isFirst ? ' ' + unit[1] : '');
            }
            return s;
          }
        },
      },
      lang: {
        noData: that.language["No Data Available"]
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          color: '#0279FF',
          // cursor: 'pointer',
          point: {
            events: {

            }
          }
        }
      },
      tooltip: {
        formatter: function () {
          var m = this.y;
          var unit;
          var s;
          if (params['criteriaSelected'] == 'usage') {
            unit = that.getStackedUnit(m);
            s = `<b> ${this.key} </b><br/>
              <p>${this.series.name}<span>: <b>${(this.y / unit[0]).toFixed(2) + ' ' + unit[1]}</b><br/></span></p>`;
          } else {
            unit = that.utils.bitsToSize(m, false);
            s = `<b> ${this.key} </b><br/>
              <p>${this.series.name}<span>: <b>${unit}</b><br/></span></p>`
          }
          return s;
        }
      },
      series: [],
      exporting: {
        filename: fName,
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
                for (var i = 0; i < data.length; i++) {
                  if (params['criteriaSelected'] == 'usage') {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : '',
                        'Up Usage(Byte)': data[i].usOctets ? data[i].usOctets.toLocaleString() : 0,
                        'Down Usage(Byte)': data[i].dsOctets ? data[i].dsOctets.toLocaleString() : 0,
                        'Both(Down+Up) Usage(Byte)': data[i].totalOctets ? data[i].totalOctets.toLocaleString() : 0
                      }
                    )
                  } else {
                    dataExport.push(
                      {
                        'Name': data[i].name ? data[i].name : data[i].key,
                        'Up Max Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate.toLocaleString() : 0,
                        'Up Average Rate(bps)': data[i].usRate ? data[i].usRate.toLocaleString() : 0,
                        'Down Max Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate.toLocaleString() : 0,
                        'Down Average Rate(bps)': data[i].dsRate ? data[i].dsRate.toLocaleString() : 0
                      }
                    )
                  }
                }
                let extraData: string = '';
                let subscriber = ``;
                if (that.sso.getTrafficReportChartSubscriberInfo()) {
                  subscriber = `${that.language['Subscriber']}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n`;
                }
                extraData = `${title}\r\n ${subscriber}Criteria: ${that.language[params['criteriaSelected']]} \r\n ${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\n Direction: ${direction} \r\n`;
                that.excel.downLoadCSV(fName, dataExport, extraData);
              }
            }],
            text: this.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    };

    if (type === 'bar') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name) {
          categories.push(data[i].name);
        } else {
          if (!data[i].key) {
            data[i].key = 'others';
          }
          categories.push(data[i].key);
        }

        if (params['criteriaSelected'] == 'usage') {
          if (params.directionSelected == 'both') {
            seriesData.push(data[i].totalOctets);
          } else if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsOctets);
          } else {
            seriesData.push(data[i].usOctets);
          }
        } else if (params['criteriaSelected'] == 'rate') {
          if (params.directionSelected == 'both') {
            seriesData.push(data[i].dsRate + data[i].usRate);
          } else if (params.directionSelected == 'Down') {
            seriesData.push(data[i].dsRate);
          } else {
            seriesData.push(data[i].usRate);
          }
        }
      }

      options.series = [{
        name: `${params.directionSelected == 'both' ? this.language['Both(Down+Up)'] : this.language[params.directionSelected]} ${this.language[params['criteriaSelected']]}`,
        data: seriesData
      }];
    } else if (type === 'pie') {

      for (let i = 0; i < data.length; i++) {

        if (params.directionSelected == 'Both(Down+Up)') {
          seriesData.push({
            name: data[i].name,
            y: data[i].dsOctets + data[i].usOctets
          });
        } else if (params.directionSelected == 'Down') {
          seriesData.push({
            name: data[i].name,
            y: data[i].dsOctets
          });
        } else {
          seriesData.push({
            name: data[i].name,
            y: data[i].usOctets
          });
        }

      }

      options.series = [{
        data: seriesData,
        name: params.directionSelected,
      }];

      options.plotOptions.pie = {
        allowPointSelect: true,
        cursor: 'pointer',
      }
    }
    return options;
  }

  makeOptionsForRateChart(data: any, params?: any): any {
    let up = this.language['max_up_rate'];
    let down = this.language['max_down_rate'];
    let that = this;
    let categories = [];
    let upData = [];
    let downData = [];
    if (params['rateSelected'] == 'Average') {
      up = this.language['avg_up_rate'];
      down = this.language['avg_down_rate'];
    }
    let pipe = new DatePipe('en-US');

    for (let i = 0; i < data.length; i++) {
      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd/yyyy HH:mm'));
    }
    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    let subTitle = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">Rate: ${this.language[params['rateSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]</span>`

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
          formatter: function () {
            let label = this.value;
            if (this.isLast) {
              let len = this.axis.categories.length;
              label = this.axis.categories[len - 1];
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
          return '<b>' + this.x + '<b><br/>' + this.series.name + ': <b>' + that.utils.bitsToSize(this.y, false) + '</b>';
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
          color: '#82BF00',
          data: []
        }, {
          name: down,
          color: '#0279FF',
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
                extraData = `Subscriber Rate\r\n${that.language['Subscriber']}: ${that.sso.getTrafficReportChartSubscriberInfo()}\r\n${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} [${timezoneName}]\r\nRate: ${params['rateSelected']}\r\n`;
                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.dateUtils.getUTCDateFormatFromUTCTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'),
                      'Max Up Rate(bps)': data[i].peakUsRate ? data[i].peakUsRate : 0,
                      'Max Down Rate(bps)': data[i].peakDsRate ? data[i].peakDsRate : 0,
                      'Average Up Rate(bps)': data[i].usRate ? data[i].usRate : 0,
                      'Average Down Rate(bps)': data[i].dsRate ? data[i].dsRate : 0,
                    }
                  )
                }
                that.excel.downLoadCSV('Subscriber_Rate', dataExport, extraData);
              }
            }],
            text: that.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    }

    for (let i = 0; i < data.length; i++) {
      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd/yyyy HH:mm'));

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


  makeOptionsForEPLineChart(data: any, params?: any): any {
    let up = this.language['max_up_rate'];
    let down = this.language['max_down_rate'];
    let that = this;
    let categories = [];
    let upData = [];
    let downData = [];
    if (params['rateSelected'] == 'Average') {
      up = this.language['Average_Up_Rate'];
      down = this.language['Average_Down_Rate'];
    }

    let pipe = new DatePipe('en-US');
    for (let i = 0; i < data.length; i++) {
      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'));
    }

    let timezoneName = /\((.*)\)/.exec(new Date().toString())[1];
    // let diff = moment(params.endDate).diff(moment(params.startDate), "hour");
    let subscriber = ``;
    let startTime = ``;
    let endTime = ``;
    let dayDiff = moment(params.endDate).diff(moment(params.startDate), "days");
    if (dayDiff < 3) {
      startTime = params.startTime >= 48 ? params.startTime - 48 : (params.startTime >= 24 ? params.startTime - 24 : params.startTime)
      endTime = params.endTime > 48 ? params.endTime - 48 : (params.endTime > 24 ? params.endTime - 24 : params.endTime)
      startTime = startTime.toString().length < 2 ? `0${startTime}:00` : `${startTime}:00`;
      endTime = endTime.toString().length < 2 ? `0${endTime}:00` : `${endTime}:00`;
      params.startDate = params.APIStartDate;
      params.endDate = this.getISOEndOfDay(params.APIendDate, endTime);
    }

    if (this.sso.getTrafficReportChartSubscriberInfo()) {
      subscriber = `<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Subscriber']}: ${this.sso.getTrafficReportChartSubscriberInfo()}</span><span style="font-size:16px; color:#ffffff">...</span>`
    }
    let subTitle = `${subscriber}<span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;">${this.language['Rate']}: ${this.language[params['rateSelected']]}</span><span style="font-size:16px; color:#ffffff">...</span><span style="font-family: Lato; color: #000000; font-size: 12px; line-height: 1.1640625;"> ${this.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} to ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]</span>`

    let options: any = {

      chart: {
        type: 'line',
        events: {
          load() {
            const chart = this;
            chart?.series.forEach(s => {
              s.points?.forEach((point, index) => {
                if (index > 0 && index < s.points.length - 1 && s.points[index - 1].y === null && s.points[index + 1].y === null) {
                  point.update({
                    marker: {
                      enabled: true
                    }
                  })
                }
              })
            });

          }
        }
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
              label = this.axis.categories[len - 1];
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
          return '<p><b>' + this.x + '</b> <br/>' + this.series.name + ': <b>' + that.utils.bitsToSize(this.y, false) + '</b></p>';
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
        },

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
                extraData = `Subscriber Rate\r\n${subscriber}${that.language['time_win']}: ${pipe.transform(params.startDate, 'MM/dd/yyyy')} ${startTime} - ${pipe.transform(params.endDate, 'MM/dd/yyyy')} ${endTime} [${timezoneName}]\r\nRate: ${params['rateSelected']}\r\n`;
                for (var i = 0; i < data.length; i++) {
                  dataExport.push(
                    {
                      'Date Time': that.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'),
                      'Max Up Rate(bps)': (data[i].peakUsRate && data[i].peakUsRate !== -1) ? data[i].peakUsRate.toLocaleString() : 0,
                      'Max Down Rate(bps)': (data[i].peakDsRate && data[i].peakDsRate !== -1) ? data[i].peakDsRate.toLocaleString() : 0,
                      'Average Up Rate(bps)': (data[i].usRate && data[i].usRate !== -1) ? data[i].usRate.toLocaleString() : 0,
                      'Average Down Rate(bps)': (data[i].dsRate && data[i].dsRate !== -1) ? data[i].dsRate.toLocaleString() : 0,
                    }
                  )
                }
                that.excel.downLoadCSV('Subscriber_Rate', dataExport, extraData);
              }
            }],
            text: that.language['export'],
          }
        }
      },
      credits: {
        enabled: false
      }
    }
    for (let i = 0; i < data.length; i++) {
      categories.push(this.getDateTime(data[i].startPeriodSec, true, 'MM/dd HH:mm'));
      if (params['rateSelected'] == 'Average') {
        upData.push((data[i].usRate && data[i].usRate !== -1) ? data[i].usRate : null);
        downData.push((data[i].dsRate && data[i].dsRate !== -1) ? data[i].dsRate : null);
      } else {
        upData.push((data[i].peakUsRate && data[i].peakUsRate !== -1) ? data[i].peakUsRate : null);
        downData.push((data[i].peakDsRate && data[i].peakDsRate !== -1) ? data[i].peakDsRate : null);
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

  sortByNumber(list, key) {
    list.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      return x[key] - y[key];
    });
    return list;
  }

  sortByColumn(data, type, column, isNum?): any {
    return this.commonOrgService.sortByColumn(data, type, column, isNum);
  }

  monthlyUsagebyAppColors() {
    var arr = ["#0027FF", "#5ACFEA", "#FF8238", "#F7C343", "#B926F0", "#FF489D", "#E51A1A", "#90be6d", "#277da1"];
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

  makeIsoDate(value: any): any {
    let a = value.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  arraysObjectsPercentageCalculator(obj, value, digit?: any) {
    let numbersArray = obj;
    if (typeof obj == 'object') {
      numbersArray = Object.values(obj);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let total: any = numbersArray.reduce(reducer, 0)
    return ((100 * value) / total).toFixed(digit ? digit : 2);
  }

  getGranularity(startDate: any, endDate: any) {
    let granularity = '24hour';
    let diff = moment(endDate).diff(moment(startDate), "hour")
    if (diff <= 24) {
      granularity = "1hour"
    }
    else {
      granularity = "24hour"
    }

    return granularity;
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

  getUTCDateFormatFromUTCTime(time, utc?, format?) {
    if (utc) {
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

  bitsToSize(bits: any, round?: any) {
    let bytes = bits;

    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'pbps', 'ebps'];
    if (bytes == 0) return '0';

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

  getStackedUnit(m) {
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

  getTitleLocationNames(locationsSelectedNames: any) {
    let locationNames = "";
    if (locationsSelectedNames) {
      locationsSelectedNames.forEach((element, i) => {
        if (i < 3) {
          locationNames += `${i == 0 ? '' : ','} ${element}`;
        }
      });
      if (locationsSelectedNames.length > 3) {
        locationNames += `, ...`;
      }
    }
    return locationNames;
  }


  getTitleApplicationNames(names: any) {
    let applicationNames = "";
    if (names) {
      names.forEach((element, i) => {
        if (i < 3) {
          applicationNames += `${i == 0 ? '' : ','} ${element}`;
        }
      });
      if (names.length > 3) {
        applicationNames += `, ...`;
      }
    }
    return applicationNames;
  }


  getSelectDirectionName(directionSelected: any) {
    let directionName: any = "";
    if (directionSelected == 'both') {
      directionName = this.language['Both(Down+Up)'];
    } else if (directionSelected == 'Down') {
      directionName = this.language['Down'];
    } else {
      directionName = this.language['Up'];
    }
    return directionName;
  }


  navigateByUrl(data: any, xAxisValue: any, filters: any, from: any, xAxisKey = '') {
    if (xAxisValue === "Unknown" || xAxisValue === "Unknown and Other" || xAxisValue === "00000000-0000-0000-0000-000000000000" || xAxisValue === 'Unclassified Applications') {
      return;
    }
    if (xAxisValue === "Unknown Application" || xAxisValue === "Unknown Location" || xAxisValue === "Unknown Application Group") {
      return;
    }
    let url = '';
    let applicationsNames = [];
    let locationNames = [];
    let applicationsSelected = [];
    let locationsSelected = [];
    let subscriberId = xAxisValue;

    if (from === 'App') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === xAxisValue || data[i].key === xAxisValue) {
          applicationsSelected.push(data[i].key);
          applicationsNames.push(data[i].name ? data[i].name : data[i].key);
        }
      }
      url = '/cco/traffic/applications/reports';
      if (!(window.location.pathname.indexOf('/cco/traffic/') > -1)) {
        url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/application/reports' : '/organization-admin/flowAnalyze/traffic/application/reports';
      }

    } else if (from === 'Loc') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === xAxisValue || data[i].key === xAxisValue) {
          locationsSelected.push(data[i].key);
          locationNames.push(data[i].name ? data[i].name : data[i].key);
        }
      }
      url = '/cco/traffic/locations/reports';
      if (!(window.location.pathname.indexOf('/cco/traffic/') > -1)) {
        url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/location/reports' : '/organization-admin/flowAnalyze/traffic/location/reports';
      }

    } else if (from === 'Sub') {
      window.sessionStorage.setItem('traffic_TopSub_Endpoint_filters', JSON.stringify(filters));
      for (let i = 0; i < data.length; i++) {
        if (xAxisKey) {
          if (data[i].key === xAxisKey) {
            subscriberId = data[i].key
            window.sessionStorage.setItem('endpointName', data[i].name);
          }
        }
        else {
          if (data[i].name === xAxisValue || data[i].title === xAxisValue) {
            subscriberId = data[i].key
            window.sessionStorage.setItem('endpointName', data[i].name);
          }
        }
      }
      this.sso.setEPRredirectFrom(window.location.pathname);
      url = '/cco/traffic/endpoints/realtime';
      if (!(window.location.pathname.indexOf('/cco/traffic/') > -1)) {
        url = this.router.url.indexOf(`/${environment.SYS_ADMIN_ROUTE}/`) > -1 ? '/systemAdministration/flowAnalyze/traffic/endpoint/realtime' : '/organization-admin/flowAnalyze/traffic/endpoint/realtime';
      }
    }

    let filter = {
      startDate: moment(filters.startDate).format("YYYY-MM-DD"),
      endDate: moment(filters.endDate).format("YYYY-MM-DD"),
      criteria: filters.criteriaSelected,
      applicationsSelected: applicationsSelected,
      locationsSelected: locationsSelected,
      typeSelected: 'traffic',
      isApplicationGroup: filters.groupSelected,
      applicationsNames: applicationsNames,
      locationNames: locationNames
    }

    this.router.navigate([url], { queryParams: (from === 'Sub') ? ({ id: subscriberId }) : filter });
  }


  showLabel(xAxisValue: any) {
    let showPointer = false;
    if (xAxisValue !== "Unknown" && xAxisValue !== "Unknown and Other" && xAxisValue !== "00000000-0000-0000-0000-000000000000" && xAxisValue !== 'Unclassified Applications' && xAxisValue !== "Unknown Application" && xAxisValue !== "Unknown Location" && xAxisValue !== "Unknown Application Group") {
      showPointer = true;
    }
    return `<span  class="text-primary axis_label" title="${xAxisValue}" style="cursor:${showPointer ? 'pointer' : ''}">${xAxisValue}</span>`;
  }

  getISOEndOfDay(dt, tm) {
    //returns 12AM UTC of Next day of End date
    let d = new Date(dt);
    d.setDate(new Date(d).getDate() - (parseInt(tm) === 24 ? 1 : 0));
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  getMonthlyUsageDates() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear() - 1, date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    let startDate = new Date(firstDay).toISOString();
    startDate = this.makeIsoDate(startDate);
    let endDate = new Date(lastDay).toISOString();
    endDate = this.makeIsoDate(endDate);

    return { startDate, endDate }
  }

  getCSVData(data: any, criteria: any) {
    let value: any = 0;
    if (criteria == 'both') {
      value = (data.totalOctets && data.totalOctets !== -1) ? data.totalOctets.toLocaleString() : 0;
    } else if (criteria == 'Down') {
      value = (data.dsOctets && data.dsOctets !== -1) ? data.dsOctets.toLocaleString() : 0;
    } else {
      value = (data.usOctets && data.usOctets !== -1) ? data.usOctets.toLocaleString() : 0;
    }
    return value;
  }

  axisLabelClickEvent(chart: any) {
    var axis = chart.xAxis[0];
    var ticks = axis.ticks;
    var points = chart.series[0].points;
    points.forEach(function (point, i) {
      if (ticks[i]) {
        var label = ticks[i].label.element;
        label.onclick = function () { point.firePointEvent('click'); }
      }
    })
  }

}
