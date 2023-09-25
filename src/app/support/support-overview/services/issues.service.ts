
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';


@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  issues: any;
  DeviceIsses: any;
  setIssues(issueData: any) {
    this.issues = issueData;
  }
  getIssues() {
    return this.issues;
  }

  setDeviceIssues(issues) {
    this.DeviceIsses = issues
  }
  getDeviceIssues() {
    return this.DeviceIsses;
  }

  constructor(private http: HttpClient, private Sso: SsoAuthService) { }

  getissues(orgId, serialNumber, SubscriberId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/subscriber/issues" + `?${ID}serialNumber=${serialNumber}&subscriberId=${SubscriberId}`).pipe(
      catchError(this.handleError)
    );
  }

  putissues(orgId: string, data) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/issues/all_issues?${ID}`, data).pipe(
      catchError(this.handleError));
    // return this.issuselist;

    //  return this.http.put(`${environment.SUPPORT_URL}/subscriber/issues/all_issues?${orgId}`, data).pipe(
    //   catchError(this.handleError)
    //   );
    //return this.http.get(environment.SUPPORT_URL+"/issues/all_issues"+`?${ID}serialNumber=${serialNumber}&subscriberId=${SubscriberId}`).pipe(

  }

  topologyValue(orgId: number, data) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(environment.SUPPORT_URL + "/subscriber/topology" + `?${ID}`, data).pipe(
      catchError(this.handleError)
    );
  }

  getClientDetails(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/device/client/all" + `?${ID}serialNumber=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    return throwError(error);
  }

  getQoeSummary(input) {
    const { sn, orgId, mac, period, start, end, tz } = input;
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/qoe/subscriber-experience/summary?${ID}serialNumber=${sn}&router_mac=${mac}&period=${period}&startTime=${start}&endTime=${end}&timeZoneOffset=${tz}`).pipe(
      catchError(this.handleError)
    );
  }
  rebootAndUpgradeEvent(orgId, sn) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-systools/rebootAndUpgradeEvent?${ID}serialNumber=${sn}`).pipe(
      catchError(this.handleError)
    );
  }

  getAverageScore(input) {
    const { sn, orgId, mac, period, start, end, tz } = input;
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/qoe/subscriber-experience/average-efficiency-score?${ID}serialNumber=${sn}&router_mac=${mac}&period=${period}&startTime=${start}&endTime=${end}&timeZoneOffset=${tz}`).pipe(
      catchError(this.handleError)
    );
  }

}