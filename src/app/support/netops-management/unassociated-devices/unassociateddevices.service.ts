import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})
export class UnassociateddevicesService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }


  public getUnassociatedDeviceData(params: any) {
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

    return this.http.get(`${environment.SUPPORT_URL}/netops-report/devices-unlinked?${query}`);
  }
  public getUnassociatedDeviceDownload(paramsD: any) {
    console.log("params download", paramsD);
    let query = "";
    for (var key in paramsD) {
      console.log("key=", key)

      if (paramsD[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(paramsD[key]);
      }
    }
    return this.http.get(`${environment.SUPPORT_URL}/netops-report/devices-unlinked/download?${query}`)

  }

  public getUnassociatedDeviceDataCount(orgid) {
    const ID = this.sso.getOrg(orgid);
    return this.http.get(`${environment.SUPPORT_URL}/netops-report/devices-unlinked/count?${ID}`);
  }


}
