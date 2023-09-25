import { Injectable } from '@angular/core';
//import  {io} from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject, Subscription, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  appliedFilters: any = {};
  alertType: any = '';
  transformedAlarms = ['multiple-onts-down-network', 'multiple-onts-down-pon', 'multiple-onts-down-olt'];
  public baseURL = environment.API_BASE_URL;
  private regions: string;
  private locations: string;
  private systems: string;
  issuesFilterChanged$ = new Subject();
  geoMapFilterChanged$ = new Subject();
  homegeomapNavigation$ = new Subject();

  isIssueMap: boolean = false;
  issuesGeoMapFiltersParams = {};
  geoMapAppliedFilters = {};

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
    customCategory: [''],
    eventName: 'All',
    cco_ack: 'all',
    cco_shelv: 'all'
  });



  private selectedDate = new Subject();
  public filterCount$ = this.selectedDate.asObservable();



  constructor(
    private httpClient: HttpClient,
    private ssoAuthService: SsoAuthService,
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private router: Router
  ) {
    this.regions = this.baseURL + 'nfa/regions?tenant=0';
    this.locations = this.baseURL + 'nfa/locations?tenant=0';
    this.systems = this.baseURL + 'nfa/systems?tenant=0';
  }
  dateParams
  filterCounts(ids: any) {
    this.selectedDate.next(ids);
    this.dateParams = ids
    return this.dateParams
  }



  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      // socket.on(eventname, (data) => {
      //   subscriber.next(data);
      // })
    })
  }
  emit(eventname: string, data?: any) {
    // console.log("data");
    // socket.emit(eventname, data);
  }

  public getRegions(includeDeleted = false) {
    let query = ``;
    if (includeDeleted) {
      query += `&includeDeleted=true`;
    }

    return this.httpClient.get(`${this.regions}${query}`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        return res;
      }),
      catchError(this.handleError))
  }

  public getLocations(id: any) {
    let region = '&region=' + id;
    return this.httpClient.get(`${this.locations}${region}`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        return res;
      }),
      catchError(this.handleError))
  }

  public getSystems(regionId: any, locationId: any) {
    let region = '&region=' + regionId;
    let location = '&location=' + locationId;
    return this.httpClient.get(`${this.systems}${region}${location}`).pipe(
      map((res: any) => {
        res.sort((a, b) => (a["name"] || "").toString().localeCompare((b["name"] || "").toString(), 'en', { numeric: false }))
        return res;
      }),
      catchError(this.handleError))
  }

  prepareLocationRegionHierachy(result: any) {
    let regionsLocations = [];
    let regionMap = {};
    result.map((item) => {
      if (!regionMap.hasOwnProperty(item[0])) {
        regionsLocations.push({
          value: item[0],
          parent: 'All'
        });
        regionMap[item[0]] = true;
      }
      regionsLocations.push({
        value: item[1],
        parent: item[0]
      });
    });
    return regionsLocations;
  }

  // getLocation() {
  //   return localStorage.getItem('location') ? localStorage.getItem('location') : 'All'
  // }
  // getRegion() {
  //   return localStorage.getItem('region') ? localStorage.getItem('region') : 'All'
  // }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  getAlarmSubscriberInfo(id: any) {
    return this.httpClient.get(`${this.baseURL}/analytics-engine/alarmSubscriberList?historyReport=false&alarmId=${id}`);
  }

  currentIssuesFilterParams = {};
  setCurrentIssuesFilterParams(params?: any, isGeoMap: any = true, changeTab?: any) {
    this.currentIssuesFilterParams = params;
    if (!changeTab) {
      this.issuesFilterChanged$.next(isGeoMap);
    }

  }
  getCurrentIssuesFilterParams() {
    return this.currentIssuesFilterParams;
  }

  geoMapHomeFilterParams = {};
  setgeoMapHomeFilterParams(params?: any, isGeoMap: any = true, changeTab?: any) {
    this.geoMapHomeFilterParams = params;
    if (!changeTab) {
      this.issuesFilterChanged$.next(isGeoMap);
    }

  }

  getgeoMapHomeFilterParams() {
    return this.geoMapHomeFilterParams;
  }

  setGeoMapFilters(value) {
    this.geoMapFilterChanged$.next(value);
  }

  callGotoHomeGeomap() {
    this.homegeomapNavigation$.next();
  }

  fromMapNavigation(value) {
    this.isIssueMap = value;
  }

  isMap() {
    return this.isIssueMap;
  }

  setIssuesGeoMapFilters(params) {
    this.issuesGeoMapFiltersParams = params;
  }

  getIssuesGeoMapFilters() {
    return this.issuesGeoMapFiltersParams;
  }

  ngOnDestroy() {
    if (this.issuesFilterChanged$) {
      this.issuesFilterChanged$.unsubscribe();
    }
    if (this.geoMapFilterChanged$) {
      this.geoMapFilterChanged$.unsubscribe();
    }
    if (this.homegeomapNavigation$) {
      this.homegeomapNavigation$.unsubscribe();
    }
    this.selectedDate.unsubscribe()
  }

  generateResourceForUI(alarm, isExaAlarm) {
    let region = ''; let location = ''; let deviceName = '';
    if (alarm && alarm['subject']) {
      if (alarm['subject']['region']) {
        region += `${alarm['subject']['region']}`;
      }

      if (alarm['subject']['location']) {
        location += `${region ? '/' : ''}${alarm['subject']['location']}`;
      }

      if (alarm['subject']['deviceName']) {
        deviceName += `${location ? '/' : ''}${alarm['subject']['deviceName']}`;
      }
    }

    if (isExaAlarm) {
      alarm['subject']['resourceForUI'] = `(${region} ${location} ${deviceName}) ${alarm['subject']['source']}`;
      if (typeof alarm['subject']?.additionalAttributes?.['ring-name'] === 'object') {
        alarm['subject']['resourceForUI'] += `(${alarm['subject']?.additionalAttributes?.['ring-name'].value})`;
      } else if (alarm['subject']?.additionalAttributes?.['ring-name']) {
        alarm['subject']['resourceForUI'] += `(${alarm['subject']?.additionalAttributes?.['ring-name']})`;
      }
    } else if (this.transformedAlarms.indexOf(alarm['subject']['alarmEventName']) === -1) {
      alarm['subject']['resourceForUI'] = `(${region} ${location} ${deviceName}) ${alarm['subject']['source']}`;
    } else {
      if (alarm['subject'] && alarm['subject']['alarmEventName'] === 'multiple-onts-down-network') {
        alarm['subject']['resourceForUI'] = `(${region} ${location})`;
      } else if (alarm['subject'] && alarm['subject']['alarmEventName'] === 'multiple-onts-down-pon') {
        alarm['subject']['resourceForUI'] = `(${region} ${location} ${deviceName}) ${alarm['subject']['source']}`;
      } else if (alarm['subject'] && alarm['subject']['alarmEventName'] === 'multiple-onts-down-olt') {
        alarm['subject']['resourceForUI'] = `(${region} ${location} ${deviceName})`;
      }
    }

    return alarm['subject']['resourceForUI'];
  }

  appendFqn(res: any) {
    if (res?.length) {
      res?.forEach((element: any) => {
        if (this.findObjectsCountByValue(res, element.name) > 1) {
          let fqn = '';
          if (element.fqn) {
            let tmp = element['fqn'].split(',');
            if (tmp.length) {
              let deviceName = tmp[0];
              if (deviceName) {
                let arr = deviceName.split('=');
                if (arr.length && arr[1]) {
                  fqn = arr[1];
                }
              }
            }
          }
          element['tempName'] = `${element.name} ${fqn ? `(${fqn})` : ''}`;
        } else {
          element['tempName'] = element.name;
        }
      });

      res.forEach((element: any) => {
        element['name'] = element.tempName;
      });
    }

    return res;

  }

  findObjectsCountByValue(jsObjects, value: any) {
    let count: any = 0;

    if (jsObjects && jsObjects.length) {
      for (var i = 0; i < jsObjects.length; i++) {
        if (typeof jsObjects[i]['isDeleted'] !== 'undefined' && !jsObjects[i]['isDeleted'] && jsObjects[i]['name'].toLowerCase() == value.toLowerCase()) {
          count++;
        }
      }
    }


    return count;
  }

  getDateParam(fields: any, last24hours?: any) {
    if (fields?.['date']?.length) {

      if (!fields['date'][1]) {
        fields['date'][1] = new Date();
      }

      if (last24hours) {
        return `${(this.dateUtilsService.getStartUtcTimeByDays(0) - 86400000)},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['date'][1], true)}`;

      } else {
        return `${this.dateUtilsService.getUtCMilliSecByDateObj(fields['date'][0])},${this.dateUtilsService.getUtCMilliSecByDateObj(fields['date'][1], true)}`;
      }
    } else {
      return '';
    }
  }

  setAlertType(alertType: any) {
    this.alertType = alertType;
  }

  getAlertType() {
    return this.alertType;
  }

  getRemoveFiltersData() {
    return {
      'SYSTEM': [],
      'TRANSFORMED': ['category', 'customCategory', 'fsan'],
      'HEALTH': ['category', 'customCategory'],
      'CONNECTIVITY': ['category', 'customCategory', 'fsan'],
      'EVENTS': ['severity', 'cco_ack', 'cco_shelv', 'customCategory']
    }
  }


  getPageTitle() {
    return {
      'SYSTEM': 'System Alarms',
      'TRANSFORMED': 'Transform Alarms',
      'HEALTH': 'Health Alerts',
      'CONNECTIVITY': 'Cloud Connectivity',
      'EVENTS': 'Events'
    }
  }

  getAlarmAlertTypes() {
    return ['SYSTEM', 'TRANSFORMED', 'HEALTH', 'CONNECTIVITY']
  }

  buildQuery(params: any = {}) {
    let query = '';
    for (var key in params) {

      if (params[key] == undefined || params[key] == "") {
        continue;
      }

      if (query != "") {
        query += "&";
      }

      query += key + "=" + encodeURIComponent(params[key]);
    }

    return query;

  }

  getAppliedFilters() {
    return this.appliedFilters;
  }

  setAppliedFilters(obj: any, realtime = false) {
    this.appliedFilters = obj;
    if (realtime) {
      this.issuesFilterChanged$.next(false);
    }
  }

  setGeomapAppliedFilters(obj: any) {
    this.geoMapAppliedFilters = obj;
  }

  getGeomapAppliedFilters() {
    return this.geoMapAppliedFilters;
  }

  gotoHomeGeomap() {
    let filters = _.pickBy({ ...this.getMapViewFilters(), ...this.getAppliedFilters() }, function (value, key) {
      return value;
    });

    if (this.getAlertType() === 'DISRUPTION') {
      filters['fsan_serialno'] = filters['fsan'];
    }

    this.router.navigate(['/cco/home/active-systems-geomap'], { state: { filters: filters } });
  }

  getAlertScopes() {
    return {
      SYSTEM: {
        realtime: 'cloud.rbac.coc.issues.systemalarms.realtime',
        active: 'cloud.rbac.coc.issues.systemalarms.activereports',
        history: 'cloud.rbac.coc.issues.systemalarms.historicalreports'
      },
      TRANSFORMED: {
        realtime: 'cloud.rbac.coc.issues.transformalarms.realtime',
        active: 'cloud.rbac.coc.issues.transformalarms.activereports',
        history: 'cloud.rbac.coc.issues.transformalarms.historicalreports'
      },
      HEALTH: {
        realtime: 'cloud.rbac.coc.issues.healthalerts.realtime',
        active: 'cloud.rbac.coc.issues.healthalerts.activereports',
        history: 'cloud.rbac.coc.issues.healthalerts.historicalreports'
      },
      CONNECTIVITY: {
        realtime: 'cloud.rbac.coc.issues.cloudconnectivity.realtime',
        active: 'cloud.rbac.coc.issues.cloudconnectivity.activereports',
        history: 'cloud.rbac.coc.issues.cloudconnectivity.historicalreports'
      },
      EVENTS: 'cloud.rbac.coc.issues.events',
      DISRUPTION: 'cloud.rbac.coc.issues.servicedisruptions'
    }
  }

  alertsCount: any = {
    alerts: 0,
    events: 0
  };
  setAlertsCount(res: any) {
    let alerts = 0, events = 0;
    if (res?.['alarm']) {
      for (let key in res['alarm']) {
        if (res['alarm'][key]) {
          for (let type in res['alarm'][key]) {
            alerts += res['alarm'][key][type];
          }
        }
      }
    }

    if (res?.['event']?.count) {
      events = res['event'].count
    }

    this.alertsCount = {
      alerts: alerts,
      events: events
    }

  }

  getAlertsCount() {
    return this.alertsCount;
  }

  mapViewFilters: any = {};
  setMapViewFilters(filters: any) {
    this.mapViewFilters = filters;
  }

  getMapViewFilters() {
    return this.mapViewFilters;
  }

  getFileName(response: any, page?) {
    let filename: string;
    try {
      filename = response.headers.get('Content-Disposition').split('=')[1];
    }
    catch (e) {
      if (page == 'subsciberDisruption') {
        filename = 'Subscriber Disruptions.csv';
      } else {
        filename = 'ServiceDisruptions.csv';
      }
    }
    return filename;
  }

  getFileTitleMap() {
    return {
      'SYSTEM': 'SystemAlarms',
      'TRANSFORMED': 'TransformAlarms',
      'HEALTH': 'HealthAlerts',
      'CONNECTIVITY': 'CloudConnectivity',
      'EVENTS': 'Events'
    }
  }

}
