import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subject } from 'rxjs';
import { RouterService } from 'src/app-services/routing.services';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OrganizationApiService } from 'src/app/sys-admin/services/organization-api.service';
import { blockedPageTemplateList, orgInfoData } from 'src/assets/mockdata/admin/blockedpagetemplate/blockedpage.data';
import { BlockPageService } from '../service/block-page.service';

import { BlockPageTemplateListComponent } from './block-page-template-list.component';

describe('BlockPageTemplateListComponent', () => {
  let component: BlockPageTemplateListComponent;
  let fixture: ComponentFixture<BlockPageTemplateListComponent>;
  let service: BlockPageService;
  let languageService: TranslateService;
  let router: Router;
  let routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/organization-admin/block_page_template_update/64e66588-e912-4779-a262-2f0f76a9d03b' };
  let dialogService: NgbModal;
  let organizationApiService: OrganizationApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [BlockPageTemplateListComponent],
      providers: [RouterService, BlockPageService, SsoAuthService, TranslateService, CommonService,
        OrganizationApiService,
        { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageTemplateListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BlockPageService)
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    dialogService = TestBed.inject(NgbModal)
    organizationApiService = TestBed.inject(OrganizationApiService);
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'windowScrollEvent').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data;
    })
    component.ngOnInit();
    expect(component.windowScrollEvent).toHaveBeenCalled()
    expect(component.windowScrollEvent).toHaveBeenCalledTimes(1)
  });

  it('should hideError details', () => {
    spyOn(component, 'hideError').and.callThrough()
    component.hideError()
    expect(component.error).toBeFalsy()
    expect(component.errorMsg).toEqual('')
  })

  it('sould get organization details', () => {
    spyOn(organizationApiService, 'getOrgInfo').and.returnValue(of(orgInfoData))
    component.loadRecords()
    expect(component.orgIdResponse).toBeTruthy('value is not matched')
    expect(component.orgIdResponse).toBe(orgInfoData, 'value is not matched')
  })

  it('should get blockedpage Templatelist', () => {
    component.SPID = 'aIUsEL7eOy'
    spyOn(service, 'getList').and.returnValue(of(blockedPageTemplateList))
    service.result$.next(blockedPageTemplateList)
    component.appendData()
    component.loadRecords()
    expect(component.listBlockedPageData).toBeTruthy('value is not matched')
    expect(component.listBlockedPageData).toBe(blockedPageTemplateList.results, 'value mismatched')
  })

  it('should upDate BlockPage Details', () => {
    const templateId = '50e847aa-c14e-4301-951c-89430c796ccf';
    component.gotoUpdate(templateId)
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/organization-admin/block_page_template_update/${templateId}`])
  })

  it('shoulde delete block page details', () => {
    const templateId = '50e847aa-c14e-4301-951c-89430c796ccf';
    spyOn(service, 'deleteTemplate').and.returnValue(of({}))
    spyOn(component, 'close').and.callThrough()
    component.deleteTemplate()
    expect(component.deleteBlockpageResponse).toBeTruthy('value is not matched')
    expect(component.deleteBlockpageResponse).toEqual({})
    expect(component.disableDeleteBtn).toBeFalsy()
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
