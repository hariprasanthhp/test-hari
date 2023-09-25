import { DatePipe, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, forkJoin, Subscription, timer, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { HistoryChartOptionsService } from '../../../historyreport/service/history-chart-options.service';
import { IssueService } from '../../../service/issue.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';

@Component({
  selector: 'app-common-alarms',
  templateUrl: './common-alarms.component.html',
  styleUrls: ['./common-alarms.component.scss']
})
export class CommonAlarmsComponent implements OnInit {
  hasWriteAccess = false;
  transformedAlarms = ['multiple-onts-down-network', 'multiple-onts-down-pon', 'multiple-onts-down-olt'];
  //@Input() apiUrl: any;
  urls = this.router.url

  @Input()
  get apiUrl(): any { return this._apiUrl; }

  set apiUrl(apiUrl: any) {
    this.listObs?.unsubscribe();
    this._apiUrl = apiUrl;

  }
  private _apiUrl = '';
  @Input() connected: any;
  timeZone: string;
  listObs: any;
  baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
  list = [];
  hasScopeAccess = false;
  count = 0;
  loading: boolean = true;
  locked = false;
  language: any;
  languageSubject: any;
  errorInfo: any;
  error: boolean;
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
  isDev: boolean = false;
  severity = {
    MINOR: 'assets/img/outline-error-minor.svg',
    MAJOR: 'assets/img/outline-error-major.svg',
    CRITICAL: 'assets/img/outline-error-red.svg',
    WARNING: "assets/img/outline-error-warning.svg",
    INFO: "assets/img/outline-error-info.svg"
  }
  countSubscribe: any;
  countData: any;
  criticalAlarms: any;
  majorAlarms: any;
  minorAlarms: any;
  totalAlarms: any;
  timer: any;
  interval = 15 * 1000;
  filterSubscription: Subscription;
  filtersObj: any = {
    'region': 'Region', 'location': 'Location', 'system': 'System', 'alarmCount': 'Display Limit', 'alarmEventName': 'Exclude Alarms', 'limit': 'Display Limit', 'fsan_serialno': 'FSAN', 'device_type': 'System Type'
  }
  filtersValue = ['region', 'location', 'system', 'alarmCount', 'limit'];
  filters = ['region', 'location', 'system', 'fsan_serialno', 'device_type', 'alarmEventName', 'alarmCount', 'limit'];
  appliedParams: any = {};
  tableType = 'Table';
  // totalGeoIssues: number = 0;
  refreshMap: Subject<boolean> = new Subject<boolean>();
  geoMapfilterSubscription;
  showAllSystemsinMapSubject: Subject<boolean> = new Subject<boolean>();
  showAllSystemsinMap: boolean = true;

  constructor(private translateService: TranslateService,
    private issueService: IssueService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private exportExcelService: ExportExcelService,
    private chartOptionService: HistoryChartOptionsService,
    private router: Router,
    private sso: SsoAuthService,
    private dateUtilsService: DateUtilsService) {
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      // || host.indexOf('localhost') > -1
      this.isDev = true;
    } else this.isDev = false;
  }

  ngOnInit(): void {
    console.log(`page loaded at ${new Date()}`);
    let scopes = this.sso.getScopes();

    const alertScopes = this.issueService.getAlertScopes();
    if (scopes?.[alertScopes?.[this.issueService.getAlertType()]?.realtime]?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }

    this.timeZone = new Date().toString()?.split(" ")[5]?.replace(/(.{2})$/, ':$1');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    this.filterSubscription = this.issueService.issuesFilterChanged$.subscribe(value => {
      console.log('received value');
      if (this.tableType != 'Map') {
        this.loadIntialData();
      }

    });

    this.timer = setInterval(() => {
      console.log(`timer triggered at ${new Date()}`);
      this.loadIntialData();
    }, this.interval);

    if (this.issueService.getAlertType() === 'CONNECTIVITY') {
      this.loadIntialData();
    }
  }

  showAckShelveBtn = false;
  fullData: any = {};
  index: any;
  hideSource = false;
  viewDetails(item: any, index?: any) {
    this.hideSource = false;
    this.index = index;
    this.showAckShelveBtn = true;
    this.fullData = item;
  }

  loadIntialData() {
    console.log(`api triggered at ${new Date()}`);
    if (this.locked) {
      return;
    }

    if (this.listObs) {
      this.listObs.unsubscribe();
    }

    this.locked = true;

    let params = { ...this.issueService.getAppliedFilters(), ...{ alertType: this.issueService.getAlertType() } };

    if (this.connected) {
      if (!params['alarmCount']) {
        params['alarmCount'] = 20;
      }
    } else {
      if (!params['limit']) {
        params['limit'] = 20;
      }
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined || key === 'systemStatus' || params[key] == '') {
        continue;
      }

      if (this.connected && key === 'limit') {
        continue;
      } else if (!this.connected && (key === 'historyReport' || key === 'severity' || key === 'alarmCount' || key === 'alarmEventName')) {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);
    }

    query += `&cco_ack=false&cco_shelv=false&historyReport=false`;

    this.appliedParams = params;
    this.issueService.setAppliedFilters(params);

    const requests: any = {};

    let types = ['top'];

    let obj = {
      top: `${this.apiUrl}`,
    }

    if (query) {
      obj['top'] = `${this.apiUrl}?${query}`;
    }
    if (!query) {
      obj['top'] = `${this.apiUrl}?alarmCount=10`
    }

    types.forEach(type => {
      const req = this.http.get(`${obj[type]}`).pipe(
        catchError(err => {
          err['api-error'] = true;
          return of(err);
        }),
      );

      requests[type] = req;

    });

    this.listObs = forkJoin(requests).subscribe((resp: any) => {
      if (resp['top'] === null || !resp['top']) {
        this.loading = false;
        this.locked = false;
        this.list = [];
        return;
      }

      if (resp['top'] && resp['top']['api-error']) {
        this.pageErrorHandle(resp['top']);
        this.loading = false;
        this.list = [];
        return;
      }

      if (resp && typeof resp['top'] === 'object' && !resp['top']) {
        this.locked = false;
      } else if (resp && resp['top'] && !resp['top']['api-error']) {
        this.locked = false;
      }

      if (!this.connected) {
        resp['top']['alarms'] = resp['top'];
      }

      this.loading = false;
      this.count = 0;
      let data = [];
      if (resp && resp['top'] && (resp['top']['alarms'] && resp['top']['alarms'].length) || (resp['top']['nfaAlarm'] && resp['top']['nfaAlarm'].length)) {
        this.count = Number(resp['top'].alarmCount) + Number(resp['top'].disconnectDeviceCount);
        // this.count = resp['top'].alarmCount + resp['top'].disconnectDeviceCount;
        let alarms = [];
        // console.log(params['systemStatus'])
        // if (params['systemStatus'] === 'disconnected') {

        //   alarms = resp['top'].nfaAlarm;
        // } else {
        //   alarms = resp['top'].alarms;
        // }

        alarms = resp['top'].alarms;
        alarms?.forEach(element => {
          if (element && element['subject'] && element['subject']['deviceName']) {
            element['subject']['deviceName'] = element['subject']['deviceName'].replace('device=', '');
            element['subject']['deviceName'] = element['subject']['deviceName'].replace('DEVICE=', '')
          }

          element['subject']['resourceForUI'] = this.issueService.generateResourceForUI(element, (element.type === 'EXA' ? true : false));
          data.push(element);
        });
      }


      this.list = data;

    }, err => {
      this.count = 0;
      this.pageErrorHandle(err);
    });

  }

  convertToDateTime(dateTime: any) {
    if (!dateTime) {
      return
    }

    dateTime = Number(dateTime);

    let pipe = new DatePipe('en-US');
    return pipe.transform(new Date(dateTime), 'short');
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loading = false;
  }

  closeAlert() {
    this.error = false;
  }

  export() {
    let data = [];
    let subTitle, title;
    const obj = {
      SYSTEM: 'System', TRANSFORMED: 'Transformed', HEALTH: 'Health', CONNECTIVITY: 'Connectivity'
    };

    title = `${obj[this.issueService.getAlertType()]} Top Alarms`;

    this.list?.forEach((element) => {

      let expObj: any = {
        'Severity': `${(element['subject'] && element['subject']['perceivedSeverity']) ?
          element['subject']['perceivedSeverity'] : ''}`,
        'Reported Time': `${(element['subject'] && element['subject']['timeRaised']) ?
          this.convertToDateTime(element['subject']['timeRaised']) : ''}`,
        'Synced Time': `${element['time'] ?
          this.convertToDateTime(element['time']) : ''}`,
        'Alarm Name': `${(element['subject'] && element['subject']['alarmEventName']) ?
          element['subject']['alarmEventName'] : ''}`,
        'Resource': `${(element['subject'] && element['subject']['region']) ?
          element['subject']['region'] : ''}${(element['subject'] && element['subject']['location']) ?
            `/${element['subject']['location']}` : ''}${(element['subject'] && element['subject']['deviceName']) ?
              `/${element['subject']['deviceName']}` : ''}, ${(element['subject'] && element['subject']['source']) ?
                element['subject']['source'] : ''} `,
        'Region': `${(element['subject'] && element['subject']['region']) ?
          element['subject']['region'] : ''}`,
        'Location': `${(element['subject'] && element['subject']['location']) ?
          `${element['subject']['location']}` : ''}`,
        'System': `${(element['subject'] && element['subject']['deviceName']) ?
          `${element['subject']['deviceName']}` : ''}`,
        'AID': `${(element['subject'] && element['subject']['source']) ?
          element['subject']['source'] : ''}`
      }

      if (this.connected) {
        expObj['Subscriber Impact'] = `${(element['subject'] && element['subject']['serviceAffecting']) ?
          (element['subject']['impactedSubsCount'] ? element['subject']['impactedSubsCount'] : 'Yes') : 'No'}`;
      }

      expObj['Recommendation'] = `${(element['subject'] && element['subject']['repairAction']) ?
        element['subject']['repairAction'] : ''}`;

      data.push(expObj);
    });

    subTitle = `${title} \r\n${this.getSubTitle(this.appliedParams)}\r\n`;

    // if (this.urls.includes('/cco/issues/device/realtime/current-issues')) {
    //   subTitle = `${title} \r\n${this.getSubTitle(this.appliedParams)}\r\n`;
    // } else if (this.urls.includes('/cco/issues/cloud-health/realtime/current-issues')) {
    //   subTitle = `${title} \r\n${this.getSubTitleForAlarms(this.appliedParams)}\r\n`;
    // } else if (this.urls.includes('/cco/issues/connectivity/realtime/current-issues')) {
    //   subTitle = `${title} \r\n${this.getSubTitleForAlarms(this.appliedParams)}\r\n`;
    // }
    if (!this.list?.length) {
      subTitle += `No data available`;
    }

    const filename = `${(this.issueService.getFileTitleMap())?.[this.issueService.getAlertType()]}_RealTime_${this.dateUtilsService.getDateTimeStrWithOffset()}`;

    this.exportExcelService.downLoadCSV(filename, data, subTitle);
  }

  getSubTitle(params) {
    let regions = this.chartOptionService.getRegionsObj();
    let locations = this.chartOptionService.getLocationsObj();
    let systems = this.chartOptionService.getSystemsObj();
    let titlepipe = new TitleCasePipe();
    let subTitle = '';

    let deviceTypes = {
      ALL: 'All',
      ONT: 'ONT',
      OLT: 'OLT'
    };
    this.filters?.forEach((element, index) => {

      if (this.connected && element === 'limit') {
        return;
      } else if (!this.connected && (element === 'historyReport' || element === 'severity' || element === 'alarmCount')) {
        return;
      }

      if (params[element]) {
        let name: any = [];

        if (element === 'device_type') {
          name = deviceTypes[params[element]];
        } else if (element === 'region') {
          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = regions[params[element][i]] ? regions[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = regions[params[element]] ? regions[params[element]].name : params[element];
            name.push(pointName);
          }

        } else if (element === 'location') {

          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = locations[params[element][i]] ? locations[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = locations[params[element]] ? locations[params[element]].name : params[element];
            name.push(pointName);
          }


        } else if (element === 'system') {

          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = systems[params[element][i]] ? systems[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = systems[params[element]] ? systems[params[element]].name : params[element];
            name.push(pointName);
          }

        } else {
          name = params[element];
        }

        let skipAttribites = ['fsan_serialnumber', 'region', 'location', 'system', 'customCategory', 'alarmEventName', 'category', 'fsan_serialno'];

        if (typeof name === 'object' && skipAttribites.indexOf(element) === -1) {
          name = name.map(x => titlepipe.transform(x));
        } else {
          name = [name];
        }
        subTitle += `${this.filtersObj[element]}: ${name.join('&')} \r\n`;
      }

    });

    return subTitle;
  }

  getSubTitleForAlarms(params) {
    let regions = this.chartOptionService.getRegionsObj();
    let locations = this.chartOptionService.getLocationsObj();
    let systems = this.chartOptionService.getSystemsObj();
    let titlepipe = new TitleCasePipe();
    let subTitle = '';

    this.filtersValue?.forEach((element, index) => {

      if (this.connected && element === 'limit') {
        return;
      } else if (!this.connected && (element === 'historyReport' || element === 'severity' || element === 'alarmCount')) {
        return;
      }

      if (params[element]) {
        let name: any = [];

        if (element === 'region') {
          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = regions[params[element][i]] ? regions[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = regions[params[element]] ? regions[params[element]].name : params[element];
            name.push(pointName);
          }

        } else if (element === 'location') {
          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = locations[params[element][i]] ? locations[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = locations[params[element]] ? locations[params[element]].name : params[element];
            name.push(pointName);
          }


        } else if (element === 'system') {

          if (typeof params[element] === 'object') {
            params[element].forEach((e, i) => {
              let pointName = systems[params[element][i]] ? systems[params[element][i]].name : params[element][i];
              name.push(pointName);
            });
          } else {
            let pointName = systems[params[element]] ? systems[params[element]].name : params[element];
            name.push(pointName);
          }

        } else {
          name = params[element];
        }

        let skipAttribites = ['region', 'location', 'system',];

        if (typeof name === 'object' && skipAttribites.indexOf(element) === -1) {
          name = name.map(x => titlepipe.transform(x));
        } else {
          name = [name];
        }

        subTitle += `${this.filtersObj[element]}: ${name.join('&')} \r\n`;
      }

    });

    return subTitle;
  }


  // clickView(type) {
  //   this.tableType = type;
  //   if (type == 'Map') {
  //     this.issueService.fromMapNavigation(true);
  //     this.issueService.setGeoMapFilters(true);
  //   } else {
  //     this.issueService.fromMapNavigation(false);
  //     this.issueService.setGeoMapFilters(false);
  //   }

  // }

  // geoMapIssues(issues){
  //   this.totalGeoIssues = issues;
  // }

  refreshIssuesGeoMap() {
    this.refreshMap.next(true);
  }

  gotoSubscriberImpactedPage(issue?: any) {
    issue.redirectUrl = `/cco/alerts/${this.issueService.getAlertType()?.toLowerCase()}/realtime/current-issues`;
    localStorage.setItem('calix.impactedSubsFSANData', JSON.stringify(issue));
    this.router.navigate(['/cco/system/subscribers-impact']);
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.refreshMap) {
      this.refreshMap.unsubscribe()
    }
    if (this.showAllSystemsinMapSubject) {
      this.showAllSystemsinMapSubject.unsubscribe()
    }
    if (this.geoMapfilterSubscription) {
      this.geoMapfilterSubscription.unsubscribe()
    }
    this.filterSubscription?.unsubscribe();
    clearInterval(this.timer);

  }
  changeshowAllSystems() {
    this.showAllSystemsinMap = !this.showAllSystemsinMap;
    this.showAllSystemsinMapSubject.next(this.showAllSystemsinMap);
  }
  updateShowHealthySystemToggle(event) {
    this.showAllSystemsinMap = event;
    this.showAllSystemsinMapSubject.next(this.showAllSystemsinMap);
  }
  onAckShelve(data: any) {
    if (typeof data?.ack !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoAck = data?.ack;
        if (data?.ack) {
          this.list?.splice(this.index, 1);
        }
      }
    } else if (typeof data?.shelve !== 'undefined') {
      if (this.list[this.index]?.subject) {
        this.list[this.index].subject.ccoShelved = data?.shelve;
        if (data?.shelve) {
          this.list?.splice(this.index, 1);
        }
      }
    }

  }

  onRefreshAckShelve(value: any) {
    this.showAckShelveBtn = false;
  }
  gotoHomeGeomap() {
    this.issueService.gotoHomeGeomap()
  }

}
