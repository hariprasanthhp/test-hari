import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { OrganizationInfoComponent } from './organization-info.component';
import { of } from "rxjs";
import { errorStatus500OrgInfo, orgEntitlements, orgInforamtionData } from 'src/assets/mockdata/admin/orginfo/orginfo.data';
import { By } from '@angular/platform-browser';

describe('OrganizationInfoComponent', () => {
  let component: OrganizationInfoComponent;
  let fixture: ComponentFixture<OrganizationInfoComponent>;
  let router: Router;
  let service: OrganizationApiService
  let languageService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationInfoComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        CommonService, SsoAuthService, TranslateService, OrganizationApiService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInfoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    service = TestBed.inject(OrganizationApiService)
    languageService = TestBed.inject(TranslateService)
    fixture.detectChanges();
  });

  it('should initialize onInit()', () => {
    spyOn(component, 'getorgInfoData').and.callThrough()
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    component.ngOnInit()
    expect(component.getorgInfoData).toHaveBeenCalled()
    expect(component.getorgInfoData).toHaveBeenCalledTimes(1)
  });

  it('should get orgInformation Details', () => {
    spyOn(service, 'orgInformation').and.returnValue(of(orgInforamtionData))
    component.getorgInfoData()
    expect(component.orgInfoData).toBeTruthy('value is not matched')
    expect(component.orgInfoData).toBe(orgInforamtionData, 'value  mismatched')

  });

  it('should get orgEntitlements Details', () => {
    spyOn(service, 'orgInfoEntitlement').and.returnValue(of(orgEntitlements))
    component.getorgInfoData()
    expect(component.orgInfoEntitlementdata).toBeTruthy('value is not matched')
    expect(component.orgInfoEntitlementdata).toBe(orgEntitlements, 'value  mismatched')
  });

  it('should closeAlert', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    component.closeAlert()
    expect(component.error).toBeFalse();
  });

  it('should get service name details', () => {
    const testService = fixture.debugElement.query(By.css('.ccl-title'))
    expect(testService.nativeElement.textContent).toContain('Service Provider ID (SPID) :')
  })

  it('should handel Error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus500OrgInfo);
    expect(component.error).toEqual(true);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.pageErrorHandle).toHaveBeenCalled();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
