import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ɵbypassSanitizationTrustUrl, ViewChild } from '@angular/core';
import { IwifiSSISubDModel } from '../../../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';
import { Output, EventEmitter } from '@angular/core';
import { EncryptionTypes, SecurityTypes, fivegEncryptionTypes, SSIDNamePattern, NamePatternError, constructSecurityList } from 'src/app/support/shared/service/utility.class';
import { SupportRadioService } from 'src/app/support/shared/service/support-radio.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service'
import { forEachLeadingCommentRange } from 'typescript';
import { AnyAaaaRecord } from 'dns';
import { TruncatePipe } from 'src/app/support/shared/custom-pipes/truncate.pipe';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wifi-ssid-service',
  templateUrl: './wifi-ssid-service.component.html',
  styleUrls: ['./wifi-ssid-service.component.scss']
})
export class WifiSsidServiceComponent implements OnInit, OnChanges {
  @Input() deviceData: any;
  _wifiSSIDObj: IwifiSSISubDModel = {};
  showPassPhraseOldModel: boolean = false
  editaccesspasspharsepopup: boolean = false;
  freetextedit: boolean = false;
  editpasspharsealertpopup: boolean = false
  subscriberaccount: any;
  subscriberemail: any;
  subscriberaddress: any;
  subscriberphone: any;
  loginData: any;
  oldpassword: any;

  orgidfromlocal: any;
  secureaccessrole: any;
  descriptionforssidlist
  ssidfreetextedit
  freetextssidlist: boolean = false;
  emptypassword: boolean = false;
  ssidfreetextlist
  Orgacceforssid
  checksubvalidate: any;
  accessPassphrasenable: boolean = true;
  subscriberInfo: any;
  rgdeviceid: any;
  rgmodelname: any;
  deviceInfo: any;
  securityTypes = []
  //encryptionTypes = EncryptionTypes;
  encryptionTypes = [];
  language: any;
  languageSubject;
  oldpasswordfromwifissid

  @Output() emitWifiObj = new EventEmitter();
  @Input() wifiType: any = "";
  @Input() Networktype: any;
  @Input() Security: any;
  @Input()
  serviceEdit: boolean = false;
  @Input()
  metaData?: any = null;
  @Input() ftrProperties;
  @Input() bSmbMode: any;
  @Input() tempWifiObj: any;
  @Input() set wifiSSIDObj(value: IwifiSSISubDModel) {

    if (!(value && Object.keys(value).length)) {
      value = {};
    }

    if (typeof value.name === 'undefined') {
      value.name = '';
    }
    if (typeof value.serviceEnabled == 'boolean') {
      if (value.serviceEnabled) { value.serviceEnabled = 'true'; }
      else { value.serviceEnabled = 'false' }
    }
    if (typeof value.serviceEnabled === 'undefined') {
      value.serviceEnabled = "undefined";
    }
    if (typeof value.securityType === 'undefined') {
      value.securityType = '';
    }

    if (typeof value.encryption === 'undefined') {
      value.encryption = '';
    }

    if (typeof value.passphrase === 'undefined') {
      value.passphrase = '';
    }

    if (typeof value.broadcastEnabled === 'undefined') {
      value.broadcastEnabled = undefined;
    }
    if (typeof value.mumimoEnabled === 'undefined') {
      value.mumimoEnabled = undefined;
    }
    if (typeof value.enableDfsChannels === 'undefined') {
      value.enableDfsChannels = undefined;
    }

    this._wifiSSIDObj = value;

  }
  get wifiSSIDObj(): IwifiSSISubDModel {
    return this._wifiSSIDObj;
  }
  prevEncryptionValue = null;
  ssidNamePattern = SSIDNamePattern;
  namePatternError = NamePatternError;
  @Input() isWifi5Radio: boolean = false;
  oldData: any;
  phassPharsePlaceHolder: string = "";
  @Input() editMode: boolean = false;
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  constructor(private translateService: TranslateService, private radioService: SupportRadioService, private ssoAuthService: SsoAuthService, private dateUtils: DateUtilsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.securityTypes = this.Security;
    if (changes?.Security?.currentValue && changes?.Security?.currentValue.length) {
      this.securityTypes = constructSecurityList(this.Security, this.wifiType, this.ftrProperties);
    }

  }

  ngOnInit(): void {
    // this.metaData['bSmbMode'] = this.bSmbMode;
    if (this.editMode) {
      this.oldData = Object.assign({}, this.tempWifiObj[this.wifiType]);
      //this.changeSecurityType();
    }
    this.changeSecurityType();
    this.oldpassword = this.tempWifiObj ? this.tempWifiObj[this.wifiType]?.passphrase : ""

    //fix   CCL-24062
    let fivegWifis = ['X_CALIX_SXACC_PRIMARY_5GHZ_SSID', 'X_CALIX_SXACC_GUEST_5GHZ_SSID', 'UNIFIED_PRIMARY_SSID'];
    if (fivegWifis.indexOf(this.wifiType) !== -1) {
      this.encryptionTypes = fivegEncryptionTypes;
    }
    if (this.ssoAuthService.acceptGSModel(this.deviceData?.selectedModel) || (this.deviceData?.selectedModel?.toLowerCase())?.indexOf("gm") !== -1) {
      this.encryptionTypes = fivegEncryptionTypes;
    }
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    //this.securityTypes = this.Security;
    let primarywifis = ['X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID', 'X_CALIX_SXACC_PRIMARY_5GHZ_SSID']
    if (primarywifis.indexOf(this.wifiType) !== -1 && (this.ssoAuthService.acceptGSModel(this.deviceData?.selectedModel)) && history.state.editDeviceObj) {
      this.serviceEdit = true;
    } else {
      this.serviceEdit = false;
    }

    // if (this.deviceData && this.deviceData?.selectedModel && (this.deviceData?.selectedModel.toLowerCase()).indexOf("gs") !== -1) {
    //   let securityTypes = this.securityTypes;

    //   if (!this.findObject(securityTypes, '11iandWPA3')) {
    //     securityTypes.push({ id: "11iandWPA3", name: "WPA2 WPA3 Personal" });
    //   }

    //   if (!this.findObject(securityTypes, 'WPA3')) {
    //     securityTypes.push({ id: "WPA3", name: "WPA3 Personal" });
    //   }


    //   this.securityTypes = securityTypes;
    // }

    this.prevEncryptionValue = this.wifiSSIDObj.securityType
    this.showPassPhraseOldModel = false;
    this.editaccesspasspharsepopup = false;
    this.checksubvalidate = false;
    this.accessPassphrasenable = true;
    this.editpasspharsealertpopup = false

    this.subscriberInfo = this.ssoAuthService.getSubscriberInfo();
    this.subscriberaccount = this.subscriberInfo.subscriberLocationId
    this.subscriberemail = this.subscriberInfo.email
    this.subscriberaddress = this.subscriberInfo.serviceAddress
    this.subscriberphone = this.subscriberInfo.phone

    this.deviceInfo = JSON.parse(sessionStorage.getItem("calix.deviceData"));
    let devicedatafromsession = this.deviceInfo?.filter(device => device.opMode == "RG");
    this.rgdeviceid = devicedatafromsession?.length ? devicedatafromsession[0]?.deviceId : " ";
    this.rgmodelname = devicedatafromsession?.length ? devicedatafromsession[0]?.modelName : " ";


    this.loginData = localStorage.getItem('calix.login_data') ? JSON.parse(localStorage.getItem('calix.login_data')) : '';

    this.orgidfromlocal = localStorage.getItem('calix.org_id') ? localStorage.getItem('calix.org_id') : ' ';

    this.Orgacceforssid = sessionStorage.getItem('Orgacceforssid') ? sessionStorage.getItem('Orgacceforssid') : false;
    if (this.Orgacceforssid == 'true') { //secureaccess
      this.secureaccessrole = 'Calix'
      this.freetextedit = true
    }
    else {
      this.secureaccessrole = 'BSP'
      this.freetextedit = false
    }
    //this.oldpassword = this.wifiSSIDObj.passphrase
    this.emptypassword = false;
    if (this.editMode) {
      this.phassPharsePlaceHolder = "Not set in Service Cloud";
      if (!this.wifiSSIDObj.securityType && this.wifiType == "UNIFIED_PRIMARY_SSID") {
        this.wifiSSIDObj.encryption = null;
      }
    }
    else if (!this.editMode) {
      if (this.wifiSSIDObj.securityType && this.wifiType == "UNIFIED_PRIMARY_SSID") {
        this.wifiSSIDObj.encryption = "AESEncryption";
      }
    }
    this.oldpasswordfromwifissid = this.wifiSSIDObj.passphrase
    this.emitData();
  }
  passVal = false;
  isAllSplChar = false;
  emitData(wifiSSIDForm = null) {
    this.isAllSplChar = false;
    if (wifiSSIDForm == 'security' && this.prevEncryptionValue != this.wifiSSIDObj.securityType) {
      this.prevEncryptionValue = this.wifiSSIDObj.securityType
      this.wifiSSIDObj.encryption = null;
    }
    // if (this.wifiSSIDObj.securityType && this.wifiSSIDObj.securityType != "Basic") {
    //   this.wifiSSIDObj.encryption = "AESEncryption";
    // }

    // if (this.wifiSSIDObj.securityType) {
    //   switch (this.wifiSSIDObj.securityType) {
    //     case "WPAand11i": this.encryptionTypes = [
    //       { id: "AESEncryption", name: "AES" },
    //       { id: "TKIPEncryption", name: "TKIP" },
    //       { id: "TKIPandAESEncryption", name: "Both" }];
    //       break;
    //     case "WPA": this.encryptionTypes = [
    //       { id: "TKIPEncryption", name: "TKIP" },
    //     ]; break;
    //     case "11i": this.encryptionTypes = [
    //       { id: "AESEncryption", name: "AES" }]; break;
    //     case "11i": this.encryptionTypes = [
    //       { id: "AESEncryption", name: "AES" }]; break;
    //     case "11i": this.encryptionTypes = [
    //       { id: "AESEncryption", name: "AES" }]; break;
    //   }
    // }
    if (this.wifiSSIDObj.securityType) {
      switch (this.wifiSSIDObj.securityType) {
        case "WPAand11i":

          if (this.deviceData && this.deviceData?.selectedModel && this.ssoAuthService.acceptGSModel(this.deviceData?.selectedModel)) {
            this.encryptionTypes = [
              { id: "AESEncryption", name: "AES" },
              // { id: "TKIPEncryption", name: "TKIP" },
              // { id: "TKIPandAESEncryption", name: "Both" }
            ];
          } else {
            if (this.wifiType == 'X_CALIX_SXACC_PRIMARY_5GHZ_SSID' || this.wifiType == 'X_CALIX_SXACC_GUEST_5GHZ_SSID') {
              this.encryptionTypes = [
                { id: "AESEncryption", name: "AES" },
                // { id: "TKIPEncryption", name: "TKIP" },
                // { id: "TKIPandAESEncryption", name: "Both" }
              ];
            }
            else {
              this.encryptionTypes = [
                { id: "AESEncryption", name: "AES" },
                { id: "TKIPEncryption", name: "TKIP" },
                { id: "TKIPandAESEncryption", name: "Both" }
              ];
            }

          }

          break;
        case "WPA": this.encryptionTypes = [
          { id: "TKIPEncryption", name: "TKIP" },
        ]; break;
        case "WPA3": this.encryptionTypes = [
          { id: "AESEncryption", name: "AES" },
        ]; break;
        case "11i": this.encryptionTypes = [
          { id: "AESEncryption", name: "AES" }]; break;
        case "11iandWPA3": this.encryptionTypes = [
          { id: "AESEncryption", name: "AES" }]; break;
        // case "11i": this.encryptionTypes = [
        //   { id: "AESEncryption", name: "AES" }]; break;
      }
      // if (this.wifiSSIDObj.securityType != "Basic") {
      //   this.wifiSSIDObj.encryption = "AESEncryption";
      // }
    }
    //let regexp = new RegExp('^[a-zA-Z0-9]+$')
    // let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^,."`#$@!%*-?&]{8,}$/gm);
    let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^,./"~()|\\ '`#$@!%*-?&]{8,}$/gm);

    var str = this.wifiSSIDObj.passphrase;
    var regex = /^[^a-zA-Z0-9]+$/;
    var allSplChar = regex.test(str);
    if (allSplChar) {
      this.isAllSplChar = true;
    }

    if (this.wifiSSIDObj?.passphrase && !regexp.test(this.wifiSSIDObj.passphrase)) {
      this.passVal = true;
    } else {
      this.passVal = false;
    }
    //this.checkSecurityRequiredOrNot(this.wifiSSIDObj);
    if (this.editMode) {
      this.checkNameIsRequired(this.wifiSSIDObj);
    }
    else if (!this.editMode) {
      if (this.wifiType == "UNIFIED_PRIMARY_SSID") {
        this.isNameRequired = true;
      }
      else {
        this.isNameRequired = false;
      }

    }

    this.checkPassewordRequiredOrNot(this.wifiSSIDObj);
    this.emitWifiObj.emit({
      type: this.wifiType,
      data: this.wifiSSIDObj,
      old_Data: this.oldData
    });

  }

  passWordEditOldModel(wifiSSIDObj) {
    let oldpasswordcheck = this.oldpasswordfromwifissid ? this.oldpasswordfromwifissid !== wifiSSIDObj?.passphrase : false


    ///////////////////////////////////////////
    if (!(this.oldpasswordfromwifissid)) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else if (this.emptypassword) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else if (oldpasswordcheck) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else {
      this.editaccesspasspharsepopup = true
    }

    this.checksubvalidate = false;
    this.accessPassphrasenable = true;
  }
  hidepassWordEditOldModel(wifiSSIDObj) {

    this.showPassPhraseOldModel = !this.showPassPhraseOldModel;

  }

  checksubvalidatechange() {

    if (this.checksubvalidate) {
      this.accessPassphrasenable = false
    } else {
      this.accessPassphrasenable = true
    }
  }
  accesspopupedit(ssidData) {
    let description = ' '
    if (this.Networktype === "UNIFIED_PRIMARY_SSID") {
      description = "Primary SSID" + " " + ssidData?.name
    }
    else {
      description = this.Networktype + " " + ssidData?.name
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
      "objectType": "NetOps Edit System",
      // "orgId": this.orgidfromlocal,
      "originator": this.loginData.username,
      "description": freetextforedit
    };
    // this.loading = true
    this.radioService.Savepasspharseauditlog(request).subscribe(res => {
      // this.viewpasspharsevisible = false
      this.editaccesspasspharsepopup = false
      //this.loading = false
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }, error => {
      //this.viewpasspharsevisible = true
      this.editpasspharsealertpopup = true // service call error place paste it 
      this.editaccesspasspharsepopup = false
      //this.loading = false
    })
  }

  editaccesspasspharsepopupclose() {
    this.editaccesspasspharsepopup = false
    this.ssidfreetextedit = ""

  }
  onSecondaryKeyPhraseChange(e) {
    if (!(e)) { this.emptypassword = true }
  }
  editpasspharsealertpopupclose() {
    this.editpasspharsealertpopup = false
  }
  ngOnDestroy() {
    this.emitWifiObj.emit({
      type: this.wifiType,
      data: this.wifiSSIDObj
    });
    this.languageSubject.unsubscribe();
  }

  findObject(jsObjects, value: any) {
    let rtrn = false;
    for (var i = 0; i < jsObjects.length; i++) {
      if (jsObjects[i]['id'] == value) {
        rtrn = true;
        break;
      }
    }

    return rtrn;
  }
  showPasswordRequired: boolean = false;
  checkPassewordRequiredOrNot(wifiObj) {
    // if (!wifiObj?.securityType || wifiObj?.securityType == "Basic") {
    var temp = this.oldData;
    this.showPasswordRequired = false;
    // this.showSecurityRequired = false;
    // this.isNameRequired = false;
    //var oldpassword = temp.passphrase;
    if (temp?.securityType == "Basic" && wifiObj?.securityType != "Basic") {
      this.showPasswordRequired = true;
    }
    else if (temp?.passphrase && wifiObj?.passphrase == "" && wifiObj?.securityType != "Basic") {
      this.showPasswordRequired = true;
    }
    else {
      this.showPasswordRequired = false;
    }
    if (!this.editMode) {
      if (this.wifiType == "UNIFIED_PRIMARY_SSID" && wifiObj?.securityType != "Basic") {
        this.showPasswordRequired = true;
      }
      else {
        this.showPasswordRequired = false;
      }
    }
    else if (this.editMode) {

      if (this.wifiType == "UNIFIED_PRIMARY_SSID") {
        this.showSecurityRequired = false;
        this.isNameRequired = false;
        var temp = this.oldData
        var oldName = temp.name;
        var newName = wifiObj.name;
        var oldpassphrase = temp?.passphrase;
        var newPassphrase = wifiObj?.passphrase;
        var oldSecurityType = temp?.securityType;
        var newSecurityType = wifiObj?.securityType;
        // if (!oldName) {
        if (newName?.length > 0) {
          this.showPasswordRequired = true;
          this.showSecurityRequired = true;
          if (this.wifiSSIDObj.securityType && this.wifiSSIDObj.securityType == "Basic") {
            //  if (this.wifiSSIDObj.passphrase?.length == 0) {
            this.showPasswordRequired = false;
            //  }
          }
          else if ((oldName && (oldName != newName))) {
            if (newPassphrase?.length == 0) {
              this.showPasswordRequired = true;
            }
            else {
              this.showPasswordRequired = false;
            }

          }
          else if ((oldSecurityType && (oldSecurityType != newSecurityType))) {
            if (newPassphrase?.length == 0) {
              this.showPasswordRequired = true;
            }
            else {
              this.showPasswordRequired = false;
            }
          }
          else if ((!oldpassphrase || oldpassphrase?.length == 0)) {
            // this.showPasswordRequired = false;
            if (((oldName?.length > 0) && (oldSecurityType?.length > 0)) && (!oldpassphrase || oldpassphrase?.length == 0)) {
              this.showPasswordRequired = false;
            }
            else if (((oldName?.length == 0) && (oldSecurityType?.length == 0)) && (!oldpassphrase || oldpassphrase?.length == 0)) {
              this.showPasswordRequired = false;
            }
          }

        }
        else if (this.wifiSSIDObj.securityType) {
          if (this.wifiSSIDObj.securityType != "Basic") {
            this.showPasswordRequired = true;
            if (newName?.length == 0) {
              this.isNameRequired = true;
            }
            //  this.isNameRequired = true;
          }
          else if (this.wifiSSIDObj.securityType == "Basic") {
            if (newName?.length == 0) {
              this.isNameRequired = true;
            }
          }


        }
        else if (oldName && newName == "") {
          this.isNameRequired = true;
          // this.wifiSSIDObj.passphrase = null;
          // this.wifiSSIDObj.encryption = null;
          // this.showPasswordRequired = false;
        }

        // }
        // else {
        //   if (oldName && newName == "") {
        //     this.isNameRequired = true;
        //   }


        // }
      }
    }
  }
  showSecurityRequired: boolean = false;
  checkSecurityRequiredOrNot(wifiObj) {
    if (wifiObj?.name?.length > 0) {
      this.showSecurityRequired = true;
    }
    else {
      this.showSecurityRequired = false;
    }
  }
  isNameRequired: boolean = false;
  checkNameIsRequired(wifiObj) {
    if (this.editMode) {
      var temp = this.oldData
      var oldName = temp.name;
      var newName = wifiObj.name;
      this.isNameRequired = false;

      if (oldName && newName == "") {
        this.isNameRequired = true;
      }
    }
  }
  changeSecurityType() {
    if (this.wifiSSIDObj.securityType && this.wifiSSIDObj.securityType != "Basic") {
      if (this.ssoAuthService.acceptGSModel(this.deviceData?.selectedModel) || (this.deviceData?.selectedModel?.toLowerCase())?.indexOf("gm") !== -1) {
        this.wifiSSIDObj.encryption = "AESEncryption";
      }
      else {
        this.wifiSSIDObj.encryption = this.wifiSSIDObj.encryption ? this.wifiSSIDObj.encryption : "";
      }

    }
  }
}
