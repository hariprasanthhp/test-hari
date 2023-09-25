import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";
import { BackgroundSiteScanModel } from "../model/background-site-scan.model";
import { getBackgroundSiteScan, updateBackGroundSiteScan } from "./endpoint";

@Injectable({
  providedIn: 'root'
})

export class BackgroundSiteScanService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }

  getAutositeScanStatus(orgId: string): Observable<BackgroundSiteScanModel> {
    const params = new HttpParams()
    // .set('orgId', orgId)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get<BackgroundSiteScanModel>(getBackgroundSiteScan, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  updateAutoSiteScanStatus(body: BackgroundSiteScanModel, orgId: string): Observable<any> {
    const params = new HttpParams()
    // .set('orgId', orgId)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.put(updateBackGroundSiteScan, body, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}