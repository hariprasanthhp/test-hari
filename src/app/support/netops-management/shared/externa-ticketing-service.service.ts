import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable()

export class ExternaTicketingServiceService {
  API_URI = `${environment.SUPPORT_URL}`;

  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  updateExternalticketDetails(Obj: any): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/call/calloutcome/extrefconfig/nisc`, Obj);
  }
  updatePutExternalticketDetails(Obj: any): Observable<any> {
    return this.http.put<any>(`${this.API_URI}/call/calloutcome/extrefconfig/nisc`, Obj);
  }

  externalticketDetails(orgId): Observable<any> {
    const ID = this.sso.getOrg(orgId);
    return this.http.get<any>(`${this.API_URI}/call/calloutcome/extrefconfig/nisc?${ID}`)
  }
  deleteExternalticketDetails(orgId): Observable<any> {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete<any>(`${this.API_URI}/call/calloutcome/extrefconfig/nisc?${ID}`)
  }
  testUrlExternalticketDetails(Obj: any): Observable<any> {
    return this.http.put<any>(`${this.API_URI}/call/calloutcome/extrefconfig/nisc/test`, Obj).pipe(
      catchError((error => {
        return throwError(error)
      })))
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}

// headers: {
//   'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
//   'X-Calix-AccessToken': this.sso.getAccessToken()
// }