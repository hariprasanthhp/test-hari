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
  selector: 'app-revenue-edge-ecosystem',
  templateUrl: './revenue-edge-ecosystem.component.html',
  styleUrls: ['./revenue-edge-ecosystem.component.scss']
})
export class RevenueEDGEEcosystemComponent implements OnInit {
  @Output() private Out_EdgeSuitEco: EventEmitter<any> = new EventEmitter();
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
  arloData: any[];
  servifyData: any[];
  catelength: number;
  catelenth: number;
  Arlo: any;
  servify: any;
  edgeSuit: any;
  Arlobefore: any;
  servifybefore: any;
  Arloper: any;
  servifyper: any;
  revenueEdgetatus: any;
  edgeSuitper: any;
  edgeSuitBefore: any;
  filterDays: any = '7';
  RevenueEdgeSub: any;
  arloEnableentitlement: boolean;
  ServifyEnableentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  ServifyGoldentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyPlatinumentitlement: boolean;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  BarkData: any[];
  bark: any;
  barkbefore: any;
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
    entitlement['Servify'] = entitlement[207] ? entitlement[207] : [];
    entitlement['Platinum'] = entitlement[215] ? entitlement[215] : [];
    entitlement['Silver'] = entitlement[216] ? entitlement[216] : [];
    entitlement['Gold'] = entitlement[217] ? entitlement[217] : [];
    entitlement['Bark_Premium'] = entitlement[219] ? entitlement[219] : [];
    entitlement['Bark_Junior'] = entitlement[220] ? entitlement[220] : [];
    if (entitlement && entitlement['Bark_Premium'] && (entitlement['Bark_Premium'].name === "Bark Premium")) {
      this.Bark_Premiumentitlement = true;
    }
    else {
      this.Bark_Premiumentitlement = false;
    }
    if (entitlement && entitlement['Bark_Junior'] && (entitlement['Bark_Junior'].name === "Bark Junior")) {
      this.Bark_Juniorentitlement = true;
    }
    else {
      this.Bark_Juniorentitlement = false;
    }
    if (entitlement && entitlement['arlo'] && (entitlement['arlo'].name === "ARLO")) {
      this.arloEnableentitlement = true;
    }
    else {
      this.arloEnableentitlement = false;
    }
    entitlement['arloUnlimited'] = entitlement[212] ? entitlement[212] : [];
    entitlement['arloUnlimitedPlus'] = entitlement[213] ? entitlement[213] : [];
    if (entitlement && entitlement['arloUnlimited'] && (entitlement['arloUnlimited'].name === "ARLO Unlimited")) {
      this.arloUnlimitedentitlement = true;
    }
    else {
      this.arloUnlimitedentitlement = false;
    }
    if (entitlement && entitlement['arloUnlimitedPlus'] && (entitlement['arloUnlimitedPlus'].name === "ARLO Unlimited Plus")) {
      this.arloUnlimitedplusentitlement = true;
    }
    else {
      this.arloUnlimitedplusentitlement = false;
    }
    if (entitlement && entitlement['Servify'] && (entitlement['Servify'].name === "Servify Bronze")) {
      this.ServifyEnableentitlement = true;
    }
    else {
      this.ServifyEnableentitlement = false;
    }
    if (entitlement && entitlement['Platinum'] && (entitlement['Platinum'].name === "Servify Platinum")) {
      this.ServifyPlatinumentitlement = true;
    }
    else {
      this.ServifyPlatinumentitlement = false;
    }
    if (entitlement && entitlement['Silver'] && (entitlement['Silver'].name === "Servify Silver")) {
      this.ServifySilverentitlement = true;
    }
    else {
      this.ServifySilverentitlement = false;
    }
    if (entitlement && entitlement['Gold'] && (entitlement['Gold'].name === "Servify Gold")) {
      this.ServifyGoldentitlement = true;
    }
    else {
      this.ServifyGoldentitlement = false;
    }
  }
  getIqSuitesDatas() {

    this.loading = true;
    let requestEndpoints = [];
    let url = this.router.url;
    if(this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement){
      requestEndpoints.push(
        (`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=ARLO&days=${this.filterDays ? this.filterDays : '7'}`)
      )
    }
   
    if(this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifyPlatinumentitlement ||this.ServifySilverentitlement){
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=SERVIFY&days=${this.filterDays ? this.filterDays : '7'}`)
    }
    if(this.Bark_Premiumentitlement || this.Bark_Juniorentitlement){
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}/dashboard/iqsuite?name=BARK&days=${this.filterDays ? this.filterDays : '7'}`)
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
      if (!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement)) {
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.arloData = [];
        } else {
          let arloData = response[0] ? response[0] : [];
          this.arloData = arloData.histories
        }
      }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement ) ){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.servifyData = [];
        } else {
          let servifyData = response[0] ? response[0] : [];
          this.servifyData = servifyData.histories
        }
      }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.BarkData = [];
        } else {
          let BarkData = response[0] ? response[0] : [];
          this.BarkData = BarkData.histories
        }
      }else if(!this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement )){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.arloData = [];
        } else {
          let arloData = response[0] ? response[0] : [];
          this.arloData = arloData.histories
        }
        if (response[1] && response[1].error) {
          this.pageErrorHandle(response[1].error);
          this.servifyData = [];
        } else {
          let servifyData = response[1] ? response[1] : [];
          this.servifyData = servifyData.histories
        }
      }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement )){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.servifyData = [];
        } else {
          let servifyData = response[0] ? response[0] : [];
          this.servifyData = servifyData.histories
        }
        if (response[1] && response[1].error) {
          this.pageErrorHandle(response[1].error);
          this.BarkData = [];
        } else {
          let BarkData = response[1] ? response[1] : [];
          this.BarkData = BarkData.histories
        }
      }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement )){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.arloData = [];
        } else {
          let arloData = response[0] ? response[0] : [];
          this.arloData = arloData.histories
        }
        if (response[1] && response[1].error) {
          this.pageErrorHandle(response[1].error);
          this.BarkData = [];
        } else {
          let BarkData = response[1] ? response[1] : [];
          this.BarkData = BarkData.histories
        }
      }else if((this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement )){
        if (response[0] && response[0].error) {
          this.pageErrorHandle(response[0].error);
          this.arloData = [];
        } else {
          let arloData = response[0] ? response[0] : [];
          this.arloData = arloData.histories
        }
        if (response[1] && response[1].error) {
          this.pageErrorHandle(response[1].error);
          this.servifyData = [];
        } else {
          let servifyData = response[1] ? response[1] : [];
          this.servifyData = servifyData.histories
        }
        if (response[2] && response[2].error) {
          this.pageErrorHandle(response[2].error);
          this.BarkData = [];
        } else {
          let BarkData = response[2] ? response[2] : [];
          this.BarkData = BarkData.histories
        }
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

  loadChart() {
    this.chartData = this.chartDataModify( this.arloData, this.servifyData, this.BarkData);
    if (this.chartData?.categories.length === 30) {
      this.RevenueEdgeSub = this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('revenue-edge-ecosystem-graph-div-system', this.chartDataOptions);
          this.loading = false;
        }, 100)

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
          this.Highcharts.chart('revenue-edge-ecosystem-graph-div-system', this.chartDataOptions);
          this.loading = false;
        }, 100)

      });
    }


  }

  chartDataModify(cData3, cData4, cData5) {
    //debugger;
    let  Arlo = [], servify = [], series = [], categories = [], bark=[], countper = [];
    let data = {};
    if (cData3 !== undefined) {
      cData3 = this.chartOptions.sortByTimestamp(cData3, 'date');
    cData3.forEach(el3 => {
      categories.push(this.reverseString(el3.date, 'M/d/yy'))
      el3['value'] = el3.value ? el3.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      Arlo.push(parseInt(el3.value));
    });

    }
    
    if (cData4 !== undefined) {
      cData4 = this.chartOptions.sortByTimestamp(cData4, 'date');
      cData4.forEach(el4 => {
        if(cData3 == undefined){
           categories.push(this.reverseString(el4.date, 'M/d/yy'))
        }
        el4['value'] = el4.value ? el4.value : 0;
        // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
        servify.push(parseInt(el4.value));
      });
    }
    if (cData5 !== undefined) {
      cData5 = this.chartOptions.sortByTimestamp(cData5, 'date');
      cData5.forEach(el5 => {
        if(cData4 == undefined){
          categories.push(this.reverseString(el5.date, 'M/d/yy'))
        }
       
        el5['value'] = el5.value ? el5.value : 0;
        // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
        bark.push(parseInt(el5.value));
      });
    }

    var count = 0;
    this.catelength = categories.length - 1;
    this.catelenth = categories.length - 2;
    this.Arlo = Arlo[this.catelength] ? Arlo[this.catelength] : 0;
    this.servify = servify[this.catelength] ? servify[this.catelength] : 0;
    this.bark = bark[this.catelength] ? bark[this.catelength] : 0;
    this.edgeSuit = (this.Arlo + this.servify + this.bark)
    this.Arlobefore = Arlo[this.catelenth] ? Arlo[this.catelenth] : 0;
    this.servifybefore = servify[this.catelenth] ? servify[this.catelenth] : 0;
    this.barkbefore = bark[this.catelenth] ? bark[this.catelenth] : 0;
    this.edgeSuitBefore = (this.Arlobefore + this.servifybefore +  this.barkbefore);
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
    this.Out_EdgeSuitEco.emit(this.revenueEdgetatus);
    let url = this.router.url;
    if (!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement)) {
      series = [
        {
          name: 'Arlo',
          data: Arlo
        },]
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement ) ){
      series = [
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      series = [
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement )){
      series = [
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement )){
      series = [
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement )){
      series = [
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement) && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement )){
      series = [
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        } 
      ];
    }
     

    data = {
      series: series ? series:[],
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

    this.Out_EdgeSuitEco.emit(this.revenueEdgetatus)
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
