import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataService } from 'src/app/cco/cco-home/services/data.service';
import { HomeChartOptionsService } from 'src/app/cco-foundation/foundation-home/home-chart-options.service'
import * as Highcharts from 'highcharts/highstock';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FoundationHomeService } from '../foundation-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FoundationManageService } from '../../foundation-systems/foundation-manage/foundation-manage.service';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);

@Component({
  selector: 'app-command-iq-status',
  templateUrl: './command-iq-status.component.html',
  styleUrls: ['./command-iq-status.component.scss']
})
export class CommandIqStatusComponent implements OnInit {
  @Output() private Out_commandIQ: EventEmitter<any> = new EventEmitter();
  Highcharts = Highcharts;
  chartData: any;
  ORG_ID: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  languageSubject: any;
  catelength: number;
  catelenth: number;
  commandIq: any;
  commandIqbefore: any;
  commandIqper: any;
  commandIqstatus: any;
  filterDays: any = '7';
  commandIQSub: any;
  combineLatest: any;
  parallelReqSubscribtion: any;
  CommandIQ: any;
  CommandIQBiz: any;
  commandIqbiz: any;
  commandIqBizbefore: any;
  CIQ: any;
  CIQBefore: any;
  smallBizIQentitlement: boolean;

  constructor(
    private dataService: DataService,
    private chartOptions: HomeChartOptionsService,
    private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private service: FoundationHomeService,
    private sso: SsoAuthService,
    private ccoHomeService: CcoHomeService,
    private router: Router,
    private systemservice: FoundationManageService,
    private commonOrgService: CommonService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
  }

  ngOnInit(): void {
    let url = this.router.url;
    this.getSmartBizEntitlement()
    if (url.indexOf('/cco/home/system-service-trends') > -1) {
      this.filterDays = this.ccoHomeService.filterDays;
      this.watchFilterDays();
      setTimeout(() => {
        this.getCommandIQDatas()
      }, 500);
    } else {
      this.filterDays = '7';
      this.getCommandIQDatas();
    }
  }
  getSmartBizEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['smallBizIQ'] = entitlement[218] ? entitlement[218] : [];
    if (entitlement && entitlement?.smallBizIQ?.apptype === 218) {
      this.smallBizIQentitlement = true;
    }
    else {
      this.smallBizIQentitlement = false;
    }

  }

  ngOnChanges(): void {
    //this.loadChart();
  }
  getCommandIQDatas() {

    this.loading = true;
    let requestEndpoints = [];
    let url = this.router.url;


    requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/ciq?days=${this.filterDays ? this.filterDays : '7'}`)
    if (this.smallBizIQentitlement) requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/ciqbiz?days=${this.filterDays ? this.filterDays : '7'}`)


    const requests = [];
    requestEndpoints.forEach(endpoint => {
      const req = this.systemservice.callRestApi(endpoint).pipe(map((res: any) => {
        return res;
      }),
        catchError((error: any) => {
          return of(error);
        }));
      requests.push(req);
    });
    this.combineLatest = combineLatest(requests);
    this.makeParallelRequest();
  }
  makeParallelRequest() {
    this.parallelReqSubscribtion = this.combineLatest.subscribe((response: any) => {
      let url = this.router.url;
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.CommandIQ = [];
      } else {
        let CommandIQ = response[0] ? response[0] : [];
        this.CommandIQ = CommandIQ?.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.CommandIQBiz = [];
      } else {
        let CommandIQBiz = response[1] ? response[1] : [];
        this.CommandIQBiz = CommandIQBiz?.histories
      }
      setTimeout(() => {
        this.loadChart();
      }, 500)

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    })
  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
  }
  loadChart() {
    this.chartData = this.chartDataModify(this.CommandIQ, this.CommandIQBiz);
    if (this.chartData?.categories.length === 30) {
      this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('commandiq-graph-div', this.chartDataOptions);
          this.loading = false;
        }, 100)

      });
    } else {
      this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('commandiq-graph-div', this.chartDataOptions);
          this.loading = false;
        }, 100)

      });
    }
  }

  chartDataModify(cData, cData1) {
    let value = [], series = [], categories = [], ciqbiz = [];
    let data = {};
    if (cData !== undefined) {
      cData = this.chartOptions.sortByTimestamp(cData, 'date');
      cData.forEach(el => {

        categories.push(this.reverseString(el.date, 'M/d/yy'))
        //categories.push(this.reverseString(el.date, 'M/d/yy'))
        el['count'] = el.value ? el.value : 0;
        //el.value = el.value + Math.floor(Math.random() * 1000) + 1500;
        value.push(parseInt(el.count));
      });
    }
    if (cData1 !== undefined) {
      cData1 = this.chartOptions.sortByTimestamp(cData1, 'date');
      cData1.forEach(el => {
        if (cData == undefined) {
          // categories.push(this.dateUtils.getChartFormatDate(el.date, 'M/d/yy', true))
          categories.push(this.reverseString(el.date, 'M/d/yy'))
        }

        //categories.push(this.reverseString(el.date, 'M/d/yy'))
        el['count'] = el.value ? el.value : 0;
        //el.value = el.value + Math.floor(Math.random() * 1000) + 1500;
        ciqbiz.push(parseInt(el.count));
      });
    }
    this.catelength = categories.length - 1;
    this.catelenth = categories.length - 2;
    this.commandIq = value[this.catelength] ? value[this.catelength] : 0;
    this.commandIqbiz = ciqbiz[this.catelength] ? ciqbiz[this.catelength] : 0;
    this.commandIqbefore = value[this.catelenth] ? value[this.catelenth] : 0;
    this.commandIqBizbefore = ciqbiz[this.catelenth] ? ciqbiz[this.catelenth] : 0;
    this.CIQ = (this.commandIq + this.commandIqbiz)
    this.CIQBefore = (this.commandIqbefore + this.commandIqBizbefore);
    if (this.CIQBefore == 0 && this.CIQ != 0) {
      this.commandIqper = (this.CIQ * 100).toFixed();
    }
    else {
      this.commandIqper = (this.setpercentage(this.CIQ, this.CIQBefore, 2) == '0.00' ? '0' : this.setpercentage(this.CIQ, this.CIQBefore, 0));
    }
    this.commandIqstatus = {
      commandIq: (this.CIQ == undefined ? 0 : this.CIQ),
      commandIqper: Math.abs(this.commandIqper == 'NaN' ? 0 : this.commandIqper),
      positiveOrNegative: this.checkPositvNegativ(this.commandIqper)
    }
    this.Out_commandIQ.emit(this.commandIqstatus);
    if (this.smallBizIQentitlement) {
      series = [
        {
          name: 'CommandIQ',
          data: value
        },
        {
          name: 'CommandWorx',
          data: ciqbiz

        }
      ];
    } else {
      series = [
        {
          name: 'CommandIQ',
          data: value
        }
      ];
    }

    data = {
      series: series,
      categories: categories
    }
    return data;
  }
  reverseString(str, format?) {
    //debugger;
    var string = str.toString();
    var month = parseInt(string.slice(4, 6)) - (1)
    let dateObj = new Date();
    dateObj.setFullYear(string.slice(0, 4));
    dateObj.setMonth(month);
    dateObj.setDate(string.slice(6, 8));
    let pipe = new DatePipe('en-US');
    let dateString = '';
    if (format) {
      dateString = `${pipe.transform(dateObj, format)}`;
    } else {
      dateString = `${pipe.transform(dateObj, 'MM/dd/yyyy')}`;
    }

    return dateString;
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

  closeAlert() {

  }
  ngOnDestroy(): void {

    this.Out_commandIQ.emit(this.commandIqstatus);
    // this.dataService.setSystemSubscription(this.subscriberForm.value);
    if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
    if (this.commandIQSub) this.commandIQSub.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  filterDaysSubscription: any;
  watchFilterDays() {
      this.filterDaysSubscription = this.ccoHomeService.filterDays$.subscribe((value: any) => {
      this.filterDays = value;
      this.getCommandIQDatas();
    })
  }

}
