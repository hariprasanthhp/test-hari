import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Header } from 'primeng/api';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportWifiService {

  public selfHealChanges = new Subject<any>();
  public ssidPage = new Subject<any>();
  public selfHealVisibility = new Subject<any>();
  public reasons = ['Unknown', 'Dynamic channel selection', 'Radar detection', 'Channel set by user', 'Configuration change', 'Initial channel selection', 'Off - channel CAC', 'Channel switch announcement', 'TDLS channel switch announcement', 'Auto Channel Select', 'DFS Suppress', 'DFS Re-entry'];
  availability: any = {};
  constructor(
    private http: HttpClient,
    private dateUtils: DateUtilsService,
    private sso: SsoAuthService
  ) { }

  selfHealChanged(data) {
    this.selfHealChanges.next(data);
  }

  changeSelfHealVisibility(data) {
    this.selfHealVisibility.next(data);
  }

  ssidPageLoaded(data) {
    this.ssidPage.next(data);
  }

  getRadioSummary(orgId: any, fsan: string, unassociated?: boolean) {
    const url = unassociated ? `${environment.SUPPORT_URL}/device/${orgId}/${fsan}/radioStatus` : `${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wifi/radioSummaries`;
    return this.http.get(url);
  }

  saveRadioSummary(orgId: any, fsan: string, type: string, params) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wifi/radioSummary?radio=${type}`, params);
  }

  getAirtimeAnalysis(orgId: any, fsan: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wifi/radioAirTime`);
  }

  getHistoryAirtimeAnalysis(url: any) {
    return this.http.get(url);
  }

  getChannelScoreData(orgId: any, fsan: string, start: string, end: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wifi/channelScores?startDate=${start}&endDate=${end}`);
  }

  getSelfHealStaus(orgId: any, subsId: any) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/wifi-optimization/subscriber/config/${subsId}?${ID}`);
  }

  updateSelfHealStaus(orgId: any, subsId: any, status: boolean) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/device/wifi-optimization/subscriber/config/${subsId}?${ID}selfHeal=${status}`, {});
  }

  getUsageTXRX(orgId: any, fsan: any, macAddr: any, period) {
    //return this.http.get(`${environment.SUPPORT_URL}/device/client/usage/rxtx?${ID}serialNumber=${fsan}&stationMac=${macAddr}&type=${period}`);
    return this.http.get(`${environment.SUPPORT_URL}/device/client/usage?stationMac=${macAddr}&lastndays=${period}`);
  }
  getUsage15MinTXRX(orgId: any, fsan: any, macAddr: any, start) {
    return this.http.get(`${environment.SUPPORT_URL}/device/client/usage?stationMac=${macAddr}&startTime=${start}`);
  }

  getSignalStrength(orgId: any, fsan: any, macAddr: any) {
    //return this.http.get('https://dev.api.calix.ai/v1/csc/device/client/usage?lastndays=7&stationMac=ec%3Afa%3A5c%3Ac2%3Aea%3A41');
    return this.http.get(`${environment.SUPPORT_URL}/device/client/usage?lastndays=7&stationMac=${macAddr}&type=hour`);
  }

  callRestApi(endpoint, filters?) {
    return this.http.get<any>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }

  putIPTV(orgId: any, fsan: string, params: any) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wps/iptv`, params);
  }

  getWPS(orgId: any, fsan: string, wps: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wps/${wps}`);
  }

  putWPS(orgId: any, fsan: string, wps: string, params: any) {
    return this.http.put(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wps/${wps}`, params);
  }

  getWpsCheck(orgId: any, fsan: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wpsCheck`);
  }

  getWpsSummary(orgId: any, fsan: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wpsSummary`);
  }

  getInitialCheck(orgId: any, fsan: string) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wps/iptv/check`);
  }

  siteScanRun(orgId: any, fsan: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/device-systools/site-scan/runTestNow?${ID}sn=${fsan}`, {});
  }

  getsiteScanLatest(orgId: any, fsan: string) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device-systools/site-scan/results/latest?${ID}sn=${fsan}`);
  }

  getChannelChangeLogs(orgId: any, fsan: string, macAddress) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${fsan}/wifi/channelChangeLog?macAddr=${macAddress}`);
  }

  getBackhaul(orgId: any, fsan: string, wfsan, macAddress) {
    const ID = this.sso.getOrg(orgId);
    const url = fsan ? `${environment.SUPPORT_URL}/device/wifi/backhaul?${ID}rgsn=${fsan}&wapsn=${wfsan}&stationMac=${macAddress}` : `${environment.SUPPORT_URL}/device/wifi/backhaul?${ID}wapsn=${wfsan}&stationMac=${macAddress}`;
    return this.http.get(url);

    //  return this.http.get(`${environment.SUPPORT_URL}/device/wifi/backhaul?${ID}rgsn=${fsan}&wapsn=${wfsan}&stationMac=${macAddress}`);
  }

  getSteeringLog(url: string) {
    return this.http.get(url);
  }

  getDownstreamData(url: string) {
    return this.http.get(url);
  }

  getOrgSelfHealStatus(orgId) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-selfheal/wifi-optimization/org/config/${orgId}`);
  }

  wifiAvailability(orgId, serialNumber) {
    return this.http.get(`${environment.SUPPORT_URL}/device/${orgId}/${serialNumber}/availability`);
  }
  getWIFIAvailability(serialNumber) {
    return this.availability[serialNumber] ? this.availability[serialNumber] : undefined;
  }

  setWIFIAvailability(data, serialNumber) {
    this.availability[serialNumber] = data;
  }

  getradiostatistics(orgId, serialNumber) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/device/radio/statistics?${ID}serialNumber=${serialNumber}`);
  }

  handleErrorWithEmpty(error) {
    return of({});
  }
  checkWirelessMode(item) {
    let mode = item.Mode ? item.Mode : '';
    let modes = [];
    if (mode.indexOf('a') > -1 || mode.indexOf('b') > -1) {
      modes.push('802.11ax');
    }
    if (mode.indexOf('n') > -1) {
      modes.push('802.11n');
    }
    if (mode.indexOf('g') > -1) {
      modes.push('802.11g');
    }

    return modes.join(', ');
  }

  getPrevDate(type, ds) {
    let date = new Date();
    let now = new Date();
    let firstDay: any;
    let lastDay: any;;
    if (type == 'day') {
      let dayCount = ds ? ds : 1;
      date.setDate(date.getDate() - dayCount);
      //date.setHours(0, 0, 0, 0);
      firstDay = date;
      lastDay = now;
    } else {
      let monthCount = ds ? ds : 1;
      firstDay = new Date(date.getFullYear(), date.getMonth() - monthCount, 1);
      //firstDay.setHours(0, 0, 0, 0);
      lastDay = now;
    }

    return {
      firstDay: firstDay,
      lastDay: lastDay
    }


  }

  modeValueToText(type, value) {
    var name = value.replace(/,/g, '');
    if (type != '2.4G' && (value == 'n' || value == 'ac')) {
      name = value + '5';
    }
    return this.standardMap[name] || '';
  }

  standardMap = {
    "a": "802.11a",
    "n": "802.11n",
    "n5": "802.11n Only",
    "b": "802.11b",
    "bgn": "802.11b/g/n",
    "nbg": "802.11n/b/g",
    "gn": "802.11g/n",
    "bg": "802.11b/g",
    "ac": "802.11ac",
    "ac5": "802.11ac and 802.11n",
    "g": "802.11g",
    "g-only": "802.11g",
    "n-only": "802.11n",
    "an": "802.11an",
    "anac": "802.11a/n/ac",
    "n5ac": "802.11a/n/ac",
    "ng": "802.11n and 802.11g",
    "ax": "802.11ax, 802.11n and 802.11g",
    "ax5": "802.11ax, 802.11ac and 802.11n"
  };

  getReason(code: any) {
    let responsecode: any;
    let isnumber = Number(code)
    let subnetintodecimal
    if (isNaN(isnumber)) {
      responsecode = code
    }
    else {
      // responsecode = this.reasons[code] || 'Unknown'
      let codetobinary = parseInt(code).toString(2)

      let getsubstringofbinary = codetobinary?.substring(8);
      if (!getsubstringofbinary) {
        subnetintodecimal = code
      }
      else {
        subnetintodecimal = parseInt(getsubstringofbinary, 2).toString(10)
      }
      responsecode = this.reasons[subnetintodecimal] || 'Unknown';
    }
    return responsecode;
    // return this.reasons[code] || 'Unknown';
  }

  sortByTimestamp(list, key, asc?) {
    list.sort(function (x, y) {
      x[key] = x[key] ? parseInt(x[key]) : 0;
      y[key] = y[key] ? parseInt(y[key]) : 0;
      if (asc && asc == 'asc') {
        return x[key] - y[key];
      }

      if (asc && asc == 'desc') {
        return y[key] - x[key];
      }

    });
    return list;
  }

  kbpsTO(m, valueOnly?, UnitOnly?) {
    let unit: any;
    let units: any = [];
    m = parseInt(m);
    if (m > 1000000000) {
      unit = (m / 1000000000).toFixed(2) + 'T';
      units = [(m / 1000000000).toFixed(2), 'T'];
    } else if (m > 1000000) {
      unit = (m / 1000000).toFixed(2) + 'G';
      units = [(m / 1000000).toFixed(2), 'G'];
    } else if (m > 1000) {
      unit = (m / 1000).toFixed(2) + 'M';
      units = [(m / 1000).toFixed(2), 'M'];
    } else {
      unit = m + 'K';
      units = [m, 'K'];
    }
    if (valueOnly) {
      return units[0];
    } else if (UnitOnly) {
      return units[1];
    }
    return unit;
  }

  ////Wan Failover//////////

  sitestartbw(request): any {
    /* let res:any
     res ='success'
     return res;*/

    return this.http.post(`${environment.SUPPORT_URL}/smbiq/backupwan/sitescan/start`, request);
  }
  sitescanresultbw(userId: any): any {
    /* let res :any
      res={
       "wifis": [
         {
           "ssid": "wifi ssid1",
           "frequency": "5G",
           "securityType": 3,
           "signalStrength": -50
         },
         {
           "ssid": "wifi ssid2",
           "frequency": "5G",
           "securityType": 0,
           "signalStrength": -66
         },
         {
           "ssid": "wifi ssid3",
           "frequency": "5G",
           "securityType": 1,
           "signalStrength": -69
         },
         {
           "ssid": "wifi ssid4",
           "frequency": "5G",
           "securityType": 0,
           "signalStrength": -80
         }
   
         
   
       ]
     }
     return res*/
    return this.http.get(`${environment.SUPPORT_URL}/smbiq/backupwan/sitescan/result?userId=${userId}`);
  }
  backupwanwifi(userId: any) {
    /* let res :any
     res={
         "id": "123",
         "ssid": "smb",
         "securityType": "number",
         "password": "23232",
         "appliedTraffic": {
           "owner": true,
           "staff": false,
           "customer": false,
           "pos": true
         },
         "forceTestRunning": true
       }
     return res*/

    return this.http.get(`${environment.SUPPORT_URL}/smbiq/backupwan/wifi?userId=${userId}`);
  }
  backupwanstatus(userId: any) {
    return this.http.get(`${environment.SUPPORT_URL}/smbiq/backupwan/status?userId=${userId}`);
  }
  backupwanwifiadd(request) {
    return this.http.put(`${environment.SUPPORT_URL}/smbiq/backupwan/wifi/add`, request);
  }
  backupwanwifiupdate(request) {
    return this.http.post(`${environment.SUPPORT_URL}/smbiq/backupwan/wifi/update`, request);
  }
  backupwanwifidelete(userId: any, id: any) {
    return this.http.delete(`${environment.SUPPORT_URL}/smbiq/backupwan/wifi/delete?userId=${userId}&id=${id}`);
  }
  teststartbw(request) {
    return this.http.post(`${environment.SUPPORT_URL}/smbiq/backupwan/test/start`, request);
  }
  teststatusbw(userId: any, id: any) {
    /* let res :any
     res={
       "id": 453,
       "result": "sucess",
       "failReason": ""
     }
     return res
     */
    return this.http.get(`${environment.SUPPORT_URL}/smbiq/backupwan/test/status?userId=${userId}&id=${id}
  `);
  }
  teststopbw(request) {
    return this.http.post(`${environment.SUPPORT_URL}/smbiq/backupwan/test/stop`, request);
  }

  getBackupWanStatus(userId) {
    return this.http.get(`${environment.SUPPORT_URL}/smbiq/backupwan/status?userId=${userId}`);
  }

  getONTIpaddress(orgId, UUIDNo) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.CMC_API_BASE_URL}/search/prioritySearch?orgId=${orgId}&filter=${UUIDNo}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getONTIpAddressAggrId(agggroup,orgId){
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.faAdminCorrelatorURL}flowendpoint?agggroup=${agggroup}&assigned=false&count=false&mappedby=NONE&orderby=name&org-id=${orgId}&pagenumber=0&pagesize=1000&sortdirection=asc`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
