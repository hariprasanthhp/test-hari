import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EndpointReportsService {

  constructor(
    private httpClient: HttpClient,
    private sso: SsoAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  getApplications(params: any): any {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);
    let granularity = this.getGranularity(startDate, endDate, 'topApplications');

    if (params.criteriaSelected == 'usage') {
      startDate = this.getISOStartOfDay(startDate);
      endDate = this.getISOEndOfDay(endDate);
    }
    let url = '';

    let inpParams: any = {
      granularity: granularity,
      tenant: 0,
      startTime: startDate,
      // endpoint: sessionStorage.getItem('aggregate_Endpoint_Id') ? JSON.parse(sessionStorage.getItem('aggregate_Endpoint_Id')) : this.activatedRoute.snapshot.queryParamMap.get('id'),
      endpoint: params['endpointID'] ?? sessionStorage.getItem('aggregate_Endpoint_Id') ?? this.activatedRoute.snapshot.queryParamMap.get('id') ?? '',
      output: params['criteriaSelected'],
      direction: params['directionSelected'].toLowerCase(),
      org: this.sso.getOrganizationID(this.router.url),
      count: params['limit'],
      endTime: endDate
    }
    // if (params['groupSelected'] === 'yes') {
    //   inpParams['groupApplications'] = true;
    // }

    let query = "";
    for (var key in inpParams) {
      if (typeof inpParams[key] !== 'undefined') {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(inpParams[key]);
      }
    }
    url = `${environment.SUPPORT_URL}/traffic/reports/topapplications?${query}`;
    return this.httpClient.get(url);
  }

//Regarding story CCL-71587 addded new report "topApplicationGroups" shown below..

  getApplicationGroups(params: any): any {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);
    let granularity = this.getGranularity(startDate, endDate, 'topApplicationGroups');

    if (params.criteriaSelected == 'usage') {
      startDate = this.getISOStartOfDay(startDate);
      endDate = this.getISOEndOfDay(endDate);
    }
    let url = '';

    let inpParams: any = {
      granularity: granularity,
      tenant: 0,
      startTime: startDate,
      // endpoint: sessionStorage.getItem('aggregate_Endpoint_Id') ? JSON.parse(sessionStorage.getItem('aggregate_Endpoint_Id')) : this.activatedRoute.snapshot.queryParamMap.get('id'),
      endpoint: params['endpointID'] ?? sessionStorage.getItem('aggregate_Endpoint_Id') ?? this.activatedRoute.snapshot.queryParamMap.get('id') ?? '',
      output: params['criteriaSelected'],
      direction: params['directionSelected'].toLowerCase(),
      org: this.sso.getOrganizationID(this.router.url),
      count: params['limit'],
      endTime: endDate
    }
    // if (params['groupSelected'] === 'yes') {
    //   inpParams['groupApplications'] = true;
    // }

    let query = "";
    for (var key in inpParams) {
      if (typeof inpParams[key] !== 'undefined') {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(inpParams[key]);
      }
    }
    url = `${environment.CCO_REPORTS_BASE_URL}reports/topapplicationgroups?${query}`;
    return this.httpClient.get(url);
  }


  getAppTraffic(params: any): any {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);

    let granularity = this.getGranularity(startDate, endDate);
    let url = '';

    let inpParams: any = {
      granularity: '1hour',
      org: this.sso.getOrganizationID(this.router.url),
      tenant: 0,
      startTime: startDate,
      endTime: endDate,
      // endpoint: sessionStorage.getItem('aggregate_Endpoint_Id') ? JSON.parse(sessionStorage.getItem('aggregate_Endpoint_Id')) : this.activatedRoute.snapshot.queryParamMap.get('id'),
      endpoint: params['endpointID'] ?? sessionStorage.getItem('aggregate_Endpoint_Id') ?? this.activatedRoute.snapshot.queryParamMap.get('id') ?? '',
      groupBy: 'application',
      output: 'rate',
      count: params['limit'],
      direction: 'both'
    }
    let query = "";
    for (var key in inpParams) {
      if (typeof inpParams[key] !== 'undefined') {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(inpParams[key]);
      }
    }
    url = `${environment.SUPPORT_URL}/traffic/timeseries?${query}`;
    return this.httpClient.get(url);
  }
  orgId;
  public getRate<T>(params: any, enpoint): Observable<T> {
    let orgId = this.sso.getOrg(this.orgId)
    let criteria = 'rate';
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    let granularity = this.getGranularity(startDate, endDate, 'rate');

    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);

    params.startTime = params.startTime - 1;
    params.endTime = params.endTime - 1;
    let diff = moment(endDate).diff(moment(startDate), "hour")
    let dayDiff = moment(endDate).diff(moment(startDate), "days")
    granularity = dayDiff <= 31 ? '1hour' : '24hour'
    if (diff <= 72 && dayDiff <= 3) {
      let d = new Date(params.startDate)
      startDate = this.getStartUTCDate(params.startDate, params.startTime);
      endDate = this.getStartUTCDate(d, params.endTime);
      granularity = '1hour'
      params.APIStartDate = startDate;
      params.APIendDate = endDate;
    }

    let url = `${environment.SUPPORT_URL}/traffic/timeseries?${this.sso.getOrg(this.orgId)}tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&endpoint=${enpoint}`;
    return this.httpClient.get<T>(url);
  }


  getStartUTCDate(dt: any, addHours?: number): any {
    let d = new Date(dt);
    d.setHours(addHours, 0, 0, 0);
    let year = d.getUTCFullYear();
    let month = `${d.getUTCMonth() + 1}`;
    let day = `${d.getUTCDate()}`;
    let hr = `${d.getUTCHours()}`;
    let min = `${d.getUTCMinutes()}`;

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    if (hr.length < 2) {
      hr = `0${hr}`;
    }

    if (min.length < 2) {
      min = `0${min}`;
    }

    let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
    return date;
  }

  getEndUTCDate(dt: any): any {
    let d = new Date(dt);
    d.setHours(0, 0, 0, 0);
    d.setDate(new Date(d).getDate() + 1);
    let year = d.getUTCFullYear();
    let month = `${d.getUTCMonth() + 1}`;
    let day = `${d.getUTCDate()}`;
    let hr = `${d.getUTCHours()}`;
    let min = `${d.getUTCMinutes()}`;

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    if (hr.length < 2) {
      hr = `0${hr}`;
    }

    if (min.length < 2) {
      min = `0${min}`;
    }

    let date = `${year}-${month}-${day}T${hr}:${min}:00Z`;
    return date;
  }

  getISOStartOfDay(dt) {
    let d = new Date(dt);
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  getISOEndOfDay(dt) {
    let d = new Date(dt);
    d.setDate(new Date(d).getDate());
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let date = `${year}-${month}-${day}T00:00:00Z`;
    return date;
  }

  getGranularity(startDate: any, endDate: any, chart?: any) {
    let granularity = '24hour';

    // CCL-57017 - Changes made for this ticket
    if (chart == 'topApplications' || 'topApplicationGroups') {
      return granularity;
    }

    let diff = moment(endDate).diff(moment(startDate), "hour")
    if (diff <= 24) {
      granularity = "1hour"
    }
    else {
      granularity = "24hour"
    }

    if (chart && chart == 'rate') {
      let dateDiff = moment(endDate).diff(moment(startDate), "days")
      if (dateDiff <= 31) {
        granularity = "1hour"
      } else {
        granularity = "24hour"
      }
    }

    return granularity;
  }

}
