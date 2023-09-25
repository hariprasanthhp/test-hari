import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoundationManageService {
  metaData: any = {};


  constructor(
    private http: HttpClient,
    private sso: SsoAuthService
  ) { }
  public staticGroupSubject = new Subject<any>();
  private showCountStatus = new BehaviorSubject<boolean>(false);
  public showCountStatus$ = this.showCountStatus.asObservable();

  updateServiceData(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/rg-service?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }
    return this.http.put(url, params);
  }

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
  updateEdgeSuitsDataCOC(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites?${ID}subscriberId=${systemInfo}`;
    return this.http.put(url, params);
  }

  performSearch(orgId, filter, pageNumber, pageSize): Observable<any> {
    const params = new HttpParams()
      //.set("orgId", orgId)
      .set("filter", filter || "")
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-search`, { params }).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(error);
  }

  showCount(val: boolean) {
    this.showCountStatus.next(val);
  }
  swapNewSystem(orgId, params) {
    const ID = this.sso.getOrg(orgId);
    let cscurl = `${environment.SUPPORT_URL}/device/swap?${ID}isReloadSSID=true`
    return this.http.put(cscurl, params);
  }

  updateNewSystem(orgId: any, params: any, skipSSIDLoad = false) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.SUPPORT_URL}/device/swap?${ID}`;
    if (skipSSIDLoad) {
      params[`skipSSIDLoad`] = true;
    }
    return this.http.put(url, params);
  }

  AddSystemSubscriberData(orgId: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    const systemsubscriberurl = `${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}`
    return this.http.post(systemsubscriberurl, params);
  }
  UpdateSystemSubscriberData(orgId: any, params: any, systemInfo) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }
    return this.http.put(url, params);
  }
  disassociateDevice(orgId: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/disassociate?${ID}`, params);
  }
  deleteAndDisassociatedDevice(orgId: any, systemId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemId}`);
  }
  deleteWarningSubscriber(orgId: any, subscriberId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/servify-contract?${ID}subscriberId=${subscriberId}`);
  }
  deleteSubscriber(subscriberId: any, orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.delete(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`);
  }
  getSubscribersSystemList(orgId, systemInfo, iqEnabled?: boolean): Observable<any> {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}`;
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
  getSystemStatusData(orgId, systemId, iqEnabled?: boolean) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemId}&includeEnabledStatus=true`);
  }
  getedgesuiteData(orgId, subscriberId, iqEnabled?: boolean) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}subscriberId=${subscriberId}&includeEnabledStatus=true`);
  }
  AddSubscriberData(orgId, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/subscriber?${ID}`, request);
  }

  UpdateSubscriberData(orgId, request, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}`, request);
  }

  GetSubscriberData(orgId, subscriberId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber/${subscriberId}?${ID}queryByLocationId=false`);
  }

  UpdateSystemInfo(orgId: any, params: any, systemInfo) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    }
    return this.http.put(url, params);
  }

  callRestApi(endpoint, filters?) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  getDeviceGroupCount(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group/count?${ID}`)
  }
  getDeviceGoupList(orgId, limit) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group?${ID}skip=0&limit=${limit}`);
  }
  getRadioStatus(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${systemId}/wifi/radioSummaries`);
  }
  getProvisionrecord(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${ID}deviceId=${systemId}`);
  }

  updateStaticGroupsData(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/static-group-memberships?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }
    return this.http.put(url, params);
  }

  getModeFeature(orgId, modelName) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.CALIX_URL}/support/device/feature-properties?${ID}modelName=${modelName}`);
  }
  getSearchResult(orgId, system) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/subscriber-search?${ID}filter=device:${system}&pageNumber=1&pageSize=1`)
  }
  getDeviceInfo(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${systemId}/deviceinfo`);
  }
  checkSwapStatus(system,orgId){
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/replacing?orgId=${orgId}&systemId=${system}`);
  }
  gerArloSmartData(userId) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}feature/arlo/devices?userId=${userId}`)
  }
  deleteArloSmartData(userId, deviceId) {
    return this.http.delete(`${environment.FOUNDATION_BASE_URL}feature/arlo/device?userId=${userId}&deviceId=${deviceId}`)
  }
  getDialPlan(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-dp/dial-plan?${ID}`)
  }
  getRegIdInstance(orgId, regId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/deviceInfo?${ID}registrationId=${regId}`);
  }

  fetchMetaData(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.API_BASE_URL}calix/support/device/feature-properties?${ID}serialNumber=${serialNumber}`);
  }

  getMetaData(serialNumber) {
    return this.metaData.hasOwnProperty(serialNumber) ? this.metaData[serialNumber] : false;
  }

  setMetaData(serialNumber, metaData, reset = false) {
    reset ? this.metaData = {} : this.metaData[serialNumber] = metaData;
  }

  getServicesOfSubscriber(orgId, subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/services?summaryOnly=true`);
  }

  associateDevice(orgId: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/associate?${ID}`, params);
  }
  getDeleteAndFactoryreset(orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?${ID}`);
  }
  DeleteAndFactoryreset(orgId: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/delete-and-factory-reset?${ID}`, params);
  }
  getCommandIqOfSubscriber(orgId: any, subId, serialNo?) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.SUPPORT_URL}/subscriber-summary/${subId}?${ID}`
    if (serialNo) {
      url = `${url}ontSerialNumber=${serialNo}`
    }

    return this.http.get(url);
  }
  getCommandIqOfSystem(orgId: any, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/unassociated-device-summary?${ID}serialNumber=${systemId}`);
  }

  saveSubscriberSystem(params: any) {
    return this.http.post(`${environment.SUPPORT_URL}/subscriber-provisioning/provisioning-record`, params);
  }

  getStaticGroupData(orgId, systemId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}/subscriber-systems/static-group-memberships?${ID}systemId=${systemId}`);
  }

  getEdgeSuitesData(orgId: any, systemInfo: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites?${ID}`;
    if (systemInfo && systemInfo.sn) {
      url = `${url}systemId=${systemInfo.sn}`;
    } else if (systemInfo && systemInfo.subscriberId) {
      url = `${url}subscriberId=${systemInfo.subscriberId}`;
    }
    return this.http.get(url);
  }

  removeNull = (obj) => {

    Object.keys(obj).forEach(key =>
      (obj[key] && typeof obj[key] === 'object') && this.removeNull(obj[key]) ||
      (obj[key] === '' || obj[key] === null) && delete obj[key]
    );
    return obj;
  };

  updateSystemServiceData(orgId, systemId, params) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemId}`, params);
  }

  getDeviceGoupCount(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group/count?${ID}`);
  }

  getDetailedSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}?includeDeviceData=false&includeDecommissionedDevices=false`);
  }

  getSubscriberSystemList(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/devices`);
  }

  addSubscriberSystemList(subId, sysId) {
    return this.http.post(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/devices?deviceId=${sysId}`, {});
  }

  getBWProfile(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile?${ID}`);

  }

  updateEnableApp(orgId: any, systemInfo: any, params: any) {
    const ID = this.sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/iq-suites/container?${ID}systemId=${systemInfo.sn}`;
    return this.http.put(url, params);
  }

  getRadiosummary(orgId: any, sysId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${sysId}/wifi/radioSummaries`)
  }

  getSubscriberServices(subId) {
    return this.http.get(`${environment.FOUNDATION_SERVICES_URL}subscribers/${subId}/services`);
  }
  getPasspointStatus(orgId, fsan) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/passpoint?${ID}systemId=${fsan}`);
  }
  getsmallBizStatus(orgId, fsan) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/smallbiziq?${ID}systemId=${fsan}`);
  }
  getsmallBizStatusCOC(orgId, fsan) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/smallbiziq?${ID}subscriberId=${fsan}`);
  }
  getPasspointcocStatus(orgId, fsan) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/passpoint?${ID}subscriberId=${fsan}`);
  }

  deleteCommunitySubscriber(orgId: any, subscriberId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/subscriber?${ID}subscriberId=${subscriberId}`)
  }
  getONTIpaddress(orgId, serialNo) {
    return this.http.get(`${environment.CMC_API_BASE_URL}/search/prioritySearch?filter=${serialNo}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getONTIpAddresswithAggGroup(agggroup, orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.faAdminCorrelatorURL}flowendpoint?agggroup=${agggroup}&assigned=false&count=false&mappedby=NONE&orderby=name&org-id=${orgId}&pagenumber=0&pagesize=1000&sortdirection=asc`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getOntDetails(card, ont) {
    let url = `${environment.API_BASE_URL}cnap/invmgr/devices/${card}/state/details?onuid=${ont}`;
    return this.http.get(url);
  }
  getAsmData(uuid,name,val?){
    let url = val?`${environment.API_BASE_URL}cnap/invmgr/subscriber/${uuid}?fsan=${name}`:`${environment.API_BASE_URL}cnap/invmgr/subscriber/${uuid}?ont-interface-name=${name}`;
    return this.http.get(url);
  }
}
