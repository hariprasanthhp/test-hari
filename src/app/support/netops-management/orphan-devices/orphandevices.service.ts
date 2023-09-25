import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrphandevicesService {
  constructor(private http: HttpClient, private sso: SsoAuthService) { }


  public getOrphanDeviceData(params: any) {
    console.log(params);
    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }

    return this.http.get(`${environment.SUPPORT_URL}/device/orphan-device?${query}`);
  }
  public getOrphanDeviceDataCount(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/orphan-device/count?${ID}`);
  }

  assignToOrg(orgid, id) {
    const payload = {
      // "orgId": orgid,
      "_id": id
    }
    return this.http.put(`${environment.SUPPORT_URL}/device/assign-to-org`, payload);
  }


}
