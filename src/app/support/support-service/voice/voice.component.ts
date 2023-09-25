import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from '../../data.service';
import { SupportServiceService } from '../services/support-service.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss']
})
export class VoiceComponent implements OnInit {
  language: any = {};
  upTime: any;
  data: any;
  languageSubject;
  loader: boolean;
  wanInfo: any = [];
  wanInfoToDisplay: any = {};
  orgId: any;
  alertMessage: any;
  isError: boolean;
  voiceStatus: any = [];
  voiceStatusLine: any = {};
  apiUnsubscriber: any;
  deviceInfo: any = [];
  deviceData: any;
  routerSerialNumber: any = '';
  voiceLine: any = 0;
  isVoiceCount: any;
  isSuccess: boolean;
  metaData: any = {};
  serialNumberSelected: any;
  scopeFlag: any = {};
  enablestatus
  ontusoc
  isAutomaticallyCreatedData
  isont = false
  interface
  voiceServicesStatus: any = {};
  VoiceService: any;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  servicesData
  item: any = [];
  interfacedata
  availableL: boolean = false
  voiceinterface
  deviceflag: boolean = false
  subsId
  sipstatuscheck: boolean = false
  constructor(
    private translateService: TranslateService,
    private dataChartService: DataServiceService,
    public ssoService: SsoAuthService,
    private supportService: SupportServiceService,
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.ssoService.setActionLog('CSC', 'pageHit', 'Service', this.router.url, 'Service voice page is loaded');
    this.orgId = this.ssoService.getOrgId();
    this.deviceInfo = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Voice']} - ${this.language['Service']} 
      - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
      this.lineSelection(this.voiceLine);
    });
    this.titleService.setTitle(`${this.language['Voice']} - ${this.language['Service']} 
    - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.deviceInfo = this.deviceInfo ? this.deviceInfo.filter(obj => obj.serialNumber).sort((a, b) => (a.opMode != "RG") ? 1 : -1) : [];
    this.deviceInfo = this.deviceInfo ? this.deviceInfo.filter(obj => obj.modelName != "804Mesh") : [];
    this.serialNumberSelected = this.deviceInfo[0]?.serialNumber;
    if (this.deviceInfo.length) this.deviceflag = true;//this.loadData('');
    let ont = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    (ont || []).forEach(element => {
      if (element.hasOwnProperty('ont')) {
        this.isont = true
      }
    })
    this.getScopes();

    let SubscriberId = this.ssoService.getCSCSubscriberId();
    this.subsId = SubscriberId === 'undefined' ? undefined : SubscriberId
    if (this.subsId && this.ssoService.getEntitlementsArr().indexOf('102') > -1) {
      this.getAllSubsServicesData()
    }
    else if (this.deviceflag) {
      this.loadData('');
    }

  }

  getScopes() {
    let scopes = this.ssoService.getScopes();
    scopes['cloud.rbac.csc.services.voice'] = scopes['cloud.rbac.csc.services.voice'] ? scopes['cloud.rbac.csc.services.voice'] : [];

    if (environment.VALIDATE_SCOPE) {
      if (scopes && (scopes['cloud.rbac.csc.services.voice'])) {
        if (scopes['cloud.rbac.csc.services.voice'].indexOf('read') !== -1) this.scopeFlag.voiceRead = true;
        if (scopes['cloud.rbac.csc.services.voice'].indexOf('write') !== -1) this.scopeFlag.voiceWrite = true;
      }
    } else {
      this.scopeFlag.voiceRead = true;
      this.scopeFlag.voiceWrite = true;
    }
  }

  loadData(refereshData) {
    //const deviceRG = this.deviceInfo.filter(obj => obj.opMode == "RG");
    //if(!deviceRG.length) return;
    this.data = "";
    this.loader = true;
    this.routerSerialNumber = this.serialNumberSelected;
    this.metaData = this.dataChartService.getMetaData(this.routerSerialNumber);
    //console.log("deviceinfo",this.deviceInfo[0]?.hasOwnProperty("ont"),"this.deviceInfo",this.deviceInfo)
    if (!this.metaData && !this.deviceInfo[0]?.hasOwnProperty("ont")) {
      this.getMetaData();
      return;
    }
    const isRefreshed = (refereshData.length > 0);
    this.dataChartService.getServiceVoice(this.orgId, this.serialNumberSelected, isRefreshed).subscribe(
      (data: any) => {
        this.sipstatuscheck = data.voiceStatus.data.SignalingProtocol == 'SIP' ? true : false
        this.dataRender(data);
        this.loader = false;
        this.lineSelection(this.voiceLine);
        if (refereshData == 'refresh') {
          this.isSuccess = true;
        }
      }, err => {
        this.loader = false;
        this.lineSelection(this.voiceLine);
        this.pageErrorHandle(err);
      })


  }
  dataRender(data) {
    if (data) {
      this.loader = false;
      if (data.wanInfo.data && Array.isArray(data.wanInfo.data)) {
        this.wanInfo = data.wanInfo.data;
      } else if (JSON.stringify(data.wanInfo.data) === '{}' || data.wanInfo.error) {
        this.wanInfo = [];
      } else {
        this.wanInfo = [data.wanInfo.data];
      }
      this.wanInfoToDisplay = (this.wanInfo.length ? this.wanInfo[0] : {});
      //console.log("61", data.wanInfo.data);
      if (this.wanInfo.length) {
        $("#wanStatusSelectedId").text(this.wanInfo[0].Name);
        if (this.wanInfoToDisplay.Uptime != "0") {
          let seconds = this.wanInfoToDisplay.Uptime;
          const day = Math.floor(seconds / (24 * 3600));
          seconds = seconds % (24 * 3600);
          const hour = Math.floor(seconds / 3600);
          seconds %= 3600;
          const minutes = Math.floor(seconds / 60);
          const second = Math.floor(seconds % 60);

          this.upTime = `${day ? day + 'd' : ''}
                      ${hour ? hour + 'h' : ''}
                      ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
                      ${second ? String(second).padStart(2, '0') + 's' : ''}`;
        } else if (this.wanInfoToDisplay.Uptime == "0") {
          this.upTime = "0s"
        }
        this.wanInfoToDisplay.Enable = this.wanInfoToDisplay.Enable.charAt(0).toUpperCase() + this.wanInfoToDisplay.Enable.slice(1);
      }
      this.voiceStatus = Object.values(data.voiceStatus.data).filter(obj => typeof obj == "object");
      this.lineSelection(this.voiceLine);
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else {
      this.alertMessage = this.ssoService.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

  wanSelection(selectedWan) {
    $("#wanStatusSelectedId").text(this.wanInfo[selectedWan].Name);
    this.wanInfoToDisplay = this.wanInfo[selectedWan];
    this.wanInfoToDisplay.Enable = this.wanInfoToDisplay.Enable.charAt(0).toUpperCase() + this.wanInfoToDisplay.Enable.slice(1)
    if (this.wanInfoToDisplay.Uptime != "0") {
      let seconds = this.wanInfoToDisplay.Uptime;
      const day = Math.floor(seconds / (24 * 3600));
      seconds = seconds % (24 * 3600);
      const hour = Math.floor(seconds / 3600);
      seconds %= 3600;
      const minutes = Math.floor(seconds / 60);
      const second = Math.floor(seconds % 60);

      this.upTime = `${day ? day + 'd' : ''}
                  ${hour ? hour + 'h' : ''}
                  ${minutes ? String(minutes).padStart(2, '0') + 'm' : ''}
                  ${second ? String(second).padStart(2, '0') + 's' : ''}`;
    } else if (this.wanInfoToDisplay.Uptime == "0") {
      this.upTime = "0s"
    }

  }

  getMetaData() {
    if (!this.serialNumberSelected) return;
    this.loader = true;
    this.dataChartService.fetchMetaData(this.orgId, this.routerSerialNumber).subscribe((res: any) => {
      this.loader = false;
      this.metaData = res || {};
      res.properties.forEach(obj => {
        this.reStructureMeta(obj);
      });
      this.dataChartService.setMetaData(this.routerSerialNumber, this.metaData);
      this.loadData('');
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
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

  lineSelection(selectedWan) {
    this.voiceLine = selectedWan;
    setTimeout(() => {
      $("#lineStatusIndex").text(`${this.language.line} ${selectedWan + 1}`);
    }, 200);
    this.voiceStatusLine = (this.voiceStatus.length ? this.voiceStatus[selectedWan] : {});
    this.voiceStatusLine.Status = this.voiceStatusLine.Status || {};
    this.voiceStatusLine.Stats = this.voiceStatusLine.Stats || {};
    this.voiceStatusLine.Stats.IncomingCalls = this.voiceStatusLine.Stats.IncomingCalls || {};
    this.voiceStatusLine.Stats.OutgoingCalls = this.voiceStatusLine.Stats.OutgoingCalls || {};
    this.voiceStatusLine.Stats.EmergencyCalls = this.voiceStatusLine.Stats.EmergencyCalls || {};
    this.voiceStatusLine.Stats.SIPStats = this.voiceStatusLine.Stats.SIPStats || {};
    this.voiceStatusLine.Stats.RTPStats = this.voiceStatusLine.Stats.RTPStats || {};
    this.voiceStatusLine.Stats.RTPStats.Errors = this.voiceStatusLine.Stats.RTPStats.Errors || {};
    this.voiceStatusLine.Stats.DHCP = this.voiceStatusLine.Stats.DHCP || {};
  }
  restartVoice() {
    this.loader = true;
    let voiceLine;
    if (this.voiceLine == 0) {
      voiceLine = 1;
    } else if (this.voiceLine == 1) {
      voiceLine = 2;
    }
    this.supportService.getRestartVoice(this.orgId, this.routerSerialNumber, voiceLine).subscribe(res => {

      this.isSuccess = true;
      this.loader = false;
    }, err => {
      this.pageErrorHandle(err);
      this.loader = false;
    });
  }
  resetVoice() {
    this.loader = true;
    let voiceLine;
    if (this.voiceLine == 0) {
      voiceLine = 1;
    } else if (this.voiceLine == 1) {
      voiceLine = 2;
    }
    this.supportService.getResetVoice(this.orgId, this.routerSerialNumber, voiceLine).subscribe(res => {

      this.isSuccess = true;
      this.loader = false;
      this.loadData('refresh');
    }, err => {
      this.pageErrorHandle(err);
      this.loader = false;
    });
  }

  getAllSubsServicesData() {
    //debugger;
    this.loader = true;
    var SubscriberId = this.ssoService.getCSCSubscriberId();

    this.allSubsServicesDataSubs = this.dataChartService.getDetailedSubscriberServices(SubscriberId).subscribe((res: any) => {
      this.getservicestatus();
      if (res && res.services && res.services.length) {
        this.allSubsServicesData = res ? res : {};
        var services = this.allSubsServicesData.services;
        for (var i = 0; i < services?.length; i++) {
          if (services[i].type === 'voice') {
            this.VoiceService = services[i] ? services[i] : {};;
          }
        }
        this.servicesData = this.VoiceService
        this.servicesData.voiceInterfaces.forEach(obj => {
          this.item.push(obj.name)

          if (obj.name.includes('L')) {
            this.availableL = true
          }
        });
        this.interfacedata = this.item

      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
      if (this.deviceflag) { this.loadData(''); }
    })
  }
  getservicestatus() {

    this.loader = true;
    var SubscriberId = this.ssoService.getCSCSubscriberId();
    if (this.deviceflag) { this.loadData(''); }
    this.dataChartService.servicestatusapicall(SubscriberId).subscribe((res: any) => {
      // this.loader = false;
      if (!this.deviceflag) { this.loader = false; }
      if (res) {
        if (res?.dataService) {
          res.dataService = res?.dataService?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        if (res?.voiceServices) {
          res.voiceServices = res?.voiceServices?.map(e => {
            for (let key in e) {
              e[key] = e[key] === 'null' ? '' : e[key];
            }
            return e
          })
        }
        /* if(res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId){
           this.isAutomaticallyCreatedData = res?.dataServices?.find(element=> res?.voiceServices?.some(voice=> voice.cpeType == 'ONT'? voice.serviceId === element.serviceId : ""));
         }*/
        if (res?.dataServices[0]?.serviceId && res?.voiceServices[0]?.serviceId) {
          this.isAutomaticallyCreatedData = res?.dataServices?.find(element => res?.voiceServices?.some(voice => voice.serviceId === element.serviceId));
          res.dataServices = res?.dataServices?.filter(element => element.serviceId !== this.isAutomaticallyCreatedData?.serviceId);
        }

        if (res && res?.voiceServices && res?.voiceServices?.length) {
          let l = res?.voiceServices?.length - 1
          this.voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}

        } else {
          this.voiceServicesStatus = {};
        }

        if (res && res?.voiceServices && res?.voiceServices?.length) {
          let voiceServicesStatus = res?.voiceServices[0] ? res?.voiceServices[0] : {}
          res.voiceServices.forEach(obj => {
            if (obj.cpeType == 'ONT') {

              // this.enablestatus = obj.subSvcState //== 'Successfully Provisioned' ? 'True' : 'False'
              this.interface = obj.interface
              this.ontusoc = obj.usoc
            }
          });

          let ontVoiceStatus = '', rgVoiceStatus = '', ontVoiceError = '', rgVoiceError = '', unknownVoiceStatus = '', onknownVoiceError = '';
          res?.voiceServices?.forEach((element) => {
            if (element.cpeType == 'RG') {
              rgVoiceStatus += ((rgVoiceStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
              rgVoiceError += ((rgVoiceError ? ', ' : '') + element.errorDetails);
            } else if (element.cpeType === 'ONT') {
              ontVoiceStatus += ((ontVoiceStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
              ontVoiceError += ((ontVoiceError ? ', ' : '') + element.errorDetails);
            } else if (element.cpeType === 'UNKNOWN') {
              unknownVoiceStatus += ((unknownVoiceStatus ? ', ' : '') + `${element.ontIdentification}: ${element.subSvcState}`);
              onknownVoiceError += ((onknownVoiceError ? ', ' : '') + element.errorDetails);


            }
          });
          this.enablestatus = (ontVoiceStatus && rgVoiceStatus) ? ontVoiceStatus + ', ' + rgVoiceStatus : (ontVoiceStatus) ? ontVoiceStatus + (unknownVoiceStatus ? ', ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : rgVoiceStatus ? rgVoiceStatus + (unknownVoiceStatus ? ', ' : '') + (unknownVoiceStatus ? unknownVoiceStatus : '') : unknownVoiceStatus ? unknownVoiceStatus : '';

        }
        if (this.availableL && (this.isAutomaticallyCreatedData && this.isAutomaticallyCreatedData?.interface)) {
          this.voiceinterface = this.isAutomaticallyCreatedData?.interface
        }

      } else {
        this.voiceServicesStatus = {};
      }

    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.voiceServicesStatus = {};

    });
  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.apiUnsubscriber) this.apiUnsubscriber.unsubscribe();
  }

}
