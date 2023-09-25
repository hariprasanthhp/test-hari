import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectIqService {

  routerOnboardInfo = new BehaviorSubject({});
  currentAvailabilityInfo = new BehaviorSubject({});
  availabilityInfo = new Subject();
  subscribtionStatus = new Subject();


  constructor(
    private http: HttpClient,
    private Sso: SsoAuthService
  ) { }

  getNotification(notificationUserId) {
    return this.http.get(`${environment.SUPPORT_URL}/security/proof/notification?userId=${notificationUserId}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSecurityList(id) {
    return this.http.get(`${environment.SUPPORT_URL}/security/settings/list?userId=${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getAlerts(userId, alertType) {
    return this.http.get(`${environment.SUPPORT_URL}/notification/iq?userId=${userId}&iqType=protectIQ${alertType == 'All' ? '' : ("&type=" + alertType)}`, { observe: 'response' }).pipe(
      catchError(this.handleError)
    )
  }

  setSecuritySettings(body) {
    return this.http.post(`${environment.SUPPORT_URL}/security/settings/set`, body).pipe(
      catchError(this.handleError)
    )
  }

  addWhitelistDetails(body) {
    return this.http.post(`${environment.SUPPORT_URL}/security/log/whitelist/add`, body).pipe(
      catchError(this.handleError)
    )
  }

  getTrustList(whiteListType, id, selectedTab?, roleId?) {
    let url;

    if (whiteListType == '' || whiteListType == 'All') {
      if (selectedTab) {
        url = `${environment.SUPPORT_URL}/security/${selectedTab == "primary-network" ? "" : "rolepolicy/"}log/whitelist?userId=${id}${selectedTab == "primary-network" ? "" : roleId ? "&roleId=" + roleId : ""}`
      } else {
        url = `${environment.SUPPORT_URL}/security/log/whitelist?userId=${id}`
      }
    } else {
      if (selectedTab) {
        url = `${environment.SUPPORT_URL}/security/${selectedTab == "primary-network" ? "" : "rolepolicy/"}log/whitelist?userId=${id}&type=${whiteListType}${selectedTab == "primary-network" ? "" : roleId ? "&roleId=" + roleId : ""}`
      } else {
        url = `${environment.SUPPORT_URL}/security/log/whitelist?userId=${id}&type=${whiteListType}`
      }
    }
    //once the old component deleted we can use this API formate
    // if (whiteListType == '' || whiteListType == 'All') {
    //     url = `${environment.SUPPORT_URL}/security/${selectedTab == "primary-network" ? "":"rolepolicy/"}log/whitelist?userId=${id}${selectedTab == "primary-network" ? "" : roleId ? "&roleId=" + roleId : "" }`;
    // } else {
    //     url = `${environment.SUPPORT_URL}/security/${selectedTab == "primary-network" ? "" : "rolepolicy/"}log/whitelist?userId=${id}&type=${whiteListType}${selectedTab == "primary-network" ? "" : roleId ? "&roleId=" + roleId : "" }`;
    // }

    return this.http.get(url, { observe: 'response' }).pipe(
      catchError(this.handleError)
    )
  }

  removeItemInTrustList(sigId, id, selectedTab?, roleId?) {
    if (selectedTab) {
      return this.http.delete(`${environment.SUPPORT_URL}/security/log/whitelist/remove?userId=${id}&roleId=${1}&signatureId=${sigId}`).pipe(
        catchError(this.handleError)
      )
    } else {
      return this.http.delete(`${environment.SUPPORT_URL}/security/log/whitelist/remove?userId=${id}&signatureId=${sigId}`).pipe(
        catchError(this.handleError)
      )
    }

  }

  getSkipList(id) {
    return this.http.get(`${environment.SUPPORT_URL}/security/skip/station/list?userId=${id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateSkipStatus(body) {
    return this.http.post(`${environment.SUPPORT_URL}/security/skip/station/set`, body).pipe(
      catchError(this.handleError)
    )
  }

  setAllSkipStatus(body) {
    return this.http.post(`${environment.SUPPORT_URL}/security/skip/station/set/all`, body).pipe(
      catchError(this.handleError)
    )
  }

  getUserId(slNo) {
    return this.http.get(`${environment.SUPPORT_URL}/router/onboarded?sn=${slNo}`).pipe(
      catchError(this.handleError)
    )
  }

  getFeatureAvailability(id) {
    return this.http.get(`${environment.SUPPORT_URL}/feature/availability?userId=${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getDeviceStatus(srNo, name) {
    return this.http.get(`${environment.SUPPORT_URL}/device/app/status?fsn=${srNo}&appName=${name}`).pipe(
      catchError(this.handleError)
    )

  }

  setInstall(body) {
    return this.http.post(`${environment.SUPPORT_URL}/device/app/install`, body).pipe(
      catchError(this.handleError)
    )
  }

  setUnInstall(body) {
    return this.http.post(`${environment.SUPPORT_URL}/device/app/uninstall`, body).pipe(
      catchError(this.handleError)
    )
  }

  setEnabled(body) {
    return this.http.post(`${environment.SUPPORT_URL}/app/enablement/enable`, body).pipe(
      catchError(this.handleError)
    )
  }

  setUnEnabled(body) {
    return this.http.post(`${environment.SUPPORT_URL}/app/enablement/disable`, body).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  subscribeStatus(orgId, serviceName, locationId) {
    const ID = this.Sso.getOrg(orgId);
    locationId = locationId || '';
    const url = `${environment.SUPPORT_URL}/device/appServices/${serviceName}?${ID}subscriberLocationId=${encodeURIComponent(locationId)}`;
    return this.http.get(url);
  }

  subscribeStatuswithoutsubscriber(orgId, systemInfo) {
    const ID = this.Sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}systemId=${systemInfo}&includeEnabledStatus=true`;

    return this.http.get(url);
  }

  toggleAppSubscriptionwithoutsubscriber(orgId: any, systemInfo: any, params: any) {
    const ID = this.Sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites?${ID}systemId=${systemInfo}`;

    return this.http.put(url, params);
  }


  toggleAppSubscription(orgId, serviceName, locationId, toggleVal) {
    const ID = this.Sso.getOrg(orgId);
    locationId = locationId || '';
    const url = `/device/appServices/${serviceName}?${ID}subscriberLocationId=${encodeURIComponent(locationId)}`;
    return this.http.put(`${environment.SUPPORT_URL}${url}`, { 'subscribe': toggleVal });
  }

  tileStatus(orgId, serialNumber, locId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/suites/summary?${ID}serialNumber=${serialNumber}&subscriberId=${locId}`);
  }

  getArloAccount(orgId, snOrSubid, availInd) {
    const ID = this.Sso.getOrg(orgId);
    const suffixUrl = availInd == 1 ? `systemId=${snOrSubid}` : `subscriberId=${snOrSubid}`;
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems?${ID}${suffixUrl}&includeEnabledStatus=true`);
  }

  getArloOverallStatus() {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/arlo/health`);
  }

  getArloDevice(userId) {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/arlo/devices?userId=${userId}`);
  }

  updateArloDevice(deviceId) {
    return this.http.get(`${environment.SUPPORT_URL}/partner/feature/arlo/device/health?deviceId=${deviceId}`);
  }

  updateArloPostDevice(deviceId) {
    return this.http.post(`${environment.SUPPORT_URL}/partner/feature/arlo/device/health`, { deviceId: deviceId });
  }

  setEnableStatus(orgId, serialNumber, input) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/iq-suites/container?${ID}systemId=${serialNumber}`, input);
  }

  getUserEmail(subId) {
    return this.http.get(`${environment.API_BASE_URL}/admin/user/${subId}`).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  sendEmail([to, subject, content, replyTo]) {
    const inp = {
      to: to,
      subject: subject,
      content: content,
      replyTo: replyTo
    }
    return this.http.post(`${environment.SUPPORT_URL}/filemanage/email`, inp).pipe(
      catchError(this.handleError) //  handle the error
    );
  }

  pageErrorHandle(err: any) {
    if (typeof err === 'string' && err) {
      return err;
    }
    let errorInfo;
    if (err?.error?.errorDesc) {
      errorInfo = `${err?.error?.errorDesc}`;
    } else if (err.error != undefined && err.error != null && typeof err.error == 'string') {
      errorInfo = `${err.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error != undefined && typeof err.error.error == 'string') {
      errorInfo = `${err.error.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'string') {
      errorInfo = `${err.error.fault}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'object' && err.error.fault.faultstring != undefined && typeof err.error.fault.faultstring == 'string') {
      errorInfo = `${err.error.fault.faultstring}`;
    } else if (err.error && err.error.errorMessage) {
      errorInfo = err.error.errorMessage;
    }
    else if (err.statusText == 'Unknown Error' && err.status == '0') {
      // errorInfo = "Unknown Error - Please refresh the page"; // remove later
      errorInfo = "An unknown error has occurred. Refresh the page to try again";
    }
    else if (err.error != undefined) {
      errorInfo = `${err.error.message}`;
    }
    else {
      errorInfo = `${err.message}`;
    }
    return (errorInfo != 'undefined' && errorInfo.length) ? errorInfo : Object.values(this.flatten(err)).join(' - ');
  }

  traverseAndFlatten(currentNode, target, flattenedKey?) {
    for (var key in currentNode) {
      if (currentNode.hasOwnProperty(key)) {
        var newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = flattenedKey + '.' + key;
        }

        var value = currentNode[key];
        if (typeof value === "object") {
          this.traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey] = value;
        }
      }
    }
  }

  flatten(obj) {
    let flattenedObject = {};
    try {
      this.traverseAndFlatten(obj, flattenedObject);
    } catch (ex) {
      flattenedObject = {};
    }
    return flattenedObject;
  }

  getdevices(serialnumber, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + "/device/client/all" + `?${ID}serialNumber=${serialnumber}`).pipe(
      catchError(this.handleError)
    );
  }


  getSecurityListByRole(userId, roleId) {
    return this.http.get(`${environment.SUPPORT_URL}/security/rolepolicy/settings/list?userId=${userId}&roleId=${roleId}`).pipe(
      catchError(this.handleError)
    )
  }

  setSecuritySettingsByRole(body) {
    return this.http.post(`${environment.SUPPORT_URL}/security/rolepolicy/setting/set`, body).pipe(
      catchError(this.handleError)
    )
  }

  errorHandler(err: any) {
    /* if(err.status == 400){
      this.alertMessage = this.language.Bad_Request;
    }if(err.status == 498){
      this.alertMessage = this.language.token_invalid;
    }if(err.status == 499){
      this.alertMessage = this.language['need a token']
    }if(err.status == 500){
      this.alertMessage = this.language.Microservice_issues;
    } */
    if (err?.status === 401) {
      return 'Access Denied';
    } else if (err?.status === 504) {
      return 'This alert is already trusted and requires no further action.';
    } else if (err?.status) {
      return this.Sso.pageErrorHandle(err);
    }
  }

}
