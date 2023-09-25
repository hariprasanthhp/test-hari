
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SupportRealtimeService } from "./support-realtime.service";
import { SsoAuthService } from "../.../../../shared/services/sso-auth.service";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataServiceService } from '../data.service';

@Component({
  selector: 'app-support-traffic-reports',
  templateUrl: './support-traffic-reports.component.html',
  styleUrls: ['./support-traffic-reports.component.scss']
})
export class SupportTrafficReportsComponent implements OnInit {
  language: any;
  languageSubject;
  source: any;
  sbcbrEpSubcribe: any;

  orgId;
  loader1 = false;
  loader2 = false;
  serialNumberSelected;
  showDataService = false;
  showVoiceService = false;
  showVideoService = false;
  //showVoiceService1 = false;
  //showVideoService1= false;
  deviceInfo: any = { 'modelName': '' };
  thirdPartyDevice: boolean = false;
  checkDeviceManfacturer = JSON.parse(sessionStorage.getItem("calix.deviceData"));
  deviceManfacturerName;
  apiCallDone: boolean;
  MODULE: string = 'support';

  metaData: any = {};
  videoWan: boolean = true;
  voiceWan: boolean = true;
  constructor(private translateService: TranslateService,
    private sso: SsoAuthService,
    private rtService: SupportRealtimeService,
    private router: Router,
    private dataChartService: DataServiceService

  ) {
    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    if (this.sso.getSubscriberEndpointId()) {
      this.getDataByNewToken();
    } else {
      this.sbcbrEpSubcribe = this.sso.subscriberEndPointId$.subscribe((id: any) => {
        console.log('subscribe', id);
        if (id) {
          this.getDataByNewToken();
        }
      });
    }


    this.thirdPartyDevice = this.checkDeviceManfacturer ? (this.checkDeviceManfacturer.filter(obj => (obj?.manufacturer !== 'Calix' && obj.manufacturer)).length ? true : false) : false;

    //localStorage.removeItem("calix.videopermission");
    //localStorage.removeItem("calix.voicepermission");
    //this.router.navigate(['/support/service/data']);
    this.orgId = this.sso.getOrgId();
    let scopes = this.sso.getScopes();
    this.getDevice();
    if (environment.VALIDATE_SCOPE) {
      //scopes['cloud.rbac.csc.services.data'] = scopes['cloud.rbac.csc.services.data'] ? scopes['cloud.rbac.csc.services.data'] : [];
      scopes['cloud.rbac.csc.services.video'] = scopes['cloud.rbac.csc.services.video'] ? scopes['cloud.rbac.csc.services.video'] : [];
      scopes['cloud.rbac.csc.services.voice'] = scopes['cloud.rbac.csc.services.voice'] ? scopes['cloud.rbac.csc.services.voice'] : [];

      /*if (scopes && (scopes['cloud.rbac.csc.services.data'] && scopes['cloud.rbac.csc.services.data'].length)) {
        this.showDataService = true;
      }*/


      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.services.data') !== -1) {
            this.showDataService = true;
            break;
          }
        }
      }

      if (scopes && (scopes['cloud.rbac.csc.services.video'] && scopes['cloud.rbac.csc.services.video'].length)) {
        this.showVideoService = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.services.voice'] && scopes['cloud.rbac.csc.services.voice'].length)) {
        this.showVoiceService = true;
      }
    } else {
      this.showDataService = true;
      this.showVoiceService = true;
      this.showVideoService = true;
    }

    this.apiCallDone = true;



  }

  getDevice() {
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.deviceInfo = this.deviceInfo?.filter(obj => obj.serialNumber).sort((a, b) => (a.opMode != "RG") ? 1 : -1);
    this.deviceInfo = this.deviceInfo?.filter(obj => obj.opMode == "RG");
    this.deviceInfo = this.deviceInfo?.length ? this.deviceInfo[0] : {};
    this.serialNumberSelected = this.deviceInfo?.serialNumber;

    this.metaData = this.dataChartService.getMetaData(this.serialNumberSelected);
    if (this.metaData) {
      this.checkWanStatus();
    } else this.getMetaData();

  }

  getDataByNewToken() {
    // if (this.sso.getSubscriberEndpointId() !== window.localStorage.getItem('calix.temp_endpoint_id')) {
    //   if (this.source) {
    //     this.source.close();
    //   }

    //   this.source = null;

    // }

    // window.localStorage.setItem('calix.temp_endpoint_id', this.sso.getSubscriberEndpointId());

    // this.sso.getAuthTokenByRT().subscribe((json: any) => {
    //   this.sso.setLoginInfo(json);

    //   this.source = this.rtService.getData();



    // }, (err: any) => {
    // });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();

    if (this.source) {
      this.source.close();
    }

    if (this.sbcbrEpSubcribe) {
      this.sbcbrEpSubcribe.unsubscribe();
    }

    this.source = null;
    this.rtService.clearData();

    //this.rtService.closeEventSource();
  }

  ngAfterViewInit() {
    let path = window.location.pathname;
    if (path.indexOf("support/traffic-reports/") !== -1) {
      setTimeout(() => {
        console.log("trigger css");
        $("#serviceDataTabHrefId").addClass("active");
      }, 500);

    }

  }
  objectExistence(obj) {
    return Object.keys(obj || {}).length;
  }
  getMetaData() {
    if (!this.serialNumberSelected) return;
    this.loader1 = true;
    this.dataChartService.fetchMetaData(this.orgId, this.serialNumberSelected).subscribe((res: any) => {
      this.loader1 = false;
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      //console.log('343',this.metaData);
      this.checkWanStatus();
      this.dataChartService.setMetaData(this.serialNumberSelected, this.metaData);

    }, err => {
      this.loader1 = false;
      //this.pageErrorHandle(err);
    });
  }

  reStructureMeta(obj) {
    this.metaData[obj.featureName.replace(/[.]/g, "")] = {};
    if (obj.hasOwnProperty("fields")) {
      obj.fields.forEach(element => {
        this.metaData[obj.featureName.replace(/[.]/g, "")][element.name.replace(/[.]/g, "")] = element;
      });
    } else if (obj.hasOwnProperty("configuration")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["config"] = obj.configuration;
    } else if (obj.hasOwnProperty("supported")) {
      this.metaData[obj.featureName.replace(/[.]/g, "")]["supported"] = obj.supported;
    }
  }



  checkWanStatus() {
    if (this.metaData?.WANInfo) {
      let tabAllowed = [];
      this.loader1 = true;
      this.dataChartService.getWanInfo(this.orgId, this.serialNumberSelected).subscribe((res: any) => {
        this.loader1 = false;
        if (res && res.length) {
          res.filter(obj => {
            if (obj.bIsVideo) tabAllowed.push('video');
            if (obj.bIsVoice) tabAllowed.push('voice');
          });
        }
        this.videoWan = tabAllowed.includes('video');
        this.voiceWan = tabAllowed.includes('voice');
      }, err => {
        this.loader1 = false;
        this.videoWan = false;
        this.voiceWan = false;
      });
    } else {
      this.videoWan = false;
      this.voiceWan = false;
    }
  }


}
