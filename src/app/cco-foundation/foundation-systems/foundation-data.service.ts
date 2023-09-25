import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable(

)
export class FoundationDataService {
  constructor(
    private http: HttpClient,
  ) { }



  // public systemDetails;
  // public systemSubscription;
  // public systemTiers;
  // public systemEdgSuites;



  // //SystemDetails Component
  // setSystemDetails(_sd) {
  //   this.systemDetails = _sd;
  // }

  // getSystemDetails() {
  //   return this.systemDetails;
  // }

  // SystemDet_flushData() {
  //   this.systemDetails = {};
  // }
  // //subscription Component
  // setSystemSubscription(_ss) {
  //   this.systemSubscription = _ss;
  // }

  // getSystemSubscription() {
  //   return this.systemSubscription;
  // }

  // SystemSubscription_flushData() {
  //   this.systemSubscription = {};
  // }

  // //System Tiers Component
  // setSystemTiers(_st) {
  //   this.systemTiers = _st;
  // }

  // getSystemTiers() {
  //   return this.systemTiers;
  // }

  // systemTiers_flushData() {
  //   this.systemTiers = {};
  // }

  // //System EdgeSuites Component

  // setSystemEdgeSuites(_se) {
  //   this.systemEdgSuites = _se;
  // }

  // getSystemEdgeSuites() {
  //   return this.systemEdgSuites;
  // }

  // systemEdgeSuites_flushData() {
  //   this.systemTiers = {};
  // }
  VideoEnable: any = {};
  dataEnable: any = {};
  getdataEnableData(togglevalue) {
    return this.dataEnable.hasOwnProperty(togglevalue) ? this.dataEnable[togglevalue] : false;
    //return this.dataEnable ? this.dataEnable : false;
  }

  setdataEnableData(togglevalue, dataEnable, reset = false) {
    reset ? this.dataEnable = {} : this.dataEnable[togglevalue] = dataEnable;
    //reset ? this.dataEnable : this.dataEnable = dataEnable;
  }
  getdataEnableVideo(togglevalue) {
    return this.VideoEnable.hasOwnProperty(togglevalue) ? this.VideoEnable[togglevalue] : false;
  }
  setdataEnableVideo(togglevalue, VideoEnable, reset = false) {
    reset ? this.VideoEnable = {} : this.VideoEnable[togglevalue] = VideoEnable;
    //reset ? this.dataEnable : this.dataEnable = dataEnable;
  }

  setServicesData(servicesListData, type?) {
    let data = servicesListData?.subscriberInformation?.ont?.dataService?.serviceDefinitionName ? servicesListData?.subscriberInformation?.ont?.dataService?.serviceDefinitionName : '';
    let voice = servicesListData?.subscriberInformation?.ont?.voiceService?.serviceDefinitionName ? servicesListData?.subscriberInformation?.ont?.voiceService?.serviceDefinitionName : '';
    let video = servicesListData?.subscriberInformation?.ont?.videoService?.serviceDefinitionName ? servicesListData?.subscriberInformation?.ont?.videoService?.serviceDefinitionName : '';
    if (type && type == 'data') {
      return `${data ? data : ''}`;
    } else if (type && type == 'voice') {
      return `${voice ? voice : ''}`;
    } else if (type && type == 'video') {
      return `${video ? video : ''}`;
    } else {
      return `${data ? data : ''}${voice ? (data ? ', ' : '') + voice : ''}${video ? ((data || voice) ? ', ' : '') + video : ''}`;
    }

  }

}
