import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationManageService } from 'src/app/cco-foundation/foundation-systems/foundation-manage/foundation-manage.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { deviceModels, feature_properties, static_grp_list } from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/device-wizard';
import {
  addDeviceObj_init,
  addDeviceObj_with_all_data,
  deviceInfo,
  device_type,
  edit_device_rg
} from 'src/assets/mockdata/support/netops-management/subscriber-management/subscriber-wizard/subscriber-wizard';
import { environment } from 'src/environments/environment';
import { ManagementService } from '../../service/management.service';

import { DeviceWizardComponent } from './device-wizard.component';

describe('DeviceWizardComponent', () => {
  let component: DeviceWizardComponent;
  let fixture: ComponentFixture<DeviceWizardComponent>;
  let service: DataServiceService;
  let translateService: TranslateService;
  let managementService: ManagementService;
  let foundationService: FoundationManageService;
  let route: ActivatedRoute;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceWizardComponent, DataTableDirective],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, FormsModule
      ],
      providers: [
        TranslateService,
        DataServiceService,
        SsoAuthService,
        ManagementService,
        FoundationManageService,
        DataTablesModule,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ searchText: '' })
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DeviceWizardComponent);
        component = fixture.componentInstance;
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        component.hasWriteAccessForDevice = true;
        component.orgId = '470053';
        component.addDeviceObj = addDeviceObj_init;
        component.deviceModels = deviceModels;
        component.staticGroupList = static_grp_list;
        fixture.detectChanges();
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(DataServiceService);
        translateService = TestBed.inject(TranslateService);
        managementService = TestBed.inject(ManagementService);
        foundationService = TestBed.inject(FoundationManageService);
        window.history.pushState({ menuDelete: false, isProvision: true, searchText: '123abcd' }, '');

      })
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });


  it('Ng onInit Test', fakeAsync(() => {
    spyOn(component, 'getDeviceModels').and.callThrough();
    component.ngOnInit();
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    environment.VALIDATE_SCOPE = "true";
    tick(2000);
    expect(component.getDeviceModels).toHaveBeenCalled();
    fixture.detectChanges();
  }));

  it('Reg-id test', () => {
    spyOn(component, 'onValidateExisitingDevice').and.callThrough();
    component.regId = 'dataTest';
    let fsan = fixture.nativeElement.querySelector('#fsan');
    fsan.dispatchEvent(new Event('blur'));//for trigger events
    expect(component.onValidateExisitingDevice).toHaveBeenCalled();
    fixture.detectChanges();
  });



  it('Model Select test', () => {
    spyOn(component, 'onModelChange').and.callThrough();
    let model = fixture.nativeElement.querySelector('ng-select[name="deviceModel"]');
    component.addDeviceObj.device.selectedModel = 'GS4220E';
    model.dispatchEvent(new Event('change'));//for trigger events
    expect(component.onModelChange).toHaveBeenCalled();
    fixture.detectChanges();
  });

  it('Test Feature properties API', () => {
    component.addDeviceObj.device.selectedModel = 'GS4220E';
    spyOn(component, 'onModeRadioBtnDisplayNew').and.callThrough();
    spyOn(component.wifiSsidMngrStngs, 'emit').and.callThrough();
    component.getFeatureProperties(component.addDeviceObj.device.selectedModel, true);
    const req = httpTestingController.expectOne(reqs => {
      return reqs.url.includes('device/feature-properties');
    });
    req.flush(feature_properties);
    fixture.detectChanges();
    expect(component.wifiSsidMngrStngs.emit).toHaveBeenCalled();
    expect(component.onModeRadioBtnDisplayNew).toHaveBeenCalled();
  });

  it('Test getDeviceModels', () => {
    spyOn(component, 'getDeviceModels').and.callThrough();
    component.getDeviceModels();
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/netops-device/device-type?matcher') && reqs.method == 'GET'
    });
    req[0].flush(device_type);
    req[1].flush(device_type);
    fixture.detectChanges();
    expect(component.deviceModels).toEqual(["844E-1"]);
  });

  it('Test getDeviceModels error', () => {
    spyOn(component, 'getDeviceModels').and.callThrough();
    component.getDeviceModels();
    const req = httpTestingController.match(reqs => {
      return reqs.url.includes('/netops-device/device-type?matcher') && reqs.method == 'GET'
    });
    req[0].flush('No Data', { status: 404, statusText: 'Not Found' });
    req[1].flush('No Data', { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();
  });

  it('Replace button click Test', () => {
    let search_res = {
      "metadata": {
        "totalHits": 0
      },
      "records": []
    }
    spyOn(service, 'performSearch').and.returnValue(of(search_res));
    spyOn(foundationService, 'updateNewSystem').and.callThrough();
    component.doPerformReplaceDevice('fb63be9c-c705-4160-9a53-a34adfdaf734', 'kjhgfdsdfguikjhgfd', 'sometesting1');
    expect(foundationService.updateNewSystem).toHaveBeenCalled();
  });

  it('mode selection click Test', () => {
    let eventt = {
      target: {
        checked: true,
        value: "Managed ONT"
      }
    }
    window.history.pushState({ menuDelete: false, isProvision: true, searchText: '123abcd', editDeviceObj: { opModeWithOnt: 'ONT' } }, '');
    component.handleModeChange(eventt);
    fixture.detectChanges();
    component.handleModeChange(eventt.target.value = 'RG');
    fixture.detectChanges();
    component.handleModeChange(eventt.target.value = 'WAP');
    fixture.detectChanges();
    component.handleModeChange(eventt.target.value = 'WAP-IGMP');
    fixture.detectChanges();

    component.isValidOntModel({ opModeWithOnt: '' });

    component.isStaticGroup = true;
    component.addDeviceObj = addDeviceObj_with_all_data;
    fixture.detectChanges();
    component.checkIsStaticGroup();
    component.isValidOntModel({ opModeWithOnt: 'ONT' });
  });

  it('feature properties Test', () => {
    component.addDeviceObj.device.selectedModel = 'GS4220E';
    spyOn(component, 'onModeRadioBtnDisplayNew').and.callThrough();
    component.getFeatureProperties(component.addDeviceObj.device.selectedModel, true);
    const req = httpTestingController.expectOne(reqs => {
      return reqs.url.includes('device/feature-properties');
    });
    req.flush(feature_properties);
    component.addDeviceObj.device.deviceMode = '';
    fixture.detectChanges();
    expect(component.onModeRadioBtnDisplayNew).toHaveBeenCalled();
  });

  it('getDeviceInfo Test RG', fakeAsync(() => {
    component.addDeviceObj = addDeviceObj_with_all_data;
    component.isProvision = true;
    fixture.detectChanges();
    let devInfo = deviceInfo;
    devInfo.opMode = 'WAP';
    spyOn(service, 'getDeviceDetails').and.returnValue(of(devInfo));
    component.getDeviceInfo();
    component.replaceDeviceId = '';
    component.replaceDevice('123abcd', '123123ab');

    fixture.detectChanges();
    devInfo.opMode = 'WAP-IGMP';
    component.getDeviceInfo();

    component.editDeviceObj = edit_device_rg;
    spyOn(service, 'performSearch').and.returnValue(of(null));
    spyOn(foundationService, 'updateNewSystem').and.returnValue(of({}));
    component.doPerformReplaceDevice('fb63be9c-c705-4160-9a53-a34adfdaf734', 'kjhgfdsdfguikjhgfd', 'sometesting1');
    tick(4000);
    component.assignDeviceReplace('fb63be9c-c705-4160-9a53-a34adfdaf734', 'sometesting1', {});
    component.clsAlphaNoOnly(new Event('change'));
    component.notONT1({ ont: 'ONT' });
  }));
  it('getDeviceInfo Test Error', () => {
    component.addDeviceObj = addDeviceObj_with_all_data;
    fixture.detectChanges();
    spyOn(service, 'getDeviceDetails').and.returnValue(throwError(errorStatus401));
    component.getDeviceInfo();

    component.editDeviceObj = edit_device_rg;
    spyOn(service, 'performSearch').and.returnValue(throwError(errorStatus401));
    component.doPerformReplaceDevice('fb63be9c-c705-4160-9a53-a34adfdaf734', 'kjhgfdsdfguikjhgfd', 'sometesting1');
  })
  it('getDeviceInfo Test else', () => {
    component.addDeviceObj = addDeviceObj_with_all_data;
    fixture.detectChanges();
    spyOn(service, 'getDeviceDetails').and.returnValue(of(null));
    component.getDeviceInfo();
    component.replaceDeviceId = '12332123';
    component.replaceDevice('123abcd', '123123ab');

    component.editDeviceObj = edit_device_rg;
    spyOn(service, 'performSearch').and.returnValue(of(null));
    spyOn(foundationService, 'updateNewSystem').and.returnValue(throwError(errorStatus401));
    component.doPerformReplaceDevice('fb63be9c-c705-4160-9a53-a34adfdaf734', 'kjhgfdsdfguikjhgfd', 'sometesting1');
  })
});
