import { Injectable, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportServiceService implements OnChanges {

  API_URI = `${environment.SUPPORT_URL}/device-summary`;
  API_URI2 = `${environment.SUPPORT_URL}`;

  serialNo;
  orgId;

  constructor(
    private http: HttpClient,
    private ssoService: SsoAuthService
  ) { }

  ngOnChanges() {
    this.serialNo = this.ssoService.getSerialNo();
    this.orgId = this.ssoService.getOrgId();

    this.getXsdlDetails(this.serialNo, this.orgId);
  }

  getResetVoice(orgId, serialNumber, index) {
    const ID = this.ssoService.getOrg(orgId);
    return this.http.put(`${this.API_URI}/voice/reset/${index}?${ID}serialNumber=${serialNumber}`, '').pipe(
      catchError(this.handleError)
    );
  }
  getRestartVoice(orgId, serialNumber, index) {
    const ID = this.ssoService.getOrg(orgId);
    return this.http.put(`${this.API_URI}/voice/restart/${index}?${ID}serialNumber=${serialNumber}`, '').pipe(
      catchError(this.handleError)
    );
  }

  getXsdlDetails(serialNo, orgId) {
    const ID = this.ssoService.getOrg(orgId);
    return this.http.get(`${this.API_URI2}/device-ts/service/xdsl?${ID}serialNumber=${serialNo}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getGfastData(serialNo, orgId) {
    const ID = this.ssoService.getOrg(orgId);
    return this.http.get(`${this.API_URI2}/device-ts/gfast?${ID}serialNumber=${serialNo}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    return throwError(error);
  }

  getAsmData(uuid, oiName) {
    return this.http.get(`${environment.API_BASE_URL}cnap/invmgr/subscriber/${uuid}?ont-interface-name=${oiName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
