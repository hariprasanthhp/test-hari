import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../../data.service';
import { DataSerialNumberModel } from '../../shared/models/data.serial-number.model';
import { EncryptionModes } from '../../shared/models/encrption-modes-model';
import { MetaData } from '../../shared/models/meta-data.model';
import { MetaField } from '../../shared/models/ssid-meta-fields.model';
import { SupportRadioObjectModel } from '../../shared/models/support-radio-object.model';
import { SubscribeService } from '../../shared/service/subscriber.service';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import {
  checkMultileFrequency, cleanArray, cleanObject, constructEncryptionObject, constructEncyptionModeValues,
  constructSecurityValues, CreateMetaFieldObject, deleteFromObject, fetchRadioEncryption, FetchSecurityOptionsFromSSIDMeta, NamePatternError,
  seperateRadioList,
  ssidMetaPattern, SSIDNamePattern
} from '../../shared/service/utility.class';
import { SupportWifiService } from '../services/support-wifi.service';
import { CalendarModule } from 'primeng/calendar';
import { Title } from '@angular/platform-browser';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service'

@Component({
  selector: 'app-ssid',
  templateUrl: './ssid.component.html',
  styleUrls: ['./ssid.component.scss'],
  providers: [SupportRadioService, SsoAuthService]
})
export class SSIDComponent implements OnInit {

  @ViewChild('editModal', { static: true }) private editModal: TemplateRef<any>;
  @ViewChild('passphraseVerifyWarnModal', { static: true }) private passphraseVerifyWarnModal: TemplateRef<any>;

  language: any;
  languageSubject;
  orgId: string;
  deviceData: DataSerialNumberModel[];
  showList: boolean = false;
  isRgWfifiAvailable: boolean = false;
  serialNumber: string;
  ssidObject: SupportRadioObjectModel[] = [];
  ssidObjectForm: SupportRadioObjectModel;
  modalTitle: string;
  modalInfo: string;
  modalRef: any;
  security: any = [];
  encryption: EncryptionModes[] = [];
  encryptionMetaModes: EncryptionModes[];
  showPassword: string = "password";
  loading: boolean = false;
  public errorMsg: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMsg: string;
  dialogErrorMsg: string;
  scopes: String;
  hasWriteAccess: boolean = false;
  namePatternError = NamePatternError;
  ssidNamePattern = SSIDNamePattern;
  allSsidNames = [];
  deviceDropDown: DataSerialNumberModel[] = [];
  showPassPhrase: boolean = false;
  togglePasswordTable: boolean[] = [];
  metaData: MetaData;
  selectedMetaObj: any = {}
  oldPassword: string;
  selectedEncryption: any;
  editedSecurity: any = [];
  deviceWoRG = [];
  deviceList = [];
  // date
  datefrom: Date;
  dateto: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>
  showPassPhraseOldModel: boolean = false
  temparray = []
  deviceInfo
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
  hasPassPhraseAccess: boolean = false;
  hasSSIDCreate: boolean = false;
  hasSSIDEdit: boolean = false;
  bSmb: boolean = false;
  oldpasswordforprimary

  constructor(private translateService: TranslateService, private radioService: SupportRadioService,
    private ssoAuthService: SsoAuthService, private dialogService: NgbModal, private modalService: NgbModal, private subscriberService: SubscribeService,
    private api: SupportWifiService, private dataService: DataServiceService, private service: DataServiceService, private titleService: Title, private dateUtils: DateUtilsService
  ) {
    this.orgId = this.ssoAuthService.getOrgId();
    this.deviceData = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    this.scopes = this.ssoAuthService.getScopes();
    this.api.ssidPageLoaded('ssid');
    this.ssoAuthService.setActionLog('CSC', 'pageHit', 'SSID MANAGER', '/support/wifi/ssid', 'WiFi SSID Manager page loaded');
  }

  ngOnInit(): void {
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

      this.scopes['cloud.rbac.csc.ssidmanager'] = this.scopes['cloud.rbac.csc.ssidmanager'] ? this.scopes['cloud.rbac.csc.ssidmanager'] : [];
      this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] = this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] ? this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'] : [];
      this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] = this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] ? this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'] : [];

      if (this.scopes && (this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate']) && this.scopes['cloud.rbac.csc.ssidmanager.ssidcreate'].indexOf('write') !== -1) {
        this.hasSSIDCreate = true;
      }
      if (this.scopes && (this.scopes['cloud.rbac.csc.ssidmanager.ssidedit']) && this.scopes['cloud.rbac.csc.ssidmanager.ssidedit'].indexOf('write') !== -1) {
        this.hasSSIDEdit = true;
      }

    } else {
      this.hasWriteAccess = true;
      this.hasSSIDEdit = true;
      this.hasSSIDCreate = true;
      this.hasPassPhraseAccess = true;
    }

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['SSID_Manager']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`); //Calix Cloud - Support - Wi-Fi - SSID Manager
    });
    this.titleService.setTitle(`${this.language['SSID_Manager']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`); //Calix Cloud - Support - Wi-Fi - SSID Manager

    // for loading first RG router
    this.deviceData?.forEach((element: DataSerialNumberModel) => {
      this.deviceList = [];
      if (element.opMode == "RG") {
        //this.deviceDropDown.push(new DataSerialNumberModel(element));
        this.serialNumber = element.serialNumber
        this.api.getRadioSummary(this.orgId, this.serialNumber).subscribe((res) => {
          if (res && Object.keys(res)?.length) {

            console.log('122', res['2.4G']?.RadioEnabled);
            if (res['2.4G'] && Object.keys(res['2.4G'])?.length && res['2.4G']?.RadioEnabled == true) {

              this.isRgWfifiAvailable = true;
            }
            if (res['5G'] && Object.keys(res['5G'])?.length && res['5G']?.RadioEnabled) {

              this.isRgWfifiAvailable = true;
            }
            if (res['6G'] && Object.keys(res['6G'])?.length && res['6G']?.RadioEnabled) {

              this.isRgWfifiAvailable = true;
            }
          }

          if ((!this.serialNumber || !this.isRgWfifiAvailable) && this.deviceData && this.deviceData?.length) {

            this.deviceWoRG = this.deviceData.filter(device => device.opMode);
            this.deviceWoRG = this.deviceWoRG.sort((a, b) => { return a.opMode - b.opMode });
            this.serialNumber = this.deviceWoRG ? this.deviceWoRG[0].serialNumber : '';
            this.deviceList = [];
            this.deviceWoRG.map((e, i) => {
              if (e.opMode == "RG") {
                this.deviceList.push({ id: e.serialNumber, name: '' })
              } else {
                this.deviceList.push({ id: e.serialNumber, name: e.serialNumber })
              }
            })
          }
          this.deviceList = this.deviceList.sort((a, b) => { return a.opMode?.length - b.opMode?.length });
          this.deviceList?.length > 1 ? this.showList = true : this.showList = false;
        }, (err) => {

          this.pageErrorHandle(err);
        })
      }
    });
    if (!this.serialNumber && this.deviceData && this.deviceData?.length) {

      this.deviceWoRG = this.deviceData.filter(device => device.opMode);
      this.serialNumber = this.deviceWoRG ? this.deviceWoRG[0].serialNumber : '';
      this.deviceList = [];
      this.deviceWoRG.map((e, i) => {
        this.deviceList.push({ id: e.serialNumber, name: e.serialNumber })
      })
      this.deviceList?.length > 1 ? this.showList = true : this.showList = false;
    }

    /*  Do not delete may be used in future  */
    /* console.log("serial Number=>",this.serialNumber)
     if(!this.serialNumber){
       this.deviceData.forEach((element:DataSerialNumberModel) => {
           this.deviceDropDown.push(new DataSerialNumberModel(element));
           this.serialNumber = element.serialNumber
       });
     }  */

    if (this.serialNumber) {
      this.loading = true;
      this.fetchMetaData(this.serialNumber, true);
    }
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
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
    this.orgidfromlocal = localStorage.getItem('calix.org_id') ? localStorage.getItem('calix.org_id') : ' ';
    //this.togglePasswordTable.manufacturer=devicedatafromsession.manufacturer

    this.editaccesspasspharsepopup = true;
    let isbSmb = false;
    this.subscriberInfo?.devices?.forEach(obj => {
      if (obj.bSmbMode) isbSmb = true;
    });
    this.bSmb = (this.subscriberInfo?.isSmbOnboarded && isbSmb) ? true : false;

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

  }

  fetchMetaData(serialNumber, chkSerialNumber = true) {
    if (!serialNumber) return;
    this.dataService.fetchMetaData(this.orgId, serialNumber).subscribe((res: any) => {

      this.security = constructSecurityValues(res);

      this.metaData = res;
      if (this.security?.length == 0) {
        this.loading = false;
        /*this.deviceDropDown = [];
        this.deviceData.forEach((element: DataSerialNumberModel) => {
          if (this.serialNumber != element.serialNumber) {
            this.deviceDropDown.push(new DataSerialNumberModel(element));
          }
        });
        console.log("device dropdown1=>", this.deviceDropDown);
        this.deviceDropDown?.length > 1 ? this.showList = true : this.showList = false;
        if (this.deviceDropDown && this.deviceDropDown?.length != 0) {
          this.serialNumber = this.deviceDropDown[0].serialNumber;
          this.fetchMetaData(this.serialNumber);
        } else {
          this.loading = false;
        }*/
      } else {
        //this.fetchSSIDManagerList();
      }
      this.fetchSSIDManagerList(false, chkSerialNumber);

    }, err => {
      this.loading = false;
      this.pageErrorHandle(err);
    });
  }
  ssidListCount: boolean = true;
  // chkSerialNumber: boolean = true;
  fetchSSIDManagerList(isRefreshed = false, chkSerialNumber) {
    if (this.serialNumber) {
      //this.serialNumber="CXNK008A79B1";

      //getSSIDManagerList
      this.loading = true
      this.radioService.fetchMetaDatavaluesNew(this.orgId, this.serialNumber, isRefreshed).subscribe((res: SupportRadioObjectModel[]) => {
        if (res) this.ssidListCount = false;
        let temp = this.initializeSsidList(res);
        let tempOn = temp.filter(x => x.Enable == true).sort((a, b) => (+a.id - +b.id));
        let overflowApi = this.service.getSubscriberTabInfoData();
        // console.log("1111",overflowApi)
        if (overflowApi && tempOn && overflowApi.networkStatus.ssid.activeSSIDCount) {
          overflowApi.networkStatus.ssid.activeSSIDCount = tempOn?.length ? tempOn?.length : 0;
          // this.service.setSubscriberTabInfoData(overflowApi);
        } else {
          const obj = {
            networkStatus: {
              ssid: {
                activeSSIDCount: tempOn ? tempOn?.length : 0
              }
            }
          }
          // this.service.setSubscriberTabInfoData(obj);
          // overflowApi.networkStatus.ssid['activeSSIDCount'] = tempOn?.length ? tempOn?.length : 0;
          // this.service.setSubscriberTabInfoData(overflowApi);
        }
        $('.ssidcount').text(tempOn ? tempOn?.length.toString() : 0);
        let tempOff = temp.filter(x => x.Enable == false).sort((a, b) => (+a.id - +b.id));
        this.ssidObject = [];
        /*if (this.deviceWoRG?.length > 1) {
          this.ssidObject = this.ssidObject && this.ssidObject?.length
            ? [...this.ssidObject, ...tempOn.concat(tempOff)]
            : tempOn.concat(tempOff);
          const currSnIndx = this.deviceWoRG.findIndex(wap => wap.serialNumber == this.serialNumber);
          if ((currSnIndx + 1) <= this.deviceWoRG?.length) {
            this.serialNumber = this.deviceWoRG[(currSnIndx + 1)].serialNumber;
            this.fetchSSIDManagerList();
          }
        } else {
          this.ssidObject = tempOn.concat(tempOff);
        }*/
        this.ssidObject = tempOn.concat(tempOff);
        let combined: any;
        combined = this.ssidObject = tempOn.concat(tempOff);
        combined.forEach(el => {
          // if (el.Enable) {
          //   if (el.Enable == "true") {
          //     el.Enable = true;
          //   }
          //   else {
          //     el.Enable = false;
          //   }

          // }

          // if (el.SSIDAdvertisementEnabled) {
          //   if (el.SSIDAdvertisementEnabled == "true") {
          //     el.SSIDAdvertisementEnabled = true;
          //   }
          //   else {
          //     el.SSIDAdvertisementEnabled = false;
          //   }
          // }


          // if (el.Enable) {
          //   if (el.Enable == "true") {
          //     el.Enable = true;
          //   }
          //   else {
          //     el.Enable = false;
          //   }

          // }

          // if (el.SSIDAdvertisementEnabled) {
          //   if (el.SSIDAdvertisementEnabled == "true") {
          //     el.SSIDAdvertisementEnabled = true;
          //   }
          //   else {
          //     el.SSIDAdvertisementEnabled = false;
          //   }
          // }



          if (el.KeyPassphrase) {
            // el.password = el.KeyPassphrase.replace(/[*]/g, '');
            el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');
          }
          if (el.PRConfig != null) {
            if (el.PRConfig.KeyPassphrase) {
              el.PRConfig.KeyPassphrase = el.PRConfig.KeyPassphrase;
            }
            else {
              //  el.password = el.KeyPassphrase;
              if (el.KeyPassphrase)
                el.KeyPassphrase = el.KeyPassphrase.replace(/[*]/g, '');

            }
          }
          // if (el.password == "" || el.password == "(null)") {
          //   el.password = "";
          // }

        });
        this.ssidObject = combined;

        if (this.showList && this.hasWriteAccess) {
          let tempSerialNumber = (this.deviceWoRG && this.deviceWoRG?.length >= 2) ? this.deviceWoRG[1].serialNumber : '';

          if (chkSerialNumber && this.ssidObject?.length == 0) {
            let event = { id: tempSerialNumber }
            if (this.serialNumber != tempSerialNumber) {
              this.serialNumber = tempSerialNumber;

              this.deviceDataNumberChanged(event);
            }
            // else {
            //   this.chkSerialNumber = false;
            // }

          }
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


  pageErrorHandle(err: any) {
    this.showError = true;
    if (err.status === 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
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
      } else if ((x.freqBand == "5GHz")) {
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
    if (result) {
      let res = result["primary-operator-ssid"]

      if (res?.length > 0) {
        res.forEach((res, index) => {
          this.togglePasswordTable.push(false);
          returnResult.push(new SupportRadioObjectModel(res));
        })
      }

    }

    return returnResult;
  }

  deviceDataNumberChanged(event) {

    this.serialNumber = event.id;
    this.fetchMetaData(this.serialNumber, false);
  }
  KeyPassphraseRequired: boolean = false;
  ssidnetworktype;
  editSSID(event: SupportRadioObjectModel) {
    this.editaccesspasspharsepopup = false;
    this.checksubvalidate = false;
    this.accessPassphrasenable = true;
    this.editpasspharsealertpopup = false
    this.viewpasspharsevisible = true
    this.showPassPhraseOldModel = false

    if (event.PRConfig && event.PRConfig.KeyPassphrase) {
      event.KeyPassphrase = event.PRConfig.KeyPassphrase
      this.oldPassword = event.PRConfig.KeyPassphrase;
    } else {
      this.oldPassword = event.KeyPassphrase;
    }
    // this.KeyPassphraseRequired = false;
    this.ssidObjectForm = new SupportRadioObjectModel(event);

    this.allSsidNames = this.fetchAllSSIDRadioName(event);
    let ssidMetaData: MetaField[] = this.metaData.properties.filter(x => x.featureName.match(ssidMetaPattern))

    this.selectedMetaObj = CreateMetaFieldObject(this.ssidObjectForm, ssidMetaData, this.ssidObject)

    this.editedSecurity = FetchSecurityOptionsFromSSIDMeta(this.ssidObjectForm, ssidMetaData, this.security)
    this.constructEditSSIDData(this.ssidObjectForm);
    this.dialogErrorMsg = this.language['SSID_Note'];
    this.oldSsidData = Object.assign({}, this.ssidObjectForm);
    // this.dialogErrorMsg = "Updating the WiFi Passphrase may take approximately 10 seconds, during which the new passphrase will not show up here!";
    this.closeModal();
    this.modalRef = this.dialogService.open(this.editModal, { windowClass: 'edit-sside-new' });
    // this.modalRef = this.dialogService.open(this.editModal, { size: 'lg', windowClass: 'custom-xl-modal' });
  }
  fetchAllSSIDRadioName(selectedSSID: SupportRadioObjectModel) {
    let returnAllNames = [];
    let selectedRadioFreq = "";
    let seperatedList = [];
    //deepcopy
    let allSSID = JSON.parse(JSON.stringify(this.ssidObject))
    selectedRadioFreq = selectedSSID.freqBand;
    //checking the frequency list
    if (selectedRadioFreq == '2.4GHz') {
      seperatedList = seperateRadioList(allSSID)['2.4G']
    }
    else if (selectedRadioFreq == '5GHz') {
      seperatedList = seperateRadioList(allSSID)['5G']
    }
    else {
      seperatedList = seperateRadioList(allSSID)['6G']
    }

    //  else {
    //   seperatedList = seperateRadioList(allSSID)['5G']
    // }
    returnAllNames = seperatedList.filter(x => selectedSSID.id != x.id).map(x => x.SSID)
    //removing null values
    returnAllNames = cleanArray(returnAllNames)
    return returnAllNames;
  }


  constructEditSSIDData(event: SupportRadioObjectModel) {
    this.encryptionMetaModes = constructEncyptionModeValues(this.metaData, event.BeaconType);
    if (event.BeaconType) {
      this.metaData.properties.forEach(res => {
        if (res.featureName == "SecurityOptions") {
          if (res.configuration) {
            if (res.configuration['WPA3-SAE'] && res.configuration['WPA3-SAE']["BeaconType"] == event.BeaconType) {
              this.selectedEncryption = this.ssidObjectForm.WPAEncryptionModes;
            }
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
      }
      else if (event.freqBand.match("5GHz")) {
        this.encryption = fetchRadioEncryption("5G", this.encryptionMetaModes).name;
      }
      else {
        this.encryption = fetchRadioEncryption("6G", this.encryptionMetaModes).name;
      }
      // else {
      //   this.encryption = fetchRadioEncryption("5G", this.encryptionMetaModes).name;
      // }
    } else {
      this.encryption = this.encryptionMetaModes;

    }
  }
  oldSsidData: any;

  updateSsidManager() {
    this.closeModal();
    this.loading = true
    //cleanObject(this.ssidObjectForm);
    if (this.ssidObjectForm.PRConfig && this.ssidObjectForm.PRConfig.KeyPassphrase) {
      this.ssidObjectForm.KeyPassphrase = this.ssidObjectForm.PRConfig.KeyPassphrase
    }
    // if (this.oldSsidData.PRConfig && this.oldSsidData.PRConfig.KeyPassphrase) {
    //   this.oldSsidData.KeyPassphrase = this.oldPassword
    // }

    this.oldSsidData.KeyPassphrase = this.oldPassword

    deleteFromObject(this.ssidObjectForm, 'PRConfig');
    deleteFromObject(this.oldSsidData, 'PRConfig');


    let keys = Object.keys(this.ssidObjectForm);
    let values = Object.values(this.ssidObjectForm);
    let oldVlaues = Object.values(this.oldSsidData);

    if (keys?.length > 0) {
      for (let i = 0; i < values?.length; i++) {
        if (keys[i] != "id") {
          if (oldVlaues[i] == values[i]) {
            deleteFromObject(this.ssidObjectForm, keys[i]);
          }
        }


      }
    }
    this.radioService.updateSSIDConfigList(this.ssidObjectForm, this.orgId, this.serialNumber).subscribe(res => {
      // this.showSuccess = true;
      // this.successMsg = "successfully Updated!"
      //this.subscriberService.updateSSIDCount(true);
      // $('#wifiRefreshIcon').click();
      if (this.serialNumber) {
        this.fetchMetaData(this.serialNumber, false);
      }
      //this.fetchSSIDManagerList();
    }, error => {

      this.loading = false
      this.showError = true;
      this.errorMsg = error.error.error;
    })
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.ssidfreetextedit = ""
  }

  hideError() {
    this.showError = false;
    this.errorMsg = '';
  }
  // hideSuccess() {
  //   this.showSuccess = false;
  //   this.successMsg = '';
  // }

  toglePasswordDisplay() {
    if (this.showPassword == "password") {
      this.showPassword = "text"
    } else {
      this.showPassword = "password"
    }
  }

  onSecurityChange(event) {

    if ((this.selectedMetaObj.WPAEncryptionModes || this.selectedMetaObj.BasicEncryptionModes || this.selectedMetaObj.IEEE11iEncryptionModes)
      && this.ssidObjectForm.BeaconType != 'Basic' && this.ssidObjectForm.BeaconType != 'None' && this.ssidObjectForm.BeaconType != 'open') {
      this.constructEditSSIDData(this.ssidObjectForm);
    }
    // this.KeyPassphraseRequired = false;
    // if (this.oldSsidData.BeaconType !== this.ssidObjectForm.BeaconType) {
    //   this.KeyPassphraseRequired = true;
    // }
  }

  onEncryptionChange(event, BeaconType) {

    this.metaData.properties.forEach(res => {
      if (res.featureName == "SecurityOptions") {
        if (res.configuration) {
          if (res.configuration['WPA3-SAE'] && res.configuration['WPA3-SAE']["BeaconType"] == BeaconType) {
            this.ssidObjectForm.WPAEncryptionModes = event.id;
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
  toggleTablepassword(event) {
    this.togglePasswordTable[event] = !this.togglePasswordTable[event];
  }

  // toggleTablepassword(event) {
  //   const check = this.temparray.indexOf(event);
  //   check > -1 ? this.temparray.splice(check, 1) : this.temparray.push(event);
  //   // this.togglePasswordTable[event] = !this.togglePasswordTable[event];
  // }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  onKeyPhraseChange(event) {

    this.oldpasswordforprimary = this.oldSsidData?.KeyPassphrase;

    this.ssidObjectForm.KeyPassphrase = event.target.value;
  }

  passWordEditOldModel(ssid) {

    let oldpasswordcheck = this.oldpasswordforprimary ? this.oldpasswordforprimary !== ssid?.PRConfig?.KeyPassphrase : false

    if (!(ssid?.PRConfig?.KeyPassphrase)) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;

    }
    else if (oldpasswordcheck) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else {
      this.editaccesspasspharsepopup = true
    }

  }


  showPrimaryPassword(event, ssidobject) {
    this.temproryssid = event
    this.primaryeventcheck = true;
    if (!(ssidobject?.PRConfig?.KeyPassphrase) && (!(ssidobject?.KeyPassphrase))) {
      this.togglePasswordTable[this.temproryssid] = !this.togglePasswordTable[this.temproryssid];
    }
    else {
      this.passphraseVerifyWarnModalOpen(event, ssidobject);
    }

  }
  hidePrimaryPassword(event) {
    this.primaryeventcheck = false;
    this.togglePasswordTable[event] = false;
  }
  passphraseVerifyWarnModalOpen(event, ssidData) {
    if (ssidData?.SSIDName === "SSID1" || ssidData?.SSIDName === "SSID9") {
      this.descriptionforssidlist = "Primary" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID2" || ssidData?.SSIDName === "SSID10") {
      this.descriptionforssidlist = "Guest" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID11") {
      this.descriptionforssidlist = "IPTV" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID16") {
      this.descriptionforssidlist = "Backhaul" + " " + ssidData?.SSID

    }
    else {
      this.descriptionforssidlist = "Operator" + " " + ssidData?.SSID
      //operator - SSID3, SSID4, SSID5, SSID6, SSID7, SSID8 , SSID12, SSID13, SSID14, SSID15
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
  cancelpopuplist() {
    this.temproryssid = null
    this.descriptionforssidlist = ""
    this.ssidfreetextlist = ""
    this.modalService.dismissAll()
  }
  accesspopupedit(ssidData) {

    let description = ''
    if (ssidData?.SSIDName === "SSID1" || ssidData?.SSIDName === "SSID9") {
      description = "Primary" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID2" || ssidData?.SSIDName === "SSID10") {
      description = "Guest" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID11") {
      description = "IPTV" + " " + ssidData?.SSID

    }
    else if (ssidData?.SSIDName === "SSID16") {
      description = "Backhaul" + " " + ssidData?.SSID

    }
    else {
      description = "Operator" + " " + ssidData?.SSID
      //operator - SSID3, SSID4, SSID5, SSID6, SSID7, SSID8 , SSID12, SSID13, SSID14, SSID15
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
      this.editaccesspasspharsepopup = false
      this.loading = false
      //this.show = !this.show;
      this.viewpasspharsevisible = false
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

}
