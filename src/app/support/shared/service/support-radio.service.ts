import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { String } from "aws-sdk/clients/appstream";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SupportRadioObjectModel } from "../models/support-radio-object.model";
import { getSSIDConfigList, getSSIDManagerList, updateSSIDConfigList } from "./endpoints";

@Injectable({
  providedIn: 'root'
})

export class SupportRadioService {

  constructor(private http: HttpClient) {
  }


  // Read
  getSSIDConfigList(orgId: string, serialNumber: string): Observable<SupportRadioObjectModel[]> {
    return this.http.get<SupportRadioObjectModel[]>
    (`${environment.SUPPORT_URL}${getSSIDConfigList.replace(/orgId/, orgId).replace(/serialNumber/, serialNumber)}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  
  fetchMetaDatavalues(userid: string): Observable<SupportRadioObjectModel[]> {
    return this.http.get<SupportRadioObjectModel[]>
    (`${environment.API_BASE_URL}csc/router/wifi/secondarynetwork/list?userId=${userid}`);
  }

  UpdateOldSSIDedit(orgId:String, serialNumber:string, data: SupportRadioObjectModel) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/ssidPool`, data).pipe(
      catchError(this.handleError));
  }
  
  deleteProfileSSID(orgid,serialNumber, eventid) {
    return this.http.delete(`${environment.SUPPORT_URL}/device/${orgid}/${serialNumber}/secondarynetwork/delete?eventId=${eventid}`);
  }

  updateSSIDConfigList(body: SupportRadioObjectModel, orgId: string, serialNumber: string) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/ssidPool`, body).pipe(
      catchError(this.handleError));
  }
  // updateSSIDConfigList(body: SupportRadioObjectModel, orgId: string, serialNumber: string) {
  //   return this.http.put(`${environment.SUPPORT_URL}/device/${updateSSIDConfigList.replace(/orgId/, orgId)
  //     .replace(/serialNumber/, serialNumber)}`, body).pipe(
  //     catchError(this.handleError) //  handle the error
  //   );
  // }

  getSSIDManagerList(orgId: string, serialNumber: string, isRefreshed = false): Observable<SupportRadioObjectModel[]> {
    const SSIDGetListUrl = `${environment.SUPPORT_URL}${getSSIDManagerList.replace(/orgId/, orgId).replace(/serialNumber/, serialNumber)}${isRefreshed ? '?forceRefresh=true' : ''}`;
    return this.http.get<SupportRadioObjectModel[]>(SSIDGetListUrl).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  fetchMetaDatavaluesNew(orgid, serialNumber, isRefreshed = false) {
    return this.http.get(`${environment.API_BASE_URL}csc/device/${orgid}/${serialNumber}/ssidPool${isRefreshed ? '?forceRefresh=true' : ''}`);
  }

  Savepasspharseauditlog(request) {
    //https://stage.api.calix.ai/v1/csc/useraudit/saveAuditLog
    return this.http.post(`${environment.API_BASE_URL}csc/useraudit/saveAuditLog`, request);
  }
  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

}