import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ISubscriberAddDeviceModel, IVoiceLineServiceModel } from '../../../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';


@Component({
  selector: 'app-voice-line-service',
  templateUrl: './voice-line-service.component.html',
  styleUrls: ['./voice-line-service.component.scss']
})
export class VoiceLineServiceComponent implements OnInit {
  language: any;
  languageSubject;
  inValidUserName: boolean = false;
  inValidPWD: boolean = false;
  inValidURI: boolean = false;
  voiceParam = ['GR-909', 'ANSI', 'ETSI-PSTN', 'Manual'];
  isShowAdvSetting: boolean = false;
  advanceSettingsLbl: string = 'Show Advanced Settings';
  _lineObject: IVoiceLineServiceModel = {};
  _addDeviceObj: ISubscriberAddDeviceModel;
  userNameErrorMsg: string = undefined;
  isPPoE_Hide: boolean = false;
  @Input()
  set lineObject(value: IVoiceLineServiceModel) {
    if (!value) {
      value = {};
    }
    // if (!value['systemLoss']) {
    //   value['systemLoss'] = "GR-909";
    // } else {
    //   if (value.systemTXLoss === -4 && value.systemRXLoss === -11) {
    //     value['systemLoss'] = "ETSI-PSTN";
    //   } else if (value.systemTXLoss === -3 && value.systemRXLoss === -9) {
    //     value['systemLoss'] = "ANSI";
    //   } else if (value.systemTXLoss === -2 && value.systemRXLoss === -4) {
    //     value['systemLoss'] = "GR-909";
    //   } else {
    //     value['systemLoss'] = 'Manual'
    //   }
    // }

    if (!value['systemLoss']) {
      value['systemLoss'] = "ANSI";
    }

    this._lineObject = value;
  }
  get lineObject(): IVoiceLineServiceModel {
    return this._lineObject;
  }

  @Input()
  set addDeviceObj(value: ISubscriberAddDeviceModel) {
    this._addDeviceObj = value;
  }
  get addDeviceObj(): ISubscriberAddDeviceModel {
    return this._addDeviceObj;
  }
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.advanceSettingsLbl = this.language['Show_Advanced_Settings'];
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.advanceSettingsLbl = this.language['Show_Advanced_Settings'];
    });
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }
  // onSubmit() { }

  onToggleAdvSettings() {
    this.advanceSettingsLbl = (!this.isShowAdvSetting) ? this.language['Hide_Advanced_Settings'] : this.language['Show_Advanced_Settings'];
    this.isShowAdvSetting = !this.isShowAdvSetting;
  }

  handleOnOffBtn(buttonName: string): void {
    switch (buttonName) {
      case 'VoiceService':
        this.lineObject.isVoiceService = !this.lineObject.isVoiceService;
        this.lineObject.inValidURI = false;
        this.lineObject.inValidUserName = false;
        this.lineObject.inValidPWD = false;
        this.lineObject.inValidDireConnectNum = false;
        break;
      case 'DirectConnect':
        this.lineObject.isDirectCon = !this.lineObject.isDirectCon;
        break;
      default:
        break;
    }
  }

  onSysLossChange() {
    switch (this.lineObject.systemLoss) {
      case "GR-909":
        this.lineObject.systemTXLoss = -2;
        this.lineObject.systemRXLoss = -4;
        break;
      case "ANSI":
        this.lineObject.systemTXLoss = -3;
        this.lineObject.systemRXLoss = -9;
        break;
      case "ETSI-PSTN":
        this.lineObject.systemTXLoss = -4;
        this.lineObject.systemRXLoss = -11;
        break;
      default:
        break
    }
  }

  checkValidation(field, value) {
    this.lineObject[field] = (value === '');
    switch (field) {
      case 'inValidDireConnectNum':
        this.lineObject[field] = !(/^[0-9]+$/).test(value);
        break;
      case 'inValidDireConnectTime':
        this.lineObject[field] = (value < 0 && value < 35);
        break;
      case 'inValidUserName':
        const usenameREX = /[\"<>#%]+$/;
        this.lineObject[field] = (value.indexOf('@@') !== -1);
        this.lineObject[field] = false;
        if (usenameREX.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineObject[field] = true;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters <, >, #, %, " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'inValidPWD':
        const passwordREX = /[\"]+$/;
        this.lineObject[field] = (value.indexOf('@@') !== -1);
        this.lineObject[field] = false;
        if (passwordREX.test(value) || (value.indexOf('@@') !== -1)) {
          this.lineObject[field] = true;
          this.userNameErrorMsg = !(value.indexOf('@@') !== -1) ? 'Space and characters " are not allowed.' : '@@ not allowed.'
        }
        break;
      case 'inValidsystemTXLoss':
      case 'inValidsystemRXLoss':
        if (value !== '')
          this.lineObject[field] = (Number(value) < -12 || Number(value) > 6);
        break;
      default:
        break;
    }
  }
}
