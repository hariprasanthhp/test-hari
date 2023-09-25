import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointMappingSourceService {

  orgId: any;

  constructor(
    private http: HttpClient,
  ) {
  }

  getList(orgId): any {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.get(url);
  }

  save(params: any, orgId): any {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.post(url, params);
  }

  update(params: any, orgId): any {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.put(url, params);
  }

  delete(orgId): any {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.delete(url);
  }

  patchUpdate(params: any, orgId): any {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.patch(url, params);
  }

  createOrg(orgId, params) {
    let url = `${environment.FA_API_BASE_URL}config/organization?org-id=${orgId}`;
    return this.http.post(url, params);
  }

  getDHCPKeyConfiguration(orgId) {
    let url = `${environment.FA_API_BASE_URL}config/dhcpkey?org-id=${orgId}`;
    return this.http.get(url);
  }

  addDHCPKeyConfiguration(orgId, params) {
    let url = `${environment.FA_API_BASE_URL}config/dhcpkey?org-id=${orgId}`;
    return this.http.post(url, params);
  }

  updateDHCPKeyConfiguration(orgId, params) {
    let url = `${environment.FA_API_BASE_URL}config/dhcpkey?org-id=${orgId}`;
    return this.http.put(url, params);
  }

  deleteDHCPKeyConfiguration(orgId) {
    let url = `${environment.FA_API_BASE_URL}config/dhcpkey?org-id=${orgId}`;
    return this.http.delete(url);
  }
}
