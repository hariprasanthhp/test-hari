import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from './../../../../../app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcoSystemService } from '../../services/cco-system.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { NfainventoryService } from 'src/app/cco/health/pon-utilization/service/nfainventory.service';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
// import { $ } from 'jquery';
import { FormsModule } from '@angular/forms';
import { SystemTableViewComponent } from './system-table-view.component';

describe('SystemTableViewComponent', () => {
  let component: SystemTableViewComponent;
  let fixture: ComponentFixture<SystemTableViewComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({});
    const translateServiceStub = () => ({
      fr: {},
      defualtLanguage: {},
      selectedLanguage: { subscribe: f => f({}) },
      de_DE: {},
      es: {}
    });
    const ngbModalStub = () => ({ open: (deleteModal, object) => ({}) });
    const ccoCommonServiceStub = () => ({
      currentPageAdder: string => ({}),
      ccoPageExport: { subscribe: f => f({}) },
      generateExportName: string => ({}),
      exportDataConvertor: tableData => ({ length: {} })
    });
    const commonServiceStub = () => ({ pageErrorHandle: err => ({}) });
    const ccoSystemServiceStub = () => ({});
    const exportExcelServiceStub = () => ({
      downLoadCSV: (name, exportData) => ({})
    });
    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f({}) }
    });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const ssoAuthServiceStub = () => ({
      getScopes: () => ({}),
      getEntitlements: () => ({}),
      setPageAccess: arg => ({}),
      getSPID: () => ({})
    });
    const dateUtilsServiceStub = () => ({});
    const issueServiceStub = () => ({
      getgeoMapHomeFilterParams: () => ({}),
      appendFqn: res => ({})
    });
    const nfainventoryServiceStub = () => ({
      GetRegions: () => ({ subscribe: f => f({}) }),
      GetLocations: id => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const titleStub = () => ({ setTitle: arg => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SystemTableViewComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: CcoCommonService, useFactory: ccoCommonServiceStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: CcoSystemService, useFactory: ccoSystemServiceStub },
        { provide: ExportExcelService, useFactory: exportExcelServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: SsoAuthService, useFactory: ssoAuthServiceStub },
        { provide: DateUtilsService, useFactory: dateUtilsServiceStub },
        { provide: IssueService, useFactory: issueServiceStub },
        { provide: NfainventoryService, useFactory: nfainventoryServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Title, useFactory: titleStub }
      ]
    });
    fixture = TestBed.createComponent(SystemTableViewComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`communicationStates has default value`, () => {
    expect(component.communicationStates).toEqual([{
      name: 'All',
      value: ''
    },
    {
      name: 'CONNECTION_IN_PROGRESS',
      value: 'CONNECTION_IN_PROGRESS'
    },
    {
      name: 'CONNECTED',
      value: 'CONNECTED'
    },
    {
      name: 'DISCONNECTED',
      value: 'DISCONNECTED'
    },
    {
      name: 'UNKNOWN',
      value: 'UNKNOWN'
    }]);
  });

  // it(`ipfixStates has default value`, () => {
  //   expect(component.ipfixStates).toEqual([{
  //     name: 'All',
  //     value: ''
  //   },
  //   {
  //     name: 'CONFIGURED',
  //     value: 'CONFIGURED'
  //   },
  //   {
  //     name: 'IN_PROGRESS',
  //     value: 'IN_PROGRESS'
  //   },
  //   {
  //     name: 'NOT_CONFIGURED',
  //     value: 'NOT_CONFIGURED'
  //   },
  //   {
  //     name: 'PENDING',
  //     value: 'PENDING'
  //   },
  //   {
  //     name: 'UNSUPPORTED',
  //     value: 'UNSUPPORTED'
  //   },
  //   {
  //     name: 'DISABLED',
  //     value: 'DISABLED'
  //   }]);
  // });

  it(`geoLocationOptions has default value`, () => {
    expect(component.geoLocationOptions).toEqual([{
      name: 'All',
      value: ''
    },
    {
      name: 'Available',
      value: 'exist'
    },
    {
      name: 'Unavailable',
      value: 'missing'
    }]);
  });

  it(`addUrl has default value`, () => {
    expect(component.addUrl).toEqual([]);
  });

  it(`tableData has default value`, () => {
    expect(component.tableData).toEqual([]);
  });

  it(`servicePlans has default value`, () => {
    expect(component.servicePlans).toEqual([]);
  });

  it(`servicePlanSelected has default value`, () => {
    expect(component.servicePlanSelected).toEqual(`1G`);
  });

  it(`list has default value`, () => {
    expect(component.list).toEqual([]);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`dataAvailable has default value`, () => {
    expect(component.dataAvailable).toEqual(false);
  });

  it(`isRerender has default value`, () => {
    expect(component.isRerender).toEqual(false);
  });

  it(`hasScopeAccess has default value`, () => {
    expect(component.hasScopeAccess).toEqual(false);
  });

  it(`deleteScope has default value`, () => {
    expect(component.deleteScope).toEqual(false);
  });

  it(`disconnectScope has default value`, () => {
    expect(component.disconnectScope).toEqual(false);
  });

  it(`hasWriteAccess has default value`, () => {
    expect(component.hasWriteAccess).toEqual(false);
  });

  it(`isProbeStatus has default value`, () => {
    expect(component.isProbeStatus).toEqual(false);
  });

  it(`states has default value`, () => {
    expect(component.states).toEqual([]);
  });

  it(`isForceSyncInprogress has default value`, () => {
    expect(component.isForceSyncInprogress).toEqual(false);
  });

  it(`isDisconnectInprogress has default value`, () => {
    expect(component.isDisconnectInprogress).toEqual(false);
  });

  it(`showRegion has default value`, () => {
    expect(component.showRegion).toEqual(true);
  });

  it(`showLocation has default value`, () => {
    expect(component.showLocation).toEqual(true);
  });

  it(`geoMapIssue has default value`, () => {
    expect(component.geoMapIssue).toEqual(`false`);
  });

  it(`sortBy has default value`, () => {
    expect(component.sortBy).toEqual(undefined);
  });

  it(`sortType has default value`, () => {
    expect(component.sortType).toEqual(undefined);
  });

  it(`forceSyncOptions has default value`, () => {
    expect(component.forceSyncOptions).toEqual([{
      name: 'Systems',
      value: 'devices',
      checked: true
    },
    {
      name: 'Alarms',
      value: 'alarms',
      checked: false
    }]);
  });

  it(`selectedForceSync has default value`, () => {
    expect(component.selectedForceSync).toEqual(`devices`);
  });

  it(`isDev has default value`, () => {
    expect(component.isDev).toEqual(false);
  });

  it(`isAxosPage has default value`, () => {
    expect(component.isAxosPage).toEqual(false);
  });

  it(`allowAddSystems has default value`, () => {
    expect(component.allowAddSystems).toEqual(true);
  });

  it(`submitted has default value`, () => {
    expect(component.submitted).toEqual(false);
  });

  it(`regionsDataArray has default value`, () => {
    expect(component.regionsDataArray).toEqual([`All`]);
  });

  it(`locationDataArray has default value`, () => {
    expect(component.locationDataArray).toEqual([`All`]);
  });

  it(`count has default value`, () => {
    expect(component.count).toEqual(0);
  });

  it(`initLoad has default value`, () => {
    expect(component.initLoad).toEqual(false);
  });

  it(`types has default value`, () => {
    expect(component.types).toEqual([]);
  });

  it(`showTable has default value`, () => {
    expect(component.showTable).toEqual(false);
  });

  it(`enableDisableIpfixInprogress has default value`, () => {
    expect(component.enableDisableIpfixInprogress).toEqual(false);
  });

  describe('pageErrorHandle', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      const httpErrorResponseStub: HttpErrorResponse = <any>{};
      spyOn(component, 'closeAlert').and.callThrough();
      spyOn(commonServiceStub, 'pageErrorHandle').and.callThrough();
      // component.pageErrorHandle(httpErrorResponseStub);
      // expect(component.closeAlert).toHaveBeenCalled();
      // expect(commonServiceStub.pageErrorHandle).toHaveBeenCalled();
    });
  });

  describe('getApiError', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      const httpErrorResponseStub: HttpErrorResponse = <any>{};
      spyOn(commonServiceStub, 'pageErrorHandle').and.callThrough();
      // component.getApiError(httpErrorResponseStub);
      // expect(commonServiceStub.pageErrorHandle).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const ssoAuthServiceStub: SsoAuthService = fixture.debugElement.injector.get(
        SsoAuthService
      );
      const issueServiceStub: IssueService = fixture.debugElement.injector.get(
        IssueService
      );
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(component, 'loadLocationValue').and.callThrough();
      spyOn(component, 'tableLanguageOptions').and.callThrough();
      spyOn(component, 'setPageTitle').and.callThrough();
      spyOn(component, 'getCount').and.callThrough();
      spyOn(component, 'export').and.callThrough();
      spyOn(component, 'validateType').and.callThrough();
      spyOn(component, 'getRegions').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getScopes').and.callThrough();
      spyOn(ssoAuthServiceStub, 'getEntitlements').and.callThrough();
      spyOn(ssoAuthServiceStub, 'setPageAccess').and.callThrough();
      spyOn(issueServiceStub, 'getgeoMapHomeFilterParams').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      // component.ngOnInit();
      // expect(component.loadLocationValue).toHaveBeenCalled();
      // expect(component.tableLanguageOptions).toHaveBeenCalled();
      // expect(component.setPageTitle).toHaveBeenCalled();
      // expect(component.getCount).toHaveBeenCalled();
      // expect(component.export).toHaveBeenCalled();
      // expect(component.validateType).toHaveBeenCalled();
      // expect(component.getRegions).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getScopes).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.getEntitlements).toHaveBeenCalled();
      // expect(ssoAuthServiceStub.setPageAccess).toHaveBeenCalled();
      // expect(issueServiceStub.getgeoMapHomeFilterParams).toHaveBeenCalled();
      // expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('getRegions', () => {
    it('makes expected calls', () => {
      const nfainventoryServiceStub: NfainventoryService = fixture.debugElement.injector.get(
        NfainventoryService
      );
      spyOn(component, 'findObjectsCountByValue').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      spyOn(nfainventoryServiceStub, 'GetRegions').and.callThrough();
      // component.getRegions();
      // expect(component.findObjectsCountByValue).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      // expect(nfainventoryServiceStub.GetRegions).toHaveBeenCalled();
    });
  });

  describe('export', () => {
    it('makes expected calls', () => {
      const ccoCommonServiceStub: CcoCommonService = fixture.debugElement.injector.get(
        CcoCommonService
      );
      const exportExcelServiceStub: ExportExcelService = fixture.debugElement.injector.get(
        ExportExcelService
      );
      spyOn(ccoCommonServiceStub, 'generateExportName').and.callThrough();
      spyOn(ccoCommonServiceStub, 'exportDataConvertor').and.callThrough();
      spyOn(exportExcelServiceStub, 'downLoadCSV').and.callThrough();
      // component.export();
      // expect(ccoCommonServiceStub.generateExportName).toHaveBeenCalled();
      // expect(ccoCommonServiceStub.exportDataConvertor).toHaveBeenCalled();
      // expect(exportExcelServiceStub.downLoadCSV).toHaveBeenCalled();
    });
  });

  describe('updateService', () => {
    it('makes expected calls', () => {
      spyOn(component, 'closeAllModal').and.callThrough();
      // component.updateService();
      // expect(component.closeAllModal).toHaveBeenCalled();
    });
  });

  describe('connectingprocess', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      spyOn(component, 'doConnect').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      // component.connectingprocess();
      // expect(component.doConnect).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
    });
  });

  describe('doConnect', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'getCount').and.callThrough();
      spyOn(component, 'getApiError').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      // component.doConnect()
      // // .subscribe(res => {
      // //   expect(res).toEqual();
      // // });
      // expect(component.close).toHaveBeenCalled();
      // expect(component.getCount).toHaveBeenCalled();
      // expect(component.getApiError).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('POST');
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('doDisconnect', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'getCount').and.callThrough();
      spyOn(component, 'getApiError').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      // component.doDisconnect()
      // // .subscribe(res => {
      // //   expect(res).toEqual();
      // // });
      // expect(component.close).toHaveBeenCalled();
      // expect(component.getCount).toHaveBeenCalled();
      // expect(component.getApiError).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('POST');
      // req.flush([[]]);
      httpTestingController.verify();
    });
  });

  describe('doForceSync', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'doCMSAlarmForceSync').and.callThrough();
      spyOn(component, 'canAllowForceSync').and.callThrough();
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'getApiError').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      // component.doForceSync()
      // // .subscribe(res => {
      // //   expect(res).toEqual();
      // // });
      // expect(component.doCMSAlarmForceSync).toHaveBeenCalled();
      // expect(component.canAllowForceSync).toHaveBeenCalled();
      // expect(component.close).toHaveBeenCalled();
      // expect(component.getApiError).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('PUT');
      // req.flush([]);
      // const req1 = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req1.request.method).toEqual('GET');
      // req1.flush([]);
      httpTestingController.verify();
    });
  });

  describe('doCMSAlarmForceSync', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'refresh').and.callThrough();
      spyOn(component, 'getAlarmForceSyncStatus').and.callThrough();
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'getApiError').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      // component.doCMSAlarmForceSync()
      // // .subscribe(res => {
      // //   expect(res).toEqual();
      // // });
      // expect(component.refresh).toHaveBeenCalled();
      // expect(component.getAlarmForceSyncStatus).toHaveBeenCalled();
      // expect(component.close).toHaveBeenCalled();
      // expect(component.getApiError).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('POST');
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('deviceAlarmForceSync', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAlarmForceSyncStatus').and.callThrough();
      spyOn(component, 'forceSync').and.callThrough();
      // component.deviceAlarmForceSync();
      // expect(component.getAlarmForceSyncStatus).toHaveBeenCalled();
      // expect(component.forceSync).toHaveBeenCalled();
    });
  });

  describe('doDelete', () => {
    it('makes expected calls', () => {
      const ngbModalStub: NgbModal = fixture.debugElement.injector.get(
        NgbModal
      );
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'close').and.callThrough();
      spyOn(component, 'getCount').and.callThrough();
      spyOn(ngbModalStub, 'open').and.callThrough();
      spyOn(commonServiceStub, 'pageErrorHandle').and.callThrough();
      // component.doDelete()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.close).toHaveBeenCalled();
      // expect(component.getCount).toHaveBeenCalled();
      // expect(ngbModalStub.open).toHaveBeenCalled();
      // expect(commonServiceStub.pageErrorHandle).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('DELETE');
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getCount', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      spyOn(component, 'redraw').and.callThrough();
      spyOn(component, 'getList').and.callThrough();
      spyOn(component, 'pageErrorHandle').and.callThrough();
      // component.getCount()
      // .subscribe(res => {
      //   expect(res).toEqual();
      // });
      // expect(component.redraw).toHaveBeenCalled();
      // expect(component.getList).toHaveBeenCalled();
      // expect(component.pageErrorHandle).toHaveBeenCalled();
      // const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      // expect(req.request.method).toEqual('GET');
      // req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getList', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAlarmForceSyncStatus').and.callThrough();
      spyOn(component, 'tableLanguageOptions').and.callThrough();
      // component.getList();
      // expect(component.getAlarmForceSyncStatus).toHaveBeenCalled();
      // expect(component.tableLanguageOptions).toHaveBeenCalled();
    });
  });

  describe('clearFilter', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCount').and.callThrough();
      component.clearFilter();
      // expect(component.getCount).toHaveBeenCalled();
    });
  });

  describe('doEnableDisableIpfix', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCount').and.callThrough();
      // component.doEnableDisableIpfix();
      // expect(component.getCount).toHaveBeenCalled();
    });
  });

  describe('setPageTitle', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(titleStub, 'setTitle').and.callThrough();
      // component.setPageTitle();
      // expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });
});
