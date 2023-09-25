import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { SecureOnboardModel } from '../model/secure-onboard.model';
import { getSecureOnBoarding, updateSecureOnBoarding } from './endpoint';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})

export class SecureOnBoardingService {

  constructor(private http: HttpClient, private Sso: SsoAuthService) { }

  // Read
  getSecureOnBoarding(orgId: string): Observable<SecureOnboardModel> {
    const params = new HttpParams()
    // .set("orgId",orgId);
    if (this.Sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<SecureOnboardModel>(getSecureOnBoarding, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  updateSecureOnBoarding(body: SecureOnboardModel, orgId: string): Observable<SecureOnboardModel> {
    // body.orgId = orgId;
    if (this.Sso.getOrg(orgId)) {
      body.orgId = orgId;
    }
    return this.http.put(updateSecureOnBoarding, body).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
