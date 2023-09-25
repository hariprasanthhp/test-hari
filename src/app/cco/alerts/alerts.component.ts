import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { IssueService } from '../issues/service/issue.service';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  fullContainerView: any = false;
  timer: any;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`
  dateParam;
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
  countSubscription: Subscription;
  language: any;
  languageSubject;
  isToggleSidebar = false;
  menus = {
    realtime: false,
    active: false,
    history: false,
    cloud: false,
    connect: false,
    issues: false,
    'service-disruptions': false
  }
  pageAcceesObs: any;
  hasPageAccess: boolean = true;
  toggled = new Subject<any>();
  type: any = 'system';
  topMenus = {
    SYSTEM: false,
    TRANSFORMED: false,
    HEALTH: false,
    CONNECTIVITY: false,
    EVENTS: false,
    DISRUPTION: false
  };

  menuConfig = {
    'systemalarms': {
      urls: [],
      scopes: ['realtime', 'activereports', 'historicalreports'],
      title: 'System Alarms',
      route: 'system'
    },
    'transformalarms': {
      urls: [],
      scopes: ['realtime', 'activereports', 'historicalreports'],
      title: 'Transform Alarms',
      route: 'transformed'
    },
    'healthalerts': {
      urls: [],
      scopes: ['realtime', 'activereports', 'historicalreports'],
      title: 'Health Alerts',
      route: 'health'
    },
    'cloudconnectivity': {
      urls: [],
      scopes: ['realtime', 'activereports', 'historicalreports'],
      title: 'Cloud Connectivity',
      route: 'connectivity'
    },
    'servicedisruptions': {
      urls: [],
      scopes: [],
      title: 'Service Disruptions',
      route: 'disruption'
    },
    'events': {
      urls: [],
      scopes: [],
      title: 'Events',
      route: 'events'
    },
  }

  activeMenus = {
    system: false,
    transformed: false,
    health: false,
    connectivity: false,
    disruption: false,
    events: false,
  }

  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    private http: HttpClient,
    private commonOrgService: CommonService,
    private fb: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.setTopMenus();
    if (this.router.url.includes('/events/')) {
      this.isEventsPage = true;
    }
    this.type = this.route.snapshot.params?.type?.toUpperCase();
    this.issueService.setAlertType(this.type);
    console.log(this.type);

    let scopes = this.sso.getScopes();
    let urlsInfo = this.sso.getCCOUrlInfo();
    if (environment.VALIDATE_SCOPE) {

      const alertScopes = this.issueService.getAlertScopes();
      ['realtime', 'active', 'history'].forEach(element => {
        if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.[element]]) {
          this.menus[element] = true;
        }
      });

    } else {
      this.menus = {
        realtime: true,
        active: true,
        history: true,
        cloud: true,
        connect: true,
        issues: true,
        'service-disruptions': true
      }

    }

    for (let menu in this.menuConfig) {

      if (urlsInfo['issues']?.[`cloud.rbac.coc.issues.${menu}`]) {
        this.menuConfig[menu]?.urls?.push(urlsInfo['issues']?.[`cloud.rbac.coc.issues.${menu}`]?.path);
        continue;
      }

      this.menuConfig[menu]?.scopes?.forEach(element => {
        if (scopes[`cloud.rbac.coc.issues.${menu}.${element}`]) {
          this.menuConfig[menu]?.urls?.push(urlsInfo['issues']?.[`cloud.rbac.coc.issues.${menu}.${element}`]?.path);
        }
      });
    }

    console.log(this.menuConfig);

    this.setActiveMenu();

    if (this.type.toLowerCase() === 'events') {
      this.menus['events'] = true;
      this.menus['realtime'] = false;
      this.menus['active'] = false;
      this.menus['history'] = false;
      this.menus['service-disruptions'] = false;
      this.fullContainerView = true;
    } else if (this.type.toLowerCase() === 'disruption') {
      this.menus['events'] = false;
      this.menus['realtime'] = false;
      this.menus['active'] = false;
      this.menus['history'] = false;
      this.menus['service-disruptions'] = true;
      this.fullContainerView = true;
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.pageAcceesObs = this.sso.hasPageAccess$.subscribe((json: any) => {
      if (json.access) {
        this.hasPageAccess = true;
      } else {
        this.hasPageAccess = false;
      }
    });



    if (this.url.includes("/realtime/current-issues")) {
      this.timerSubscription = timer(0, 15000).pipe(
        map(() => {
          this.alarmsCount();
        })
      ).subscribe();

    } else {
      this.countSubscription = this.issueService.filterCount$.subscribe((dateParams) => {
        this.dateParam = dateParams;
        this.alarmsCount();
      })
    }
  }


  ngOnDestroy() {
    if (this.pageAcceesObs) {
      this.pageAcceesObs.unsubscribe();
    }
    this.languageSubject.unsubscribe();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe()
    }
    if (this.countSubscription) {
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
  url = this.router.url;
  isEventsPage = false;

  alarmsCount() {
    let url = `${this.baseUrl}alarmCount?`; //reportType=ACTIVE${this.dateParam}
    if (this.url.includes("/realtime/current-issues")) {
      url += `reportType=REALTIME`;
    } else if (this.url.includes('/active-reports')) {
      url += `reportType=ACTIVE${this.dateParam}`;
    } else {
      url += `reportType=HISTORY${this.dateParam}`;
    }
    let alarmTypes = this.issueService.getAlarmAlertTypes();
    if (alarmTypes?.indexOf(this.type) !== -1) {
      url += `&alertType=${this.type}`;
    }

    if (this.issueService.getAlertType() === 'EVENTS') {
      url += `&notificationType=Event`;
    }

    this.countSubscribe = this.http.get(`${url}`).subscribe((res: any) => {
      this.setAlertsCount(res);
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

      this.totalEvents = (res && res['event'] && res['event'].count) ? res['event'].count.toLocaleString() : '0';

      this.loading = false;

    }, (err: HttpErrorResponse) => {
      this.setAlertsCount({});
      this.pageErrorHandle(err);
      this.criticalAlarms = '0';
      this.majorAlarms = '0';
      this.minorAlarms = '0';
      this.totalAlarms = '0';
      this.loading = false;
    });
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

  findTopMenus() {
    [
      'cloud.rbac.coc.issues.systemalarms',
      'cloud.rbac.coc.issues.transformalarms',
      'cloud.rbac.coc.issues.healthalerts',
      'cloud.rbac.coc.issues.cloudconnectivity',
      'cloud.rbac.coc.issues.events',
      'cloud.rbac.coc.issues.servicedisruptions'
    ]
  }

  originalOrder(a: any, b: any) {
    return 0;
  }

  isMenuActive(menuName: string) {
    if ((window.location.pathname).indexOf(`/${menuName}/`) !== -1) {
      return true;
    }

    return false;
  }

  setActiveMenu() {
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = this.isMenuActive(menu);
    }

  }

  setTopMenus() {
    const scopes = this.sso.getScopes();
    for (let menu in this.menuConfig) {
      let hasScope = false;
      if (scopes[`cloud.rbac.coc.issues.${menu}`]) {
        hasScope = true;
        continue;
      }
      for (let scope of this.menuConfig[menu]?.scopes) {
        if (scopes[`cloud.rbac.coc.issues.${menu}.${scope}`]) {
          hasScope = true;
          break;
        }
      }

      if (!hasScope) {
        delete this.menuConfig[menu];
      }

    }
  }

  setAlertsCount(res = {}) {
    if (this.url.includes('/history-reports') || this.url.includes('/cco/alerts/events/view')) {
      this.issueService.setAlertsCount(res);
    }
  }

}
