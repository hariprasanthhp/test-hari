import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportWifiService } from './support-wifi.service';

@Injectable({
  providedIn: 'root'
})
export class WifiSixSupportService implements Resolve<any> {

  deviceData: any = [];
  orgId: any;
  constructor(
    private router: Router,
    private service: SupportWifiService,
    public ssoService: SsoAuthService,
  ) {
    this.deviceData = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.deviceData = this.deviceData ? this.deviceData.filter(obj => obj.opMode && obj.opMode === 'RG') : [];
    this.orgId = this.ssoService.getOrgId();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (!this.deviceData.length || (this.deviceData[0] && !this.deviceData[0].serialNumber)) {
      return of({});
    } else {
      return this.service.wifiAvailability(this.orgId, this.deviceData[0].serialNumber);
    }
  }
}
