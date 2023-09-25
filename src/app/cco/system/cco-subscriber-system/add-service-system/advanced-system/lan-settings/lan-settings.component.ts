import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { ISubscriberAddDeviceModel } from 'src/app/support/netops-management/subscriber-management/subscriber.model';
import { settings } from 'cluster';
import * as $ from 'jquery';

@Component({
  selector: 'app-lan-settings',
  templateUrl: './lan-settings.component.html',
  styleUrls: ['./lan-settings.component.scss']
})
export class LanSettingsComponent implements OnInit, OnDestroy {
  _addDeviceObj: any;
  language: any;
  public adminStateOption = ['Enable', 'Disable'];
  public speedElemOption = ['Auto', '10', '100', '1000'];
  public portElemOption = ['Auto', 'Half', 'Full'];
  languageSubject;
  @Input()
  set addDeviceObj(value: any) {
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

  }
  get addDeviceObj(): any {
    return this._addDeviceObj;
  }

  @Output() private lanEmit: EventEmitter<any> = new EventEmitter();
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  lanPortoneDhcpLeaseLimitError = false;
  lanPorttwoDhcpLeaseLimitError = false;
  lanPortthreeDhcpLeaseLimitError = false;
  lanPortfourDhcpLeaseLimitError = false;
  lanPortoneErrorMsg = '';
  lanPorttwoErrorMsg = '';
  lanPortthreeErrorMsg = '';
  lanPortfourErrorMsg = '';


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
  }

  lanChanges() {
    let lan = this.addDeviceObj;
    this.lanEmit.emit(lan.settings);
  }

}
