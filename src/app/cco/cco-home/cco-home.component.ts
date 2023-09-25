import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationHomeService } from 'src/app/cco-foundation/foundation-home/foundation-home.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { CcochartService } from '../health/pon-utilization/service/ccochart.service';
import { DataService } from './services/data.service';
import { HomeChartOptionsService } from './services/home-chart-options.service';
import { SystemServiceTrendsComponent } from './system-service-trends/system-service-trends.component';
//import { DataService } from './system-service-trends/system.service';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NetopsServiceService } from 'src/app/support/netops-management/netops-management.service';
@Component({
  selector: 'app-cco-home',
  templateUrl: './cco-home.component.html',
  styleUrls: ['./cco-home.component.scss']
})
export class CcoHomeComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  filterDays: any = "7";
  systemStatusSubs: any;
  active: any;
  preProvision: any;
  unAssociate: any;
  arrowProvisionEnable: boolean;
  preProvisionPer: string;
  arrowActiveEnable: boolean;
  activePer: string;
  arrowUnassoEnable: boolean;
  unAssociatePer: string;
  arrowPositivePro: boolean;
  arrowPositive: boolean;
  arrowPositiveUnasso: boolean;
  ORG_ID: any;
  getSystemSubs: any;

  menus = {
    network: false,
    system: false,
    geomap: false
  }
  FromDate: Date;
  ponutilizationchart: any;
  PONCAPACITY: any = 0;
  network_trends: boolean = false;
  system_trends: boolean = false;
  FormData: any;
  preprovision: any;
  unassociate: any;
  arrowprovisionEnable: boolean;
  preprovisionper: string;
  arrowactiveEnable: boolean;
  activeper: string;
  arrowunassoEnable: boolean;
  unassociateper: string;
  arrowPositivepro: boolean;
  arrowPositiveunasso: boolean;
  commandIQ: any;
  arrowcommandIqperEnable: boolean;
  commandIqper: string;
  arrowPositivecommand: boolean;
  edgeSuit: any;
  arrowedgeSuitperEnable: boolean;
  edgeSuitper: string;
  arrowPositiveedge: boolean;

  hasScopeAccess = false;
  pPONCAPACITY: any = 0;
  PONCAPACITYpercent: any = 0;
  hasPageAccess = true;
  pageAcceesObs: any;

  HideModel: boolean=false;
  dataAvailable: boolean;
  modalRef: any;
  tosSub: any;

  @ViewChild('GetStartedModal', { static: true }) private GetStartedModal: TemplateRef<any>;


  constructor(
    private http: HttpClient,
    private router: Router,
    private sso: SsoAuthService,
    private translateService: TranslateService,
    private chartOptionService: HomeChartOptionsService,
    private foundationHome: FoundationHomeService,
    private ccochatservice: CcochartService,
    private systemserive: DataService,
    private dateUtils: DateUtilsService,
    private modalService: NgbModal,
    private api: NetopsServiceService,
  ) {
    this.ORG_ID = this.sso.getOrgId();
    this.filterDays = this.chartOptionService?.filterDays ? this.chartOptionService?.filterDays : '7';
    // if (window.location.pathname == "/cco/home/network-trends") {
    //   this.system_trends = false;
    //   this.network_trends = true
    //   this.loadSystemStatusData();
    //   this.poncapcitycount();
    // }

    // if (window.location.pathname == "/cco/home/system-service-trends") {
    //   this.system_trends = true;
    //   this.network_trends = false
    // }
    // this.systemserive.CommandIQdata.subscribe((data: any) => {
    //   console.log("commandio", data);
    //   this.on_CommandIQdata(data)
    // });

    // this.systemserive.edgesuitData.subscribe((data: any) => {
    //   this.on_edgesuitData(data)
    // });

    // this.systemserive.systemvalue.subscribe((data: any) => {
    //   this.OnFormData(data)
    // });

    // this.getOutagesInfo();
    // this.getActiveSystemsInfo();
  }

  ngOnInit(): void {
    this.HideModel=window.localStorage.getItem("HideModel") ? true:false
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any)=>{
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });

    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.insights.networktrends') !== -1) {
            this.menus['network'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.insights.subscribersystems') !== -1) {
            this.menus['system'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.insights.activdevicesgeomap') !== -1) {
            this.menus['geomap'] = true;
            continue;
          }

        }

        if (this.menus['network'] || this.menus['system'] || this.menus['geomap']) {
          this.hasScopeAccess = true;
        }

      }

    } else {
      this.menus = {
        network: true,
        system: true,
        geomap: true,
      }

      this.hasScopeAccess = true;

    }






    this.setFilterDays();

    // hiding default onboarding popup now for CCL-59517. in case feature we need we can use this
    // if (this.sso.isCcoTermsAccept()) {
    //   this.getHSI();
    // } else {
    //   this.tosSub = this.sso.ccoTos$.subscribe((data) => {
    //     this.getHSI();
    //   });
    // }

    

    this.systemStatusSubs = this.chartOptionService.systemStatusData$.subscribe(data => {
      if (data) {
        this.systemStatusKPI(data);
      }
    });


  }

  poncapcitycount() {
    let date = new Date();
    this.FromDate = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    let pFromDate = new Date(date.getTime() - (2 * 24 * 60 * 60 * 1000));
    let currentquery = `tenant=0&granularity=15min&groupBy=region&startTime=${this.startISODate(this.FromDate, false)}&endTime=${this.startISODate(date, true)}`;
    let previousquery = `tenant=0&granularity=15min&groupBy=region&startTime=${this.startISODate(pFromDate, false)}&endTime=${this.startISODate(this.FromDate, true)}`;
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
      if (this.PONCAPACITY && this.pPONCAPACITY) {
        this.PONCAPACITYpercent = ((this.PONCAPACITY - this.pPONCAPACITY) / this.pPONCAPACITY) * 100
        if (!Number.isInteger(this.PONCAPACITYpercent))
          this.PONCAPACITYpercent = this.PONCAPACITYpercent.toFixed(2);

      }

    })
  }

  ngOnDestroy() {
    this.chartOptionService.setFilterDays("7");
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.systemStatusSubs) this.systemStatusSubs.unsubscribe();
    if (this.getSystemSubs) this.getSystemSubs.unsubscribe();
  }

  setFilterDays() {
    this.chartOptionService.setFilterDays(this.filterDays);
  }

  systemStatusKPI(data?) {
    this.active = (data?.active).toLocaleString();
    this.preProvision = (data?.preprovision).toLocaleString();
    this.unAssociate = (data?.unassociate).toLocaleString();
    if (data?.preprovisionper == '0') {
      this.arrowProvisionEnable = false;
      this.preProvisionPer = '0%';
    } else {
      this.arrowProvisionEnable = true;
    }
    if (data?.activeper == '0') {
      this.arrowActiveEnable = false;
      this.activePer = '0%';
    } else {
      this.arrowActiveEnable = true;
    }
    if (data?.unassociateper == '0') {
      this.arrowUnassoEnable = false;
      this.unAssociatePer = '0%';
    } else {
      this.arrowUnassoEnable = true;
    }
    if (data?.positiveOrNegative == "+" && data?.preprovisionper != '0') {
      this.preProvisionPer = data?.preprovisionper + '%';
      this.arrowPositivePro = true;
    } else {
      this.preProvisionPer = data?.preprovisionper + '%';
      this.arrowPositivePro = false;
    }
    if (data?.positiveOrNegativeactive == "+" && data?.activeper != '0') {
      this.activePer = data?.activeper ? (data?.activeper + '%') : "0%";
      this.arrowPositive = true;
    } else {
      this.activePer = data?.activeper ? (data?.activeper + '%') : "0%"
      this.arrowPositive = false;
    }
    if (data?.positiveOrNegativeunassociate == "+" && data?.unassociateper != '0') {
      this.unAssociatePer = data?.unassociateper ? (data?.unassociateper + '%') : "0%";
      this.arrowPositiveUnasso = true;
    } else {
      this.unAssociatePer = data?.unassociateper ? (data?.unassociateper + '%') : "0%"
      this.arrowPositiveUnasso = false;
    }

  }

  loadSystemStatusData() {
    this.getSystemSubs = this.foundationHome.getSystemstatusChartData(this.ORG_ID, 1).subscribe((res: any) => {
      let chartData = res;
      this.chartDataModify(chartData);
    }, (err: HttpErrorResponse) => {
      //this.loading = false;
    });
  }

  chartDataModify(cData) {
    let active = [], preprovision = [], offline = [], series = [], categories = [], unassociate = [];
    let data = {};
    cData = this.chartOptionService.sortByTimestamp(cData, 'time');
    cData.forEach(el => {
      categories.push(el.time)
      el['active'] = el.active ? el.active : 0;
      el['preprovision'] = el.preprovision ? el.preprovision : 0;
      el['offline'] = el.offline ? el.offline : 0;
      el['unassociate'] = el.unassociate ? el.unassociate : 0;
      active.push(parseInt(el.active));
      preprovision.push(parseInt(el.preprovision));
      offline.push(el.offline);
      unassociate.push(el.unassociate);
    });
    let catelength = categories.length - 1;
    let catelenth = categories.length - 2;
    let preproval = preprovision[catelength];
    let preprobefore = preprovision[catelenth]
    let activeval = active[catelength];
    let activebefore = active[catelenth];
    let unasso = unassociate[catelength];
    let unassobefore = unassociate[catelenth]
    let preprovper: any = '', activeper: any = '', unassoper: any = '';
    if (preprobefore === 0 && preproval != 0) {
      preprovper = '100';
    } else {
      preprovper = (this.chartOptionService.setpercentage(preproval, preprobefore, 2) == '0.00' ? '0' : this.chartOptionService.setpercentage(preproval, preprobefore, 0));
    }
    if (activebefore == 0 && activeval != 0) {
      activeper = '100';
    } else {
      activeper = (this.chartOptionService.setpercentage(activeval, activebefore, 2) == '0.00' ? '0' : this.chartOptionService.setpercentage(activeval, activebefore, 0));
    }
    if (unassobefore == 0 && unasso != 0) {
      unassoper = '100';
    } else {
      unassoper = (this.chartOptionService.setpercentage(unasso, unassobefore, 2) == '0.00' ? '0' : this.chartOptionService.setpercentage(unasso, unassobefore, 0));
    }
    let systemstatus = {
      preprovision: (preproval == undefined ? 0 : preproval),
      active: (activeval == undefined ? 0 : activeval),
      unassociate: (unasso == undefined ? 0 : unasso),
      preprovisionper: Math.abs(preprovper == 'NaN' ? 0 : preprovper),
      activeper: Math.abs(activeper == 'NaN' ? 0 : activeper),
      unassociateper: Math.abs(unassoper == 'NaN' ? 0 : unassoper),
      positiveOrNegative: this.chartOptionService.checkPositvNegativ(preprovper),
      positiveOrNegativeactive: this.chartOptionService.checkPositvNegativ(activeper),
      positiveOrNegativeunassociate: this.chartOptionService.checkPositvNegativ(unassoper),
    }
    setTimeout(() => {
      this.OnFormData(systemstatus)
      this.chartOptionService.setSystemStatusData(systemstatus);
    }, 50);
  }

  OnFormData(value?) {
    //debugger;
    this.FormData = value;
    this.active = (this.FormData.active).toLocaleString();
    this.preprovision = (this.FormData.preprovision).toLocaleString();
    this.unassociate = (this.FormData.unassociate).toLocaleString();
    if (this.FormData.preprovisionper == '0') {
      this.arrowprovisionEnable = true;
      this.preprovisionper = '0%'
    } else {
      this.arrowprovisionEnable = false;
    }
    if (this.FormData.activeper == '0') {
      this.arrowactiveEnable = true;
      this.activeper = '0%';
    } else {
      this.arrowactiveEnable = false;
    }
    if (this.FormData.unassociateper == '0') {
      this.arrowunassoEnable = true;
      this.unassociateper = '0%';
    } else {
      this.arrowunassoEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.preprovisionper = this.FormData.preprovisionper + '%';
      this.arrowPositivepro = true;
    }
    else {
      this.preprovisionper = this.FormData.preprovisionper + '%';
      this.arrowPositivepro = false;
    }
    if (value.positiveOrNegativeactive == "+") {
      this.activeper = this.FormData.activeper ? (this.FormData.activeper + '%') : "0%";
      this.arrowPositive = true;
    }
    else {
      this.activeper = this.FormData.activeper ? (this.FormData.activeper + '%') : "0%"
      this.arrowPositive = false;
    }
    if (value.positiveOrNegativeunassociate == "+") {
      this.unassociateper = this.FormData.unassociateper ? (this.FormData.unassociateper + '%') : "0%";
      this.arrowPositiveunasso = true;
    }
    else {
      this.unassociateper = this.FormData.unassociateper ? (this.FormData.unassociateper + '%') : "0%"
      this.arrowPositiveunasso = false;
    }
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
    // let d = new Date(stdate)
    // return d.getTime();
    return stdate;
  }


  on_CommandIQdata(value?) {
    this.commandIQ = (value?.commandIq) ? (value.commandIq).toLocaleString() : '0';
    if (value.commandIqper == '0') {
      this.arrowcommandIqperEnable = true;
      this.commandIqper = '0%'
    } else {
      this.arrowcommandIqperEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.commandIqper = value.commandIqper + '%';
      this.arrowPositivecommand = true;
    }
    else {
      this.commandIqper = value.commandIqper + '%';
      this.arrowPositivecommand = false;
    }

  }

  on_edgesuitData(value?) {
    this.edgeSuit = value.edgeSuit ? (value.edgeSuit).toLocaleString() : '0';
    if (value.edgeSuitper == '0') {
      this.arrowedgeSuitperEnable = true;
      this.edgeSuitper = '0%';
    } else {
      this.arrowedgeSuitperEnable = false;
    }
    if (value.positiveOrNegative == "+") {
      this.edgeSuitper = value.edgeSuitper + '%';
      this.arrowPositiveedge = true;
    }
    else {
      this.edgeSuitper = value.edgeSuitper + '%';
      this.arrowPositiveedge = false;
    }
  }

  gotoIssues() {
    this.router.navigate(['/cco/alerts/system/active-reports']);
  }

  gotoHealthPON() {
    this.router.navigate(['/cco/health/pon-utilization/overview/basic']);
  }

  gotoSystem() {
    this.router.navigate(['/cco/system/cco-network-system/system-table-view']);
  }

  outageInfo = {
    count: 0,
    percent: 0
  }
  getOutagesInfo() {
    let params = {
      startEpochTime: (this.dateUtils.getStartUtcTimeByDays(0) - 86400000),
      endEpochTime: this.dateUtils.getStartUtcTimeByDays(0),
      interval: 'Hours'
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

    this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmByName?${query}&alarmEventName=loss-of-pon`).subscribe((json: any) => {

      if (json && json.length) {
        let count = 0;
        json.forEach(element => {
          count += element.count;
        });

        this.outageInfo['count'] = count;

        this.outageInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

        if (isNaN(this.outageInfo['percent'])) {
          this.outageInfo['percent'] = 0;
        }

      }
    })
  }

  activeSystemsInfo = {
    count: 0,
    percent: 0
  }
  getActiveSystemsInfo() {
    this.http.get(`${environment.API_BASE_URL}nfa/systems/count`).subscribe((json: any) => {


      if (json && json.count) {


        this.activeSystemsInfo['count'] = json.count;

        //this.activeSystemsInfo['percent'] = ((count - json[0].count) / json[0].count) * 100;

        if (isNaN(this.activeSystemsInfo['percent'])) {
          this.activeSystemsInfo['percent'] = 0;
        }
      }
    })
  }

  // hiding default onboarding popup now for CCL-59517. in case feature we need we can use this
  /*getHSI() {
    this.dataAvailable = true;
    this.api.GetWorkflowGrid(this.ORG_ID).subscribe((wkflw: any[]) => {
      if (wkflw.length == 0) {
        this.foundationHome.getHSI(this.ORG_ID)
          .subscribe(res => {
            if (res) {
              this.dataAvailable = true;
            } else if(!this.HideModel) {
              this.modalRef = this.modalService.open(this.GetStartedModal, {
                size: 'lg',
                centered: true,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'custom-modal',
              });
            }
          }, (err: HttpErrorResponse) => {
            if (err.status == 404 && !this.HideModel) {
              this.modalRef = this.modalService.open(this.GetStartedModal, {
                size: 'lg',
                centered: true,
                backdrop: 'static',
                keyboard: false,
                windowClass: 'custom-modal',
              });
            } else {
              this.dataAvailable = true;
            }
          });
      }
    })
  }

  goToInitialOnboarding() {
    this.modalService.dismissAll("closed");
    this.router.navigate(['/cco/operations/cco-subscriber-operations/operations/workflows']);
    // for clearing memory occupation don't need to put it on ngdestroy..
    if (this.modalRef) this.modalRef.unsubscribe();
    if (this.tosSub) this.tosSub.unsubscribe();
  }

  closeAllModal() {
    this.HideModel=true
    window.localStorage.setItem('HideModel', 'true');
    this.modalService.dismissAll();
    // for clearing memory occupation don't need to put it on ngdestroy..
    if (this.modalRef) this.modalRef.unsubscribe();
    if (this.tosSub) this.tosSub.unsubscribe(); 
  }
  */
}
