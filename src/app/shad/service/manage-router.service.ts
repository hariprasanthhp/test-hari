import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from "./config.service";
//const $: any = require('jquery');
//import * as $ from "jquery";
import { SsoAuthService } from "../../../app/shared/services/sso-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ManageRouterService {

  constructor(private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    private sso: SsoAuthService
  ) { }

  public routerDF$ = new Subject();
  public appsData$ = new Subject();

  public finalData: any = {};

  public routerCount: number = 0;
  public offsetValue: number = 0;
  public loadingMore: boolean = false;
  public noMoreRecords: boolean = false;
  public isFreshSearch: boolean = false;
  public appNames: any = [];
  public updateContainerParams: object = {};

  public defaulContainersAllowedHtml: string = '';

  public routerObj: object = {
    main: true,
    hasSub: false,
    subCount: 0
  };

  public rightClickEventIds: any = [];
  public selectedSatelliteData: object = {
    'modelNumber': '',
    'firmwareVersion': ''
  };

  public routerDatas: object = {};
  public mainRouterData: object = {};
  public apMacAdr: string = '';
  public apRouterId: string = '';
  public searchRouterId: any = '';

  public searchRouterMacId: string = '';
  public gsRouter: boolean = false;
  public containerInputs: any = [];
  public routerDisplayData: any = [];

  public applicationsAllowed: any = [];
  public processingApps: any = [];
  public readyToInstallApps: any = [];
  public containersAllowed: any = [];
  public containersSelected: any = [];
  public parentRouter: any = {};
  public satRouters: any = {};
  public containersAllowedObj: any = this.config.getContainersAllowedObj();

  public applicationIds = {
    "CIEP": "7",
    "CIES": "6",
    "iothub": "2",
    "wifiapi": "10000",
    "vz_iothub": "10001",
    "sthub": "3"
  };

  refreshApps: boolean = false;

  public pendingData: any = {};

  public hideApplicationsList: boolean = false;
  routerListObj: any = {};
  installRouter: any = {};

  getRouterCount(macAddr: any): any {

    this.searchRouterMacId = macAddr;

    if (this.loadingMore) {
      return;
    }

    macAddr = macAddr.trim();

    if (!macAddr) {
      return;
    }

    let params = {};

    if (macAddr) {
      macAddr = macAddr.toLowerCase();
      params['value'] = macAddr;
    }

    params['type'] = "router";

    //this.loadingMore = true;

    let searchMacIsRG = false;

    this.routerListObj = {};

    return this.http.get(environment.SP_API_BASE_URL + '/router?type=' + params['type'] + '&value=' + params['value']);

  }

  getRouter(macAddr: any) {

    this.searchRouterMacId = macAddr;

    if (this.loadingMore) {
      return;
    }

    macAddr = macAddr.trim();

    if (!macAddr) {
      return;
    }

    let params = {};

    if (macAddr) {
      macAddr = macAddr.toLowerCase();
      params['value'] = macAddr;
    }

    params['type'] = "router";

    this.loadingMore = true;

    let searchMacIsRG = false;

    this.routerListObj = {};

    this.http.get(environment.SP_API_BASE_URL + '/router?type=' + params['type'] + '&value=' + params['value']).subscribe(
      (jdata: any) => {
        if (jdata) {
          this.hideApplicationsList = false;
          this.containerInputs = [];
          this.routerDisplayData = [];
          this.mainRouterData = {};
          this.apMacAdr = '';
          this.apRouterId = '';

          this.routerObj['hasSub'] = false;
          this.routerObj['subCount'] = 0;

          //$("#display-router-info-div").show();
          let uhtml = '';
          let containersAllowedHtml = '';
          let userData = jdata.user;

          this.finalData['userData'] = userData;

          let routers = jdata.routers;
          let showIothub = false;
          let showSthub = false;
          let showVz_iothub = false;
          this.rightClickEventIds = [];
          this.routerDatas = {};

          if (routers) {
            this.routerCount = routers.length;
            this.finalData['routers'] = routers;
            let modelNumberImage = '';
            let routerImagesObj = {
              // 'MGS2026E-blue': 'app-assets/images/router_GS2026E_blue.png',
              // 'MGS2026E-red': 'app-assets/images/router_GS2026E_red.png',
              // 'MGS2020E-blue': 'app-assets/images/router_GS2020E_blue.png',
              // 'MGS2020E-red': 'app-assets/images/router_GS2020E_red.png',
              // 'GS2026E-blue': 'assets/images/router_GS2026E_blue.png',
              // 'GS2026E-red': 'assets/images/router_GS2026E_red.png',
              // 'GS2020E-blue': 'assets/images/router_GS2020E_blue.png',
              // 'GS2020E-red': 'assets/images/router_GS2020E_red.png',
              // 'GM1020-blue': 'assets/images/router_GM1020_blue.png',
              // 'GM1020-red': 'assets/images/router_GM1020_red.png',
              // 'GM844E-blue': 'assets/images/router_GM844E_blue.png',
              // 'GM844E-red': 'assets/images/router_GM844E_red.png',
              // 'HK01-blue': 'assets/images/router_HK01_blue.png',
              // 'HK01-red': 'assets/images/router_HK01_red.png',
              // '844E-1-blue': 'assets/images/router_844E-1_blue.png',
              // '844E-1-red': 'assets/images/router_844E-1_red.png',
              // '844E-2-blue': 'assets/images/router_844E-2_blue.png',
              // '844E-2-red': 'assets/images/router_844E-2_red.png',
              // '813G-2-blue': 'assets/images/router_813G-2_blue.png',
              // '813G-2-red': 'assets/images/router_813G-2_red.png',
              // '804Mesh-blue': 'assets/images/router_GM844E_blue.png',
              // '804Mesh-red': 'assets/images/router_GM844E_red.png',
              // '854G-2-blue': 'assets/images/router_854G-2_blue.png',
              // '854G-2-red': 'assets/images/router_854G-2_red.png',
            };

            let html = "";
            let rname = "";
            let extraString = "";
            let routerImg = "";
            let modelNmbr = "";
            let arrowType = "";

            let userId = userData ? userData.userId : "";
            let routersLen = routers.length;
            if (routersLen > 1) {
              this.routerObj['hasSub'] = true;
              this.routerObj['subCount'] = routersLen - 1;

            }

            let gigaRouters = this.config.getGigaRouters();

            for (let i = 0; i < routersLen; i++) {
              this.routerListObj[routers[i].routerId] = routers[i];
              if (i == 0) {
                this.parentRouter = routers[i];
                this.installRouter = routers[i];
                for (let g = 0; g < gigaRouters.length; g++) {
                  if (this.parentRouter.modelNumber.indexOf(gigaRouters[g]) !== -1) {
                    this.hideApplicationsList = true;
                  }
                }
              } else {
                this.satRouters[routers[i].routerId] = routers[i];
              }
              modelNmbr = routers[i].modelNumber;

              if (routers[i].routerMac == macAddr) {
                this.searchRouterId = routers[i].routerId;
              }

              if (routers[i].routerMac == macAddr && routers[i].type == "ROUTER" && ((modelNmbr.substr(0, 2) == "GS") || (modelNmbr.substr(0, 3) == "MGS"))) {
                this.gsRouter = true;
              }

              /* #map-1151*/
              if (routers[i].routerMac == macAddr && routers[i].type == "ROUTER") {
                searchMacIsRG = true;
              }
              /* #map-1151*/

              if (routers[i].modelNumber == "GS2026E") {
                showIothub = true;
                showSthub = true;
              }

              if (routers[i].modelNumber == "HK01") {
                showVz_iothub = true;
              }

              rname = routers[i].name.replace(/'/g, '$');

              if (routers[i].status.toUpperCase() == "GOOD") {
                modelNumberImage = routers[i].modelNumber + "-blue";
                if (routerImagesObj[modelNumberImage]) {
                  routerImg = routerImagesObj[modelNumberImage];
                } else {
                  routerImg = 'assets/images/router_default_icon_3.png';
                }

              } else {
                modelNumberImage = routers[i].modelNumber + "-red";
                if (routerImagesObj[modelNumberImage]) {
                  routerImg = routerImagesObj[modelNumberImage];
                } else {
                  routerImg = 'assets/images/router_red_icon_3.png';
                }

              }

              if (i) {
                arrowType = 'assets/images/dotted-arrow.png';
              } else {
                arrowType = 'assets/images/arrow.png';
              }

              this.routerDisplayData.push({
                routerImage: routerImg,
                arrowType: arrowType,
                ...routers[i]
              });

              if (routers[i].type == "ROUTER") {
                this.mainRouterData = routers[i];
              }

              if (routers[i].type == "AP" && routers[i]['status'].toUpperCase() == "GOOD" && this.mainRouterData['firmwareVersion'] != routers[i].firmwareVersion) {
                this.rightClickEventIds.push({
                  "routerDiv": 'router-' + routers[i].routerId,
                  "routerId": routers[i].routerId
                });
              }


              if (typeof this.routerDatas[routers[i].routerId] != 'object') {
                this.routerDatas[routers[i].routerId] = {};
              }

              this.routerDatas[routers[i].routerId] = routers[i];
            }
          }

          this.updateContainerParams = jdata.user;
          this.updateContainerParams['macAddr'] = params['value'];
          let containersAllowed = jdata.containersAllowed;
          let containersSelected = jdata.containersSelected;
          let checkCode: boolean = false;

          this.containersAllowed = containersAllowed;
          this.containersSelected = containersSelected;

          // this.getApplicationsByRouter();

          /* #map-1070 */
          if (!showIothub) {
            let iothubIndex = containersAllowed.indexOf("iothub");

            if (iothubIndex > -1) {
              containersAllowed.splice(iothubIndex, 1);
            }
          }

          if (!showVz_iothub) {
            let vz_iothubIndex = containersAllowed.indexOf("vz_iothub");

            if (vz_iothubIndex > -1) {
              containersAllowed.splice(vz_iothubIndex, 1);
            }
          }

          /* #map-1070 */

          /* #map-1686 */
          if (!showSthub) {
            let sthubIndex = containersAllowed.indexOf("sthub");

            if (sthubIndex > -1) {
              containersAllowed.splice(sthubIndex, 1);
            }
          }
          /* #map-1686 */

          /* #map-1151*/

          if (!this.gsRouter) {
            let ciesIndex = containersAllowed.indexOf("CIES");

            if (ciesIndex > -1) {
              containersAllowed.splice(ciesIndex, 1);
            }

            let ciepIndex = containersAllowed.indexOf("CIEP");

            if (ciepIndex > -1) {
              containersAllowed.splice(ciepIndex, 1);
            }
          }

          /* #map-1151 */

          if (containersAllowed && containersAllowed.length) {
            let containersAllowedObj = this.containersAllowedObj;

            let containersAllowedName = '';

            let containersAllowedLength = containersAllowed.length;

            let disable = false;
            let scope = this.sso.getScopes();
            for (let j = 0; j < containersAllowedLength; j++) {
              checkCode = false;
              disable = true;

              if (containersSelected && containersSelected.indexOf(containersAllowed[j]) != -1) {
                checkCode = true;
              }

              if (containersAllowedObj[containersAllowed[j]]) {
                containersAllowedName = containersAllowedObj[containersAllowed[j]];
              } else {
                containersAllowedName = containersAllowed[j];
              }

              // scopes


              let ciepIndex = containersAllowed.indexOf("CIEP");

              if (ciepIndex > -1) {
                disable = false;
              }

              let ciesIndex = containersAllowed.indexOf("CIES");

              if (ciesIndex > -1) {
                disable = false;
              }

              let sthubIndex = containersAllowed.indexOf("sthub");

              if (sthubIndex > -1) {
                disable = false;
              }


              this.containerInputs.push({
                name: containersAllowedName,
                value: containersAllowed[j],
                checked: checkCode,
                disabled: disable
              });


            }

          }


        }

        this.finalData['hideApplicationsList'] = this.hideApplicationsList;
        this.finalData['searchRouterId'] = this.searchRouterId;
        this.finalData['searchRouterMacId'] = this.searchRouterMacId;
        this.finalData['parentRouter'] = this.parentRouter;
        this.finalData['hasSub'] = this.routerObj['hasSub'];
        this.finalData['containerInputs'] = this.containerInputs;
        this.finalData['routerDisplayData'] = this.routerDisplayData;
        this.finalData['containersSelected'] = this.containersSelected;
        this.finalData['routerDataLoaded'] = true;
        this.finalData['containersAllowedObj'] = this.containersAllowedObj;
        this.finalData['error'] = [];
        this.routerDF$.next(this.finalData);
        this.loadingMore = false;

        //console.log(this.finalData);
      },
      (err: any) => {
        this.loadingMore = false;
        this.finalData['routerDataLoaded'] = true;
        this.finalData['error'] = err;
        this.routerDF$.next(this.finalData);
      }
    );

  }

  routerContainerUpdate(data: any): any {
    let params = {
      containersSelected: data,
      ...this.finalData['userData']
    };

    delete params['name'];

    ////console.log(params);return;
    return this.http.post(environment.SP_API_BASE_URL + '/router/container/update', params);
  }

  removeRouter(data: any): any {

    let params = {};

    params['routerId'] = data.routerId;
    params['userId'] = data.userId;
    params['type'] = data.type;

    ////console.log(params);return;
    return this.http.post(environment.SP_API_BASE_URL + '/router/remove', params)
  }

  removeDuplicates(array: any) {
    return array.filter((a: any, b: any) => array.indexOf(a) === b);
  };

  getApplicationsByRouter(routerId: any): void {
    this.installRouter = this.routerListObj[routerId];
    let params = {};

    params['routerId'] = routerId;
    params['userId'] = this.finalData['userData'].userId;

    this.http.get(environment.SP_API_BASE_URL + '/application/list?routerId=' + params['routerId'] + '&userId=' + params['userId']).subscribe((jdata: any) => {
      if (jdata && jdata.apps && this.containersAllowed) {
        this.pendingData = {};
        let isStatusProcessing = false;
        this.refreshApps = false;

        let showEPC = false;
        let showPIQ = false;
        let showSHA = false;
        let showST = false;
        let installedServiceCount = 0;
        let readyToInstallServiceCount = 0;
        this.applicationsAllowed = [];
        this.processingApps = [];
        this.readyToInstallApps = [];


        let data = jdata.apps;

        if (routerId == this.parentRouter.routerId) {
          showEPC = true;
          showPIQ = true;
        }

        if (this.routerDatas[routerId] && this.routerDatas[routerId].modelNumber == "GS2026E") {
          showSHA = true;
          showST = true;
        }

        let installedAppsArr = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i].name == 'alexa') {
            continue;
          }

          if (this.containersAllowed.indexOf(data[i].name) == -1) {
            continue;
          }

          if (this.containersSelected.indexOf(data[i].name) == -1 && data[i].status == "installed") {
            this.refreshApps = true;
          }

          if (data[i].status == "installed") {
            installedAppsArr.push(data[i].name);
            if (data[i].status === 'installed' && routerId == this.parentRouter.routerId) {
              installedServiceCount++;
            }
          } else if (data[i].status == "uninstalled") {
            this.readyToInstallApps.push(data[i].name);
          } else if (data[i].status == "processing") {
            this.refreshApps = true;
            this.processingApps.push(data[i].name);
            isStatusProcessing = true;
            this.pendingData = {
              status: data[i].status,
              desc: data[i].desc,
              name: '( ' + this.containersAllowedObj[data[i].name] + ' )'
            };

          }

        }

        for (let i = 0; i < this.containersAllowed.length; i++) {
          if (this.containersAllowed[i] == 'CIES' && !showPIQ) {
            continue;
          }
          if (this.containersAllowed[i] == 'CIEP' && !showEPC) {
            continue;
          }

          if (this.containersAllowed[i] == 'iothub' && !showSHA) {
            continue;
          }
          if (this.containersAllowed[i] == 'vz_iothub' && !showST) {
            continue;
          }

          if (this.containersAllowed[i] == 'sthub' && !showST) {
            continue;
          }

          this.applicationsAllowed.push(this.containersAllowed[i]);

        }

        this.applicationsAllowed = this.removeDuplicates(this.applicationsAllowed);

        this.readyToInstallApps = [];

        for (var i = 0; i < this.applicationsAllowed.length; i++) {
          if (installedAppsArr.indexOf(this.applicationsAllowed[i]) != -1) {
            continue;
          }

          if (this.processingApps.indexOf(this.applicationsAllowed[i]) != -1) {
            continue;
          }

          if (routerId == this.parentRouter.routerId) {
            readyToInstallServiceCount++;
          }

          this.readyToInstallApps.push(this.applicationsAllowed[i]);

        }

        this.readyToInstallApps = this.removeDuplicates(this.readyToInstallApps);

        if (installedAppsArr.indexOf('alexa') != -1) {
          installedAppsArr.splice(installedAppsArr.indexOf('alexa'), 1);
        }

        // //console.log('installed apps - ' + installedAppsArr);
        // //console.log('applications allowed - ' + this.applicationsAllowed);
        // //console.log('processingApps - ' + this.processingApps)
        // //console.log('readyToInstallApps - ' + this.readyToInstallApps);
        // //console.log('isStatusProcessing ' + isStatusProcessing);

        let installedAppNames = [];
        for (let i = 0; i < installedAppsArr.length; i++) {
          installedAppNames.push(this.containersAllowedObj[installedAppsArr[i]]);
        }

        let readyToInstallAppsObj: any = [];
        for (let i = 0; i < this.readyToInstallApps.length; i++) {
          readyToInstallAppsObj.push({
            value: this.readyToInstallApps[i],
            name: this.containersAllowedObj[this.readyToInstallApps[i]]
          });
        }

        let showPendingApps = Object.keys(this.pendingData);
        this.appsData$.next({
          showPendingStatus: showPendingApps.length,
          readyToInstallApps: readyToInstallAppsObj,
          installedAppsArr: installedAppNames,
          processingApps: this.processingApps,
          pendingData: this.pendingData,
          appDataLoaded: true,
          refreshApps: this.refreshApps
        });

      }
    });



  }

  installApplication(data): any {
    data['appId'] = this.applicationIds[data['appId']];
    data['userId'] = this.finalData['userData'].userId;
    return this.http.post(environment.SP_API_BASE_URL + '/application/install', data);
  }

  updateFirmwareVersion(data: any): any {
    return this.http.post(environment.SP_API_BASE_URL + '/swupgrade/event/add', data);
  }

  getFWIdByModelVersion(data: any): any {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/firmware/list?modelNumber=' + data['modelNumber'] + '&firmwareVersion=' + data['firmwareVersion']);
  }

  checkContainerPermission(appId: any): any {
    let params = {};
    params['routerMac'] = this.parentRouter.routerMac;
    params['appId'] = appId;
    return this.http.get(environment.SP_API_BASE_URL + `/app/validate/container/permission?routerMac=${params['routerMac']}&appId=${params['appId']}`);
  }

  checkContainerInstall(appId: any): any {
    let params = {};
    params['routerMac'] = this.installRouter.routerMac;
    params['appId'] = appId;
    return this.http.get(environment.SP_API_BASE_URL + `/app/validate/container/install?routerMac=${params['routerMac']}&appId=${params['appId']}`);
  }

}
