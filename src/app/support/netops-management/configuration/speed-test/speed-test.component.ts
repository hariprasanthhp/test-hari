import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CPESpeedSupportTest } from '../../shared/model/cpe-speed-support-test';
import { SpeedTestService } from '../../shared/service/speed-test.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../../data.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss']
})
export class SpeedTestComponent implements OnInit {
  show: boolean = false
  loading = false;
  language;
  languageSubject;
  bgSpeedInfoValue = 'Enabled';
  bgSpeedTestValue = 'disabled';

  //speedSupportTest: CPESpeedSupportTest ;
  speedSupportTest
  getspeedtestdata
  STdatafromget = {} ;
  orgId = this.sso.getOrgId()

  courseInfo = ['Enabled', 'Disabled'];

  testEnabled;
  speediqradio = 'speediqdisable';
  calixEnabledradio = 'calixdisable';
  Calixspeedtestdiablemsg: boolean = true;
  typedisable:boolean = false
  CAFspeediqradio = 'CAFspeediqdisable'
  CAFspeedtestdiablemsg: boolean = true;
  privatespeedtestradio = 'privatestdisabled';
  privatespeedtestdiablemsg: boolean = true;

  testPingTarget: String;
  testServersDownloadUrl: String;
  testServerUploadUrl: String;
  testuploadSize: String
  speediqDownloadUrl: String;
  speediqUploadUrl: String;
  speediquploadSize: String
  CAFspeediquploadSize: String;

  testServerOoklaEndpoint: String;
  Newcaf: boolean = false
  speedTestObj: CPESpeedSupportTest = new CPESpeedSupportTest();
  isSuccess: boolean = false;
  backgroundtestcheck: boolean = false;
  isError: boolean = false;
  speedTestRead: boolean = false;
  speedTestWrite: boolean = false;
  alertMessage: any;
  bgTest: boolean = false;
  TCPbgTest: boolean = false;
  speediqbgTest: boolean = false;
  calixFallbackbutton:boolean = false;
  copytr143:boolean = false;
  calixnetspeeddata: any = 'calix_smart'
  speedtestserverdata: any = false; 
  caftesttype: any = 'ookla'
  privatespeedtestres: any = true
  calixtr143datafromget
  ooklaApply: boolean = false;
  isDisableOoklaEndPoint: boolean = false;
  isValidOoklaEndpoint = true;
  isValiddownloadurl: boolean = true
  isValiduploadurl: boolean = true
  isvaliduploadsize: boolean = true
  isValidspeediqdownloadurl: boolean = true
  isValidspeediquploadurl: boolean = true
  isValidspeediquploadsize: boolean = true
  allowSubnetConfig = true;
  speediqsaveDisable: boolean = true;
  secureaccesscheck;
  speediqnoconfig: boolean = false
  addserver: any = [];
  CAFServerName
  CAFserverUploadURL
  CAFserverDownloadURL
  saveDisable: boolean = false;
  addserveruploadurl
  addserverdownloadurl
  servername
  third_partysubmit_btndisable: boolean = false
  addserversaveDisable: boolean = false
  CafsaveDisable: boolean = false
  isduplicate: boolean = false
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  addservertable: boolean = true;
  isRerender: boolean = false;
  deleteheader = ""
  frTable: any;
  esTable: any;
  germanTable: any;
  validateTCPDownloadUrl :boolean = true
  validateTCPUploadUrl : boolean = true
  validateTCPuploadSize : boolean = true
  allowtocopy: boolean = false
  UrlPattern = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/i
  patternfornumbers = /^[0-9]+$/;
  constructor(private translateService: TranslateService,
    private cpeSpeedSupportTestService: SpeedTestService,
    private dataService: DataServiceService,
    private dialogService: NgbModal,
    private sso: SsoAuthService,
    private titleService: Title,
    private CommonFunctionsService: CommonFunctionsService,
    public router: Router) {
    this.frTable = this.translateService.fr
    this.esTable = this.translateService.es
    this.germanTable = this.translateService.de_DE

  }
  setTitle(url) {
    if (!this.router.url.includes('cco/services/configuration')) {
      this.titleService.setTitle(`${this.language['Performance Test']} - ${this.language['Configurations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    } else {
      this.titleService.setTitle(`${this.language['Performance Test']} - ${this.language['Configurations']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    }
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
      this.setTitle(this.router.url)
    });
    this.setTitle(this.router.url)
    this.getScopes();
    this.getSpeedtestDetails();
    if (!this.router.url.includes('cco/services/configuration')) {
      this.show = false;
    } else {
      this.show = true;
    }
    this.secureaccesscheck = sessionStorage.getItem('Orgacceforssid') ? sessionStorage.getItem('Orgacceforssid') : false;

  }

  getSpeedtestDetails() {
    this.loading = true;
    this.saveDisable = false;
    this.cpeSpeedSupportTestService.speedTestDetails(this.orgId).subscribe(data => {
      this.loading = false;
      this.getspeedtestdata = data
      this.STdatafromget = Object.assign({}, data)
      this.speedSupportTest = Object.assign({}, data)
      this.resetformfields();
      this.bgTest = this.testEnabled = data.ooklaBackground;
      this.TCPbgTest = data.tr143Background;
      this.speediqbgTest = data.calixBackground
      this.calixFallbackbutton = data.calixFallback
      this.ooklaApply = data.ooklaApply;
      /*if (this.testEnabled === true) {
        this.testEnabled = 'enabled';
      } else {
        this.testEnabled = 'disabled';
      }*/
      this.calixnetspeeddata = data.calixnetspeed
      this.privatespeedtestres = data.ooklaEnabled
      this.calixtr143datafromget = data.calixTr143Servers
      if (this.calixnetspeeddata == 'calix_smart') {
        this.speediqradio = 'speediqenable' ; //ooklaonly
        this.calixnetspeeddata = 'calix_smart'
        this.typedisable =  true
      }
      else if (this.calixnetspeeddata == 'calix_tr143') {
        this.speediqradio = 'speediqdisable';//speediq
        this.calixnetspeeddata = 'calix_tr143'
        this.typedisable = false

      }
      else {
        this.speediqradio = 'speediqenable';
        this.calixnetspeeddata = 'calix_smart'
        this.typedisable = true

      }
      this.speedtestserverdata = data.calixEnabled

        if (this.speedtestserverdata == true) {
          this.calixEnabledradio = 'calixenable'; //ooklaonly
          this.speedtestserverdata = true
          this.Calixspeedtestdiablemsg = false

         // this.privatespeedtestdiablemsg = true
        }
        else {
          this.Calixspeedtestdiablemsg = true

          this.calixEnabledradio = 'calixdisable';
          this.speedtestserverdata = false
        //  this.privatespeedtestdiablemsg = false
        }
      

      if (this.privatespeedtestres == true) {
        this.privatespeedtestradio = 'privatestenabled'; //ooklaonly
        this.privatespeedtestres = true
        this.privatespeedtestdiablemsg = true
      }
      else {
        this.privatespeedtestradio = 'privatestdisabled';
        this.privatespeedtestres = false
        this.privatespeedtestdiablemsg = false
      }

      this.testPingTarget = data?.defaultPingTarget ? data?.defaultPingTarget : '';
      if (data.tr143Servers?.length >= 1) {
        this.testServersDownloadUrl = data?.tr143Servers[0]?.downloadUrl;
        this.testServerUploadUrl = data?.tr143Servers[0]?.uploadUrl;
        this.testuploadSize = data?.tr143Servers[0]?.uploadSize;
        this.third_partysubmit_btndisable = false
      }
      /*else 
      {
        this.third_partysubmit_btndisable = true

      }*/
      if (data.calixTr143Servers?.length >= 1) {
        this.speediqDownloadUrl = data?.calixTr143Servers[0]?.downloadUrl;
        this.speediqUploadUrl = data?.calixTr143Servers[0]?.uploadUrl;
        this.speediquploadSize = data?.calixTr143Servers[0]?.uploadSize;
        this.speediqsaveDisable = false

      }
      else if(this.speedtestserverdata == false){
        this.speediqsaveDisable = false 
      }
      else{
        this.speediqsaveDisable = true

      }

      this.testServerOoklaEndpoint = data?.ooklaEndpoint;
      if (this.ooklaApply && this.testServerOoklaEndpoint != '') {
        this.isDisableOoklaEndPoint = true;
      } else {
        this.isDisableOoklaEndPoint = false;
      }
    }, err => {
      this.loading = false;
    })
  }
 
  updateSpeedTest(speedTestDetails: NgForm, id) {
    if(this.speedSupportTest)
    {
    this.isError = false;
    this.loading = true;


    console.log("getspeedtestdata initial", this.STdatafromget)
    console.log("speedSupportTest initial", this.speedSupportTest)
 
    //console.log("id", id, "updatespeedtest", speedTestDetails)
    if (id == 'Pingtargetform') {
      speedTestDetails.value.pingTarget != undefined ? speedTestDetails.controls["pingTarget"].setValue(speedTestDetails.value.pingTarget.trim()) : speedTestDetails.controls["pingTarget"].setValue('');

      this.speedSupportTest.defaultPingTarget = speedTestDetails.value.pingTarget
      console.log("speedSupportTest2", this.speedSupportTest)
      if (!this.speedSupportTest.defaultPingTarget) {
        delete this.speedSupportTest.defaultPingTarget;
      }
      this.cpeSpeedSupportTestService.updateCPESpeedTestDetails(this.speedSupportTest, this.orgId).subscribe(data => {

        this.loading = false;
        console.log("if api success", this.STdatafromget)
        this.STdatafromget = Object.assign({}, this.speedSupportTest)
        console.log("after assing", this.STdatafromget)


      }, err => {
        this.loading = false;
        this.isError = true;
        this.alertMessage = this.dataService.pageErrorHandle(err);
        console.log("if api error", this.speedSupportTest)
        this.speedSupportTest = Object.assign({}, this.STdatafromget)
        console.log("after assing", this.speedSupportTest)
      })


    }
    else if (id == 'Generalspeedtest') {
      if (speedTestDetails.value.SpeedIQ_DownloadURL != undefined && speedTestDetails.value.SpeedIQ_UploadURL != undefined && speedTestDetails.value.SpeedIQ_UploadSize != undefined) {
        speedTestDetails.controls["SpeedIQ_DownloadURL"].setValue(speedTestDetails.value.SpeedIQ_DownloadURL.trim())
        speedTestDetails.controls["SpeedIQ_UploadURL"].setValue(speedTestDetails.value.SpeedIQ_UploadURL.trim())
        speedTestDetails.controls["SpeedIQ_UploadSize"].setValue(speedTestDetails.value.SpeedIQ_UploadSize.trim())

       this.speedSupportTest.calixTr143Servers = [
          {
            'downloadUrl': speedTestDetails.value.SpeedIQ_DownloadURL,
            'uploadUrl': speedTestDetails.value.SpeedIQ_UploadURL,
            'uploadSize': speedTestDetails.value.SpeedIQ_UploadSize
          }
        ]
      }
      else{
        console.log("empty array")
        delete this.speedSupportTest.calixTr143Servers;
        this.speediqDownloadUrl = "";
        this.speediqUploadUrl = "";
        this.speediquploadSize = "";

      }

      // this.loading = true;
      this.isError = false;

      if (this.testServerOoklaEndpoint === '' || !this.testServerOoklaEndpoint) {
        if (this.bgTest == true) {
          this.backgroundtestcheck = true;
        }
        else{
          this.backgroundtestcheck = false;
        }
        this.bgTest = false;
      }
      else {
        this.backgroundtestcheck = false;
      }

      this.speedSupportTest.ooklaBackground = this.bgTest
      this.speedSupportTest.calixnetspeed = this.calixnetspeeddata,
       /* this.speedSupportTest.calixTr143Servers = [
          {
            'downloadUrl': speedTestDetails.value.SpeedIQ_DownloadURL,
            'uploadUrl': speedTestDetails.value.SpeedIQ_UploadURL,
            'uploadSize': speedTestDetails.value.SpeedIQ_UploadSize
          }
        ]*/

        this.speedSupportTest.ooklaEndpoint = this.testServerOoklaEndpoint ? this.testServerOoklaEndpoint.trim() : this.testServerOoklaEndpoint,
        this.speedSupportTest.ooklaApply = this.ooklaApply,
        this.speedSupportTest.calixBackground = this.speediqbgTest,
        this.speedSupportTest.calixFallback = this.calixFallbackbutton,
        this.speedSupportTest.ooklaEnabled = this.privatespeedtestres,
        this.speedSupportTest.calixEnabled = this.speedtestserverdata,
      console.log("speedSupportTest2", this.speedSupportTest)
     /* if ((!speedTestDetails.value.SpeedIQ_DownloadURL || !speedTestDetails.value.SpeedIQ_UploadURL || !speedTestDetails.value.SpeedIQ_UploadSize) && (this.speedSupportTest.calixnetspeed != 'ookla')) {
        this.speediqnoconfig = true
        this.speediqsaveDisable = true
      }
      else {
        this.speediqnoconfig = false
        this.speediqsaveDisable = false
      }*/
     
     /* if(speedTestDetails.value.SpeedIQ_DownloadURL && speedTestDetails.value.SpeedIQ_UploadURL && speedTestDetails.value.SpeedIQ_UploadSize)
      {
        console.log(this.speedSupportTest.calixTr143Servers)
        console.log("lenght",this.speedSupportTest?.calixTr143Servers?.length)

      }
      else if(this.speedSupportTest?.calixTr143Servers?.length>= 1)
      {
        console.log("lenght present")
      }*/
     /* if (!this.speedtestserverdata) {
        delete this.speedSupportTest.calixTr143Servers;
      }*/

      if (!this.privatespeedtestres) {
        this.speedSupportTest.ooklaBackground = false;
        this.bgTest = false;
      }


      if (!this.backgroundtestcheck ) {

        this.cpeSpeedSupportTestService.updateCPESpeedTestDetails(this.speedSupportTest, this.orgId).subscribe(data => {

          this.loading = false;
          console.log("if api success", this.STdatafromget)
          this.STdatafromget = Object.assign({}, this.speedSupportTest)
          console.log("after assing", this.STdatafromget)


        }, err => {
          this.loading = false;
          this.isError = true;
          this.alertMessage = this.dataService.pageErrorHandle(err);
          console.log("if api error", this.speedSupportTest)
          this.speedSupportTest = Object.assign({}, this.STdatafromget)
          console.log("after assing", this.speedSupportTest)
        })
      }
      else {
        this.loading = false;
      }

    }
    else {

      speedTestDetails.value.downloadUrl != undefined ? speedTestDetails.controls["downloadUrl"].setValue(speedTestDetails.value.downloadUrl.trim()) : speedTestDetails.controls["downloadUrl"].setValue('');
      speedTestDetails.value.uploadUrl != undefined ? speedTestDetails.controls["uploadUrl"].setValue(speedTestDetails.value.uploadUrl.trim()) : speedTestDetails.controls["uploadUrl"].setValue('');
      speedTestDetails.value.uploadSize != undefined ? speedTestDetails.controls["uploadSize"].setValue(speedTestDetails.value.uploadSize.trim()) : speedTestDetails.controls["uploadSize"].setValue('');

      if ((!speedTestDetails.value.downloadUrl && !speedTestDetails.value.uploadUrl && !speedTestDetails.value.uploadSize) || (speedTestDetails.value.downloadUrl && speedTestDetails.value.uploadUrl && speedTestDetails.value.uploadSize)) {
        //this.loading = true;
        this.isError = false;
        console.log("3rd party speedSupportTest", this.speedSupportTest)
        this.speedSupportTest.tr143Servers = [
          {
            'downloadUrl': speedTestDetails.value.downloadUrl,
            'uploadUrl': speedTestDetails.value.uploadUrl,
            'uploadSize': speedTestDetails.value.uploadSize
          }
        ]

        this.speedSupportTest.tr143Background = this.TCPbgTest
        console.log("3rd party speedSupportTest2", this.speedSupportTest)
        if (!speedTestDetails.value.downloadUrl && !speedTestDetails.value.uploadUrl && !speedTestDetails.value.uploadSize) {
          delete this.speedSupportTest.tr143Servers;
        }

        this.cpeSpeedSupportTestService.updateCPESpeedTestDetails(this.speedSupportTest, this.orgId).subscribe(data => {

          this.loading = false;
          console.log("if api success", this.STdatafromget)
          this.STdatafromget = Object.assign({}, this.speedSupportTest)
          console.log("after assing", this.STdatafromget)


        }, err => {
          this.loading = false;
          this.isError = true;
          this.alertMessage = this.dataService.pageErrorHandle(err);
          console.log("if api error", this.speedSupportTest)
          this.speedSupportTest = Object.assign({}, this.STdatafromget)
          console.log("after assing", this.speedSupportTest)
        })

        // api call 
      } else if (speedTestDetails.value.downloadUrl || speedTestDetails.value.uploadUrl || speedTestDetails.value.uploadSize) {
        this.changeTR143();
        this.loading = false;
      }
      else {
        this.third_partysubmit_btndisable = true
        this.loading = false;
      }
    }
  }
  }

  calixspeedtestselection(event) {
    if (event.srcElement.id == "speediqenable") {
      this.calixnetspeeddata = 'calix_smart';
      this.typedisable = true
     // this.Calixspeedtestdiablemsg = false
    } else {
      this.calixnetspeeddata = 'calix_tr143';
     // this.speediqsaveDisable = false
     // this.Calixspeedtestdiablemsg = true
      this.typedisable = false
    }
  }

  speedtestserverselection(event) {
    if (event.srcElement.id == "calixenable") {
      this.speedtestserverdata = true;  
      this.Calixspeedtestdiablemsg = false
      //this.privatespeedtestdiablemsg = true
      this.changespeediq();
    } else {
      this.speedtestserverdata = false; 
      this.Calixspeedtestdiablemsg = true
     this.speediqsaveDisable = false;
     // this.privatespeedtestdiablemsg = false
    }
  }


  privatespeedtestselection(event) {
    if (event.srcElement.id == "privatestenabled") {
      this.privatespeedtestres = true; // need API 
      this.privatespeedtestdiablemsg = true
    } else {
      this.privatespeedtestres = false; // need API 
      this.privatespeedtestdiablemsg = false
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }


  getScopes() {
    let scopes = this.sso.getScopes();

    if (!this.router.url.includes('cco/services/configuration')) {
      if (environment.VALIDATE_SCOPE) {
        scopes['cloud.rbac.csc.netops.config.speed_test'] = scopes['cloud.rbac.csc.netops.config.speed_test'] ? scopes['cloud.rbac.csc.netops.config.speed_test'] : [];

        if (scopes && scopes['cloud.rbac.csc.netops.config.speed_test'] !== undefined && scopes['cloud.rbac.csc.netops.config.speed_test'].indexOf('read') !== -1) {
          this.speedTestRead = true;
        }
        if (scopes && scopes['cloud.rbac.csc.netops.config.speed_test'] !== undefined && scopes['cloud.rbac.csc.netops.config.speed_test'].indexOf('write') !== -1) {
          this.speedTestWrite = true;
        }

      } else {
        this.speedTestRead = true;
        this.speedTestWrite = true;
      }
    } else {

      if (!(this.sso.getEntitlementsArr().indexOf('118') > -1)) {
        this.router.navigate(['/cco']);
        return;
      }

      if (environment.VALIDATE_SCOPE) {
        if (scopes && scopes['cloud.rbac.coc.services.configuration.speedtest'] !== undefined && scopes['cloud.rbac.coc.services.configuration.speedtest'].indexOf('read') !== -1) {
          this.speedTestRead = true;
        }
        if (scopes && scopes['cloud.rbac.coc.services.configuration.speedtest'] !== undefined && scopes['cloud.rbac.coc.services.configuration.speedtest'].indexOf('write') !== -1) {
          this.speedTestWrite = true;
        }
      } else {
        this.speedTestRead = true;
        this.speedTestWrite = true;
      }
    }
    let enttlmnts = this.sso.getEntitlements();
    if (this.router.url.includes('cco/operations') && enttlmnts[210] && !enttlmnts[102]) {
      this.allowSubnetConfig = false;
    }
  }

  changeTR143() {
    this.third_partysubmit_btndisable = false;
    this.testServersDownloadUrl = this.testServersDownloadUrl.trim();
    this.testServerUploadUrl = this.testServerUploadUrl.trim();
    this.testuploadSize = this.testuploadSize.trim();
    /* var testServersDownloadUrlvalidate = this.testServersDownloadUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    var testServerUploadUrlvalidate = this.testServerUploadUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    var testuploadSizevalidate = this.testuploadSize.match("[0-9]");*/
    var testServersDownloadUrlvalidate = this.testServersDownloadUrl.match(this.UrlPattern);
    var testServerUploadUrlvalidate = this.testServerUploadUrl.match(this.UrlPattern);
    var testuploadSizevalidate = this.testuploadSize.match(this.patternfornumbers);
    
      if (testServersDownloadUrlvalidate == null) {
        this.isValiddownloadurl = false;
        this.third_partysubmit_btndisable = true;
      }
       else {

        this.isValiddownloadurl = true;
        //this.third_partysubmit_btndisable = false;
      }
     if(testServerUploadUrlvalidate == null){
        this.isValiduploadurl = false;
        this.third_partysubmit_btndisable = true;
      }
       else {

        this.isValiduploadurl = true;
        //this.third_partysubmit_btndisable = false;
      }
      if(testuploadSizevalidate == null)
      {
        this.isvaliduploadsize=false
        this.third_partysubmit_btndisable = true;
      }
      else{
        this.isvaliduploadsize=true      }
      /*else{
        this.third_partysubmit_btndisable = false;

      }*/
     if (this.testServersDownloadUrl == '') {
        this.isValiddownloadurl = true;
       // this.third_partysubmit_btndisable = false;
      }
      if (this.testServerUploadUrl == '') {
        this.isValiduploadurl = true;
       // this.third_partysubmit_btndisable = false;
      }
      if(this.testuploadSize == '')
      {
        this.isvaliduploadsize=true

      }

    if ((testServersDownloadUrlvalidate && testServerUploadUrlvalidate && testuploadSizevalidate) || (!this.testServersDownloadUrl && !this.testServerUploadUrl && !this.testuploadSize)) {
      this.third_partysubmit_btndisable = false;
    } else {
      this.third_partysubmit_btndisable = true;
    }
  }
  changespeediq() {
    this.speediqsaveDisable = false
    this.speediqDownloadUrl = this.speediqDownloadUrl.trim();
    this.speediqUploadUrl = this.speediqUploadUrl.trim();
    this.speediquploadSize = this.speediquploadSize.trim();
   // var speediqDownloadUrlvalidate = this.speediqDownloadUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
   // var speediqUploadUrlvalidate = this.speediqUploadUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    var speediqDownloadUrlvalidate = this.speediqDownloadUrl.match(this.UrlPattern);
    var speediqUploadUrlvalidate = this.speediqUploadUrl.match(this.UrlPattern);
   
    var speediquploadSizevalidate = this.speediquploadSize.match(this.patternfornumbers);

      if (speediqDownloadUrlvalidate == null) {
        this.isValidspeediqdownloadurl = false;
        this.speediqsaveDisable = true;
      }
       else {

        this.isValidspeediqdownloadurl = true;
        //this.speediqsaveDisable = false;
      }
     if(speediqUploadUrlvalidate == null){
        this.isValidspeediquploadurl = false;
        this.speediqsaveDisable = true;
      }
       else {

        this.isValidspeediquploadurl = true;
        //this.speediqsaveDisable = false;
      }
      if(speediquploadSizevalidate == null)
      { this.isValidspeediquploadsize = false
        this.speediqsaveDisable = true;
      }
      else
        { this.isValidspeediquploadsize = true

      }
      if (this.speediqDownloadUrl == '') {
        this.isValidspeediqdownloadurl = true;
        this.speediqsaveDisable = true;
      }
      if (this.speediqUploadUrl == '') {
        this.isValidspeediquploadurl = true;
        this.speediqsaveDisable = true;
      }
      if (this.speediquploadSize == '') {
        this.isValidspeediquploadsize = true;
        this.speediqsaveDisable = true;
      }
      
    if ((speediqDownloadUrlvalidate && speediqUploadUrlvalidate && speediquploadSizevalidate)) {
      this.speediqsaveDisable = false;
    } else {
      this.speediqsaveDisable = true;
    }
  }
 

  onChangeOokla(event) {
    if (event.target.checked && (this.testServerOoklaEndpoint == '' || this.testServerOoklaEndpoint == null)) {
      this.ooklaApply = false;
      return event.target.checked = false;
    }
    if (event.target.checked && this.testServerOoklaEndpoint != '') {
      this.isDisableOoklaEndPoint = true;
    } else {
      this.isDisableOoklaEndPoint = false;
    }
  }
  onChangespeediqbgTest(event)
  {
    if (event.target.checked && this.bgTest ) {
      this.speediqbgTest = false;
      return event.target.checked = false;
    }
    
  }
  onChangebgTest(event)
  {
    if (event.target.checked && this.speediqbgTest) {
      this.bgTest = false;
      return event.target.checked = false;
    }
  }
  systemtab(){
    if(this.testServersDownloadUrl && this.testServerUploadUrl && this.testuploadSize)
    {
      this.allowtocopy = false
    }
    else{
      this.allowtocopy = true
    }

  } 
  copyconfig(event)
  { 
    if (event.target.checked) {
      this.speediqDownloadUrl = this.testServersDownloadUrl;
      this.speediqUploadUrl = this.testServerUploadUrl;
      this.speediquploadSize = this.testuploadSize;
      this.changespeediq()

    }
  }
  onChangeOoklaEndpoint() {
    if (this.testServerOoklaEndpoint) {
      var res = this.testServerOoklaEndpoint.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if (res == null) {
        this.isValidOoklaEndpoint = false;
        this.speediqsaveDisable = true;
      } else {
        this.isValidOoklaEndpoint = true;
        if (!this.speedtestserverdata) {
          this.speediqsaveDisable = false;
        }else{
          this.changespeediq()
        }

      }
    }
    if (this.testServerOoklaEndpoint == '') {
      this.ooklaApply = false;
      this.isValidOoklaEndpoint = true;
      if (!this.speedtestserverdata) {
        this.speediqsaveDisable = false;
      }else{
        this.changespeediq()
      }

    }
  }

  avoidInitialSpacing(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault()
    }
  }
  resetformfields() {
    this.testServersDownloadUrl = '';
    this.testServerUploadUrl = '';
    this.testuploadSize = '';

    this.testPingTarget = '';

    this.speediqDownloadUrl = '';
    this.speediqUploadUrl = '';
    this.speediquploadSize = '';
  }
  removeUnwantedSpace(input, value) {
    this[input] = this.CommonFunctionsService.trimSpaceFromNonObjectInputs(value)
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;

    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;

    }
    else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.germanTable;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    }
  }

}
