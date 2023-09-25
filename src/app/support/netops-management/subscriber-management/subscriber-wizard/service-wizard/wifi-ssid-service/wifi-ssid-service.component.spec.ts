import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CustomMaxDirective } from 'src/app/support/shared/custom-directives/custom-max.directive';
import { CustomMinDirective } from 'src/app/support/shared/custom-directives/custom-min.directive';
import { CustomPatternDirective } from 'src/app/support/shared/custom-directives/custom-pattern.directive';
import { SupportRadioService } from 'src/app/support/shared/service/support-radio.service';
import { SSIDNamePattern } from 'src/app/support/shared/service/utility.class';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { addDeviceObj_for_service, deviceData_for_wifi, editDeviceObj_for_service, featureProperties } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/service-wizard/service-wizard';

import { WifiSsidServiceComponent } from './wifi-ssid-service.component';

describe('WifiSsidServiceComponent', () => {
  let component: WifiSsidServiceComponent;
  let fixture: ComponentFixture<WifiSsidServiceComponent>;

  let supportRadioService: SupportRadioService;
  let translateService: TranslateService;
  let dateUtilsService: DateUtilsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WifiSsidServiceComponent,
        CustomMinDirective,
        CustomMaxDirective,
        CustomPatternDirective
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
      ],
      providers: [
        TranslateService,
        SupportRadioService,
        DateUtilsService,
        SsoAuthService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(WifiSsidServiceComponent);
        component = fixture.componentInstance;
        component.tempWifiObj = addDeviceObj_for_service.services.wifiSSID;
        component.wifiSSIDObj = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
        component.wifiSSIDObj.securityType = undefined;
        component.wifiSSIDObj.encryption = undefined;
        component.wifiSSIDObj.passphrase = undefined;
        component.wifiSSIDObj.name = undefined;
        // fixture.detectChanges();
        component.Networktype = '2.4GHz Primary SSID';
        component.deviceData = deviceData_for_wifi;
        component.ssidNamePattern = SSIDNamePattern;
        window.history.pushState({ editDeviceObj: editDeviceObj_for_service }, '');
        fixture.detectChanges();
        sessionStorage.setItem('Orgacceforssid', 'true');
        component.editMode = true;

        supportRadioService = TestBed.inject(SupportRadioService);
        dateUtilsService = TestBed.inject(DateUtilsService);
        translateService = TestBed.inject(TranslateService);
      })
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('Ng-OnInit test', () => {
    spyOn(component, 'emitData').and.callThrough();
    spyOn(component.emitWifiObj, 'emit').and.callThrough();
    component.wifiSSIDObj.securityType = 'AES';
    component.wifiType = "UNIFIED_PRIMARY_SSID";
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    component.ngOnInit();
    expect(component.emitData).toHaveBeenCalled();
    expect(component.emitWifiObj.emit).toHaveBeenCalled();
  });

  it('access passphrase API test', () => {
    let ssidObj = {
      name: "lklkjajsfdsa",
      serviceEnabled: "true",
      securityType: "11iandWPA3",
      encryption: "AESEncryption",
      passphrase: "12345678"
    }
    let wifiSSIDObj = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;

    spyOn(supportRadioService, 'Savepasspharseauditlog').and.returnValue(of({ "Result": "success" }));
    component.accesspopupedit(ssidObj);
    component.hidepassWordEditOldModel(wifiSSIDObj);
    expect(supportRadioService.Savepasspharseauditlog).toHaveBeenCalled();
    component.passWordEditOldModel(wifiSSIDObj);
    fixture.detectChanges();
    component.oldpassword = true;
    wifiSSIDObj.passphrase = '';
    component.emptypassword = true;
    fixture.detectChanges();
    component.passWordEditOldModel(wifiSSIDObj);
    fixture.detectChanges();
    component.oldpassword = true;
    wifiSSIDObj.passphrase = '';
    component.emptypassword = false;
    fixture.detectChanges();
    component.passWordEditOldModel(wifiSSIDObj);
    fixture.detectChanges();
    component.oldpassword = true;
    wifiSSIDObj.passphrase = '12345678';
    component.emptypassword = false;
    fixture.detectChanges();
    component.passWordEditOldModel(wifiSSIDObj);
  });

  it('checksubvalidatechange', () => {
    component.prevEncryptionValue = '11i';

    component.checksubvalidatechange();
    component.editaccesspasspharsepopupclose();
    component.editpasspharsealertpopupclose();
    component.onSecondaryKeyPhraseChange('');
    fixture.detectChanges();
    component.checksubvalidate = true;
    component.checksubvalidatechange();
  });

  it('emitData', () => {
    component.wifiSSIDObj.securityType = 'WPAand11i';
    component.prevEncryptionValue = '11i';
    component.deviceData = deviceData_for_wifi;
    component.oldData = editDeviceObj_for_service;
    component.emitData('security');
    fixture.detectChanges();
    component.wifiSSIDObj.securityType = 'WPA';
    component.emitData('security');
    fixture.detectChanges();
    component.wifiSSIDObj.securityType = 'WPA3';
    component.emitData('security');
    fixture.detectChanges();
    component.wifiSSIDObj.securityType = '11i';
    component.emitData('security');
    fixture.detectChanges();
    component.wifiSSIDObj.securityType = '11iandWPA3';
    component.emitData('security');
    fixture.detectChanges();
  });

  it('emitData else', () => {
    component.wifiSSIDObj.securityType = 'WPAand11i';
    component.prevEncryptionValue = '11i';
    component.deviceData = {};
    component.oldData = editDeviceObj_for_service;
    component.wifiSSIDObj.passphrase = '12QQWQq';
    component.editMode = false;
    component.wifiType = "UNIFIED_PRIMARY_SSID";
    component.emitData('security');
    // fixture.detectChanges();
  })

  it('error handling', () => {
    let ssidObj = {
      name: "lklkjajsfdsa",
      serviceEnabled: "true",
      securityType: "11iandWPA3",
      encryption: "AESEncryption",
      passphrase: "12345678"
    }
    spyOn(supportRadioService, 'Savepasspharseauditlog').and.returnValue(throwError(errorStatus401));
    component.accesspopupedit(ssidObj);
    fixture.detectChanges();
    component.Networktype = "UNIFIED_PRIMARY_SSID";
    component.ssidfreetextedit = true;
    component.accesspopupedit(ssidObj);
    fixture.detectChanges();
    component.Orgacceforssid = 'false'
    component.accesspopupedit(ssidObj);

    let wifiSSIDObj = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
    wifiSSIDObj.name = 'ABCD';
    wifiSSIDObj.securityType = '11i';
    component.oldData = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_5GHZ_SSID;
    component.oldData.securityType = 'Basic';
    component.oldData.passphrase = '12345678';
    component.checkPassewordRequiredOrNot(wifiSSIDObj);
    component.checkSecurityRequiredOrNot(wifiSSIDObj);

  })

  it('findObject', () => {
    let wifiSSIDObj = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
    let security = [{ "description": "none", "value": 0 }, { "description": "WPA2-Personal", "value": 1 }, { "description": "WPA-WPA2-Personal", "value": 2 }, { "description": "WPA2-WPA3-Personal", "value": 5 }, { "description": "WPA3-Personal", "value": 6 }
    ]
    component.findObject(security, 'WPA2-Personal');
    component.checkSecurityRequiredOrNot(wifiSSIDObj);
    component.changeSecurityType();

    fixture.detectChanges();
    component.wifiSSIDObj = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
    component.wifiSSIDObj.securityType = 'Basic';
    wifiSSIDObj.name = 'ABCD';
    wifiSSIDObj.securityType = '11i';
    component.oldData = addDeviceObj_for_service.services.wifiSSID.X_CALIX_SXACC_PRIMARY_5GHZ_SSID;
    component.oldData.securityType = 'Basic';
    component.oldData.passphrase = '12345678';
    component.checkPassewordRequiredOrNot(wifiSSIDObj);
  })

});
