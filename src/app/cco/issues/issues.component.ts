import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { forkJoin, of, Subscription, throwError, timer,Observable } from 'rxjs';
import { catchError, map,repeatWhen,takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { HistoryissueComponent } from './historyreport/historyissue/historyissue.component';
import { IssueService } from './service/issue.service';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']

})
export class IssuesComponent implements OnInit, OnDestroy {
    timer: any;
baseUrl = `${environment.API_BASE_URL}analytics-engine/`
dateParam ;
FromDate: any;
ToDate: any;
startDate: any;
endDate: any;

last24hours = false;

  reportRanges = [
    { label: '1', value: '1' },
    { label: '2', value: '2k' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];
  timerSubscription: Subscription;
  countSubscription:Subscription;
  language: any;
  languageSubject;
  isToggleSidebar = false;
  menus = {
    realtime: false,
    active: false,
    historical: false,
    cloud:false,
    connect:false,
    issues:false
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private issueService:IssueService
    ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
  
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.issues.current') !== -1) {
            this.menus['realtime'] = true;
            this.menus['connect'] = true;
            this.menus['cloud'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.issues.report.activealarm') !== -1) {
            console.log("Scope")
            this.menus['realtime'] = true;
            this.menus['active'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.issues.report.historyalarm') !== -1) {
            this.menus['realtime'] = true;
            this.menus['historical'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.issues.current') !== -1) {
            this.menus['cloud'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.issues.current') !== -1) {
            this.menus['connect'] = true;
            continue;
          }
        }
      }

    } else {
      this.menus = {
        realtime: true,
        active: true,
        historical: true,
        cloud:true,
        connect:true,
        issues:true
      }

    }


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        console.log("Issue Access")
        this.hasPageAccess = true;
      } else {
        console.log("No issue access")
        this.hasPageAccess = false;
      }
    });
   
  
if(this.urls.includes("/cco/issues/device/realtime/current-issues")||this.urls.includes("/cco/issues/cloud-health/realtime/current-issues")||this.urls.includes("/cco/issues/connectivity/realtime/current-issues")){
   this.timerSubscription = timer(0, 15000).pipe(
      map(() => {
        this.alarmsCount();
      })
    ).subscribe();
console.log(this.timerSubscription)

}

    
   else if(this.urls.includes('/cco/issues/device/active-reports')||this.urls.includes('/cco/issues/device/history-reports'))
    {
     this.countSubscription=this.issueService.filterCount$.subscribe((dateParams) => {
       this.dateParam = dateParams;
        this.alarmsCounts()
      } )
    }
  }
  

  ngOnDestroy() {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    this.languageSubject.unsubscribe();
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe()
    }
    if(this.countSubscription){
      this.countSubscription.unsubscribe()
    }
    
  }
  toggleSideBar() {
    this.isToggleSidebar = !this.isToggleSidebar;
    this.sso.triggerToggle();
  }



filtersForm = this.fb.group({
  startDate: [''],
  endDate: [''],
  alarmType: [''],
  region: [''],
  location: [''],
  system: [''],
  fsan: [''],
  severity: [''],
  category: [''],
  eventName: [''],
  customCategory: [''],
  cco_ack: 'all'
});




countSubscribe: any;
countData: any;
  criticalAlarms: any;
  majorAlarms: any;
  minorAlarms: any;
  totalAlarms: any;
  errorInfo: any;
  error: boolean;

  loading: boolean = true;
  urls=this.router.url;

 alarmsCounts(){
if(this.urls.includes('/cco/issues/device/active-reports'))
{
  setTimeout(() => {
    let url = `${this.baseUrl}alarmCount?reportType=ACTIVE${this.dateParam}`
  this.countSubscribe = this.http.get(`${url}`).subscribe((res: any) => {
    this.countData = (res && res['alarm'] && res['alarm'].raised) ? res['alarm'].raised : {};
    this.criticalAlarms = this.countData.critical ? this.countData.critical.toLocaleString() : '0';
    this.majorAlarms = this.countData.major ? this.countData.major.toLocaleString() : '0';
    this.minorAlarms = this.countData.minor ? this.countData.minor.toLocaleString() : '0';
    this.totalAlarms = this.countData.critical + this.countData.major + this.countData.minor + this.countData.warning + this.countData.info;
    this.totalAlarms = this.totalAlarms ? this.totalAlarms.toLocaleString() : '0';
    if (this.countData && this.countData['info']) {
      this.countData['info'] = this.countData['info'].toLocaleString();
    }

    if (this.countData && this.countData['warning']) {
      this.countData['warning'] = this.countData['warning'].toLocaleString();
    }
    this.loading = false;
  }, (err: HttpErrorResponse) => {
    this.pageErrorHandle(err);
    this.criticalAlarms = '0';
    this.majorAlarms = '0';
    this.minorAlarms = '0';
    this.totalAlarms = '0';
    this.loading = false;
  });
  }, 3000);
}

if(this.urls.includes('/cco/issues/device/history-reports'))
{
  setTimeout(() => {
    let url = `${this.baseUrl}alarmCount?reportType=HISTORY${this.dateParam}`
    this.countSubscribe = this.http.get(`${url}`).subscribe((res: any) => {
      this.clearedCountData = (res && res['alarm'] && res['alarm'].cleared) ? res['alarm'].cleared : {};
      this.countData = (res && res['alarm'] && res['alarm'].raised) ? res['alarm'].raised : {};
      this.eventCountData = (res && res['event'] && res['event'].count) ? res['event'].count : '0';
      this.criticalAlarms = this.countData.critical ? this.countData.critical.toLocaleString() : '0';
      this.majorAlarms = this.countData.major ? this.countData.major.toLocaleString() : '0';
      this.minorAlarms = this.countData.minor ? this.countData.minor.toLocaleString() : '0';
      this.totalAlarms = this.countData.critical + this.countData.major + this.countData.minor + this.countData.warning + this.countData.info;
      this.totalAlarms_cleared = this.clearedCountData.critical + this.clearedCountData.major + this.clearedCountData.minor + this.clearedCountData.warning + this.clearedCountData.info;
      this.totalAlarms = this.totalAlarms ? this.totalAlarms.toLocaleString() : '0';
      this.totalEvents = this.eventCountData ? this.eventCountData.toLocaleString() : '0';
      this.warningData = this.countData && this.countData['warning'] ? this.countData['warning'] : '0';
      this.warningAlarms = this.warningData ? this.warningData.toLocaleString() : '0';
      if (this.countData && this.countData['info']) {
        this.countData['info'] = this.countData['info'].toLocaleString();
      }

      if (this.countData && this.countData['warning']) {
        this.countData['warning'] = this.countData['warning'].toLocaleString();
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.criticalAlarms = '0';
      this.majorAlarms = '0';
      this.minorAlarms = '0';
      this.totalAlarms = '0';
      this.loading = false;
    });
  },3000);
}
 }
  

alarmsCount() {
  if(this.urls.includes('/cco/issues/cloud-health/realtime/current-issues')||this.urls.includes('/cco/issues/device/realtime/current-issues') ||this.urls.includes('/cco/issues/connectivity/realtime/current-issues')){
  this.countSubscribe = this.http.get(`${environment.API_BASE_URL}analytics-engine/alarmCount?reportType=REALTIME`).subscribe((res: any) => {
    this.countData = (res && res['alarm'] && res['alarm'].raised) ? res['alarm'].raised : {};
    this.criticalAlarms = this.countData.critical ? this.countData.critical.toLocaleString() : '0';
    this.majorAlarms = this.countData.major ? this.countData.major.toLocaleString() : '0';
    this.minorAlarms = this.countData.minor ? this.countData.minor.toLocaleString() : '0';
    this.totalAlarms = this.countData.critical + this.countData.major + this.countData.minor + this.countData.warning + this.countData.info;
    this.totalAlarms = this.totalAlarms ? this.totalAlarms.toLocaleString() : '0';
    if (this.countData && this.countData['info']) {
      this.countData['info'] = this.countData['info'].toLocaleString();
    }

    if (this.countData && this.countData['warning']) {
      this.countData['warning'] = this.countData['warning'].toLocaleString();
    }
   
    this.loading = false;
  }, (err: HttpErrorResponse) => {
    this.pageErrorHandle(err);
    this.criticalAlarms = '0';
    this.majorAlarms = '0';
    this.minorAlarms = '0';
    this.totalAlarms = '0';
    this.loading = false;
  });}
}


clearedCountData: any;
  totalAlarms_cleared: any = 0;
  eventCountData: any;
  totalEvents: boolean;
  warningAlarms: any;
  warningData: any;
pageErrorHandle(err: HttpErrorResponse) {
  if (err.status == 401) {
    this.errorInfo = this.language['Access Denied'];
  } else {
    this.errorInfo = this.commonOrgService.pageErrorHandle(err);
  }
  this.error = true;
  this.loading = false;
}

}
