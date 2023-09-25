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
export class LocationReportApiService {
  orgId: any;
  constructor(
    private httpClient: HttpClient,
    private sso: SsoAuthService,
    private router: Router
  ) {
    this.orgId = this.sso.getOrganizationID(this.router.url);
  }

  makeIsoDate(value: any): any {
    let a = value.split('.');
    let b = a[0].split(":");
    b.pop();
    return b.join(':') + ':00Z';
  }

  public getAppTraffic(params: any): any {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate);
    startDate = this.getStartUTCDate(params.startDate, 0);
    endDate = this.getEndUTCDate(params.endDate);

    let url = `${environment.CCO_REPORTS_BASE_URL}/timeseries?org=${this.orgId}&tenant=0&granularity=1hour&startTime=${startDate}&endTime=${endDate}&output=rate&direction=both&count=${params['limit']}&groupBy=application`;

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=` + element;
      });
      url = `${url}${locationParams}`;
    }
    else {
      locationParams += '';
    }

    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    return this.httpClient.get(url);
  }

  public getMonthlyUsageByApp<T>(params: any): Observable<T> {
    let date = this.getMonthlyUsageDates();
    let startDate = date.startDate;
    let endDate = date.endDate;

    let url = `${environment.CCO_REPORTS_BASE_URL}/reports/monthlyusagebyapplication?org=${this.orgId}&startTime=${startDate}&endTime=${endDate}&count=5&direction=${params.directionSelected}`;

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=` + element;
      });
      url = `${url}${locationParams}`;
    }
    else {
      locationParams += '';
    }

    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    return this.httpClient.get<T>(url);
  }

  public getSubDistributions<T>(params: any): Observable<T> {
    let firstDay = new Date(params.monthSelected).toISOString();
    let lastDay = this.getEndOfMonth(params.monthSelected).toISOString();
    let granularity = '1month';

    let same = this.checkSameDate(params);
    let startDate: string | Date = new Date(firstDay);
    let endDate: string | Date = new Date(lastDay);
    if (same) {
      startDate = this.getISOStartEndDate(startDate);
      endDate = this.getISOStartEndDate(endDate, true);
    } else {
      startDate = this.getISOStartEndDate(startDate, false);
      endDate = this.getISOStartEndDate(endDate, true);
    }

    let url = `${environment.CCO_REPORTS_BASE_URL}/reports/subscriberdistribution?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&direction=${params['directionSelected']}&intervals=<5G,5G-20G,20G-40G,40G-50G,50G-100G,100-250G,>250G&aggregate=${params['aggregateSelected']}`;

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=` + element;
      });
      url = `${url}${locationParams}`;
    }
    else {
      locationParams += '';
    }

    return this.httpClient.get<T>(url);
  }

  public getMonthlyUsageByService<T>(params: any): Observable<T> {
    let granularity = '1month';
    let date = this.getMonthlyUsageDates();
    let startDate = date.startDate;
    let endDate = date.endDate;

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=${element}`
      });
    }
    //  locationParams = '&location=33034a5f-e3ed-4970-9575-5dbeaf5cdf39'
    let url = `${environment.CCO_REPORTS_BASE_URL}timeseries?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=usage&direction=${params.directionSelected}&groupApplications=true&groupBy=application${locationParams}`;

    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    return this.httpClient.get<T>(url);
  }

  public getTraffic<T>(params: any, module?): Observable<T> {
    let startDate: string | Date = new Date(params.startDate);
    let endDate: string | Date = new Date(params.endDate);
    let criteria = params.criteriaSelected ? params.criteriaSelected : 'usage';
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);
    let granularity = this.getGranularity(startDate, endDate, "traffic", criteria);

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
        granularity = '1min';
        params.APIStartDate = startDate;
        params.APIendDate = endDate;
      }
    }
    else if (criteria == 'usage') {
      startDate = this.getISOStartOfDay(params.startDate);
      endDate = this.getISOEndOfDay(params.endDate);
    }

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=${element}`
      });
    }

    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location'
    }

    let url = `${environment.CCO_REPORTS_BASE_URL}timeseries?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&direction=both${locationParams}${eliminateUnknown}`;
    if (module && module == 'applications') {
      let appParams = '';
      if (params['applicationsSelected'] && !params['applicationsSelected'].includes("All")) {
        params['applicationsSelected'].forEach((element) => {
          appParams += `&application=${element}`
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
      // regarding CCL-71576 app group story
       url = `${environment.CCO_REPORTS_BASE_URL}reports/topapplicationgroups?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}`;
    } else {
       url = `${environment.CCO_REPORTS_BASE_URL}reports/topapplications?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&count=${limit}&direction=${direction}&groupApplications=${group}`;
    }
    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=` + element;
      });
      url = `${url}${locationParams}`;
    }

    return this.httpClient.get<T>(url);
  }

  getData(url: any): any {
    return this.httpClient.get(url);
  }

  makeIsoDateZero(value: any): any {
    let a = value.split('.');
    let b = a[0].split("T");
    b.pop();
    return b.join(':') + 'T00:00:00Z';
  }
  getMaxDailyRate(params: any) {
    let locationParams = '';
    if (params['locationsSelected'] && !params['locationsSelected'].includes("All")) {
      params['locationsSelected'].forEach((element) => {
        locationParams += `&location=${element}`
      });
    }

    let startDate = this.getISODate(params.startDate);
    let endDate = new Date(params.startDate);
    endDate.setHours(endDate.getHours() + 24);
    endDate = this.getISODate(endDate);
    let granularity = '24hour';

    let url = `${environment.CCO_REPORTS_BASE_URL}reports/maxrate?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}${locationParams}`;
    if (params['eliminateUnknownSelected'] == 'yes') {
      url = `${url}&eliminateUnknown=subscriber`;
    }

    let eliminateUnknown = '';
    if (params['type'] && params['type'] === 'location') {
      eliminateUnknown = '&eliminateUnknown=location';
      url = `${url}${eliminateUnknown}`;
    }

    return this.httpClient.get(url);
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

  getISOLocalStartEndDate(dt: any, end?: boolean, addHours?: number): any {
    let d = new Date(dt);
    let today = new Date();
    if (!end) {
      //let hrsToAdd = addHours ? addHours : 0;
      let hrsToAdd = 0;
      d.setHours(0 + hrsToAdd, 0, 0, 0);
    } else {
      d.setHours(23, 59, 0, 0);
    }
    let year = d.getFullYear();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    let hr = `${d.getHours()}`;
    let min = `${d.getMinutes()}`;

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    if (end) {
      let selectedDate = new Date(d);
      if (selectedDate > today) {
        hr = `${new Date().getHours()}`;
        min = `${new Date().getMinutes()}`;
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


  getStartOfMonth(dat) {
    let date = new Date(dat);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }

  getEndOfMonth(dat) {
    let date = new Date(dat);
    //let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;

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


  getMonthlyUsageDates() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear() - 1, date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    let startDate: string | Date = new Date(firstDay);
    let endDate: string | Date = new Date(lastDay);
    startDate = this.getISOStartOfDay(startDate);
    endDate = this.getISOEndOfDay(endDate);

    return { startDate, endDate }
  }

}
