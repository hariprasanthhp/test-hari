import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { of } from 'rxjs';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { addBlockPage, orgInfoData } from 'src/assets/mockdata/admin/blockedpagetemplate/blockedpage.data';
import { BlockPageService } from '../service/block-page.service';

import { BlockPageTemplateCreateComponent } from './block-page-template-create.component';

describe('BlockPageTemplateCreateComponent', () => {
  let component: BlockPageTemplateCreateComponent;
  let fixture: ComponentFixture<BlockPageTemplateCreateComponent>;
  let service: BlockPageService;
  let organizationApiService: OrganizationApiService;
  let languageService: TranslateService;
  let router: Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule,
        ColorPickerModule, FormsModule
      ],
      declarations: [BlockPageTemplateCreateComponent],
      providers: [ViewContainerRef, ColorPickerService, RouterService, BlockPageService, NgbModal, TranslateService, CommonService, SsoAuthService, OrganizationApiService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageTemplateCreateComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BlockPageService)
    router = TestBed.inject(Router)
    languageService = TestBed.inject(TranslateService)
    organizationApiService = TestBed.inject(OrganizationApiService)
    fixture.detectChanges();
  });

  it('sould get organization details', () => {
    spyOn(organizationApiService, 'orgInformation').and.returnValue(of(orgInfoData))
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    spyOn(component, 'getAdminOrgInfo').and.callThrough()
    component.getAdminOrgInfo()
    expect(component.orgIdResponse).toBeTruthy('value is not matched')
    expect(component.orgIdResponse).toBe(orgInfoData, 'value is not matched')
    expect(component.getAdminOrgInfo).toHaveBeenCalled()
    expect(component.getAdminOrgInfo).toHaveBeenCalledTimes(1)
  })

  it('should add blockpage details', () => {
    const form_Data = addBlockPage;
    spyOn(service, 'add').and.returnValue(of(addBlockPage))
    spyOn(component, 'add').and.callThrough()
    component.add()
    expect(component.add).toHaveBeenCalled()
    expect(component.add).toHaveBeenCalledTimes(1)
  })

  it('should hideError details', () => {
    spyOn(component, 'hideError').and.callThrough()
    component.hideError()
    expect(component.showError).toBeFalsy()
    expect(component.errorMsg).toEqual('')
  })

  it('should viewPreview details', () => {
    spyOn(component, 'viewPreview').and.callThrough()
    component.viewPreview()
    expect(component.viewPreview).toHaveBeenCalled()
    expect(component.viewPreview).toHaveBeenCalledTimes(1)
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
