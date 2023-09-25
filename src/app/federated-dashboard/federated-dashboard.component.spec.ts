import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { CommonService } from '../sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { FederatedDashboardComponent } from './federated-dashboard.component';
import { entitlementData, federatedGrantData, grantorOrgs } from 'src/assets/mockdata/federated/federated.data';
import { Callbacks } from 'jquery';
import { fromEvent } from 'rxjs';

describe('FederatedDashboardComponent', () => {
  let component: FederatedDashboardComponent;
  let fixture: ComponentFixture<FederatedDashboardComponent>;
  let languageService: TranslateService;
  let router: Router
  let sso: SsoAuthService
  let http: HttpTestingController
  let orgId: 10009


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederatedDashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
      providers: [TranslateService, Title, CommonService, SsoAuthService, FormBuilder,
        {
          provide: Router, useValue: {
            url: '',
            navigate: jasmine.createSpy(),
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederatedDashboardComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(TranslateService)
    sso = TestBed.inject(SsoAuthService)
    http = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

  it('should call closeAlert Details', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    component.closeAlert()
    expect(component.error).toBeFalsy()
    expect(component.success).toBeFalsy()
    expect(component.closeAlert).toHaveBeenCalled()

  })

  it('should call error method', () => {
    let msg = 'Error: No Valid Entitlement';
    spyOn(component, 'showErrorMessage').and.callThrough()
    component.showErrorMessage(msg)
    expect(component.errorInfo).toBe('Error: No Valid Entitlement')
    expect(component.error).toBe(true)
    expect(component.loading).toBeFalsy()
    expect(component.showErrorMessage).toHaveBeenCalled()

  })

  it('should clearSearchInp Details', () => {
    spyOn(component, 'clearSearchInp').and.callThrough()
    spyOn(component, 'subscribeCount').and.callThrough()
    component.subscribeCount('')
    component.searchOrg.setValue('')
    component.clearSearchInp()
    expect(component.subscribeCount).toHaveBeenCalled()
    expect(component.clearSearchInp).toHaveBeenCalled()
  })

  it('should call gotoDP Details', () => {
    spyOn(component, 'gotoDP').and.callThrough()
    component.gotoDP()
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.gotoDP).toHaveBeenCalled();
  });

  it('tableLanguageOptions', () => {
    spyOn(component, 'tableLanguageOptions').and.callThrough()
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
    expect(component.tableLanguageOptions).toHaveBeenCalled()
  });

  it('should call getData details', () => {
    spyOn(component, 'getData').and.callThrough()
    component.getData()
    expect(component.getData).toHaveBeenCalled();
  });

  it('should call getcount details', () => {
    spyOn(component, 'getCount').and.callThrough()
    component.getCount('cco')
    expect(component.loading).toBe(true);
    expect(component.getCount).toHaveBeenCalled();
  });

  it('should gotoFederatedAccess  details', () => {
    spyOn(component, 'gotoFederatedAcccess').and.callThrough()
    component.gotoFederatedAcccess('10009')
    const req = http.expectOne(request => request.url.includes('grantor/changeorg'))
    expect(req.request.method).toBe('POST');
    req.flush(federatedGrantData);
    federatedGrantData.landingPage == "csc"
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.loading).toBeFalsy();
    expect(component.gotoFederatedAcccess).toHaveBeenCalled();
  });

  it('when entitlements length empty', () => {
    let msg = 'Error: No Valid Entitlement';
    spyOn(component, 'gotoFederatedAcccess').and.callThrough()
    component.gotoFederatedAcccess('10009')
    const req = http.expectOne(request => request.url.includes('grantor/changeorg'))
    expect(req.request.method).toBe('POST');
    req.flush(entitlementData);
    entitlementData.entitlements = []
    component.showErrorMessage(msg)
    expect(component.loading).toBeFalsy();
    expect(component.gotoFederatedAcccess).toHaveBeenCalled();
  });

  it('should call redraw details', () => {
    let dtElement: any = DataTableDirective;
    component.dtElement = dtElement;
    spyOn(component, 'redraw').and.callThrough()
    component.redraw()
    expect(component.redraw).toHaveBeenCalled()
  })

  it('should call listenSearch', () => {
    spyOn(component, 'listenSearch').and.callThrough()
    component.listenSearch()
    expect(component.orgsList.length).toBe(0)
    expect(component.listenSearch).toHaveBeenCalled()
  })

  it('should call subscribeCount', () => {
    spyOn(component, 'subscribeCount').and.callThrough()
    component.getCount('ALLO COMMUNICATIONS')
    component.subscribeCount('ALLO COMMUNICATIONS')
    const req = http.expectOne(request => request.url.includes('grantor/orgs/_count'))
    expect(req.request.method).toBe('GET');
    req.flush(grantorOrgs);
    expect(component.count.length).toBe(10)
    expect(component.filterCount.length).toBe(10)
    expect(component.subscribeCount).toHaveBeenCalled()

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
