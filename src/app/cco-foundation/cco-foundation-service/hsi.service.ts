import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SsoAuthService } from "src/app/shared/services/sso-auth.service";
import { HSIModel } from "../cco-foundation-model/hsi.model";
import { getHSI, postHSI, updateHSI } from "./endpoints";

@Injectable({
  providedIn: 'root'
})
export class HSIService {

  constructor(private http: HttpClient, private sso: SsoAuthService) {
  }


  // Read
  getHSI(): Observable<HSIModel> {
    const params = new HttpParams()
    return this.http.get<HSIModel>(getHSI, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  updateHSI(hsiModel: HSIModel): Observable<any> {
    return this.http.put<HSIModel>(updateHSI, hsiModel).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  postHSI(hsiModel: HSIModel): Observable<any> {
    return this.http.post<HSIModel>(postHSI, hsiModel).pipe(
      catchError(this.handleError) //  handle the error
    );
  }
  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}