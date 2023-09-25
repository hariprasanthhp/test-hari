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
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { FoundationManageService } from '../../foundation-systems/foundation-manage/foundation-manage.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HomeChartOptionsService as CcoHomeService } from 'src/app/cco/cco-home/services/home-chart-options.service';
import { Router } from '@angular/router';

const HighchartsMore = require("highcharts/highcharts-more");
const HighchartsExporting = require("highcharts/modules/exporting");
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);


@Component({
  selector: 'app-revenue-edge-suits',
  templateUrl: './revenue-edge-suits.component.html',
  styleUrls: ['./revenue-edge-suits.component.scss']
})
export class RevenueEdgeSuitsComponent implements OnInit {
  @Output() private Out_EdgeSuit: EventEmitter<any> = new EventEmitter();
  Highcharts = Highcharts;
  chartData: any;
  chartDataOptions: any;
  loading: boolean = true;
  error: boolean = false;
  errorInfo: string = '';
  language: any;
  ORG_ID: any;
  languageSubject: any;
  combineLatest: any;
  parallelReqSubscribtion: any;
  productIQ: any[];
  experienceIQ: any[];
  arloData: any[];
  servifyData: any[];
  catelength: number;
  catelenth: number;
  ProtectIQ: any;
  ExperienceIQ: any;
  Arlo: any;
  servify: any;
  edgeSuit: any;
  ExperienceIQbefore: any;
  ProtectIQbefore: any;
  Arlobefore: any;
  servifybefore: any;
  ProtectIQper: any;
  ExperienceIQper: any;
  Arloper: any;
  servifyper: any;
  revenueEdgetatus: any;
  edgeSuitper: any;
  edgeSuitBefore: any;
  filterDays: any = '7';
  RevenueEdgeSub: any;
  arloEnableentitlement: boolean;
  ServifyEnableentitlement: boolean;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;


  constructor(
    private dataService: DataService,
    private chartOptions: HomeChartOptionsService,
    private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private service: FoundationHomeService,
    private sso: SsoAuthService,
    private systemservice: FoundationManageService,
    private commonOrgService: CommonService,
    private ccoHomeService: CcoHomeService,
    private router: Router
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });
  }

  ngOnInit(): void {

    //this.loadChart();
    this.getEdgeSuiteEntitlement()
    let url = this.router.url;
    if (url.indexOf('/cco/home/system-service-trends') > -1) {
      this.filterDays = this.ccoHomeService.filterDays;
      this.watchFilterDays();
      setTimeout(() => {
        this.getIqSuitesDatas()
      }, 50);
    } else {
      this.filterDays = '7';
      this.getIqSuitesDatas()
    }
  }

  ngOnChanges(): void {
    //this.loadChart();
  }
  getEdgeSuiteEntitlement() {
    //debugger;
    let entitlement = this.sso.getEntitlements();
    entitlement['arlo'] = entitlement[206] ? entitlement[206] : [];
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    if (entitlement && entitlement['arlo'] && (entitlement['arlo'].name === "ARLO")) {
      this.arloEnableentitlement = true;
    }
    else {
      this.arloEnableentitlement = false;
    }
    if (entitlement && entitlement['Servify'] && (entitlement['Servify'].name === "Servify")) {
      this.ServifyEnableentitlement = true;
    }
    else {
      this.ServifyEnableentitlement = false;
    }
    if (entitlement && entitlement['ProtectIQ'] && (entitlement['ProtectIQ'].name === "ProtectIQ")) {
      this.productIQEnableentitlement = true;
    }
    else {
      this.productIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ'] && (entitlement['ExperienceIQ'].name === "ExperienceIQ")) {
      this.ExperienceIQEnableentitlement = true;
    }
    else {
      this.ExperienceIQEnableentitlement = false;
    }
    if (entitlement && entitlement['ExperienceIQ And ProtectIQ'] && (entitlement['ExperienceIQ And ProtectIQ'].name === "ExperienceIQ And ProtectIQ")) {
      this.proAndExpEnableentitlement = true;
    }
    else {
      this.proAndExpEnableentitlement = false;
    }
  }
  getIqSuitesDatas() {

    this.loading = true;
    let requestEndpoints = [];
    let url = this.router.url;

    requestEndpoints.push(
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=CIEP&days=${this.filterDays ? this.filterDays : '7'}`),
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=CIES&days=${this.filterDays ? this.filterDays : '7'}`),
      (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=ARLO&days=${this.filterDays ? this.filterDays : '7'}`)
    )
    if (this.ServifyEnableentitlement) {
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=SERVIFY&days=${this.filterDays ? this.filterDays : '7'}`)
    }
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


      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }

      if (response[1] && response[1].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[1] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }

      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.servifyData = [];
      } else {
        let servifyData = response[3] ? response[3] : [];
        this.servifyData = servifyData.histories
      }
      setTimeout(() => {
        this.loadChart();
      }, 1500)

    }, (err: HttpErrorResponse) => {
      this.loading = false;
      //this.pageErrorHandle(err);
      this.commonOrgService.pageScrollTop();
    })
  }

  loadChart() {
    this.chartData = this.chartDataModify(this.productIQ, this.experienceIQ, this.arloData, this.servifyData);
    if (this.chartData?.categories.length === 30) {
      this.RevenueEdgeSub = this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('revenue-edge-graph-div-system', this.chartDataOptions);
          this.loading = false;
        }, 500)

      });
    } else {
      this.RevenueEdgeSub = this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('revenue-edge-graph-div-system', this.chartDataOptions);
          this.loading = false;
        }, 500)

      });
    }


  }

  chartDataModify(cData1, cData2, cData3, cData4) {
    //debugger;
    let ExperienceIQ = [], ProtectIQ = [], Arlo = [], servify = [], series = [], categories = [], countper = [];
    let data = {};
    cData1 = this.chartOptions.sortByTimestamp(cData1, 'date');
    cData1.forEach(el1 => {
      categories.push(this.reverseString(el1.date, 'M/d/yy'))
      //categories.push(this.dateUtils.getChartFormatDate(el1.time, 'M/d/yy', true))
      el1['value'] = el1.value ? el1.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      ExperienceIQ.push(parseInt(el1.value));
      // suspended.push(parseInt(el.degrade));
      // terminated.push(el.degrade - 1000);
      // servify.push(el.outage + 1000);
    });

    cData2 = this.chartOptions.sortByTimestamp(cData2, 'date');
    cData2.forEach(el2 => {
      //categories.push(this.reverseString(el2.date, 'M/d/yy'))
      el2['value'] = el2.value ? el2.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      ProtectIQ.push(parseInt(el2.value));
    });

    cData3 = this.chartOptions.sortByTimestamp(cData3, 'date');
    cData3.forEach(el3 => {
      //categories.push(this.reverseString(el3.date, 'M/d/yy'))
      el3['value'] = el3.value ? el3.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      Arlo.push(parseInt(el3.value));
    });

    if (cData4 !== undefined) {
      cData4 = this.chartOptions.sortByTimestamp(cData4, 'date');
      cData4.forEach(el4 => {
        //categories.push(this.reverseString(el4.date, 'M/d/yy'))
        el4['value'] = el4.value ? el4.value : 0;
        // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
        servify.push(parseInt(el4.value));
      });
    }


    var count = 0;
    this.catelength = categories.length - 1;
    this.catelenth = categories.length - 2;
    this.ProtectIQ = ProtectIQ[this.catelength];
    this.ExperienceIQ = ExperienceIQ[this.catelength];
    this.Arlo = Arlo[this.catelength] ? Arlo[this.catelength] : 0;
    this.servify = servify[this.catelength] ? servify[this.catelength] : 0;
    this.edgeSuit = (this.ProtectIQ + this.ExperienceIQ + this.Arlo + this.servify)
    this.ProtectIQbefore = ProtectIQ[this.catelenth];
    this.ExperienceIQbefore = ExperienceIQ[this.catelenth];
    this.Arlobefore = Arlo[this.catelenth] ? Arlo[this.catelenth] : 0;
    this.servifybefore = servify[this.catelenth] ? servify[this.catelenth] : 0;
    this.edgeSuitBefore = (this.ProtectIQbefore + this.ExperienceIQbefore + this.Arlobefore + this.servifybefore);
    if (this.edgeSuitBefore == 0 && this.edgeSuit != 0) {
      this.edgeSuitper = (this.edgeSuit * 100).toFixed();;
    }
    else {
      this.edgeSuitper = (this.setpercentage(this.edgeSuit, this.edgeSuitBefore, 2) == '0.00' ? '0' : this.setpercentage(this.edgeSuit, this.edgeSuitBefore, 2));
    }
    this.revenueEdgetatus = {
      edgeSuit: (this.edgeSuit == 'NaN' ? 0 : this.edgeSuit),
      edgeSuitper: Math.abs(this.edgeSuitper == 'NaN' ? 0 : this.edgeSuitper),
      positiveOrNegative: this.checkPositvNegativ(this.edgeSuitper)
    }
    this.Out_EdgeSuit.emit(this.revenueEdgetatus);
    let url = this.router.url;
    if (!this.ServifyEnableentitlement) {
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        // {
        //   name: 'Servify',
        //   data: servify
        // }
      ];
    } else {
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Servify',
          data: servify
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
    var percentage = ((100 * ((a - b) / b)).toFixed(degit ? degit : 2));
    if (percentage == '0.00') {
      return '0';
    }
    else {
      return percentage;
    }
  }
  countPercentage() {

  }


  checkPositvNegativ(returnqlickdata) {
    if (returnqlickdata == 0) {
      return '+';
    }
    if (returnqlickdata.charAt(0) == '-')
      return '-';
    else
      return '+';
  }

  closeAlert() {

  }
  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
  }
  ngOnDestroy(): void {

    this.Out_EdgeSuit.emit(this.revenueEdgetatus)
    // this.dataService.setSystemSubscription(this.subscriberForm.value);
    if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
    if (this.RevenueEdgeSub) this.RevenueEdgeSub.unsubscribe();
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  filterDaysSubscription: any;
  watchFilterDays() {
    this.filterDaysSubscription = this.ccoHomeService.filterDays$.subscribe((value: any) => {
      this.filterDays = value;
      this.getIqSuitesDatas();
    })
  }

}
