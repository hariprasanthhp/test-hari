import { Injectable } from '@angular/core';
import { SsoAuthService } from '../../shared/services/sso-auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhitelabelService {

  API = `${environment.AUTH_API_HOST}`;
  constructor(private ssoservice: SsoAuthService, private http: HttpClient,) { }

  setSpId() {
    return this.ssoservice.getSPID();
  }

  getInfo(spId) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
    return this.http.get(`${this.API}/usertype?spId=${spId}`, { headers });
  }

  whiteLabellist(spId:any):any {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('X-Calix-ClientID', environment.X_CALIX_CLIENTID);
    var accessToken = localStorage.getItem('calix.csc_token');
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + ' ' + accessToken
    });
    return this.http.get(environment.SP_API_BASE_URL + `/whitelabel/info?spId=${spId}`, {
      observe: 'response'
    })
    // return this.http.get(`https://dev.rgw.calix.ai/map/v1/admin/calix/whitelabel/info?spId=${spId}`,{
    //   headers: httpHeaders,
    //   observe: 'response'
    // });
  }

  whiteLabelinfo(spId) {

    return this.http.get(environment.SP_API_BASE_URL + `/whitelabel/info?spid=${spId}`)
  }
  spinfo(spId:any):any {
    var accessToken = localStorage.getItem('calix.csc_token');
    // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + accessToken);
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + ' ' + accessToken
    });
    return this.http.get(environment.SP_API_BASE_URL + `/whitelabel/info?spid=${spId}`, {
      observe: 'response'
    });
    // return this.http.get(`https://dev.rgw.calix.ai/map/v1/admin/calix/whitelabel/info?spId=${spId}`,{
    //   headers: httpHeaders,
    //   observe: 'response'
    // });
  }
  add(params: any): any {
    var accessToken = localStorage.getItem('calix.csc_token');
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + ' ' + accessToken
    });
    console.log(params);

    return this.http.put(environment.SP_API_BASE_URL + '/whitelabel/add', params);
    // return this.http.put('https://dev.rgw.calix.ai/map/v1/admin/calix/whitelabel/add', params, {
    //   headers: httpHeaders,
    //   observe: 'response'
    // });
  }


  update(params: any): any {
    var accessToken = localStorage.getItem('calix.csc_token');
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + ' ' + accessToken
    });
    return this.http.post(environment.SP_API_BASE_URL + '/whitelabel/update', params);
    // return this.http.post('https://dev.rgw.calix.ai/map/v1/admin/calix/whitelabel/update', params, {
    //   headers: httpHeaders,
    //   observe: 'response'
    // });
  }

  UpdateSupportInfo(params) {
    return this.http.put(`${environment.apiHost}/support/info`, params);
  }
  fetchSupportInfo(spid ) {
    return this.http.get(`${environment.apiHost}/support/info?spid=${spid}`);
  }
  DeleteSupportInfo() {
    return this.http.delete(`${environment.apiHost}/support/info`);
  }

  commandIqList(spId) {
    return this.http.get(environment.SP_API_BASE_URL + `/smb/whitelabel?spid=${spId}`, {
      observe: 'response'
    })
  }

  commandIqadd(params: any): any {
    return this.http.post(environment.SP_API_BASE_URL + '/smb/whitelabel', params);
  }

  commandIqUpdate(params: any): any {
    return this.http.put(environment.SP_API_BASE_URL + '/smb/whitelabel', params);
  }

  updateAppCustomName(param) {
    return this.http.post(`${environment.apiHost}/admin/application/custom/name`, param);
  }

  callRestApi(endpoint) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }
}
