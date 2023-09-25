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
import { Endpoint } from 'src/assets/mockdata/cco/traffic/endpoint/realtime.data';
import { MappedEndpointList } from 'src/assets/mockdata/cco/traffic/network/realtime.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { scopes } from 'src/assets/mockdata/shared/scopes.data';
import { environment } from 'src/environments/environment';
import { CcoOperationsReportsService } from '../cco-operations-reports.service';

import { MappedEndpointListComponent } from './mapped-endpoint-list.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MappedEndpointListComponent', () => {
  let component: MappedEndpointListComponent;
  let fixture: ComponentFixture<MappedEndpointListComponent>;
  let apiService: CcoOperationsReportsService;
  let httpTestingController: HttpTestingController;
  let commonOrgService: CommonService;
  let translateService: TranslateService;
  let ssoAuthService: SsoAuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MappedEndpointListComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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
        fixture = TestBed.createComponent(MappedEndpointListComponent);
        apiService = TestBed.inject(CcoOperationsReportsService);
        commonOrgService = TestBed.inject(CommonService);
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
    spyOn(apiService, 'getMappedEndpointCount').and.returnValue(of(15))
    spyOn(component, 'tableRender').and.callThrough();
    component.getTableCount();
    expect(component.tableCount).toBe(15);
    expect(component.tableCountAvailable).toEqual(true);
    expect(component.tableRender).toHaveBeenCalled();
  });

  it('should get the table count with error', () => {
    spyOn(apiService, 'getMappedEndpointCount').and.returnValue(throwError({ error: { title: 'defined' } }))
    component.getTableCount();
    // expect(component.tableCountAvailable).toBeTrue();
  });

  it('should get the filter count', () => {
    let url = `https://stage.api.calix.ai/v1/fa/correlator/flowendpoint?org-id=12896222&searchstring=exa&count=true`;
    component.getFilterCount(url);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(9);
    expect(component.filterCount).toBe(9);
  });

  it('should get the table count with error', () => {
    let url = `https://stage.api.calix.ai/v1/fa/correlator/flowendpoint?org-id=12896222&searchstring=exa&count=true`;
    component.getFilterCount(url);
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
  });

  // it('should click export button', () => {
  //   spyOn(component, 'getAllMappedEndpointData').and.callThrough();
  //   component.export();
  //   expect(component.exportLoading).toEqual(true);
  //   expect(component.getAllMappedEndpointData).toHaveBeenCalled();
  // });

  it('should handle error', () => {
    component.pageErrorHandle(errorStatus401);
    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
    expect(component.errorInfo).toMatch("Access Denied");
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
    component.allMappedEndpointData = MappedEndpointList;
    component.exportAllData();
    component.closeAlert();
  });

  it('getAllMappedEndpointData', () => {
    component.tableCount = 2;
    component.getAllMappedEndpointData();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(MappedEndpointList);
    expect(component.allMappedEndpointData).toEqual(MappedEndpointList)
  });

  it('getAllMappedEndpointData', () => {
    component.tableCount = 2;
    component.getAllMappedEndpointData();
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.error(ErrorEvent['error']);
    expect(component.exportLoading).toBeFalse();
  });


  // it('should get the table data', fakeAsync(() => {
  // component.dtOptions.ajax = jasmine.createSpy().and.returnValue(MappedEndpointList);
  // console.log("dtOptions",component.dtOptions.ajax);
  // component.tableRender();
  // const req = httpTestingController.expectOne(request => {
  //   console.log("request",request);
  //   return true;
  // });
  // req.flush(MappedEndpointList);
  // console.log("mappedEndpointData",component.mappedEndpointData);
  // flush();
  // }));

});
