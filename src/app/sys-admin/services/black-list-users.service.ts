import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    //'X-Calix-Username': 'admin@calix.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BlackListUsersService {

  baseUrl: string;
  options: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.CALIX_ADMIN_BASE_URL + 'dpu';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'X-Calix-Username': 'admin@calix.com'
    });
    this.options = { headers: headers };
  }

  getBlacklistUsers<T>(): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/list`, httpOptions);
  }

  updateBlacklistUsers<T>(params): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}`, params, httpOptions)
  }

  searchBlacklistUser<T>(username): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${username}`, httpOptions);
  }

  ReactivatetUser<T>(username): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}/${username}`, httpOptions);
  }


  getBlacklistUsersByOrgId<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${environment.CALIX_ADMIN_BASE_URL}org/${orgId}/dpu/list`, httpOptions);
  }

  updateBlacklistUsersByOrgId<T>(params, orgId): Observable<T> {
    return this.httpClient.put<T>(`${environment.CALIX_ADMIN_BASE_URL}org/${orgId}/dpu`, params, httpOptions)
  }

  ReactivatetUserByOrgId<T>(username, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${environment.CALIX_ADMIN_BASE_URL}org/${orgId}/dpu/${username}`, httpOptions);
  }
}
