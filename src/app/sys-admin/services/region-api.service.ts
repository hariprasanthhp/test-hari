import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
    providedIn: 'root'
})
export class RegionApiService {
  public baseURL = environment.API_BASE;
  public OrgBaseURL = environment.CALIX_ADMIN_ORG_BASE_URL;
  public org_id = environment.faAdminOrgId;
  httpOptions = {
    headers: new HttpHeaders({
        // 'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
        // 'X-Calix-AccessToken':   this.sso.getAccessToken()
    })
   };

    constructor(private httpClient: HttpClient,private sso: SsoAuthService) { }

    public regionList<T>(url: string): Observable<T> {
      return this.httpClient.get<T>(`${this.baseURL}/v1/${url}`, this.httpOptions);
    }
    public regionAdd<T>(params: T): Observable<T> {
      return this.httpClient.post<T>(`${this.baseURL}/v1/cnap/invmgr/regions/`, params, this.httpOptions);
    }
    public regionUpdate<T>(params: T, uuid: string): Observable<T> {
      const headers = new HttpHeaders().set('Content-Type', 'text/plain');
      return this.httpClient.put<T>(`${this.baseURL}/v1/cnap/invmgr/regions/${uuid}`, params, {headers, responseType: 'text' as 'json'  });
    }
    public regionDelete<T>(uuid: string): Observable<T> {
      return this.httpClient.delete<T>(`${this.baseURL}/v1/cnap/invmgr/regions/${uuid}`, this.httpOptions);
    }
    public locationAdd<T>(params: T, uuid: string): Observable<T> {
      return this.httpClient.post<T>(`${this.baseURL}/v1/cnap/invmgr/regions/${uuid}/networkGroup`, params, {headers: new HttpHeaders({'Content-Type': 'text/plain'})});
    }
    public locationUpdate<T>(params: T, uuid: string, ngid: string): Observable<T> {
      const headers = new HttpHeaders().set('Content-Type', 'text/plain');
      return this.httpClient.put<T>(`${this.baseURL}/v1/cnap/invmgr/regions/${uuid}/networkGroup/${ngid}`, params, {headers, responseType: 'text' as 'json'  });
    }
    public locationDelete<T>(uuid: string, ngid: string): Observable<T> {
      return this.httpClient.delete<T>(`${this.baseURL}/v1/cnap/invmgr/regions/${uuid}/networkGroup/${ngid}`, this.httpOptions);
    }
    public regionListCount<T>(): Observable<T> {
      return this.httpClient.get<T>(`${this.baseURL}/v1/nfa/regions/details/count`, this.httpOptions);
    }
}
