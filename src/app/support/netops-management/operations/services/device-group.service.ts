import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from "src/environments/environment";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service'


@Injectable({
  providedIn: 'root'
})
export class DeviceGroupService {


  constructor(
    private http: HttpClient,
    private sso: SsoAuthService
  ) { }



  getDeviceGoupList(orgId, limit = 50) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group?${ID}skip=0&limit=${limit}`);
  }
  getDeviceGroups(orgId, ID) {
    const Id_org = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group?${Id_org}&deviceId=${ID}`);
  }

  getEditDeviceGoupList(devicegrpid) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group/` + devicegrpid);
  }

  GetDeviceType(payload: any) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${payload}`);
  }

  getDiscoveredCount(payload: any) {
    //return this.http.get(`${environment.SUPPORT_URL}/netops-device/device/count?matcher=${payload}`);
    let params = {
      $matcher: payload
    }
    return this.http.put(`${environment.SUPPORT_URL}/netops-device/device/count`, params);

  }
  GetDiscoveredDevices(payload: any) {
    //return this.http.get(`${environment.SUPPORT_URL}/netops-device/device?matcher=${payload}`);

    let params = {
      matcher: payload
    }

    return this.http.put(`${environment.SUPPORT_URL}/netops-device/device`, params);
  }

  GetUnDiscoveredDevices_static(orgId, devicegrpid: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member/undiscovered/` + devicegrpid + `?${ID}`);
  }

  GetUnDiscoveredDevices_static_count(devicegrpid, orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member/undiscovered/count/` + devicegrpid + `?${ID}`);
  }

  GetDiscoveredDevices_static_count(devicegrpid, orgId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member/discovered/count/` + devicegrpid + `?${ID}`);
  }

  GetDiscoveredDevices_static(orgId, devicegrpid: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/static-group-member/discovered/` + devicegrpid + `?${ID}`);
  }




  // DeleteDeviceGoupList(orgId, devicegrpid) {
  //   return this.http.delete(`${environment.SUPPORT_URL}/netops-device/group/` + devicegrpid + `?${ID}`);
  // }


  DeleteDeviceGoupList(orgId, devicegrpid, forceDelete) {
    return this.http.delete(`${environment.SUPPORT_URL}/netops-device/group/` + devicegrpid + `?forceDelete=${forceDelete}`);
  }

  addDeviceGroup(orgId, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/netops-device/group?${ID}`, request);
  }

  UpdateDeviceGroup(orgId, devicegrpid, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/netops-device/group/` + devicegrpid + `?${ID}`, request);
  }

  getDeviceGoupCount(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group/count?${ID}`);

  }
  getDeviceGoupsearchCount(orgId, ID) {
    const Id_org = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group/count?${Id_org}deviceId=${ID}`);

  }

  getDeviceMemberCount(orgId, ID) {
    const Id_org = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/group-member/count?groupId=${ID}${Id_org}`);
  }

  getWorkflowsById(orgId, ID, filterOnBoot?) {
    const Id_org = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow?${Id_org}groupId=${ID}${filterOnBoot ? "&excludeOnBoot=true" : "&excludeOnBoot=false"}`);
  }

  pageErrorHandle(err: any) {
    let errorInfo;
    if (err.error != undefined && err.error != null && typeof err.error == 'string') {
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
    } else if (err.error != undefined) {
      errorInfo = `${err.error.message}`;
    } else {
      errorInfo = `${err.message}`;
    }

    let langfromapi = this.sso.getspecificlangliterals()
    errorInfo = errorInfo != 'undefined' && errorInfo && langfromapi[errorInfo] ? langfromapi[errorInfo] : errorInfo
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

  // getSubscriberInfo(orgId, subscriberId) {
  //   return this.http.get(`${environment.SUPPORT_URL}/subscriber-summary/${subscriberId}?${ID}`);
  // }

  // setSubscriberInfo(subscribrData) {
  //   this.subscriberInfo = subscribrData;
  // }

  // getStoredSubscriberInfo() {
  //   return this.subscriberInfo;
  // }
  GetwanAccessTypes(modelName) {
    return this.http.get(`${environment.CALIX_URL}support/device/feature-properties?modelName=${modelName}`)
  }
}
