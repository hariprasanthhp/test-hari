import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkReportApiService {

  orgId: any;
  constructor(
    private httpClient: HttpClient,
    private sso: SsoAuthService,
    private router: Router
  ) {
    this.orgId = this.sso.getOrganizationID(this.router.url);
  }

  public getTraffic<T>(params: any): Observable<T> {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    let granularity = this.getGranularity(startDate, endDate, 'traffic', criteria);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);
    if (criteria != 'usage') {
      params.startTime = params.startTime - 1;
      params.endTime = params.endTime - 1;
      let diff = moment(endDate).diff(moment(startDate), "hour")
      let dayDiff = moment(endDate).diff(moment(startDate), "days")
      granularity = dayDiff <= 31 ? '1hour' : '24hour'
      if (diff <= 72 && dayDiff <= 3) {
        let d = new Date(params.startDate)
        startDate = this.getStartUTCDate(params.startDate, params.startTime);
        endDate = this.getStartUTCDate(d, params.endTime);
        granularity = '1min'
        params.APIStartDate = startDate;
        params.APIendDate = endDate;
      }

    }
    else if (criteria == 'usage') {
      startDate = this.getISOStartOfDay(params.startDate);
      endDate = this.getISOEndOfDay(params.endDate);
    }

    let url = `${environment.CCO_REPORTS_BASE_URL}timeseries?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&direction=both`;
    return this.httpClient.get<T>(url);
  }


  public getTopLocations<T>(params: any, page?: string): Observable<T> {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    let limit = params.limit ? params.limit : 10;
    let direction = params.directionSelected ? params.directionSelected : 'both';
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate, 'topLocations');

    if (criteria !== 'usage') {
      startDate = this.getStartUTCDate(params.startDate, 0);
      endDate = this.getEndUTCDate(params.endDate);
    }

    let url = `${environment.CCO_REPORTS_BASE_URL}reports/toplocations?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}`;
    if (page && page == 'apps-top-locations') {
      let appParams = '';
      if (params['applicationsSelected']?.length > 0) {
        params['applicationsSelected'].forEach((element) => {
          appParams += `&application=${element}`
        });
        url = `${url}${appParams}`;
      } else if (params['applicationGroupSelected']?.length > 0) {
        params['applicationGroupSelected'].forEach((element) => {
          appParams += `&applicationgroup=${element}`
        });
        url = `${url}${appParams}`;
      }
    }
    return this.httpClient.get<T>(url);
  }

  public TopApplication<T>(params: any, page?: string): Observable<T> {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    let limit = params.limit ? params.limit : 10;
    let direction = params.directionSelected ? params.directionSelected : 'both';
    let group = params.groupSelected == 'yes' ? true : false;
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate, 'topApplications');

    if (criteria !== 'usage') {
      startDate = this.getStartUTCDate(params.startDate, 0);
      endDate = this.getEndUTCDate(params.endDate);
    }
    let url = '';
    if (group) {
      // regarding CCL-71577 app group story
      url = `${environment.CCO_REPORTS_BASE_URL}reports/topapplicationgroups?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}`;
    } else {
      url = `${environment.CCO_REPORTS_BASE_URL}reports/topapplications?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}&groupApplications=${group}`;
    }
    return this.httpClient.get<T>(url);
  }

  makeIsoDate(value: any): any {
    let a = value.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  getISODate(dt: any): any {
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

  public getAppTraffic(params: any): any {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);

    let url = `${environment.CCO_REPORTS_BASE_URL}timeseries?org=${this.orgId}&tenant=0&granularity=1hour&startTime=${startDate}&endTime=${endDate}&output=rate&direction=both&groupBy=application&count=${params['limit']}`;

    return this.httpClient.get(url);
  }

  public getTopSubdata<T>(params: any, module?: any): Observable<T> {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    let limit = params.limit ? params.limit : 10;
    let direction = params.directionSelected ? params.directionSelected : 'both';
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate, 'topSubscribers');

    if (criteria !== 'usage') {
      startDate = this.getStartUTCDate(params.startDate, 0);
      endDate = this.getEndUTCDate(params.endDate);
    }

    let url = `${environment.CCO_REPORTS_BASE_URL}/reports/topsubscribers?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}`;
    let locationParams = '';
    if (module === 'location' && params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += "&location=" + element
      });
      url = `${url}${locationParams}`;
    }
    else {
      locationParams = ''
    }

    let applicationParams = '';
    if (module === 'application' && params['applicationsSelected']?.length > 0) {
      params['applicationsSelected'].forEach((element) => {
        applicationParams += "&application=" + element
      });
      url = `${url}${applicationParams}`;
    }
    else if (params['applicationGroupSelected']?.length > 0) {
      params['applicationGroupSelected'].forEach((element) => {
        applicationParams += `&applicationgroup=${element}`
      });
      url = `${url}${applicationParams}`;
    }
    else {
      applicationParams = ''
    }

    let eliminateUnknown = '';
    if (module === 'location' && params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    return this.httpClient.get<T>(url);
  }

  public getPowerUsers<T>(params: any, page?: string): Observable<T> {
    let date = new Date();
    let monthCount = params.periodSelected ? parseInt(params.periodSelected) : -1;
    let firstDay = new Date(date.getFullYear(), date.getMonth() + monthCount, 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0)
    let startDate = this.getISODate(firstDay);
    let endDate = this.getISODate(lastDay);

    let direction = params.directionSelected ? params.directionSelected : 'both';
    let minPeak = parseInt(params.peakRateFrom) > 0 ? (parseInt(params.peakRateFrom) * (1024 * 1024)) : 0;
    let maxPeak = parseInt(params.peakRateTo) > 0 ? (parseInt(params.peakRateTo) * (1024 * 1024)) : 0;
    // let minPeak = params.peakRateFrom >= 0 ? `${params.peakRateFrom}` : '';
    // let maxPeak = params.peakRateTo >= 0 ? `${params.peakRateTo}` : '';
    let granularity = '24hour'

    startDate = this.getStartUTCDate(firstDay, 0);
    endDate = this.getEndUTCDate(lastDay);

    let url = `${environment.CCO_REPORTS_BASE_URL}reports/powerusers?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&direction=${direction}&minPeak=${minPeak}&maxPeak=${maxPeak}`;
    return this.httpClient.get<T>(url);
  }

  getDatePrevMonth(monthCount: any) {
    let date = new Date();
    // let firstDay = new Date(date.getFullYear(), date.getMonth() + monthCount, 1);
    // let lastDay = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth() + monthCount, 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0)

    return {
      start: firstDay,
      end: lastDay
    }
  }

  getGranularity(startDate: any, endDate: any, reportType = '', criteriaType = '') {
    let granularity = '';
    if (reportType == 'traffic') {
      let diff = moment(endDate).diff(moment(startDate), "hour")
      let dayDiff = moment(endDate).diff(moment(startDate), "days")
      if (criteriaType != 'usage') {
        granularity = (diff <= 72 && dayDiff <= 3) ? '1min' : (dayDiff <= 31 && diff > 72) ? '1hour' : '24hour'
      }
      else {
        granularity = (diff <= 24) ? '1hour' : '24hour'
      }
    }
    if (reportType == 'topSubscribers' || reportType == 'topApplications' || reportType == 'topLocations') {
      let diff = moment(endDate).diff(moment(startDate), "hour")
      granularity = (diff <= 72) ? '1hour' : '24hour';
    }
    return granularity;
  }

  checkSameDate(params) {
    let date1 = new Date(params.startDate).setHours(0, 0, 0, 0);
    let date2 = new Date(params.endDate).setHours(0, 0, 0, 0);
    if (date1 == date2) {
      return true;
    }
    return false;
  }

  getStartDate(dt: any, hour: any, diff: any) {
    let d = new Date(dt);

    if (diff === 3 && hour < 48 && hour >= 24) {
      d.setDate(new Date(d).getDate() + 1);
    } else if (diff === 3 && hour >= 48) {
      d.setDate(new Date(d).getDate() + 2);
    }

    if (diff === 2 && hour >= 24) {
      d.setDate(new Date(d).getDate() + 1);
    }

    if (hour >= 48) {
      hour = hour - 48;
    } else if (hour >= 24) {
      hour = hour - 24;
    }
    let year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let hr = hour > 9 ? hour : '0' + hour;
    let date = `${year}-${month}-${day}T${hr}:00:00Z`;
    return date;
  }

  getEndDate(dt: any, hour: any, diff: any) {
    let d = new Date(dt);

    if (diff == 3 && hour <= 48 && hour > 24) {
      d.setDate(new Date(d).getDate() - 1);
    } else if (diff == 3 && hour <= 24) {
      d.setDate(new Date(d).getDate() - 2);
    }

    if (diff == 2 && hour <= 24) {
      d.setDate(new Date(d).getDate() - 1);
    }

    if (hour === 24 || hour === 48 || hour === 72) {
      d.setDate(new Date(d).getDate() + 1);
      hour = 0;
    }

    if (hour >= 48) {
      hour = hour - 48;
    } else if (hour >= 24) {
      hour = hour - 24;
    }
    let year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    let hr = hour > 9 ? hour : '0' + hour;
    let date = `${year}-${month}-${day}T${hr}:00:00Z`;
    return date;
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

  getISOStartEndDate(dt: any, end?: boolean, addHours?: number): any {
    let d = new Date(dt);
    let today = new Date();
    if (!end) {
      //let hrsToAdd = addHours ? addHours : 0;
      let hrsToAdd = 0;
      d.setHours(0 + hrsToAdd, 0, 0, 0);
    } else {
      d.setHours(23, 59, 0, 0);
    }
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

    if (end) {
      let selectedDate = new Date(d);
      if (selectedDate > today) {
        hr = `${new Date().getUTCHours()}`;
        min = `${new Date().getUTCMinutes()}`;
      }
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
    //returns 12AM UTC of day
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
    //returns 12AM UTC of Next day of End date
    let d = new Date(dt);
    d.setDate(new Date(d).getDate() + 1);
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

}
