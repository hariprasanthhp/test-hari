import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
//import { DataServiceService } from '../data.service';
import { SsoAuthService } from './../../shared/services/sso-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
//import { SubscribeService } from '../shared/service/subscriber.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CcoCommonService } from '../shared/services/cco-common.service';
import { DataServiceService } from 'src/app/support/data.service';

@Component({
  selector: 'app-cco-header',
  templateUrl: './cco-header.component.html',
  styleUrls: ['./cco-header.component.scss']
})
export class CcoHeaderComponent implements OnInit, OnDestroy {
  ccoUrl = '';
  language: any;
  languageSubject;

  searchSubscriber;
  searchResult;
  orgId;
  searchText: string;
  scopeFlag: any = {};
  showNetops = false;
  ccoSystemSearchText: any;
  _array = Array;
  isDev: boolean = false;
  devicesSelected: any;
  showDashboard = true;

  constructor(
    private translateService: TranslateService,
    //private service: DataServiceService,
    public router: Router,
    public ssoService: SsoAuthService,
    private changeDetect: ChangeDetectorRef,
    //private subscribeService: SubscribeService
    private ccoService: CcoCommonService,
    private dataService: DataServiceService
  ) {
    let base = `${environment.API_BASE}`;
    let host = window.location.host;
    if (base.indexOf('/dev.api.calix.ai') > -1 || host.indexOf('localhost') > -1) {
      this.isDev = true;
    } else this.isDev = false;
    //this.isDev = true;
  }

  menus: any = {
    home: false,
    issues: false,
    health: false,
    traffic: false,
    //systems: false,
    services: false,
    operations: false,
    dashboard: false,
  }

  urls = {
    home: './home',
    issues: './alerts',
    health: './health',
    traffic: './traffic',
    //systems: './system',
    operations: './operations',
    dashboard: './dashboard',
    services: './services'
  }

  activeMenus = {
    home: false,
    alerts: false,
    health: false,
    traffic: false,
    services: false,
    //system: false,
    operations: false,
    dashboard: false,

  }

  urlsInfo = {};

  ngOnInit(): void {
    this.setActiveMenu();
    this.urlsInfo = this.ssoService.getCCOUrlInfo();
    let scopes = this.ssoService.getScopes();
    if (this.isDev) this.doSearch();


    if (environment.VALIDATE_SCOPE) {

      let validScopes: any = Object.keys(scopes);

      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.insights') !== -1) {
            this.menus['home'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.issues') !== -1) {
            this.menus['issues'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.health') !== -1) {
            this.menus['health'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.traffic') !== -1) {
            this.menus['traffic'] = true;
            continue;
          }

          // if (validScopes[i].indexOf('cloud.rbac.coc.systems') !== -1) {
          //   this.menus['systems'] = true;
          //   continue;
          // }

          if (validScopes[i].indexOf('cloud.rbac.coc.services') !== -1) {
            this.menus['services'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.operations') !== -1) {
            this.menus['operations'] = true;
            continue;
          }

          if (validScopes[i].indexOf('cloud.rbac.coc.dashboard') !== -1) {
            this.menus['dashboard'] = true;
            continue;
          }

        }
      }

    } else {
      this.menus = {
        home: true,
        issues: true,
        health: true,
        traffic: true,
        //systems: true,
        services: true,
        operations: true,
        dashboard: true,
      }

    }

    let enttlmnts = this.ssoService.getEntitlements();
    if (enttlmnts[210] && !enttlmnts[102]) {
      this.menus['dashboard'] = false;
    }

    // if ((environment['API_BASE'].indexOf('dev.api.calix.ai') !== -1) || (environment['API_BASE'].indexOf('stage.api.calix.ai') !== -1)) {
    //   this.showDashboard = true;
    // }

    let keys = Object.keys(this.menus);

    keys.forEach((key: any) => {
      if (this.urlsInfo[key]) {
        let ukeys = Object.keys(this.urlsInfo[key]);

        if (ukeys.length) {
          for (let i = 0; i < ukeys.length; i++) {
            if (scopes[this.urlsInfo[key][ukeys[i]].scope]) {
              this.urls[key] = this.urlsInfo[key][ukeys[i]].path;

              if (!this.ccoUrl) {
                this.ccoUrl = this.urlsInfo[key][ukeys[i]].path;
              }

              break;
            }
          }
        }

      }
    });

    console.log(this.ccoUrl)

    this.orgId = this.ssoService.getOrgId();
    const self = this;
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    /* window.onclick = e => {
      console.log(e.target);  // to get the element
      console.log(e.target.tagName);  // to get the element tag name alone
    } */

    this.getScopes();

  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    if (environment.VALIDATE_SCOPE) {
      scopes['cloud.rbac.csc.dashboards'] = scopes['cloud.rbac.csc.dashboards'] ? scopes['cloud.rbac.csc.dashboards'] : [];

      if (scopes && (scopes['cloud.rbac.csc.dashboards'])) {
        if (scopes['cloud.rbac.csc.dashboards'].indexOf('read') !== -1 || scopes['cloud.rbac.csc.dashboards'].indexOf('write') !== -1) this.scopeFlag.dashboard = true;
      }
    } else {
      this.scopeFlag.dashboard = true;
    }
  }

  // searchByCharacters(event) {
  //   const textEntered: string = $(event.target).val().toString();
  //   console.log("69", textEntered);
  //   if (textEntered.length < 2) return;
  //   this.searchResult = [];
  //   if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
  //   this.searchSubscriber = this.service.performSearch(this.orgId, textEntered, 1, 500).subscribe(
  //     (res: any) => {
  //       if (res) {
  //         this.searchResult = res.records;
  //         this.changeDetect.detectChanges();
  //       }
  //     },
  //     err => {

  //     }
  //   );
  // }




  subscribers$;
  private ccoSystemSearchText$ = new Subject<string>();

  search(subscribersName: string) {
    if (!this.isDev) return;
    this.ccoSystemSearchText$.next(subscribersName);
  }

  doSearch() {
    this.subscribers$ = this.ccoSystemSearchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap(textEntered => 
      //   this.service.performSearch(this.orgId, textEntered, 1, 500))
      switchMap(textEntered => {
        this.ssoService.setRefreshTokenNew();
        return this.ccoService.performSearch(this.orgId, textEntered, 1, 500)
      })
    ).subscribe(
      (res: any) => {
        if (res) {
          if (res?.records) {
            res?.records.forEach(obj => {
              const RGDevices = obj?.devices.filter(device => device.opMode == "RG");
              if (obj?.devices.length) {
                const index = obj?.devices.findIndex(device => device.opMode == "RG");
                if (index > -1) obj?.devices.splice(0, 0, obj?.devices.splice(index, 1)[0]);
              }
              if (RGDevices.length > 1) {
                let deviceSet: any = [];
                RGDevices.forEach(rg => {
                  let deviceCollector = [rg, ...obj?.devices.filter(device => device.wapGatewaySn == rg.serialNumber)];
                  deviceSet.push(deviceCollector);
                });
                const ds = deviceSet.flat(2).map(devs => devs.deviceId);
                const notMatched = obj?.devices.filter(dev => ds.indexOf(dev.deviceId) == -1);
                if (notMatched.length > 0) deviceSet.push()
                obj.devices = deviceSet;
              }
            });
          }
          this.searchResult = res.records;
          this.changeDetect.detectChanges();
        }
      },
      err => {

      }
    );
  }

  searchByCharacters(event) {
    if (!this.isDev) return;
    const textEntered: string = $(event.target).val().toString();
    console.log("69", textEntered);
    if (textEntered.length < 2) return;
    this.searchResult = [];

    this.ccoSystemSearchText$.next(textEntered);
  }

  showSystem(subscriber, device?) {
    // localStorage.setItem("calix.foundation_systems_data", JSON.stringify(subscriber));
    // localStorage.setItem('calix.foundation_systems_id', subscriber._id);
    let sn;
    if (device) {
      sn = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
    } else {
      if (subscriber.devices && subscriber.devices.length) {
        if (subscriber.devices.length > 1) {
          const RGDevices = subscriber.devices.filter(device => device.opMode == "RG");
          device = RGDevices.length ? RGDevices[0] : subscriber.devices[0];
        } else {
          device = subscriber.devices[0];
        }
        sn = device.deviceId ? device.deviceId : (device.serialNumber ? device.serialNumber : (device.macAddress ? device.macAddress : ''));
      }
    }

    let subscriberId = subscriber.subscriberId ? subscriber.subscriberId : '';
    if (!sn && !subscriberId) {
      return;
    }
    //this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details/${sn}`], { state: { ccoSystemSearchText: this.ccoSystemSearchText || "" } });
    this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: sn, subscriber: subscriberId } });
  }

  performSearch() {
    if (!this.isDev) return;
    this.ccoService.showCount(false);
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    //$("#paramsPassed").text($("#supportSearchId").val().toString());
    this.router.navigate(['/cco/search-system-list'], { state: { ccoSystemSearchText: this.ccoSystemSearchText || "" } });
  }

  showSubscriber(subscriberId, devices) {
    $("#paramsPassed").text(subscriberId ? subscriberId : '');
    this.getSubscriberInfo(subscriberId, devices);
  }

  getSubscriberInfo(subscriberId, devices) {
    const RGDevices = devices.filter(device => device.opMode == "RG");
    if (RGDevices.length > 1) {
      devices = [
        RGDevices[0],
        ...devices.filter(device => device.wapGatewaySn == RGDevices[0].serialNumber)
      ];
    }
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.deviceData`, JSON.stringify(devices));
    sessionStorage.setItem(`${this.ssoService.getTabId()}calix.subscriberId`, subscriberId);
    this.dataService.setSubscriberInfo(undefined);
    this.dataService.setSubscriberTabInfoData(undefined);
    this.dataService.multipleRegInstance = undefined;
    this.router.navigate(['/cco/overview'], { state: { ccoSystemSearchText: this.ccoSystemSearchText || "" } });
  }

  helpRoute() {
    const helpUrl = (this.ssoService.getCscType() === "DME") ?
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/dme/index.htm#88478.htm" :
      "https://www.calix.com/content/calix/en/site-prod/library-html/software-products/cloud/nm/support/help/index.htm#93079.htm";
    window.open(helpUrl, "_blank");
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    this.ccoSystemSearchText = null;
  }


  isMenuActive(menuName: string) {
    if ((window.location.pathname).indexOf(`/${menuName}/`) !== -1) {
      return true;
    }

    return false;
  }

  setActiveMenu() {
    let validUrls = ['/cco/alarm-notifications/', '/cco/outage-workflow/', '/cco/system/cco-network-system', '/cco/notifications/health/']
    for (let menu in this.activeMenus) {
      this.activeMenus[menu] = menu === 'health' ? this.isMenuActive(`cco/${menu}`) : this.isMenuActive(menu);
    }

    validUrls.forEach((url: any) => {
      if ((window.location.pathname).indexOf(url) !== -1) {
        this.activeMenus['operations'] = true;
      }
    });

    const servicesUrls = ['/cco/system/subscribers-impact'];
    servicesUrls.forEach((url: any) => {
      if ((window.location.pathname).indexOf(url) !== -1) {
        this.activeMenus['services'] = true;
      }
    });

    //Below fix to highlight Traffic page while in recording view and list
    let validTrafficRecordingUrl = ["cco/record"];
    validTrafficRecordingUrl.forEach((vurl) => {
      if ((window.location.pathname).includes(vurl)) {
        this.activeMenus['traffic'] = true;
      }
    })

    //console.log(this.activeMenus);

  }





}

