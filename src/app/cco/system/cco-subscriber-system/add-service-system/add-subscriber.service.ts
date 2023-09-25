import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddSubscriberService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }
  private showCountStatus = new BehaviorSubject<boolean>(false);
  public showCountStatus$ = this.showCountStatus.asObservable();

  public subsSystemStep = new Subject<any>();

  associateDevice(req, subid, systemid) {
    return this.http.post(`${environment.FOUNDATION_SERVICES_URL}/subscribers/${subid}/devices?deviceId=${systemid}`, req);
  }

  deleteAndDisassociatedDevice(orgId: any, systemId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemId}`);
  }
  DeleteONT(serialNumber) {
    return this.http.delete(`${environment.API_BASE_URL}/cnap/invmgr/discoveredonts/${serialNumber}`)
  }
  disassociateDevice(subid: any, systemId: any) {
    return this.http.delete(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subid}/devices/${systemId}`);

  }

  GetSubscriberData(orgId, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}queryByLocationId=false`);
  }

  deleteSubscriber(subscriberId: any, orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`);
  }

  getDeleteAndFactoryreset(orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?${ID}`);
  }
  checkSubscriberCommunity(id, orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/subscriber?${ID}subscriberId=${id}`)
  }
  AddSubscriberData(orgId, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/subscriber?${ID}`, request);
  }

  performSearch(orgId, filter, pageNumber, pageSize): Observable<any> {
    const params = new HttpParams()
      // .set("orgId", orgId)
      .set("filter", filter || "")
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
    if (this.sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-search`, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

  UpdateSubscriberData(orgId, request, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`, request);
  }

  removeNull = (obj) => {

    Object.keys(obj).forEach(key =>
      (obj[key] && typeof obj[key] === 'object') && this.removeNull(obj[key]) ||
      (obj[key] === '' || obj[key] === null) && delete obj[key]
    );
    return obj;
  };

  updateEdgeSuitsData(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }
    return this.http.put(url, params);
  }
  callRestApi(endpoint, filters?) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  getDetailedSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}?includeDeviceData=false&includeDecommissionedDevices=false`);
  }

  getDialPlan(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-dp/dial-plan?${ID}`)
  }

  getSubscribersSystemList(systemInfo, iqEnabled?: boolean): Observable<any> {
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems?`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }

    if (iqEnabled) {
      url = `${url}&includeEnabledStatus=true`;
    }
    return this.http.get(url);
  }
  saveServiceData(subId, request) {
    let url = `${environment.FOUNDATION_SERVICES_URL}/subscribers/${subId}/services${request._id?('/'+request._id):''}`,method = (request._id || (Object.keys(request).length === 1 && request.hasOwnProperty('_id')) ? 'put' : 'post');
    request = Object.assign({},request)
    delete request._id;
    return Object.keys(request).length ? this.http[method](url, request) : this.http.delete(url);
  }

  UpdateServiceData(subId, request) {
    return this.http.put(`${environment.COC_SERVICES_ACTIVATION_URL}/subscribers/${subId}`, request);
  }

  updateSubsSystemStepInfo(data) {
    this.subsSystemStep.next(data);
  }
  factoryReset(orgId, params) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/factory-reset?${ID}`, params)
  }
  doReboot(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/device-systools/reboot?${ID}serialNumber=${serialNumber}`, {})
  }
  doRebootforont(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.API_BASE_URL}/cnap/invmgr/discoveredonts/${serialNumber}/reset?forced=true`, {})
  }
  redoServic(params) {
    return this.http.post(`${environment.COC_SERVICES_ACTIVATION_URL}/retry`, params)
  }
  afterOntReboot(serialNumber) {
    return this.http.get(`${environment.API_BASE_URL}nfa/onts?fsanMac=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }
  getBWProfile(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile?${ID}`);

  }

  getServicesStatus(subId) {
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/subscribers/${subId}/services/status`);
  }

  getAllDatafSubscriber(orgId: any, subId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-summary/${subId}?${ID}`);
  }

  getProvisionrecord(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${ID}deviceId=${systemId}`);
  }
  getDeviceInfo(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${systemId}/deviceinfo`);
  }
  GetVlanMode(dataplan) {
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceTemplates?name=${dataplan}`);
  }
  updateEnableApp(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/iq-suites/container?${ID}systemId=${systemInfo.sn}`;
    return this.http.put(url, params);
  }
  getOntDeviceStatus(serialNo) {
    return this.http.get(`${environment.API_BASE_URL}nfa/onts?offset=0&limit=10&fsanMac=${serialNo}`).pipe(
      catchError(this.handleError)
    );
  }

  fetchAmdins(type?) {
    if (type == 'All' || type == '' || type == 'undefined') {
      return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData`).pipe(
        catchError(this.handleError)
      )
    } else {
      return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/orgAdminData?serviceType=${type}`).pipe(
        catchError(this.handleError)
      )
    }
  }
  getSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/services`);
  }

  deleteWarningSubscriber(orgId: any, subscriberId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/servify-contract?${ID}subscriberId=${subscriberId}`);
  }

  getGeomapAddress(subscriberId: any) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscribers/${subscriberId}/geo-location`);
  }
  updateGeomapAddress(subscriberId: any) {
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscribers/${subscriberId}/geo-location/update`, {});
  }
  GetInterface(name?){
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?name=${name}&profileDetails=true`);
  }
  GetServiceDefinition(name?){
    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions?serviceType=${name}`);
  }
  GetServiceProfile( name) {

    return this.http.get(`${environment.COC_SERVICES_ACTIVATION_URL}/serviceTemplates/type?type=${name}`).pipe(
      catchError(this.handleError)
    );
  }
  GetCscService(){
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile`);
  }
 
}
