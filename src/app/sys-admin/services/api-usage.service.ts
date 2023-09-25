import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUsageService {
  private baseURL = environment.API_BASE;
  public apiQuotaDetails = "retrieve/quota/values"
  constructor(
    private httpClient: HttpClient
  ) { }

  public getaApiQuotaDetails(orgId: any) {
    return this.httpClient.get(`${this.baseURL}/v1/retrieve/quota/values/${orgId}`);
  }

  public getOrgUsageStatus(orgId: any) {
    return this.httpClient.get(`${this.baseURL}/v1/org/admin/orgstats/${orgId}`);
  }
}
