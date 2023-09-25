import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISubscriberAddDeviceModel } from '../../subscriber.model';
import { TranslateService } from 'src/app-services/translate.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-settings-wizard',
  templateUrl: './settings-wizard.component.html',
  styleUrls: ['./settings-wizard.component.scss']
})
export class SettingsWizardComponent implements OnInit, OnDestroy {
  _addDeviceObj: ISubscriberAddDeviceModel;
  language: any;
  public adminStateOption = ['Enable', 'Disable'];
  public speedElemOption = ['Auto', '10', '100', '1000'];
  public lan5SpeedOPtion = ['Auto', '10', '100', '1000','10000'];
  public portElemOption = ['Auto', 'Half', 'Full'];
  languageSubject;
  @Input()
  set addDeviceObj(value: ISubscriberAddDeviceModel) {
    this._addDeviceObj = value;
    if (typeof value.settings.lanPortOne !== "object") {
      this._addDeviceObj.settings.lanPortOne = {};
      this._addDeviceObj.settings.lanPortOne.adminState = '';
      this._addDeviceObj.settings.lanPortOne.powerSaving = false;
      this._addDeviceObj.settings.lanPortOne.speed = '';
      this._addDeviceObj.settings.lanPortOne.duplex = '';
      this._addDeviceObj.settings.lanPortOne.DHCPLeaseLimit = 0;
    }

    if (typeof value.settings.lanPortTwo !== "object") {
      this._addDeviceObj.settings.lanPortTwo = {};
      this._addDeviceObj.settings.lanPortTwo.adminState = '';
      this._addDeviceObj.settings.lanPortTwo.powerSaving = false;
      this._addDeviceObj.settings.lanPortTwo.speed = '';
      this._addDeviceObj.settings.lanPortTwo.duplex = '';
      this._addDeviceObj.settings.lanPortTwo.DHCPLeaseLimit = 0;
    }

    if (typeof value.settings.lanPortThree !== "object") {
      this._addDeviceObj.settings.lanPortThree = {};
      this._addDeviceObj.settings.lanPortThree.adminState = '';
      this._addDeviceObj.settings.lanPortThree.powerSaving = false;
      this._addDeviceObj.settings.lanPortThree.speed = '';
      this._addDeviceObj.settings.lanPortThree.duplex = '';
      this._addDeviceObj.settings.lanPortThree.DHCPLeaseLimit = 0;
    }

    if (typeof value.settings.lanPortFour !== "object") {
      this._addDeviceObj.settings.lanPortFour = {};
      this._addDeviceObj.settings.lanPortFour.adminState = '';
      this._addDeviceObj.settings.lanPortFour.powerSaving = false;
      this._addDeviceObj.settings.lanPortFour.speed = '';
      this._addDeviceObj.settings.lanPortFour.duplex = '';
      this._addDeviceObj.settings.lanPortFour.DHCPLeaseLimit = 0;
    }

    if (value.settings.lanPortFive && typeof value.settings.lanPortFive !== "object") {
      this._addDeviceObj.settings.lanPortFive = {};
      this._addDeviceObj.settings.lanPortFive.adminState = '';
      this._addDeviceObj.settings.lanPortFive.powerSaving = false;
      this._addDeviceObj.settings.lanPortFive.speed = '';
      this._addDeviceObj.settings.lanPortFive.duplex = '';
      this._addDeviceObj.settings.lanPortFive.DHCPLeaseLimit = 0;
    }
    // if(value.settings.lanPortFive) this.speedElemOption.push('10000');

  }
  get addDeviceObj(): ISubscriberAddDeviceModel {
    return this._addDeviceObj;
  }
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    if(this.languageSubject) this.languageSubject.unsubscribe();
  }

  lanPortoneDhcpLeaseLimitError = false;
  lanPorttwoDhcpLeaseLimitError = false;
  lanPortthreeDhcpLeaseLimitError = false;
  lanPortfourDhcpLeaseLimitError = false;
  lanPortoneErrorMsg = '';
  lanPorttwoErrorMsg = '';
  lanPortthreeErrorMsg = '';
  lanPortfourErrorMsg = '';
  lanPortfiveErrorMsg = '';
  lanPortfiveDhcpLeaseLimitError = false;
  @Output() disableFinish: EventEmitter<boolean> = new EventEmitter();


  changeLanPortoneDhcpLeaseLimit() {
    this.lanPortoneDhcpLeaseLimitError = false;
    let value = this.addDeviceObj.settings.lanPortOne.DHCPLeaseLimit;
    if (value < 0) {
      this.lanPortoneErrorMsg = 'Please enter a value greater than or equal to 0.';
      this.lanPortoneDhcpLeaseLimitError = true;
    } else if (value > 512) {
      this.lanPortoneErrorMsg = 'Please enter a value less than or equal to 512.';
      this.lanPortoneDhcpLeaseLimitError = true;
    }
    this.validateNextClick();    
  }

  changeLanPorttwoDhcpLeaseLimit() {
    this.lanPorttwoDhcpLeaseLimitError = false;

    let value = this.addDeviceObj.settings.lanPortTwo.DHCPLeaseLimit;
    if (value < 0) {
      this.lanPorttwoErrorMsg = 'Please enter a value greater than or equal to 0.';
      this.lanPorttwoDhcpLeaseLimitError = true;
    } else if (value > 512) {
      this.lanPorttwoErrorMsg = 'Please enter a value less than or equal to 512.';
      this.lanPorttwoDhcpLeaseLimitError = true;
    }
    this.validateNextClick();
  }

  changeLanPortthreeDhcpLeaseLimit() {
    this.lanPortthreeDhcpLeaseLimitError = false;

    let value = this.addDeviceObj.settings.lanPortThree.DHCPLeaseLimit;
    if (value < 0) {
      this.lanPortthreeErrorMsg = 'Please enter a value greater than or equal to 0.';
      this.lanPortthreeDhcpLeaseLimitError = true;
    } else if (value > 512) {
      this.lanPortthreeErrorMsg = 'Please enter a value less than or equal to 512.';
      this.lanPortthreeDhcpLeaseLimitError = true;
    }
    this.validateNextClick();
  }

  changeLanPortfourDhcpLeaseLimit() {
    this.lanPortfourDhcpLeaseLimitError = false;

    let value = this.addDeviceObj.settings.lanPortFour.DHCPLeaseLimit;
    if (value < 0) {
      this.lanPortfourErrorMsg = 'Please enter a value greater than or equal to 0.';
      this.lanPortfourDhcpLeaseLimitError = true;
    } else if (value > 512) {
      this.lanPortfourErrorMsg = 'Please enter a value less than or equal to 512.';
      this.lanPortfourDhcpLeaseLimitError = true;
    }
    this.validateNextClick();
  }

  changeLanPortfiveDhcpLeaseLimit() {
    this.lanPortfiveDhcpLeaseLimitError = false;

    let value = this.addDeviceObj.settings.lanPortFive.DHCPLeaseLimit;
    if (value < 0) {
      this.lanPortfiveErrorMsg = 'Please enter a value greater than or equal to 0.';
      this.lanPortfiveDhcpLeaseLimitError = true;
    } else if (value > 512) {
      this.lanPortfiveErrorMsg = 'Please enter a value less than or equal to 512.';
      this.lanPortfiveDhcpLeaseLimitError = true;
    }
    this.validateNextClick();
  }

  validateNextClick(){
    if(this.lanPortoneDhcpLeaseLimitError || 
      this.lanPorttwoDhcpLeaseLimitError || 
      this.lanPortthreeDhcpLeaseLimitError || 
      this.lanPortfourDhcpLeaseLimitError || 
      this.lanPortfiveDhcpLeaseLimitError)
    this.disableFinish.emit(true);
    else this.disableFinish.emit(false);
  }


}
