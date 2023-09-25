import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../data.service';
import { DataSerialNumberModel } from '../../shared/models/data.serial-number.model';
import { CalendarModule } from 'primeng/calendar';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { SupportRadioObjectModel } from '../../shared/models/support-radio-object.model';
import { MetaField } from '../../shared/models/ssid-meta-fields.model';
import {
  checkMultileFrequency, cleanArray, cleanObject, constructEncryptionObject, constructEncyptionModeValues,
  constructSecurityValues, CreateMetaFieldObject, deleteFromObject, fetchRadioEncryption, FetchSecurityOptionsFromSSIDMeta, NamePatternError,
  seperateRadioList,
  ssidMetaPattern, SSIDNamePattern, wifiFetchSecurityOptionsFromSSIDMeta
} from '../../shared/service/utility.class';
import { SupportWifiService } from '../services/support-wifi.service';
import { MetaData } from '../../shared/models/meta-data.model';
import { EncryptionModes } from '../../shared/models/encrption-modes-model';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import { AnyNaptrRecord } from 'dns';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TrobuleShootingScopeModel } from '../../netops-management/shared/model/scopes.model';
import { TrafficModule } from 'src/app/cco/traffic/traffic.module';
import { truncate, truncateSync } from 'fs';
import { createFalse, createTrue, isJsxSelfClosingElement, transpileModule } from 'typescript';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { analyzeAndValidateNgModules, NullTemplateVisitor } from '@angular/compiler';
import { start } from 'repl';
import { String } from 'aws-sdk/clients/cloudwatchevents';
import { bool } from 'aws-sdk/clients/signer';

import { PrimeNGConfig } from 'primeng/api'
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service'
// import { lang } from 'moment';
import { element } from 'protractor';
import { CaptivePortalService } from '../../support-application/shared/service/captive-portal.service';
import { Title } from '@angular/platform-browser';
import moment from 'moment';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-ssid-pooling',
  templateUrl: './ssid-pooling.component.html',
  styleUrls: ['./ssid-pooling.component.scss'],
  providers: [SupportRadioService, SsoAuthService]
})
export class SsidPoolingComponent implements OnInit {



  @ViewChild('editModal', { static: true }) private editModal: TemplateRef<any>;
  @ViewChild('AddModal', { static: true }) private AddModal: TemplateRef<any>;
  @ViewChild('editModalold', { static: true }) private editModalold: TemplateRef<any>;

  @ViewChild('smbEditModal', { static: true }) private smbEditModal: TemplateRef<any>;
  @ViewChild('IndividualPasswordsModal', { static: true }) private individualPasswordsModal: TemplateRef<any>;
  //for ui validation
  @ViewChild('datatab', { static: false }) datatab: NgForm;
  @ViewChild('myformedit', { static: false }) myformedit: NgForm;
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  @ViewChild('passphraseVerifyWarnModal', { static: true }) private passphraseVerifyWarnModal: TemplateRef<any>;
  //for ui validation

  //for getting user-id
  userId: any;
  deviceData: DataSerialNumberModel[];
  deviceWoRG = [];
  serialNumber: string;
  deviceDropDown: DataSerialNumberModel[] = [];
  //for getting user-id

  //alert
  loading: boolean = false;
  deviceInfo;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  public errorMessageshownadd: boolean = false;
  priorizationshown: boolean = false;
  undiscoveredGS: any = false;
  isUndiscoverdDevice: boolean = false;
  deviceList = [];
  isRgWfifiAvailable: boolean = false;
  //alert

  language: any;
  languageSubject;

  ssidvalues: any;
  orgId: any;
  flag: any;
  bSmb: boolean = false;
  isbSmb: boolean = false;

  // date
  datefrom: Date;
  dateto: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  showTable: any = false;

  es: any;
  invalidDates: Array<Date>;

  //edit & Add
  ssidObjects = [];
  ssidObjectobj: any
  ssidObjectForm: any = [];
  ssidobjectFormAdd: any;
  ssidObjectobj2: SupportRadioObjectModel[];
  namePatternError = NamePatternError;
  ssidNamePattern = SSIDNamePattern;
  ssidObject: SupportRadioObjectModel[];

  encryption: EncryptionModes[] = [];
  encryptionMetaModes: EncryptionModes[];
  selectedEncryption: any;


  //for dropdownvalues
  EncryptionTypes: any = [];
  NetworkTypes: any = [];

  //key passwword
  show: boolean = false;
  showdatatable: boolean = false;
  togglePasswordTable: boolean[] = []
  datapickershow: boolean = false;
  Duration: boolean = false;

  //filter
  temp = [];
  permanentRows = [];
  //maxDate = new Date();
  fromMinimumDate: Date;
  toMinimumDate: Date;
  startdateminimum: any;

  metaData: MetaData;
  selectedMetaObj: any = {}
  editedSecurity: any = [];
  oldPassword: string;
  allSsidNames = [];
  dialogErrorMsg: string;
  security: any = [];
  showList: boolean = false;
  showPassPhrase: boolean = false;
  hasWriteAccess: boolean = false;
  hasSSIDReadAccess: boolean = false;
  wifiSSIDRowRead: boolean = false;
  hasSSIDAddReadAccess: boolean = false;
  hasSSIDEditReadAccess: boolean = false;
  hasSSIDWriteAccess: boolean = false;
  checkingvaluesArray: any = [];

  scopes: String;
  showPassword: string = "password";
  checked: AnyNaptrRecord;
  radioStatuscustomedit: boolean;
  radioStatusendlessedit: boolean;

  radioStatuscustomadd: boolean;
  radioStatusendlessadd: boolean;

  networkloadadd = [];
  //for edit ssid
  frequencybandeditorginal: boolean;
  frequencybandeditduplicate: boolean;

  prioritizationeditorginal: boolean;
  prioritizationeditduplicate: boolean;

  isolationeditorginal: boolean;
  isolationeditduplicate: boolean;
  //for edit ssid


  //for add ssid
  frequencybandaddorginal: boolean;
  frequencybandaddduplicate: boolean;

  prioritizationoginal: boolean = true;
  prioritizationduplicate: boolean;

  isolatioaddorginal: boolean = true;
  isolatioaddduplicate: boolean;
  //for add ssid

  dupilcatedatepicker: boolean = false;

  band5checked: boolean;
  band24checked: boolean;
  band6checked: boolean;

  passwordhide: boolean = true;

  commandIQStatusSubject: any;
  deleteunsubscribe: any
  Addunsubscribe: any;
  updateunsubcribe: any;
  modalRef: any;
  networkType: any = 'All Types';
  temparray = [];
  arrayprimarybindvalue: any;

  band24EditDuplicateSelected: boolean = false;
  band5EditDuplicateSelected: boolean = false;
  band6EditDuplicateSelected: boolean = false;

  addssidbuttonshown: boolean = false;
  showPassPhraseOldModel: boolean = false
  splitSSID: boolean = false;

  primaryPassPharse: boolean = false;
  secondaryPassPharse: boolean = false;
  wiFi6Enable: boolean = false;
  softwareVersion: any;
  subscriberaccount: any;
  subscriberemail: any;
  subscriberaddress: any;
  subscriberphone: any;
  accessPassphrasenable: boolean = true;
  checksubvalidate: any;
  editaccesspasspharsepopup: boolean = false;
  listpasspharseaccesspopup: boolean = false
  listpasspharsealertpopup: boolean = false
  editpasspharsealertpopup: boolean = false
  primaryeventcheck: boolean = false;
  secondaryeventcheck: boolean = false;
  viewpasspharsevisible: boolean = true;
  subscriberInfo: any;
  rgdeviceid: any;
  rgmodelname: any;
  manufacturer: any;
  loginData: any;
  orgidfromlocal: any;
  secureaccessrole: any;
  descriptionforssidlist
  freetextedit: boolean = false;
  ssidfreetextedit
  freetextssidlist: boolean = false;
  ssidfreetextlist
  Orgacceforssid
  emptypassword: boolean = false;
  hasPassPhraseAccess: boolean = false;
  hasSSIDCreate: boolean = false;
  hasSSIDEdit: boolean = false;
  isChecked: any;
  isInL2BridgeWarningMsg: boolean = false;
  oldpasswordforprimary
  oldpasswordsecondary
  tableLoader: boolean = false;
  isSmbOnboarded: boolean = false;
  constructor(private translateService: TranslateService, private router: Router, private radioService: SupportRadioService, private el: ElementRef, private modalService: NgbModal,
    private ssoAuthService: SsoAuthService, private api: SupportWifiService, private dialogService: NgbModal, private dataService: DataServiceService,
    private service: DataServiceService, private http: HttpClient, private config: PrimeNGConfig, private dateUtils: DateUtilsService, private captivePortalService: CaptivePortalService, private titleService: Title,
    private formBuilder: FormBuilder
  ) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.deviceData = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.scopes = this.ssoAuthService.getScopes();
    this.api.ssidPageLoaded('ssid');
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'SSID MANAGER', '/support/wifi/ssid', 'WiFi SSID Manager page loaded');
  }



  ngOnInit(): void {
    //for getting orgid and serialNumber
    // for loading first RG router
    if (environment.VALIDATE_SCOPE) {
      if (this.ssoAuthService.getCscType() !== 'DME') {
        this.scopes['cloud.rbac.csc.wifi'] = this.scopes['cloud.rbac.csc.wifi'] ? this.scopes['cloud.rbac.csc.wifi'] : [];
        if (this.scopes && (this.scopes['cloud.rbac.csc.wifi'] && this.scopes['cloud.rbac.csc.wifi'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }
      } else {
        this.scopes['cloud.rbac.csc.wifi.basic'] = this.scopes['cloud.rbac.csc.wifi.basic'] ? this.scopes['cloud.rbac.csc.wifi.basic'] : [];
        if (this.scopes && (this.scopes['cloud.rbac.csc.wifi.basic'] && this.scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1)) {
          this.hasWriteAccess = true;
        }

      }

      this.scopes['cloud.rbac.csc.ssidmanager.viewpassphrase'] = this.scopes['cloud.rbac.csc.ssidmanager.viewpassphrase'] || [];
      if (this.scopes && this.scopes['cloud.rbac.csc.ssidmanager.viewpassphrase'].includes('read')) {
        this.hasPassPhraseAccess = true;
      }

    } else {
      this.hasWriteAccess = true;
      this.hasPassPhraseAccess = true;
    }

    /*------- Start code for CCL-48250 -----------*/
    if (environment.VALIDATE_SCOPE) {

      this.scopes['cloud.rbac.csc.ssidmanager'] = this.scopes['cloud.rbac.csc.ssidmanager'] ? this.scopes['cloud.rbac.csc.ssidmanager'] : [];
      this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] = this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] ? this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] : [];
      this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] = this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] ? this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] : [];

      if (this.scopes && (this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate']) && this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'].indexOf('write') !== -1) {
        this.hasSSIDCreate = true;
      }
      if (this.scopes && (this.scopes['cloud.rbac.csc.ssidmanager.ssidedit']) && this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'].indexOf('write') !== -1) {
        this.hasSSIDEdit = true;
      }
      /*else {
       this.scopes['cloud.rbac.csc.wifi.basic'] = this.scopes['cloud.rbac.csc.wifi.basic'] ? this.scopes['cloud.rbac.csc.wifi.basic'] : [];
       if (this.scopes && (this.scopes['cloud.rbac.csc.wifi.basic'] && this.scopes['cloud.rbac.csc.wifi.basic'].indexOf('write') !== -1)) {
         this.hasWriteAccess = true;
       }

     }*/

    } else {
      this.hasSSIDCreate = true;
      this.hasSSIDEdit = true;
    }
    /*------- End code for CCL-48250 -----------*/

    this.deviceData?.forEach((element: DataSerialNumberModel) => {
      this.deviceList = [];
      if (element.opMode == "RG") {
        //this.deviceDropDown.push(new DataSerialNumberModel(element));
        this.serialNumber = element.serialNumber
        this.api.getRadioSummary(this.orgId, this.serialNumber).subscribe((res) => {
          if (res && Object.keys(res).length) {

            if (res['2.4G'] && Object.keys(res['2.4G']).length && res['2.4G']?.RadioEnabled) {

              this.isRgWfifiAvailable = true;
            }
            if (res['5G'] && Object.keys(res['5G']).length && res['5G']?.RadioEnabled) {

              this.isRgWfifiAvailable = true;
            }
            if (res['6G'] && Object.keys(res['6G']).length && res['6G']?.RadioEnabled) {

              this.isRgWfifiAvailable = true;
            }
          }

          if ((!this.serialNumber || !this.isRgWfifiAvailable) && this.deviceData?.length > 0) {

            this.deviceWoRG = this.deviceData?.filter(device => device.opMode);
            this.serialNumber = this.deviceWoRG ? this.deviceWoRG[0].serialNumber : '';
            this.deviceList = [];
            this.deviceWoRG.map((e, i) => {
              if (i == 0) {
                this.deviceList.push({ id: e.serialNumber, name: '' })
              } else {
                this.deviceList.push({ id: e.serialNumber, name: e.serialNumber })
              }
            })
          }
          this.deviceList.length > 1 ? this.showList = true : this.showList = false;
        }, (err) => {

          //this.radioSummary = {};
          this.pageErrorHandle(err);
        })
      }
    });
    if (!this.serialNumber && this.deviceData && this.deviceData.length) {

      this.deviceWoRG = this.deviceData?.filter(device => device.opMode);
      this.serialNumber = this.deviceWoRG.length ? this.deviceWoRG[0].serialNumber : '';
      this.deviceList = [];
      this.deviceWoRG.map((e, i) => {
        this.deviceList.push({ id: e.serialNumber, name: e.serialNumber })
      })
      this.deviceList.length > 1 ? this.showList = true : this.showList = false;
    }
    this.orgId = localStorage.getItem('calix.org_id');

    this.landingPage();
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.undiscoveredGS = (
      !this.deviceInfo?.filter((obj: any) => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoAuthService.acceptGSModel(obj.modelName))).length &&
      this.deviceInfo?.filter(obj => !obj.hasOwnProperty("modelName")).length
    );
    //this.deviceInfo = this.deviceInfo?.filter(obj => obj.opMode == "RG");
    //this.deviceInfo = this.deviceInfo && this.deviceInfo.length ? this.deviceInfo[0].serialNumber : '';
    this.isUndiscoverdDevice = false;
    if (this.undiscoveredGS > 0) {
      this.isUndiscoverdDevice = true;
    }

    setTimeout(() => {
      if (this.splitSSID == true) {
        this.getDeviceStatus();
      }
    }, 2000);
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['SSID_Manager']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`); //Calix Cloud - Support - Wi-Fi - SSID Manager
      if (this.language.fileLanguage == 'fr') {
        this.config.setTranslation({
          "monthNames": [this.language.January, this.language.February, this.language.March, this.language.April, this.language.May, this.language.June, this.language.July, this.language.August, this.language.September, this.language.October, this.language.November, this.language.December],
        });
      } else {
        this.config.setTranslation({
          "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        });
      }
    });
    this.titleService.setTitle(`${this.language['SSID_Manager']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`); //Calix Cloud - Support - Wi-Fi - SSID Manager

    let today = new Date();
    this.startdateminimum = today;
    this.softwareVersion = this.ssoAuthService.getSoftwareVersion(true);

    this.subscriberInfo = this.ssoAuthService.getSubscriberInfo();
    this.subscriberaccount = this.subscriberInfo.subscriberLocationId
    this.subscriberemail = this.subscriberInfo.email
    this.subscriberaddress = this.subscriberInfo.serviceAddress
    this.subscriberphone = this.subscriberInfo.phone
    this.manufacturer = this.deviceInfo?.length ? this.deviceInfo[0]?.manufacturer : '';
    let devicedatafromsession = this.deviceInfo?.filter(device => device.opMode == "RG");
    this.rgdeviceid = devicedatafromsession?.length ? devicedatafromsession[0]?.deviceId : " ";
    this.rgmodelname = devicedatafromsession?.length ? devicedatafromsession[0]?.modelName : " ";
    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';
    //this.togglePasswordTable.manufacturer=devicedatafromsession.manufacturer
    this.orgidfromlocal = localStorage.getItem('calix.org_id') ? localStorage.getItem('calix.org_id') : ' ';

    this.editaccesspasspharsepopup = true;
    let isbSmb = false;
    this.subscriberInfo?.devices?.forEach(obj => {
      if (obj.bSmbMode) isbSmb = true;
    });
    this.isbSmb = isbSmb;
    this.bSmb = (this.subscriberInfo?.isSmbOnboarded && isbSmb) ? true : false;
    //let roles = this.ssoAuthService.getRoles();
    this.Orgacceforssid = sessionStorage.getItem('Orgacceforssid') ? sessionStorage.getItem('Orgacceforssid') : false;
    if (this.Orgacceforssid == 'true') { //secureaccess
      this.secureaccessrole = 'Calix'
      this.freetextssidlist = true
      this.freetextedit = true
    }
    else {
      this.secureaccessrole = 'BSP'
      this.freetextssidlist = false
      this.freetextedit = false
    }
    //console.log("secureaccessrole",this.secureaccessrole)
  }
  bwShapingOn: boolean = false
  landingPage() {
    this.showTable = false;
    // this.http.get(`${environment.SUPPORT_URL}/device/${this.orgId}/${this.serialNumber}/availability`).subscribe((values: any) => {
    this.dataService.getAvailibilityStatus(this.orgId, this.serialNumber).subscribe((values: any) => {
      //this.showTable = true;
      if (values) {
        values.splitSsid = ((values?.splitSsid == true) || (!values?.splitSsid && this.isbSmb));
        if (values?.splitSsid == true) {
          this.splitSSID = true;
          this.showTable = values?.splitSsid;
          this.addssidbuttonshown = true;
          this.wiFi6Enable = values?.wifi6
          this.bwShapingOn = values?.bwShapingOn;
          this.router.navigate(['/support/wifi/ssid']);

          setTimeout(() => {

            if (this.serialNumber) {
              this.loading = true;
              this.fetchMetaData(this.serialNumber);
            }
            // this.getUserIds(this.serialNumber);
          }, 2000);
          this.getUserIds(this.serialNumber);

        } else {

          this.splitSSID = false;
          //this.addssidbuttonshown = false;
          this.router.navigate(['/support/wifi/ssidold']);

        }
      } else {
        this.splitSSID = false;
        this.router.navigate(['/support/wifi/ssidold']);
      }
      this.addnetworkload();
    }, err => {
      this.router.navigate(['/support/wifi/ssid']);
    })
  }

  getUserIds(serialNumber) {
    this.dataService.getUserIdValues(serialNumber).subscribe((newData: any) => {

      if (newData && newData.userId) {
        this.userId = newData.userId;
        this.networkload(this.userId);
        this.Encryptionload(this.userId);
        if (this.isbSmb) {
          this.getSMBWifiTypes();
        }
        this.getQosListData(this.userId);
      }
      setTimeout(() => {
        // this.loading = true;
        this.fetchSSIDListValues(this.orgId, this.serialNumber);
      }, 2000);

    }, err => {
      this.pageErrorHandle(err);
      this.loading = false;
    })

  }

  networkload(userId) {
    this.dataService.getnetworktypevalues(userId).subscribe((res1: any) => {

      //this.NetworkTypes = res1.types;
      res1.types.forEach((element, i, object) => {
        element.description = this.capitalizeFirstLetter(element.description)

        if (this.wiFi6Enable == false && element.description == "Custom 6 GHz") {
          object.splice(i, 1);

        }
      })
      this.NetworkTypes = [];
      this.NetworkTypes = res1.types;
    });
  }
  capitalizeFirstLetter(string): string {
    if (string == "custom 2.4GHz") {
      string = "custom 2.4 GHz"
    }
    if (string == "custom 5GHz") {
      string = "custom 5 GHz"
    }
    if (string == "custom 6GHz") {
      string = "custom 6 GHz"
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // spaceBtwLetter(string): string {
  //   if(string==)
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  Encryptionload(userId, type = "") {
    this.dataService.getEncryptionvalues(userId).subscribe((res2: any) => {
      // this.EncryptionTypes = res2.types;
      res2?.types?.forEach(element => {
        if (element.description == "none") {
          element.description = "SecurityOff"
        }
      });
      this.EncryptionTypes = res2.types;
      if (type == "Custom 6 GHz") {
        // this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.description == "WPA3-Personal")
        this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 6)
      }
      // if ((this.is6gAvailableForSec && this.wiFi6Enable) && (type == "Guest" || type == "Custom unified")) {
      //   this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 5 || x.value == 6)
      // }
    });


  }
  SMBWifiTypes: any = [];
  getSMBWifiTypes() {
    this.dataService.getSMBWifiTypes().subscribe((res2: any) => {
      res2?.types.forEach(element => {
        element.description = element?.description?.replace("SMB_", "").toLowerCase();
        if (element.description == "customer") {
          element.description = "Customer Portal"
        }
        if (element.description == "owner") {
          element.description = "Primary"
        }
        if (element.description == "pos") {
          element.description = "Point of Sale"
        }
        element.description = this.capitalizeFirstLetter(element.description);
      })
      this.SMBWifiTypes = res2?.types;

    })
  }


  showOperator: boolean = true;
  changeSSIDOperator(e = null) {
    if (this.SSIDFilterValue == "All Types")
      this.fetchSSIDListValues(this.orgId, this.serialNumber);
  }


  ssidListCount: boolean = true;
  reserved6ghzname: boolean = false;
  smbSsidList: any = [];
  hasSmbSSIDs: boolean = false;
  primaryOperatorSsids: any = [];
  isDeviceUnifiedSsid: boolean = false;

  fetchSSIDListValues(orgId, serialNumber, isRefreshed = false) {
    this.Encryptionload(this.userId);
    if (this.serialNumber) {
      this.loading = true;
      this.dataService.fetchMetaDatavaluesNew(orgId, serialNumber, isRefreshed).subscribe((res: SupportRadioObjectModel) => {

        this.hasSmbSSIDs = false;
        if (res) this.ssidListCount = false;
        this.ssidObjectobj = res["secondary-ssid"];
        this.ssidObjectobj2 = res["primary-operator-ssid"];

        var deviceUnifiedSsid = res["deviceUnifiedSsid"];
        if (deviceUnifiedSsid) {
          this.isDeviceUnifiedSsid = (deviceUnifiedSsid.Enable == "true") ? true : false
        }

        if (this.ssidObjectobj2?.length > 0) {
          this.primaryOperatorSsids = JSON.parse(JSON.stringify(this.ssidObjectobj2));
        }

        this.smbSsidList = res["smb-ssid"];
        this.checkingvaluesArray = res["availability"];
        if (this.smbSsidList?.length > 0) {
          this.ssidObjectobj = this.smbSsidList;
          this.hasSmbSSIDs = true;
          // this.ssidObjectobj2 = [];
        }
        this.temparray = [];
        this.togglePasswordTable = [];

        if (this.checkingvaluesArray == undefined) this.addssidbuttonshown = true;
        var dummybinding = res["primary-operator-ssid"];
        if (this.ssidObjectobj != null && this.ssidObjectobj != undefined) {
          let totalcount = 0;
          if (this.hasSmbSSIDs) {
            var smbSsidListCount = this.ssidObjectobj?.filter(x => x.enabledStatus == true);
            totalcount = smbSsidListCount?.length;
          }
          else {
            totalcount = this.ssidObjectobj.length;
          }

          let tempOn = res["primary-operator-ssid"]?.filter(x => x.Enable == "true");
          if (tempOn) {
            totalcount += tempOn.length ? tempOn.length : 0;
          }
          let overflowApi = this.service.getSubscriberTabInfoData();
          //console.log("2222", overflowApi)
          if (overflowApi && overflowApi.networkStatus.ssid.activeSSIDCount) {
            overflowApi.networkStatus.ssid.activeSSIDCount = totalcount;
            // this.service.setSubscriberTabInfoData(overflowApi);
          } else {

            // overflowApi.networkStatus.ssid['activeSSIDCount'] = totalcount;
            // this.service.setSubscriberTabInfoData(overflowApi);
            // while switching from wifi to device tab it showing the device count as 0 so we are commented this one
            const obj = {
              networkStatus: {
                ssid: {
                  activeSSIDCount: totalcount
                }
              }
            }
            // this.service.setSubscriberTabInfoData(obj);
          }
          $('.ssidcount').text(totalcount);

          let combined: any;

          this.ssidObjectobj.forEach((el, index) => {
            if (el.password == undefined || el.password == "" || el.password == "(null)") {
              el.password = "";
              return el;
            }
          })

          this.ssidObjectobj2?.forEach((el: any, index) => {
            if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
              el.networktype = "Primary";

            }
            else {
              el.networktype = "Operator";
            }
          })


          var primary_Two_four_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID1");
          var primary_Five_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID9");
          // var six_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17");
          var six_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17" && !x?.SSID?.startsWith("RESERVED-6G-"));

          if (!this.checkThirdParty()) {
            if (primary_Two_four_ghz?.length > 0 && primary_Five_ghz?.length > 0 && six_ghz.length > 0) {
              //console.log("There is three consitions");
              this.isSSID6_4GZ = true;
              this.isSSID5_4GZ = true;
              this.isSSID2_4GZ = true;
              var obj1 = Object.assign({}, primary_Two_four_ghz[0])
              var obj2 = Object.assign({}, primary_Five_ghz[0])
              var obj3 = Object.assign({}, six_ghz[0])

              var compared = this.comparePrimarySSID(obj1, obj2, obj3);
              if (compared) {
                var index = this.ssidObjectobj2.findIndex(x => x.SSIDName == "SSID1");
                if (index != -1) {
                  var arr = [obj1?.freqBand, obj2?.freqBand, obj3?.freqBand]
                  this.ssidObjectobj2[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand + "," + obj3?.freqBand;
                  this.ssidObjectobj2[index].isUnifiedPrimary = true;
                }
                this.ssidObjectobj2 = this.ssidObjectobj2?.filter(x => x.SSIDName !== "SSID9" && x.SSIDName != "SSID17");
              }
              // var reserved6ghzName = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17");
              // if (reserved6ghzName?.length > 0) {
              //   if (reserved6ghzName[0]?.SSID.startsWith("RESERVED-6G-")) {
              //     this.ssidObjectobj2 = this.ssidObjectobj2?.filter(x => x.SSIDName != "SSID17");
              //   }
              // }
            }
            else if (primary_Two_four_ghz?.length > 0 && primary_Five_ghz?.length > 0) {
              //console.log("There is two consitions");
              this.isSSID6_4GZ = false;
              this.isSSID5_4GZ = true;
              this.isSSID2_4GZ = true;
              var obj1 = Object.assign({}, primary_Two_four_ghz[0])
              var obj2 = Object.assign({}, primary_Five_ghz[0])
              //var obj3 = Object.assign({}, six_ghz[0])
              var compared = this.comparePrimarySSID(obj1, obj2, {});
              if (compared) {
                var index = this.ssidObjectobj2.findIndex(x => x.SSIDName == "SSID1");
                if (index != -1) {
                  var arr = [obj1?.freqBand, obj2?.freqBand]
                  this.ssidObjectobj2[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand;
                  this.ssidObjectobj2[index].isUnifiedPrimary = true;
                }
                this.ssidObjectobj2 = this.ssidObjectobj2?.filter(x => x.SSIDName !== "SSID9");
                var reserved6ghzName = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17");
                if (reserved6ghzName?.length > 0) {
                  if (reserved6ghzName[0]?.SSID?.startsWith("RESERVED-6G-")) {
                    this.isSSID6_4GZ = true;
                    this.ssidObjectobj2[index].isRreserved6ghzName = true;
                    this.six_gSSIDFrequenyBands = false;
                  }
                }
              }
            }

          }
          else if (this.checkThirdParty() && this.isDeviceUnifiedSsid) {
            this.isSSID5_4GZ = true;
            this.isSSID2_4GZ = true;
            var obj1 = Object.assign({}, primary_Two_four_ghz[0])
            var obj2 = Object.assign({}, primary_Five_ghz[0])
            var index = this.ssidObjectobj2.findIndex(x => x.SSIDName == "SSID1");
            if (index != -1) {
              var arr = [obj1?.freqBand, obj2?.freqBand]
              this.ssidObjectobj2[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand 
              this.ssidObjectobj2[index].isUnifiedPrimary = true;
            }
            this.ssidObjectobj2 = this.ssidObjectobj2?.filter(x => x.SSIDName !== "SSID9");


          }


          // Showing primary and secondary
          if (this.SSIDFilterValue == "All Types") {
            if (this.showOperator) {

              this.ssidObjectobj2.forEach((el: any, index) => {
                if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
                  el.networktype = "Primary";

                }
                else {
                  el.networktype = "Operator";
                }
              })
              /* Start code for CCL-47672 */
              if (six_ghz.length > 0) {
                combined = this.ssidObjectobj.concat(this.ssidObjectobj2);
              }
              else {
                combined = this.ssidObjectobj.concat(this.ssidObjectobj2?.filter(x => x.SSIDName != "SSID17"));
              }
              /* End code for CCL-47672 */

              //  combined = this.ssidObjectobj.concat(this.ssidObjectobj2);
              this.ssidObjectobj = this.ssidObjectobj.concat(this.ssidObjectobj2);
            }
            else {
              if (six_ghz.length == 0) {
                this.ssidObjectobj2 = this.ssidObjectobj2?.filter(x => x.SSIDName != "SSID17")
              }

              let arryPrimary = [];
              this.ssidObjectobj2.forEach((el: any, index) => {
                if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
                  el.networktype = "Primary";
                  arryPrimary.push(el);

                }

              })

              combined = this.ssidObjectobj.concat(arryPrimary);
            }
          }
          else {
            combined = this.ssidObjectobj.concat(this.ssidObjectobj2);
            this.ssidObjectobj = this.ssidObjectobj.concat(this.ssidObjectobj2);
          }


          combined.forEach((el, index) => {
            //el.showPassword = false
            if (el != null) {

              if (this.hasSmbSSIDs) {
                this.isSmbOnboarded = this.ssoAuthService.isSmbEnabled();
                this.SMBWifiTypes.forEach(element1 => {
                  if (element1.value == el.type) {
                    if (this.isSmbOnboarded && this.softwareVersion >= 23.3) {
                      if (el.type == 2 && el.passwordMode == 2) {
                        element1.description = "Staff-Individual"
                      }
                      if (el.type == 2 && el.passwordMode == 1) {
                        element1.description = "Staff-Shared Password"
                      }
                    }

                    el.networktype = element1.description;
                  }
                });
              }
              else {
                this.NetworkTypes.forEach(element1 => {
                  if (element1.value == el.type) {
                    el.networktype = element1.description;
                  }
                });
              }

              // this.dataService.getEncryptionvalues(this.userId).subscribe((res2: any) => {
              //   this.EncryptionTypes = res2.types;

              // })
              this.EncryptionTypes.forEach(element => {
                if (element.value == el.encryptionType) {
                  el.encryptionvalue = element.description;
                }
              });
              if (el.id != null) {
                el.ssid = el?.SSID;
                el.band = el.freqBand;
                el.encryptionvalue = el.BeaconType;
              }
              if (el.hasOwnProperty('isSmbSSID')) {
                if (el.name != null) {
                  el.ssid = el.name;
                }
                el.Enable = el.enabledStatus ? "true" : "false"
                el.SSIDAdvertisementEnabled = el.hidden ? "false" : "true";

                // if (el.enabledStatus) {
                //   el.Enable = el.enabledStatus
                // }
                // if (el.hidden) {
                //   el.SSIDAdvertisementEnabled = el.hidden
                // }
              }
              if (el.password) {
                if (el.password == "" || el.password == "(null)") {
                  el.password = "";
                }

              }
              if (el.hasOwnProperty('smartQos')) {

                // Based on softwareversion

                if (this.softwareVersion >= 22.1) {
                  // if (el.smartQos && this.tempDeviceStatus == true && this.iosdata == true) {
                  if (el.smartQos && this.tempDeviceStatus == true) {
                    // if (this.bwShapingOn && el.type == 2) {
                    //   el.smartQos = false;
                    // }
                    // else {
                    //   el.smartQos = true;
                    // }

                    if (this.bwShapingOn && !this.iosdata) {
                      el.smartQos = false;
                    }
                    else if (!this.bwShapingOn && this.iosdata) {
                      el.smartQos = true;
                    }
                    else if (!this.bwShapingOn && !this.iosdata) {
                      el.smartQos = false;
                    }

                  }
                  else {
                    el.smartQos = false;
                  }
                }

                else {
                  if (el.smartQos && this.tempDeviceStatus == true && this.iosdata == true) {
                    // if (el.smartQos && this.tempDeviceStatus == true) {
                    if (this.bwShapingOn && el.type == 2) {
                      el.smartQos = false;
                    }
                    else {
                      el.smartQos = true;
                    }

                  }
                  else {
                    el.smartQos = false;
                  }
                }
              }

              if (el.KeyPassphrase) {
                el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');
                // el.password = el.KeyPassphrase;
              }
              if (el.PRConfig != null) {
                if (el.PRConfig.KeyPassphrase) {
                  el.PRConfig.KeyPassphrase = el.PRConfig.KeyPassphrase;
                }
                else {
                  if (el.KeyPassphrase)
                    el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');
                  // el.password = el.KeyPassphrase;

                }

              }
              if (el.Enable) {
                if (el.Enable == "true") {
                  el.Enable = true;
                }
                else {
                  el.Enable = false;
                }

              }

              if (el.SSIDAdvertisementEnabled) {
                if (el.SSIDAdvertisementEnabled == "true") {
                  el.SSIDAdvertisementEnabled = true;
                }
                else {
                  el.SSIDAdvertisementEnabled = false;
                }
              }

              if ((el.band24 != null && el.band24 != undefined && el.band24 == true)
                && (el.band5 != null && el.band5 != undefined && el.band5 == true) && (el.band6 != null && el.band6 != undefined && el.band6 == true)) {
                el.band = ("2.4GHz" + ", " + "5GHz" + ", " + "6GHz");
              }
              else if ((el.band24 != null && el.band24 != undefined && el.band24 == true)
                && (el.band5 != null && el.band5 != undefined && el.band5 == true)) {
                el.band = ("2.4GHz" + ", " + "5GHz")
              }
              else if ((el.band24 != null && el.band24 != undefined && el.band24 == true)
                && (el.band6 != null && el.band6 != undefined && el.band6 == true)) {
                el.band = ("2.4GHz" + ", " + "6GHz")
              }
              else if ((el.band5 != null && el.band5 != undefined && el.band5 == true)
                && (el.band6 != null && el.band6 != undefined && el.band6 == true)) {
                el.band = ("5GHz" + ", " + "6GHz")
              }

              else if (el.band5 != null && el.band5 != undefined && el.band5 == true) {
                el.band = ("5GHz");
              }

              else if (el.band6 != null && el.band6 != undefined && el.band6 == true) {
                el.band = ("6GHz");
              }
              else if (el.band24 != null && el.band24 != undefined && el.band24 == true) {
                el.band = ("2.4GHz");
              }
            }
          });

          if (this.checkingvaluesArray != undefined) {
            if (this.checkingvaluesArray.maxUnifiedAvailable == null && this.checkingvaluesArray.maxBand24Available == null && this.checkingvaluesArray.maxBand5Available == null && this.checkingvaluesArray.maxBand6Available == null) {
              this.addssidbuttonshown = true;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand24Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand5Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }

            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand5Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand24Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else {
              this.addssidbuttonshown = true;
            }
          }

          this.ssidObjects = combined;
          this.permanentRows = combined;

          if (this.SSIDFilterValue != "All Types") {
            let obj = {
              description: this.SSIDFilterValue
            }
            this.doFilter(obj);

          }
          else {
            setTimeout(() => {
              this.loading = false;
            }, 200);

          }

        }
        // else if(this.ssidObjectobj != undefined && this.smbSsidList!=null ){

        // }
        else {
          let tempOn = res["primary-operator-ssid"]?.filter(x => x.Enable == "true");
          let totalcount = 0;
          if (tempOn) {
            totalcount = tempOn.length ? tempOn.length : 0;
          }
          let overflowApi = this.service.getSubscriberTabInfoData();
          // console.log("2222", overflowApi)
          if (overflowApi && overflowApi.networkStatus.ssid.activeSSIDCount) {
            overflowApi.networkStatus.ssid.activeSSIDCount = totalcount;
            // this.service.setSubscriberTabInfoData(overflowApi);
          } else {
            // overflowApi.networkStatus.ssid['activeSSIDCount'] = totalcount;
            // this.service.setSubscriberTabInfoData(overflowApi);
            //while switching from wifi to device tab it showing the device count as 0 so we are commented this one
            const obj = {
              networkStatus: {
                ssid: {
                  activeSSIDCount: totalcount
                }
              }
            }
            // this.service.setSubscriberTabInfoData(obj);
          }
          $('.ssidcount').text(totalcount);
          dummybinding.forEach((el: any, index) => {
            if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
              el.networktype = "Primary";
            }
            else {
              el.networktype = "Operator";
            }
          })
          var primary_Two_four_ghz = dummybinding?.filter(x => x.SSIDName == "SSID1");
          var primary_Five_ghz = dummybinding?.filter(x => x.SSIDName == "SSID9");
          var six_ghz = dummybinding?.filter(x => x.SSIDName == "SSID17" && !x?.SSID?.startsWith("RESERVED-6G-"));

          if (!this.checkThirdParty()) {
            if (primary_Two_four_ghz?.length > 0 && primary_Five_ghz?.length > 0 && six_ghz.length > 0) {
              this.isSSID6_4GZ = true;
              this.isSSID5_4GZ = true;
              this.isSSID2_4GZ = true;
              var obj1 = Object.assign({}, primary_Two_four_ghz[0])
              var obj2 = Object.assign({}, primary_Five_ghz[0])
              var obj3 = Object.assign({}, six_ghz[0])
              var compared = this.comparePrimarySSID(obj1, obj2, obj3);
              if (compared) {
                var index = dummybinding.findIndex(x => x.SSIDName == "SSID1");
                if (index != -1) {
                  var arr = [obj1?.freqBand, obj2?.freqBand, obj3?.freqBand]
                  dummybinding[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand + "," + obj3?.freqBand;
                  dummybinding[index].isUnifiedPrimary = true;
                }
                // this.ssidObjectobj2 = dummybinding?.filter(x => x.SSIDName !== "SSID9" && x.SSIDName != "SSID17");
                dummybinding = dummybinding?.filter(x => x.SSIDName !== "SSID9" && x.SSIDName != "SSID17");

              }
              // var reserved6ghzName = dummybinding?.filter(x => x.SSIDName == "SSID17");
              // if (reserved6ghzName?.length > 0) {
              //   if (reserved6ghzName[0]?.SSID.startsWith("RESERVED-6G-")) {
              //     dummybinding = dummybinding?.filter(x => x.SSIDName != "SSID17");
              //   }
              // }
            }
            else if (primary_Two_four_ghz?.length > 0 && primary_Five_ghz?.length > 0) {
              this.isSSID6_4GZ = false;;
              this.isSSID5_4GZ = true;
              this.isSSID2_4GZ = true;
              var obj1 = Object.assign({}, primary_Two_four_ghz[0])
              var obj2 = Object.assign({}, primary_Five_ghz[0])
              //var obj3 = Object.assign({}, six_ghz[0])
              var compared = this.comparePrimarySSID(obj1, obj2, {});
              if (compared) {
                var index = dummybinding.findIndex(x => x.SSIDName == "SSID1");
                if (index != -1) {
                  var arr = [obj1?.freqBand, obj2?.freqBand]
                  dummybinding[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand + ",";
                  dummybinding[index].isUnifiedPrimary = true;
                }
                // this.ssidObjectobj2 = dummybinding?.filter(x => x.SSIDName !== "SSID9");
                dummybinding = dummybinding?.filter(x => x.SSIDName !== "SSID9");
                var reserved6ghzName = dummybinding?.filter(x => x.SSIDName == "SSID17");
                if (reserved6ghzName?.length > 0) {
                  if (reserved6ghzName[0]?.SSID?.startsWith("RESERVED-6G-")) {
                    // dummybinding = dummybinding?.filter(x => x.SSIDName != "SSID17");
                    this.isSSID6_4GZ = true;
                    dummybinding[index].isRreserved6ghzName = true;
                    this.six_gSSIDFrequenyBands = false;
                  }
                }

              }
            }

          }
          else if (this.checkThirdParty() && this.isDeviceUnifiedSsid) {
            this.isSSID5_4GZ = true;
            this.isSSID2_4GZ = true;
            var obj1 = Object.assign({}, primary_Two_four_ghz[0])
            var obj2 = Object.assign({}, primary_Five_ghz[0])
            var index = dummybinding.findIndex(x => x.SSIDName == "SSID1");
            if (index != -1) {
              var arr = [obj1?.freqBand, obj2?.freqBand]
              dummybinding[index].freqBand = arr.join(", ")//obj1?.freqBand + "," + obj2?.freqBand 
              dummybinding[index].isUnifiedPrimary = true;
            }
            dummybinding = dummybinding?.filter(x => x.SSIDName !== "SSID9");

          }

          if (this.SSIDFilterValue == "All Types") {
            // Showing primary and secondary
            if (this.showOperator) {

              dummybinding.forEach((el: any, index) => {
                if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
                  el.networktype = "Primary";
                }
                else {
                  el.networktype = "Operator";
                }
              })
            }
            else {
              if (six_ghz.length == 0) {
                // this.ssidObjectobj2 = dummybinding?.filter(x => x.SSIDName != "SSID17")
                dummybinding = dummybinding?.filter(x => x.SSIDName != "SSID17")
              }
              let arry = [];
              dummybinding.forEach((el: any, index) => {
                if (el.SSIDName == 'SSID1' || el.SSIDName == 'SSID9' || el.SSIDName == 'SSID17') {
                  el.networktype = "Primary";
                  arry.push(el);
                }
              })
              dummybinding = arry;
            }
          }
          /* Start code for CCL-47672 */
          if (six_ghz.length == 0) {
            //  this.ssidObjectobj2 = dummybinding?.filter(x => x.SSIDName != "SSID17")
            dummybinding = dummybinding?.filter(x => x.SSIDName != "SSID17")
          }
          /* End code for CCL-47672 */

          dummybinding.forEach(el => {
            //  el.showPassword = false

            if (el != null) {

              if (el.id != null) {
                el.ssid = el?.SSID;
                // el.networktype = "Primary";
                el.band = el.freqBand;
                el.encryptionvalue = el.BeaconType;
              }

              if (el.type == 2) {
                el.isolated = "-";
              }
              if (el.type == 2) {
                el.smartQos = "-";
              }
              if (el.Enable) {
                if (el.Enable == "true") {
                  el.Enable = true;
                }
                else {
                  el.Enable = false;
                }

              }

              if (el.SSIDAdvertisementEnabled) {
                if (el.SSIDAdvertisementEnabled == "true") {
                  el.SSIDAdvertisementEnabled = true;
                }
                else {
                  el.SSIDAdvertisementEnabled = false;
                }
              }

              if (el.KeyPassphrase) {
                // ******d'.replace(/[*]/g, '')

                el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');
                // el.password = el.KeyPassphrase

              }
              if (el.PRConfig != null) {
                if (el.PRConfig.KeyPassphrase) {
                  //el.password = el.PRConfig.KeyPassphrase;
                  el.PRConfig.KeyPassphrase = el.PRConfig.KeyPassphrase
                }
                else {
                  if (el.KeyPassphrase)
                    el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');
                  // el.password = el.KeyPassphrase;

                }

              }

            }
          });

          if (this.checkingvaluesArray != undefined) {

            if (this.checkingvaluesArray.maxUnifiedAvailable == null && this.checkingvaluesArray.maxBand24Available == null && this.checkingvaluesArray.maxBand5Available == null && this.checkingvaluesArray.maxBand6Available == null) {
              this.addssidbuttonshown = true;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand24Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand5Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand5Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand24Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else if (this.checkingvaluesArray.maxBand6Available >= 1) {
              this.addssidbuttonshown = false;
            }
            else {
              this.addssidbuttonshown = true;
            }
          }
          this.ssidObjectobj2 = dummybinding;
          this.ssidObjects = dummybinding;
          this.permanentRows = dummybinding;
          if (this.SSIDFilterValue != "All Types") {
            let obj = {
              description: this.SSIDFilterValue
            }
            this.doFilter(obj);

          }
          else {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }

        }
        setTimeout(() => {
          this.loading = false;
        }, 3000);

      }, error => {
        this.loading = false
        this.showError = true;
        //this.errorMsg = "Internal server error";
        this.pageErrorHandle(error);
      })
    }
  }




  addSSID() {
    this.isEditMode = false;
    this.passwordhide = true;
    this.isFieldRequired = true;
    this.datapickershow = false;
    this.dateValidation = false;
    this.submitbtnadd = false;
    this.show = false;
    this.is6gAvailableForSec = false;
    this.frequencybandaddorginal = false;
    this.frequencybandaddduplicate = false;

    this.errorMessageshownadd = false;
    this.showSecondaryWarningMessage = false;
    this.addnetworkload();

    this.modalRef = this.dialogService.open(this.AddModal, { size: 'lg', centered: true, windowClass: 'custom-modall-xxl' });

    this.ssidobjectFormAdd = {
      duration: {
        startTime: "",
        endTime: ""
      }

    };

    this.ssidobjectFormAdd.network_description = "";
    this.ssidobjectFormAdd.ssid = "";
    this.ssidobjectFormAdd.band24 = false;
    this.ssidobjectFormAdd.band5 = false;
    this.ssidobjectFormAdd.band6 = false;
    this.ssidobjectFormAdd.encrypt_description = "";
    this.ssidobjectFormAdd.password = "";
    this.ssidobjectFormAdd.isolated = false;
    this.ssidobjectFormAdd.smartQos = false;
    this.ssidobjectFormAdd.isMapSecondaySSID = true;
    this.ssidobjectFormAdd.isIndefinite = false;
    this.Duration = false;
    this.ssidobjectFormAdd.endless = 0;
    this.ssidobjectFormAdd.Custom = 0;

    this.ssidobjectFormAdd.isIndefinite = true;


    let today = new Date();
    this.ssidobjectFormAdd.duration.startTime = today;
    this.ssidobjectFormAdd.duration.endTime = today;
    this.dupilcatedatepicker = true;

    // Based On SoftwareVersion

    if (this.softwareVersion >= 22.1) {
      // if (this.tempDeviceStatus == true && (this.iosdata == true || this.bwShapingOn)) {
      if (this.tempDeviceStatus == true) {

        this.dataService.getnetworktypevalues(this.userId).subscribe((res1: any) => {
          res1.types.forEach((element, i, object) => {
            element.description = this.capitalizeFirstLetter(element.description)

            if (this.wiFi6Enable == false && element.description == "Custom 6 GHz") {
              object.splice(i, 1);

            }

          })
          this.NetworkTypes = res1.types;
          // if (!this.bwShapingOn ) {
          //   this.priorizationshown = true;
          // }
          // else {
          //   this.priorizationshown = false;
          // }

          if (this.bwShapingOn && !this.iosdata) {
            this.priorizationshown = false;
          }
          else if (!this.bwShapingOn && this.iosdata) {
            this.priorizationshown = true;
          }
          else if (!this.bwShapingOn && !this.iosdata) {
            this.priorizationshown = false;
          }
        });
      }
      else {
        this.dataService.getnetworktypevalues(this.userId).subscribe((res1: any) => {
          // if (!this.bwShapingOn) {
          //   this.priorizationshown = false;
          // }
          this.priorizationshown = false;
          res1.types.forEach((element, i, object) => {
            element.description = this.capitalizeFirstLetter(element.description)
            if (this.wiFi6Enable == false && element.description == "Custom 6 GHz") {
              object.splice(i, 1);

            }
          })
          var networkvalues = res1.types;

          this.NetworkTypes = networkvalues?.filter((element1, index) => {
            if (element1.value != 2) {
              return element1;
            }
          });
        });

      }
    }
    else { // <22.1
      if (this.tempDeviceStatus == true && (this.iosdata == true || this.bwShapingOn)) {
        //if (this.tempDeviceStatus == true && this.bwShapingOn) {
        this.dataService.getnetworktypevalues(this.userId).subscribe((res1: any) => {
          res1.types.forEach((element, i, object) => {
            element.description = this.capitalizeFirstLetter(element.description)

            if (this.wiFi6Enable == false && element.description == "Custom 6 GHz") {
              object.splice(i, 1);

            }

          })
          this.NetworkTypes = res1.types;
          this.priorizationshown = true;
        });
      }
      else {
        this.dataService.getnetworktypevalues(this.userId).subscribe((res1: any) => {
          this.priorizationshown = false;
          res1.types.forEach((element, i, object) => {
            element.description = this.capitalizeFirstLetter(element.description)
            if (this.wiFi6Enable == false && element.description == "Custom 6 GHz") {
              object.splice(i, 1);

            }
          })
          var networkvalues = res1.types;

          this.NetworkTypes = networkvalues?.filter((element1, index) => {
            if (element1.value != 2) {
              return element1;
            }
          });
        });

      }
    }
    var is6gAvailableForSec = this.metaData?.properties?.filter(x => x.featureName == 'SSID17')[0]
    if (is6gAvailableForSec) {
      this.is6gAvailableForSec = true;
    }



    this.Encryptionload(this.userId);

    this.ssidobjectFormAdd.duration.startTime = 0;
    this.ssidobjectFormAdd.duration.endTime = 0;


    //  this.setDateadd(null);
  }
  tempDeviceStatus: any;
  iosdata: any;
  getDeviceStatus() {
    this.loading = true;
    this.dataService.getDeviceStatus(this.serialNumber, 'CIEP').subscribe((data: any) => {
      //his.loading = false;
      this.tempDeviceStatus = data.status.installed;
    }, (err) => {
      this.pageErrorHandle(err);
      this.loading = false;
    })
  }
  getQosListData(userid) {
    this.showSuccess = false;
    this.showError = false;
    this.loading = true;
    this.dataService.getqoslist_V2(userid).subscribe((data: any) => {
      // this.loading = false;
      this.iosdata = data.isQoSOn;
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMsg = err.error.errorDesc;
      this.showError = true;
    })
  }
  onKeyPhraseChange(event) {

    // if(!(event)){this.emptypassword=true}
    this.ssidObjectForm.KeyPassphrase = event.target.value;
    var validKeyPhrase = this.oldSsidData.KeyPassphrase;
    this.oldpasswordforprimary = this.oldSsidData.KeyPassphrase;
    if (validKeyPhrase && !this.ssidObjectForm.KeyPassphrase) {
      this.showErrorAstrik = true;
      // this.submitbtnEdit = true;
    }

  }




  onSubmitAddSSID(datatab: NgForm) {
    if (datatab.valid) {

      // var time = new Date(this.ssidobjectFormAdd.duration.startTime);
      // this.ssidobjectFormAdd.duration.startTime = time.getTime();
      // var time2 = new Date(this.ssidobjectFormAdd.duration.endTime);
      // this.ssidobjectFormAdd.duration.endTime = time2.getTime();

      delete this.ssidobjectFormAdd['encrypt_description'];
      delete this.ssidobjectFormAdd['network_description'];
      delete this.ssidobjectFormAdd['Custom'];
      delete this.ssidobjectFormAdd['endless'];
      if (this.ssidobjectFormAdd.password == null || this.ssidobjectFormAdd.password == "") {
        this.ssidobjectFormAdd.password = "";
      }
      //guest
      if (this.ssidobjectFormAdd.type != 1) {
        delete this.ssidobjectFormAdd['duration'];
        delete this.ssidobjectFormAdd['isIndefinite'];
      }
      if (this.ssidobjectFormAdd.type == 1) {
        var time = new Date(this.ssidobjectFormAdd.duration.startTime);
        this.ssidobjectFormAdd.duration.startTime = time.getTime();
        var time2 = new Date(this.ssidobjectFormAdd.duration.endTime);
        this.ssidobjectFormAdd.duration.endTime = time2.getTime();
        delete this.ssidobjectFormAdd['smartQos'];
        // delete this.ssidobjectFormAdd['band6'];
        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidobjectFormAdd['band6'];
        }

      }

      //wfh
      if (this.ssidobjectFormAdd.type == 2) {
        // delete this.ssidobjectFormAdd['band24'];
        // delete this.ssidobjectFormAdd['band5'];
        this.ssidobjectFormAdd['isolated'] = true;
        // this.ssidobjectFormAdd['smartQos'] = true;
        // delete.ssidobjectFormAdd['smartQos'] = true;

        if (this.softwareVersion >= 22.1) {
          // delete this.ssidobjectFormAdd['smartQos'];
          if (this.bwShapingOn && !this.iosdata) {
            this.ssidobjectFormAdd['smartQos'] = false;
          }
          else if (!this.bwShapingOn && this.iosdata) {
            this.ssidobjectFormAdd['smartQos'] = true;
          }
          else if (!this.bwShapingOn && !this.iosdata) {
            this.ssidobjectFormAdd['smartQos'] = false;
          }
        }


        // delete this.ssidobjectFormAdd['band6'];
        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidobjectFormAdd['band6'];
        }
      }
      if (this.ssidobjectFormAdd.type == 3) {
        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidobjectFormAdd['band6'];
        }

      }

      if (this.ssidobjectFormAdd.type == 4) {
        //delete this.ssidobjectFormAdd['band24'];
        delete this.ssidobjectFormAdd['band5'];
        delete this.ssidobjectFormAdd['band6'];

      }
      if (this.ssidobjectFormAdd.type == 5) {
        delete this.ssidobjectFormAdd['band24'];
        delete this.ssidobjectFormAdd['band6'];
        //delete this.ssidobjectFormAdd['band5'];

      }
      if (this.ssidobjectFormAdd.type == 6) {
        delete this.ssidobjectFormAdd['band24'];
        delete this.ssidobjectFormAdd['band5'];
        //delete this.ssidobjectFormAdd['band5'];

      }

      if (this.ssidobjectFormAdd.encryptionType == 0) {
        this.ssidobjectFormAdd.password = "";
      }
      if ((this.ssidobjectFormAdd.type == 3 || this.ssidobjectFormAdd.type == 4 || this.ssidobjectFormAdd.type == 5 || this.ssidobjectFormAdd.type == 6)) {
        if ((!this.prioritizationoginal || !this.priorizationshown)) {
          delete this.ssidobjectFormAdd['smartQos'];
        }
        //delete this.ssidobjectFormAdd['band5'];
      }
      this.ssidobjectFormAdd.ssid = this.ssidobjectFormAdd.ssid.trim();



      const body = JSON.stringify(this.ssidobjectFormAdd);

      this.dataService.addfunctionforssidpolling(this.orgId, this.serialNumber, body).subscribe(res => {

        this.closeModal();
        this.loading = true;
        setTimeout(() => {
          this.fetchSSIDListValues(this.orgId, this.serialNumber);

        }, 3000);
      }, error => {
        this.ssidobjectFormAdd = [];
        this.closeModal();
        this.loading = false
        this.showError = true;
        this.errorMsg = error.error.errorMessage;
      })
    }

  }


  oldSsidData: any;
  tempSSIDFormBeaconType: any;
  showErrorAstrik: boolean = false;
  ssidnetworktype;

  oldSSIDForm: any;
  is6gAvailableForSec: boolean = false;
  isEditMode: boolean = false;
  smbSecurityHide: boolean = false;
  isReadonlySmbPasspharse: boolean = false;
  editSSID(event) {
    this.isEditMode = true;
    this.is6gAvailableForSec = false;
    this.showErrorAstrik = false;
    this.submitbtnEdit = false;
    this.addnetworkload();
    this.dateValidation = false;
    this.validSsidName = false;
    this.show = false;
    this.editaccesspasspharsepopup = false;
    this.checksubvalidate = false;
    this.accessPassphrasenable = true;
    this.editpasspharsealertpopup = false
    this.viewpasspharsevisible = true
    this.ssidnetworktype = 'Secondary'
    this.emptypassword = false
    this.showSecondaryWarningMessage = false;
    var is6gAvailableForSec = this.metaData?.properties?.filter(x => x.featureName == 'SSID17')[0]
    if (is6gAvailableForSec) {
      this.is6gAvailableForSec = true;
    }
    /* L2bridge condition starts */
    if (this.show && event.networktype == "Operator" && event.isInL2Bridge) {
      this.isInL2BridgeWarningMsg = true;
    } else {
      this.isInL2BridgeWarningMsg = false;
    }
    /* L2bridge condition ends */
    //this.KeyPassphraseRequired = false;
    if (!event.hasOwnProperty('isSmbSSID') && (event.networktype == "Primary" || event.networktype == "Operator")) {
      this.editSSIDold(event);
      this.ssidnetworktype = 'Primary'
      this.tempSSIDFormBeaconType = event?.BeaconType//Object.assign({}, event);
      if (this.ssidObjectForm?.SSIDName == 'SSID17') {
        var selectedFieldMeta6G = this.metaData?.properties?.filter(x => x.featureName == 'SSID17')[0]
        this.tempEditedSecurity = wifiFetchSecurityOptionsFromSSIDMeta(selectedFieldMeta6G, this.metaData?.properties, this.security);
        this.editedSecurity = this.tempEditedSecurity;
      }
    }
    else if (event.hasOwnProperty('isSmbSSID') && this.hasSmbSSIDs) {
      this.oldPassword = event.password;
      this.isFieldRequired = true;
      var userid = this.userId;
      var eventid = event.eventId;
      this.showErrorAstrik = true;
      this.smbSecurityHide = false;
      this.isReadonlySmbPasspharse = false;

      if (event.type == 3) {
        // captive portal resize here
        this.modalRef = this.dialogService.open(this.smbEditModal, { size: 'lg', windowClass: 'custom-xl-modal' });
      }
      else {
        this.modalRef = this.dialogService.open(this.smbEditModal, { size: 'lg', windowClass: 'custom-edit-med-modal' });
      }

      var temp = Object.assign({}, event);
      // var tempData = event;
      temp.duration = {};
      temp.isIndefinite = true;
      if (temp.clientIsolated == true) {
        temp.clientIsolated = true
      }
      else {
        temp.clientIsolated = false
      }
      if (temp.enabledStatus == true) {
        temp.enabledStatus = true;
      }

      else {
        temp.enabledStatus = false;
      }
      if (temp.hidden == true) {
        temp.hidden = false;
      }
      else {
        temp.hidden = true;
      }


      if (temp.band24 == true) {
        this.band24checked = true;
      }
      else {
        this.band24checked = false;
      }
      if (temp.band5 == true) {
        this.band5checked = true;
      }
      else {
        this.band5checked = false;
      }
      if (temp.band6 == true) {
        this.band6checked = true;
      }
      else {
        this.band6checked = false;
      }
      if (event.encryptionvalue == "SecurityOff") {
        this.passwordhide = false;
        this.isFieldRequired = false;
      }
      else {
        this.isFieldRequired = true;
        this.passwordhide = true;
      }
      if (!(event?.availability)) {
        this.smbSecurityHide = true;
      }

      if (temp.type == 2 && temp?.passwordMode != null && temp?.passwordMode == 2) {
        this.isReadonlySmbPasspharse = true;
        this.showErrorAstrik = false;
      }

      this.getSMBWifiTypes();
      this.NetworkTypes = this.SMBWifiTypes;
      this.NetworkTypes?.forEach(element => {
        if (element.value == temp.type) {
          // if(temp)
          this.ssidObjectForm.network_description = element.description;
          this.TypeChangeSmbEdit(this.ssidObjectForm.network_description);
        }
      });
      this.EncryptionTypes = event.availability;
      this.ssidObjectForm.securityType = event.securityType;
      if (event.type == 2) {
        this.initStaffSchedules(temp.schedules);
      }







      this.ssidObjectForm = Object.assign({}, temp);
      this.oldSsidData = Object.assign({}, temp);
      this.oldSSIDForm = Object.assign({}, temp);
    }

    else {
      this.oldPassword = event.password;
      this.isFieldRequired = true;
      var userid = this.userId;
      var eventid = event.eventId;

      this.modalRef = this.dialogService.open(this.editModal, { size: 'lg', windowClass: 'custom-modall-xxl' });
      var temp = Object.assign({}, event);


      // var tempData = event;

      if (temp.isolated == true) {
        temp.isolated = true
      }
      else {
        temp.isolated = false
      }
      if (temp.smartQos == true) {
        temp.smartQos = true;
      }

      else {
        temp.smartQos = false;
      }

      if (temp.band24 == true) {
        this.band24checked = true;
      }
      else {
        this.band24checked = false;
      }
      if (temp.band5 == true) {
        this.band5checked = true;
      }
      else {
        this.band5checked = false;
      }
      if (temp.band6 == true) {
        this.band6checked = true;
      }
      else {
        this.band6checked = false;
      }


      if (event.encryptionvalue == "SecurityOff") {
        this.passwordhide = false;
        this.isFieldRequired = false;
      }
      else {
        this.isFieldRequired = true;
        this.passwordhide = true;
      }
      temp.isMapSecondaySSID = true;


      if (this.softwareVersion >= 22.1) {

        if (this.tempDeviceStatus == true) {

          if (this.bwShapingOn && !this.iosdata) {
            this.priorizationshown = false;
          }
          else if (!this.bwShapingOn && this.iosdata) {
            this.priorizationshown = true;
          }
          else if (!this.bwShapingOn && !this.iosdata) {
            this.priorizationshown = false;
          }

        }
        else {
          this.priorizationshown = false;
        }
      }
      else {
        if (this.tempDeviceStatus == true && (this.bwShapingOn == true || this.iosdata == true)) {
          // if (this.tempDeviceStatus == true) {
          this.priorizationshown = true;
        }
        else {
          this.priorizationshown = false;
        }
      }


      this.dataService.getnetworktypevalues(this.userId).subscribe((res1: any) => {
        res1.types.forEach(element => {
          element.description = this.capitalizeFirstLetter(element.description)
        })
        this.NetworkTypes = res1.types;
        // this.priorizationshown = true;
      });
      this.NetworkTypes.forEach(element => {
        if (element.value == temp.type) {
          this.ssidObjectForm.network_description = element.description;
          this.TypechangeEditload(this.ssidObjectForm.network_description);
        }
      });

      //for getting encryption types
      this.dataService.getEncryptionvalues(this.userId).subscribe((res2: any) => {
        res2.types.forEach(element => {
          if (element.description == "none") {
            element.description = "SecurityOff"
          }
        });
        this.EncryptionTypes = res2.types;


        if (temp.networktype == "Custom 6 GHz") {

          this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 6)
        }

      });

      this.EncryptionTypes.forEach(element => {
        if (element.value == temp.encryptionType) {
          this.ssidObjectForm.encrypt_description = element.description;
        }
      });


      if (temp?.isIndefinite && temp.type == 1) {
        this.changeendlessedit(temp.isIndefinite);
      }
      else {
        const datePipe = new DatePipe('en-US');
        if (temp?.duration) {
          if (temp?.duration?.startTime != 0) {
            const chekedstarttime = datePipe.transform(temp.duration.startTime, 'EEEE, MMMM d,y,h:mm a');
            temp.duration.startTime = new Date(chekedstarttime);
          }
          else {
            temp.duration.startTime = 0;
          }

          if (temp.duration.endTime != 0) {
            const checkingendtime = datePipe.transform(temp.duration.endTime, 'EEEE, MMMM d,y,h:mm a');
            temp.duration.endTime = new Date(checkingendtime);
          }
          else {
            temp.duration.endTime = 0;
          }
          this.changecustomedit(temp.isIndefinite);
        }
      }

      if (this.bwShapingOn && temp.type == 2) {
        temp.smartQos = false;
      }
      this.ssidObjectForm = Object.assign({}, temp);
      this.oldSsidData = Object.assign({}, temp);
      this.oldSSIDForm = Object.assign({}, temp);



    }


  }
  updateSSID(myformedit: NgForm) {
    if (myformedit.valid) {
      if (this.ssidObjectForm.type == 1) {
        var time = new Date(this.ssidObjectForm?.duration?.startTime);
        this.ssidObjectForm.duration.startTime = time?.getTime();

        var time2 = new Date(this.ssidObjectForm?.duration?.endTime);
        this.ssidObjectForm.duration.endTime = time2?.getTime();
      }


      delete this.ssidObjectForm['encrypt_description'];
      delete this.ssidObjectForm['network_description'];
      delete this.ssidObjectForm['Custom'];
      delete this.ssidObjectForm['endless'];
      delete this.ssidObjectForm['encryptionvalue'];
      if (this.ssidObjectForm.password == null || this.ssidObjectForm.password == "") {
        this.ssidObjectForm.password = "";
      }
      //guest
      if (this.ssidObjectForm.type != 1) {
        delete this.ssidObjectForm['duration'];
        delete this.ssidObjectForm['isIndefinite'];
      }
      if (this.ssidObjectForm.type == 1) {
        delete this.ssidObjectForm['smartQos'];
        // delete this.ssidObjectForm['band6'];

        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidObjectForm['band6'];
        }
      }
      //wfh
      else if (this.ssidObjectForm.type == 2) {
        delete this.ssidObjectForm['isolated'];
        delete this.ssidObjectForm['smartQos'];
        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidObjectForm['band6'];
        }
      }
      else if (this.ssidObjectForm.type == 3) {
        if (!(this.is6gAvailableForSec && this.wiFi6Enable)) {
          delete this.ssidObjectForm['band6'];
        }

      }

      else if (this.ssidObjectForm.type == 4) {
        //delete this.ssidobjectFormAdd['band24'];
        delete this.ssidObjectForm['band5'];
        delete this.ssidObjectForm['band6'];

      }

      else if (this.ssidObjectForm.type == 5) {
        delete this.ssidObjectForm['band24'];
        delete this.ssidObjectForm['band6'];
        //delete this.ssidobjectFormAdd['band5'];

      }
      else if (this.ssidObjectForm.type == 6) {
        delete this.ssidObjectForm['band5'];
        delete this.ssidObjectForm['band24'];
        //delete this.ssidobjectFormAdd['band5'];

      }
      if (this.ssidObjectForm.encryptionType == 0) {
        this.ssidObjectForm.password = "";
      }
      if ((this.ssidObjectForm.type == 3 || this.ssidObjectForm.type == 4 || this.ssidObjectForm.type == 5 || this.ssidObjectForm.type == 6)) {
        if ((!this.prioritizationoginal || !this.priorizationshown)) {
          delete this.ssidObjectForm['smartQos'];
        }
        //delete this.ssidobjectFormAdd['band5'];
      }

      this.ssidObjectForm.ssid = this.ssidObjectForm.ssid.trim();

      const body = JSON.stringify(this.ssidObjectForm);
      this.dataService.updatefunctionssidpolling(this.orgId, this.serialNumber, body).subscribe(res => {
        this.closeModal();
        setTimeout(() => {
          this.loading = true;
          this.fetchSSIDListValues(this.orgId, this.serialNumber);

        }, 1000);
      }, error => {
        this.ssidObjectForm = [];
        this.closeModal();
        this.loading = false
        this.showError = true;
        this.errorMsg = error.error.errorMessage;
      })
    }
  }


  delete(event: any) {

    var event_id = event.eventId;
    this.http.delete(`${environment.SUPPORT_URL}/device/${this.orgId}/${this.serialNumber}/secondarynetwork/delete?eventId=${event_id}`).subscribe((json: any) => {
      this.closeModal();
      setTimeout(() => {
        this.fetchSSIDListValues(this.orgId, this.serialNumber);
      }, 1000);

    },
      error => {
        this.closeModal();
        this.loading = false
        this.showError = true;
        this.errorMsg = error.error.errorMessage;
      });
  }



  //edit old ui --->if its primary -->started

  toglePasswordDisplay() {
    if (this.showPassword == "password") {
      this.showPassword = "text"
    } else {
      this.showPassword = "password"
    }
  }
  KeyPassphraseRequired: boolean = false;
  showPrimaryWarningMessage: boolean = false;
  showWpsNote: boolean = false;
  onSecurityChange(event) {
    this.showPrimaryWarningMessage = false;
    this.showWpsNote = false;
    this.showErrorAstrik = false;
    if ((this.selectedMetaObj.WPAEncryptionModes || this.selectedMetaObj.BasicEncryptionModes || this.selectedMetaObj.IEEE11iEncryptionModes)
      && this.ssidObjectForm.BeaconType != 'Basic' && this.ssidObjectForm.BeaconType != 'None') {
      this.constructEditSSIDData(this.ssidObjectForm);
    }
    if (this.ssidObjectForm.isRreserved6ghzName) {
      if (event.id == "11iandWPA3" || event.id == "WPA3") {
        this.six_gSSIDFrequenyBands = true;
      }

    }

    if (this.six_gSSIDFrequenyBands && this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands) {
      if ((this.is6gAvailableForSec && this.wiFi6Enable) && !(event.id == "11iandWPA3" || event.id == "WPA3")) {
        this.showPrimaryWarningMessage = true;
      }
    }

    if (event.id == "WPA3") {
      this.showWpsNote = true;
    }
    var temp = this.oldSSIDForm
    var oldName = temp?.SSID;
    var newName = this.ssidObjectForm?.SSID;

    var oldSecurityType = temp?.BeaconType;
    var newSecurityType = this.ssidObjectForm?.BeaconType;

    var oldpassphrase = temp?.KeyPassphrase;
    var newPassphrase = this.ssidObjectForm?.KeyPassphrase;
    if (oldpassphrase && newPassphrase?.length == 0) {
      this.showErrorAstrik = true;
    }
    else if ((oldName && (oldName != newName))) {
      this.showErrorAstrik = true;
    }
    else if ((oldSecurityType && (oldSecurityType != newSecurityType))) {
      this.showErrorAstrik = true;
    }
    // if ((oldName && (oldName != newName))) {
    //   this.showErrorAstrik = true;
    // }
    // else if ((oldSecurityType && (oldSecurityType != newSecurityType))) {
    //   this.showErrorAstrik = true;
    // }
    // let values = Object.values(this.ssidObjectForm);
    // let oldVlaues = Object.values(this.oldSsidData);
    // if (values.length > 0) {


    //   if (oldVlaues["KeyPassphrase"] == values["KeyPassphrase"]) {

    //     }
    // }
    // this.KeyPassphraseRequired = false;
    // if (this.oldSsidData.BeaconType !== this.ssidObjectForm.BeaconType) {
    //   this.KeyPassphraseRequired = true;
    // }



  }
  onEncryptionChange(event, BeaconType) {
    this.metaData?.properties.forEach(res => {
      if (res.featureName == "SecurityOptions") {
        if (res.configuration) {
          if (res.configuration['WPA3-SAE'] && res.configuration['WPA3-SAE']["BeaconType"] == event.BeaconType) {
            this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
          }
          if (res.configuration['SecurityOff'] && res.configuration['SecurityOff']["BeaconType"] == BeaconType) {
            if (res.configuration['SecurityOff'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            } else {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
          if (res.configuration['WPA2-PSK'] && res.configuration['WPA2-PSK']["BeaconType"] == BeaconType) {
            if (res.configuration['WPA2-PSK'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            } else {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
          if (res.configuration['WPA-PSK'] && res.configuration['WPA-PSK']["BeaconType"] == BeaconType) {
            if (res.configuration['WPA-PSK'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            } else {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
          if (res.configuration['WPA/WPA2-PSK'] && res.configuration['WPA/WPA2-PSK']["BeaconType"] == BeaconType) {
            if (res.configuration['WPA/WPA2-PSK'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            }
            if (res.configuration['WPA/WPA2-PSK'].WPAEncryptionModes) {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
          if (res.configuration['WPA2/WPA3-PSK'] && res.configuration['WPA2/WPA3-PSK']["BeaconType"] == BeaconType) {
            if (res.configuration['WPA2/WPA3-PSK'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            } else {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
          if (res.configuration['WPA3-PSK'] && res.configuration['WPA3-PSK']["BeaconType"] == BeaconType) {
            if (res.configuration['WPA3-PSK'].IEEE11iEncryptionModes) {
              this.ssidObjectForm.IEEE11iEncryptionModes = event.id;
            } else {
              this.ssidObjectForm.WPAEncryptionModes = event.id;
            }
          }
        }
      }
    })
  }
  // toggleTablepassword(event) {
  //   const check = this.temparray.indexOf(event);
  //   check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(event);
  //   // this.togglePasswordTable[event] = !this.togglePasswordTable[event];
  // }
  // toggleTablepassword(event) {
  //   // const check = this.temparray.indexOf(event);
  //   // check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(event);
  //   //this.togglePasswordTable[event] = !this.togglePasswordTable[event];
  //   this.temproryssid = event

  //     this.passphraseVerifyWarnModalOpen(event);


  // }
  // toggleTablepasswordTremp(event){
  //   this.togglePasswordTable[event]=false;
  // }


  showPrimaryPassword(event, ssidobject) {
    let type = "Primary"
    this.temproryssid = event
    this.primaryeventcheck = true;
    if (!(ssidobject?.PRConfig?.KeyPassphrase) && (!(ssidobject?.KeyPassphrase))) {
      this.togglePasswordTable[this.temproryssid] = !this.togglePasswordTable[this.temproryssid];
    }
    else {
      this.passphraseVerifyWarnModalOpen(event, ssidobject, type);
    }

  }
  hidePrimaryPassword(event) {
    this.primaryeventcheck = false;
    this.togglePasswordTable[event] = false;
  }
  showSecondaryPassword(event, ssidobject) {
    let type = "Secondary"
    this.temproryssid = event;
    this.primaryeventcheck = false;
    this.secondaryeventcheck = true;
    if ((!(ssidobject?.password))) {
      const check = this.temparray.indexOf(this.temproryssid);
      check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(this.temproryssid);
    }
    else {
      this.passphraseVerifyWarnModalOpen(event, ssidobject, type);
    }

    //this.passphraseVerifyWarnModalOpen(event);
  }
  hideSecondaryPassword(event) {
    this.secondaryeventcheck = false;
    const check = this.temparray.indexOf(event);
    if (check > -1) {
      this.temparray.splice(check, 1)
    }
  }

  // showSecondaryPassword(event) {
  //  this.temproryssid = event

  //   // const check = this.temparray.indexOf(event);
  //   // check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(event);
  //   this.passphraseVerifyWarnModalOpen(event);

  // }

  // showSecondaryPasswordwithoutpopup(event) {
  //   const check = this.temparray.indexOf(event);
  //  // check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(event);
  //   if(check>-1){
  //     this.temparray.splice(check, 1)
  //   }
  // }
  updateSsidManager() {
    this.closeModal();
    if (this.ssidObjectForm.PRConfig && this.ssidObjectForm.PRConfig.KeyPassphrase) {
      this.ssidObjectForm.KeyPassphrase = this.ssidObjectForm.PRConfig.KeyPassphrase
    }

    this.oldSsidData.KeyPassphrase = this.oldPassword


    deleteFromObject(this.ssidObjectForm, 'PRConfig');
    // deleteFromObject(this.ssidObjectForm, 'isRreserved6ghzName');

    deleteFromObject(this.oldSsidData, 'PRConfig');
    // deleteFromObject(this.oldSsidData, 'isRreserved6ghzName');

    if (!this.wiFi6Enable) {
      this.six_gSSIDFrequenyBands = false;
    }

    let keys = Object.keys(this.ssidObjectForm);
    let values = Object.values(this.ssidObjectForm);
    let oldVlaues = Object.values(this.oldSsidData);
    if (this.ssidObjectForm?.isRreserved6ghzName) {
      this.ssidObjectForm.isUnifiedPrimary = false;
    }

    if (!this.checkThirdParty()) {  // if not third party(GS GPR)
      if (this.ssidObjectForm.isUnifiedPrimary) {
        this.ssidObjectForm.id = "UNIFIED_PRIMARY_SSID";
        var oldName = this.oldSsidData?.SSID;
        var newName = this.ssidObjectForm?.SSID;
        if (oldName != newName) {
          if (keys.length > 0) {
            for (let i = 0; i < values.length; i++) {
              if (keys[i] != "id" && (keys[i] != "SSID") && keys[i] != "BeaconType" && keys[i] != "KeyPassphrase") {
                if (oldVlaues[i] == values[i]) {
                  deleteFromObject(this.ssidObjectForm, keys[i]);
                }
              }
            }
          }
        }
        else {
          if (keys.length > 0) {
            for (let i = 0; i < values.length; i++) {
              if (keys[i] != "id" && (keys[i] != "SSID")) {
                if (oldVlaues[i] == values[i]) {
                  deleteFromObject(this.ssidObjectForm, keys[i]);
                }
              }
            }
          }
        }


      }

      else if (this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands && this.six_gSSIDFrequenyBands) {
        var list = this.primaryOperatorSsids;
        var primary_Two_four_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID1");
        var primary_Five_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID9");
        var six_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID17");

        var ids = [primary_Two_four_ghz[0]?.id, primary_Five_ghz[0]?.id, six_ghz[0]?.id]
        ids = ids?.filter(x => x != undefined)
        var unifiedIds = ids?.toString();
        this.ssidObjectForm.id = unifiedIds;
        //this.ssidObjectForm.id = "1,9,17";
        // this.ssidObjectForm.name="";
      }
      else if (this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands) {
        var list = this.primaryOperatorSsids;
        var primary_Two_four_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID1");
        var primary_Five_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID9");
        var ids = [primary_Two_four_ghz[0]?.id, primary_Five_ghz[0]?.id];
        ids = ids?.filter(x => x != undefined)
        var unifiedIds = ids?.toString();
        this.ssidObjectForm.id = unifiedIds;
        //this.ssidObjectForm.id = "1,9"
      }
      else if (!(this.ssidObjectForm.isUnifiedPrimary) && (!(this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands && this.six_gSSIDFrequenyBands))) {
        if (keys.length > 0) {
          for (let i = 0; i < values.length; i++) {
            if (keys[i] != "id") {
              if (oldVlaues[i] == values[i]) {
                deleteFromObject(this.ssidObjectForm, keys[i]);
              }
            }
          }
        }

      }
    }
    else if (this.checkThirdParty() && this.isDeviceUnifiedSsid) {   // if third party(Zyxel) and unified models
      var primary_Two_four_ghz = this.primaryOperatorSsids?.filter(x => x.SSIDName == "SSID1");
      this.ssidObjectForm.id = primary_Two_four_ghz[0]?.id;
      var oldName = this.oldSsidData?.SSID;
      var newName = this.ssidObjectForm?.SSID;
      if (oldName != newName) {
        if (keys.length > 0) {
          for (let i = 0; i < values.length; i++) {
            if (keys[i] != "id" && (keys[i] != "SSID") && keys[i] != "BeaconType" && keys[i] != "KeyPassphrase") {
              if (oldVlaues[i] == values[i]) {
                deleteFromObject(this.ssidObjectForm, keys[i]);
              }
            }
          }
        }
      }
      else {
        if (keys.length > 0) {
          for (let i = 0; i < values.length; i++) {
            if (keys[i] != "id" && (keys[i] != "SSID")) {
              if (oldVlaues[i] == values[i]) {
                deleteFromObject(this.ssidObjectForm, keys[i]);
              }
            }
          }
        }
      }
    }




    deleteFromObject(this.ssidObjectForm, 'isUnifiedPrimary');

    //(!ssidObjectForm.isUnifiedPrimary && primarySSIDErrorInfo)
    if (!this.ssidObjectForm.IEEE11iEncryptionModes) {
      this.ssidObjectForm.IEEE11iEncryptionModes = "AESEncryption"
    }

    this.radioService.updateSSIDConfigList(this.ssidObjectForm, this.orgId, this.serialNumber).subscribe(res => {
      this.fetchSSIDListValues(this.orgId, this.serialNumber);
    }, error => {
      this.loading = false
      this.showError = true;
      // this.errorMsg = error.error.errorMessage;;
      this.pageErrorHandle(error)
    })
  }

  fetchAllSSIDRadioName(selectedSSID: SupportRadioObjectModel) {
    let returnAllNames = [];
    let selectedRadioFreq = "";
    let seperatedList = [];
    let allSSID = JSON.parse(JSON.stringify(this.ssidObjectobj2))

    selectedRadioFreq = selectedSSID.freqBand;
    //checking the frequency list
    if (selectedRadioFreq == '2.4GHz') {
      seperatedList = seperateRadioList(allSSID)['2.4G']
    } else if (selectedRadioFreq == '5GHz') {
      seperatedList = seperateRadioList(allSSID)['5G']
    }
    else {
      seperatedList = seperateRadioList(allSSID)['6G']
    }
    returnAllNames = seperatedList?.filter(x => selectedSSID.id != x.id).map(x => x?.SSID)
    //removing null values
    returnAllNames = cleanArray(returnAllNames)
    return returnAllNames;
  }

  fetchMetaData(serialNumber) {
    if (!serialNumber) return;
    this.dataService.fetchMetaData(this.orgId, serialNumber).subscribe((res: any) => {

      this.security = constructSecurityValues(res);

      this.dataService.getEncryptionvalues(this.userId).subscribe((res2: any) => {

        let encryTypeObj = [];
        res2.types.forEach(obj => {
          if (obj.description == "none") {
            obj.description = "SecurityOff"
          }
          encryTypeObj.push({ id: obj.value, name: obj.description });
        })

        this.security = this.security.concat(encryTypeObj);

      });


      this.metaData = res;
      if (this.security.length == 0) {

      } else {
        //this.fetchSSIDManagerList();
      }
      //  this.loading = false;
    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }

  fetchSSIDManagerList(isRefreshed = false) {

    if (this.serialNumber) {
      //this.serialNumber="CXNK008A79B1";
      this.loading = true
      this.radioService.getSSIDManagerList(this.orgId, this.serialNumber, isRefreshed).
        subscribe((res: SupportRadioObjectModel[]) => {
          let temp = this.initializeSsidList(res);
          let tempOn = temp?.filter(x => x.Enable == true).sort((a, b) => (+a.id - +b.id));
          let overflowApi = this.service.getSubscriberTabInfoData();
          // console.log("2222", overflowApi)
          if (overflowApi && tempOn && overflowApi?.networkStatus?.ssid?.activeSSIDCount) {
            overflowApi.networkStatus.ssid.activeSSIDCount = tempOn.length ? tempOn.length : 0;
            // this.service.setSubscriberTabInfoData(overflowApi);
          } else {
            overflowApi.networkStatus.ssid['activeSSIDCount'] = tempOn.length ? tempOn.length : 0;
            // this.service.setSubscriberTabInfoData(overflowApi);
            //while switching from wifi to device tab it showing the device count as 0 so we are commented this one
            // const obj = {
            //   networkStatus: {
            //     ssid: {
            //       activeSSIDCount: tempOn ? tempOn.length : 0
            //     }
            //   }
            // }
            // this.service.setSubscriberTabInfoData(obj);
          }
          $('.ssidcount').text(tempOn ? tempOn.length.toString() : 0);
          let tempOff = temp?.filter(x => x.Enable == false).sort((a, b) => (+a.id - +b.id));
          this.ssidObject = [];
          if (this.deviceWoRG.length > 1) {
            this.ssidObject = this.ssidObject && this.ssidObject.length
              ? [...this.ssidObject, ...tempOn.concat(tempOff)]
              : tempOn.concat(tempOff);
            const currSnIndx = this.deviceWoRG.findIndex(wap => wap.serialNumber == this.serialNumber);
            if ((currSnIndx + 1) <= this.deviceWoRG.length) {
              this.serialNumber = this.deviceWoRG[(currSnIndx + 1)].serialNumber;
              this.fetchSSIDManagerList();
            }
          } else {
            this.ssidObject = tempOn.concat(tempOff);
          }
          this.mapFeature(this.ssidObject);

          this.loading = false;
        }, error => {

          this.loading = false
          this.showError = true;
          this.errorMsg = error.error.error;
        })
    }
  }
  mapFeature(obj: SupportRadioObjectModel[]) {
    let count24G = 1;
    let count5G = 9;
    let count6G = 18;
    obj.forEach(x => {
      if (x.freqBand == "2.4GHz") {
        if (count24G > 0 && count24G < 9) {
          x.featureNo = count24G;
          count24G++
        }
      }
      else if ((x.freqBand == "5GHz")) {
        if (count5G > 8 && count5G < 17) {
          x.featureNo = count5G;
          count5G++
        }
      }
      else {
        if (count6G > 17 && count6G < 24) {
          x.featureNo = count6G;
          count6G++
        }
      }
    })
  }

  initializeSsidList(result: SupportRadioObjectModel[]): SupportRadioObjectModel[] {
    let returnResult: SupportRadioObjectModel[] = [];
    result.forEach((res, index) => {
      this.togglePasswordTable.push(false);
      returnResult.push(new SupportRadioObjectModel(res));
    })
    return returnResult;
  }
  SSIDNetworkType: string = "";
  two_fourSSIDFrequenyBands: boolean = false;
  five_gSSIDFrequenyBands: boolean = false;
  six_gSSIDFrequenyBands: boolean = false;
  primarySSIDErrorInfo: boolean = false;

  allSSIDFrequenyBandsSelected: boolean = false;

  disabled_two_fourSSIDFrequenyBands: boolean = false;
  disabled_five_gSSIDFrequenyBands: boolean = false;
  disabled_six_gSSIDFrequenyBands: boolean = false;

  allSSIDFrequenyBandsDisabled: boolean = false;

  tempEditedSecurity: any[];
  editSSIDold(event: SupportRadioObjectModel) {

    this.primarySSIDErrorInfo = false;
    this.showPrimaryWarningMessage = false;
    this.two_fourSSIDFrequenyBands = false;
    this.five_gSSIDFrequenyBands = false;
    this.six_gSSIDFrequenyBands = false;
    this.showPassPhraseOldModel = false

    this.disabled_two_fourSSIDFrequenyBands = false;
    this.disabled_five_gSSIDFrequenyBands = false;
    this.disabled_six_gSSIDFrequenyBands = false;

    if (event.PRConfig && event.PRConfig.KeyPassphrase) {
      event.KeyPassphrase = event.PRConfig.KeyPassphrase
      this.oldPassword = event.PRConfig.KeyPassphrase;
    } else {
      this.oldPassword = event.KeyPassphrase;
    }
    this.ssidObjectForm = new SupportRadioObjectModel(event);
    this.ssidObjectForm.isUnifiedPrimary = event?.isUnifiedPrimary;
    this.ssidObjectForm.isRreserved6ghzName = event?.isRreserved6ghzName;
    // console.log("ssidObjectForm : ", this.ssidObjectForm);
    // console.log("isInL2Bridge : ", this.ssidObjectForm.isInL2Bridge);

    if (this.ssidObjectForm?.SSIDName == 'SSID1' || this.ssidObjectForm?.SSIDName == 'SSID9' || this.ssidObjectForm?.SSIDName == 'SSID17') {
      this.SSIDNetworkType = "Primary";
      if (!this.ssidObjectForm?.isUnifiedPrimary) {

        if (this.ssidObjectForm?.SSIDName == 'SSID1') {
          this.disabled_two_fourSSIDFrequenyBands = true;
          this.two_fourSSIDFrequenyBands = true;
        }
        if (this.ssidObjectForm?.SSIDName == 'SSID9') {
          this.disabled_five_gSSIDFrequenyBands = true;
          this.five_gSSIDFrequenyBands = true;
        }
        if (this.ssidObjectForm?.SSIDName == 'SSID17') {
          this.disabled_six_gSSIDFrequenyBands = true;
          this.six_gSSIDFrequenyBands = true;
        }

      }
      else if (this.ssidObjectForm?.isUnifiedPrimary) {
        this.two_fourSSIDFrequenyBands = true;
        this.five_gSSIDFrequenyBands = true;
        this.six_gSSIDFrequenyBands = true;
        // if (this.ssidObjectForm.isRreserved6ghzName) {
        //   this.six_gSSIDFrequenyBands = false;
        // }
        if (this.ssidObjectForm.isRreserved6ghzName) {
          if (event.BeaconType == "11iandWPA3" || event.BeaconType == "WPA3") {
            this.six_gSSIDFrequenyBands = true;
          }
          else {
            this.six_gSSIDFrequenyBands = false;
          }
        }

      }


    }
    else {
      this.SSIDNetworkType = "Operator";
    }
    this.showWpsNote = false;
    if (this.ssidObjectForm?.BeaconType == "WPA3") {
      this.showWpsNote = true;
    }
    this.allSsidNames = this.fetchAllSSIDRadioName(event);
    let ssidMetaData: MetaField[] = this.metaData?.properties?.filter(x => x.featureName.match(ssidMetaPattern))

    this.selectedMetaObj = CreateMetaFieldObject(this.ssidObjectForm, ssidMetaData, this.ssidObject)

    this.editedSecurity = FetchSecurityOptionsFromSSIDMeta(this.ssidObjectForm, ssidMetaData, this.security);
    this.constructEditSSIDData(this.ssidObjectForm);
    this.dialogErrorMsg = this.language['SSID_Note'];
    // this.dialogErrorMsg = "Updating the WiFi Passphrase may take approximately 10 seconds, during which the new passphrase will not show up here!";
    // this.closeModal();

    this.oldSsidData = Object.assign({}, this.ssidObjectForm);
    this.oldSSIDForm = Object.assign({}, this.ssidObjectForm);
    // this.modalRef = this.dialogService.open(this.editModalold);
    this.modalRef = this.dialogService.open(this.editModalold, { windowClass: 'edit-sside-new' });
  }
  /* Change event for checking service is disabled for l2bridge starts */
  ServiceChangeEventforL2bridge(evt) {
    this.isChecked = evt.target.checked;
    //console.log(this.ssidObjectForm.isInL2Bridge);

    if (this.isChecked == false) {
      //if(this.ssidObjectForm.PRConfig && this.ssidObjectForm.PRConfig.Enable == this.ssidObjectForm.Enable && this.SSIDNetworkType == "Operator" && this.ssidObjectForm.isInL2Bridge) {
      if (this.SSIDNetworkType == "Operator" && this.ssidObjectForm.isInL2Bridge) {
        this.isInL2BridgeWarningMsg = true;
      } else {
        this.isInL2BridgeWarningMsg = false;
      }
    }
    else {
      this.isInL2BridgeWarningMsg = false;
    }
  }
  /* Change event for checking service is disabled for l2bridge ends */
  constructEditSSIDData(event: SupportRadioObjectModel) {
    this.encryptionMetaModes = constructEncyptionModeValues(this.metaData, event.BeaconType);
    if (event.BeaconType) {
      this.metaData?.properties.forEach(res => {
        if (res.featureName == "SecurityOptions") {
          if (res.configuration) {
            if (res.configuration['SecurityOff'] && res.configuration['SecurityOff']["BeaconType"] == event.BeaconType) {
              if (res.configuration['SecurityOff'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA2-PSK'] && res.configuration['WPA2-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA2-PSK'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA-PSK'] && res.configuration['WPA-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA-PSK'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA/WPA2-PSK'] && res.configuration['WPA/WPA2-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA/WPA2-PSK'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA2/WPA3-PSK'] && res.configuration['WPA2/WPA3-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA2/WPA3-PSK'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA3-PSK'] && res.configuration['WPA3-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA3-PSK'].IEEE11iEncryptionModes) {
                this.selectedEncryption = this.ssidObjectForm.IEEE11iEncryptionModes;
              } else {
                this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
              }
            }
          }
        }
      })

    }
    if (checkMultileFrequency(this.encryptionMetaModes)) {
      if (event.freqBand.match("2.4GHz")) {
        this.encryption = fetchRadioEncryption("2.4G", this.encryptionMetaModes).name;
      } else if (event.freqBand.match("5GHz")) {
        this.encryption = fetchRadioEncryption("5G", this.encryptionMetaModes).name;
      }
      else {
        this.encryption = fetchRadioEncryption("6G", this.encryptionMetaModes).name;
      }
    } else {
      this.encryption = this.encryptionMetaModes;

    }
  }


  compareEncryptionMde: string = "";
  compareConstructEditSSIDData(event: SupportRadioObjectModel): any {
    this.encryptionMetaModes = constructEncyptionModeValues(this.metaData, event.BeaconType);
    if (event.BeaconType) {
      this.metaData?.properties.forEach(res => {
        if (res.featureName == "SecurityOptions") {
          if (res.configuration) {
            if (res.configuration['SecurityOff'] && res.configuration['SecurityOff']["BeaconType"] == event.BeaconType) {
              if (res.configuration['SecurityOff'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA2-PSK'] && res.configuration['WPA2-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA2-PSK'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA-PSK'] && res.configuration['WPA-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA-PSK'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA/WPA2-PSK'] && res.configuration['WPA/WPA2-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA/WPA2-PSK'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA2/WPA3-PSK'] && res.configuration['WPA2/WPA3-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA2/WPA3-PSK'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
            if (res.configuration['WPA3-PSK'] && res.configuration['WPA3-PSK']["BeaconType"] == event.BeaconType) {
              if (res.configuration['WPA3-PSK'].IEEE11iEncryptionModes) {
                this.compareEncryptionMde = event.IEEE11iEncryptionModes;
              } else {
                this.compareEncryptionMde = event.WPAEncryptionModes;
              }
            }
          }
        }
      })
      if (!this.compareEncryptionMde) {
        this.compareEncryptionMde = event.BeaconType;
      }
      return this.compareEncryptionMde;

    }
    if (checkMultileFrequency(this.encryptionMetaModes)) {
      if (event.freqBand.match("2.4GHz")) {
        this.encryption = fetchRadioEncryption("2.4G", this.encryptionMetaModes).name;
      } else if (event.freqBand.match("5GHz")) {
        this.encryption = fetchRadioEncryption("5G", this.encryptionMetaModes).name;
      }
      else {
        this.encryption = fetchRadioEncryption("6G", this.encryptionMetaModes).name;
      }
    } else {
      this.encryption = this.encryptionMetaModes;

    }
  }

  //edit old ui -->ended



  CheckBoxChangeAddBand24(values) {

    this.ssidobjectFormAdd.band24 = values;
  }
  CheckBoxChangeAddBand5(values) {
    this.ssidobjectFormAdd.band5 = values;

  }
  CheckBoxChangeAddBand6(values) {
    this.ssidobjectFormAdd.band6 = values;

  }
  PrioritizationAddChange(values) {

    //this.ssidobjectFormAdd.smartQos = values;

  }


  CheckBoxChangeeditBand24(values) {

    this.ssidObjectForm.band24 = values;

  }
  CheckBoxChangeeditBand5(values) {

    this.ssidObjectForm.band5 = values;

  }
  CheckBoxChangeeditBand6(values) {

    this.ssidObjectForm.band6 = values;

  }

  PrioritizationEditChange(values) {

    this.ssidobjectFormAdd.smartQos = values;

  }

  isFieldRequired: boolean = false;
  showSecondaryWarningMessage: boolean = false;
  onSecurityChangeAdd(event: any) {
    this.showSecondaryWarningMessage = false;
    if (event.description == "SecurityOff") {
      this.isFieldRequired = false;
      this.ssidobjectFormAdd.password = "";
      this.passwordhide = false;
      if (this.ssidobjectFormAdd?.band6)
        this.showSecondaryWarningMessage = true;
    }

    else {
      if (this.ssidobjectFormAdd?.band6 && !(event.value == 5 || event.value == 6)) {
        this.showSecondaryWarningMessage = true;
      }

      this.isFieldRequired = true;
      this.ssidobjectFormAdd.password = "";
      this.passwordhide = true;
    }

  }

  onSecurityChangeedit(event: any) {
    this.showSecondaryWarningMessage = false;
    this.showErrorAstrik = false;
    if (event.description == "SecurityOff") {
      this.isFieldRequired = false;
      this.passwordhide = false;
      this.showErrorAstrik = false;
      this.submitbtnEdit = false;
      if (this.ssidObjectForm?.band6) {
        this.showSecondaryWarningMessage = true;
      }

    }
    else {
      var ssidObjForm = Object.assign({}, this.oldSSIDForm)
      var newPassword = this.ssidObjectForm?.password;

      if (this.ssidObjectForm?.band6 && !(event.value == 5 || event.value == 6)) {
        this.showSecondaryWarningMessage = true;
      }
      if (this.oldSSIDForm.encryptionType == 0 && this.ssidObjectForm.encryptionType != 0) {
        this.isFieldRequired = true;
        this.showErrorAstrik = true;
      }

      this.passwordhide = true;


      if (ssidObjForm?.password && newPassword?.length == 0 && event.description != "SecurityOff") {
        this.showErrorAstrik = true;
      }

    }
  }


  submitbtnadd: boolean = false;
  submitbtnEdit: boolean = false;
  nwType: string = ""
  TypechangeAdd(event: any) {
    this.errorMessageshownadd = false;
    this.ssidobjectFormAdd.encryptionType = '';
    this.showSecondaryWarningMessage = false;
    this.nwType = event.description
    if (event.description == "Guest") {
      this.Encryptionload(this.userId, event.description);
      if (this.checkingvaluesArray.maxUnifiedAvailable >= 1) {
        this.submitbtnadd = false;

      }
      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      // this.errorMessageshownadd = false;

      this.ssidobjectFormAdd.endless = 0;
      this.ssidobjectFormAdd.Custom = 0;

      this.ssidobjectFormAdd.isIndefinite = true;
      this.Duration = true;
      this.dupilcatedatepicker = true;
      this.datapickershow = false;

      this.frequencybandaddorginal = false;
      this.frequencybandaddduplicate = true;

      this.prioritizationoginal = false;
      this.prioritizationduplicate = false;

      this.isolatioaddorginal = true;
      this.isolatioaddduplicate = false;

      this.ssidobjectFormAdd.isolated = true;

      this.ssidobjectFormAdd.band24 = true;
      this.ssidobjectFormAdd.band5 = true;
      if (this.is6gAvailableForSec && this.wiFi6Enable) {
        this.ssidobjectFormAdd.band6 = true;
      }


      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;
    }
    else if (event.description == "WFH") {
      this.EncryptionTypes = this.EncryptionTypes?.filter((element1, index) => {
        if (element1.value != 0) {
          return element1;
        }
      });
      // if ((this.is6gAvailableForSec && this.wiFi6Enable)) {
      //   this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 5 || x.value == 6)
      // }
      if (this.checkingvaluesArray.maxUnifiedAvailable >= 1) {

        this.submitbtnadd = false;

      }
      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      //  this.errorMessageshownadd = false;

      this.frequencybandaddorginal = false;
      this.frequencybandaddduplicate = true;

      // this.bwShapingOn = true;
      if (this.bwShapingOn) {
        this.prioritizationoginal = false;
        this.prioritizationduplicate = true;

        this.isolatioaddorginal = false;
        this.isolatioaddduplicate = true;

        this.ssidobjectFormAdd.isolated = true;
        this.ssidobjectFormAdd.smartQos = false;
      }
      else {
        this.prioritizationoginal = false;
        this.prioritizationduplicate = true;

        this.isolatioaddorginal = false;
        this.isolatioaddduplicate = true;


        this.ssidobjectFormAdd.isolated = true;
        this.ssidobjectFormAdd.smartQos = true;
      }



      this.datapickershow = false;
      this.Duration = false;
      this.dupilcatedatepicker = false;


      this.ssidobjectFormAdd.band24 = true;
      this.ssidobjectFormAdd.band5 = true;
      if (this.is6gAvailableForSec && this.wiFi6Enable) {
        this.ssidobjectFormAdd.band6 = true;
      }


      // this.ssidobjectFormAdd.isolated = true;
      // this.ssidobjectFormAdd.smartQos = true;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;


    }
    else if (event.description == "Custom unified") {
      this.Encryptionload(this.userId, event.description);
      if (this.checkingvaluesArray.maxUnifiedAvailable >= 1) {


        this.submitbtnadd = false;


      }
      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      //  this.errorMessageshownadd = false;

      this.frequencybandaddorginal = false;
      this.frequencybandaddduplicate = true;

      this.prioritizationoginal = true;
      this.prioritizationduplicate = false;

      this.isolatioaddorginal = true;
      this.isolatioaddduplicate = false;

      this.datapickershow = false;
      this.Duration = false;
      this.dupilcatedatepicker = false;

      this.ssidobjectFormAdd.band24 = true;
      this.ssidobjectFormAdd.band5 = true;
      if (this.is6gAvailableForSec && this.wiFi6Enable) {
        this.ssidobjectFormAdd.band6 = true;
      }


      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;

      this.ssidobjectFormAdd.isolated = false;
      this.ssidobjectFormAdd.smartQos = false;


    }
    else if (event.description == "Custom 2.4 GHz") {
      this.Encryptionload(this.userId);
      if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand24Available >= 1) {
        this.submitbtnadd = false;

      }
      else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand24Available >= 1) {
        this.submitbtnadd = false;

      }
      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      //  this.errorMessageshownadd = false;

      this.frequencybandaddorginal = true;
      this.frequencybandaddduplicate = false;

      this.prioritizationoginal = true;
      this.prioritizationduplicate = false;

      this.isolatioaddorginal = true;
      this.isolatioaddduplicate = false;

      this.datapickershow = false;
      this.Duration = false;
      this.dupilcatedatepicker = false;

      this.ssidobjectFormAdd.isolated = false;
      this.ssidobjectFormAdd.smartQos = false;

      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;
      this.band24EditDuplicateSelected = true;
      this.ssidobjectFormAdd.band24 = true;
      this.ssidobjectFormAdd.band5 = false;
      this.ssidobjectFormAdd.band6 = false;

    }
    else if (event.description == "Custom 5 GHz") {
      this.Encryptionload(this.userId);
      if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand5Available >= 1) {
        this.submitbtnadd = false;
      }
      else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand5Available >= 1) {
        this.submitbtnadd = false;

      }


      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      // this.errorMessageshownadd = false;

      this.datapickershow = false;
      this.Duration = false;
      this.dupilcatedatepicker = false;

      this.frequencybandaddorginal = true;
      this.frequencybandaddduplicate = false;

      this.prioritizationoginal = true;
      this.prioritizationduplicate = false;

      this.isolatioaddorginal = true;
      this.isolatioaddduplicate = false;

      this.ssidobjectFormAdd.isolated = false;
      this.ssidobjectFormAdd.smartQos = false;

      this.band24EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = true;
      this.ssidobjectFormAdd.band24 = false;
      this.ssidobjectFormAdd.band5 = true;
      this.ssidobjectFormAdd.band6 = false;
    }

    else if (event.description == "Custom 6 GHz") {
      this.Encryptionload(this.userId, event.description);
      // if (this.checkingvaluesArray.maxBand6Available >= 1) {
      //   this.submitbtnadd = false;
      // }
      if (this.checkingvaluesArray.maxUnifiedAvailable == 0 && this.checkingvaluesArray.maxBand6Available >= 1) {
        this.submitbtnadd = false;
      }
      else if (this.checkingvaluesArray.maxUnifiedAvailable >= 1 && this.checkingvaluesArray.maxBand6Available >= 1) {
        this.submitbtnadd = false;

      }

      else {
        this.errorMessageshownadd = true;
        this.errorMsg = "This system does not have sufficient resources to create Network Type that you have selected.";
        this.submitbtnadd = true;
      }
      // this.errorMessageshownadd = false;

      this.datapickershow = false;
      this.Duration = false;
      this.dupilcatedatepicker = false;

      this.frequencybandaddorginal = true;
      this.frequencybandaddduplicate = false;

      this.prioritizationoginal = true;
      this.prioritizationduplicate = false;

      this.isolatioaddorginal = true;
      this.isolatioaddduplicate = false;
      this.ssidobjectFormAdd.isolated = false;
      this.ssidobjectFormAdd.smartQos = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = true;
      this.ssidobjectFormAdd.band6 = true;
      this.ssidobjectFormAdd.band24 = false;
      this.ssidobjectFormAdd.band5 = false;

    }
  }


  TypechangeEditload(values) {
    if (values == "Guest") {
      this.Encryptionload(this.userId, values);
      this.ssidObjectForm.endless = 0;
      this.ssidObjectForm.Custom = 0;
      this.Duration = true;
      this.dupilcatedatepicker = true;
      this.datapickershow = false;


      this.frequencybandeditorginal = false;
      this.frequencybandeditduplicate = true;

      this.prioritizationeditorginal = false;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;

      // this.ssidObjectForm.isolated = true;

    }
    else if (values == "WFH") {
      setTimeout(() => {
        this.EncryptionTypes = this.EncryptionTypes?.filter((element1, index) => {
          if (element1.value != 0) {
            return element1;
          }

        });
        // if ((this.is6gAvailableForSec && this.wiFi6Enable)) {
        //   this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 5 || x.value == 6)
        // }

      }, 1000);

      this.frequencybandeditorginal = false;
      this.frequencybandeditduplicate = true;

      // this.prioritizationeditorginal = false;
      // this.prioritizationeditduplicate = true;


      // this.isolationeditorginal = false;
      // this.isolationeditduplicate = true;
      if (this.bwShapingOn) {
        this.prioritizationeditorginal = false;
        this.prioritizationeditduplicate = true;


        this.isolationeditorginal = false;
        this.isolationeditduplicate = true;

        //this.ssidObjectForm.isolated = true;
        this.ssidObjectForm.smartQos = false;

      }
      else {

        this.prioritizationeditorginal = false;
        this.prioritizationeditduplicate = true;


        this.isolationeditorginal = false;
        this.isolationeditduplicate = true;

        // this.ssidobjectFormAdd.isolated = true;
        // this.ssidobjectFormAdd.smartQos = true;

      }


      this.dupilcatedatepicker = false;
      this.Duration = false;
      this.datapickershow = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;

    }
    else if (values == "Custom unified") {
      this.Encryptionload(this.userId, values);
      this.frequencybandeditorginal = false;
      this.frequencybandeditduplicate = true;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;

      this.dupilcatedatepicker = false;
      this.Duration = false;
      this.datapickershow = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = false;

      // this.ssidObjectForm.isolated = false;
    }
    else if (values == "Custom 2.4 GHz") {
      this.Encryptionload(this.userId);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;

      this.dupilcatedatepicker = false;
      this.Duration = false;
      this.datapickershow = false;

      this.band5EditDuplicateSelected = false;
      this.band24EditDuplicateSelected = true;
      this.band6EditDuplicateSelected = false;
      //this.ssidobjectFormAdd?.band24 = true;

      //  this.ssidObjectForm.isolated = false;


    }
    else if (values == "Custom 5 GHz") {
      this.Encryptionload(this.userId);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.Duration = false;
      this.datapickershow = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = true;
      this.band6EditDuplicateSelected = false;
      //this.ssidobjectFormAdd.band5 = true;

      // this.ssidObjectForm.isolated = false;
    }
    else if (values == "Custom 6 GHz") {
      this.Encryptionload(this.userId, values);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.Duration = false;
      this.datapickershow = false;

      this.band24EditDuplicateSelected = false;
      this.band5EditDuplicateSelected = false;
      this.band6EditDuplicateSelected = true;
      //this.ssidobjectFormAdd.band5 = true;

      // this.ssidObjectForm.isolated = false;
    }
  }
  TypechangeEdit(event: any) {

    if (event.description == "Guest") {

      this.Encryptionload(this.userId, event.description);
      this.ssidObjectForm.endless = 0;
      this.ssidObjectForm.Custom = 0;
      this.Duration = true;
      this.dupilcatedatepicker = true;
      this.datapickershow = false;


      this.frequencybandeditorginal = false;
      this.frequencybandeditduplicate = true;

      this.prioritizationeditorginal = false;
      this.prioritizationeditduplicate = true;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;




    }
    else if (event.description == "WFH") {
      this.EncryptionTypes = this.EncryptionTypes?.filter((element1, index) => {
        if (element1.value != 0) {
          return element1;
        }
      });
      // if ((this.is6gAvailableForSec && this.wiFi6Enable)) {
      //   this.EncryptionTypes = this.EncryptionTypes?.filter(x => x.value == 5 || x.value == 6)
      // }
      this.frequencybandeditorginal = false;
      this.frequencybandeditduplicate = true;

      // this.prioritizationeditorginal = false;
      // this.prioritizationeditduplicate = true;

      // this.isolationeditorginal = false;
      // this.isolationeditduplicate = true;
      if (this.bwShapingOn) {
        this.prioritizationeditorginal = false;
        this.prioritizationeditduplicate = true;


        this.isolationeditorginal = false;
        this.isolationeditduplicate = true;

        //  this.ssidObjectForm.isolated = true;
        this.ssidObjectForm.smartQos = false;

      }
      else {

        this.prioritizationeditorginal = false;
        this.prioritizationeditduplicate = true;


        this.isolationeditorginal = false;
        this.isolationeditduplicate = true;

        // this.ssidObjectForm.isolated = true;
        // this.ssidObjectForm.smartQos = true;

      }

      this.datapickershow = false;
      this.Duration = false;


    }
    else if (event.description == "Custom unified") {
      this.Encryptionload(this.userId, event.description);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.datapickershow = false;
      this.Duration = false;
    }
    else if (event.description == "Custom 2.4 GHz") {
      this.Encryptionload(this.userId);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.datapickershow = false;
      this.Duration = false;
    }
    else if (event.description == "Custom 5 GHz") {
      this.Encryptionload(this.userId);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.datapickershow = false;
      this.Duration = false;
    }
    else if (event.description == "Custom 6 GHz") {
      this.Encryptionload(this.userId, event.description);
      this.frequencybandeditorginal = true;
      this.frequencybandeditduplicate = false;

      this.prioritizationeditorginal = true;
      this.prioritizationeditduplicate = false;

      this.isolationeditorginal = true;
      this.isolationeditduplicate = false;
      this.dupilcatedatepicker = false;
      this.datapickershow = false;
      this.Duration = false;
    }
  }


  //refreshing list
  network: any

  addnetworkload() {
    let networkloadadd = [
      { description: "All Types", value: 0 },
      { description: "Guest", value: 1 },
      { description: "WFH", value: 2 },
      { description: "Custom unified", value: 3 },
      { description: "Custom 2.4 GHz", value: 4 },
      { description: "Custom 5 GHz", value: 5 },
      // { description: "Custom 6 GHz", value: 6 },
      // { description: "Primary", value: 7 },
      // { description: "Staff", value: 8 },
      // { description: "Captive Portal", value: 8 },
      // { description: "Point of Sale", value: 9 }


    ];

    if (this.wiFi6Enable) {
      networkloadadd.push({ description: "Custom 6 GHz", value: 6 })
    }

    this.networkloadadd = networkloadadd.sort(function (a, b) { return a.value - b.value });

    if (this.isbSmb) {
      networkloadadd = [];
      networkloadadd = [
        { description: "All Types", value: 0 },
        { description: "Primary", value: 7 },
        { description: "Staff", value: 8 },
        { description: "Customer Portal", value: 8 },
        { description: "Point of Sale", value: 9 }
      ];
      this.networkloadadd = networkloadadd;

    }

    if (!(this.deviceInfo?.filter((obj) => (obj.opMode == 'RG' && obj.hasOwnProperty("modelName") && this.ssoAuthService.acceptGSModel(obj.modelName))).length > 0) && this.networkloadadd?.filter(obj => obj.description == 'WFH').length > 0) {

      this.networkloadadd = this.networkloadadd?.filter(obj => obj.description !== 'WFH');
    }

  }


  RefreshSSIDManagerList() {
    //this.SSIDFilterValue = "All Types";
    this.getDeviceStatus();
    this.getQosListData(this.userId);
    this.fetchSSIDListValues(this.orgId, this.serialNumber, true);
    //this.networkType = 'All Types';
    //this.doFilter(this.networkType);

  }

  checkThirdParty() {
    return (/ZYXEL/gi.test(this.deviceInfo?.filter((obj) => (obj.opMode == 'RG' && obj?.hasOwnProperty("modelName")))[0].manufacturer))
  }


  changeendlessedit(value) {

    if (value) {
      this.datapickershow = false;
      this.dupilcatedatepicker = true;
      this.ssidObjectForm.Custom = 0;
      this.ssidObjectForm.isIndefinite = true;
    }
  }

  changecustomedit(value) {
    if (!value) {
      this.datapickershow = true;
      this.dupilcatedatepicker = false;
      this.ssidObjectForm.endless = 1;

    }
  }


  changeAlwaysOndit(value) {

    if (value) {
      this.datapickershow = false;
      this.dupilcatedatepicker = true;
      this.ssidObjectForm.Custom = 0;
      this.ssidObjectForm.isIndefinite = true;
    }
  }

  changecustomAdd(value) {
    if (!value) {
      this.datapickershow = true;
      this.dupilcatedatepicker = false;
      this.ssidobjectFormAdd.endless = 1;
      this.ssidobjectFormAdd.duration.startTime = new Date();
      this.fromMinimumDate = this.ssidobjectFormAdd.duration.startTime;

      this.ssidobjectFormAdd.duration.endTime = new Date();
      this.toMinimumDate = this.ssidobjectFormAdd.duration.endTime;

      this.ssidobjectFormAdd.isIndefinite = false;
      this.prioritizationduplicate = false;
      //this.prioritizationduplicate = false;
      this.isolatioaddduplicate = false;
      this.setDateadd(null);

    }
  }

  changeendlessAdd(value) {

    if (value) {
      this.datapickershow = false;
      this.dupilcatedatepicker = true;
      this.ssidobjectFormAdd.Custom = 0;


      this.ssidobjectFormAdd.duration.startTime = 0;
      this.ssidobjectFormAdd.duration.endTime = 0;
      this.ssidobjectFormAdd.isIndefinite = true;
    }
  }



  pageErrorHandle(err: any) {
    this.showError = true;
    if (err.status === 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
    }
  }
  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      // if (this.ssidObjectForm.duration) {
      //   this.ssidObjectForm.duration.startTime = 0;
      //   this.ssidObjectForm.duration.endTime = 0;
      // }
    }
    if (this.individualPasswordsPopUP)
      this.individualPasswordsPopUP.close();
    this.ssidnetworktype = ""
    this.ssidfreetextedit = "";
    this.schedules = [];
    this.scheduleFormArray = [];
    // this.networkAccessType = "";

  }

  passwordedit(ssidobj) {
    let oldpasswordcheck = this.oldpasswordsecondary ? this.oldpasswordsecondary !== ssidobj?.password : false
    if (!(this.oldPassword)) {
      this.show = !this.show;
    }
    else if (this.emptypassword) {
      this.show = !this.show;
    }
    else if (oldpasswordcheck) {
      this.show = !this.show;
    }
    else {
      this.editaccesspasspharsepopup = true
    }

  }

  showPasswordPrimaryEdit(ssidobj) {

    if (!(ssidobj?.password)) {
      this.show = !this.show;
    }
    else {
      this.editaccesspasspharsepopup = true
    }

  }

  passwordeditaddssid(ssidobj) {
    this.show = !this.show;
  }

  passWordEditOldModel(ssidobj) {
    let oldpasswordcheck = this.oldpasswordforprimary ? this.oldpasswordforprimary !== ssidobj?.PRConfig?.KeyPassphrase : false
    if (!(ssidobj?.PRConfig?.KeyPassphrase)) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;

    }
    else if (oldpasswordcheck) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else {
      this.editaccesspasspharsepopup = true
    }
    // this.showPassPhraseOldModel = !this.showPassPhraseOldModel;

  }





  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }

  hideSuccess() {
    this.showSuccess = false;
    this.successMsg = '';
  }
  dateValidation: boolean = false;
  setDate() {


    if (this.ssidObjectForm.duration.startTime == null || this.ssidObjectForm.duration.endTime == null) {
      this.dateValidation = false;
      return;
    }
    let fromDt = new Date(this.ssidObjectForm.duration.startTime);
    fromDt.setSeconds(0);

    if (this.ssidObjectForm.duration.endTime != 0) {

    }
    let endDt = new Date(this.ssidObjectForm.duration.endTime);
    // if (this.ssidObjectForm.duration.endTime == 0) {
    //   endDt = new Date();

    // }
    endDt.setSeconds(0);

    if (this.ssidObjectForm.duration.startTime != 0 && this.ssidObjectForm.duration.endTime != 0 && fromDt && endDt) {
      if (fromDt >= endDt) {
        this.dateValidation = true
      }
      else {
        this.dateValidation = false;
      }

    }
    else {
      this.dateValidation = false;
    }


    // this.ssidObjectForm.duration.endTime = "";
    //this.toMinimumDate = new Date(this.ssidObjectForm.duration.startTime);

  }
  previousTime: string = "";
  setDateadd(eent, type = null) {

    if (this.ssidobjectFormAdd.duration.startTime == null || this.ssidobjectFormAdd.duration.endTime == null) {
      this.dateValidation = false;
      return;
    }

    let startTime = new Date(this.ssidobjectFormAdd.duration.startTime);
    this.previousTime = startTime.getHours() + ':' + startTime.getTime() + ":" + startTime.getMinutes();
    if (type == 'From') {


      let prevStartTime = startTime
      let preEndTime = new Date(this.ssidobjectFormAdd.duration.endTime);





      // startTime.setDate(this.ssidobjectFormAdd.duration.startTime.getDate() + 1);
      // startTime.setHours(startTime.getHours() + 1);

      // if (!prevStartTime.getDate().toString().match(preEndTime.getDate().toString())) {
      //   startTime.setDate(this.ssidobjectFormAdd.duration.startTime.getDate() + 1);
      //   startTime.setHours(startTime.getHours() + 1);
      // }
      // startTime.setHours(startTime.getHours() + 1);


      startTime.setDate(this.ssidobjectFormAdd.duration.startTime.getDate() + 1);
      startTime.setHours(startTime.getHours() + 1);


      var toMinimumDate = new Date(this.ssidobjectFormAdd.duration.startTime);
      // toMinimumDate.setHours(toMinimumDate.getHours());
      // toMinimumDate.setDate(this.ssidobjectFormAdd.duration.startTime.getDate() + 1);
      toMinimumDate.setHours(0, 0, 0, 0);

      this.toMinimumDate = toMinimumDate

      this.ssidobjectFormAdd.duration.endTime = startTime;
      // if (!prevStartTime.getDate().toString().match(preEndTime.getDate().toString())) {
      //   this.ssidobjectFormAdd.duration.endTime = startTime;
      // }
      // else {
      //   this.ssidobjectFormAdd.duration.endTime = preEndTime
      // }


    }
    else if (type == null) {

      let setEndTime = new Date(this.ssidobjectFormAdd.duration.startTime);
      setEndTime.setDate(this.ssidobjectFormAdd.duration.startTime.getDate() + 1);
      setEndTime.setHours(0, 0, 0, 0);
      this.ssidobjectFormAdd.duration.endTime = setEndTime;

    }
    else {

    }
    let fromDt = new Date(this.ssidobjectFormAdd.duration.startTime);
    fromDt.setSeconds(0);
    let endDt = new Date(this.ssidobjectFormAdd.duration.endTime);
    endDt.setSeconds(0);

    if (fromDt && endDt) {
      if (fromDt >= endDt) {
        this.dateValidation = true
      }
      else {
        this.dateValidation = false;

      }
    }
    else {
      this.dateValidation = false;
    }



    // this.ssidobjectFormAdd.duration.endTime = "";

  }


  SSIDFilterValue: string = "All Types";
  doFilter(event: any) {
    this.SSIDFilterValue = event.description;
    this.ssidObjects = this.permanentRows;

    let val = event.description;
    if (event.description == "All Types") {
      //this.ssidObjects = this.permanentRows;
      this.ssidObjects = [];
      this.ssidListCount = true;
      this.changeSSIDOperator();
    }
    else if (event.description) {

      this.temp = this.ssidObjects;
      const temp = this.temp?.filter(function (d) {
        if (val == "Staff") {
          if (d?.networktype == 'Staff-Individual') {
            val = "Staff-Individual";
          }
          else if (d?.networktype == 'Staff-Shared Password') {
            val = "Staff-Shared Password";
          }

        }

        return (d.networktype == val);
      });


      this.ssidObjects = temp;
      //  this.loading = false;
    }
    else {
      this.ssidObjects = this.permanentRows;
      // this.loading = false;
    }


  }
  validSsidName: boolean = false;
  onChangeSSIdName(e, type = null) {
    this.submitbtnadd = true;
    this.validSsidName = true;
    let name = e.trim();
    if (name != null && name.length > 0) {
      if (type == "Add") {
        this.ssidobjectFormAdd.ssid = name;
      }
      else {
        this.ssidObjectForm.ssid = name;

      }

      this.validSsidName = false;
      this.submitbtnadd = false;
    }

  }
  // alphaNumberOnly(e) {  // Accept only alpha numerics, not special characters 
  //   var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  //   if (regex.test(str)) {
  //     return true;
  //   }

  //   e.preventDefault();
  //   return false;
  // }
  deviceDataNumberChanged(event) {
    this.serialNumber = event.id;
    this.landingPage();
    this.getDeviceStatus();
    if (this.serialNumber) {
      this.loading = true;
      this.fetchMetaData(this.serialNumber);
      this.getUserIds(this.serialNumber);
    }
    //  this.addnetworkload();
  }
  comparePrimary_SSIDs: boolean = false;
  isSSID2_4GZ: boolean = false;
  isSSID5_4GZ: boolean = false;
  isSSID6_4GZ: boolean = false;


  comparePrimarySSID(two_fourGhz, fiveGhz, sixGhz): boolean {
    var isCompared: boolean = true;
    // if (two_fourGhz && fiveGhz && sixGhz) {
    if (this.isSSID2_4GZ && this.isSSID5_4GZ && this.isSSID6_4GZ) {
      if (two_fourGhz?.PRConfig && two_fourGhz?.PRConfig?.KeyPassphrase) {
        two_fourGhz.KeyPassphrase = two_fourGhz.PRConfig.KeyPassphrase
      }
      else {
        two_fourGhz.KeyPassphrase = "";
      }
      if (fiveGhz?.PRConfig && fiveGhz?.PRConfig?.KeyPassphrase) {
        fiveGhz.KeyPassphrase = fiveGhz.PRConfig.KeyPassphrase
      }
      else {
        fiveGhz.KeyPassphrase = "";
      }
      if (sixGhz?.PRConfig && sixGhz?.PRConfig?.KeyPassphrase) {
        sixGhz.KeyPassphrase = sixGhz.PRConfig.KeyPassphrase
      }
      else {
        sixGhz.KeyPassphrase = "";
      }

      var two_four_Ency = this.compareConstructEditSSIDData(two_fourGhz);
      var five_Ency = this.compareConstructEditSSIDData(fiveGhz);
      var six_Ency = this.compareConstructEditSSIDData(sixGhz);

      var primary_Two_four_ghz_obj = {
        name: two_fourGhz?.SSID || "",
        broadcastEnabled: two_fourGhz?.SSIDAdvertisementEnabled || "",
        securityType: two_fourGhz?.BeaconType || "",
        encryption: two_four_Ency || "",
        passphrase: two_fourGhz?.KeyPassphrase || "",
      }
      var primary_Five_ghz_obj = {
        name: fiveGhz?.SSID || "",
        broadcastEnabled: fiveGhz?.SSIDAdvertisementEnabled || "",
        securityType: fiveGhz?.BeaconType || "",
        encryption: five_Ency || "",
        passphrase: fiveGhz?.KeyPassphrase || "",
      }
      var primary_Six_ghz_obj = {
        name: sixGhz?.SSID || "",
        broadcastEnabled: sixGhz?.SSIDAdvertisementEnabled || "",
        securityType: sixGhz?.BeaconType || "",
        encryption: six_Ency || "",
        passphrase: sixGhz?.KeyPassphrase || "",
      }
      if (primary_Five_ghz_obj?.securityType == "Basic") {
        primary_Two_four_ghz_obj.passphrase = "Empty Password";
        primary_Five_ghz_obj.passphrase = "Empty Password";
        primary_Six_ghz_obj.passphrase = "Empty Password";
      }
      if (!(primary_Five_ghz_obj?.name && primary_Five_ghz_obj?.securityType && primary_Five_ghz_obj?.broadcastEnabled != "undefined" && primary_Five_ghz_obj?.encryption)) {
        return false;
      }
      if (primary_Two_four_ghz_obj?.securityType && primary_Five_ghz_obj?.securityType) {
        if (primary_Two_four_ghz_obj?.securityType == primary_Five_ghz_obj?.securityType) {
          primary_Six_ghz_obj.securityType = primary_Five_ghz_obj.securityType
        }
      }
      let keys = Object.keys(primary_Five_ghz_obj);
      let primary_Two_four_ghz = Object.values(primary_Two_four_ghz_obj);
      let primary_Five_ghz = Object.values(primary_Five_ghz_obj);
      let primary_Six_ghz = Object.values(primary_Six_ghz_obj);


      for (let i = 0; i < keys.length; i++) {
        if ((primary_Two_four_ghz[i] == primary_Five_ghz[i]) && (primary_Five_ghz[i] == primary_Six_ghz[i])) {
          isCompared = true;
          this.comparePrimary_SSIDs = true;
        }
        else {
          this.comparePrimary_SSIDs = false;
          return false;
        }
      }
    }
    else if (this.isSSID2_4GZ && this.isSSID5_4GZ) {
      if (two_fourGhz?.PRConfig && two_fourGhz?.PRConfig?.KeyPassphrase) {
        two_fourGhz.KeyPassphrase = two_fourGhz.PRConfig.KeyPassphrase
      }
      else {
        two_fourGhz.KeyPassphrase = "";
      }
      if (fiveGhz?.PRConfig && fiveGhz?.PRConfig?.KeyPassphrase) {
        fiveGhz.KeyPassphrase = fiveGhz.PRConfig.KeyPassphrase
      }
      else {
        fiveGhz.KeyPassphrase = "";
      }
      var two_four_Ency = this.compareConstructEditSSIDData(two_fourGhz);
      var five_Ency = this.compareConstructEditSSIDData(fiveGhz);
      var primary_Two_four_ghz_obj = {
        name: two_fourGhz?.SSID || "",
        broadcastEnabled: two_fourGhz?.SSIDAdvertisementEnabled || "",
        securityType: two_fourGhz?.BeaconType || "",
        encryption: two_four_Ency || "",
        passphrase: two_fourGhz?.KeyPassphrase || "",
      }
      var primary_Five_ghz_obj = {
        name: fiveGhz?.SSID || "",
        broadcastEnabled: fiveGhz?.SSIDAdvertisementEnabled || "",
        securityType: fiveGhz?.BeaconType || "",
        encryption: five_Ency || "",
        passphrase: fiveGhz?.KeyPassphrase || "",
      }
      if (primary_Five_ghz_obj?.securityType == "Basic") {
        primary_Two_four_ghz_obj.passphrase = "Empty Password";
        primary_Five_ghz_obj.passphrase = "Empty Password";
      }
      if (!(primary_Five_ghz_obj?.name && primary_Five_ghz_obj?.securityType && primary_Five_ghz_obj?.broadcastEnabled != "undefined" && primary_Five_ghz_obj?.encryption)) {
        return false;
      }
      let keys = Object.keys(primary_Five_ghz_obj);
      let primary_Two_four_ghz = Object.values(primary_Two_four_ghz_obj);
      let primary_Five_ghz = Object.values(primary_Five_ghz_obj);


      for (let i = 0; i < keys.length; i++) {
        if ((primary_Two_four_ghz[i] == primary_Five_ghz[i])) {
          isCompared = true;
          this.comparePrimary_SSIDs = true;
        }
        else {
          this.comparePrimary_SSIDs = false;
          return false;
        }
      }
    }

    return isCompared

  }

  selectPrimaryBands(e, myForm: NgForm) {


    if (this.disabled_two_fourSSIDFrequenyBands) {
      if (e?.target?.checked) {
        this.six_gSSIDFrequenyBands = true;
        this.five_gSSIDFrequenyBands = true;
      }
      else {
        this.six_gSSIDFrequenyBands = false;
        this.five_gSSIDFrequenyBands = false;
      }

    }
    else if (this.disabled_five_gSSIDFrequenyBands) {
      if (e?.target?.checked) {
        this.two_fourSSIDFrequenyBands = true;
        this.six_gSSIDFrequenyBands = true;
      }
      else {
        this.two_fourSSIDFrequenyBands = false;
        this.six_gSSIDFrequenyBands = false;
      }
    }
    else if (this.disabled_six_gSSIDFrequenyBands) {
      if (e?.target?.checked) {
        this.five_gSSIDFrequenyBands = true;
        this.two_fourSSIDFrequenyBands = true;
      }
      else {
        this.five_gSSIDFrequenyBands = false;
        this.two_fourSSIDFrequenyBands = false;
      }
    }
    this.primarySSIDErrorInfo = false;

    if (!this.wiFi6Enable) {
      this.six_gSSIDFrequenyBands = false;
    }
    this.allSsidNames = this.fetchAllSSIDRadioName(this.ssidObjectForm);
    var oldPassword = ""

    // this.oldSSIDForm = Object.assign({}, this.ssidObjectForm)

    if (this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands && this.six_gSSIDFrequenyBands) {

      oldPassword = this.ssidObjectForm.KeyPassphrase
      this.oldSsidData.KeyPassphrase = oldPassword
      var primary_Two_four_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID1");
      var primary_Five_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID9");
      var six_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID17");

      var two_fourGhz = Object.assign({}, primary_Two_four_ghz[0])
      var fiveGhz = Object.assign({}, primary_Five_ghz[0])
      var sixGhz = Object.assign({}, six_ghz[0])

      if (two_fourGhz?.PRConfig && two_fourGhz?.PRConfig?.KeyPassphrase) {
        two_fourGhz.KeyPassphrase = two_fourGhz.PRConfig.KeyPassphrase
      }
      else {
        two_fourGhz.KeyPassphrase = "";
      }
      if (fiveGhz?.PRConfig && fiveGhz?.PRConfig?.KeyPassphrase) {
        fiveGhz.KeyPassphrase = fiveGhz.PRConfig.KeyPassphrase
      }
      else {
        fiveGhz.KeyPassphrase = "";
      }
      if (sixGhz?.PRConfig && sixGhz?.PRConfig?.KeyPassphrase) {
        sixGhz.KeyPassphrase = sixGhz.PRConfig.KeyPassphrase
      }
      else {
        sixGhz.KeyPassphrase = "";
      }
      // // Case 1
      // if (two_fourGhz.KeyPassphrase == "" && fiveGhz.KeyPassphrase == "" && sixGhz.KeyPassphrase == "") {
      //   this.showErrorAstrik = true;
      // }
      // else if (this.disabled_two_fourSSIDFrequenyBands && (two_fourGhz.KeyPassphrase == "") && fiveGhz.KeyPassphrase) {
      //   this.showErrorAstrik = false;
      //   oldPassword = two_fourGhz.KeyPassphrase;
      //   this.ssidObjectForm.KeyPassphrase = fiveGhz.KeyPassphrase;
      //   this.oldSsidData.KeyPassphrase = fiveGhz.KeyPassphrase;
      // }
      // else if (this.disabled_six_gSSIDFrequenyBands && (sixGhz.KeyPassphrase == "") && fiveGhz.KeyPassphrase) {
      //   this.showErrorAstrik = false;
      //   oldPassword = two_fourGhz.KeyPassphrase;
      //   this.ssidObjectForm.KeyPassphrase = fiveGhz.KeyPassphrase;
      //   this.oldSsidData.KeyPassphrase = fiveGhz.KeyPassphrase;
      // }
      // else {
      //   this.showErrorAstrik = false;
      //   this.ssidObjectForm.KeyPassphrase = this.oldPassword;
      // }



      this.primarySSIDErrorInfo = true;
      this.allSsidNames = [];
      if (this.ssidObjectForm?.SSID?.length <= 32) {
        myForm.controls['name'].setErrors(null)
      }

      if (this.ssidObjectForm?.SSIDName == 'SSID17') {
        var selectedFieldMeta6G = this.metaData?.properties?.filter(x => x.featureName == 'SSID1')[0]
        this.tempEditedSecurity = wifiFetchSecurityOptionsFromSSIDMeta(selectedFieldMeta6G, this.metaData?.properties, this.security);
        this.editedSecurity = this.tempEditedSecurity;
      }
      if (this.editedSecurity?.length > 0) {
        this.ssidObjectForm.BeaconType = this.editedSecurity[4].id;
        // this.editedSecurity = this.tempEditedSecurity;
      }
      if (this.six_gSSIDFrequenyBands && this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands) {
        if ((this.is6gAvailableForSec && this.wiFi6Enable) && !(this.ssidObjectForm.BeaconType == "11iandWPA3" || this.ssidObjectForm.BeaconType == "WPA3")) {
          this.showPrimaryWarningMessage = true;
        }
      }

      this.constructEditSSIDData(this.ssidObjectForm);
    }
    else if (this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands) {


      oldPassword = this.ssidObjectForm.KeyPassphrase
      this.oldSsidData.KeyPassphrase = oldPassword

      var primary_Two_four_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID1");
      var primary_Five_ghz = this.ssidObjectobj2?.filter(x => x.SSIDName == "SSID9");

      var two_fourGhz = Object.assign({}, primary_Two_four_ghz[0])
      var fiveGhz = Object.assign({}, primary_Five_ghz[0])

      if (two_fourGhz?.PRConfig && two_fourGhz?.PRConfig?.KeyPassphrase) {
        two_fourGhz.KeyPassphrase = two_fourGhz.PRConfig.KeyPassphrase
      }
      else {
        two_fourGhz.KeyPassphrase = "";
      }
      if (fiveGhz?.PRConfig && fiveGhz?.PRConfig?.KeyPassphrase) {
        fiveGhz.KeyPassphrase = fiveGhz.PRConfig.KeyPassphrase
      }
      else {
        fiveGhz.KeyPassphrase = "";
      }

      // Case 1
      // if (two_fourGhz.KeyPassphrase == "" && fiveGhz.KeyPassphrase == "") {
      //   this.showErrorAstrik = true;
      // }
      // else if (this.disabled_two_fourSSIDFrequenyBands && (two_fourGhz.KeyPassphrase == "") && fiveGhz.KeyPassphrase) {
      //   this.showErrorAstrik = false;
      //   oldPassword = two_fourGhz.KeyPassphrase;
      //   this.ssidObjectForm.KeyPassphrase = fiveGhz.KeyPassphrase;
      //   this.oldSsidData.KeyPassphrase = fiveGhz.KeyPassphrase;
      // }
      // else {
      //   this.showErrorAstrik = false;
      //   this.ssidObjectForm.KeyPassphrase = this.oldPassword;
      // }

      this.primarySSIDErrorInfo = true;
      // if (this.two_fourSSIDFrequenyBands && this.five_gSSIDFrequenyBands) {
      //   if ((this.is6gAvailableForSec && this.wiFi6Enable) && !(this.ssidObjectForm.BeaconType == "11iandWPA3" || this.ssidObjectForm.BeaconType == "WPA3")) {
      //     this.showPrimaryWarningMessage = true;
      //   }
      // }
      this.showPrimaryWarningMessage = false;
      let ssidMetaData: MetaField[] = this.metaData?.properties?.filter(x => x.featureName.match(ssidMetaPattern))
      this.editedSecurity = FetchSecurityOptionsFromSSIDMeta(this.ssidObjectForm, ssidMetaData, this.security);
      this.ssidObjectForm.BeaconType = this.tempSSIDFormBeaconType
      this.constructEditSSIDData(this.ssidObjectForm);
      if (this.ssidObjectForm.isRreserved6ghzName) {
        if (this.ssidObjectForm.BeaconType != "WPA3") {
          this.showWpsNote = false;
        }
      }
    }
    else {
      this.ssidObjectForm.KeyPassphrase = this.oldSSIDForm?.KeyPassphrase
      this.oldSsidData.KeyPassphrase = this.oldSSIDForm?.KeyPassphrase
      this.showPrimaryWarningMessage = false;;

      this.showErrorAstrik = false;
      let ssidMetaData: MetaField[] = this.metaData?.properties?.filter(x => x.featureName.match(ssidMetaPattern))
      this.editedSecurity = FetchSecurityOptionsFromSSIDMeta(this.ssidObjectForm, ssidMetaData, this.security);
      this.ssidObjectForm.BeaconType = this.tempSSIDFormBeaconType
      this.constructEditSSIDData(this.ssidObjectForm);
    }
    if (this.ssidObjectForm.isRreserved6ghzName) {
      this.showErrorAstrik = false;
      var oldName = this.oldSsidData?.SSID;
      var newName = this.ssidObjectForm?.SSID;
      if (this.six_gSSIDFrequenyBands) {
        if (newName != oldName) {
          this.showErrorAstrik = true;
        }
      }
    }

  }
  changedSSIDName(e) {
    if (e) {
      this.allSsidNames = this.fetchAllSSIDRadioName(this.ssidObjectForm);
      if (!this.ssidObjectForm.isUnifiedPrimary && this.primarySSIDErrorInfo) {
        this.allSsidNames = [];
      }
    }
  }
  passphraseVerifyWarnModalOpen(event, ssidData, type) {


    if (type === "Secondary") {
      this.descriptionforssidlist = ssidData?.networktype + " " + ssidData?.ssid

    }
    else {
      if (ssidData?.SSIDName == 'SSID1' || ssidData?.SSIDName == 'SSID9' || ssidData?.SSIDName == 'SSID17') {
        this.descriptionforssidlist = "Primary" + " " + ssidData?.SSID
      }
      else {
        this.descriptionforssidlist = "Operator" + " " + ssidData?.SSID
      }

    }
    this.listpasspharseaccesspopup = true
    this.checksubvalidate = false;
    this.listpasspharsealertpopup = false
    this.accessPassphrasenable = true
    //this.togglePasswordTable[event] = !this.togglePasswordTable[event];
    this.modalService.open(this.passphraseVerifyWarnModal, { windowClass: 'cus-medium-modal' });
  }
  checksubvalidatechange() {

    if (this.checksubvalidate) {
      this.accessPassphrasenable = false
    } else {
      this.accessPassphrasenable = true
    }
  }
  editaccesspasspharsepopupclose() {
    this.editaccesspasspharsepopup = false
    this.ssidnetworktype = ""
    this.ssidfreetextedit = ""

  }

  editpasspharsealertpopupclose() {
    this.editpasspharsealertpopup = false
  }
  listpasspharsealertpopupclose() {
    this.listpasspharsealertpopup = false
    this.temproryssid = null

    this.modalService.dismissAll()
  }

  accesspopupedit(ssidData) {
    let description = ' '
    if (this.ssidnetworktype === "Secondary") {
      description = ssidData?.networktype + " " + ssidData?.ssid

    }
    else {
      description = this.SSIDNetworkType + " " + ssidData?.SSID
    }

    let freetextforedit
    if (this.Orgacceforssid == 'true') { //secureaccess
      if (this.ssidfreetextedit) {
        freetextforedit = "Passphrase of " + description + " accessed" + " ; " + this.ssidfreetextedit

      }
      else {
        freetextforedit = "Passphrase of " + description + " accessed"

      }

    }
    else {
      freetextforedit = "Passphrase of " + description + " accessed"
    }
    const request = {
      "accessType": this.secureaccessrole,
      "accountId": this.subscriberInfo.subscriberLocationId,
      "accountName": this.subscriberInfo.name,
      "action": "SSID passphrase access",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": this.rgdeviceid,
      "deviceType": this.rgmodelname,
      "objectType": "SSID Edit",
      // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
      "originator": this.loginData.username,
      "description": freetextforedit
    };
    this.loading = true
    this.radioService.Savepasspharseauditlog(request).subscribe(res => {
      this.viewpasspharsevisible = false
      this.editaccesspasspharsepopup = false
      this.loading = false
      this.show = !this.show;
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }, error => {
      this.viewpasspharsevisible = true
      this.editpasspharsealertpopup = true // service call error place paste it 
      this.editaccesspasspharsepopup = false
      this.loading = false
      this.pageErrorHandle(error);
    })
  }

  temproryssid: any;
  accesspopuplist() {

    let freetextforlist
    if (this.Orgacceforssid == 'true') { //secureaccess
      if (this.ssidfreetextlist) {
        freetextforlist = "Passphrase of " + this.descriptionforssidlist + " accessed" + " ; " + this.ssidfreetextlist
      }
      else {
        freetextforlist = "Passphrase of " + this.descriptionforssidlist + " accessed"
      }


    }
    else {
      freetextforlist = "Passphrase of " + this.descriptionforssidlist + " accessed"
    }

    const request = {
      "accessType": this.secureaccessrole,
      "accountId": this.subscriberInfo.subscriberLocationId,
      "accountName": this.subscriberInfo.name,
      "action": "SSID passphrase access",
      "actionTimestamp": this.dateUtils.currentDateToUTC(),
      "deviceId": this.rgdeviceid,
      "deviceType": this.rgmodelname,
      "objectType": "SSID View",
      // "orgId": this.orgidfromlocal,//this.loginData.OrgId,
      "originator": this.loginData.username,
      "description": freetextforlist
    };


    this.loading = true
    this.radioService.Savepasspharseauditlog(request).subscribe(res => {
      this.listpasspharseaccesspopup = false
      this.modalService.dismissAll()
      this.loading = false

      if (this.primaryeventcheck) {
        this.primaryeventcheck = false
        this.togglePasswordTable[this.temproryssid] = !this.togglePasswordTable[this.temproryssid];
      }
      else if (this.secondaryeventcheck) {
        this.secondaryeventcheck = false
        const check = this.temparray.indexOf(this.temproryssid);
        check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(this.temproryssid);

      }
      else {
        this.togglePasswordTable[this.temproryssid] = !this.togglePasswordTable[this.temproryssid];

        const check = this.temparray.indexOf(this.temproryssid);
        check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(this.temproryssid);

      }
    }, error => {
      this.listpasspharsealertpopup = true
      this.listpasspharseaccesspopup = false
      //this.editpasspharsealertpopup = true // service call error place paste it 
      //this.modalService.dismissAll()
      this.loading = false
      this.pageErrorHandle(error);
    })

  }
  cancelpopuplist() {
    this.temproryssid = null
    this.descriptionforssidlist = ""
    this.ssidfreetextlist = ""
    this.modalService.dismissAll()
  }

  onSecondaryKeyPhraseChange(e) {
    if (!(e)) { this.emptypassword = true }
    this.showErrorAstrik = false;
    this.submitbtnEdit = false;
    this.ssidObjectForm.password = e;
    var validKeyPhrase = this.oldSsidData.password;
    this.oldpasswordsecondary = this.oldSsidData.password;
    if (validKeyPhrase && !e) {
      this.showErrorAstrik = true;
      this.submitbtnEdit = true;
    }
  }
  CheckwarningMsg(ssidObForm) {
    this.showSecondaryWarningMessage = false;
    // var ssidfrm = Object.assign({}, this.oldSSIDForm)
    // if (ssidObForm.band24 && ssidObForm.band5 && ssidObForm.band6) {
    //   this.ssidObjectForm.encryptionType = 5;
    // }
    // else {
    //   this.ssidObjectForm.encryptionType = ssidfrm.encryptionType;
    // }
    // if (ssidObjectForm.band6)
    if (ssidObForm?.band6 && (!(ssidObForm?.encryptionType == 5 || ssidObForm?.encryptionType == 6))) {
      this.showSecondaryWarningMessage = true;
    }
  }
  changeSSIDName(e) {
    this.showErrorAstrik = false;
    var oldName = this.oldSsidData?.SSID;
    var password = this.ssidObjectForm.KeyPassphrase
    var newName = e;
    this.ssidObjectForm.SSID = e;
    if (!this.ssidObjectForm.isRreserved6ghzName && this.ssidObjectForm.isUnifiedPrimary) {
      if (newName != oldName) {
        this.showErrorAstrik = true;
      }
      else if (newName == oldName) {
        if (oldpassphrase && password?.length == 0) {
          this.showErrorAstrik = true;
        }

      }
    }
    else if (this.ssidObjectForm.isRreserved6ghzName) {
      // if (this.six_gSSIDFrequenyBands) {
      if (newName != oldName) {
        this.showErrorAstrik = true;
      }
      else if (newName == oldName) {
        if (oldpassphrase && password?.length == 0) {
          this.showErrorAstrik = true;
        }

      }
      // }

    }
    var temp = this.oldSSIDForm
    var oldName = temp?.SSID;
    var newName = this.ssidObjectForm?.SSID;
    var password = this.ssidObjectForm.KeyPassphrase
    var oldSecurityType = temp?.BeaconType;
    var newSecurityType = this.ssidObjectForm?.BeaconType;


    var oldpassphrase = temp?.KeyPassphrase;
    var newPassphrase = this.ssidObjectForm?.KeyPassphrase;
    if (this.SSIDNetworkType == "Operator" && (oldName && (oldName != newName)) || (oldSecurityType && (oldSecurityType != newSecurityType))) {
      if (!password || password?.length == 0) {
        this.showErrorAstrik = true;
      }
    }
    if (oldpassphrase && newPassphrase?.length == 0) {
      this.showErrorAstrik = true;
    }
    else if ((oldName && (oldName != newName))) {
      if (!!password || password?.length == 0) {
        this.showErrorAstrik = true;
      }
    }
    else if ((oldSecurityType && (oldSecurityType != newSecurityType))) {
      if (!password || password?.length == 0) {
        this.showErrorAstrik = true;
      }
    }

  }

  TypeChangeSmbEdit(values) {
    this.frequencybandeditduplicate = true;

    this.prioritizationeditorginal = false;
    this.prioritizationeditduplicate = false;

    this.isolationeditorginal = false;
    this.isolationeditduplicate = false;
  }

  individualPasswordsPopUP: any;
  updateSMBSSID(smbForm: NgForm) {
    if (smbForm.valid) {
      var ssidObjectForm = JSON.parse(JSON.stringify(this.ssidObjectForm));
      //var service = ssidObjectForm.enabledStatus;
      var oldName = this.oldSsidData?.name;
      var newName = ssidObjectForm?.name;
      if (ssidObjectForm?.type == 2 && ssidObjectForm?.passwordMode == 2 && newName != oldName) {
        this.individualPasswordsPopUP = this.dialogService.open(this.individualPasswordsModal, { size: 'xl', centered: true, windowClass: 'deleteImageModal-info' });
      }
      else {
        this.updateStaffSSID();
      }
    }
  }
  updateStaffSSID() {
    if (this.ssidObjectForm.password == null || this.ssidObjectForm.password == "") {
      this.ssidObjectForm.password = "";
    }
    // console.log(this.ssidObjectForm);
    this.ssidObjectForm.name = this.ssidObjectForm.name.trim();
    this.ssidObjectForm.smbWifiNetworkType = this.ssidObjectForm.type;
    this.ssidObjectForm.schedules = this.schedules;
    this.ssidObjectForm.schedules = this.schedules;
    let ssidObjectForm: any = JSON.parse(JSON.stringify(this.ssidObjectForm));
    ssidObjectForm.hidden = !ssidObjectForm.hidden;
    var service = ssidObjectForm.enabledStatus;
    var smbSSID = {
      "name": ssidObjectForm.name,
      "password": ssidObjectForm.password,
      "isolated": ssidObjectForm.clientIsolated,
      "smbWifiNetworkType": ssidObjectForm.type,
      "hidden": ssidObjectForm.hidden,
      "schedules": ssidObjectForm.schedules,
      "isSmbSSID": true,
      "secType": ssidObjectForm.securityType
    }
    const body = JSON.stringify(smbSSID);
    this.dataService.updateSMBssidpolling(this.orgId, this.serialNumber, body).subscribe(res => {

      if (!service) {
        this.DeleteSMBSSID()
      }
      else {
        this.closeModal();
        setTimeout(() => {
          this.loading = true;
          this.fetchSSIDListValues(this.orgId, this.serialNumber);

        }, 1000);
      }
    }, error => {
      this.ssidObjectForm = [];
      this.closeModal();
      this.loading = false
      this.showError = true;
      this.errorMsg = error.errorDesc;
      this.pageErrorHandle(error);
    })
  }
  closeStaffModal() {
    var oldName = this.oldSsidData?.name;
    this.ssidObjectForm.name = oldName;
    // this.closeModal();

  }


  DeleteSMBSSID() {
    var type = this.ssidObjectForm.type;
    this.dataService.deleteSMBSSID(this.serialNumber, type).subscribe(res => {
      this.closeModal();
      setTimeout(() => {
        //  this.loading = true;
        this.fetchSSIDListValues(this.orgId, this.serialNumber);

      }, 1000);
    }, error => {
      this.ssidObjectForm = [];
      this.closeModal();
      this.loading = false
      this.showError = true;
      this.errorMsg = error.errorDesc;
      this.pageErrorHandle(error);
    })
  }
  updateCaptivePortalSMBSSID(smbForm: NgForm) {
    this.getCaptivePortal();
  }
  portalDetail: any;
  getCaptivePortal() {
    this.loading = true;
    this.captivePortalService.getCaptivePortal(localStorage.getItem('ciquserid')).subscribe((res: any) => {
      this.loading = false;
      this.portalDetail = res;
      if (res) {
        this.ssidObjectForm.name = this.ssidObjectForm.name.trim();
        this.setCaptivePortal();
      }

    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });

  }
  setCaptivePortal() {
    this.portalDetail.ssid = this.ssidObjectForm.name;
    const inp = {
      "userId": localStorage.getItem('ciquserid'),
      "portalId": this.portalDetail.portalId,
      "ssid": this.portalDetail.ssid,
      "title": this.portalDetail.title,
      "smbWifiNetworkType": 3,
      "termsUrl": this.portalDetail.termsUrl,
      "buttonText": this.portalDetail.buttonText,
      "bgColor": this.portalDetail.bgColor,
      "fColor": this.portalDetail.fColor,
      "pbColor": this.portalDetail.pbColor,
      "bfColor": this.portalDetail.bfColor,
      "loginRetentionDays": this.portalDetail.loginRetentionDays,
      "schedules": JSON.stringify(this.portalDetail.schedules),
      "coverImage": this.portalDetail.coverImage,
      "logoImage": this.portalDetail.logoImage
    }

    const formData = new FormData();
    Object.keys(inp).forEach(inpKey => {
      formData.append(inpKey, inp[inpKey]);
    });

    this.captivePortalService.setCaptivePortal(formData).subscribe((res) => {

      this.closeModal();
      setTimeout(() => {
        //  this.loading = true;
        this.fetchSSIDListValues(this.orgId, this.serialNumber);

      }, 1000);
    }, err => {
      this.loading = false;
      this.closeModal();
      this.pageErrorHandle(err);
    });
  }
  selectedCar: number;

  cars = [
    { id: 1, name: 'Always On' },
    { id: 2, name: 'Every Day' },
    { id: 3, name: 'Custom' },

  ];
  networkAccessPopup: any;
  openAddNetworkAccessPopup(modal) {
    this.formSubmitted = false;
    this.disableAddButton = true;
    this.errorMessage = '';
    this.initNewSchedule();
    this.networkAccessPopup = this.dialogService.open(modal, { size: 'xl', centered: true, windowClass: 'add-network-access' });
    //this.closeModal();
  };

  // Schedules for SMB
  form: FormGroup;
  disableAddButton = false;
  formSubmitted = false;
  duplicateTimeRangeError = false;
  networkAccessType = 'Always';
  errorMessage = '';
  networkAccess = [];
  days = [];
  formattedSchedules = [];
  newSchedule = {
    selectedDays: [],
    enabled: true,
    startTime: new Date(),
    stopTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
  }
  schedules: any = [];
  scheduleFormArray: any = [];
  maxDate = new Date('2023/7/18 11:58:00 pm');
  get startTimeString() {
    return this.newSchedule.startTime ? this.getDateString(this.newSchedule.startTime) : '';
  }

  get stopTimeString() {
    return this.newSchedule.stopTime ? this.getDateString(this.newSchedule.stopTime) : '';
  }
  initStaffSchedules(schedules: any) {
    this.networkAccessType = 'Always';
    if (schedules?.length > 0) {
      this.schedules = JSON.parse(JSON.stringify(schedules));
      this.scheduleFormArray = JSON.parse(JSON.stringify(schedules))
    }
    else {
      this.schedules = [];
      this.networkAccessType = 'Always';
    }

    // this.form = null;
    this.networkAccess = [
      {
        id: 'Always',
        name: 'Always On',
        label: this.language['Always_On'],
      },
      {
        id: 'Everyday',
        name: 'Everyday',
        label: this.language['everyDay'],
      },
      {
        id: 'Custom',
        name: 'Custom',
        label: this.language['Custom'],
      }
    ];
    this.days = [
      { id: 'mon', name: 'Monday', label: this.language['Monday'], timeRanges: [] },
      { id: 'tue', name: 'Tuesday', label: this.language['Tuesday'], timeRanges: [] },
      { id: 'wed', name: 'Wednesday', label: this.language['Wednesday'], timeRanges: [] },
      { id: 'thu', name: 'Thursday', label: this.language['Thursday'], timeRanges: [] },
      { id: 'fri', name: 'Friday', label: this.language['Friday'], timeRanges: [] },
      { id: 'sat', name: 'Saturday', label: this.language['Saturday'], timeRanges: [] },
      { id: 'sun', name: 'Sunday', label: this.language['Sunday'], timeRanges: [] },
    ];
    this.formSubmitted = false;
    this.initNewSchedule();
    this.formatSchedules();
  }
  getDateString(date) {
    let hours = String(date.getHours() ? (String(date.getHours()).length == 1 ? '0' + date.getHours() : date.getHours()) : '00');
    let minutes = String(date.getMinutes() ? (String(date.getMinutes()).length == 1 ? '0' + date.getMinutes() : date.getMinutes()) : '00');
    return hours + minutes;
  }

  networkChange() {
    this.submitbtnEdit = false;
    this.formattedSchedules = [];
    if (this.networkAccessType && (this.networkAccessType == 'Always' || this.networkAccessType == 'Everyday')) {
      this.initNewSchedule();
      this.addSchedule(false);
      return;
    }

    this.scheduleFormArray = [];
    this.days.forEach((day: any) => {
      let newScheduleFormGroup = {
        timeRanges: [{
          startTime: '0000',
          stopTime: '2359'
        }],
        weekDays: day.id
      };
      newScheduleFormGroup.weekDays = day.id;
      this.scheduleFormArray.push(newScheduleFormGroup);
      this.schedules = this.scheduleFormArray;
    });
    this.initNewSchedule();
    this.formatSchedules();
  }

  initNewSchedule() {
    this.errorMessage = '';
    this.duplicateTimeRangeError = false;
    this.newSchedule = {
      selectedDays: [],
      enabled: true,
      startTime: new Date(),
      stopTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
    }
  }

  formatSchedules() {
    this.days = [];
    this.days = [
      { id: 'mon', name: 'Monday', label: this.language['Monday'], timeRanges: [] },
      { id: 'tue', name: 'Tuesday', label: this.language['Tuesday'], timeRanges: [] },
      { id: 'wed', name: 'Wednesday', label: this.language['Wednesday'], timeRanges: [] },
      { id: 'thu', name: 'Thursday', label: this.language['Thursday'], timeRanges: [] },
      { id: 'fri', name: 'Friday', label: this.language['Friday'], timeRanges: [] },
      { id: 'sat', name: 'Saturday', label: this.language['Saturday'], timeRanges: [] },
      { id: 'sun', name: 'Sunday', label: this.language['Sunday'], timeRanges: [] },
    ];
    //}

    let ranges = [];
    this.formattedSchedules = this.days;
    let schedules = this.schedules;

    schedules.forEach((schedule: any, i) => {
      let timeRanges = [];

      schedule.timeRanges.forEach(time => {
        const range = String(time.startTime) + String(time.stopTime);
        const timeRange = {
          startTime: this.formatTime(range.substring(0, 2) + ',' + range.substring(2, 4), 'string'),
          stopTime: this.formatTime(range.substring(4, 6) + ',' + range.substring(6, 8), 'string'),
        }
        if (range != '00002359') {
          timeRanges.push(timeRange);
        }
        if (!ranges.includes(range)) ranges.push(range);
      });

      let existingDay = this.formattedSchedules.find(day => day.id == schedule.weekDays);
      existingDay['timeRanges'] = timeRanges;
    });

    ranges.forEach(range => {
      let days = [];
      schedules.forEach(schedule => {
        schedule.timeRanges.forEach(time => {
          if (range == String(time.startTime) + String(time.stopTime)) days.push(schedule.weekDays);
        });
      });

      let scheduledDays = days.sort().join(',');
      let allDays = this.days.map(day => {
        return day.id;
      }).sort().join(',');

      if (scheduledDays == allDays && this.networkAccessType && this.networkAccessType != 'Custom') {
        if (ranges.length == 1 && (ranges[0] == '00002359')) {
          this.networkAccessType = 'Always';
        } else {
          this.networkAccessType = 'Everyday';
          this.newSchedule.startTime = this.formatTime(range.substring(0, 2) + ',' + range.substring(2, 4), 'object');
          this.newSchedule.stopTime = this.formatTime(range.substring(4, 6) + ',' + range.substring(6, 8), 'object');
        }
      } else {
        this.networkAccessType = 'Custom';
      }
    });
    this.submitbtnEdit = false;
  }

  formatTime(timeString, returnType): any {
    let hours = timeString.split(',').shift();
    let minutes = timeString.split(',').pop();
    if (hours == '00' && minutes == '00' && this.networkAccessType != 'Everyday') {
      return '0000';
    }
    let date = new Date('1/1/1 ' + hours + ':' + minutes + ':00');
    if (returnType == 'object') {
      return date;
    }
    return moment(date).format('hh:mm A');
  }

  addSchedule(closeModal) {
    this.formSubmitted = true;

    if (this.networkAccessType == 'Custom' && !this.newSchedule.selectedDays.length) return;
    this.disableAddButton = true;

    let timeRange = {
      startTime: this.startTimeString,
      stopTime: this.stopTimeString
    };
    if (this.networkAccessType == 'Always') {
      this.scheduleFormArray = [];
      this.days.forEach((day: any) => {
        let newScheduleFormGroup = {
          timeRanges: [{
            startTime: '0000',
            stopTime: '2359'
          }],
          weekDays: day.id
        };
        newScheduleFormGroup.weekDays = day.id;
        this.scheduleFormArray.push(newScheduleFormGroup);
        this.schedules = this.scheduleFormArray;
      });
    }
    else if (this.networkAccessType == 'Everyday') {
      this.scheduleFormArray = [];
      this.days.forEach((day: any) => {
        let newScheduleFormGroup = {
          timeRanges: [timeRange],
          weekDays: day.id
        }
        newScheduleFormGroup.weekDays = day.id;
        this.scheduleFormArray.push(newScheduleFormGroup);
        this.schedules = this.scheduleFormArray;
      });
    } else if (this.networkAccessType == 'Custom') {
      this.submitbtnEdit = true;
      this.newSchedule.selectedDays.forEach((day: any) => {
        let existingSchedule = this.schedules.find(schedule => schedule.weekDays == day);
        if (existingSchedule) {
          if (timeRange.startTime == '0000' && timeRange.stopTime == '0000') {
            existingSchedule.timeRanges = [];
          }
          if (existingSchedule.timeRanges.find(timeRange => timeRange.startTime == '0000' && timeRange.stopTime == '0000')) {
            existingSchedule.timeRanges = [];
          }
          if ((existingSchedule.timeRanges.length == 1) && existingSchedule.timeRanges.find(timeRange => timeRange.startTime == '0000' && timeRange.stopTime == '2359')) {
            existingSchedule.timeRanges = [];
          }
          existingSchedule.timeRanges.push(timeRange);
          this.scheduleFormArray = this.schedules;
        } else {
          let newScheduleFormGroup = {
            timeRanges: [timeRange],
            weekDays: day
          };
          newScheduleFormGroup.weekDays = day;
          this.scheduleFormArray.push(newScheduleFormGroup);
        }
      });
      if (this.scheduleFormArray?.length > 0) {
        this.schedules = this.scheduleFormArray;
      }
      this.formatSchedules();
    }


    if (!closeModal) {
      if (this.networkAccessType == 'Custom') {
        this.formSubmitted = false;
        this.initNewSchedule();
      }

      return;
    }
  }

  validateDays() {
    if (this.networkAccessType != 'Custom') return;

    this.disableAddButton = true;
    this.errorMessage = '';
    this.duplicateTimeRangeError = false;

    if (this.newSchedule.selectedDays.length) {
      this.disableAddButton = false;
      if (!this.newSchedule.enabled) return;
    }
    if (this.formattedSchedules.length == 0) return;

    this.newSchedule.selectedDays.forEach((day: any) => {
      let dayExists = this.schedules.find(schedule => schedule.weekDays == day);
      if (dayExists.timeRanges[0].startTime == '0000' && dayExists.timeRanges[0].stopTime == '2359') {
        return;
      }

      if (dayExists) {
        if (dayExists.timeRanges.length == 5) {
          this.errorMessage = `${this.language['Sorry, you can set up to five network access hour time slots each day']}`;
          this.disableAddButton = true;
          return;
        }

        dayExists.timeRanges.forEach((timeRange: any) => {
          if (
            (this.startTimeString >= timeRange.startTime && this.startTimeString <= timeRange.stopTime) ||
            (this.stopTimeString >= timeRange.startTime && this.stopTimeString <= timeRange.stopTime) ||
            (timeRange.startTime >= this.startTimeString && timeRange.startTime <= this.stopTimeString) ||
            (timeRange.stopTime >= this.startTimeString && timeRange.stopTime <= this.stopTimeString)
          ) {
            this.disableAddButton = true;
            this.duplicateTimeRangeError = true;
            return;
          };
        })
      }
    });
  }



  calcualteStopTime(type = 'set') {
    if (this.newSchedule.startTime) {
      let maxDate = new Date(this.newSchedule.startTime);
      maxDate.setHours(23);
      maxDate.setMinutes(58);
      this.maxDate = new Date(maxDate);

      const startTimeCopy = new Date(this.newSchedule.startTime);
      let stopTime = new Date(startTimeCopy.setMinutes(startTimeCopy.getMinutes() + 1));
      if (type == 'get') {
        return stopTime;
      }
      this.newSchedule.stopTime = stopTime;
    }
  }


  getMinDate() {
    if (this.newSchedule.startTime) {
      const startTimeCopy = new Date(this.newSchedule.startTime);
      return new Date(startTimeCopy.setMinutes(startTimeCopy.getMinutes() + 1));
    }
  }

  getTimeString(timeRange) {
    if (timeRange.startTime == '0000' && timeRange.stopTime == '0000') {
      return this.language['Network Disabled'];
    }
    return (parseInt(timeRange.startTime) ? timeRange.startTime : '12:00 AM') + ' to ' + (parseInt(timeRange.stopTime) ? timeRange.stopTime : '12:00 AM');
  }

  disabledNetworkAccess() {
    if (!this.newSchedule.enabled) {
      this.newSchedule.startTime = new Date('1/1/1 ' + '00:00:00');
      this.newSchedule.stopTime = new Date('1/1/1 ' + '00:00:00');
    } else {
      this.newSchedule.startTime = new Date();
      this.newSchedule.stopTime = new Date(new Date().setMinutes(new Date().getMinutes() + 1));
    }
    this.validateDays();
  }

  deleteNetworkAccess(dayId, networkAccessIndex) {
    let dayIndex = this.schedules.findIndex(schedule => schedule.weekDays == dayId);
    const data = this.schedules?.filter(schedule => schedule.weekDays == dayId);
    if (data?.length > 0) {
      const timeRanges = data[0].timeRanges;
      if (timeRanges?.length > 1) {
        this.schedules[dayIndex]?.timeRanges?.splice(networkAccessIndex, 1);
        this.scheduleFormArray = this.schedules;
      }
      else {
        this.scheduleFormArray[dayIndex].timeRanges = [{
          startTime: '0000',
          stopTime: '2359'
        }]

        this.networkAccessType = 'Always';

      }
      this.schedules = this.scheduleFormArray
      //this.scheduleFormArray = this.schedules;
    }
    this.formatSchedules();
    this.validateDays();

  }

}





