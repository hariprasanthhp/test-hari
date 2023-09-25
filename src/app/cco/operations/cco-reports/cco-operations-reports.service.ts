import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcoOperationsReportsService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getMappedEndpointCount(orgId): any {
    let url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&count=true`;
    // let url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&whereclause=%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27&count=true`;
    return this.httpClient.get(url);
  }

  getAllMappedEndpoints(orgId, page): any {
    let url = `${environment.faAdminCorrelatorURL}flowendpoint?org-id=${orgId}&pagenumber=${page}&pagesize=1000&orderby=name`
    // let url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&pagenumber=${page}&pagesize=1000&whereclause=%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27`;
    return this.httpClient.get(url);
  }

  getUnMappedIPsCount(orgId): any {
    let url = `${environment.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${orgId}`;
    // let url = `${environment.faAdminCorrelatorURL}flowendpoint/select?org-id=${orgId}&whereclause=%20NOT%20deleted%20AND%20ip_address%20is%20NOT%20null%20AND%20ip_address%20!=%20%27%27&count=true`;
    return this.httpClient.get(url);
  }

  getAllUnMappedIPs(orgId, page): any {
    let url = `${environment.faAdminCorrelatorURL}flowendpoint/unmapped?org-id=${orgId}&pagenumber=${page}&pagesize=1000`
    return this.httpClient.get(url);
  }
}
