import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationReportApiService {

  options: any;
  orgId: any;
  constructor(
    private httpClient: HttpClient,
    private sso: SsoAuthService,
    private router: Router
  ) {
    this.orgId = this.sso.getOrganizationID(this.router.url);
  }

  public getTraffic<T>(params: any, module?): Observable<T> {
    console.log(params, "params")
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
      granularity = dayDiff <= 31 ? '1hour' : '24hour';
      if (diff <= 72 && dayDiff <= 3) {
        let d = new Date(params.startDate)
        startDate = this.getStartUTCDate(params.startDate, params.startTime);
        endDate = this.getStartUTCDate(d, params.endTime);
        granularity = '1min';
        params.APIStartDate = startDate;
        params.APIendDate = endDate;
      }
      if (params['locationsSelected'].length > 0 && !params['locationsSelected'].includes("All") && diff <= 72 && dayDiff <= 3) {
        granularity = '1hour';
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

    let url = `${environment.CCO_REPORTS_BASE_URL}timeseries?org=${this.orgId}&tenant=0&granularity=${granularity}&startTime=${startDate}&endTime=${endDate}&output=${criteria}&direction=both${locationParams}`;
    if (module && module == 'applications') {
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


  callRestApi(endpoint, filters?) {
    return this.httpClient.get<any>(`${endpoint}`, this.options)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
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

}
