import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { IwifiSSISubDModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { SupportRadioService } from 'src/app/support/shared/service/support-radio.service';
import { fivegEncryptionTypes, NamePatternError, SSIDNamePattern, constructSecurityList } from 'src/app/support/shared/service/utility.class';

@Component({
  selector: 'app-wifi-ssid-service',
  templateUrl: './wifi-ssid-service.component.html',
  styleUrls: ['./wifi-ssid-service.component.scss']
})
export class WifiSsidServiceComponent implements OnInit {

  @Input() deviceData: any;
  @Input() DisableWifiSSID: any
  _wifiSSIDObj: IwifiSSISubDModel = {};
  showPassPhraseOldModel: boolean = false
  securityTypes = []
  //encryptionTypes = EncryptionTypes;
  encryptionTypes = [];
  language: any;
  languageSubject;
  oldData: any;
  subscriberInfo: any;
  ssidfreetextedit
  accessPassphrasenable: boolean = true;
  checksubvalidate: any;
  @Output() emitWifiObj = new EventEmitter();
  @Output() unsaved = new EventEmitter();
  @Input() wifiType: any;
  @Input() Security: any;
  @Input() tempWifiObj;
  @Input() Networktype: any;
  @Input() ftrProperties;
  @Input() isWifi5Radio: boolean = false;
  @Input() editMode: boolean = false;
  @Input()
  serviceEdit: boolean = false;
  @Input()
  metaData?: any = null;
  unsavedData: boolean = false;
  editpasspharsealertpopup: boolean = false
  editaccesspasspharsepopup: boolean = false;
  oldpassword: any;
  emptypassword: boolean = false;
  subscriberaccount: any;
  subscriberemail: any;
  subscriberaddress: any;
  subscriberphone: any;
  deviceInfo: any;
  rgdeviceid: any;
  rgmodelname: any;
  loginData: any;
  orgidfromlocal: string;
  Orgacceforssid: string | boolean;
  secureaccessrole: string;
  freetextedit: boolean;
  phassPharsePlaceHolder: string;
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
      value.serviceEnabled = undefined;
    }

    if (typeof value.securityType === 'undefined') {
      value.securityType = null;
    }

    if (typeof value.encryption === 'undefined') {
      value.encryption = null;
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
  constructor(private translateService: TranslateService, private ssoAuthService: SsoAuthService, private dateUtils: DateUtilsService, private radioService: SupportRadioService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.securityTypes = this.Security;
    if (changes?.Security?.currentValue && changes?.Security?.currentValue.length) {
      this.securityTypes = constructSecurityList(this.Security, this.wifiType, this.ftrProperties);
    }
  }

  ngOnInit(): void {
    if (this.editMode && this.tempWifiObj) {
      this.oldData = Object.assign({}, this.tempWifiObj[this.wifiType])
    }
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
    if (primarywifis.indexOf(this.wifiType) !== -1 && (this.ssoAuthService.acceptGSModel(this.deviceData?.selectedModel))) {
      this.serviceEdit = true;
    } else {
      this.serviceEdit = false;
    }
    this.oldpassword = this.wifiSSIDObj.passphrase
    this.emptypassword = false;
    // if (this.deviceData && this.deviceData.selectedModel && (this.deviceData.selectedModel?.toLowerCase()).indexOf("gs") !== -1) {
    //   let securityTypes = this.securityTypes;

    //   if (!this.findObject(securityTypes, '11iandWPA3')) {
    //     securityTypes.push({ id: "11iandWPA3", name: "WPA2 WPA3 Personal" });
    //   }

    //   if (!this.findObject(securityTypes, 'WPA3')) {
    //     securityTypes.push({ id: "WPA3", name: "WPA3 Personal" });
    //   }


    //   this.securityTypes = securityTypes;
    // }
    this.prevEncryptionValue = this.wifiSSIDObj.securityType;
    this.showPassPhraseOldModel = false;
    this.editaccesspasspharsepopup = false;
    this.checksubvalidate = false;
    this.accessPassphrasenable = true;
    this.editpasspharsealertpopup = false;
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
    this.oldpassword = this.wifiSSIDObj.passphrase
    this.emptypassword = false;
    if (this.editMode)
      this.phassPharsePlaceHolder = "Not set in Service Cloud"
    this.emitData();
  }
  passVal = false;
  clsAlphaNoOnly(e) {
    if (e.key === ' ') { e.preventDefault(); }
    var regex = new RegExp("^[a-zA-Z0-9:]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
  notallowSpace(val) {
    this.wifiSSIDObj.passphrase = val.trim();
  }
  unSavedData() {
    this.unsavedData = true
    this.unsaved.emit(this.unsavedData)
  }
  emitData(wifiSSIDForm = null) {

    if (wifiSSIDForm == 'security' && this.prevEncryptionValue != this.wifiSSIDObj.securityType) {
      this.prevEncryptionValue = this.wifiSSIDObj.securityType
      this.wifiSSIDObj.encryption = null;
    }
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
        case "WPAand11i": this.encryptionTypes = [
          { id: "AESEncryption", name: "AES" },
          // { id: "TKIPEncryption", name: "TKIP" },
          // { id: "TKIPandAESEncryption", name: "Both" }
        ];
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
      if (this.wifiSSIDObj.securityType != "Basic") {
        this.wifiSSIDObj.encryption = "AESEncryption";
      }
    }
    let regexp = new RegExp(/^(?=.*[a-zA-Z0-9])[A-Za-z\d[\]{};:=<>_+^,./"~()|\\ '`#$@!%*-?&]{8,}$/gm);
    if (!regexp.test(this.wifiSSIDObj.passphrase)) {
      this.passVal = true;
    } else {
      this.passVal = false;
    }
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

    if (!(this.oldpassword)) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else if (this.emptypassword) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else if (!(wifiSSIDObj?.passphrase)) {
      this.showPassPhraseOldModel = !this.showPassPhraseOldModel;
    }
    else {
      this.editaccesspasspharsepopup = true
    }

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
      "orgId": this.orgidfromlocal,
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
  isNameRequired: boolean = false;
  checkNameIsRequired(wifiObj) {
    if (this.editMode && wifiObj) {
      var temp = this.oldData
      var oldName = temp?.name;
      var newName = wifiObj?.name;

      if (oldName && newName == "") {
        this.isNameRequired = true;
      }
      else {
        this.isNameRequired = false;
      }
    }
  }
  showPasswordRequired: boolean = false;
  checkPassewordRequiredOrNot(wifiObj) {
    // if (!wifiObj?.securityType || wifiObj?.securityType == "Basic") {
    var temp = this.oldData;
    //var oldpassword = temp.passphrase;
    if (temp?.securityType == "Basic" && wifiObj?.securityType != "Basic") {
      this.showPasswordRequired = true;
    }
    else if (temp?.passphrase && wifiObj?.passphrase == "") {
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

}
