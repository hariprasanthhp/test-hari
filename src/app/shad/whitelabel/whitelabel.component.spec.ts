import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { WhitelabelService } from '../service/whitelabel.service';
import { of } from "rxjs";
import { WhitelabelComponent } from './whitelabel.component';
import { orgInfoData } from 'src/assets/mockdata/admin/blockedpagetemplate/blockedpage.data';
import { whiteLbelData } from 'src/assets/mockdata/admin/commandiqbranding/commandiq.data';

describe('WhitelabelComponent', () => {
  let component: WhitelabelComponent;
  let fixture: ComponentFixture<WhitelabelComponent>;
  let service: WhitelabelService;
  let languageService: TranslateService;
  let organizationApiService: OrganizationApiService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhitelabelComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [WhitelabelService, SsoAuthService, RouterService, TranslateService, CommonService, OrganizationApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelabelComponent);
    router = TestBed.inject(Router)
    service = TestBed.inject(WhitelabelService)
    languageService = TestBed.inject(TranslateService)
    organizationApiService = TestBed.inject(OrganizationApiService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get orgInformation Details', () => {
    spyOn(organizationApiService, 'orgInformation').and.returnValue(of(orgInfoData))
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit()
    expect(component.orgIdResponse).toBeTruthy('value is not matched');
    expect(component.orgIdResponse).toBe(orgInfoData, 'value is not matched');
  });

  it('should hideSuccess', () => {
    spyOn(component, 'hideSuccess').and.callThrough()
    component.hideSuccess()
    expect(component.showSuccess).toBeFalse();
    expect(component.createdWhiteLabel).toMatch('');
    expect(component.hideSuccess).toHaveBeenCalled()
    expect(component.hideSuccess).toHaveBeenCalledTimes(1)
  });

  it('should hideError details', () => {
    spyOn(component, 'hideError').and.callThrough()
    component.hideError()
    expect(component.showError).toBeFalse()
    expect(component.hideError).toHaveBeenCalled()
    expect(component.hideError).toHaveBeenCalledTimes(1)
  })

  it('should get whitelabellist Details', () => {
    component.SPID = 'aIUsEL7eOy'
    spyOn(service, 'whiteLabellist').and.returnValue(of(whiteLbelData))
    spyOn(component, 'list').and.callThrough()
    component.list()
    expect(component.whiteLbelResponse).not.toBeDefined('value is not match')
    expect(component.whiteLbelResponse).not.toBeDefined(whiteLbelData)
    expect(component.list).toHaveBeenCalled()
    expect(component.list).toHaveBeenCalledTimes(1)
  })

  it('should get getWhitelabel Details', () => {
    component.SPID = 'aIUsEL7eOy'
    spyOn(service, 'spinfo').and.returnValue(of(whiteLbelData))
    spyOn(component, 'getWhitelabel').and.callThrough()
    component.getWhitelabel()
    expect(component.spiResponse).not.toBeDefined('value is not match')
    expect(component.spiResponse).not.toBeDefined(whiteLbelData)
    expect(component.getWhitelabel).toHaveBeenCalled()
    expect(component.getWhitelabel).toHaveBeenCalledTimes(1)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
