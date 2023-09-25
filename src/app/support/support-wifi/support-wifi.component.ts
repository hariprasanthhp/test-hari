import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TranslateService } from './../../../app-services/translate.service';
import { SupportWifiService } from './services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getFormattedTimeZone } from '../shared/service/utility.class';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-support-wifi',
  templateUrl: './support-wifi.component.html',
  styleUrls: ['./support-wifi.component.scss']
})
export class SupportWifiComponent implements OnInit, OnDestroy {

  @ViewChild('selfHealConfirmModal', { static: true }) private selfHealConfirmModal: TemplateRef<any>;
  modalRef: any;

  language: any;
  languageSubject;
  deviceData: any = [];
  orgId: any;

  error: boolean;
  errorInfo: string;

  scopeFlag: any = {};

  ssidSelfHeal: boolean;
  ssidSelfHealData: any = {};
  subsId: any;
  ssidSelfHealTime: Date;
  activeTab: string = '';

  wifiRead: boolean = false;
  wifiWrite: boolean = false;
  wifiSSIDRead: boolean = false;
  wifiSSIDWrite: boolean = false;
  pageChangesSubs: any;
  showSelfHeal: boolean = false;
  selfHealConfirmMessage: string;
  apiCallDone: boolean;
  showRG: boolean = false;
  wifiDisabled: boolean;
  isModel7XX: boolean;
  selfHealVisibleSubs: any;
  selfHealVisiblityInfo: any = {
    hasSelfHeal: false,
    dataAvailable: false
  };
  MODULE: string = 'support';

  constructor(
    public ssoService: SsoAuthService,
    private translateService: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    private dialogService: NgbModal,
    private api: SupportWifiService,
    private dateUtils: DateUtilsService,
    public sso: SsoAuthService,
    private titleService: Title
  ) {
    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';

    this.orgId = this.ssoService.getOrgId();
    this.subsId = this.ssoService.getCSCSubscriberId();
    if (this.subsId === 'undefined') this.subsId = undefined;
    this.getScopes();

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnInit(): void {
    this.apiCallDone = true;
    this.showSelfHeal = false;
    this.error = false;
    let url = this.router.url;

    // if (localStorage.getItem('wifi_time_check')) {
    //   return;
    // }

    // localStorage.setItem('wifi_time_check', 'true');

    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
    this.deviceData = JSON.parse(sessionStorage.getItem("calix.deviceData"));


    this.selfHealVisibleSubs = this.api.selfHealVisibility.subscribe(data => {
      this.selfHealVisiblityInfo.hasSelfHeal = data;
      this.selfHealVisiblityInfo.dataAvailable = true;
      if (this.selfHealVisiblityInfo.hasSelfHeal) {
        this.getSelfHeal();
      }

    });

    this.pageChangesSubs = this.api.ssidPage.subscribe((data: any) => {
      this.activeTab = data;
    });

    //this.deviceData = this.deviceData.filter(obj => obj.serialNumber && !obj.hasOwnProperty('ont')); // TO fix CCL-33120  !obj.hasOwnProperty('ont') added
    this.deviceData = this.deviceData?.filter(obj => obj._id);
    if (this.deviceData?.length) {
      const index = this.deviceData.findIndex(device => device.opMode == "RG");
      if (index > -1) this.deviceData.splice(0, 0, this.deviceData.splice(index, 1)[0]);
    }

    /*
    //this.checkSpecialModel();
    if (url.indexOf('/rg/') > -1 && this.deviceData.length && !this.isModel7XX) {
      let urlFsan = url.split('/rg/')[1];
      let match = this.deviceData.filter((el) => el.serialNumber == urlFsan && el.opMode == 'RG');
      if (match.length) {
        // if (match[0]["modelName"] && (match[0]["modelName"].indexOf('GS') == -1 && match[0]["modelName"].indexOf('812G') == -1)) {
        //   this.showSelfHeal = true;
        // }
        this.activeTab = urlFsan;
        //this.router.navigate([`.${url}`]);
        //this.router.navigate([`./rg/${urlFsan}`], { relativeTo: this.route });
      } else {
        this.deviceNotMatchError();
      }
    } else if (url.indexOf('/extender/') > -1 && this.deviceData.length) {
      let urlFsan = url.split('/extender/')[1];
      let match = this.deviceData.filter((el) => el.serialNumber == urlFsan && el.opMode != 'RG');
      if (match.length) {
        this.activeTab = urlFsan;
        this.router.navigate([`.${url}`]);
      } else {
        this.deviceNotMatchError();
      }
    } else if (url.indexOf('/wifi/ssid') > -1 && this.wifiRead) {
      this.activeTab = 'ssid';
      //this.router.navigate([`./ssid`], { relativeTo: this.route });
    } else {
      let routeUrl = '';
      if (this.deviceData.length && this.deviceData[0]["serialNumber"] && this.deviceData[0]["opMode"] == 'RG' && !this.isModel7XX) {
        // if (this.deviceData[0]["modelName"].indexOf('GS') == -1) {
        //   this.showSelfHeal = true;
        // }
        this.activeTab = this.deviceData[0]["serialNumber"];
        routeUrl = `${this.MODULE}/wifi/rg/${this.deviceData[0]["serialNumber"]}`;
        routeUrl = `rg/${this.deviceData[0]["serialNumber"]}`;
        //this.router.navigate([routeUrl], { relativeTo: this.route });
      } else if (this.deviceData.length && this.deviceData[0]["serialNumber"] && this.deviceData[0]["opMode"] !== 'RG') {
        this.activeTab = this.deviceData[0]["serialNumber"];
        routeUrl = `${this.MODULE}/wifi/extender/${this.deviceData[0]["serialNumber"]}`;
        this.router.navigate([routeUrl]);
      } else if (this.deviceData.length && this.isModel7XX && this.deviceData[1]["serialNumber"] && this.deviceData[1]["opMode"] !== 'RG') {
        this.activeTab = this.deviceData[1]["serialNumber"];
        routeUrl = `${this.MODULE}/wifi/extender/${this.deviceData[1]["serialNumber"]}`;
        this.router.navigate([routeUrl]);
      } else {
        this.deviceNotMatchError();
      }
    }

*/

    //this.getSelfHeal();
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.pageChangesSubs) {
      this.pageChangesSubs.unsubscribe();
    }
    if (this.selfHealVisibleSubs) this.selfHealVisibleSubs.unsubscribe();
  }

  getScopes() {
    let scopes = this.ssoService.getScopes();

    // if (environment.VALIDATE_SCOPE) {
    //   scopes['cloud.rbac.csc.wifi'] = scopes['cloud.rbac.csc.wifi'] ? scopes['cloud.rbac.csc.wifi'] : [];
    //   if (scopes && (scopes['cloud.rbac.csc.wifi'])) {
    //     if (scopes['cloud.rbac.csc.wifi'].indexOf('read') !== -1) {
    //       this.wifiRead = true;
    //     }
    //     if (scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1) {
    //       this.wifiWrite = true;
    //     }
    //   }
    // } else {

    //   this.wifiRead = true;
    //   this.wifiWrite = true;
    // }
    if (environment.VALIDATE_SCOPE) {
      if (this.ssoService.getCscType() !== 'DME') {
        scopes['cloud.rbac.csc.wifi'] = scopes['cloud.rbac.csc.wifi'] ? scopes['cloud.rbac.csc.wifi'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi'])) {
          if (scopes['cloud.rbac.csc.wifi'].indexOf('read') !== -1) {
            this.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1) {
            this.wifiWrite = true;
          }
        }
      } else {
        scopes['cloud.rbac.csc.wifi.basic'] = scopes['cloud.rbac.csc.wifi.basic'] ? scopes['cloud.rbac.csc.wifi.basic'] : [];
        if (scopes && (scopes['cloud.rbac.csc.wifi.basic'])) {
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('read') !== -1) {
            this.wifiRead = true;
          }
          if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1) {
            this.wifiWrite = true;
          }
        }
      }

    } else {

      this.wifiRead = true;
      this.wifiWrite = true;
    }

    /*------- Start code for CCL-48250 -----------*/
    if (environment.VALIDATE_SCOPE) {
      if (this.ssoService.getCscType() !== 'DME') {
        scopes['cloud.rbac.csc.ssidmanager'] = scopes['cloud.rbac.csc.ssidmanager'] ? scopes['cloud.rbac.csc.ssidmanager'] : [];
        scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] = scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] ? scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] : [];
        scopes['cloud.rbac.csc.ssidmanager.ssidedit'] = scopes['cloud.rbac.csc.ssidmanager.ssidedit'] ? scopes['cloud.rbac.csc.ssidmanager.ssidedit'] : [];
        if (scopes['cloud.rbac.csc.ssidmanager.ssidcreate'].length > 0 || scopes['cloud.rbac.csc.ssidmanager.ssidedit'].length > 0) {
          this.wifiSSIDRead = true;
        }
        else {
          this.wifiSSIDRead = false;
        }
      }
      // else {
      //   scopes['cloud.rbac.csc.wifi.basic'] = scopes['cloud.rbac.csc.wifi.basic'] ? scopes['cloud.rbac.csc.wifi.basic'] : [];
      //   if (scopes && (scopes['cloud.rbac.csc.wifi.basic'])) {
      //     if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('read') !== -1) {
      //       this.wifiRead = true;
      //     }
      //     if (scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1) {
      //       this.wifiWrite = true;
      //     }
      //   }
      // }

    } else {

      this.wifiSSIDRead = false;
      //this.wifiSSIDWrite = true;
    }
    /*------- End code for CCL-48250 -----------*/

  }

  openSelfHealConfirmModal(e) {
    e.preventDefault()
    this.selfHealConfirmMessage = `${this.language['Do you want to turn Wi-Fi optimization']} ${this.ssidSelfHeal ? this.language['OFF'] : this.language['ON']}?`;
    this.modalRef = this.dialogService.open(this.selfHealConfirmModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  doSsidSelfHeal() {
    let change = this.ssidSelfHeal ? false : true;
    this.api.updateSelfHealStaus(this.orgId, this.subsId, change).subscribe((res: any) => {
      this.getSelfHeal();
      this.closeModal();
    },
      (err: HttpErrorResponse) => {

        //this.ssidSelfHeal = !this.ssidSelfHeal;
      });
  }

  getSelfHeal() {
    if (!this.subsId) return;
    this.api.getSelfHealStaus(this.orgId, this.subsId).subscribe((res: any) => {
      if (res && Object.keys(res).length) {
        this.ssidSelfHealData = res;
        this.ssidSelfHeal = res.selfHeal ? true : false;
        this.ssidSelfHealTime = res.enableTime ? new Date(res.enableTime) : null;
        this.api.selfHealChanged(res);
      }
      this.showSelfHeal = true;

    },
      (err: HttpErrorResponse) => {
      });
  }

  deviceNotMatchError() {
    this.deviceData = [];
    this.error = true;
    this.errorInfo = "Device not found"
  }

  setActiveTab(page, device) {
    if (device.opMode == 'WAP') {
      this.titleService.setTitle(`${this.language['Mesh']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    }
    this.activeTab = page;
  }

  closeModal() {
    this.dialogService.dismissAll();
  }

  checkSpecialModel() {
    if (this.deviceData.length) {
      const index = this.deviceData.findIndex(device => device.opMode == "RG");
      if (index > -1) this.deviceData.splice(0, 0, this.deviceData.splice(index, 1)[0]);
    }

    if (this.deviceData && this.deviceData[0].opMode == "RG") {
      let modelNumber = this.deviceData[0].modelName.split('-')[0].replace(/\D/g, '');
      if (this.deviceData.length == 1 && parseInt(modelNumber) >= 700 && parseInt(modelNumber) <= 799) {
        this.wifiDisabled = true;
        this.isModel7XX = true;
      } else if (this.deviceData.length > 1 && parseInt(modelNumber) >= 700 && parseInt(modelNumber) <= 799 && this.deviceData[1].opMode != "RG") {
        this.isModel7XX = true;
        //this.getMetaData(this.deviceData[1].serialNumber);
      }

    }
  }
  isSmbEnabled() {
    const subInfo = JSON.parse(sessionStorage.getItem('calix.subscriberInfo'));
    const ent = this.sso.getEntitlementsArr();
    return (subInfo?.devices || []).filter(obj => obj.bSmbMode).length && subInfo?.isSmbOnboarded && ent.includes('218');
  }

}
