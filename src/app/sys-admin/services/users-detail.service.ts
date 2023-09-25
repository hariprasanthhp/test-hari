import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
const httpOptions = {
  headers: new HttpHeaders({
    //'X-Calix-Username': 'admin@calix.com'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsersDetailService {
  public baseURL = environment.calixAdminURL;
  public org_id = environment.faAdminOrgId;
  public user: string;
  acl: string;
  roles: string;

  constructor(private httpClient: HttpClient, private Sso: SsoAuthService) {
    this.user = this.baseURL + 'user';
    this.acl = this.baseURL + 'useracl';
    this.roles = this.baseURL + `roles`;
  }

  public UpdatePasswordByUserId<T>(params: T, userId): Observable<T> {
    //Not working Now
    return this.httpClient.post<T>(`${this.user}/${userId}`, params, httpOptions)
  }

  public AclListByUsername<T>(username): Observable<T> {
    //Not A proper API
    return this.httpClient.get<T>(`${this.baseURL}/useracl/${username}`, httpOptions)
  }

  public UpdateAclListByUserEmail<T>(params: T, userMail, orgId: number | string): Observable<T> {
    //Not working Now
    const ID = this.Sso.getOrg(orgId);
    return this.httpClient.post<T>(`${this.acl}/${userMail}?${ID}`, params, httpOptions)
  }

  public RolesList<T>(): Observable<T> {
    return this.httpClient.get<T>(this.roles, httpOptions)
  }

  public RolesListByUserId<T>(userId): Observable<T> {
    return this.httpClient.get<T>(`${this.user}/${userId}/roles`, httpOptions)
  }

  public UpdateRolesListByUserId<T>(userId, rolesIds): Observable<T> {
    return this.httpClient.post<T>(`${this.user}/${userId}/roles/${rolesIds}`, {}, httpOptions)
  }


  callRestApi(endpoint, filters?) {
    return this.httpClient.get<any>(`${endpoint}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }

  public DeleteAclListByUserEmail<T>(username, orgId: number | string): Observable<T> {
    const ID = this.Sso.getOrg(orgId);
    return this.httpClient.delete<T>(`${this.baseURL}useracl/${username}?${ID}`, httpOptions)
  }

  public DeleteRolesListByUserId<T>(userId): Observable<T> {
    return this.httpClient.delete<T>(`${this.user}/${userId}/roles`, httpOptions)
  }

  public updateRolesListByGranteeUserId<T>(url: any): Observable<T> {
    return this.httpClient.post<T>(`${url}`, {}, httpOptions)
  }

  public deleteRolesListByGranteeUserId<T>(url): Observable<T> {
    return this.httpClient.delete<T>(`${url}`, httpOptions)
  }


}
