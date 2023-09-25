import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
@Injectable({
  providedIn: 'root'
})
export class EndpointManagementService {

  baseUrl: string;
  orgId: number;
  options: any;
  correlator: string;
  flowEndpoint: string;
  private isDev = false;
  flowDataSync = new BehaviorSubject({flowDataTab:true}); //to initialise the configuration tab while redirecting from flowdata
  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.faAdminCorrelatorURL;
    this.correlator = 'correlator';
    this.flowEndpoint = 'flowendpoint';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = { headers: headers };

  }

  getCount(orgId): any {

    let url = `${this.baseUrl}${this.flowEndpoint}/count?org-id=${orgId}`;
    return this.httpClient.get(url);
  }

  getLists<T>(orgId, page?: number, size?: number): Observable<T> {
    if (page == undefined) {
      page = 0;
    }
    if (size == undefined) {
      size = 10;
    }
    let url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${page}&pagesize=${size}`;
    return this.httpClient.get<T>(url);
  }
  getListsDev<T>(orgId, mappedBy: string, page?: number, size?: number): Observable<T> {

    if (page == undefined) {
      page = 0;
    }
    if (size == undefined) {
      size = 10;
    }
    const url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${page}&pagesize=${size}&mappedby=${mappedBy}`;
    return this.httpClient.get<T>(url);
  }

  AddIP(url: string) {
    return this.httpClient.post(url, {}, this.options);
  }

  // EndpointDelete<T>(url: string, param) {
  //   return this.httpClient.delete<T>(url, param)
  // }

  EndpointDelete(url: any): any {
    // if (isAssigned) {
    //   return this.httpClient.request('DELETE', url, {
    //     body: param
    //   });
    // }
    //  else {
      return this.httpClient.delete(url);
    // }

  }

  NonAssignedEndpointDelete(url: any): any {
    return this.httpClient.delete(url);
  }

  getOrg(orgId): any {
    let url = `${environment.faAdminURL}organization?org-id=${orgId}`;
    return this.httpClient.get(url);
  }

  updateOrgPUT(orgId, params) {
    let url = `${environment.faAdminURL}organization?org-id=${orgId}`;
    return this.httpClient.put(url, params, this.options);
  }

  /* CCL-42319 */
  updateOrgPatch(orgId, params):Observable<any>{
    let url = `${environment.faAdminURL}organization?org-id=${orgId}`;
    return this.httpClient.patch(url, params, this.options);
  }

  createOrg(orgId, params) {
    let url = `${environment.faAdminURL}organization?org-id=${orgId}`;
    return this.httpClient.post(url, params, this.options);
  }

  updateManagement(orgId, params) {
    let url = `${environment.faAdminCorrelatorURL}assigned/subscriber?org-id=${orgId}`;
    return this.httpClient.put(url, params, this.options);
  }

  public Export<T>(orgId): Observable<T> {
    return this.httpClient.post<T>(`${environment.faAdminCorrelatorURL}assigned/subscriber/export?org-id=${orgId}`, {})
  }

  /*   getAssignedCount(orgId): any { CCL-33173
      let url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&whereclause=mapped_by%20ilike%20%27%25ass%25%27%20AND%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27&count=true`;
      return this.httpClient.get(url);
    }
  
    getAssigned(orgId, page): any {
      let url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&pagenumber=${page}&pagesize=1000&whereclause=mapped_by%20ilike%20%27%25ass%25%27%20AND%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27`;
      return this.httpClient.get(url);
    } */

  getAssignedCount(orgId): any {
    const url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&mappedby=ASSIGNED&count=true`;
    return this.httpClient.get(url);
  }

  getAssigned(orgId, page): any {
    const url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${page}&pagesize=1000&mappedby=ASSIGNED`;
    return this.httpClient.get(url);
  }

  importAssigned<T>(params, orgId): Observable<T> {
    return this.httpClient.post<T>(`${environment.faAdminCorrelatorURL}assigned/subscriber/import?org-id=${orgId}`, params);
  }

  getAggregatedGroups(orgId, aggGrp): any {
    let url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=0&pagesize=100&agggroup=${aggGrp}`;
    return this.httpClient.get(url);
  }

  add1MinuteAggregation(orgId, value) {
    let url = `${environment.faAdminURL}organization/allow1minaggregation?enable=${value}&org-id=${orgId}`;
    return this.httpClient.post(url, {});
  }

  addUnmappedIdAggregation(orgId, value) {
    let url = `${environment.faAdminURL}organization/allowunmapped?enable=${value}&org-id=${orgId}`;
    return this.httpClient.post(url, {});
  }

  getDelay(ORG_ID) {
    return this.httpClient.get(`${environment.API_BASE_URL}flow-realtime/lateflows?orgId=${ORG_ID}&tenant-id=0`).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Return obseravle with an error message;
    return throwError(error);
  }

 getMappedcount(ORG_ID) {
  return this.httpClient.get(`${environment.faAdminCorrelatorURL}flowendpoint/count?discovered=true&org-id=${ORG_ID}`)
 }
 
getUnmappedcount(ORG_ID){
return this.httpClient.get(`${environment.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${ORG_ID}&source=true`)
}

}
