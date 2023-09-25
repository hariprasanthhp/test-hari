import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkDevicesApiService {
  public baseURL = environment.faAdminURL;;
  public org_id = +localStorage.getItem('calix.org_id');

  //API
  private deviceDelete: string;
  private deviceUpdate: string;
  private export: string;
  private fa_import: string;
  constructor(private httpClient: HttpClient) {
    this.deviceDelete = this.baseURL + `device`;
    this.export = this.baseURL + `export/`;
    this.fa_import = this.baseURL + `fa_import/`;
    this.deviceUpdate = this.baseURL + `device`;
  }

  public DeviceList<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(this.baseURL + `device?org-id=${orgId}`)
  }
  public DeviceAdd<T>(reqBody: T, orgId): Observable<T> {
    return this.httpClient.post<T>(this.baseURL + `device?org-id=${orgId}`, reqBody)
  }
  public DeviceDelete<T>(id: T, orgId): Observable<T> {
    return this.httpClient.delete<T>(`${this.deviceDelete}/${id}?org-id=${orgId}`)
  }
  public DeviceUpdate<T>(id, reqBody: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.deviceUpdate}/${id}?org-id=${orgId}`, reqBody)
  }
  public Export<T>(module, orgId): Observable<T> {
    return this.httpClient.get<T>(`${this.export}${module}?org-id=${orgId}`)
  }
  public Import<T>(module, reqBody: T, orgId): Observable<T> {
    return this.httpClient.put<T>(`${this.fa_import}${module}?org-id=${orgId}`, reqBody)
  }
  public DeviceStatusList<T>(orgId): Observable<T> {
    return this.httpClient.get<T>(`${environment.FLOW_BASE_URL}metrics/reports/fcr/devicestatus?OrgId=${orgId}`);
  }
  public DeviceMatricSeries<T>(deviceIp: string, startTime: number, endTime: number, orgId): Observable<T> {
    let url = `${environment.FLOW_BASE_URL}metrics/timeseries?deviceIP=${deviceIp}&startTime=${startTime}&OrgId=${orgId}`
    if (endTime) {
      url = `${url}&endTime=${endTime}`
    }
    return this.httpClient.get<T>(url);
  }
  public GetPacketTimingData<T>(deviceIp: string, orgId): Observable<T> {
    let url = `${environment.FLOW_BASE_URL}metrics/timestats?deviceIP=${deviceIp}&OrgId=${orgId}`
    return this.httpClient.get<T>(url);
  }
}
