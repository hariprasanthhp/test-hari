import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { PerformanceServiceService } from '../../performance-testing.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SsoAuthService } from '../../../../../../shared/services/sso-auth.service';

@Component({
  selector: 'app-server-details-wizard',
  templateUrl: './server-details-wizard.component.html',
  styleUrls: ['./server-details-wizard.component.scss']
})
export class ServerDetailsWizardComponent implements OnInit {
  downloadUrl: any = '';
  uploadUrl: any = '';
  uploadFileSize: any;
  downloadUrlError: any = '';
  uploadUrlError: any = '';
  uploadFileSizeError: any = '';

  latencyThreshold: any = 100;
  speedThreshold: any = 80;
  serviceTierDownloadSpeed: any;
  serviceTierUploadSpeed: any;
  serviceTierOptions = [
    { id: 'Kbps', name: 'Kbps' },
    { id: 'Mbps', name: 'Mbps' },
  ];

  serviceTierSelectred = 'Kbps';
  language: any;
  languageSubject;
  dataPbitInput = ['0', '1', '2', '4', '5', '6', '7'];
  dataBwProfile = ['BW_1G_1G', 'bw 100', 'bandwidth', 'bw_lai'];

  showservice: Boolean = false
  getAllServerData
  serverDetails = []
  download_speed
  upload_speed
  speed_threshold = 80
  latency_threshold = 100
  test_threshold = false
  saveClicked: boolean = false
  formError: boolean = false;
  primaryServer = '';
  secondaryServer = '';
  serverData = [];

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  protocols = {
    ookla: false,
    tr143: false
  };

  // validHostRegex = new RegExp(/(?:^|\s)([a-z]{3,6}(?=:\/\/))?(:\/\/)?((?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?))(?::(\d{2,5}))?(\/.*)?(?:\s|$)|(^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$)|(?:^|\s)([a-z]{3,6}(?=:\/\/))?(:\/\/)?((?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?))(?::(\d{2,5}))?(?:\s|$)/);
  validHostRegex = /((h|H)ttp(s)?:\/\/)+(www\.)?(([^www\.][-a-zA-Z0-9@:%._\+~#=]{2,236})\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  @Input() inputData
  @Output() outputdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();


  constructor(
    private translateService: TranslateService,
    private router: Router,
    private api: PerformanceServiceService,
    private commonOrgService: CommonService,
    private sso: SsoAuthService
  ) {
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.getServerDetails();

    if (this.inputData && this.inputData['protocols']) {
      this.inputData['protocols'].forEach((element: any) => {
        let item = element.toLowerCase();
        if (item.indexOf('ookla') !== -1) {
          this.protocols.ookla = true;
        }

        if (item.indexOf('tr143') !== -1) {
          this.protocols.tr143 = true;
        }
      });
    }

    if (this.inputData && this.inputData['primaryOoklaServerId']) {
      this.protocols.ookla = true;
    }

    if (this.inputData && this.inputData['downloadUrl']) {
      this.protocols.tr143 = true;
    }



    this.serviceTierDownloadSpeed = (this.inputData && this.inputData['serviceTierDownloadSpeed']) ? this.inputData['serviceTierDownloadSpeed'] : '';
    this.serviceTierUploadSpeed = (this.inputData && this.inputData['serviceTierUploadSpeed']) ? this.inputData['serviceTierUploadSpeed'] : '';
    this.speedThreshold = (this.inputData && this.inputData['speedThreshold']) ? this.inputData['speedThreshold'] : 80;
    this.latencyThreshold = (this.inputData && this.inputData['latencyThreshold']) ? this.inputData['latencyThreshold'] : 100;
    this.serviceTierSelectred = (this.inputData && this.inputData['serviceTier']) ? this.inputData['serviceTier'] : 'Kbps';

    if ((this.serviceTierDownloadSpeed && this.serviceTierUploadSpeed) || this.inputData?.serviceTierandTrshldChecked) {
      $("#serviceTierSpeedTreshChecked").prop('checked', true);
      this.serviceTierSpeedTreshChecked = true;
      this.showservice = true;
      this.inputData.serviceTierandTrshldChecked = true;
    }

    if (this.inputData?.serviceTierandTrshldChecked) {
      this.serviceTierSpeedTreshChecked = true;
    } else {
      this.serviceTierSpeedTreshChecked = false;
    }

    if (this.inputData && this.inputData['serviceTier'] === 'Mbps') {
      this.serviceTierDownloadSpeed = this.serviceTierDownloadSpeed / 1000;
      this.serviceTierUploadSpeed = this.serviceTierUploadSpeed / 1000;
    }

    if (this.protocols && this.protocols['tr143']) {
      this.downloadUrl = this.inputData['downloadUrl'];
      this.uploadUrl = this.inputData['uploadUrl'];
      this.uploadFileSize = this.inputData['uploadFileSize'];
    }


  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  showform(event) {
    if (event.target.checked && event.target.value === 'yes') {
      this.test_threshold = true
      this.showservice = true;
    }

  }
  hideform(event) {
    this.test_threshold = false
    this.showservice = false;
  }

  serviceTierSpeedTreshChecked = false;
  serviceTierSpeedTreshUnChecked = true;
  loading = true;

  getServerDetails() {
    let designatedASNsOnly = true
    this.getAllServerData = this.api.GetServerDetails(designatedASNsOnly).subscribe((data: any) => {
      let temp = [];
      if (data && data.length) {

        data.forEach((res: any) => {
          // res['optionDec'] = `${res['host']} (located at ${res['cityState']}  ) ASN: ${res['asn']} (${res['fccDesignatedAsn'] ? 'FCC designated' : 'non FCC designated'})`;
          res['optionDec'] = `${res['host']} (located at ${res['cityState']} ) ASN: ${res['asn']}`;
          res['disabled'] = false;
        });
      }

      data.unshift({ "_id": "", "fccDesignatedAsn": true, "host": "", "cityState": "", "optionDec": "", "disabled": false });

      this.serverData = data;

      if (this.inputData && this.inputData['primaryOoklaServerId']) {
        this.primaryServer = this.inputData['primaryOoklaServerId'];
      }

      if (this.inputData && this.inputData['secondaryOoklaServerId']) {
        this.secondaryServer = this.inputData['secondaryOoklaServerId'];
      }

      this.setDefaultValue();

      this.loading = false;

      // this.serverDetails = [...res]
      // this.serverDetails.forEach(data=>{
      //     this.serverData.push(data.host)

      // })    
    }, (err: any) => {

      this.pageErrorHandle(err);
    })
  }

  bindServerData(event) {

  }

  validate() {
    this.formError = false;
    if (!this.download_speed || !this.upload_speed) {
      this.formError = true;
      return
    }
  }

  validateServiceTierDownloadSpeedMsg = '';
  validateServiceTierDownloadSpeed() {
    this.validateServiceTierDownloadSpeedMsg = '';
    if (this.serviceTierDownloadSpeed == "") {
      this.validateServiceTierDownloadSpeedMsg = 'Please enter a value';
      this.showError();
      return;
    }

    if (this.serviceTierDownloadSpeed < 1) {
      this.validateServiceTierDownloadSpeedMsg = 'Please enter a value greater than or equal to 1.';
      this.showError();
      return;
    }

    return true;
  }

  validateServiceTierUploadSpeedMsg = '';
  validateServiceTierUploadSpeed() {
    this.validateServiceTierUploadSpeedMsg = '';
    if (this.serviceTierUploadSpeed == "") {
      this.validateServiceTierUploadSpeedMsg = 'Please enter a value';
      this.showError();
      return;
    }

    if (this.serviceTierUploadSpeed < 1) {
      this.validateServiceTierUploadSpeedMsg = 'Please enter a value greater than or equal to 1.';
      this.showError();
      return;
    }

    return true;
  }


  validatSpeedThresholdMsg = '';
  validatSpeedThreshold() {
    this.validatSpeedThresholdMsg = '';
    if (this.speedThreshold == "") {
      this.validatSpeedThresholdMsg = 'Please enter a value';
      this.showError();
      return;
    }

    if (this.speedThreshold < 1) {
      this.validatSpeedThresholdMsg = 'Please enter a value greater than or equal to 1.';
      this.showError();
      return;
    }

    if (this.speedThreshold > 100) {
      this.validatSpeedThresholdMsg = 'Please enter a value less than or equal to 100';
      this.showError();
      return;
    }

    return true;
  }


  validatLatencyThresholdMsg = '';
  validatLatencyThreshold() {
    this.validatLatencyThresholdMsg = '';
    if (this.latencyThreshold == "") {
      this.validatLatencyThresholdMsg = 'Please enter a value';
      this.showError();
      return;
    }

    if (this.latencyThreshold < 1) {
      this.validatLatencyThresholdMsg = 'Please enter a value greater than or equal to 1.';
      this.showError();
      return;
    }

    if (this.latencyThreshold > 100) {
      this.validatLatencyThresholdMsg = 'Please enter a value less than or equal to 100';
      this.showError();
      return;
    }

    return true;
  }

  go_next() {
    // if(this.test_threshold){
    //   this.saveClicked = true;
    //   this.validate();
    // }

    //this.inputData.levelPassed = 2;

    if (this.protocols && this.protocols['ookla']) {
      if (!this.primaryServer) {
        this.showError();
        return;
      }
    }

    if (this.protocols && this.protocols['tr143']) {
      if (!this.validateDownloadUrl()) {
        return;
      }

      if (!this.validateUploadUrl()) {
        return;
      }

      if (!this.validateUploadFileSize()) {
        return;
      }
    }


    if ($("#serviceTierSpeedTreshChecked").prop('checked')) {

      if (!this.validateServiceTierDownloadSpeed()) {
        this.showError();
        return;
      }

      if (!this.validateServiceTierUploadSpeed()) {
        this.showError();
        return;
      }

      if (!this.validatSpeedThreshold()) {
        this.showError();
        return;
      }

      if (!this.validatLatencyThreshold()) {
        this.showError();
        return;
      }

      this.inputData.serviceTierandTrshldChecked = true;
      this.serviceTierSpeedTreshChecked = true;

    } else {
      this.serviceTierDownloadSpeed = 0;
      this.serviceTierUploadSpeed = 0;
      this.inputData.serviceTierandTrshldChecked = false;
      this.serviceTierSpeedTreshChecked = false;
    }

    let primaryServer = this.findObjByKeyValue(this.primaryServer, this.serverData);
    let secondaryServer = this.findObjByKeyValue(this.secondaryServer, this.serverData);

    if (this.inputData.levelPassed <= 3) {
      this.inputData.levelPassed = 3;
    }

    if (this.protocols && this.protocols['ookla']) {
      this.inputData['primaryOoklaServerId'] = primaryServer._id;
      this.inputData['primaryOoklaServerHostname'] = primaryServer.host;
      this.inputData['primaryOoklaServerCityState'] = primaryServer.cityState;
      this.inputData['primaryOoklaServerAsn'] = primaryServer.asn;

      this.inputData['secondaryOoklaServerId'] = secondaryServer._id;
      this.inputData['secondaryOoklaServerHostname'] = secondaryServer.host;
      this.inputData['secondaryOoklaServerCityState'] = secondaryServer.cityState;
      this.inputData['secondaryOoklaServerAsn'] = secondaryServer.asn;
    }

    if (this.protocols && this.protocols['tr143']) {
      this.inputData['downloadUrl'] = this.downloadUrl;
      this.inputData['uploadUrl'] = this.uploadUrl;
      this.inputData['uploadFileSize'] = this.uploadFileSize;
    }

    this.inputData['serviceTierDownloadSpeed'] = this.serviceTierDownloadSpeed ? this.serviceTierDownloadSpeed : 0;
    this.inputData['serviceTierUploadSpeed'] = this.serviceTierUploadSpeed ? this.serviceTierUploadSpeed : 0;
    this.inputData['speedThreshold'] = this.speedThreshold;
    this.inputData['latencyThreshold'] = this.latencyThreshold;
    this.inputData['serviceTier'] = this.serviceTierSelectred;

    if (this.inputData['serviceTier'] === 'Mbps') {
      this.inputData['serviceTierDownloadSpeed'] = this.inputData['serviceTierDownloadSpeed'] * 1000;
      this.inputData['serviceTierUploadSpeed'] = this.inputData['serviceTierUploadSpeed'] * 1000;
    }

    this.outputdata.emit(this.inputData);
    this.activeTab.emit('TestSchedule');

    return true;
  }

  findObjByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === value) {
        return myArray[i];
      }
    }
    return false
  }

  findObjIndexByKeyValue(value, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i]._id === value) {
        return i;
      }
    }
    return -1
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  showSuccess(): void {
    this.closeAlert();
    this.success = true;
  }

  showError(): void {
    this.closeAlert();
    this.error = true;
  }

  gotoPrevious() {
    // if (!this.primaryServer) {
    //   this.showError();
    //   return;
    // }

    if ($("#serviceTierSpeedTreshChecked").prop('checked')) {

      // if (!this.validateServiceTierDownloadSpeed()) {
      //   this.showError();
      //   return;
      // }

      // if (!this.validateServiceTierUploadSpeed()) {
      //   this.showError();
      //   return;
      // }

      // if (!this.validatSpeedThreshold()) {
      //   this.showError();
      //   return;
      // }

      // if (!this.validatLatencyThreshold()) {
      //   this.showError();
      //   return;
      // }

      this.inputData.serviceTierandTrshldChecked = true;
      this.serviceTierSpeedTreshChecked = true;

    } else {
      this.serviceTierDownloadSpeed = 0;
      this.serviceTierUploadSpeed = 0;
      this.inputData.serviceTierandTrshldChecked = false;
      this.serviceTierSpeedTreshChecked = false;
    }

    let primaryServer = this.findObjByKeyValue(this.primaryServer, this.serverData);
    let secondaryServer = this.findObjByKeyValue(this.secondaryServer, this.serverData);

    if (this.protocols && this.protocols['ookla']) {
      this.inputData['primaryOoklaServerId'] = primaryServer ? primaryServer._id : '';
      this.inputData['primaryOoklaServerHostname'] = primaryServer ? primaryServer.host : '';
      this.inputData['primaryOoklaServerCityState'] = primaryServer ? primaryServer.cityState : '';
      this.inputData['primaryOoklaServerAsn'] = primaryServer ? primaryServer.asn : '';

      this.inputData['secondaryOoklaServerId'] = secondaryServer ? secondaryServer._id : '';
      this.inputData['secondaryOoklaServerHostname'] = secondaryServer ? secondaryServer.host : '';
      this.inputData['secondaryOoklaServerCityState'] = secondaryServer ? secondaryServer.cityState : '';
      this.inputData['secondaryOoklaServerAsn'] = secondaryServer ? secondaryServer.asn : '';
    }

    if (this.protocols && this.protocols['tr143']) {
      this.inputData['downloadUrl'] = this.downloadUrl;
      this.inputData['uploadUrl'] = this.uploadUrl;
      this.inputData['uploadFileSize'] = this.uploadFileSize;
    }


    this.inputData['serviceTierDownloadSpeed'] = this.serviceTierDownloadSpeed ? this.serviceTierDownloadSpeed : 0;
    this.inputData['serviceTierUploadSpeed'] = this.serviceTierUploadSpeed ? this.serviceTierUploadSpeed : 0;
    this.inputData['speedThreshold'] = this.speedThreshold;
    this.inputData['latencyThreshold'] = this.latencyThreshold;

    this.inputData.serviceTierandTrshldChecked = this.serviceTierSpeedTreshChecked;
    this.inputData['serviceTier'] = this.serviceTierSelectred;

    if (this.inputData && this.inputData['serviceTier'] === 'Mbps') {
      this.inputData['serviceTierDownloadSpeed'] = this.inputData['serviceTierDownloadSpeed'] * 1000;
      this.inputData['serviceTierUploadSpeed'] = this.inputData['serviceTierUploadSpeed'] * 1000;
    }

    this.outputdata.emit(this.inputData);

    this.outputdata.emit(this.inputData);
    this.activeTab.emit('Devices');

    return true;
  }

  setserviceTierandTrshldChecked() {
    this.inputData.serviceTierandTrshldChecked = true;
    this.serviceTierSpeedTreshChecked = true;
  }

  setserviceTierandTrshldUnChecked() {
    this.inputData.serviceTierandTrshldChecked = false;
    this.serviceTierSpeedTreshChecked = false;
  }

  changePrimaryServer() {
    this.setDefaultValue();
    setTimeout(() => {
      if (this.primaryServer) {
        let index = this.findObjIndexByKeyValue(this.primaryServer, this.serverData);
        let obj = this.findObjByKeyValue(this.primaryServer, this.serverData);
        obj['disabled'] = true;

        this.serverData.splice(index, 1, obj);
      }
    }, 1000);



    this.serverData = [...this.serverData];
  }

  changeSecondaryServer() {
    this.setDefaultValue();
    setTimeout(() => {
      if (this.secondaryServer) {
        let index = this.findObjIndexByKeyValue(this.primaryServer, this.serverData);
        let obj = this.findObjByKeyValue(this.primaryServer, this.serverData);
        obj['disabled'] = true;

        this.serverData.splice(index, 1, obj);
      }
    }, 1000);


    this.serverData = [...this.serverData];


  }

  setDefaultValue() {
    this.serverData.forEach((res: any) => {
      res['disabled'] = false;
      if (res['_id']) {
        if (this.primaryServer == res['_id'] || this.secondaryServer == res['_id']) {
          res['disabled'] = true;
        }
      }

    });

    this.serverData = [...this.serverData];
  }

  reload(): any {
    if (window.location.href?.indexOf('/cco/operations/configuration/performance-testing') !== -1) {
      this.router.navigate(['./cco/operations/configuration/performance-testing']);
      return;
    }
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing`,
      `cco/operations/cco-system-operations/performance-testing`, '',
      `/cco/operations/cco-subscriber-operations/operations/performance-testing`
    ]);
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  clearError() {
    this.downloadUrlError = '';
    this.uploadUrlError = '';
    this.uploadFileSizeError = '';
  }

  extractHostname(url) {
    let hostname;
    if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

  validateDownloadUrl() {
    if (!this.downloadUrl) {
      this.downloadUrlError = 'Please enter a value';
      return;
    }

    // let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?<![0-9]))([\/].*)?$/;
    let regex = /^(http(s)?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?)(\/[^\s]*)?$/;
    if (!regex.test(String(this.downloadUrl))) {
      this.downloadUrlError = 'Please enter a valid URL.';
      return;
    }

    // if (!this.validHostRegex.test(String(this.downloadUrl))) {
    //   this.downloadUrlError = 'Please enter a valid URL.';
    //   console.log('this.downloadUrlError', this.downloadUrlError);
    //   return;
    // }

    if (this.uploadUrl) {
      if (this.extractHostname(this.uploadUrl) !== this.extractHostname(this.downloadUrl)) {
        this.downloadUrlError = 'Please enter the same hostname in Download URL and Upload URL';
        this.uploadUrlError = 'Please enter the same hostname in Download URL and Upload URL';
        return;
      } else {
        this.uploadUrlError = '';
      }
    }

    this.downloadUrlError = '';
    return true;
  }
  validateUploadUrl() {
    if (!this.uploadUrl) {
      this.uploadUrlError = 'Please enter a value';
      return;
    }

    // let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(?<![0-9]))([\/].*)?$/;
    let regex = /^(http(s)?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?)(\/[^\s]*)?$/;
    if (!regex.test(String(this.uploadUrl))) {
      this.uploadUrlError = 'Please enter a valid URL.';
      return;
    }

    // if (!this.validHostRegex.test(this.uploadUrl)) {
    //   this.uploadUrlError = 'Please enter a valid URL';
    //   return;
    // }

    if (this.downloadUrl) {
      if (this.extractHostname(this.uploadUrl) !== this.extractHostname(this.downloadUrl)) {
        this.downloadUrlError = 'Please enter the same hostname in Download URL and Upload URL';
        this.uploadUrlError = 'Please enter the same hostname in Download URL and Upload URL';
        return;
      } else {
        this.downloadUrlError = '';
      }
    }

    this.uploadUrlError = '';
    return true;

  }
  validateUploadFileSize() {

    if (!this.uploadFileSize) {
      this.uploadFileSizeError = 'Please enter a value';
      return;
    }

    if (isNaN(this.uploadFileSize)) {
      this.uploadFileSizeError = 'The value is not an integer';
      return;
    }

    this.uploadFileSizeError = '';
    return true;
  }

}