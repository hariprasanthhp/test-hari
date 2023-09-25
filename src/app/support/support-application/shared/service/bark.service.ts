import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarkService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }
  getBarkAccount(orgId: string, subId: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/edge-suites?${ID}subscriberId=${subId}&includeEnabledStatus=true`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  getBarkHealth() {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/bark/health`).pipe(
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
  // getBarkAccountSetup() {
  //   return {
  //     "userId": "52577c07-26e8-4988-8570-87392cb4d90f",
  //     "email": "test@calix.com",
  //     "firstName": "Augustine",
  //     "lastName": "Oh",
  //     "orgId": "testorgid",
  //     "planCode": "bark_premium",
  //     "planDesc": "Bark Premium",
  //     "status": "Not completed",
  //     "created": 1615290666631,
  //     "updated": 1615290667631
  //   }
  // }
  getBarkAccountSetup(userId: string) {
    {
      return this.http.get(`${environment.SUPPORT_URL}/partner/feature/bark/subscription?userId=${userId}`).pipe(
        catchError(this.handleError) //  handle the error
      );
    }

  }


  private handleError(error) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
