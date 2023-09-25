import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  efficiencyChart: boolean = false;
  constructor(private http: HttpClient, private Sso: SsoAuthService) { }

  getdevices(serialnumber, orgId, isRefreshed = false) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/device/client/all" + `?${ID}serialNumber=${serialnumber}${isRefreshed ? '&forceRefresh=true' : ''}`).pipe(
      catchError(this.handleError)
    );
  }

  getDeviceDetails(orgId, serialnumber, mac) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/device/client/details" + `?${ID}serialNumber=${serialnumber}&stationMac=${mac}`).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error) {
    return throwError(error);
  }

  getClientScore(input) {
    const { sn, orgId, routerMac, stationMac, period, start, end, tz } = input;
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/qoe/subscriber-experience/client-efficiency-score?${ID}serialNumber=${sn}&router_mac=${routerMac}&station_mac_addr=${stationMac}&period=${period}&startTime=${start}&endTime=${end}&timeZoneOffset=${tz}`).pipe(
      catchError(this.handleError)
    );
  }
}
