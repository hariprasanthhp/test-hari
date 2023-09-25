import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isArray } from 'jquery';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
const CronJob = require('cron').CronJob;
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public currentPageData = new Subject<any>();
  public currentOrgData = new Subject<any>();
  public scrollTop = new Subject<any>();
  public closeAlerts = new Subject<any>();
  public successAlert = new Subject<any>();
  public errorAlert = new Subject<any>();
  public showApiUsage = new Subject<any>();
  public showAccountManagement = new Subject<any>();
  public deviceIp = {}
  recordView = {
    show: false
  }
  errorInfo: any;
  scopeMapping = {
    //csc
    apps: 'Applications',
    experienceiq: 'ExperienceIQ',
    protectiq: 'ProtectIQ ',
    cpe: 'Router',
    backup_restore: 'Backup/Restore',
    calloutcome: 'Call Outcome',
    call_avoidance: "Call Avoidance",
    call_outcome: "Call Outcome Report",
    audit_Report: "Audit Report",
    comm_logs: "Communication Logs",
    config: "Configuration",
    config_files: "Configuration files",
    configuration: "Configuration",
    connect_device: "Connect To Device",
    dashboards: "Dashboard",
    data: "Data",
    data_model: "Data Model",
    device_group: "System Groups",
    device_logs: "Device Logs",
    devices: "Devices",
    devices_delete: "Delete Device",
    dial_plan: "Dial Plan",
    enablement: "Enablement",
    event_history: "Event History",
    ext_file_server: "External File Server",
    factory_reset: "Factory Reset",
    gfast: "GFAST",
    inv_report: "Inventory Report",
    l2security: "Security",
    mgmt: "Subscriber Mgmt",
    netops: "NetOps",
    operations: "Operations",
    perf_testing: "Performance Testing",
    ping: "Ping",
    profiles: "Profiles",
    reboot: "Reboot",
    reports: "Reports",
    search: "Subscriber Search",
    secure_onboarding: "Secure Onboarding",
    self_heal: "Self Healing",
    services: "Services",
    site_scan: "SiteScan",
    speed_test: "Run Speed Test",
    stale_purge: "Stale System Purge",
    subnet_config: "Subnet Configuration",
    subscribers: "Subscriber Records",
    sw_images: "Software Images",
    trace_route: "Traceroute",
    trafficreports: "Traffic Reports",
    unassociated_devices: "Unassociated Devices",
    update_image: "Update Software",
    video: "Video",
    voice: "Voice",
    websitecheck: "Website Check",
    wifi: "WiFi",
    workflow: "Workflows",
    xdsl: "XDSL",

    //cmc
    exploredata: "Explored Data",

    //shad
    service: "SHAD Service Access",
    networktrends: "Network Trends",
    "subscribersystems": "Subscriber Systems",
    "activealarm": "Active Alarms",
    "activepons": "Active PONs",
    "biperrors": "BIP Errors",
    "subscriberimpacted": "Subscriber Impacted",
    "cmndiqstatus": "Command IQ Status",
    "revedgesuitestatus": "Subscribers by Revenue EDGE Suite",
    "systemmodel": "Systems by Model",
    "systemstatus": "Systems Status",
    "systemtype": "Systems by Type",
    "historyalarm": "Historical Reports",
    "calloutcomereports": "Call Outcome",
    "epcountbymapper": "Endpoint Count By Mapper",
    "invreports": "Inventory Reports",
    "mappedeplists": "Mapped Endpoint Lists",
    "ontdevices": "ONT Systems",
    "unassociatedsystems": "Unassociated Systems",
    "unmappedips": "UnMapped IPs",
    "nwdelete": "Network Delete",
    "nwdisconnect": "Network Disconnect",
    "pon": "PON",
    "ont": "ONT",
    "edgesuitesbulkprovisioning": "EDGE Suites Bulk Provisioning",
    "wan_status": "WAN Status",
    "ae": "Active Ethernet",/* CCL-46149 */
    "alarmnotifications": "Alarm Notifications",
    "transformalarmrules": "Transform Alarm Rules",
    "subscriber": "Subscriber Operations",
    "realtime": "Real Time",
    "mycommunityiq": "MyCommunityIQ",
    "revedgesuiteecosystemstatus": "Subscribers with Revenue EDGE Ecosystem Suites",
    "revenue": "Revenue",
    "auditreport": "Audit Report"
  };

  isNewVersionAvailable = new BehaviorSubject({
    isUpdateAvailable: false,
    isUpdateAnimation: true
  })


  constructor(
    private sso: SsoAuthService,
    private http: HttpClient
  ) {
    //this.permissionDataProcess();

  }

  currentPageAdder(data) {
    this.currentPageData.next(data);
  };

  currentOrgAdder(data) {
    this.currentOrgData.next(data);
  };
  validatePhoneNumber(number = '') {
    return /^[^A-z]+$/.test(number);
  }
  validateEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  allSupportDataProcess(mainObj: any, slctdPrmsns: any, doNotProcess?: any) {
    let scope: any = [];
    let temp = [];
    let temp2 = [];
    let old = {};
    let scopeBase = '';
    mainObj = this.sortByColumn(mainObj, 'asc', 'name');
    for (let perm of mainObj) {
      scope = perm.name.split('.');
      scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2];
      switch (scope.length) {
        case 3:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          } else {
            old = temp[scopeBase];
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = old['permissions'];
            old = {};
          }

          break;
        case 4:

          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = old['permissions2'];
            old = {};
          }
          break;
        case 5:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]]['permissions3'] = [];
          }

          break;
      }

    }
    let temp3 = [];
    let temp4 = [];
    let checked = false;
    let readWrite = false;

    for (let key in temp) {
      if (Object.keys(temp[key].permissions).length != 0) {
        for (let key2 in temp[key].permissions) {

          if (Object.keys(temp[key].permissions[key2].permissions2).length != 0) {
            for (let key3 in temp[key].permissions[key2].permissions2) {
              checked = false;
              if (slctdPrmsns[key3]) {
                checked = true;
              }

              readWrite = false;

              if (slctdPrmsns[key3] && slctdPrmsns[key3].indexOf('read,write') !== -1) {
                readWrite = true;
              }

              temp[key].permissions[key2].permissions2[key3].checked = checked;
              temp[key].permissions[key2].permissions2[key3].readWrite = readWrite;

              temp4.push(temp[key].permissions[key2].permissions2[key3]);
            }
          }

          checked = false;
          if (slctdPrmsns[key2]) {
            checked = true;
          }

          readWrite = false;

          if (slctdPrmsns[key2] && slctdPrmsns[key2].indexOf('read,write') !== -1) {
            readWrite = true;
          }

          temp[key].permissions[key2].checked = checked;
          temp[key].permissions[key2].readWrite = readWrite;
          temp4 = this.sortByColumn(temp4, 'asc', 'displayName');
          temp[key].permissions[key2].permissions2 = temp4;
          temp4 = [];
          temp3.push(temp[key].permissions[key2]);
        }

      }
      temp3 = this.sortByColumn(temp3, 'asc', 'displayName');
      temp[key].permissions = temp3;

      checked = false;
      if (slctdPrmsns[temp[key].name]) {
        checked = true;
      }

      readWrite = false;
      if (slctdPrmsns[temp[key].name] && slctdPrmsns[temp[key].name].indexOf('read,write') !== -1) {
        readWrite = true;
      }

      temp[key].checked = checked;
      temp[key].readWrite = readWrite;
      temp2.push(temp[key]);
      temp3 = [];
    }

    for (let i = 0; i < temp2.length; i++) {
      let slctdScopes = [];
      let showSelectedScopes = false;
      if (temp2[i].permissions) {
        for (let j = 0; j < temp2[i].permissions.length; j++) {
          if (slctdPrmsns[temp2[i].permissions[j].name]) {
            slctdScopes.push(temp2[i].permissions[j].displayName);
          }

          let innerSlctdScopes = [];
          if (temp2[i].permissions[j].permissions2) {
            for (let k = 0; k < temp2[i].permissions[j].permissions2.length; k++) {
              if (slctdPrmsns[temp2[i].permissions[j].permissions2[k].name]) {
                innerSlctdScopes.push(temp2[i].permissions[j].permissions2[k].displayName);
                showSelectedScopes = true;
              }
            }

            temp2[i].permissions[j]['selectedScopes'] = innerSlctdScopes.join(', ');

            temp2[i].permissions[j]['showSelectedScopes'] = innerSlctdScopes.length ? true : false;
            temp2[i]['showSelectedScopes'] = showSelectedScopes;
            temp2[i].permissions[j]['area-expanded'] = innerSlctdScopes.length ? true : false;
          }
        }

        temp2[i]['selectedScopes'] = slctdScopes.join(', ');
        temp2[i]['showSelectedScopes'] = (showSelectedScopes || temp2[i]['selectedScopes'].length) ? true : false;
        temp2[i]['area-expanded'] = temp2[i]['showSelectedScopes'] ? true : false

      }

    }
    temp2 = this.sortByColumn(temp2, 'asc', 'displayName');

    return temp2;
  }

  allSupportDataProcessV21(mainObj: any, slctdPrmsns: any, doNotProcess?: any) {
    let scope: any = [];
    let temp = [];
    let temp2 = [];
    let old = {};
    let scopeBase = '';;
    mainObj = this.sortByColumn(mainObj, 'asc', 'name');
    for (let perm of mainObj) {
      if (perm.name.indexOf('rbac') == -1) {
        continue;
      }
      scope = perm.name.split('.');
      scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2] + '.' + scope[3];
      switch (scope.length) {
        case 4:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          } else {
            old = temp[scopeBase];
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = old['permissions'];
            old = {};
          }

          break;
        case 5:

          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {
            old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = old['permissions2'];
            old = {};
          }
          break;
        case 6:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {
            // old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]];
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = old['permissions2'];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = [];
          } else {
            // old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]];
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = { ...perm };
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = old['permissions3'];
            // old = {};
          }

          break;

        case 7:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {
            // old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]];
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = { ...perm };
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = old['permissions2'];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = [];
          } else {
            // old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]];
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = { ...perm };
            // temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = old['permissions3'];
            // old = {};
          }
          let level4 = scopeBase + '.' + scope[4];
          let level5 = scopeBase + '.' + scope[4] + '.' + scope[5];
          let level6 = scopeBase + '.' + scope[4] + '.' + scope[5] + '.' + scope[6];

          if (temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6] == undefined) {
            temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6] = { ...perm };
            temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6]['permissions4'] = [];
          } else {
            // old = temp[scopeBase]['permissions'][level4]['permissions2'][level5];
            // temp[scopeBase]['permissions'][level4]['permissions2'][level5] = { ...perm };
            // temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'] = old['permissions3'];
            // old = {};
          }

          break;
      }

    }

    let temp3 = [];
    let temp4 = [];
    let temp5 = [];
    let checked = false;
    let readWrite = false;

    for (let key in temp) {
      if (Object.keys(temp[key].permissions).length != 0) {
        for (let key2 in temp[key].permissions) {

          if (Object.keys(temp[key].permissions[key2].permissions2).length != 0) {
            for (let key3 in temp[key].permissions[key2].permissions2) {


              if (Object.keys(temp[key].permissions[key2].permissions2[key3].permissions3).length != 0) {
                for (let key4 in temp[key].permissions[key2].permissions2[key3].permissions3) {

                  checked = false;
                  if (slctdPrmsns[key4]) {
                    checked = true;
                  }

                  readWrite = false;

                  if (slctdPrmsns[key4] && slctdPrmsns[key4].indexOf('read,write') !== -1) {
                    readWrite = true;
                  }

                  temp[key].permissions[key2].permissions2[key3].permissions3[key4].checked = checked;
                  temp[key].permissions[key2].permissions2[key3].permissions3[key4].readWrite = readWrite;

                  temp5.push(temp[key].permissions[key2].permissions2[key3].permissions3[key4]);

                }
              }


              checked = false;
              if (slctdPrmsns[key3]) {
                checked = true;
              }

              readWrite = false;

              if (slctdPrmsns[key3] && slctdPrmsns[key3].indexOf('read,write') !== -1) {
                readWrite = true;
              }

              temp[key].permissions[key2].permissions2[key3].checked = checked;
              temp[key].permissions[key2].permissions2[key3].readWrite = readWrite;
              temp5 = this.sortByColumn(temp5, 'asc', 'displayName');
              temp[key].permissions[key2].permissions2[key3].permissions3 = temp5;
              temp5 = [];
              temp4.push(temp[key].permissions[key2].permissions2[key3]);
            }
          }

          checked = false;
          if (slctdPrmsns[key2]) {
            checked = true;
          }

          readWrite = false;

          if (slctdPrmsns[key2] && slctdPrmsns[key2].indexOf('read,write') !== -1) {
            readWrite = true;
          }

          temp[key].permissions[key2].checked = checked;
          temp[key].permissions[key2].readWrite = readWrite;
          temp4 = this.sortByColumn(temp4, 'asc', 'displayName');
          temp[key].permissions[key2].permissions2 = temp4;
          temp4 = [];
          temp3.push(temp[key].permissions[key2]);
        }

      }
      temp3 = this.sortByColumn(temp3, 'asc', 'displayName');
      temp[key].permissions = temp3;

      checked = false;
      if (slctdPrmsns[temp[key].name]) {
        checked = true;
      }

      readWrite = false;
      if (slctdPrmsns[temp[key].name] && slctdPrmsns[temp[key].name].indexOf('read,write') !== -1) {
        readWrite = true;
      }

      temp[key].checked = checked;
      temp[key].readWrite = readWrite;
      temp2.push(temp[key]);
      temp3 = [];
    }

    for (let i = 0; i < temp2.length; i++) {
      let slctdScopes = [];
      let showSelectedScopes = false;
      let showInnerSelectedScopes = false;
      if (temp2[i].permissions) {
        for (let j = 0; j < temp2[i].permissions.length; j++) {
          if (slctdPrmsns[temp2[i].permissions[j].name]) {
            slctdScopes.push(temp2[i].permissions[j].displayName);
          }

          let innerSlctdScopes = [];
          if (temp2[i].permissions[j].permissions2) {
            for (let k = 0; k < temp2[i].permissions[j].permissions2.length; k++) {
              if (slctdPrmsns[temp2[i].permissions[j].permissions2[k].name]) {
                innerSlctdScopes.push(temp2[i].permissions[j].permissions2[k].displayName);
                showSelectedScopes = true;
              }

              let deepInnerSlctdScopes = [];
              if (temp2[i].permissions[j].permissions2[k].permissions3) {
                for (let l = 0; l < temp2[i].permissions[j].permissions2[k].permissions3.length; l++) {
                  if (slctdPrmsns[temp2[i].permissions[j].permissions2[k].permissions3[l].name]) {
                    deepInnerSlctdScopes.push(temp2[i].permissions[j].permissions2[k].permissions3[l].displayName);
                    showInnerSelectedScopes = true;
                  }


                  temp2[i].permissions[j].permissions2[k]['selectedScopes'] = deepInnerSlctdScopes.join(', ');

                  temp2[i].permissions[j].permissions2[k]['showSelectedScopes'] = deepInnerSlctdScopes.length ? true : false;
                  temp2[i].permissions[j]['showSelectedScopes'] = showInnerSelectedScopes;
                  temp2[i].permissions[j].permissions2[k]['area-expanded'] = deepInnerSlctdScopes.length ? true : false;
                }

              }

            }

            temp2[i].permissions[j]['selectedScopes'] = innerSlctdScopes.join(', ');

            temp2[i].permissions[j]['showSelectedScopes'] = innerSlctdScopes.length ? true : false;
            temp2[i]['showSelectedScopes'] = showSelectedScopes;
            temp2[i].permissions[j]['area-expanded'] = innerSlctdScopes.length ? true : false;
          }
        }

        temp2[i]['selectedScopes'] = slctdScopes.join(', ');
        temp2[i]['showSelectedScopes'] = (showSelectedScopes || temp2[i]['selectedScopes'].length) ? true : false;
        temp2[i]['area-expanded'] = temp2[i]['showSelectedScopes'] ? true : false

      }

    }
    temp2 = this.sortByColumn(temp2, 'asc', 'displayName');
    return temp2;
  }


  getSelectedSubScopeNames(allPrmsnfrmApi: any, slctdPrmsns, v21?: boolean): any {

    let obj = {};
    let otp = {};
    let checkOtp = {};
    let temp2;
    if (v21) {
      temp2 = this.allSupportDataProcessV21(allPrmsnfrmApi, slctdPrmsns, true);
    } else {
      temp2 = this.allSupportDataProcess(allPrmsnfrmApi, slctdPrmsns, true);
    }

    for (let i = 0; i < temp2.length; i++) {
      let slctdScopes = [];
      let showSelectedScopes = false;
      let showInnerSelectedScopes = false;
      let parentOfParent = [];
      Object.keys(slctdPrmsns).forEach(elem => {
        if (elem.indexOf(temp2[i].name) > -1) {
          parentOfParent.push(temp2[i].displayName);
        }
      });
      if (temp2[i].permissions) {
        for (let j = 0; j < temp2[i].permissions.length; j++) {
          if (slctdPrmsns[temp2[i].permissions[j].name]) {
            slctdScopes.push(temp2[i].permissions[j].displayName);
          }

          obj[temp2[i].permissions[j]._id] = temp2[i].permissions[j].name;

          let innerSlctdScopes = [];
          if (temp2[i].permissions[j].permissions2) {
            for (let k = 0; k < temp2[i].permissions[j].permissions2.length; k++) {
              if (slctdPrmsns[temp2[i].permissions[j].permissions2[k].name]) {
                innerSlctdScopes.push(temp2[i].permissions[j].permissions2[k].displayName);
                showSelectedScopes = true;
              }

              obj[temp2[i].permissions[j].permissions2[k]._id] = temp2[i].permissions[j].permissions2[k].name;




              //Newly added code
              let deepInnerSlctdScopes = [];
              if (temp2[i].permissions[j].permissions2[k].permissions3) {
                for (let l = 0; l < temp2[i].permissions[j].permissions2[k].permissions3.length; l++) {
                  if (slctdPrmsns[temp2[i].permissions[j].permissions2[k].permissions3[l].name]) {
                    deepInnerSlctdScopes.push(temp2[i].permissions[j].permissions2[k].permissions3[l].displayName);
                    showInnerSelectedScopes = true;
                  }

                  obj[temp2[i].permissions[j].permissions2[k].permissions3[l]._id] = temp2[i].permissions[j].permissions2[k].permissions3[l].name;
                }

                temp2[i].permissions[j].permissions2[k]['selectedScopes'] = deepInnerSlctdScopes.join(', ');

                temp2[i].permissions[j].permissions2[k]['showSelectedScopes'] = deepInnerSlctdScopes.length ? true : false;
                temp2[i].permissions[j]['showSelectedScopes'] = showInnerSelectedScopes;
                temp2[i].permissions[j].permissions2[k]['area-expanded'] = deepInnerSlctdScopes.length ? true : false;

                otp[temp2[i].permissions[j].permissions2[k]._id] = temp2[i].permissions[j].permissions2[k]['selectedScopes'];
                checkOtp[temp2[i].permissions[j].permissions2[k]._id] = temp2[i].permissions[j].permissions2[k]['checked'];
              }
              //Newly added code
            }

            temp2[i].permissions[j]['selectedScopes'] = innerSlctdScopes.join(', ');

            temp2[i].permissions[j]['showSelectedScopes'] = innerSlctdScopes.length ? true : false;
            temp2[i].permissions[j]['showSelectedScopes'] = showSelectedScopes;
            temp2[i].permissions[j]['area-expanded'] = innerSlctdScopes.length ? true : false;

            otp[temp2[i].permissions[j]._id] = temp2[i].permissions[j]['selectedScopes'];
            checkOtp[temp2[i].permissions[j]._id] = temp2[i].permissions[j]['checked'];



          }
        }

        temp2[i]['selectedScopes'] = slctdScopes.join(', ');
        temp2[i]['showSelectedScopes'] = (showSelectedScopes || temp2[i]['selectedScopes'].length) ? true : false;
        temp2[i]['area-expanded'] = temp2[i]['showSelectedScopes'] ? true : false;



        obj[temp2[i]._id] = temp2[i].name;
        otp[temp2[i]._id] = temp2[i]['selectedScopes'];
        checkOtp[temp2[i]._id] = temp2[i]['checked'];
      }

      if (parentOfParent.length && !otp[temp2[i]._id]) {
        otp[temp2[i]._id] = ' ';
      }

    }

    let data = {
      scopes: Object.keys(otp),
      selectedData: otp,
      checkedScopes: checkOtp,
      scopeNames: obj
    };

    return data;


  }



  permProcessForUserDetail(mainObj: any) {
    let scope: any = [];
    let temp = {};
    let temp2 = [];
    let old = {};
    let scopeBase = '';
    let scopeBase2 = '';
    let scopeBase3 = '';
    if (mainObj.permissions == undefined) {
      return [];
    }

    for (let perm of mainObj.permissions) {
      scope = perm.scopeName.split('.');
      scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2];  
      switch (scope.length) {
        case 3:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          } else {
            old = temp[scopeBase];
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = old['permissions'];
            old = {};
          }

          break;
        case 4:

          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = old['permissions2'];
            old = {};
          }
          break;
        case 5:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]]['permissions3'] = [];
          }

          break;
      }

    }


    let temp3 = [];
    let temp4 = [];
    for (let key in temp) {
      if (Object.keys(temp[key].permissions).length != 0) {
        for (let key2 in temp[key].permissions) {

          if (Object.keys(temp[key].permissions[key2].permissions2).length != 0) {
            for (let key3 in temp[key].permissions[key2].permissions2) {
              temp4.push(temp[key].permissions[key2].permissions2[key3]);
            }
          }

          temp4 = this.sortByColumn(temp4, 'asc', 'scopeDisplayName');
          temp[key].permissions[key2].permissions2 = temp4;
          temp4 = [];
          temp3.push(temp[key].permissions[key2]);
        }

      }
      temp3 = this.sortByColumn(temp3, 'asc', 'scopeDisplayName');
      temp[key].permissions = temp3;
      temp2.push(temp[key]);
      temp3 = [];
    }

    temp2 = this.sortByColumn(temp2, 'asc', 'scopeDisplayName');

    return temp2;
  }
  permProcessForUserDetailDeployment(mainObj: any) {    
    let scope: any = [];
    let temp = {};
    let temp2 = [];
    let old = {};
    let scopeBase = '';
    let scopeBase2 = '';
    let scopeBase3 = '';
    if (mainObj.permissions == undefined) {
      return [];
    }

    for (let perm of mainObj.permissions) {
      scope = perm.scopeName.split('.');      
      scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2];

      switch (scope.length) {
       
             
        case 3:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          } else {
            old = temp[scopeBase];
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = old['permissions'];
            old = {};
          }

          break;
        case 4:

          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = old['permissions2'];
            old = {};
          }
          break;
        case 5:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = [];
          } else {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'] = temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]] = { ...perm };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[3]]['permissions2'][scopeBase + '.' + scope[3] + '.' + scope[4]]['permissions3'] = [];
          }

          break;
      }

    }


    let temp3 = [];
    let temp4 = [];    
    for (let key in temp) {      
      if (Object.keys(temp[key].permissions).length !=4){
           temp[key].action ='';
      }  
      if (Object.keys(temp[key].permissions).length != 0) {
        for (let key2 in temp[key].permissions) {

          if (Object.keys(temp[key].permissions[key2].permissions2).length != 0) {
            for (let key3 in temp[key].permissions[key2].permissions2) {
              temp4.push(temp[key].permissions[key2].permissions2[key3]);
            }
          }

          temp4 = this.sortByColumn(temp4, 'asc', 'scopeDisplayName');
          temp[key].permissions[key2].permissions2 = temp4;
          temp4 = [];
          temp3.push(temp[key].permissions[key2]);
        }

      }
      temp3 = this.sortByColumn(temp3, 'asc', 'scopeDisplayName');
      temp[key].permissions = temp3;
      temp2.push(temp[key]);
      temp3 = [];
    }

    temp2 = this.sortByColumn(temp2, 'asc', 'scopeDisplayName');
    return temp2;
  }



  permProcessForUserDetailV21(mainObj: any) { 
    let scope: any = [];
    let temp = {};
    let temp2 = [];
    let old: any = {};
    let scopeBase = '';
    let scopeBase2 = '';
    let scopeBase3 = '';
    if (mainObj.permissions == undefined) {
      return [];
    }
    let permissions = this.sortByColumn(mainObj.permissions, 'asc', 'scopeName');
    for (let perm of permissions) {
      if (perm.scopeName.indexOf('rbac') == -1) {
        continue;
      }      
      scope = perm.scopeName.split('.');

      scopeBase = scope[0] + '.' + scope[1] + '.' + scope[2] + '.' + scope[3];      
      switch (scope.length) {
        case 4:
          if (temp[scopeBase] == undefined) {
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = [];
          } else { 
            old = temp[scopeBase];
            temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = old['permissions'];
            old = {};
          }
          break;
        case 5:

          if (temp[scopeBase] == undefined) {
            /* temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = []; */
            temp[scopeBase] = this.childOnlyScopes(scopeBase, perm);
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": (`${scopeBase}.${scope[4]}`), isLast: true }
            );
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {
            old = temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]];
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = {
              action: old.action.split(',').length > perm.action.split(',').length ? old.action : perm.action,
              implied: perm.implied,
              permName: old.action.split(',').length > perm.action.split(',').length ? old.permName : perm.permName,
              scopeDisplayName: perm.scopeDisplayName,
              scopeId: perm.scopeId,
              scopeName: perm.scopeName
            };
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = old['permissions2'];
            old = {};
          }
          break;

        case 6:
          if (temp[scopeBase] == undefined) {
            
            //temp[scopeBase] = { ...perm };
            temp[scopeBase] = this.childOnlyScopes(scopeBase, perm);
            //temp[scopeBase]['permissions'] = [];
          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": (`${scopeBase}.${scope[4]}`), isLast: false }
            );
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {

          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": (`${scopeBase}.${scope[4]}.${scope[5]}`), isLast: true }
            );
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = [];
          } else {

          }

          this.setWithExcessAccess(temp, scopeBase, scope, perm);

          break;

        case 7:
          if (temp[scopeBase] == undefined) {
            /* temp[scopeBase] = { ...perm };
            temp[scopeBase]['permissions'] = []; */
            temp[scopeBase] = this.childOnlyScopes(scopeBase, perm);
          } else {

          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": (scopeBase + '.' + scope[4]), isLast: false }
            );
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'] = [];
          } else {

          }

          if (temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] == undefined) {
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": (`${scopeBase}.${scope[4]}.${scope[5]}`), isLast: false }
            );
            temp[scopeBase]['permissions'][scopeBase + '.' + scope[4]]['permissions2'][scopeBase + '.' + scope[4] + '.' + scope[5]]['permissions3'] = [];
          } else {

          }
          let level4 = scopeBase + '.' + scope[4];
          let level5 = scopeBase + '.' + scope[4] + '.' + scope[5];
          let level6 = scopeBase + '.' + scope[4] + '.' + scope[5] + '.' + scope[6];

          if (temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6] == undefined) {
            temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6] = this.getChildScopes(
              { "permission": { ...perm }, "tempScope": level6, isLast: true }
            );
            temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6]['permissions4'] = [];
          } else {

          }          
          this.setWithExcessAccess(temp, scopeBase, scope, perm);

          break;
      }

    }

    let temp3 = [];
    let temp4 = [];
    let temp5 = [];
    for (let key in temp) {
      if (Object.keys(temp[key].permissions).length != 0) {
        for (let key2 in temp[key].permissions) {

          if (Object.keys(temp[key].permissions[key2].permissions2).length != 0) {
            for (let key3 in temp[key].permissions[key2].permissions2) {

              if (Object.keys(temp[key].permissions[key2].permissions2[key3].permissions3).length != 0) {
                for (let key4 in temp[key].permissions[key2].permissions2[key3].permissions3) {
                  temp5.push(temp[key].permissions[key2].permissions2[key3].permissions3[key4]);
                }
              }
              temp5 = this.sortByColumn(temp5, 'asc', 'scopeDisplayName');
              temp[key].permissions[key2].permissions2[key3].permissions3 = temp5;
              temp5 = [];
              temp4.push(temp[key].permissions[key2].permissions2[key3]);
            }
          }
          temp4 = this.sortByColumn(temp4, 'asc', 'scopeDisplayName');
          temp[key].permissions[key2].permissions2 = temp4;
          temp4 = [];
          temp3.push(temp[key].permissions[key2]);
        }

      }
      temp3 = this.sortByColumn(temp3, 'asc', 'scopeDisplayName');
      temp[key].permissions = temp3;
      temp2.push(temp[key]);
      temp3 = [];
    }


    temp2 = this.sortByColumn(temp2, 'asc', 'scopeDisplayName');    
    return temp2;

  }

  setWithExcessAccess(temp, scopeBase, scope, perm) {
    let objPath;
    const level4 = scopeBase + '.' + scope[4];
    const level5 = scopeBase + '.' + scope[4] + '.' + scope[5];
    const level6 = scopeBase + '.' + scope[4] + '.' + scope[5] + '.' + scope[6]; 
    if (perm.scopeName == temp[scopeBase]["scopeName"]) {
      objPath = temp[scopeBase];
    }
    else if (perm.scopeName == temp[scopeBase]['permissions'][level4]["scopeName"]) {
      objPath = temp[scopeBase]['permissions'][level4];
    }
    else if (perm.scopeName == temp[scopeBase]['permissions'][level4]['permissions2'][level5]["scopeName"]) {
      objPath = temp[scopeBase]['permissions'][level4]['permissions2'][level5];
    }
    else if (perm.scopeName == temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6]["scopeName"]) {
      objPath = temp[scopeBase]['permissions'][level4]['permissions2'][level5]['permissions3'][level6];
    }
    objPath["action"] = objPath.action.split(',').length > perm.action.split(',').length ? objPath.action : perm.action;
    objPath["permName"] = objPath.action.split(',').length > perm.action.split(',').length ? objPath.permName : perm.permName;
  }

  childOnlyScopes(scope, permission) {

    let obj: any = { ...permission };
    obj.action = "";
    obj.permName = scope + ':';
    obj.scopeName = scope;
    obj.scopeDisplayName = permission.scopeDisplayName
    /* CCL-37865 */
    // const elemName = scope.split('.').reverse()[0];
    // obj.scopeDisplayName = this.scopeMapping.hasOwnProperty(elemName) ?
    //   this.scopeMapping[elemName] :
    //   elemName.replace(/\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase())
    obj.permissions = [];
    const childScopes = permission.scopeName.replace(`${scope}.`, '').split('.');
    let tempScope = scope, scopePath = '';
    childScopes.forEach((cScope, i) => {
      let tempObj: any = {};
      tempScope += `.${cScope}`;
      const isLast = childScopes.length == (i + 1);
      tempObj.action = isLast ? permission.action : "";
      tempObj.permName = isLast ? `${tempScope}:${permission.action}` : `${tempScope}:`;
      tempObj.scopeName = tempScope;
      /* CCL-37865 */
      // tempObj.scopeDisplayName = this.scopeMapping.hasOwnProperty(cScope) ?
      //   this.scopeMapping[cScope] :
      //   cScope.replace(/\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase())
      tempObj.scopeDisplayName = permission?.scopeDisplayName;
      tempObj[`permissions${i + 2}`] = [];
      scopePath += `${i ? '@!@' : ''}permissions${i ? (i + 1) : ''}@!@${tempScope}`
      this.getValue(obj, scopePath.split('@!@'), tempObj);
    });    
    return obj;

  }

  getChildScopes(param) {
    let { permission, tempScope, isLast = false } = param;
    let tempObj: any = {};
    /* CCL-37865 */
    // const cScope = tempScope.split('.').reverse()[0]; 
    tempObj.action = isLast ? permission.action : "";
    tempObj.permName = isLast ? `${tempScope}:${permission.action}` : `${tempScope}:`;
    tempObj.scopeName = tempScope;
    tempObj.scopeDisplayName = permission.scopeDisplayName;
    /* CCL-37865 */
    // tempObj.scopeDisplayName = this.scopeMapping.hasOwnProperty(cScope) ? 
    //   this.scopeMapping[cScope] :
    //   cScope.replace(/\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase())
    return tempObj;
    //this.getValue(mainObj, scopePath.split('@!@'), tempObj);
  }

  getValue(obj, keys, assignObj, i = 0) {
    let currentObject = obj.hasOwnProperty(keys[i]) ? obj[keys[i]] : obj[keys[i]] = assignObj;
    return (i < keys.length - 1) ? this.getValue(currentObject, keys, assignObj, i + 1) : currentObject;
  }

  pageScrollTop() {
    this.scrollTop.next();
  }

  closeAlert() {
    this.closeAlerts.next();
  }

  openSuccessAlert(info: string) {
    this.successAlert.next(info);
  }

  openErrorAlert(info: string) {
    this.errorAlert.next(info);
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.error != undefined && err.error != null && typeof err.error == 'string') {
      // this.errorInfo = `${err.error}`;
      if (this.IsJsonString(err.error)) {
        let error = JSON.parse(err.error);
        if (error.message) {
          this.errorInfo = error.message;
        } else if (error.errorMessage) {
          this.errorInfo = error.errorMessage;
        } else {
          this.errorInfo = `${err.error}`;
        }
      } else {
        this.errorInfo = `${err.error}`;
      }
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.message != undefined && typeof err.error.message == 'string') {
      this.errorInfo = `${err.error.message}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.errorDesc != undefined && typeof err.error.errorDesc == 'string') {
      this.errorInfo = `${err.error.errorDesc}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error != undefined && typeof err.error.error == 'string') {
      this.errorInfo = `${err.error.error}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.error_code != undefined && typeof err.error.error_code == 'string') {
      this.errorInfo = `${err.error.error_code}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'string') {
      this.errorInfo = `${err.error.fault}`;
    } else if (err.error != undefined && typeof err.error == 'object' && err.error.fault != undefined && typeof err.error.fault == 'object' && err.error.fault.faultstring != undefined && typeof err.error.fault.faultstring == 'string') {
      this.errorInfo = `${err.error.fault.faultstring}`;
    } else if (err.error && err.error.errorMessage) {
      this.errorInfo = `${err.error.errorMessage}`;
    } else if (err.error && err.error.response) {
      this.errorInfo = `${err.error.response}`;
    } else if (err.error && err.error.message) {
      this.errorInfo = `${err.error.message}`;
    } else if (err.status === 500) {
      this.errorInfo = `Internal Server Error`;
    } else if (err.statusText == 'Unknown Error' && err.status == 0) {
      // this.errorInfo = "Unknown Error - Please refresh the page";  // remove later
      this.errorInfo = "An unknown error has occurred. Refresh the page to try again";
    } else if (err.status && err.status == 401) {
      this.errorInfo = "User Unauthorized";
    } else {
      this.errorInfo = `${err.message}`;
    }

    let langfromapi = this.sso.getspecificlangliterals()
    this.errorInfo = this.errorInfo != 'undefined' && this.errorInfo && langfromapi[this.errorInfo] ? langfromapi[this.errorInfo] : this.errorInfo

    return (this.errorInfo != 'undefined' && this.errorInfo.length) ? this.errorInfo : Object.values(this.flatten(err)).join(' - ');
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

  pageInvalidRqstErrorHandle(err: HttpErrorResponse) {
    let errorResp = err.error;
    let infoBody = '';
    if (errorResp.hasOwnProperty('error_code')) {
      infoBody = `${errorResp.error_code}`;
    } else if (typeof errorResp.error == 'string') {
      infoBody = `${errorResp.error}`;
    } else if (err.status && err.status == 401) {
      this.errorInfo = "User Unauthorized";
    } else {
      infoBody = `${err.message}`;
    }
    return (infoBody != 'undefined' && infoBody.length) ? infoBody : Object.values(this.flatten(err)).join(' - ');
  }

  //sort array of objects by comparaing object key values
  sortByColumn(data, type, column, isNum?): any {
    data.sort((a, b) => {
      let nameA: any;
      let nameB: any;
      if (isNum) {
        a[column] = a[column] ? parseInt(a[column]) : 0;
        b[column] = b[column] ? parseInt(b[column]) : 0;
        if (type == 'asc') {
          return a[column] - b[column];
        } else {
          return b[column] - a[column];
        }
      } else {
        nameA = a[column] ? a[column].toUpperCase() : '';
        nameB = b[column] ? b[column].toUpperCase() : '';

        if (type == 'asc') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }
      }

      // names must be equal
      return 0;
    });

    return data;
  }

  tableInfo = {
    'devices': {
      id: '',
      urlFromFC: 'network/devices'
    },
    'network_subnets': {
      id: 'subnets-table',
      urlFromFC: 'network/subnets'
    },
    'radius_server': {
      id: 'radius-servers-table',
      urlFromFC: 'network/radius-servers'
    },
    'locations': {
      id: 'fc-locations-table',
      urlFromFC: 'locations'
    },

    'definitions': {
      id: 'app-definitions-table',
      urlFromFC: 'applications/definitions'
    },
    'app_groups': {
      id: 'app-groups-table',
      urlFromFC: 'applications/app_groups'
    },
    'management': {
      id: 'management-table',
      urlFromFC: 'endpoint/management'
    },
    'endpoint_subnets': {
      id: 'subnets-table',
      urlFromFC: 'endpoint/subnets'
    },
  }
  removeTableState(page, url: string) {
    let MODULE = this.sso.getRedirectModule(url);
    if (localStorage.getItem(`DataTables_${this.tableInfo[page].id}_/${MODULE}/flowAnalyze/${this.tableInfo[page].urlFromFC}`)) {
      localStorage.removeItem(`DataTables_${this.tableInfo[page].id}_/${MODULE}/flowAnalyze/${this.tableInfo[page].urlFromFC}`);
    }
  }

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  date = new Date();
  initUpdateCronJob(updated) {

    // ***** for live ***** //
    if (!updated) {
      if (this.date.getHours() < 9) {
        this.date = new Date(this.date.setHours(9, 0, 0)); // for morning
      } else if (this.date.getHours() >= 9 && this.date.getHours() < 21) {
        this.date = new Date(this.date.setHours(21, 0, 0)); // for night
      } else if (this.date.getHours() >= 21) {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        this.date = new Date(date.setHours(9, 0, 0)); // for next day morning
      }
    } else {
      this.date = new Date(this.date.setHours(new Date().getHours(), new Date().getMinutes() + 30, new Date().getSeconds())); // add 5mins as per the button
    }

    console.log('this.date', this.date);
    let self = this;
    const job = new CronJob(this.date, function () {
      self.http.get(`${environment.SUPPORT_URL}/gui/version`).subscribe((res: any) => {
        if (res.version > environment.VERSION) {
          self.isNewVersionAvailable.next({
            isUpdateAvailable: true,
            isUpdateAnimation: true
          })
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }
      });
    });
    job.start();
  }

  setKey(key, value) {
    this.deviceIp[key] = value;
  }

  getKey(key) {
    return this.deviceIp[key];
  }
}
