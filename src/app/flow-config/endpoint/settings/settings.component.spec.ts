import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { getOrgDataDetails, updateOrgData } from 'src/assets/mockdata/admin/flowconfig/endpoint/settings.data';
import { EndpointManagementService } from '../../services/endpoint-management.service';
import { of, throwError } from "rxjs";
import { SettingsComponent } from './settings.component';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let languageService: TranslateService;
  let service: EndpointManagementService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , FormsModule
      ],
      providers: [
        SsoAuthService, NgbModal, CommonService, TranslateService, EndpointManagementService, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(EndpointManagementService)
    languageService = TestBed.inject(TranslateService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'getData').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    component.ngOnInit()
    expect(component.getData).toHaveBeenCalled()
    expect(component.getData).toHaveBeenCalledTimes(1)
  });

  it('should get orgData Details', () => {
    spyOn(service, 'getOrg').and.returnValue(of(getOrgDataDetails))
    spyOn(component, 'getData').and.callThrough()
    component.getData()
    expect(component.orgData).toBeTruthy('value is not match')
    expect(component.orgData.tenantId).toEqual(getOrgDataDetails.tenantId)
  })

  it('should create orgData Details', () => {
    spyOn(service, 'createOrg').and.returnValue(of(getOrgDataDetails))
    spyOn(component, 'createData').and.callThrough()
    component.createData()
    expect(component.orgData).toBeTruthy('value is not match')
    expect(component.orgData.tenantId).toEqual(getOrgDataDetails.tenantId)
    expect(component.createData).toHaveBeenCalled()
    expect(component.createData).toHaveBeenCalledTimes(1)
  })

  it('should upDate orgData Details', () => {
    spyOn(service, 'updateOrgPUT').and.returnValue(of(updateOrgData))
    spyOn(component, 'save').and.callThrough()
    component.save()
    expect(component.orgData).toBeTruthy('value is not match')
    expect(component.orgData.tenantId).toEqual(updateOrgData.tenantId)
    expect(component.save).toHaveBeenCalled()
    expect(component.save).toHaveBeenCalledTimes(1)
  })

  it('should call changeAge Details', () => {
    spyOn(component, 'changeAge').and.callThrough()
    component.changeAge()
    expect(component.changeAge).toHaveBeenCalled()
    expect(component.changeAge).toHaveBeenCalledTimes(1)
  })

  it('should handle error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    expect(component.errorMessage).toMatch("Access Denied");
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should validateTimeDelay details', () => {
    spyOn(component, 'validateTimeDelay').and.callThrough()
    spyOn(component, 'openConfirmModal').and.callThrough()
    component.openConfirmModal(true)
    component.validateTimeDelay()
    expect(component.validateTimeDelay).toHaveBeenCalled()
    expect(component.openConfirmModal).toHaveBeenCalled()
  });

  it('should call openInfoModal', () => {
    spyOn(component, 'openInfoModal').and.callThrough()
    component.openInfoModal()
    expect(component.openInfoModal).toHaveBeenCalled()
  })

  it('should handle error 400', () => {
    let error: any = {
      status: 400,
      "error": "Bad Request"
    }
    spyOn(component, 'pageErrorHandle').and.callThrough();
    component.pageErrorHandle(error);
    expect(component.loading).toEqual(false);
    expect(component.infoTitle).toMatch("Error");
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });


  it('should get orgData Details thrown error', () => {
    let error: any = {
      status: 400,
      "error": "Bad Request"
    }
    spyOn(service, 'getOrg').and.returnValue(throwError(error))
    spyOn(component, 'getData').and.callThrough()
    component.getData()
    expect(component.getData).toHaveBeenCalled()
  })

  it('should create orgData Details thrown error', () => {
    let error: any = {
      status: 400,
      "error": "Bad Request"
    }
    spyOn(service, 'createOrg').and.returnValue(throwError(error))
    spyOn(component, 'createData').and.callThrough()
    component.createData()
    expect(component.createData).toHaveBeenCalledTimes(1)
  })

  it('should upDate orgData Details thrown error', () => {
    let error: any = {
      status: 400,
      "error": "Bad Request"
    }
    spyOn(service, 'updateOrgPUT').and.returnValue(throwError(error))
    spyOn(component, 'save').and.callThrough()
    component.save()
    expect(component.save).toHaveBeenCalled()
  })

  it('should openConfirmModal details', () => {
    spyOn(component, 'validateTimeDelay').and.callThrough()
    spyOn(component, 'openConfirmModal').and.callThrough()
    component.openConfirmModal(false)
    expect(component.infoTitle).toMatch('Info')
    expect(component.openConfirmModal).toHaveBeenCalled()
  });

  it('should call changeAge Details age not same', () => {
    component.orgData = getOrgDataDetails;
    component.age = 175;
    spyOn(component, 'changeAge').and.callThrough()
    component.changeAge()
    expect(component.showButton).toBe(true)
    expect(component.changeAge).toHaveBeenCalled()
  })

  it('should call changeAge Details', () => {
    component.orgData = getOrgDataDetails;
    component.age = 181;
    spyOn(component, 'changeAge').and.callThrough()
    component.changeAge()
    expect(component.showButton).toBeFalsy()
    expect(component.changeAge).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
