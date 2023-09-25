import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, DebugElement, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { combineLatest, of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { edit_pr_data, environment, subscriber, subscriber_data } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-management';
import * as subs_wizard from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/subscriber-wizard';
import { DeviceGroupService } from '../../operations/services/device-group.service';
import { ProfileService } from '../../operations/services/profile.service';
import { ManagementService } from '../service/management.service';

import { SubscriberWizardComponent } from './subscriber-wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SubscriberWizardComponent', () => {
  let component: SubscriberWizardComponent;
  let fixture: ComponentFixture<SubscriberWizardComponent>;
  let service: DataServiceService;
  let Device_service: DeviceGroupService;
  let managementService: ManagementService;
  let translateService: TranslateService;
  let profilService: ProfileService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/subscriber-wizard' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriberWizardComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        TranslateService,
        SsoAuthService,
        DataServiceService,
        DeviceGroupService,
        ProfileService,
        ManagementService,
        HttpClient, Title,
        ChangeDetectorRef,
        // { provide: Router, useValue: routerSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SubscriberWizardComponent);
        window.history.pushState({ menuDelete: false,subscriberData: subscriber  }, '');
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges();

        service = TestBed.inject(DataServiceService);
        Device_service = TestBed.inject(DeviceGroupService);
        managementService = TestBed.inject(ManagementService);
        translateService = TestBed.inject(TranslateService);
        profilService = TestBed.inject(ProfileService)
        httpTestingController = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
        window.history.pushState({ menuDelete: false,subscriberData: subscriber  }, '');
      })
  });


  it('Ng onInit test', fakeAsync(() => {
    spyOn(component, 'initAddDeviceOject').and.callThrough();
    spyOn(component, 'getDeviceData').and.callThrough();
    spyOn(component, 'getProfileData').and.callThrough();
    spyOn(component, 'onTabChange').and.callThrough();
    spyOn(component, 'getStaticGroupMemebers').and.callThrough();
    spyOn(component, 'getSubscriberServices').and.callThrough();
    spyOn(managementService, 'getSubscriberServices').and.returnValue(of(subs_wizard.services_mock_res));
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = true;
    window.history.pushState({ subscriberData: subscriber, selectedDeviceInfo: subscriber, isNewRecord: true, isUnassociateSubscriber: true, searchText: '' || '', isProvision: true }, '');
    fixture.detectChanges();
    component.ngOnInit();
    flush(4000);
    expect(component.initAddDeviceOject).toHaveBeenCalled();
    expect(component.getDeviceData).toHaveBeenCalled();
    expect(component.getProfileData).toHaveBeenCalled();
    expect(component.onTabChange).toHaveBeenCalled();
    expect(component.getStaticGroupMemebers).toHaveBeenCalled();
    expect(component.getSubscriberServices).toHaveBeenCalled();
  }));

  //for getDeviceData start
  it('Ng-test for getDeviceData', fakeAsync(() => {
    spyOn(Device_service, 'getDeviceGoupCount').and.returnValue(of({ count: 1 }));
    spyOn(Device_service, 'getDeviceGoupList').and.returnValue(of(subs_wizard.device_List));
    component.getDeviceData();
    flush(1000);
    expect(component.deviceDataList).toEqual(subs_wizard.device_List);
  }));

  it('Ng-test for getDeviceData getDeviceGoupCount error handling', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    spyOn(Device_service, 'getDeviceGoupCount').and.returnValue(throwError(errorStatus401));
    component.getDeviceData();
    expect(component.pageErrorHandle).toHaveBeenCalled();
  })
  it('Ng-test for getDeviceData getDeviceGoupList error handling ', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    spyOn(Device_service, 'getDeviceGoupCount').and.returnValue(of({ count: 1 }));
    spyOn(Device_service, 'getDeviceGoupList').and.returnValue(throwError(errorStatus401));
    component.getDeviceData();
    expect(component.pageErrorHandle).toHaveBeenCalled();
  })
  //for getDeviceData end

  it('Test getDeviceModels', () => {
    spyOn(component, 'getDeviceModels').and.callThrough();
    component.getDeviceModels();
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/netops-device/device-type?matcher') && reqs.method == 'GET'
    });
    req[0].flush(subs_wizard.device_type);
    req[1].flush(subs_wizard.device_type);
    fixture.detectChanges();
    expect(component.deviceModels).toEqual(["844E-1"]);
  });

  // getProfileData start
  it('Ng-test for getProfileData', () => {
    window.history.pushState({ menuDelete: false, isNewRecord: false }, '');
    component.editDeviceObj = edit_pr_data;
    fixture.detectChanges();
    spyOn(profilService, 'getProfileList').and.returnValue(of(subs_wizard.config_list));
    component.getProfileData();
    expect(component.allProfileList).toEqual(subs_wizard.config_list);
  });
  it('Ng-test for getProfileData Error handling', () => {
    spyOn(profilService, 'getProfileList').and.returnValue(throwError(errorStatus401));
    component.getProfileData();
    expect(profilService.getProfileList).toHaveBeenCalled();
  });
  // getProfileData start

  // getDialPlanList start
  it('Ng-test for getDialPlanList', () => {
    spyOn(managementService, 'getDialPlanList').and.returnValue(of(subs_wizard.dial_plan_res));
    component.getDialPlanList();
    expect(managementService.getDialPlanList).toHaveBeenCalled();
  })
  it('Ng-test for getDialPlanList error handling', () => {
    spyOn(managementService, 'getDialPlanList').and.returnValue(throwError(errorStatus401));
    component.getDialPlanList();
    expect(managementService.getDialPlanList).toHaveBeenCalled();
  })
  // getDialPlanList end

  it('Ng-test for getStaticGroupMemebers', () => {
    spyOn(managementService, 'getStaticGroupMembers').and.returnValue(of(subs_wizard.static_grp_list));
    component.getStaticGroupMemebers();
    expect(component.staticGroupTypes).toEqual(subs_wizard.static_grp_list_valid);
  })

  it('Ng-test for initAddDeviceOject', () => {
    spyOn(component, 'initAddDeviceOject').and.callThrough();
    component.initAddDeviceOject(undefined)
    fixture.detectChanges()
    expect(component.addDeviceObj.isNewRecord).toEqual(subs_wizard.addDeviceObj_init.isNewRecord);
  })

  //for getPRAndFDDeviceInfo start
  it('Ng-test for getPRAndFDDeviceInfo', () => {
    spyOn(managementService, 'callRestApi').and.callThrough();
    fixture.detectChanges()
    component.getPRAndFDDeviceInfo('CXNK008A4948', undefined);
    // component.combineLatestPR = combineLatest([subs_wizard.pr_data]);
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/subscriber-provisioning/provisioning-record')
    });
    req[0].flush(subs_wizard.pr_data);
    // req[1].flush(subs_wizard.pr_data);
    expect(managementService.callRestApi).toHaveBeenCalled();
  });
  it('Ng-test for getPRAndFDDeviceInfo error handling', () => {
    spyOn(managementService, 'callRestApi').and.callThrough();
    // component.combineLatestPR = combineLatest([subs_wizard.pr_data]);
    fixture.detectChanges()
    component.getPRAndFDDeviceInfo('CXNK008A4948', undefined);
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/subscriber-provisioning/provisioning-record')
    });
    req[0].flush(errorStatus401);
    expect(managementService.callRestApi).toHaveBeenCalled();
  });
  //getPRAndFDDeviceInfo end

  // for loadSubscriberdata start
  it('Ng-test for loadSubscriberdata', () => {
    spyOn(service, 'performSearch').and.returnValue(of(subs_wizard.subscriber_data_res));
    component.loadSubscriberdata('CXNK7326323');
    expect(service.performSearch).toHaveBeenCalled();
  });
  it('Ng-test for loadSubscriberdata error handling', () => {
    spyOn(service, 'performSearch').and.returnValue(throwError(errorStatus401));
    component.loadSubscriberdata('CXNK7326323');
    expect(service.performSearch).toHaveBeenCalled();
  });
  // for loadSubscriberdata end

  // for onValidateExistingDevice start
  it('Ng-test for onValidateExistingDevice', () => {
    component.onValidateExistingDevice('CXNK7326323');
    component.searchDeviceByMACAddressDetail('00:00:5e:00:53:af');
    const req = httpTestingController.expectOne(reqs => {
      return reqs.url.includes('/subscriber-search')
    });
    req.flush(subs_wizard.subscriber_data_res);
  });
  it('Ng-test for onValidateExistingDevice else', () => {
    component.onValidateExistingDevice('');
  });
  // for onValidateExistingDevice end

  // for buildeServiceProfileList start
  it('Ng-test for buildeServiceProfileList', () => {
    component.buildeServiceProfileList(subs_wizard.config_list);
    component.getBridgePort(subs_wizard.config_list[0].configurations[0].parameterValues);
    let config = subs_wizard.config_list[0].configurations[0];
    config.parameterValues.Mode = 'ONT Full Bridge';
    component.getVLANValue(config);
  });
  it('Ng-test for buildeServiceProfileList else', () => {
    component.onValidateExistingDevice('');
  });
  // for buildeServiceProfileList end

  it('ng test for functions 1', fakeAsync(() => {
    let config = subs_wizard.config_list[0].configurations[0];
    component.getVLANValue(config);
    component.editDeviceObj = subs_wizard.edit_device_OntData;
    component.editDeviceObj.voice.ServiceType = 'SIP';
    component.addDeviceObj = subs_wizard.addDeviceObj_with_data;
    component.editDeviceObj.rgConfigMode = true;
    fixture.detectChanges();
    component.pathSettingsData();
    component.getStaticGroupList();
    component.patchVoiceServiceData();
    component.patchVoiceLineData(1);
    component.lineServiceValidation('lineOne');
    // component.patchONTServiceData('Video Service');
    component.patchONTServiceData('Voice Service');
    component.patchVoiceProfile('Voice Service');
    component.subscriberInfo = { subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22" }
    component.voiceStatus = false;
    component.tempWifiObj = component.addDeviceObj.services.wifiSSID;
    spyOn(component, 'voiceServiceValidation').and.returnValue([]);
    spyOn(component, 'dataVidoeServiceValidation').and.returnValue(false);
    window.history.pushState({ menuDelete: false, isNewRecord: false, editDeviceObj: { staticGroupMember: ["08c1106e-0137-4fa9-aeee-d4dbd5fa6e05"] } }, '');
    component.updatedOpmode = new Event('click');
    component.addDeviceObj.device.deviceMode = 'Managed ONT';

    component.onSaveDeviceInfo();
    component.checkKeyPassPhraseLength(component.addDeviceObj);
    flush(2000);
  }));

  it('ng test for functions 2', fakeAsync(() => {
    component.addDeviceObj = subs_wizard.addDeviceObj_with_all_data;
    component.editDeviceObj = subs_wizard.edit_device_rg;
    component.patchVideoServiceData();
    component.patchDataServiceData();
    component.initSeriveObjects('Data');
    fixture.detectChanges();
    component.initSeriveObjects('Video');
    fixture.detectChanges();
    component.initSeriveObjects('Voice');
    fixture.detectChanges();
    component.initSeriveObjects('WIFI');
    fixture.detectChanges();
    component.voiceServiceValidation();
    component.buildWIFIReqObj();
    component.buildDataReqObj();
    component.buildVideoReqObj();
    component.buildVoiceReqObj();
    component.buildPortsObj();
    component.buildONTModeReqObject();
    component.checkSettingsChanged(subs_wizard.addDeviceObj_with_data.settings);
    spyOn(component, 'voiceServiceValidation').and.returnValue([]);
    spyOn(component, 'dataVidoeServiceValidation').and.returnValue(false);
    window.history.pushState({ menuDelete: false, isNewRecord: true }, '');
    component.subscriberInfo = { subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22" }
    component.voiceStatus = false;
    component.tempWifiObj = component.addDeviceObj.services.wifiSSID;
    component.onSaveDeviceInfo();
    component.checkKeyPassPhraseLength(component.addDeviceObj);

    tick(2000);
    //else
    spyOn(managementService, 'updateDeviceBySubscriber').and.returnValue(of({errorCode:`<b>asfafd</b>`,errorMessage:'some error'}));
    component.addDeviceObj.device.deviceMode = 'Managed ONT';
    component.onSaveDeviceInfo();

  }));
  it('ng test for functions 2 error and else', () => {
    component.addDeviceObj = subs_wizard.addDeviceObj_with_all_data;
    spyOn(component, 'voiceServiceValidation').and.returnValue([]);
    window.history.pushState({ menuDelete: false, isNewRecord: true }, '');
    component.subscriberInfo = { subscriberId: "92b54dc4-1191-49b8-b14a-0a4db0327a22" }
    spyOn(managementService, 'updateDeviceBySubscriber').and.returnValue(throwError(errorStatus401));
    spyOn(managementService, 'addDevice').and.returnValue(of({errorCode:`<b>asfafd</b>`,errorMessage:'some error'}));
    spyOn(managementService, 'getSubscriberServices').and.returnValue(throwError(errorStatus401));

    component.voiceStatus = false;
    component.editMode = true;
    component.deviceProvRecord = subs_wizard.pr_data;
    fixture.detectChanges();
    component.onSaveDeviceInfo();
    component.dataVidoeServiceValidation();
    component.getWifiSsidMngrStngs({});
    component.disableComplete(new Event('click'));
    component.disableNext(new Event('click'));
    component.voiceStatusres(new Event('click'));
    component.changedOpmode(new Event('click'));
    component.confirmDeleteServicesAssociateWithSbscrbrMsg();
    component.closeDeleteServicesAssociateWithSbscrbrMsg();
    component.getSubscriberServices()
  })

});
