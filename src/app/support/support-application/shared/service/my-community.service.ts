import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyCommunityService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  getMicrosites(micrositeId) {
    return this.http.get(`${environment.API_BASE_URL}/mycommunityiq/bsp-provider/microsite?micrositeId=${micrositeId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getRadiusStatus() {
    return this.http.get(`${environment.API_BASE_URL}csc/partner/feature/eleven/health`);
  }

  getMyCommunityStatus(orgId, subId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/edge-suites?${ID}subscriberId=${subId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  resetMyCommPasswrd(orgId, subId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/edge-suites/mycommunityiq/subscriber/password/reset-email?${ID}subscriberId=${subId}`, {}).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  myCommWelcomeMail(orgId, subId: string, communityId) {
    const ID = this.sso.getOrg(orgId);
    const community = communityId == 'All' ? '' : `&micrositeId=${communityId}`;
    return this.http.post(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/edge-suites/mycommunityiq/subscriber/community/welcome-email?${ID}subscriberId=${subId}${community}`, {}).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getSubscriberInfo(orgId, subId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-summary/${subId}?${ID}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  GetOnboardedDevices(inpParam) {
    const params = new HttpParams()
      .set("providerId", inpParam.providerId)
      .set("subscriber", inpParam.subscriber)
      .set("limit", inpParam.limit)
      .set("pageNumber", inpParam.pageNumber)

    return this.http.get(`${environment.SUPPORT_URL}/partner/report/eleven/deviceAuthentications?`, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  GetOnboardedDevicesApi(inpParam) {
    const params = new HttpParams()
      .set("providerId", inpParam.providerId)
      .set("subscriber", inpParam.subscriber)
      .set("limit", inpParam.limit)
    // .set("pageNumber", inpParam.pageNumber)
    return this.http.get(`${environment.SUPPORT_URL}/partner/report/eleven/deviceAuthentications?providerId=${inpParam.providerId}&subscriber=${encodeURIComponent(inpParam.subscriber)}&limit=${inpParam.limit}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }



  private handleError(error) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
