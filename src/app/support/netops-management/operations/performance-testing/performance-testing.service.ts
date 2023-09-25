import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service'

@Injectable({
  providedIn: 'root'
})
export class PerformanceServiceService {

  constructor(
    private http: HttpClient,
    private sso: SsoAuthService
  ) { }

  GetPerformanceDataGrid(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest?${ID}`);
  }

  GetServerDetails(designatedASNsOnly) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/ooklaServer`);
  }

  save(params: any): any {
    const ID = this.sso.getOrg(this.sso.getOrgId())
    return this.http.post(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest?${ID}`, params);
  }

  delete(_id: any): any {
    return this.http.delete(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest/${_id}`);
  }

  suspend(_id: any): any {
    return this.http.put(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest/${_id}/suspend`, {});
  }

  resume(_id: any): any {
    return this.http.put(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest/${_id}/resume`, {});
  }

  view(_id: any): any {
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest/${_id}`);
  }

  update(params: any): any {
    return this.http.put(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest/${params['_id']}`, params);
  }

  getPerfTestByName(name) {
    const ID = this.sso.getOrg(this.sso.getOrgId())
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/cafIITest?${ID}name=${name}`);
  }

  checkdeviceCafCapabilityBySN(sn) {
    const ID = this.sso.getOrg(this.sso.getOrgId())
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/cafCapability?${ID}deviceSn=${sn}`);
  }

  checkdeviceBySN(sn) {
    const ID = this.sso.getOrg(this.sso.getOrgId())
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/checkdevice?${ID}deviceSn=${sn}`);
  }


  download(testId) {
    const ID = this.sso.getOrg(this.sso.getOrgId())
    return this.http.get(`${environment.SUPPORT_URL}/netops-perf-testing/testResult/zip?${ID}testId=${testId}`);
  }

}
