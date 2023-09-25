import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    //'X-Calix-Username': 'admin@calix.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  public baseURL = environment.CALIX_ADMIN_BASE_URL;
  public orgBaseURL = environment.CALIX_ADMIN_ORG_BASE_URL;
  public org_id = environment.faAdminOrgId;

  constructor(private httpClient: HttpClient) {
  }

  public OrgsList<T>(): Observable<T> {
    return this.httpClient.get<T>(`${this.orgBaseURL}organizations`, httpOptions)
  }

  public AddOrg<T>(params: T): Observable<T> {
    return this.httpClient.post<T>(`${this.orgBaseURL}organizations`, params, httpOptions)
  }


  public DeleteOrg<T>(orgId: T): Observable<T> {
    return this.httpClient.delete<T>(`${this.orgBaseURL}organizations/${orgId}`, httpOptions)
  }

  public Entitlements<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.orgBaseURL}entitlements/cloud/all`, httpOptions)
  }

  public EntitlementsByOrgId<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.orgBaseURL}entitlements/${orgId}`, httpOptions)
  }


  callRestApi(endpoint, filters?) {
    return this.httpClient.get<any>(`${endpoint}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }

  public RoleData<T>(roleId): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}role/${roleId}`, httpOptions)
  }

  AddAdmin<T>(params: T, orgAdminRoleId): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}role/${orgAdminRoleId}/users`, params, httpOptions)
  }

  addEntitlements(url: any, params: any): any {
    return this.httpClient.post(url, params, httpOptions);
  }

  changeEntitlements(url: any, params: any): any {
    return this.httpClient.put(url, params, httpOptions);
  }

  public UsersListByOrgId<T>(orgId: number | string, count: number | string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/users?size=${count}`, httpOptions)
  }
}
