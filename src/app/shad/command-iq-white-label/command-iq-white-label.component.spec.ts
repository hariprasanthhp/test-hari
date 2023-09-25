import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ValidatorService } from 'src/app-services/validator.services';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { commandSupportInfo, orgInforamtionData, updateSupportInfo } from 'src/assets/mockdata/admin/commandiqsupport/commandiq.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { WhitelabelService } from '../service/whitelabel.service';

import { CommandIQWhiteLabelComponent } from './command-iq-white-label.component';

describe('CommandIQWhiteLabelComponent', () => {
  let component: CommandIQWhiteLabelComponent;
  let fixture: ComponentFixture<CommandIQWhiteLabelComponent>;
  let service: WhitelabelService;
  let router: Router;
  let languageService: TranslateService;
  let organizationApiService: OrganizationApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandIQWhiteLabelComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, NgbModal, ValidatorService, CommonService, WhitelabelService, OrganizationApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandIQWhiteLabelComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(WhitelabelService)
    languageService = TestBed.inject(TranslateService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    component.SPID = 'aIUsEL7eOy';
    spyOn(component, 'getSupportInfo').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    component.ngOnInit()
    expect(component.getSupportInfo).toHaveBeenCalled()
  });

  it('should fetch supportinfo details', () => {
    spyOn(service, 'fetchSupportInfo').and.returnValue(of(commandSupportInfo))
    component.CommanDIQForm.patchValue(
      {
        supportPhoneNumber: commandSupportInfo?.supportPhoneNumber,
        supportEmail: commandSupportInfo?.supportEmail,
        supportUrl: commandSupportInfo?.supportUrl,
        billingUrl: commandSupportInfo?.billingUrl,
        companyAddress: commandSupportInfo?.companyAddress
      })
    component.getSupportInfo()
    expect(component.supportInfo).toBeTruthy('value is not matched')
    expect(component.supportInfo.length).toBe(1)

  })

  it('should update supportInfo details', () => {
    spyOn(service, 'UpdateSupportInfo').and.returnValue(of(updateSupportInfo))
    spyOn(component, 'updateInfo').and.callThrough()
    component.updateInfo()
    expect(component.successInfo).toBeTruthy()
    expect(component.successInfo).toMatch('Successfully Updated')
    expect(component.updateInfo).toHaveBeenCalled()
    expect(component.updateInfo).toHaveBeenCalledTimes(1)
  })

  it('should delete details', () => {
    spyOn(service, 'DeleteSupportInfo').and.returnValue(of({}))
    spyOn(component, 'DeleteInfo').and.callThrough()
    component.DeleteInfo()
    expect(component.successInfo).toMatch('Successfully Deleted')
    expect(component.DeleteInfo).toHaveBeenCalled()
    expect(component.DeleteInfo).toHaveBeenCalledTimes(1)
  })

  it('should handle error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    expect(component.warningMessage).toMatch("Access Denied");
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should call closeAlert', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    component.closeAlert()
    expect(component.isError).toBeFalse();
    expect(component.success).toBeFalse();
    expect(component.closeAlert).toHaveBeenCalled()
    expect(component.closeAlert).toHaveBeenCalledTimes(1)
  });

  it('should call closeAllModal', () => {
    spyOn(component, 'closeAllModal').and.callThrough()
    component.closeAllModal()
    expect(component.loading).toBeFalse();
    expect(component.closeAllModal).toHaveBeenCalled()
    expect(component.closeAllModal).toHaveBeenCalledTimes(1)
  });

  it('should call openDeletemodel', () => {
    spyOn(component, 'openDeletemodel').and.callThrough()
    spyOn(component, 'getSupportInfo').and.callThrough()
    component.getSupportInfo()
    component.openDeletemodel()
    expect(component.openDeletemodel).toHaveBeenCalled()
    expect(component.getSupportInfo).toHaveBeenCalled()
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
