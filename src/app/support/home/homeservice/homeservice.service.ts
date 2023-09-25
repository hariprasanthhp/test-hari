import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  // this.orgId = this.sso.getOrgId();

  constructor(private http: HttpClient, private Sso: SsoAuthService) { }
  getsubscriber(orgId, agentID) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/recentSubscribers" + `?agentId=${agentID}`).pipe(
      catchError(this.handleError)
    );
  }

  getActiveSubscriber(orgId) {
    return this.http.get(environment.FOUNDATION_BASE_URL + `dashboard/active-subscribers/${orgId}?limit=2`).pipe(
      catchError(this.handleError)
    );
  }

  getActiveRGs(orgId) {
    return this.http.get(environment.FOUNDATION_BASE_URL + `dashboard/system-status/${orgId}?limit=2`).pipe(
      catchError(this.handleError)
    );
  }

  getSystemReboot(orgId) {
    return this.http.get(environment.FOUNDATION_BASE_URL + `dashboard/system-reboot/${orgId}?limit=2`).pipe(
      catchError(this.handleError)
    );
  }

  getSpeedTestFailure(orgId) {
    return this.http.get(environment.FOUNDATION_BASE_URL + `dashboard/speed-test-failures/${orgId}?limit=2`).pipe(
      catchError(this.handleError)
    );
  }

  getPONoutage(startTime, endTime) {
    return this.http.get(environment.API_BASE_URL + `analytics-engine/alarmByName?startEpochTime=${startTime}&endEpochTime=${endTime}&interval=Days&alarmEventName=loss-of-pon`).pipe(
      catchError(this.handleError)
    );
  }

  getONTimpact(startTime, endTime) {
    return this.http.get(environment.API_BASE_URL + `analytics-engine/subscriberCount?startEpochTime=${startTime}&endEpochTime=${endTime}&interval=Days&alarmEventName=loss-of-pon`).pipe(
      catchError(this.handleError)
    );
  }

  getTotalImpacts() {
    return this.http.get(environment.API_BASE_URL + `analytics-engine/totalImpactedSubscribers`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    return throwError(error);
  }
}
