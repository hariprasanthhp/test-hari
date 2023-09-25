import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoundationHomeService {

  constructor(
    private http: HttpClient, private Sso: SsoAuthService
  ) { }

  getSubscriberSystemsModel(orgId, days?, cco?) {
    if (cco) {
      return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/system-model?productType=all&limit=${days ? days : 7}`);
    } else {
      return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/system-model?limit=${days ? days : 7}`);
    }
  }

  getSystemstatusChartData(orgId, days?) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/system-status?limit=${days ? days : 7}`);
  }
  getSystemTypeChartData(orgId, days?) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/system-type?limit=${days ? days : 7}`);
  }
  getCommandIqChartData(orgId, days?) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/ciq?days=${days ? days : 7}`);
  }
  getCommunityIQChartData(orgId, days?) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}dashboard/iqsuite?name=SMARTTOWNW&days=${days ? days : 7}`);
  }
  getHSI(orgId: string) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/hsi?${ID}`);
  }
}
