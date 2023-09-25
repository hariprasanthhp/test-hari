import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { WhitelabelService } from '../service/whitelabel.service';
import { of } from "rxjs";
import { WhitelabelUpdateComponent } from './whitelabel-update.component';
import { orgInfoData, whiteLbelData } from 'src/assets/mockdata/admin/commandiqbranding/commandiq.data';

describe('WhitelabelUpdateComponent', () => {
  let component: WhitelabelUpdateComponent;
  let fixture: ComponentFixture<WhitelabelUpdateComponent>;
  let router: Router;
  let service: WhitelabelService;
  let languageService: TranslateService;
  let organizationApiService: OrganizationApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhitelabelUpdateComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
        , ColorPickerModule, FormsModule],
      providers: [ColorPickerService, WhitelabelService, NgbModal, SsoAuthService, RouterService, ChangeDetectorRef, TranslateService, CommonService, OrganizationApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelabelUpdateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(WhitelabelService)
    organizationApiService = TestBed.inject(OrganizationApiService)
    languageService = TestBed.inject(TranslateService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(organizationApiService, 'orgInformation').and.returnValue(of(orgInfoData))
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit()
    expect(component.orgIdResponse).toBeTruthy('value is not match')
    expect(component.orgIdResponse).toBe(orgInfoData, 'value is mismatch')
  })

  it('should get whitelabellist Details', () => {
    component.SPID = 'aIUsEL7eOy'
    spyOn(service, 'whiteLabellist').and.returnValue(of(whiteLbelData))
    spyOn(component, 'getDetails').and.callThrough()
    component.getDetails()
    console.log(component.spiResponse)
    expect(component.spiResponse).not.toBeDefined('value is not match')
    expect(component.spiResponse).not.toBeDefined(whiteLbelData)
    expect(component.getDetails).toHaveBeenCalled()
    expect(component.getDetails).toHaveBeenCalledTimes(1)
  })

  it('should update whiteLabel details', () => {
    spyOn(service, 'update').and.returnValue({})
    spyOn(component, 'add').and.callThrough()
    component.add()
    expect(component.add).toHaveBeenCalled()
    expect(component.add).toHaveBeenCalledTimes(1)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






