import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DataServiceService } from '../../data.service';
import { SsoAuthService } from './../../../shared/services/sso-auth.service';

import { Router } from '@angular/router';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  language: any = {};
  upTime: any;
  isSuccess: boolean;
  languageSubject;
  loader: boolean;
  wanInfo: any = [];
  wanInfoToDisplay: any = {};
  alertMessage: any;
  isError: boolean;
  orgId: any;
  multicastStream: any = { data: {} };
  apiUnsubscriber: any;
  deviceInfo: any = [];
  isSecondary = 0;
  metaData: any = {};
  data: any;
  routerSerialNumber: any = '';
  serialNumberSelected: any;
  Bridgelanwarning: any = false;
  enablestatus
  ontusoc
  isAutomaticallyCreatedData
  isont = false
  videoServicesStatus1: any = {};
  videoServicesStatus: any = {};
  videoStatus: string;
  videoDetails: string;
  videoStatus1: string;
  videoDetails1: string;
  usocVideo: any;
  videoservice: any;
  allSubsServicesDataSubs: any;
  allSubsServicesData: any;
  deviceflag: boolean = false
  subsId
  servicesData
  videoser
  constructor(
    private translateService: TranslateService,
    private dataChartService: DataServiceService,
    public ssoService: SsoAuthService,
    private router: Router,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.ssoService.setActionLog('CSC', 'pageHit', 'Service', this.router.url, 'Service video page is loaded');
    this.orgId = this.ssoService.getOrgId();
    this.deviceInfo = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Video']} - ${this.language['Service']} 
    - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Video']} - ${this.language['Service']} 
    - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.deviceInfo = this.deviceInfo ? this.deviceInfo.filter(obj => obj.serialNumber).sort((a, b) => (a.opMode != "RG") ? 1 : -1) : [];
    this.deviceInfo = this.deviceInfo ? this.deviceInfo.filter(obj => obj.modelName != "804Mesh") : [];
    this.serialNumberSelected = this.deviceInfo[0]?.serialNumber;
    if (this.deviceInfo.length) this.deviceflag = true;// this.loadData();
    let ont = JSON.parse(sessionStorage.getItem(`${this.ssoService.getTabId()}calix.deviceData`));
    (ont || []).forEach(element => {
      if (element.hasOwnProperty('ont')) {
        this.isont = true
      }
    })
    let SubscriberId = this.ssoService.getCSCSubscriberId();
    this.subsId = SubscriberId === 'undefined' ? undefined : SubscriberId
    if (this.subsId && this.ssoService.getEntitlementsArr().indexOf('102') > -1) {
      this.getAllSubsServicesData()
    }
    else if (this.deviceflag) {
      this.loadData('');
    }


  }

  loadData(refereshData = '') {
    /*const deviceRG = this.deviceInfo.filter(obj => obj.opMode == "RG");
    if(!deviceRG.length) return;*/
    this.routerSerialNumber = this.serialNumberSelected;
    this.metaData = this.dataChartService.getMetaData(this.routerSerialNumber);
    if (!this.metaData && !this.deviceInfo[0]?.hasOwnProperty("ont")) {
      this.getMetaData();
      return;
    }
    this.loader = true;
    const isRefreshed = (refereshData.length > 0);
    this.dataChartService.getServiceVideo(this.orgId, this.serialNumberSelected, isRefreshed).subscribe(
      (data: any) => {
        this.dataRender(data);
        this.loader = false;
        if (refereshData == 'refresh') {
          this.isSuccess = true;
        }
      }, err => {
        this.loader = false;
        this.pageErrorHandle(err);
      })

  }
  dataRender(data) {
    if (data) {
      this.loader = false;

      //$("#wanStatusSelectedId").text(`WAN ${1}`);
      if (data.wanInfo.data && Array.isArray(data.wanInfo.data)) {
        this.wanInfo = data.wanInfo.data;
      } else if (JSON.stringify(data.wanInfo?.data) === '{}' || data.wanInfo?.error) {
        this.wanInfo = [];
      } else {
        this.wanInfo = [data.wanInfo?.data];
      }
      this.wanInfoToDisplay = (this.wanInfo.length ? this.wanInfo[0] : {});
      //this.Bridgelanwarning= (this.wanInfoToDisplay?.BridgeLANInterface.length==0 ? true : false )
      // console.log("61", data.wanInfo.data);
      if (this.wanInfo?.length) {
        $("#wanStatusSelectedId").text(this.wanInfo[0]?.Name);
        if (this.wanInfoToDisplay?.Uptime != "0") {
          let seconds = this.wanInfoToDisplay?.Uptime;
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
        } else if (this.wanInfoToDisplay?.Uptime == "0") {
          this.upTime = "0s"
        }
        this.wanInfoToDisplay.Enable = this.wanInfoToDisplay.Enable.charAt(0).toUpperCase() + this.wanInfoToDisplay.Enable.slice(1);
      }
      this.multicastStream = data.videoMulticastSystems || {};
      if (this.multicastStream.data && this.multicastStream.data.length) {
        this.multicastStream.data.forEach(obj => {
          (obj.MulticastSubscriber || []).forEach(ms => {
            const Tci = ms["Tci"];
            ms["JoinedTime"] = new Date(ms["JoinedTime"] * 1000);
            let sourceIp = ms["SourceIpAddress"];
            let groupIp = ms["GroupIpAddress"];
            let clientIp = ms["ClientIpAddress"];
            if (sourceIp == 0) {
              ms["SourceIpAddress"] = "0.0.0.0";
            } else {
              var sip = (ms["SourceIpAddress"] >> 24) & 0xFF;
              var sip1 = (ms["SourceIpAddress"] >> 16) & 0xFF;
              var sip2 = (ms["SourceIpAddress"] >> 8) & 0xFF;
              var sip3 = ms["SourceIpAddress"] & 0xFF;
              ms["SourceIpAddress"] = sip + '.' + sip1 + '.' + sip2 + '.' + sip3;
            }
            if (groupIp == 0) {
              ms["GroupIpAddress"] = "0.0.0.0";
            } else {
              var gip = (ms["GroupIpAddress"] >> 24) & 0xFF;
              var gip1 = (ms["GroupIpAddress"] >> 16) & 0xFF;
              var gip2 = (ms["GroupIpAddress"] >> 8) & 0xFF;
              var gip3 = ms["GroupIpAddress"] & 0xFF;
              ms["GroupIpAddress"] = gip + '.' + gip1 + '.' + gip2 + '.' + gip3;
            }
            if (clientIp == 0) {
              ms["ClientIpAddress"] = "0.0.0.0";
            } else {
              var cip = (ms["ClientIpAddress"] >> 24) & 0xFF;
              var cip1 = (ms["ClientIpAddress"] >> 16) & 0xFF;
              var cip2 = (ms["ClientIpAddress"] >> 8) & 0xFF;
              var cip3 = ms["ClientIpAddress"] & 0xFF;
              ms["ClientIpAddress"] = cip + '.' + cip1 + '.' + cip2 + '.' + cip3;
            }
            ms["VLAN"] = Tci & 0xfff;
            ms["PBit"] = Tci >> 13;
            ms["CFI"] = (Tci & 0x1fff) >> 12;
          });

        })
      }
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
      this.loadData();
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

  wanSelection(selectedWan) {
    $("#wanStatusSelectedId").text(this.wanInfo[selectedWan].Name);
    this.wanInfoToDisplay = this.wanInfo[selectedWan];
    // this.Bridgelanwarning= (this.wanInfoToDisplay?.BridgeLANInterface.length==0 ? true : false )
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

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.alertMessage = this.language['Access Denied'];
    } else {
      this.alertMessage = this.ssoService.pageErrorHandle(err);
    }
    this.isError = true;
    $("body").scrollTop(0);
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
          if (services[i].type === 'video') {
            this.videoservice = services[i] ? services[i] : {};;
          }
        }
        this.servicesData = this.videoservice
        this.videoser = this.servicesData?.video;
        this.usocVideo = this.videoservice?.usoc;
      }

    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);
      this.loader = false;
      if (this.deviceflag) { this.loadData(''); }
    })
  }

  getservicestatus() {

    var SubscriberId = this.ssoService.getCSCSubscriberId();
    if (this.deviceflag) { this.loadData(''); }
    this.dataChartService.servicestatusapicall(SubscriberId).subscribe((res: any) => {
      if (!this.deviceflag) { this.loader = false; }
      if (res) {
        if (res && res?.videoServices && res?.videoServices?.length) {
          res.videoServices.forEach(obj => {
            if (obj.cpeType == 'ONT') {

              //this.enablestatus = obj.subSvcState //== 'Successfully Provisioned' ? 'True' : 'False'
              this.ontusoc = obj.usoc
            }
          });

          if (res && res?.videoServices && res?.videoServices?.length) {
            let l = res?.videoServices?.length - 1
            this.videoServicesStatus = res?.videoServices[0] ? res?.videoServices[0] : {}
            this.videoStatus = `${this.videoServicesStatus?.ontIdentification}: ${this.videoServicesStatus?.subSvcState}`;
            this.videoDetails = `${this.videoServicesStatus?.ontIdentification}: ${this.videoServicesStatus?.errorDetails}`;
          } else {
            this.videoServicesStatus = {};
          }
          if (res && res?.videoServices && res?.videoServices.length > 1) {
            let l = res?.videoServices?.length - 1
            this.videoServicesStatus1 = res?.videoServices[1] ? res?.videoServices[1] : {}
            this.videoStatus1 = `${this.videoServicesStatus1?.ontIdentification}: ${this.videoServicesStatus1?.subSvcState}`;
            this.videoDetails1 = `${this.videoServicesStatus1?.ontIdentification}: ${this.videoServicesStatus1?.errorDetails}`;
          } else {
            this.videoServicesStatus1 = {};
          }
          let videostatus1 = this.videoServicesStatus?.subSvcState ? this.videoStatus : '';
          let videostatus2 = this.videoServicesStatus1?.subSvcState ? ` , ${this.videoStatus1}` : '';
          this.enablestatus = videostatus1 + videostatus2


        }
      } else {

        this.videoServicesStatus = {};
        this.videoServicesStatus1 = {};

      }
    }, err => {
      this.loader = false;
      this.pageErrorHandle(err);
      this.videoServicesStatus = {};
      this.videoServicesStatus1 = {};
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
    if (this.apiUnsubscriber) this.apiUnsubscriber.unsubscribe();
  }

}
