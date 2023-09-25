import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from './../../../../shared/services/sso-auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SupportRouterService {

  API_URI = `${environment.SUPPORT_URL}/device`;
  API_URI1 = `${environment.SUPPORT_URL}/device-systools`;
  xmldata: string;
  orgId: string;
  maxTemp: any = {};

  constructor(
    private http: HttpClient,
    private Sso: SsoAuthService
  ) {

  }

  getRouterDetails(orgId, serialNumber, route) {
    return this.http.get(`${this.API_URI}/${orgId}/${serialNumber}/${route}`).pipe(
      catchError(this.handleError)
    );
  }

  getTemperatureDetails(sn, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI}/thermal/temp?${ID}serialNumber=${sn}`)
      .pipe(catchError(this.handleError));
    // return this.http.get(`${this.API_URI}/router/thermal/temp?${ID}serialNumber=${sn}`)
    //   .pipe(catchError(this.handleError));
  }

  setMaxTempValue(val) {
    this.maxTemp = val;
  }

  getMaxTempValue(key) {
    return this.maxTemp[key];
  }

  updateDhcp(orgId, serialNumber, requestBody) {
    return this.http.put(`${this.API_URI}/${orgId}/${serialNumber}/dhcp`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  updateDmz(orgId, serialNumber, requestBody) {
    return this.http.put(`${this.API_URI}/${orgId}/${serialNumber}/dmz`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  updatePortForwarding(orgId, serialNumber, requestBody) {
    return this.http.put(`${this.API_URI}/${orgId}/${serialNumber}/portforwarding`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  createPortForwarding(orgId, serialNumber, requestBody) {
    return this.http.post(`${this.API_URI}/${orgId}/${serialNumber}/portforwarding`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  deletePortForwading(orgId, serialNumber, index) {
    return this.http.delete(`${this.API_URI}/${orgId}/${serialNumber}/portforwarding?index=${index}`).pipe(
      catchError(this.handleError)
    );
  }
  eventPost(serialNumber, orgId, skip, limit, requestBody) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI1}/event-history/status?${ID}serialNumber=${serialNumber}&limit=${limit}&skip=${skip}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }
  eventCount(serialNumber, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI1}/event-history/count?${ID}serialNumber=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }
  PostdeviceLog(serialNumber, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI1}/device-log?${ID}serialNumber=${serialNumber}`, {}).pipe(
      catchError(this.handleError)
    );
  }
  downloadDeviceLog(downloadsn, userName, password, downloadUrl) {
    return this.http.get(`${this.API_URI1}/device-log?&fsan=${downloadsn}&url=${downloadUrl}&username=${userName}&password=${password}`).pipe(
      catchError(this.handleError)
    );
  }
  getCLData(serialNumber, orgId, skip, limit) {
    const ID = this.Sso.getOrg(orgId);
    console.log('s94');
    return this.http.get(`${this.API_URI1}/communication-log/status?${ID}serialNumber=${serialNumber}&limit=${limit}&skip=${skip}&includeXmlText=true`).pipe(
      catchError(this.handleError)
    );
  }
  getCLCount(serialNumber, orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI1}/communication-log/count?${ID}serialNumber=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }
  getConnectivityStatus(orgId, serialNumber, ff = true) {
    // console.log("watching url : " +`${this.API_URI}/${orgId}/${serialNumber}/connectivitystatus`);
    return this.http.get(`${this.API_URI}/${orgId}/${serialNumber}/connectivitystatus?failFast=${ff}`).pipe(
      catchError(this.handleError)
    );
  }

  getConnectivityStatusNew(orgId, serialNumber, ff = true) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI}/status?${ID}serialNumber=${serialNumber}${!ff ? '&failFast=false' : ''}`).pipe(
      catchError(this.handleError)
    );
  }

  //Backup & Restore
  deviceBackup(orgId, requestBody) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI}-systools/backup?${ID}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }
  getBackup(orgId, requestBody) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI}-systools/file?${ID}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }
  deviceRestore(orgId, requestBody) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI}-systools/restore?${ID}`, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  getRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  public pingTraceRoute<T>(param, path): Observable<T> {
    return this.http.get<T>(`${environment.SUPPORT_URL}/device-ts/${path}`, { params: param })
  }

  getDataModel(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI}/data-model?${ID}serialNumber=${serialNumber}`).pipe(
      catchError(this.handleError)
    );
  }

  reloadDataModel(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${this.API_URI}/data-model?${ID}serialNumber=${serialNumber}&reload=true`, {}).pipe(
      catchError(this.handleError)
    );
  }

  loadDataModel(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI}/data-model?${ID}serialNumber=${serialNumber}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  loadinterfacearraydetails(oltid, ontSn) {

    return this.http.get(`${environment.API_BASE_URL}nfa/interfaces?system=${oltid}&fsan=${ontSn}`).pipe(
      catchError(this.handleError)
    );
  }
  loadoctetdetails(oltid, ontSn) {
    return this.http.get<any>(`${environment.API_BASE_URL}cnap/invmgr/interfaces/state?interfaceUuid=${oltid}&fsan=${ontSn}`).pipe(
      catchError(this.handleError)
    );

  }


  loadDataModeltest() {
    //orgId, serialNumber
    this.xmldata = "<interfaces-state><interface><name>CXNK00302CDF/g1</name><speed>1000000000</speed><statistics><in-octets>233091504</in-octets><out-octets>41987968</out-octets></statistics><ont-ethernet><status><port>g1</port><if-index>1002273</if-index></status><detail><oper-state>up</oper-state><power-state>ac-up</power-state><rate>1g</rate></detail><counters><onteth-counters><upstream-drop-events>0</upstream-drop-events><upstream-errors>0</upstream-errors><upstream-octets>1</upstream-octets><downstream-octets>1</downstream-octets></onteth-counters></counters><qos><cosq-profile>none</cosq-profile></qos><subscriber><statistics><dhcp><rx-dhcp-discover>0</rx-dhcp-discover><tx-dhcp-discover>0</tx-dhcp-discover></dhcp><diameter><tx-policy-intimate-request>0</tx-policy-intimate-request><rx-policy-intimate-ack>0</rx-policy-intimate-ack></diameter><radius><tx-accounting-start-request>0</tx-accounting-start-request><rx-accounting-start-response>0</rx-accounting-start-response></radius><procedure><primary-v4-ip-session-activation-attempts>0</primary-v4-ip-session-activation-attempts><primary-static-v4-ip-session-activation-attempts>0</primary-static-v4-ip-session-activation-attempts></procedure> </statistics></subscriber></ont-ethernet> </interface> <interface><name>CXNK00302CDF/g2</name><speed>1000000000</speed><statistics><in-octets>233091504</in-octets><out-octets>41987968</out-octets></statistics><ont-ethernet><status><port>g1</port><if-index>1002273</if-index></status><detail><oper-state>up</oper-state><power-state>ac-up</power-state><rate>1g</rate></detail><counters><onteth-counters><upstream-drop-events>0</upstream-drop-events><upstream-errors>0</upstream-errors><upstream-octets>4</upstream-octets><downstream-octets>2</downstream-octets></onteth-counters></counters><qos><cosq-profile>none</cosq-profile></qos><subscriber><statistics><dhcp><rx-dhcp-discover>0</rx-dhcp-discover><tx-dhcp-discover>0</tx-dhcp-discover></dhcp><diameter><tx-policy-intimate-request>0</tx-policy-intimate-request><rx-policy-intimate-ack>0</rx-policy-intimate-ack></diameter><radius><tx-accounting-start-request>0</tx-accounting-start-request><rx-accounting-start-response>0</rx-accounting-start-response></radius><procedure><primary-v4-ip-session-activation-attempts>0</primary-v4-ip-session-activation-attempts><primary-static-v4-ip-session-activation-attempts>0</primary-static-v4-ip-session-activation-attempts></procedure> </statistics></subscriber></ont-ethernet> </interface> </interfaces-state>"

    return this.xmldata;

  }
  factoryReset(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI1}/factory-reset?${ID}serialNumber=${serialNumber}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  doReboot(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${this.API_URI1}/reboot?${ID}serialNumber=${serialNumber}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  ontReboot(serialNumber) {
    return this.http.post(`${environment.API_BASE_URL}cnap/invmgr/discoveredonts/${serialNumber}/reset?forced=true`, {}).pipe(
      catchError(this.handleError)
    );
  }

  afterOntReboot(vendorId, serialNumber) {
    return this.http.get(`${environment.API_BASE_URL}nfa/onts?offset=0&limit=10&fsanMac=${(serialNumber)}`).pipe(
      catchError(this.handleError)
    );
  }

  connectPermission(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI1}/connect-permission?${ID}`).pipe(
      catchError(this.handleError)
    );
  }

  connectToDevice(orgId, serialNumber, ipVers) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${this.API_URI1}/connect-info?${ID}serialNumber=${serialNumber}&actionType=ConnectToDevice&ipVersion=${ipVers}&forceEncryption=true`).pipe(
      catchError(this.handleError)
    );  //&forceEncryption=true
  }

  getPingTraceroteWanInfo(orgId, serialNumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-summary/waninfo?${ID}serialNumber=${serialNumber}`);
  }

  getDeviceLAN<T>(orgId, serialNumber, featureName): Observable<T> {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get<T>(`${environment.SUPPORT_URL}/device-ts/LanHosts/list?${ID}serialNumber=${serialNumber}&featureNames=${featureName}`)
  }

  updateSoftware(orgId, request) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/device-upgrade/firmware-upgrade?${ID}`, request).pipe(
      catchError(this.handleError)
    );
  }
  getSoftwareVersionCount(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/sw/image/count?${ID}type=SW/FW%20Image`);
  }
  getSoftwareVersion(orgId, count, model?, eq?) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/sw/image?${ID}skip=0&limit=${count}&type=SW/FW%20Image&model=${model}&extendQuery=${eq}&orderby={"version":-1}`);
  }

  getLandPort(orgId, serialnumber) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/lanPorts?${ID}serialNumber=${serialnumber}`).pipe(
      catchError(this.handleError)
    );
  }

  routerReachableReset(orgId: any, request) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/factory-reset?${ID}`, request);
  }

  routerNotReachableReset(orgId: any, request) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.FOUNDATION_BASE_URL}subscriber-systems/backup?${ID}`, request);
  }

  getUpnp(orgId, sn) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/upnp?${ID}serialNumber=${sn}`).pipe(
      catchError(this.handleError)
    );
  }

  putUpnp(orgId, sn, req) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/device/upnp?${ID}serialNumber=${sn}`, req).pipe(
      catchError(this.handleError)
    );
  }
  getFirewallInfo(orgId, sn) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/firewall?${ID}serialNumber=${sn}`).pipe(
      catchError(this.handleError)
    );
  }
  updateFirewallInfo(orgId, sn, req) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/device/firewall?${ID}serialNumber=${sn}`, req).pipe(
      catchError(this.handleError)
    );
  }
  submitIpv6Info(orgId, sn, req) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/device/dhcpv6?${ID}serialNumber=${sn}`, req).pipe(
      catchError(this.handleError)
    );
  }
  getIPV_6Info(orgId, sn) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/dhcpv6?${ID}serialNumber=${sn}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    return throwError(error);
  }

  getPasspointDetails(orgId, subId, snOrFsan) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/edge-suites/mycommunityiq/successful-config?${ID}systemId=${snOrFsan}${(subId && subId != 'undefined') ? '&subscriberId=' + subId : ''}`);
  }
  getOntPortInterface(oltid, routerSerialNumber) {
    return this.http.get(`${environment.API_BASE}/v1/nfa/interfaces?system=${oltid}&fsan=${routerSerialNumber}&interfaceCategory=ethernet`).pipe(
      catchError(this.handleError)
    );
  }
  getOntPort(interfaceUuid, routerSerialNumber) {
    return this.http.get(`${environment.API_BASE}/v1/cnap/invmgr/interfaces/state?interfaceUuid=${interfaceUuid}&fsan=${routerSerialNumber}`).pipe(
      catchError(this.handleError)
    );
  }
  getTimeSeriesPage(serialNumber) {
    return this.http.get(`${environment.API_BASE_URL}nfa/onts/discoveredonts?fsan=${(serialNumber)}`).pipe(
      catchError(this.handleError)
    );
  }

  getRxPowers(uuid, sn) {
    return this.http.get(`${environment.API_BASE_URL}cnap/invmgr/devices/${uuid}/state/details?onuid=${sn}`).pipe(
      catchError(this.handleError)
    );
  }

  getExaDetails(oltName) {
    return this.http.get(`${environment.API_BASE_URL}nfa/systems/details?name=${oltName}&exactNameMatch=true&axos=false`).pipe(
      catchError(this.handleError)
    );
  }

  swapInProgress(systemId) {
    return this.http.get(`${environment.FOUNDATION_BASE_URL}subscriber-systems/replacing?systemId=${systemId}`).pipe(
      catchError(this.handleError)
    );
  }
}
