import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CustomReplacePipe } from 'src/app/support/shared/custom-pipes/coustom-replace.pipe';
import { EnglishJSON } from 'src/assets/language/english.service';
import { featuremockjson, feature_properties_res } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-management';
import {
  addDeviceObj_for_service,
  deviceData_for_wifi,
  editDeviceObj_for_service,
  featureProperties,
  addDeviceObj_with_all_data_ref,
} from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/service-wizard/service-wizard';
import { environment } from 'src/environments/environment';
import { ManagementService } from '../../service/management.service';

import { ServiceWizardComponent } from './service-wizard.component';
import { VoiceLineServiceComponent } from './voice-line-service/voice-line-service.component';
import { WifiSsidServiceComponent } from './wifi-ssid-service/wifi-ssid-service.component';

describe('ServiceWizardComponent', () => {
  let component: ServiceWizardComponent;
  let fixture: ComponentFixture<ServiceWizardComponent>;

  let httpTestingController: HttpTestingController;
  let managementService: ManagementService;
  let translateService: TranslateService;

  let app: WifiSsidServiceComponent;
  let fixt: ComponentFixture<WifiSsidServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceWizardComponent, VoiceLineServiceComponent, WifiSsidServiceComponent, CustomReplacePipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        //ChangeDetectorRef,
        SsoAuthService,
        HttpClient,
        ManagementService,
        TranslateService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {
        //child
        fixt = TestBed.createComponent(WifiSsidServiceComponent);
        app = fixt.componentInstance;
        app.deviceData = deviceData_for_wifi;
        fixt.detectChanges();
        window.history.pushState({ editDeviceObj: editDeviceObj_for_service }, '');
        app.ngOnInit();

        fixture = TestBed.createComponent(ServiceWizardComponent);
        component = fixture.componentInstance;
        component.addDeviceObj = addDeviceObj_with_all_data_ref;
        component.editMode = false;
        component.switchedWifiSSID = '2.4GHz Primary SSID';
        component.isSSID2_4GZ = true;
        fixture.detectChanges();
        window.history.pushState({ editDeviceObj: editDeviceObj_for_service }, '');
        // component.ftrProperties = featuremockjson;

        translateService = TestBed.inject(TranslateService);
        managementService = TestBed.inject(ManagementService);
        httpTestingController = TestBed.inject(HttpTestingController);

      })
  });

  // afterEach(() => { 
  //   fixture.destroy(); 
  // });

  it('ng OnInit test', fakeAsync(() => {
    component.addDeviceObj = addDeviceObj_for_service;
    spyOn(component, 'onblurValidation').and.callThrough();
    component.ngOnInit();
    // expect(component.language.Service_Profile).toEqual(language_data.Service_Profile)
    expect(component.onblurValidation).toHaveBeenCalled();
    tick(40);
  }));

  it('Test onblurValidation', () => {
    component.addDeviceObj = addDeviceObj_for_service;
    spyOn(component, 'onblurValidation').and.callThrough();
    spyOn(component.disableNext, 'emit').and.callThrough();
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    expect(component.onblurValidation).toHaveBeenCalled();
    expect(component.disableNext.emit).toHaveBeenCalledWith(false);
  });

  it('Test onSwitchingWifiSSID', () => {
    component.addDeviceObj = addDeviceObj_for_service;
    fixture.detectChanges();
    component.onSwitchingWifiSSID('2.4GHz Primary SSID');
    expect(component.switchedWifiSSID).toEqual('2.4GHz Primary SSID')
  });

  it('functions testing', fakeAsync(() => {
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    component.addDeviceObj.services.ontDataService[0].serviceProfile.defaultConnectionService = true;
    component.ftrPropertiesVoice_status(featureProperties.properties.filter(res => res.featureName == 'VoiceStatus'));
    component.handleOnOffBtn('DataService');
    fixture.detectChanges();
    component.handleOnOffBtn('VideoService');
    fixture.detectChanges();
    component.handleOnOffBtn('');
    fixture.detectChanges();
    component.onAddAndRemoveDataService(1);
    fixture.detectChanges();
    component.onAddAndRemoveDataService(-1);
    fixture.detectChanges();
    component.onAddAndRemoveVoiceService(true);
    fixture.detectChanges();
    component.addDeviceObj.services.voiceService.lineOne.isVoiceService = true;
    component.onSwitchingLines('LineOne'); 
    component.onSwitchingWifiSSIDRadio('5G');
    component.handleDropDownCahnge('1',{},'0');
    component.checkValidation('faxRelay','');
    component.onDropDownChange(new Event('click'));
    component.onDNSServerValidation('inValidDNSServer','74');
    component.changeUnifiedWiFiSID({target:{checked:false}});

    tick(3500);
  }));
  it('functions testing 2', fakeAsync(() => {
    spyOn(component,'bridgeMBRPortValidation').and.callFake(()=>{
      return true
    })
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    component.addDeviceObj.services.showDataServiceByDefault = false;
    // component.addDeviceObj.services.ontDataService[0].serviceProfile.defaultConnectionService = true;
    component.ftrPropertiesVoice_status(featureProperties.properties.filter(res => res.featureName == 'VoiceStatus'));
    component.onAddAndRemoveDataService(-1);
    fixture.detectChanges();
    component.onAddAndRemoveVideoService(1);
    fixture.detectChanges();
    component.onAddAndRemoveVideoService(-1);
    fixture.detectChanges();
    component.addDeviceObj.services.voiceService.showVocieService = true;
    component.onAddAndRemoveVoiceService();
    component.noDifferentSystem();
    component.validateHostNAmeAndIPAddress('74.125.68.102');
    component.changeUnifiedWiFiSID({target:{checked:true}});
    fixture.detectChanges();
    component.addDeviceObj.services.voiceService.lineTwo.isVoiceService = true;
    component.onSwitchingLines('LineTwo');
    component.onDNSServerValidation('inValidDNSServer','74.125.68.102');
    tick(3500);
    component.isSSID2_4GZ = true;
    component.isSSID5_4GZ = true;
    component.compareWifiSIDs(false, false,false);
    // component.bridgeMBRPortValidation(component.addDeviceObj.services.ontVideoService[component.addDeviceObj.services.ontVideoService.length]);


  }));

  it('functions test 3',()=>{
    spyOn(component,'bridgeMBRPortValidation').and.callFake(()=>{
      return true
    })
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    // component.addDeviceObj.services.ontDataService[0].serviceProfile.defaultConnectionService = true;
    component.addDeviceObj.services.voiceService.serviceType = 'MGCP';
    component.onVoiceServiceTypeChange();
    fixture.detectChanges();
    component.addDeviceObj.services.voiceService.serviceType = 'TDM GW';
    component.onVoiceServiceTypeChange();
    component.findObjByKeyValue('SSID17', feature_properties_res.properties);
    var wifiSSIDs = component.addDeviceObj.services.wifiSSID;
    var two_four_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID;
    var five_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_5GHZ_SSID;
    var six_Ghz = wifiSSIDs?.X_CALIX_SXACC_PRIMARY_6GHZ_SSID;
    component.compareWifiSIDs(two_four_Ghz, five_Ghz, six_Ghz);
    component.bridgeMBRPortValidation(component.addDeviceObj.services.ontVideoService[component.addDeviceObj.services.ontVideoService.length - 1]);
  })

  it('onblurValidation', () => {
    component.addDeviceObj = addDeviceObj_for_service;
    fixture.detectChanges();
    // component.onblurValidation("inValidVLan",component.addDeviceObj.services.ontDataService[1]);
    environment.VALIDATE_SCOPE = "true";
  });

  it('noDifferentSystem', () => {
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    component.editMode = editDeviceObj_for_service;
    spyOn(component,'compareWifiSIDs').and.returnValue(true);
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/device/feature-properties')
    });
    req[0].flush(featureProperties);
    req[1].flush(featureProperties);
    component.noDifferentSystem();
  });

  it(' closeDeleteServicesAssociateWithSbscrbrMsg()', () => {
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    component.editMode = editDeviceObj_for_service;
    spyOn(component,'compareWifiSIDs').and.returnValue(true);
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/device/feature-properties')
    });
    let ftrProperties = featureProperties;
    let index = ftrProperties.properties.findIndex(res =>res.featureName == "SSID17");
    delete ftrProperties.properties[index];
    // ftrProperties
    req[0].flush(ftrProperties);
    req[1].flush(ftrProperties);
    component.closeDeleteServicesAssociateWithSbscrbrMsg();
  });

  it(' validateHostNAmeAndIPAddress()', () => {
    let wifiSSID = {
      '2DOT4GHZ_PRIMARY' : true,
      '2DOT4GHZ_GUEST' : true,
      '5GHZ_PRIMARY' : true,
      '5GHZ_GUEST' : true,
    }
    component.wifiSsidMngrStngsValues = wifiSSID;
    component.wifiSsidMngrStngsValues;
    component.validateHostNAmeAndIPAddress('1.1.1.1');
  });

  it(' changeUnifiedWiFiSID()', () => {
    component.addDeviceObj = addDeviceObj_with_all_data_ref;
    component.changeUnifiedWiFiSID({target:{checked:true}});
    component.tempWifiObj = component.addDeviceObj.services.wifiSSID;
    component.editMode = editDeviceObj_for_service;
    component.checkKeyPassPhraseLength(component.addDeviceObj.services.wifiSSID);
  }); 

});
