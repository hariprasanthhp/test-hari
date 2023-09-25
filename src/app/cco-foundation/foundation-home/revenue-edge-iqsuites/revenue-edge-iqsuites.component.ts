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
  selector: 'app-revenue-edge-iqsuites',
  templateUrl: './revenue-edge-iqsuites.component.html',
  styleUrls: ['./revenue-edge-iqsuites.component.scss']
})
export class RevenueEdgeIQsuitesComponent implements OnInit {
  @Output() private Out_EdgeSuitIQ: EventEmitter<any> = new EventEmitter();
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
  catelength: number;
  catelenth: number;
  ProtectIQ: any;
  ExperienceIQ: any;
  edgeSuit: any;
  ExperienceIQbefore: any;
  ProtectIQbefore: any;
  ProtectIQper: any;
  ExperienceIQper: any;
  revenueEdgetatus: any;
  edgeSuitper: any;
  edgeSuitBefore: any;
  filterDays: any = '7';
  RevenueEdgeSub: any;
  productIQEnableentitlement: boolean;
  ExperienceIQEnableentitlement: boolean;
  proAndExpEnableentitlement: boolean;
  MyCommunityIQentitlement: boolean;
  communityIQ: any[];
  community: any;
  communitybefore: any;
  Bark_Premiumentitlement: boolean;
  Bark_Juniorentitlement: boolean;
  arloEnableentitlement: boolean;
  arloUnlimitedentitlement: boolean;
  arloUnlimitedplusentitlement: boolean;
  ServifyEnableentitlement: boolean;
  ServifyPlatinumentitlement: boolean;
  ServifySilverentitlement: boolean;
  ServifyGoldentitlement: boolean;
  arloData: any[];
  servifyData: any[];
  BarkData: any[];
  Arlo: any;
  servify: any;
  bark: any;
  Arlobefore: any;
  servifybefore: any;
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
  ) {  this.ORG_ID = this.sso.getOrgId();
    this.getEdgeSuiteEntitlement()
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.loadChart();
    });}

  ngOnInit(): void {
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
    entitlement['ProtectIQ'] = entitlement[203] ? entitlement[203] : [];
    entitlement['ExperienceIQ'] = entitlement[204] ? entitlement[204] : [];
    entitlement['ExperienceIQ And ProtectIQ'] = entitlement[205] ? entitlement[205] : [];
    entitlement['MyCommunityIQ'] = entitlement[214] ? entitlement[214] : [];
    
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.MyCommunityIQentitlement = true;
    }
    else {
      this.MyCommunityIQentitlement = false;
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

    if(this.proAndExpEnableentitlement || this.productIQEnableentitlement){
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/iqsuite?name=CIES&days=${this.filterDays ? this.filterDays : '7'}`)
    }

    if(this.proAndExpEnableentitlement || this.ExperienceIQEnableentitlement){
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/iqsuite?name=CIEP&days=${this.filterDays ? this.filterDays : '7'}`)
    }
    if(this.MyCommunityIQentitlement){
      requestEndpoints.push(`${environment.FOUNDATION_BASE_URL}dashboard/mycommunityiq-subscriber?limit=${this.filterDays ? this.filterDays : '7'}`)
    }
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

    if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ExperienceIQEnableentitlement && !this.proAndExpEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement){
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
    }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement){
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
    }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement){
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
    }else if (!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement)) {
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.arloData = [];
      } else {
        let arloData = response[0] ? response[0] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement ) ){
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.servifyData = [];
      } else {
        let servifyData = response[0] ? response[0] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.BarkData = [];
      } else {
        let BarkData = response[0] ? response[0] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
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
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & communityiq
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & arlo
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & servify
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.servifyData = [];
      } else {
        let servifyData = response[1] ? response[1] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //protectiQ & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.BarkData = [];
      } else {
        let BarkData = response[1] ? response[1] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & community
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & arlo
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & servify
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.servifyData = [];
      } else {
        let servifyData = response[1] ? response[1] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //experienceIQ & bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.BarkData = [];
      } else {
        let BarkData = response[1] ? response[1] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //communityIQ & arlo
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //communityIQ & servify
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.servifyData = [];
      } else {
        let servifyData = response[1] ? response[1] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //communityIQ & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.BarkData = [];
      } else {
        let BarkData = response[1] ? response[1] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //arlo & servify
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //arlo & bark
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //servify & bark
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
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & Comm
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & arlo
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
        this.pageErrorHandle(response[0].error);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & servify
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
        this.pageErrorHandle(response[0].error);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & EIQ & bark
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
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & comm & arlo
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & comm & servify
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & comm & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement  && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & arlo & servify
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & arlo & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & servify & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exiq & comm & arlo
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.arloData = [];
      } else {
        let arloData = response[2] ? response[2] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exIQ & comm & servify
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & comm & bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exIQ & arlo & servify
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & arlo & bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & servify & bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[1] : [];
        this.experienceIQ = experienceIQ.histories
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //comm & arlo & servify
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & arlo & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.BarkData = [];
      } else {
        let BarkData = response[2] ? response[2] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & serv & bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //arlo & serv & bark
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & comm &arlo
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.arloData = [];
      } else {
        let arloData = response[3] ? response[3] : [];
        this.arloData = arloData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & comm &servi
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.servifyData = [];
      } else {
        let servifyData = response[1] ? response[1] : [];
        this.servifyData = servifyData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & comm &bark
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & arlo &ser
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & arlo &bark
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
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & ser &bark
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
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & comm & arlo &ser
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & arlo &bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
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
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement &&(this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement  && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & ser &bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
    
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement  && !this.MyCommunityIQentitlement &&(this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & arlo & ser &bark
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.productIQ = [];
      } else {
        let productIQ = response[0] ? response[0] : [];
        this.productIQ = productIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) &&  (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exp & com & arlo &ser
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
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
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & comm & ser &bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & arlo & ser &bark
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & arlo & ser &bar
      if (response[0] && response[0].error) {
        this.pageErrorHandle(response[0].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[0] ? response[0] : [];
        this.communityIQ = communityIQ
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.arloData = [];
      } else {
        let arloData = response[1] ? response[1] : [];
        this.arloData = arloData.histories
      }
      if (response[2] && response[2].error) {
        this.pageErrorHandle(response[2].error);
        this.servifyData = [];
      } else {
        let servifyData = response[2] ? response[2] : [];
        this.servifyData = servifyData.histories
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.BarkData = [];
      } else {
        let BarkData = response[3] ? response[3] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & exp & com &arlo & ser
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.arloData = [];
      } else {
        let arloData = response[3] ? response[3] : [];
        this.arloData = arloData.histories
      }
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.servifyData = [];
      } else {
        let servifyData = response[4] ? response[4] : [];
        this.servifyData = servifyData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &arlo & bark
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.arloData = [];
      } else {
        let arloData = response[3] ? response[3] : [];
        this.arloData = arloData.histories
      }
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.BarkData = [];
      } else {
        let BarkData = response[4] ? response[4] : [];
        this.BarkData = BarkData.histories
      }
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &ser & bar
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.servifyData = [];
      } else {
        let servifyData = response[3] ? response[3] : [];
        this.servifyData = servifyData.histories
      }
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.BarkData = [];
      } else {
        let BarkData = response[4] ? response[4] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & arlo &ser & bar
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
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.BarkData = [];
      } else {
        let BarkData = response[4] ? response[4] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & arlo &ser & bark
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
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.BarkData = [];
      } else {
        let BarkData = response[4] ? response[4] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & com & arlo &ser & bar
      if (response[0] && response[0].error) {
        //this.pageErrorHandle(response[1].error);
        this.experienceIQ = [];
      } else {
        let experienceIQ = response[0] ? response[0] : [];
        this.experienceIQ = experienceIQ.histories
      }
      if (response[1] && response[1].error) {
        this.pageErrorHandle(response[1].error);
        this.communityIQ = [];
      } else {
        let communityIQ = response[1] ? response[1] : [];
        this.communityIQ = communityIQ
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
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.BarkData = [];
      } else {
        let BarkData = response[4] ? response[4] : [];
        this.BarkData = BarkData.histories
      }
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &arlo & ser & bar
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
        this.communityIQ = [];
      } else {
        let communityIQ = response[2] ? response[2] : [];
        this.communityIQ = communityIQ
      }
      if (response[3] && response[3].error) {
        this.pageErrorHandle(response[3].error);
        this.arloData = [];
      } else {
        let arloData = response[3] ? response[3] : [];
        this.arloData = arloData.histories
      }
      if (response[4] && response[4].error) {
        this.pageErrorHandle(response[4].error);
        this.servifyData = [];
      } else {
        let servifyData = response[4] ? response[4] : [];
        this.servifyData = servifyData.histories
      }
      if (response[5] && response[5].error) {
        this.pageErrorHandle(response[5].error);
        this.BarkData = [];
      } else {
        let BarkData = response[5] ? response[5] : [];
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
    this.chartData = this.chartDataModify(this.productIQ, this.experienceIQ,this.communityIQ,this.arloData, this.servifyData, this.BarkData);
    if (this.chartData?.categories.length === 30) {
      this.RevenueEdgeSub = this.chartOptions.getCommonSubscribersChartOptionsfor30records(this.chartData, 'Number of Subscribers', true).subscribe((res: any) => {
        this.chartDataOptions = res;
        Highcharts.setOptions({
          lang: {
            thousandsSep: ','
          }
        });
        setTimeout(() => {
          this.Highcharts.chart('revenue-edge-iqsuites-graph-div-system', this.chartDataOptions);
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
          this.Highcharts.chart('revenue-edge-iqsuites-graph-div-system', this.chartDataOptions);
          this.loading = false;
        }, 100)

      });
    }


  }

  chartDataModify(cData1, cData2, cData3, cData4, cData5,cData6) {
    //debugger;
    let ExperienceIQ = [], ProtectIQ = [], series = [], categories = [], community=[],countper = [], Arlo = [], servify = [], bark=[];
    let data = {};
    if(cData1 !== undefined){
      cData1 = this.chartOptions.sortByTimestamp(cData1, 'date');
    cData1.forEach(el1 => {
      categories.push(this.reverseString(el1.date, 'M/d/yy'))
      el1['value'] = el1.value ? el1.value : 0;
      ProtectIQ.push(parseInt(el1.value));
    });}
    if(cData2 !== undefined){
    cData2 = this.chartOptions.sortByTimestamp(cData2, 'date');
    cData2.forEach(el2 => {
      if(!this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement){
      categories.push(this.reverseString(el2.date, 'M/d/yy'))
      }
      el2['value'] = el2.value ? el2.value : 0;
      // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
      ExperienceIQ.push(parseInt(el2.value));
    });
    }
    if(cData3 !== undefined){
      cData3 = this.chartOptions.sortByTimestamp(cData3, 'time');
      cData3.forEach(el3 => {
        
        if(!this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement){
          categories.push(this.dateUtils.getChartFormatDate(el3.time, 'M/d/yy', true))
        } 
          el3['count'] = el3.count ? el3.count : 0;
          community.push(parseInt(el3.count));
      });
    }
    if (cData4 !== undefined) {
      cData4 = this.chartOptions.sortByTimestamp(cData4, 'date');
      cData4.forEach(el4 => {
        if(cData1 == undefined && cData2 == undefined && cData3 == undefined){
          categories.push(this.reverseString(el4.date, 'M/d/yy'))
        }
      el4['value'] = el4.value ? el4.value : 0;
      Arlo.push(parseInt(el4.value));
    });

    }
    if (cData5 !== undefined) {
      cData5 = this.chartOptions.sortByTimestamp(cData5, 'date');
      cData5.forEach(el5 => {
        if(cData1 == undefined && cData2 == undefined && cData3 == undefined && cData4 == undefined){
           categories.push(this.reverseString(el5.date, 'M/d/yy'))
        }
        el5['value'] = el5.value ? el5.value : 0;
        // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
        servify.push(parseInt(el5.value));
      });
    }
    if (cData6 !== undefined) {
      cData6 = this.chartOptions.sortByTimestamp(cData6, 'date');
      cData6.forEach(el6 => {
        if(cData1 == undefined && cData2 == undefined && cData3 == undefined && cData4 == undefined &&cData5 == undefined){
          categories.push(this.reverseString(el6.date, 'M/d/yy'))
        }
       
        el6['value'] = el6.value ? el6.value : 0;
        // el.degrade = el.degrade > 10000 ? el.degrade / 100 : el.degrade;
        bark.push(parseInt(el6.value));
      });
    }
    var count = 0;
    this.catelength = categories.length - 1;
    this.catelenth = categories.length - 2;
    this.ProtectIQ = ProtectIQ[this.catelength] ? ProtectIQ[this.catelength]:0;
    this.ExperienceIQ = ExperienceIQ[this.catelength] ? ExperienceIQ[this.catelength]:0;
    this.community = community[this.catelength] ? community[this.catelength] : 0;
    this.Arlo = Arlo[this.catelength] ? Arlo[this.catelength] : 0;
    this.servify = servify[this.catelength] ? servify[this.catelength] : 0;
    this.bark = bark[this.catelength] ? bark[this.catelength] : 0;
    this.edgeSuit = (this.ProtectIQ + this.ExperienceIQ + this.community + this.Arlo + this.servify + this.bark)
    this.ProtectIQbefore = ProtectIQ[this.catelenth] ? ProtectIQ[this.catelenth]:0;
    this.ExperienceIQbefore = ExperienceIQ[this.catelenth] ? ExperienceIQ[this.catelenth]:0;
    this.communitybefore = community[this.catelenth] ? community[this.catelenth] : 0;
    this.Arlobefore = Arlo[this.catelenth] ? Arlo[this.catelenth] : 0;
    this.servifybefore = servify[this.catelenth] ? servify[this.catelenth] : 0;
    this.barkbefore = bark[this.catelenth] ? bark[this.catelenth] : 0;
    this.edgeSuitBefore = (this.ProtectIQbefore + this.ExperienceIQbefore + this.communitybefore + this.Arlobefore + this.servifybefore +  this.barkbefore);
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
    this.Out_EdgeSuitIQ.emit(this.revenueEdgetatus);
    let url = this.router.url;
    if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ExperienceIQEnableentitlement && !this.proAndExpEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement){
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },]
    }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement){
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        }
        
      ];
    }else if(!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement){
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        }
      ];
    }else if (!this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.arloEnableentitlement|| this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement)) {
      series = [
        {
          name: 'Arlo',
          data: Arlo
        },]
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement ) ){
      series = [
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      series = [
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        }
        
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & communityiq
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        }
        
      ];
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & arlo
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //protectiQ & servify
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //protectiQ & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & community
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        }
      ];
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & arlo
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //experienceIQ & servify
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //experienceIQ & bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //communityIQ & arlo
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //communityIQ & servify
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //communityIQ & bark
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //arlo & servify
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //arlo & bark
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.productIQEnableentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //servify & bark
      series = [
        
        {
          name: 'Bark',
          data: bark
        },{
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & Comm
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        }
      ];
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & arlo
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & EIQ & servify
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & EIQ & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement ||  this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & comm & arlo
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & comm & servify
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Servify',
          data: servify
        } 
      ];
    }else if(!this.arloEnableentitlement &&  !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & comm & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement  && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //prIQ & arlo & servify
      series = [
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & arlo & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //prIQ & servify & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        } ,
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exiq & comm & arlo
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        } ,
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exIQ & comm & servify
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        } ,
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & comm & bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        } ,
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exIQ & arlo & servify
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        } ,
        {
          name: 'Servify',
          data: servify
        } 
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & arlo & bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        } ,
        {
          name: 'Bark',
          data: bark
        } 
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exIQ & servify & bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Bark',
          data: bark
        } ,
        {
          name: 'Servify',
          data: servify
        },
        
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //comm & arlo & servify
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & arlo & bark
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & serv & bark
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        },
      
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //arlo & serv & bark
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
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & comm &arlo
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & comm &servi
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Servify',
          data: servify
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & comm &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & Exp & arlo &ser
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & arlo &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & Exp & ser &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & comm & arlo &ser
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
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
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & arlo &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement &&(this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement  && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & ser &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        },
      
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement  && !this.MyCommunityIQentitlement &&(this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & arlo & ser &bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
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
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) &&  (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //exp & com & arlo &ser
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
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
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & comm & ser &bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement)  && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & arlo & ser &bark
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
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
        },
        
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //comm & arlo & ser &bar
      series = [
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
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
        },
        
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && !this.Bark_Juniorentitlement && !this.Bark_Premiumentitlement){
      //pro & exp & com &arlo & ser
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Servify',
          data: servify
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && !this.ServifyEnableentitlement && !this.ServifyGoldentitlement && !this.ServifySilverentitlement && !this.ServifyPlatinumentitlement && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &arlo & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Arlo',
          data: Arlo
        },
        {
          name: 'Bark',
          data: bark
        }
      ];
    }else if(!this.arloEnableentitlement && !this.arloUnlimitedentitlement && !this.arloUnlimitedplusentitlement && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &ser & bar
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
        {
          name: 'Bark',
          data: bark
        },
        {
          name: 'Servify',
          data: servify
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && !this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & arlo &ser & bar
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
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
        },
        
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && !this.ExperienceIQEnableentitlement && this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & comm & arlo &ser & bark
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
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
        },
        
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && !this.proAndExpEnableentitlement && this.ExperienceIQEnableentitlement && !this.productIQEnableentitlement && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //exp & com & arlo &ser & bar
      series = [
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
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
        },
       
      ];
    }else if((this.arloEnableentitlement || this.arloUnlimitedentitlement || this.arloUnlimitedplusentitlement) && (this.ServifyEnableentitlement || this.ServifyGoldentitlement || this.ServifySilverentitlement || this.ServifyPlatinumentitlement) && (this.proAndExpEnableentitlement || (this.ExperienceIQEnableentitlement && this.productIQEnableentitlement)) && this.MyCommunityIQentitlement && (this.Bark_Juniorentitlement || this.Bark_Premiumentitlement)){
      //pro & exp & com &arlo & ser & bar
      series = [
        {
          name: 'ProtectIQ',
          data: ProtectIQ
        },
        {
          name: 'ExperienceIQ',
          data: ExperienceIQ
        },
        {
          name: 'SmartTown Wi-Fi',
          data: community
        },
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
        },
        
      ];
    }
    series=series.splice(0,5)
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

    this.Out_EdgeSuitIQ.emit(this.revenueEdgetatus)
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
