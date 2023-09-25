import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { acsSettingsData, orgAcsData } from 'src/assets/mockdata/admin/acsconfiguration/acsconfiguration.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { CommonService } from '../../services/common.service';
import { OrganizationApiService } from '../../services/organization-api.service';

import { AcsSettingsComponent } from './acs-settings.component';

describe('AcsSettingsComponent', () => {
  let component: AcsSettingsComponent;
  let fixture: ComponentFixture<AcsSettingsComponent>;
  let router: Router;
  let service: OrganizationApiService;
  let languageService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcsSettingsComponent],
      imports: [
        HttpClientTestingModule
        , RouterTestingModule,
        FormsModule
      ],
      providers: [
        CommonService, OrganizationApiService, SsoAuthService, TranslateService, CommonFunctionsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcsSettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(OrganizationApiService);
    languageService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should getAcsList Details', () => {
    spyOn(service, 'ACSList').and.returnValue(of(acsSettingsData))
    spyOn(component, 'getACSList').and.callThrough()
    component.getACSList()
    expect(component.acsOld).toBeTruthy('value is not matched')
    expect(component.acsOld).toBe(acsSettingsData, 'value mismatched')
    expect(component.getACSList).toHaveBeenCalled()
    expect(component.getACSList).toHaveBeenCalledTimes(1)

  });

  it('should get organizations details', () => {
    spyOn(service, 'OrganzationDetail').and.returnValue(of(orgAcsData))
    spyOn(component, 'createNew').and.callThrough()
    component.createNew()
    expect(component.orgDetails).toBeTruthy('value is not matched')
    expect(component.orgDetails).toBe(orgAcsData, 'value mismatched')
    expect(component.createNew).toHaveBeenCalled()
    expect(component.createNew).toHaveBeenCalledTimes(1)
  })

  it('should getOrg details', () => {
    spyOn(service, 'OrganzationDetail').and.returnValue(of(orgAcsData))
    spyOn(component, 'getOrgDetails').and.callThrough()
    component.getOrgDetails()
    expect(component.loading).toBeFalse()
    expect(component.orgDetails).toBeTruthy('value is not matched')
    expect(component.orgDetails).toBe(orgAcsData, 'value mismatched')
    expect(component.getOrgDetails).toHaveBeenCalled()
    expect(component.getOrgDetails).toHaveBeenCalledTimes(1)
  })

  it('should update', () => {
    component.aclUsername = 'acs-user-ggnMg'
    component.apiUsername = 'api-user-mxbov'
    component.password = 'ORBDzLbYkqXeEmr'
    component.apiClientPassword = 'ttzdw1wFi4A4vFH'
    component.acslist = acsSettingsData;
    component.orgDetails = orgAcsData;
    spyOn(service, 'ACSUpdate').and.returnValue(of({}))
    spyOn(component, 'validateACSUsernames').and.callThrough()
    component.acsSave()
    expect(component.successInfo).toBeTruthy()
    expect(component.successInfo).toMatch('ACS Settings Updated Successfully')
    expect(component.validateACSUsernames).toHaveBeenCalled()
  })

  it('should close alert details', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    component.closeAlert()
    expect(component.error).toBeFalse();
    expect(component.success).toBeFalse();
    expect(component.closeAlert).toHaveBeenCalled()
    expect(component.closeAlert).toHaveBeenCalledTimes(1)
  });

  it('should call resetValidations', () => {
    spyOn(component, 'resetValidations').and.callThrough()
    component.resetValidations()
    expect(component.acsShowButtons).toBeFalse();
    expect(component.acsSaveClicked).toBeFalse();
    expect(component.acsUsernameErr).toBeFalse();
    expect(component.apiUsernameErr).toBeFalse();
    expect(component.captiveUrlErr).toBeFalse()
    expect(component.resetValidations).toHaveBeenCalled()
    expect(component.resetValidations).toHaveBeenCalledTimes(1)

  })

  it('should handle errors', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401)
    expect(component.errorInfo).toMatch('Access Denied')
    expect(component.pageErrorHandle).toHaveBeenCalled()
    expect(component.pageErrorHandle).toHaveBeenCalledTimes(1)
  })

  it('should changeInput Details', () => {
    spyOn(component, 'on_ChangeACSInput').and.callThrough()
    component.on_ChangeACSInput()
    expect(component.acsShowButtons).toBe(true)
    expect(component.on_ChangeACSInput).toHaveBeenCalled()
    expect(component.on_ChangeACSInput).toHaveBeenCalledTimes(1)

  })

  it('should call changeAcsPassword Details', () => {
    component.password = ''
    spyOn(component, 'changeAcsPassword').and.callThrough()
    component.changeAcsPassword()
    expect(component.acsPasswordErr).toBe(true)
    expect(component.changeAcsPassword).toHaveBeenCalled()
    expect(component.changeAcsPassword).toHaveBeenCalledTimes(1)
  });

  it('should call changeApiClientPassword Details', () => {
    component.apiClientPassword = ''
    spyOn(component, 'changeApiClientPassword').and.callThrough()
    component.changeApiClientPassword()
    expect(component.apiClientPasswordErr).toBe(true)
    expect(component.changeApiClientPassword).toHaveBeenCalled()
    expect(component.changeApiClientPassword).toHaveBeenCalledTimes(1)
  });

  it('should call changeAclUsername Details', () => {
    component.aclUsername = ''
    spyOn(component, 'changeAclUsername').and.callThrough()
    component.changeAclUsername()
    expect(component.acsUsernameErr).toBe(true)
    expect(component.changeAclUsername).toHaveBeenCalled()
    expect(component.changeAclUsername).toHaveBeenCalledTimes(1)
  });

  it('should get resetACS list details', () => {
    spyOn(component, 'resetACSList').and.callThrough()
    spyOn(component, 'getACSList').and.callThrough()
    component.resetACSList()
    expect(component.loading).toBe(true);
    expect(component.resetACSList).toHaveBeenCalled();
    expect(component.getACSList).toHaveBeenCalled();
  });

  it('should valid captiveurl details', () => {
    component.captiveUrl != ''
    spyOn(component, 'changeCaptiveUrl').and.callThrough()
    component.changeCaptiveUrl()
    expect(component.captiveUrlErr).toBe(true)
    expect(component.changeCaptiveUrl).toHaveBeenCalled()
  })

  it('should valid apiUsername details', () => {
    component.apiUsername = ''
    spyOn(component, 'changeApiUsername').and.callThrough()
    component.changeApiUsername()
    expect(component.apiUsernameErr).toBe(true)
    expect(component.changeApiUsername).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
