import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    //'X-Calix-Username': 'admin@calix.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AddRoleService {

  public baseURL = environment.calixAdminURL;
  public org_id = environment.faAdminOrgId;
  public addRole: string;
  public addUsers: string;
  public users: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.addRole = this.baseURL + 'role';
    //this.addUsers = this.baseURL + 'role';
    this.users = this.baseURL + 'users';
  }

  public RoleAdd<T>(params: T): Observable<T> {
    return this.httpClient.put<T>(`${this.addRole}`, params, httpOptions)
  }

  public RoleUpdate<T>(params: T, roleId): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}role/${roleId}/info`, params, httpOptions)
  }

  public UsersCountByOrgId<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/users/_count`, httpOptions)
  }

  public UsersListByOrgId<T>(orgId, count): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}org/${orgId}/users?size=${count}`, httpOptions)
  }

  public RoleData<T>(roleId): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}role/${roleId}`, httpOptions)
  }

  public AddUsersByRoleId<T>(params: T, roleId): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}role/${roleId}/users`, params, httpOptions)
  }

  public AllPemissionsData<T>(appType): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}app/${appType}/scopes`, httpOptions)
  }

  public AddRolePermissions<T>(params: T, roleId): Observable<T> {
    return this.httpClient.post<T>(`${this.addRole}/${roleId}/perms`, params, httpOptions)
  }




}
