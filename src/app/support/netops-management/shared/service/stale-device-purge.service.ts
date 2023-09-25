import { Observable, throwError } from 'rxjs';
import {
  getStaleDevicePurgePolicy, createStaleDevicePurgePolicy, listLogStaleDevicePurgePolicy,
  logsCountStaleDevicePurgePolicy, suspendResumePolicyById, updateStaleDevicePurgePolicy
} from './endpoint';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { StaleDevicePurgeModel } from '../model/stale-device-purge.model';
import { ExcLogListStaleDeviceModel } from '../model/exc-log-list-stale-device.model';
import { UtilityClass } from './utility-class'
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})

export class StaleDevicePurgeService {

  constructor(private http: HttpClient, private sso: SsoAuthService) {
  }

  //get policy
  getStaleDevicePurgePolicy(orgId: string): Observable<StaleDevicePurgeModel[]> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<StaleDevicePurgeModel[]>(getStaleDevicePurgePolicy, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  createStaleDevicePurgePolicy(body: StaleDevicePurgeModel): Observable<StaleDevicePurgeModel> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    // if (this.sso.getOrg(orgId)) {
    //   params.set("orgId", orgId)
    // }
    body.maxInactiveDays = +body.maxInactiveDays;
    return this.http.post<StaleDevicePurgeModel>(createStaleDevicePurgePolicy, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  updateStaleDevicePurgePolicy(body: StaleDevicePurgeModel, policyId: string): Observable<StaleDevicePurgeModel> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    // if (this.sso.getOrg(orgId)) {
    //   params.set("orgId", orgId)
    // }
    body.maxInactiveDays = +body.maxInactiveDays;
    return this.http.put<StaleDevicePurgeModel>(updateStaleDevicePurgePolicy + "/" + policyId, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  //get policy exc logs
  getexcLogStaleDevicePurgePolicy(policyId: string, skip?: number, limit?: number): Observable<ExcLogListStaleDeviceModel> {
    const params = new HttpParams()
      .set('policyId', policyId)
    if (skip) {
      params.append("skip", skip.toString())
    } if (limit) {
      params.append("limit", limit.toString());
    }
    return this.http.get<ExcLogListStaleDeviceModel>(listLogStaleDevicePurgePolicy, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  //get policy log count
  getLogCountStaleDevicePurgePolicy(policyId: string): Observable<any> {
    const params = new HttpParams()
      .set('policyId', policyId);
    return this.http.get<any>(logsCountStaleDevicePurgePolicy, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  suspendStaleDevicePurgePolicyById(policyId: string, orgId: string): Observable<any> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.put(suspendResumePolicyById + "/" + policyId + "/suspend", "", { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  resumeStaleDevicePurgePolicyById(policyId: string, orgId: string): Observable<any> {
    const params = new HttpParams()
    // .set('orgId', orgId);
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.put(suspendResumePolicyById + "/" + policyId + "/resume", "", { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getAllTimeZone() {
    let arr = new UtilityClass();
    return arr.timeZone;
  }

  getDaysOfMonth() {
    let arr = new UtilityClass();
    return arr.daysOfMonth;
  }

  getDaysOfWeek() {
    let arr = new UtilityClass();
    return arr.daysOfWeek;
  }

  getFrequencyList() {
    let arr = new UtilityClass();
    return arr.frequency;
  }
  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}
