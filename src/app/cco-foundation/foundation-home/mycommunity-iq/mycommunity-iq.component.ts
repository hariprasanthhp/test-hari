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
  selector: 'app-mycommunity-iq',
  templateUrl: './mycommunity-iq.component.html',
  styleUrls: ['./mycommunity-iq.component.scss']
})
export class MycommunityIQComponent implements OnInit {
  @Output() private Out_communityIQ: EventEmitter<any> = new EventEmitter();
  ORG_ID: any;
  language: any;
  languageSubject: any;
  filterDays: string;
  loading: boolean;
  chartData: any;
  commandIQSub: any;
  chartDataOptions: any;
  Highcharts = Highcharts;
  MyCommunityIQentitlement: boolean;
  smallBizIQentitlement: boolean;
  combineLatest: any;
  parallelReqSubscribtion: any;
  errorInfo: any;
  error: boolean;
  communityIq: any[];
  smallbizIq: any;
  eduroam: any[];
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
  ) { this.ORG_ID = this.sso.getOrgId();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });}

    ngOnInit(): void {

      //this.loadChart();
      this.getMyCommunityIQEntitlement()
      let url = this.router.url;
      if (url.indexOf('/cco/home/system-service-trends') > -1) {
        this.filterDays = this.ccoHomeService.filterDays;
        this.watchFilterDays();
        setTimeout(() => {
          this.getIqSuitesDatas()
        }, 50);
      } else {
        this.filterDays = '7';
        this.getIqSuitesDatas();
      }
    }
    getIqSuitesDatas() {

      this.loading = true;
      let requestEndpoints = [];
      let url = this.router.url;
  
       
      if(this.MyCommunityIQentitlement){
        requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/mycommunityiq-passpoint?limit=${this.filterDays ? this.filterDays : '7'}`)
      }
      if(this.MyCommunityIQentitlement){
        requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/mycommunityiq-eduroam?limit=${this.filterDays ? this.filterDays : '7'}`)
      }
      if(this.smallBizIQentitlement){
        requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/iqsuite?name=SMALLBIZIQ&days=${this.filterDays ? this.filterDays : '7'}`);
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
        let url = this.router.url;
        if(this.MyCommunityIQentitlement){
          if (response[0] && response[0].error) {
            this.pageErrorHandle(response[0].error);
            this.communityIq = [];
          } else {
            let communityIq = response[0] ? response[0] : [];
            this.communityIq = communityIq
          }
          if (response[1] && response[1].error) {
            this.pageErrorHandle(response[1].error);
            this.eduroam = [];
          } else {
            let eduroam = response[1] ? response[1] : [];
            this.eduroam = eduroam
          }
          if (response[2] && response[2].error) {
            this.pageErrorHandle(response[2].error);
            this.smallbizIq = [];
          } else {
            let smallbizIq = response[2] ? response[2] : [];
            this.smallbizIq = smallbizIq.histories
          }
        }else{
          if (response[0] && response[0].error) {
            this.pageErrorHandle(response[0].error);
            this.smallbizIq = [];
          } else {
            let smallbizIq = response[0] ? response[0] : [];
            this.smallbizIq = smallbizIq.histories
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
    pageErrorHandle(err: HttpErrorResponse) {
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.error = true;
    }
    loadChart() {
      this.chartData = this.chartDataModify( this.communityIq,this.eduroam, this.smallbizIq);
      if (this.chartData?.categories.length === 30) {
        this.commandIQSub = this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('MyCommunityIQ-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)
  
        });
      } else {
        this.commandIQSub = this.chartOptions.getCommonSubscribersChartOptions(this.chartData, 'Number_of_Systems', true).subscribe((res: any) => {
          this.chartDataOptions = res;
          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });
          setTimeout(() => {
            this.Highcharts.chart('MyCommunityIQ-graph-div', this.chartDataOptions);
            this.loading = false;
          }, 100)
  
        });
      }
    
  
    }
    getMyCommunityIQEntitlement() {
      //debugger;
      let entitlement = this.sso.getEntitlements();
      entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
      entitlement['smallBizIQ'] = entitlement[218] ? entitlement[218] : [];
      if (entitlement && entitlement?.smallBizIQ?.apptype === 218) {
        this.smallBizIQentitlement = true;
      }
      else {
        this.smallBizIQentitlement = false;
      }
      if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
        this.MyCommunityIQentitlement = true;
      }
      else {
        this.MyCommunityIQentitlement = false;
      }
    }  

    chartDataModify(cData,cdata1,cdata2) {

      let community = [], smallBiz = [], value = [], series = [], categories = [],eduroam=[]
      let data = {};
      if(cData !== undefined && cData?.length !==0){
        cData = this.chartOptions.sortByTimestamp(cData, 'time');
        cData.forEach(el => {
          categories.push(this.dateUtils.getChartFormatDate(el.time, 'M/d/yy', true))
           //categories.push(this.reverseString(el.date, 'M/d/yy'))
          el['count'] = el.count ? el.count : 0;
          //el.value = el.value + Math.floor(Math.random() * 1000) + 1500;
          community.push(parseInt(el.count));
        });
      }
      if(cdata1 !== undefined && cdata1?.length !==0){
        cdata1 = this.chartOptions.sortByTimestamp(cdata1, 'time');
        cdata1.forEach(el => {
          if(cData == undefined || cData?.length ==0){
            categories.push(this.dateUtils.getChartFormatDate(el.time, 'M/d/yy', true))
          } 
         
          //categories.push(this.reverseString(el.date, 'M/d/yy'))
          el['count'] = el.count ? el.count : 0;
          //el.value = el.value + Math.floor(Math.random() * 1000) + 1500;
          eduroam.push(parseInt(el.count));
        });
      }
      if (cdata2 !== undefined && cdata2?.length !==0) {
        cdata2 = this.chartOptions.sortByTimestamp(cdata2, 'date');
        cdata2.forEach(el4 => {
          if(cdata1 == undefined ||  cdata1?.length ==0){
            //categories.push(this.dateUtils.getChartFormatDate(el4.dateel.time, 'M/d/yy', true))
            categories.push(this.reverseString(el4.date, 'M/d/yy'))
          } 
          el4['value'] = el4.value ? el4.value : 0;
          // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
          smallBiz.push(parseInt(el4.value));
        });
      }
        if(this.MyCommunityIQentitlement && !this.smallBizIQentitlement){
          series = [
            {
              name: 'SmartTown Wi-Fi',
              data: community
            },
            {
              name: 'Eduroam',
              data: eduroam
            }
          ];
        }else if(!this.MyCommunityIQentitlement && this.smallBizIQentitlement){
          series = [
            {
              name: 'SmartBiz',
              data: smallBiz
            }
          ];
        }else if(this.MyCommunityIQentitlement && this.smallBizIQentitlement){
          series = [
            {
              name: 'SmartTown Wi-Fi',
              data: community
            },
            {
              name: 'Eduroam',
              data: eduroam
            },
            {
              name: 'SmartBiz',
              data: smallBiz
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
    ngOnDestroy(): void {
      if (this.filterDaysSubscription) this.filterDaysSubscription.unsubscribe();
      if (this.commandIQSub) this.commandIQSub.unsubscribe();
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
