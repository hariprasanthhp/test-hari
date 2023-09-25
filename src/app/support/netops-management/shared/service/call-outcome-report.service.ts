import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getCallOutcomeFilePath } from './endpoint';
import { getAuditReportFilePath } from './endpoint';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})

export class CallOutcomeReportService {

  constructor(private http: HttpClient, private Sso: SsoAuthService) { }

  getCallOutcomeFilePath(orgId: string, duration: string, timezone: string): Observable<any> {
    const params = new HttpParams()
      // .set('orgId', orgId)
      .set('duration', duration)
      .set('timezone', timezone)
    if (this.Sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(getCallOutcomeFilePath, { params, responseType: 'text' }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  getAuditReportFilePath(orgId: string, duration: string, timeZone: string): Observable<any> {
    const params = new HttpParams()
      // .set('orgId', orgId)
      .set('duration', duration)
      .set('timeZone', timeZone)
    if (this.Sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(getAuditReportFilePath, { params, responseType: 'text' }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}