import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServifyService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  getServifyInfo(orgId: string, subId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/edge-suites/servify-contract?${ID}subscriberId=${subId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getServifyClaims(userId: string) {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/servify/claims?userId=${userId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getServifyHealth() {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/servify/health`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getUserEmail(subId) {
    return this.http.get(`${environment.API_BASE_URL}/admin/user/${subId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  sendEmail([to, subject, content, replyTo]) {
    const inp = {
      to: to,
      subject: subject,
      content: content,
      replyTo: replyTo
    }
    return this.http.post(`${environment.SUPPORT_URL}/filemanage/email`, inp).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
