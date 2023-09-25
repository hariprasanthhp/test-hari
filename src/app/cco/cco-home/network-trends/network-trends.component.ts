import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { of, forkJoin, Subject, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { HomeChartOptionsService } from '../services/home-chart-options.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import * as Highcharts from "highcharts/highstock";
const noData = require('highcharts/modules/no-data-to-display')
noData(Highcharts);
import customEvents from 'highcharts-custom-events';
import { FormBuilder } from '@angular/forms';
import { HistoryChartOptionsService } from '../../issues/historyreport/service/history-chart-options.service';
import { Router } from '@angular/router';
import { CcochartService } from '../../health/pon-utilization/service/ccochart.service';
customEvents(Highcharts);

import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { Title } from '@angular/platform-browser';
import { IssueService } from '../../issues/service/issue.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-network-trends',
  templateUrl: './network-trends.component.html',
  styleUrls: ['./network-trends.component.scss']
})
export class NetworkTrendsComponent implements OnInit, OnDestroy {
  isDev = false;
  dtOptions: DataTables.Settings = {};
  isRerender = false;
  talertTypeDtOptions:DataTables.Settings = {
    paging:false,
    lengthChange: false,
    ordering: true,
    order: [],
    searching: false,
    info:false,
    dom: 'tipr',
    processing: false
  }

  // @ViewChild('showInfoModal', { static: true }) private showInfoModal: TemplateRef<any>;
  // @ViewChild('addNotesModal', { static: true }) private addNotesModal: TemplateRef<any>;
  // @ViewChild('showNotesModal', { static: true }) private showNotesModal: TemplateRef<any>;
  // @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  errors = {
    'severity': '',
    'loss-of-pon': '',
    'subscriber': '',
    'biperror': '',
    'alertTypes': '',
  };
  language: any;
  languageSubject;
  regionName: any;
  locationName: any;
  FSAN: any;
  eventName: any;
  Severity: any;
  alarmType: any;
  category: any;
  loadRegionChart: boolean;
  loadLocationChart: boolean;
  loadSystemChart: boolean;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`
  listObs: any;
  loading: boolean = false;
  data: any;
  filterDays: any = "7";
  hasScopeAccess = false;

  Highcharts = Highcharts;

  feature = {
    activealarm: false,
    biperrors: false,
    activepons: false,
    subscriberimpacted: false,
    alertTypes: false,
  };
  tosSub: any;
  FromDate: any;
  ponutilizationchart: any;
  PONCAPACITY: any = 0;
  pPONCAPACITY: any = 0;
  PONCAPACITYpercent: any = 0;


  showLossofPons: boolean = false;
  showsubImpacted: boolean = false;

  fullscreen: boolean = false;

  AlamBipWrapper: boolean = true;
  LosPonsubImpWrapper: boolean = true;
  lossofPon: any;
  subImpacted: any;
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtInstance: Promise<DataTables.Api>;
  // @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  searchTerm: '';
  list: any;
  subscriberDisrutionList: any;
  initLoad: boolean;
  tableCounts: { searchText: any; total: any; displayCount: any; displayed: any; start: any; };
  showTable: boolean;
  count: number;
  modalRef: any;
  dialogService: any;
  url: string;
  error: boolean;

  renderOnce: boolean = false;

  modalInfo: any;
  modalTitle: any;
  colors = {
    MINOR: '#F3B426',
    MAJOR: '#FC7235',
    CRITICAL: '#C70000',
    WARNING: "#f7e9c1",
    INFO: "#7cb5ec"
  }
  colorClass = {
    MINOR: 'minor-but',
    MAJOR: 'major-but',
    CRITICAL: 'critical-but',
    WARNING: "warning-but",
    INFO: "severity-info-but"
  }
  chartData: any;
  chsttype: string;

  ontusparam = 'ont-us-sdber';
  ontdsparam = 'ont-ds-sdber';
  timeZone: string;
  alertsTypeData = [];
  alertTypes = {
    'System Alarms' : 'system',
    'Transform Alarms' : 'transformed',
    'Health Alerts' : 'health',
    'Cloud Connectivity' : 'connectivity',
    'Service Disruptions' : 'disruption'
    }
  dtTrigger: Subject<any> = new Subject();
  subscriberImpactedClickedDate: any;
  dtSub: any;
  dtSub1: any;
  disableExprtBtn: boolean;
  serviceDisruptedSelectedDate: string[];
  constructor(private translateService: TranslateService,
    private http: HttpClient,
    private dateUtils: DateUtilsService,
    public ssoService: SsoAuthService,
    private chartOptnService: HomeChartOptionsService,
    private router: Router,
    private ccochatservice: CcochartService,
    private alarmchartOptionService: HistoryChartOptionsService,
    private titleService: Title,
    private commonOrgService: CommonService,
    private issueService: IssueService,) { }


  ngOnInit(): void {
    if (environment['API_BASE_URL'].indexOf('dev.api.calix.ai') !== -1) {
      this.isDev = true;
    }
    this.timeZone = new Date().toString().split(" ")[5].replace(/(.{2})$/, ':$1');
    // this.doSearch();
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      if (this.fullscreen) {
        this.showTable = false;
        setTimeout(() => {
          this.showTable = true;
          this.getNewSubscriberDisruptions();
        }, 100)

        return;
      } else this.getData();
      this.titleService.setTitle(`${this.language['Network Trends']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Network Trends']} - ${this.language['Home']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    let scopes = this.ssoService.getScopes();
    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.networktrends') !== -1) {
            this.hasScopeAccess = true;
            break;
          }

        }
      }

      if (scopes['cloud.rbac.coc.insights.networktrends']) {
        this.feature = {
          activealarm: true,
          biperrors: true,
          activepons: true,
          alertTypes: true,
          subscriberimpacted: true //CCL-41073
        };
      }


      if (scopes['cloud.rbac.coc.insights.networktrends.activealarm']) {
        this.feature['activealarm'] = true;
        this.feature['alertTypes'] = true;
      }

      if (scopes['cloud.rbac.coc.insights.networktrends.biperrors']) {
        this.feature['biperrors'] = true;
      }

      if (scopes['cloud.rbac.coc.insights.networktrends.activepons']) {

        this.feature['activepons'] = true;
      }

      if (scopes['cloud.rbac.coc.insights.networktrends.subscriberimpacted']) {
        this.feature['subscriberimpacted'] = true;
      }

    } else {
      this.hasScopeAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.loading = false;
      return;
    } else {
      this.ssoService.setPageAccess(true);
    }
    this.getOutagesInfo();
    this.getActiveSystemsInfo();
    this.poncapcitycount()
    this.getNewConnectedeSystemsInfo();
    // this.getActiveAlertTypes();

    if (this.ssoService.isCcoTermsAccept()) {
      this.watchFilterDays();
      this.getData();
    } else {
      this.tosSub = this.ssoService.ccoTos$.subscribe((data) => {
        this.watchFilterDays();
        this.getData();
      });
    }

  }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  ngOnDestroy() {
    this.listObs?.unsubscribe();
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.filterDaysSubscription) {
      this.filterDaysSubscription.unsubscribe();
    }

    if (this.tosSub) {
      this.tosSub.unsubscribe();
    }
    if (this.dtSub) this.dtSub.unsubscribe();
    if (this.dtSub1) this.dtSub1.unsubscribe()
  }

  loadChart() {

  }
  getData() {
    this.clearErrors();
    //this.getList();
    let params = {
      startEpochTime: this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1),
      endEpochTime: this.dateUtils.getStartUtcTimeByDays(0),
      interval: 'Days'
    }


    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    const requests: any = {};

    let types = [];

    if (this.feature['activepons']) {
      types = ['loss-of-pon'];
    }

    let subscribertypes = [];

    if (this.feature['subscriberimpacted']) {
      subscribertypes = [
        { name: 'subscriber', value: 'loss-of-pon' },
      ];
    }

    if (types.length) {
      types.forEach(type => {
        if (type === 'ont-us-sdber') {
          let types = 'ont-ds-sdber OR ont-us-sdber'
          const req = this.http.get(`${this.baseUrl}alarmByName?${query}&alarmEventName=${types}`).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            }),
          );
          requests[type] = req;
        } else {
          const req = this.http.get(`${this.baseUrl}alarmByName?${query}&alarmEventName=${type}`).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            }),
          );
          requests[type] = req;
        }
      });
    }

    if (this.feature['activealarm']) {
      requests['active-alarms'] = this.getActiveAlarmReq();
    }

    if (this.feature['biperrors']) {
      requests['BipError'] = this.getBipError();
    }

    if (this.feature['alertTypes']) {
      requests['alertTypes'] = this.getActiveAlertTypes();
    }

    if (subscribertypes.length) {
      subscribertypes.forEach(type => {
        if (type['value'] === 'ont-us-sdber') {
          let types = 'ont-ds-sdber OR ont-us-sdber'
          const req = this.http.get(`${this.baseUrl}subscriberCount?startEpochTime=${params['startEpochTime']}&endEpochTime=${params['endEpochTime']}`).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            }),
          );

          requests[type.name] = req;
        } else {
          const req = this.http.get(`${this.baseUrl}subscriberCount?startEpochTime=${params['startEpochTime']}&endEpochTime=${params['endEpochTime']}`).pipe(
            catchError(err => {
              err['api-error'] = true;
              return of(err);
            }),
          );
          requests[type.name] = req;
        }


      });
    }

    if (Object.keys(requests).length) {
      this.loading = true;
    }

    this.listObs?.unsubscribe();

    this.listObs = forkJoin(requests).subscribe((json: any) => {
      this.loading = false;
      if (json && json['active-alarms'] && !json['active-alarms']['api-error']) {
        let severityChartData: any = json['active-alarms']['alarm'] ? json['active-alarms']['alarm'] : json['active-alarms'];
        let severityChartOptions: any = this.alarmchartOptionService.severityChartOptions(severityChartData.raised, "Alarms Raised", "active", params);
        severityChartOptions.plotOptions.series.point.events = {
          click: (event: any) => {
            event.preventDefault();
            let severityName = (event.point.severity).toLowerCase();

            this.router.navigate(['/cco/alerts/system/active-reports'], { queryParams: { severity: severityName, days: this.filterDays } });

            // this.router.navigate(['/cco/issues/active-reports'], { queryParams: { severity: name.toLowerCase(), days: this.filterDays } });

          },

        };
        this.Highcharts.chart('severityContainer', severityChartOptions);
      } else {
        if (json['active-alarms'] && json['active-alarms']['api-error']) {
          this.errors['severity'] = this.commonOrgService.pageErrorHandle(json['active-alarms']);
        } else {
          if (typeof json['active-alarms'] !== "undefined") {
            let severityChartOptions = this.alarmchartOptionService.severityChartOptions([], "Alarms Raised", "active", params);
            this.Highcharts.chart('severityContainer', severityChartOptions);
          }
        }

      }

      if (json && json['BipError'] && !json['BipError']['api-error']) {
        let biperrordata = this.singlecountsort(json['BipError'], "count");
        let biperroroption = this.alarmchartOptionService.BIPErrorRateChart(biperrordata);
        biperroroption.plotOptions.series.point.events = {
          mouseOver: function () {
            json['BipError'].forEach((element: any) => {
              let Deleted: boolean = false;
              if (element["region"] == this.category) {
                Deleted = element?.deleted
                if (!Deleted) {
                  this.graphic.attr({
                    cursor: 'pointer'
                  });
                }
              }
            })
          },
          click: (event: any) => {
            // if (event.point.options.y == 0)
            //   return
            let category;
            let isDeleted: boolean = false;
            json['BipError'].forEach((element: any) => {
              if (element["region"] == event.point.category) {
                category = element["regionId"];
                isDeleted = element?.deleted
                if (isDeleted) {
                  return
                }
              }
            })
            if (!isDeleted) {
              this.router.navigate([`cco/health/pon-utilization/overview/basic`], { state: { categoryname: event.point.category, categoryid: category, days: this.filterDays } })
            }

          }
        }

        this.Highcharts.chart('BipContainer', biperroroption);
      } else {
        if (json['BipError'] && json['BipError']['api-error']) {
          this.errors['biperror'] = this.commonOrgService.pageErrorHandle(json['BipError']);
        } else {
          if (typeof json['BipError'] !== "undefined") {
            let biperroroption = this.alarmchartOptionService.BIPErrorRateChart([]);
            this.Highcharts.chart('BipContainer', biperroroption);
          }
        }

      }
      this.alertsTypeData = [];
      if (json && json['alertTypes'] && !json['alertTypes']['api-error']) {
        this.alertsTypeData = json['alertTypes'];
        this.rerender();
      }else{
        if (json['alertTypes'] && json['alertTypes']['api-error']) {
          this.errors['alertTypes'] = this.commonOrgService.pageErrorHandle(json['alertTypes']);
        }
        this.rerender();
      }

      let data = {
        'loss-of-pon': [], 'ont-us-sdber': [], 'subscriber': [], 'serviceDegrade': []
      };

      //console.log(this.dateUtils.getStartUtcHoursTimeArrByDays(this.filterDays - 1))
      types.every(type => {
        if (json && ((json[type] && json[type]['api-error']) || !json[type])) {
          if (json[type] && json[type]['api-error']) {
            this.errors[type] = this.commonOrgService.pageErrorHandle(json[type]);
          }
          return;
        }

        json[type]?.forEach((ele: any) => {
          data[type].push(
            {
              epochtime: ele?.epochtime,
              count: ele?.count
            }
          );
        });

      });

      subscribertypes.every(type => {
        if (json && ((json[type.name] && json[type.name]['api-error']) || !json[type.name])) {
          if (json[type.name] && json[type.name]['api-error']) {
            this.errors[type.name] = this.commonOrgService.pageErrorHandle(json[type.name]);
          }
          return;
        }

        let name, fieldname;
        if (type.name == 'serviceDegrade') {
          name = "serviceDegrade";
          fieldname = 'subscriberCount'
        }
        else {
          name = type.name;
          fieldname = "impactedSubscriberCnt"
        }

        json[name]?.forEach((ele: any) => {
          data[type.name].push(
            {
              epochtime: ele?.epochTime,
              count: ele?.impactedSubscriberCnt
            }
          );
        });


      });
      this.data = data;


      this.loading = false;

    }, err => {
      this.pageErrorHandle(err);
      this.loading = false;
    });

  }
  pageErrorHandle(err: HttpErrorResponse, key?: any) {
    if (err.status == 401) {
      this.errors[key] = this.language['Access Denied'];
    } else {
      this.errors[key] = this.commonOrgService.pageErrorHandle(err);
    }
    this.loading = false;
  }
  // pageErrorHandle(err: any) {
  //   // console.log('Method not implemented.');
  // }

  findObject(jsObjects, value: any) {
    let rtrn: any = {};

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['epochtime'] == value) {
          rtrn = jsObjects[i];
          break;
        }
      }
    }

    return {
      hasTimestamp: (rtrn && Object.keys(rtrn).length) ? true : false,
      count: (rtrn && rtrn.count) ? rtrn.count : 0
    };

  }

  findObjectBySubscriber(jsObjects, value: any, field) {
    let rtrn: any = {};

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (jsObjects[i]['epochTime'] == value) {
          rtrn = jsObjects[i];
          break;
        }
      }
    }

    return {
      hasTimestamp: (rtrn && Object.keys(rtrn).length) ? true : false,
      count: (rtrn && rtrn[field]) ? rtrn[field] : 0
    };

  }

  filterDaysSubscription: any;
  watchFilterDays() {
    this.filterDaysSubscription = this.chartOptnService.filterDays$.subscribe((value: any) => {
      this.filterDays = value;

      this.getData();

    })
  }

  getActiveAlarmReq() {
    let params = {
      date: `${this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1)},${this.dateUtils.getStartUtcTimeByDays(0)}`,
      notificationType: "Alarm",
      historyReport: false,
      cco_ack: 'all',
      alertType : 'SYSTEM'
    }


    let query = "";
    for (var key in params) {

      if (params[key] == undefined || params[key] == "") {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    query += '&historyReport=false&cco_shelv=false';

    return this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmbySeverity?${query}`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      })
    );

  }

  getBipError() {
    let days = this.filterDays - 1
    let date = new Date();
    let FromDate = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    let ToDate = new Date();
    let params1 = {
      startTime: `${this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1) / 1000}`,
      endTime: `${Math.ceil(this.dateUtils.getStartUtcTimeByDays(0) / 1000)}`,
      // startTime: `${this.startISODate(FromDate, false)}`,
      // endTime: `${this.startISODate(ToDate, true)}`,
      tenant: "0",
      granularity: "15min",
      countBy: "interface",
      groupBy: "region"
    }

    let query = "";
    for (var key in params1) {

      if (params1[key] == undefined || params1[key] == "") {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params1[key]);

    }

    return this.http.get(`${environment.API_BASE_URL}health/reports/biperror/count?${query}`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      }),
    );

  }
  startISODate(startDate: any, enddata: boolean) {

    if (startDate == undefined)
      return undefined;
    let date = new Date(startDate);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let stdate;
    if (enddata)
      stdate = `${year}-${month}-${day}T23:59:00Z`;
    else
      stdate = `${year}-${month}-${day}T00:00:00Z`;
    return stdate;
  }

  gotoIssues() {
    this.router.navigate(['/cco/alerts/system/active-reports'], { state: { last24hours: true } });
  }

  gotoHealthPON() {
    this.router.navigate(['/cco/health/pon-utilization/overview/basic'], { state: { last24hours: true } });
  }

  gotoSystem(type) {
    if (type == 'cmsExa') {
      this.router.navigate(['/cco/operations/system-onboarding/cms-exa/list'], { state: { state: 'SYNCHRONIZED' } });
    } else {
      this.router.navigate(['/cco/operations/system-onboarding/axos-callhome/axos/list'], { state: { state: 'SYNCHRONIZED' } });
    }

  }

  outageInfo: any = {
    count: 0,
    percent: 0
  }
  getOutagesInfo() {
    let params = {
      startEpochTime: (this.dateUtils.getStartUtcTimeByDays(0) - 86400000),
      endEpochTime: this.dateUtils.getStartUtcTimeByDays(0),
      // interval: 'Hours'
    }


    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }

    this.http.get(`${environment.API_BASE_URL}analytics-engine/networkTrendOutages?${query}&alarmEventName=loss-of-pon`).subscribe((json: any) => {
      this.outageInfo['count'] = json.ponCount ? json.ponCount.toLocaleString() : 0;
      this.outageInfo['percent'] = json.outageRate ? json.outageRate : 0;

      if (isNaN(this.outageInfo['percent'])) {
        this.outageInfo['percent'] = 0;
      }
      if (!Number.isInteger(this.outageInfo['percent']) || this.outageInfo['percent'] == 'Infinity') {
        this.outageInfo['percent'] = this.outageInfo['percent'].toFixed(2)
      }
      //   this.outageInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

      // if (json && json.length) {
      //   let count = 0;
      //   json.forEach(element => {
      //     count += element.count;
      //   });

      //   this.outageInfo['count'] = count;
      //   this.outageInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

      //   if (isNaN(this.outageInfo['percent'])) {
      //     this.outageInfo['percent'] = 0;
      //   }
      //   if (!Number.isInteger(this.outageInfo['percent'])) {
      //     this.outageInfo['percent'] = this.outageInfo['percent'].toFixed(2)
      //   }
      //   console.log(this.outageInfo)
      // }
    })
  }

  activeSystemsInfo = {
    axos: {
      count: 0,
      percent: 0
    },
    cmsExa: {
      count: 0,
      percent: 0
    }

  }
  getActiveSystemsInfo() {
    let apis = {
      axos: this.http.get(`${environment.API_BASE_URL}nfa/systems/count?configState=UNSYNCHRONIZED&axos=true`).pipe(catchError((error) => of(error))),
      cmsExa: this.http.get(`${environment.API_BASE_URL}nfa/systems/count?configState=UNSYNCHRONIZED&axos=false`).pipe(catchError((error) => of(error)))
    }
    forkJoin(apis).subscribe((json: any) => {
      if (json && json.axos && json.axos.count) {
        this.activeSystemsInfo['axos']['count'] = json.axos.count?.toLocaleString();

        //this.activeSystemsInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

        if (isNaN(this.activeSystemsInfo['axos']['percent'])) {
          this.activeSystemsInfo['axos']['percent'] = 0;
        }
      }
      if (json && json.cmsExa && json.cmsExa.count) {
        this.activeSystemsInfo['cmsExa']['count'] = json.cmsExa.count?.toLocaleString();

        //this.activeSystemsInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

        if (isNaN(this.activeSystemsInfo['cmsExa']['percent'])) {
          this.activeSystemsInfo['cmsExa']['percent'] = 0;
        }
      }
    });
    // this.http.get(`${environment.API_BASE_URL}nfa/systems/count?configState=UNSYNCHRONIZED`).subscribe((json: any) => {
    //   if (json && json.count) {


    //     this.activeSystemsInfo['count'] = json?.count?.toLocaleString();

    //     //this.activeSystemsInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

    //     if (isNaN(this.activeSystemsInfo['percent'])) {
    //       this.activeSystemsInfo['percent'] = 0;
    //     }
    //   }
    // })
  }

  newConnectedSystemsInfo = {
    count: 0
  }
  getNewConnectedeSystemsInfo() {
    this.newConnectedSystemsInfo['count'] = 0;
    this.http.get(`${environment.API_BASE_URL}nfa/systems/count`).subscribe((json: any) => {

      if (json && json.count) {
        this.newConnectedSystemsInfo['count'] = json?.count?.toLocaleString();

      }
    })
  }

  poncapcitycount() {
    //let date = new Date();
    //this.FromDate = new Date(date.getTime() - (0 * 24 * 60 * 60 * 1000));
    //let pFromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000)); 172,800,000
    let pFromDate = Math.ceil(((this.dateUtils.getStartUtcTimeByDaysseconds(0) - 172800000) / 1000));
    this.FromDate = Math.ceil(((this.dateUtils.getStartUtcTimeByDaysseconds(0) - 86400000) / 1000));
    let enddate = Math.ceil(this.dateUtils.getStartUtcTimeByDaysseconds(0) / 1000);
    let currentquery = `tenant=0&granularity=15min&startTime=${this.FromDate}&endTime=${enddate}`;
    let previousquery = `tenant=0&granularity=15min&startTime=${pFromDate}&endTime=${this.FromDate}`;
    forkJoin([
      this.ponutilizationchart = this.ccochatservice.Getutilizationthresholdexceededcount(currentquery, 'pon'),
      this.ponutilizationchart = this.ccochatservice.Getutilizationthresholdexceededcount(previousquery, 'pon')
    ]).subscribe((res: any) => {
      if (res[0]) {
        let data = []
        data = Object.values(res[0]);
        data.forEach(element => {
          if (element.dsUtilExcCnt && element.dsUtilExcCnt != 'undefined')
            this.PONCAPACITY = this.PONCAPACITY + element.dsUtilExcCnt;
          if (element.usUtilExcCnt && element.usUtilExcCnt != 'undefined')
            this.PONCAPACITY = this.PONCAPACITY + element.usUtilExcCnt;
        });
      }
      if (res[1]) {
        let data = []
        data = Object.values(res[1]);
        data.forEach(element => {
          if (element.dsUtilExcCnt && element.dsUtilExcCnt != 'undefined')
            this.pPONCAPACITY = this.pPONCAPACITY + element.dsUtilExcCnt;
          if (element.usUtilExcCnt && element.usUtilExcCnt != 'undefined')
            this.pPONCAPACITY = this.pPONCAPACITY + element.usUtilExcCnt;
        });
      }

      if (this.PONCAPACITY || this.pPONCAPACITY) {
        if (!this.pPONCAPACITY)
          this.PONCAPACITYpercent = ((this.PONCAPACITY - this.pPONCAPACITY) / 1) * 100;
        else
          this.PONCAPACITYpercent = ((this.PONCAPACITY - this.pPONCAPACITY) / this.pPONCAPACITY) * 100;

        if (!Number.isInteger(this.PONCAPACITYpercent))
          this.PONCAPACITYpercent = this.PONCAPACITYpercent.toFixed(2);

        this.PONCAPACITY = this.PONCAPACITY?.toLocaleString();
      }

    })
  }

  lossOfPonfullScreenMin() {
    this.fullscreen = false;
    this.showLossofPons = false;
    this.LosPonsubImpWrapper = true;
    this.AlamBipWrapper = true;

  }

  subImpfullScreenMin() {
    this.fullscreen = false;
    this.showsubImpacted = false;
    this.LosPonsubImpWrapper = true;
    this.AlamBipWrapper = true;
    this.feature.biperrors = true;
  }


  chartType = '';
  fullScreenExpand(chartName) {
    this.chsttype = 'fullscreen'
    this.chartType = chartName;
    this.fullscreen = true;
    this.chartData = this.data

    //this.loading = true;
    if(chartName == 'new-subscriber-disruptions'){
      this.loading = false;
      this.showTable = false;
    }else{
      this.showTable = true;
    }
    

    if (chartName == 'loss-of-pon') {
      this.showLossofPons = true;

      this.showsubImpacted = false;
      this.LosPonsubImpWrapper = false;
      this.AlamBipWrapper = false;

      if (this.initLoad) {
        this.redraw();

      } else {
        this.getList(chartName);
      }

    } else {
      this.showLossofPons = false;
      this.showsubImpacted = true
      this.LosPonsubImpWrapper = false;
      this.AlamBipWrapper = false;
      this.feature['biperrors'] = false;
      
      if (this.initLoad) {
        this.redraw();


      } 
      // else {
      //   this.getNewSubscriberDisruptions(chartName);
      // }
    }
  }

  getList(chartName?) {
    this.loading = true;
    let params = {
      date: `${this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1)},${this.dateUtils.getStartUtcTimeByDays(0)}`,
      historyReport: false,
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);

    }
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: false,
      searching: true,
      lengthChange: false,
      ordering: false,

      "autoWidth": false,

      //scrollX: true,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        // debugger;
        let url = `${environment.API_BASE_URL}analytics-engine/notifications?${query}&alarmEventName=${this.chartType},${this.ontusparam},${this.ontdsparam}&from=${dataTablesParameters.start}&size=${dataTablesParameters.length}`;

        if (that.searchTerm) {
          //url += `&alarmEventName=${that.searchTerm}`;

          url += `&searchField=alarmEventName&searchValue=${that.searchTerm}`;
        }

        if (dataTablesParameters.search.value) {
          url = `${environment.API_BASE_URL}analytics-engine/notifications?${query}&alarmEventName=${dataTablesParameters.search.value}&from=${dataTablesParameters.start}&size=${dataTablesParameters.length}`;
        }

        that.http
          .get(url)
          .subscribe((resp: any) => {
            // debugger;

            let data = [];
            if (resp && resp['alarms']) {
              resp['alarms'].forEach(element => {
                if (element && element['subject']) {
                  if (element['subject']['deviceName']) {
                    element['subject']['deviceName'] = element['subject']['deviceName'].replace('device=', '');
                    element['subject']['deviceName'] = element['subject']['deviceName'].replace('DEVICE=', '');

                  }

                }

                data.push(element);
              });

              this.list = resp['alarms'];
            } else {
              resp = {};
            }

            this.initLoad = true;

            this.loading = false;
            callback({
              recordsTotal: resp['totalCount'] ? resp['totalCount'] : 0,
              recordsFiltered: (dataTablesParameters.search.value && resp) ? resp.length : (resp['totalCount'] ? resp['totalCount'] : 0),
              data: []
            });
          }, (err: any) => {
            this.loading = false;
          });
      }, drawCallback: (settings) => {
        //this.changeTableStatusLanguage(settings);
        this.tableLanguageOptions();
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };

    this.tableLanguageOptions();


  }
  changeTableStatusLanguage(dtObj) {
    const nf = new Intl.NumberFormat();
    this.tableCounts = {
      searchText: dtObj.oPreviousSearch.sSearch.trim(),
      total: dtObj._iRecordsTotal,
      displayCount: dtObj._iDisplayLength,
      displayed: dtObj._iRecordsDisplay,
      start: dtObj._iDisplayStart
    };
    const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
      filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
        (isFrench ?
          `(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
          `(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
        ''}`;
    const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
    const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
    $('div [role="status"]').text(isFrench ?
      `Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
      `Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
    )
    $(".first").text(isFrench ? 'Le début' : 'First');
    $(".previous").text(isFrench ? 'Précédent' : 'Previous');
    $(".next").text(isFrench ? 'Suivant' : 'Next');
    $(".last").text(isFrench ? 'Dernière' : 'Last');
  }

  redraw() {
    // this.loading = true;
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.draw();
        });
    });
  }

  fullData: any = {};
  viewDetails(item: any) {
    let data = [];
    if (item && item['subject'] && typeof item['subject']['additionalAttributes'] === "object") {
      let keys = Object.keys(item['subject']['additionalAttributes']);

      keys.forEach(element => {
        data.push({
          key: element,
          value: item['subject']['additionalAttributes'][element].value
        })
      });


    }

    item['subject']['customAdditionalAttributes'] = data;
    this.fullData = item;

  }

  close(): void {
    this.modalRef.close();
  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');

  }

  singlecountsort(data, key1) {

    let a = [];
    let b = [];
    let name = 'region';
    data?.sort((a, b) => (a[name] || "").toString().localeCompare((b[name] || "").toString(), 'en', { numeric: false }))
    data?.forEach(obj => {
      if (obj[key1] || obj[key1] == 0) {
        a.push(obj);
      }
      else
        b.push(obj);
    });
    a.sort(function (a, b) {
      return ((b[key1] ? b[key1] : 0) - (a[key1] ? a[key1] : 0))
    });
    // a.reverse();
    data = [...a, ...b];
    return data;

  }
  getActiveAlertTypes() {
    let params = {
      startEpochTime: this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1),
      endEpochTime: this.dateUtils.getStartUtcTimeByDays(0),
      interval: 'Days'
    }

    return this.http.get(`${this.baseUrl}activeAlertTypeCount?startEpochTime=${params['startEpochTime']}&endEpochTime=${params['endEpochTime']}`).pipe(
      catchError(err => {
        err['api-error'] = true;
        return of(err);
      }),
    );

  }
  redirectToAlerts(alerts){
    // let filters = {};
    // if(this.filterDays == 7){
    //   filters['last7Days'] = true;
    // }else if(this.filterDays == 30){
    //   filters['last30Days'] = true;
    // }
    // let filters ={
    //   date : [
    //     new Date(this.dateUtils.getStartUtcTimeByDays(this.filterDays - 1)),
    //     new Date(this.dateUtils.getStartUtcTimeByDays(0))
    //   ]
    // } 
    // this.issueService.setAppliedFilters(filters);

    let url = `/cco/alerts/${this.alertTypes[alerts['alertTypeName']]}/active-reports`;
    // if(this.alertTypes[alerts['alertTypeName']] == 'disruption'){
    //   url += '/list';
    // }
    this.router.navigate([url],{ queryParams: { days: this.filterDays } });
    // { queryParams: { days: this.filterDays } }
    

  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }
  getNewSubscriberDisruptions() {
    this.loading = true;
    
    const that = this;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: false,
      searching: true,
      lengthChange: false,
      ordering: false,

      "autoWidth": false,

      //scrollX: true,
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        let fields = {
          date : [new Date(this.subscriberImpactedClickedDate), new Date(this.subscriberImpactedClickedDate)]
        }
        let diffDays = this.issueService.getDateParam(fields, false);
        this.serviceDisruptedSelectedDate = diffDays?.split(',')
        // let hourArr = this.dateUtils.getUtcHoursTimeArrByDate(new Date(this.subscriberImpactedClickedDate), new Date(this.subscriberImpactedClickedDate));
        let params = {};
        if (dataTablesParameters.start == 0) {
          params['pageNumber'] = 0 + 1; // 1 is added because backend doesn't support 0 
        } else {
          params['pageNumber'] = (dataTablesParameters.start / dataTablesParameters.length) + 1; // 1 is added because backend doesn't support 0 ;
        }
        
        if(this.serviceDisruptedSelectedDate && this.serviceDisruptedSelectedDate.length > 0){
          params['startEpochTime'] = this.serviceDisruptedSelectedDate[0];
          params['endEpochTime'] = this.serviceDisruptedSelectedDate[1];
        }

        let query = "";
        for (var key in params) {

          if (params[key] == undefined) {
            continue;
          }

          if (query != "") {
            query += "&";
          }

          query += key + "=" + encodeURIComponent(params[key]);

        }
        // debugger;
        let url = `${this.baseUrl}newSubscriberDisruptions?${query}`;

        if (that.searchTerm) {
          //url += `&alarmEventName=${that.searchTerm}`;

          url += `&searchField=alarmEventName&searchValue=${that.searchTerm}`;
        }

        if (dataTablesParameters.search.value) {
          url = `${this.baseUrl}newSubscriberDisruptions?${query}`;
        }

        that.http
          .get(url)
          .subscribe((resp: any) => {
            // debugger;

            // let data = [];
            if (resp && resp['records']) {
              // resp['records'].forEach(element => {
              //   if (element && element['subject']) {
              //     if (element['subject']['deviceName']) {
              //       element['subject']['deviceName'] = element['subject']['deviceName'].replace('device=', '');
              //       element['subject']['deviceName'] = element['subject']['deviceName'].replace('DEVICE=', '');

              //     }

              //   }

              //   data.push(element);
              // });

              this.subscriberDisrutionList = resp['records'];
            } else {
              resp = {};
              this.subscriberDisrutionList = []
            }

            this.initLoad = true;

            this.loading = false;
            callback({
              recordsTotal: resp['totalRecordCount'] ? resp['totalRecordCount'] : 0,
              recordsFiltered: (dataTablesParameters.search.value && resp) ? resp.length : (resp['totalRecordCount'] ? resp['totalRecordCount'] : 0),
              data: []
            });
          }, (err: any) => {
            this.loading = false;
          });
      }, drawCallback: (settings) => {
        //this.changeTableStatusLanguage(settings);
        this.loading = false;
        this.tableLanguageOptions();
        let total = settings._iRecordsDisplay; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      },
    };

    this.tableLanguageOptions();


  }
  // getNewSubscriberDisruption1s(){
  //   let url = `${this.baseUrl}newSubscriberDisruptions`;
  //   this.http.get(url).subscribe((data: any) => {
  //     console.log(data, 'newSubscriberDisruptions');
  //   },
  //   (error) => {
  //   })
  // }
  showSubscriberImpactedDt(data){
    this.data['selectedBar'] = data?.selectedBar;
    this.subscriberImpactedClickedDate = data?.date;
    this.showTable = true;
    if (this.initLoad) {
      this.redraw();
    } 
    else {
      this.getNewSubscriberDisruptions();
    }
  }
  rerender(search?): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
    });
    setTimeout(() => {
      this.dtSub=this.dtTrigger.next();
    });
  }
  fullScreenExpandOnBarClick(data){
    this.fullScreenExpand('new-subscriber-disruptions');
    this.showSubscriberImpactedDt(data);
  }
  clearErrors() {
    this.errors = {
      'severity': '',
      'loss-of-pon': '',
      'subscriber': '',
      'biperror': '',
      'alertTypes' : ''
    };
  }
  doExport() {
    this.disableExprtBtn = true;
    const offset = (new Date()).toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    let params = {
      startEpochTime: this.serviceDisruptedSelectedDate[0],
      endEpochTime: this.serviceDisruptedSelectedDate[1]
    }
    let query = this.issueService.buildQuery(params);
    query += `&timeZone=${encodeURIComponent(offset)}`;
    this.http.get(`${environment.API_BASE_URL}analytics-engine/newSubscriberDisruptions/export?${query}`, { responseType: 'text', observe: 'response' as 'body' }).subscribe(
      (response: any) => {
        const filename: string = this.issueService.getFileName(response, 'subsciberDisruption');
        const blob = new Blob([response.body], { type: 'text/csv' })
        saveAs(blob, filename);
        this.disableExprtBtn = false;
      }, (err: any) => {
        this.disableExprtBtn = false;
        this.pageErrorHandle(err, 'export');
      }
    );
  }
  redirectToHistoryReport(data){
    let url = ``, filters = {};
    let fields = {
      date: [new Date(data['timeRaised']), new Date(data['timeRaised'])]
    }
    let diffDays = this.issueService.getDateParam(fields, false);
    let diffDates = diffDays?.split(',');
    let FromDate,ToDate;
    if (diffDates && diffDates.length > 0) {
      FromDate = new Date(Number(diffDates[0]));
      ToDate = new Date(Number(diffDates[1]));
    }
    filters = {
      date: [FromDate, ToDate],
      eventName: data['cause'] ? [data['cause']] : ['ont-missing'],
      fsan : data['fsan']
    }
    url = `cco/alerts/system/history-reports`;
    
    this.router.navigate([url], { state: { filters : filters } });
  }
}


