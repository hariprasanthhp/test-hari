import { Component, OnInit } from '@angular/core';
import { TranslateService } from './../../../app-services/translate.service';
import { SsoAuthService } from '../../shared/services/sso-auth.service'
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../data.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-support-service',
  templateUrl: './support-service.component.html',
  styleUrls: ['./support-service.component.scss']
})
export class SupportServiceComponent implements OnInit {
  language: any;
  languageSubject;
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
  checkDeviceManfacturer = sessionStorage.getItem("calix.deviceData")?JSON.parse(sessionStorage.getItem("calix.deviceData")):[];
  deviceManfacturerName;
  apiCallDone: boolean;
  metaData: any = {};
  videoWan: boolean = true;
  voiceWan: boolean = true;
  MODULE: string = 'support';

  constructor(private router: Router, private translateService: TranslateService, private dataChartService: DataServiceService, private sso: SsoAuthService) {
    let url = this.router.url;
    if (url.indexOf('/support/') > -1) {
      this.MODULE = 'support';
    } else this.MODULE = 'cco';
  }

  ngOnInit(): void {
    this.thirdPartyDevice = this.checkDeviceManfacturer.filter(obj => (obj?.manufacturer !== 'Calix' && obj.manufacturer)).length ? true : false;

    this.orgId = this.sso.getOrgId();
    let scopes = this.sso.getScopes();
    this.getDevice();
    if (environment.VALIDATE_SCOPE) {
    //  scopes['cloud.rbac.csc.services.data'] = scopes['cloud.rbac.csc.services.data'] ? scopes['cloud.rbac.csc.services.data'] : [];
      scopes['cloud.rbac.csc.services.video'] = scopes['cloud.rbac.csc.services.video'] ? scopes['cloud.rbac.csc.services.video'] : [];
      scopes['cloud.rbac.csc.services.voice'] = scopes['cloud.rbac.csc.services.voice'] ? scopes['cloud.rbac.csc.services.voice'] : [];

      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.csc.services.data') !== -1) { 
            this.showDataService = true;
            break;
          }
        }
      }
      /* if (scopes && (scopes['cloud.rbac.csc.services.data'] && scopes['cloud.rbac.csc.services.data'].length)) {
        this.showDataService = true;
      } */
      
      if (scopes && (scopes['cloud.rbac.csc.services.video'] && scopes['cloud.rbac.csc.services.video'].length)) {
        this.showVideoService = true; // this.showVoiceService = true;
      }

      if (scopes && (scopes['cloud.rbac.csc.services.voice'] && scopes['cloud.rbac.csc.services.voice'].length)) {
        this.showVoiceService = true; ///this.showVideoService = true;
      }

      if (this.showDataService) {

      } else if (this.showVoiceService) {
        this.router.navigate(['/support/service/voice']);
      } else if (this.showVideoService) {
        this.router.navigate(['/support/service/video']);
      }
    } else {
      this.showDataService = true;
      this.showVoiceService = true;
      this.showVideoService = true;
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.apiCallDone = true;
  }

  getDevice() {
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.deviceInfo = this.deviceInfo?this.deviceInfo.filter(obj => obj.serialNumber).sort((a, b) => (a.opMode != "RG") ? 1 : -1):'';
    this.deviceInfo = this.deviceInfo?this.deviceInfo.filter(obj => obj.opMode == "RG"):'';
    this.deviceInfo = this.deviceInfo.length ? this.deviceInfo[0] : {};
    this.serialNumberSelected = this.deviceInfo?.serialNumber;

    this.metaData = this.dataChartService.getMetaData(this.serialNumberSelected);
    if (this.metaData) {
      this.checkWanStatus();
    } else this.getMetaData();
    //this.getVideo();
    //this.getVoice();

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
  /*getVideo(){
    this.loader1=true;
    this.dataChartService.getServiceVideo(this.orgId, this.serialNumberSelected).subscribe(
      (data: any) => {
        this.loader1=false;
        localStorage.setItem('calix.videopermission',JSON.stringify('read'));
        if(JSON.stringify(data.videoMulticastSystems.data) !== '{}' || JSON.stringify(data.wanInfo.data) !== '{}'){
          this.showVideoService1 = true;
          this.dataChartService.setVideo(data);
        } else{
          this.showVideoService1 = false;
        }
      } , err => {
        this.showVideoService1 = false;
        localStorage.setItem('calix.videopermission',JSON.stringify('error'));
      }
      )
  }
  getVoice(){
    this.loader2=true;
    this.dataChartService.getServiceVoice(this.orgId, this.serialNumberSelected).subscribe(
    (data: any) => {
      this.loader2=false;
       localStorage.setItem('calix.voicepermission',JSON.stringify('read'))
       //console.log('131',data.voiceStatus.data.length);
       //console.log('94',data.wanInfo.data);
        if(JSON.stringify(data.voiceStatus.data) !== '{}' || JSON.stringify(data.wanInfo.data) !== '{}'){
          this.dataChartService.setVoice(data);
          this.showVoiceService1 = true;
        } else{
          this.showVoiceService1 = false;
        }
      }, err => {
        this.showVoiceService1 = false;
        localStorage.setItem('calix.voicepermission',JSON.stringify('error'))
      })
  }*/

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

  objectExistence(obj) {
    return Object.keys(obj || {}).length;
  }

  ngOnDestroy() {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

}
