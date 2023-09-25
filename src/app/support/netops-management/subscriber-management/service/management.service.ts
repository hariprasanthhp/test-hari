import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  discoveredDeviceInfo: any;
  deviceModels: any = {};
  selectedDeviceHis: any = {};
  constructor(private http: HttpClient, private Sso: SsoAuthService) { }

  addSubscriber(orgId, request) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/subscriber?${ID}`, request);
  }

  editSubscriber(orgId, subscriberId, request) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`, request);
  }

  deleteSubscriber(orgId, subscriberId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.delete(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`);
  }

  deleteDevice(orgId, subscriberId, deviceId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.delete(`${environment.SUPPORT_URL}/subscriber/${subscriberId}/devices/${deviceId}?${ID}`);
  }

  updateDevice(orgId, subscriberId, deviceList) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}/devices?${ID}deviceList=${deviceList}`, "");
  }


  addDevice(request) {
    return this.http.post(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record`, request);
  }

  updateDeviceBySubscriber(request) {
    return this.http.post(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record`, request);
  }

  getDeviceInfo(orgId, deviceId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${ID}deviceId=${deviceId}`);
  }

  GetDiscoveredDevices_static(orgId, memberInfo: any) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member?${ID}memberInfo=${memberInfo}`);
  }

  getDialPlanList(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-dp/dial-plan?${ID}`);
  }

  deleteUnassociated(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.delete(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${serialNumber}`)
  }

  replaceDevice(orgId, subscriberId, oldDeviceId, newDeviceId, params?: any) {
    const ID = this.Sso.getOrg(orgId);
    let url = '';

    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }

    if (query) {
      return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}/devices/${oldDeviceId}?${query}`, {});
    } else {
      return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}/devices/${oldDeviceId}?${ID}newDeviceId=${newDeviceId}`, {});
    }


  }

  unassociateAndDelete(orgId, serialNumber, subId, deviceId?: any, params?: any) {
    const ID = this.Sso.getOrg(orgId);
    let url = '';

    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }

    if (query) {
      url = `${environment.SUPPORT_URL}/device/delete?${query}`;
    } else if (deviceId) {
      url = `${environment.SUPPORT_URL}/device/delete?${ID}deviceId=${deviceId}&subscriberId=${subId}`;
    } else {
      url = `${environment.SUPPORT_URL}/device/delete?${ID}serialNumber=${serialNumber}&subscriberId=${subId}`;
    }


    return this.http.delete(url);
  }

  getStaticGroupMembers(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member?${ID}`);
  }

  unassoDeleteFounApi(orgId, systemId, deleteCIQorSMB?) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.delete(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemId}${deleteCIQorSMB ? '&deleteCiqUser=true' : ''}`);
  }

  setDiscoveredDeviceInfo(info) {
    this.discoveredDeviceInfo = info || {};
  }

  getDiscoveredDeviceInfo() {
    return this.discoveredDeviceInfo || {};
  }

  getedgesuiteData(orgId, subscriberId, iqEnabled?: boolean) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${subscriberId}`);
  }

  setDeviceModels(org, models) {
    this.deviceModels[org] = models ? models : [];
  }

  getDeviceModels(org) {
    return this.deviceModels[org] ? this.deviceModels[org] : [];
  }

  callRestApi(endpoint, filters?) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }

  getSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/services`);
  }

  setSelectedDeviceInfo(historyData) {
    sessionStorage.setItem('selectedSubHistInfo', JSON.stringify(historyData.state));
  }
  getSelectedDeviceInfo() {
    return sessionStorage.getItem('selectedSubHistInfo');
  }
}
