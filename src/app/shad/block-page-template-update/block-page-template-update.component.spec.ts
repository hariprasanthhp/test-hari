import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
import { blockedPageTemplateList, orgInfoData, updateBlockPage } from 'src/assets/mockdata/admin/blockedpagetemplate/blockedpage.data';
import { BlockPageService } from '../service/block-page.service';

import { BlockPageTemplateUpdateComponent } from './block-page-template-update.component';

describe('BlockPageTemplateUpdateComponent', () => {
  let component: BlockPageTemplateUpdateComponent;
  let fixture: ComponentFixture<BlockPageTemplateUpdateComponent>;
  let languageService: TranslateService;
  let service: BlockPageService;
  let router: Router;
  let organizationApiService: OrganizationApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ColorPickerModule, FormsModule
      ],
      declarations: [BlockPageTemplateUpdateComponent],
      providers: [ViewContainerRef, ColorPickerService, RouterService, BlockPageService, NgbModal, TranslateService, CommonService, SsoAuthService, OrganizationApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageTemplateUpdateComponent);
    languageService = TestBed.inject(TranslateService)
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    service = TestBed.inject(BlockPageService)
    organizationApiService = TestBed.inject(OrganizationApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should initialize onInit()', () => {
    const id = 'a27f86bd-0866-4f9a-aef7-046876aea697'
    spyOn(component, 'getListById').and.callThrough()
    component.getListById(id)
    expect(component.getListById).toHaveBeenCalled()
    expect(component.getListById).toHaveBeenCalledTimes(1)
  });

  it('sould get organization details', () => {
    spyOn(organizationApiService, 'orgInformation').and.returnValue(of(orgInfoData))
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    component.ngOnInit()
    expect(component.orgIdResponse).toBeTruthy('value is not matched')
    expect(component.orgIdResponse).toBe(orgInfoData, 'value is not matched')
  })

  it('should update details', () => {
    const form_data = updateBlockPage
    spyOn(service, 'update').and.returnValue(of(updateBlockPage))
    spyOn(component, 'update').and.callThrough()
    component.update()
    expect(component.update).toHaveBeenCalled()
    expect(component.update).toHaveBeenCalledTimes(1)
  })

  it('should hideImage  details', () => {
    spyOn(component, 'hideBGImage').and.callThrough()
    component.hideBGImage()
    expect(component.showBGImage).toBeFalsy()
    expect(component.hideBGImage).toHaveBeenCalled()
    expect(component.hideBGImage).toHaveBeenCalledTimes(1)

  })
  it('should  hidelogoImage details', () => {
    spyOn(component, 'hideLogoImage').and.callThrough()
    component.hideLogoImage()
    expect(component.showLogoImage).toBeFalsy()
    expect(component.hideLogoImage).toHaveBeenCalled()
    expect(component.hideLogoImage).toHaveBeenCalledTimes(1)
  })

  it('should view details', () => {
    spyOn(component, 'view').and.callThrough()
    component.view()
    expect(component.view).toHaveBeenCalled()
    expect(component.view).toHaveBeenCalledTimes(1)
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
