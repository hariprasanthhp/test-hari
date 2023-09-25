import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFoundationService {

  constructor(
    private http: HttpClient,
  ) { }

  updateSettings(orgId, request) {
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?orgId=${orgId}`;
    return this.http.put(url, request);
  }

  getSettings(orgId) {
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?orgId=${orgId}`;
    return this.http.get(url);
  }

  updateIQSuitesConfigs(orgId, request) {
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/iq-suites?orgId=${orgId}`;
    return this.http.put(url, request);
  }

  getIQSuitesConfigs(orgId) {
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/iq-suites?orgId=${orgId}`;
    return this.http.get(url);
  }
}
