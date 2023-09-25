import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { unmappedEndpoint } from 'src/assets/mockdata/cco/operations/cco-reports/unmapped.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';
import { CcoOperationsReportsService } from '../cco-operations-reports.service';

import { UnmappedIpsComponent } from './unmapped-ips.component';

describe('UnmappedIpsComponent', () => {
  let component: UnmappedIpsComponent;
  let fixture: ComponentFixture<UnmappedIpsComponent>;
  let apiService: CcoOperationsReportsService;
  let httpTestingController: HttpTestingController;
  let translateService: TranslateService;
  let ssoAuthService: SsoAuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnmappedIpsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DataTablesModule
      ],
      providers: [
        TranslateService,
        SsoAuthService,
        ExportExcelService,
        CcoOperationsReportsService,
        CommonService,
        CommonFunctionsService
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UnmappedIpsComponent);
        apiService = TestBed.inject(CcoOperationsReportsService);
        ssoAuthService = TestBed.inject(SsoAuthService);
        translateService = TestBed.inject(TranslateService);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
    });
  });

  it('should constructor', fakeAsync(() => {
    let englishJSON = new EnglishJSON;
    translateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
    flush(100);
  }))

  it('should  initialized onInit()', () => {
    spyOn(component, 'getTableCount').and.callThrough();
    spyOn(ssoAuthService, 'getScopes').and.returnValue(scopes);
    component.ngOnInit();
    expect(component.getTableCount).toHaveBeenCalled();

    environment.VALIDATE_SCOPE = 'true';
    component.ngOnInit();
  })

  it('should get the table count', () => {
    spyOn(apiService, 'getUnMappedIPsCount').and.returnValue(of(15))
    spyOn(component, 'tableRender').and.callThrough();
    component.getTableCount();
    expect(component.tableCount).toBe(15);
    expect(component.tableCountAvailable).toBeTrue();
    expect(component.tableRender).toHaveBeenCalled();
  });

  it('should get the table count with error', () => {
    spyOn(apiService, 'getUnMappedIPsCount').and.returnValue(throwError({error: {title: 'defined'}}))
    component.getTableCount();
    // expect(component.tableCountAvailable).toBeTrue();
  });

  it('should click export button', () => {
    spyOn(component, 'getAllUnMappedIPsData').and.callThrough();
    component.export();
    expect(component.exportLoading).toBeTrue();
    expect(component.getAllUnMappedIPsData).toHaveBeenCalled();
  });

  // it('should export table data', () => {
  //   spyOn(component, 'exportAllData').and.callThrough();
  //   component.getAllUnMappedIPsData();
  //   const req = httpTestingController.expectOne(request => {
  //     return true;
  //   });
  //   req.flush(unmappedEndpoint);
  //   expect(component.allUnMappedIPsData).toEqual(unmappedEndpoint);
  //   expect(component.exportAllData).toHaveBeenCalled();
  // });
  
  it('should handle error', () => {
    spyOn(component, 'showError').and.callThrough();
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.showError).toHaveBeenCalled();
  });

  it('should handle error', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toEqual(false);
    expect(component.errorInfo).toMatch("Access Denied");
  });

  it('should show error', () => {
    spyOn(component, 'closeAlert').and.callThrough();
    component.showError("Internal Server Error");
    expect(component.error).toEqual(true);
    expect(component.errorInfo).toMatch("Internal Server Error");
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('tableLanguageOptions', () => {
    component.language.fileLanguage = 'fr';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'es';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'de_DE';
    component.tableLanguageOptions();
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
  });

  it('exportAllData', () => {
    component.allUnMappedIPsData  = unmappedEndpoint;
    component.exportAllData();
    component.closeAlert();
  });

  it('sortData', () => {
    component.sortData(unmappedEndpoint, 0, 'ipAddress');
    component.sortData(unmappedEndpoint, 1, 'createTime');
    component.sortData(unmappedEndpoint, 2, 'updateTime');
  });

  it('getAllMappedEndpointData', () => {
    component.tableCount = 2;
    component.getAllUnMappedIPsData();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(unmappedEndpoint);
    expect(component.allUnMappedIPsData ).toEqual(unmappedEndpoint)
  });

  it('getAllMappedEndpointData', () => {
    spyOn(component, 'exportAllData').and.callThrough();
    component.tableCount = 2;
    component.getAllUnMappedIPsData();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
    expect(component.exportAllData).toHaveBeenCalled();
  });


});
