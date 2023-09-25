import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ApplicationsApiService } from '../../services/applications-api.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { DataTablecreatorService } from '../../services/data-tablecreator.service';

import { DefinitionsComponent } from './definitions.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { applicationsIds, convertedData, definitonAuditResponse, deleteEditData, editData, exceedData, exportData, mockResponse, updateData } from 'src/assets/mockdata/admin/application-definitions/definition.mockdata';

describe('DefinitionsComponent', () => {
  let component: DefinitionsComponent;
  let fixture: ComponentFixture<DefinitionsComponent>;
  let apiService: ApplicationsApiService;
  let commonFunctionsService: CommonFunctionsService;
  let sso: SsoAuthService;
  let exportExcel: ExportExcelService;
  let dataTablecreatorService: DataTablecreatorService;
  let router: Router;
  let dialogService: NgbModal;
  let commonOrgService: CommonService;
  let translateService: TranslateService;
  let titleService: Title;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinitionsComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, NgSelectModule, DataTablesModule, FormsModule
      ],
      providers: [Title, ApplicationsApiService, SsoAuthService, CommonFunctionsService, ExportExcelService, DataTablecreatorService, NgbModal, CommonService, TranslateService
      ]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        dialogService = TestBed.inject(NgbModal);
        commonOrgService = TestBed.inject(CommonService);
        apiService = TestBed.inject(ApplicationsApiService);
        fixture = TestBed.createComponent(DefinitionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle valid domain name and populate subnets', () => {
    const domainName = 'nbc.com';

    spyOn(apiService, 'getApplicationByDomainName').and.returnValue(of(mockResponse));

    component.fetchLookUp(domainName);

    expect(apiService.getApplicationByDomainName).toHaveBeenCalledWith(domainName, component.ORG_ID);
    expect(component.showLookUpSuccess).toBeTrue();
  });


  it('should handle invalid domain name', () => {
    const domainName = '';
    spyOn(component, 'openInfoModal');
    component.fetchLookUp(domainName);
    expect(component.openInfoModal).toHaveBeenCalledWith(false);
  });


  it('should handle error response', () => {
    const domainName = 'nbc.com';
    const errorMessage = 'API error message';

    spyOn(apiService, 'getApplicationByDomainName').and.returnValue(throwError(errorMessage));

    component.fetchLookUp(domainName);

    expect(apiService.getApplicationByDomainName).toHaveBeenCalledWith(domainName, component.ORG_ID);
    expect(component.showLookUpSuccess).toBeFalse();
  });


  it('should route to audit page if application IDs are available', () => {
    spyOn(apiService, 'getApplicationAudit').and.returnValue(of(definitonAuditResponse));
    spyOn(apiService.responseSubject, 'next');
    spyOn(router, 'navigate');

    component.applicationsIds = applicationsIds;
    component.routeToAudit();
    expect(component.loading).toBeFalse();
  });


  it('should call next on responseSubject ', () => {

    spyOn(apiService.responseSubject, 'next');
    spyOn(router, 'navigate');

    component.routeToAudit();

  });


  it('should handle empty application IDs', () => {
    spyOn(component, 'openInfoModal');

    component.applicationsIds = [];
    component.routeToAudit();

    expect(component.openInfoModal).toHaveBeenCalledWith(false);
  });


  it('should handle API error and display error message', () => {
    const applicationsIds = [1, 2, 3];
    const errorMessage = 'API error message';

    spyOn(apiService, 'getApplicationAudit').and.returnValue(throwError({ error: { message: errorMessage } }));
    spyOn(component, 'openInfoModal');

    component.applicationsIds = applicationsIds;
    component.routeToAudit();

    expect(component.loading).toBeFalse();
  });


  it('should submit with valid inputs', () => {
    component.createName = 'Valid Name';
    component.createSubnetV4 = '192.168.0.1';
    component.createSubnetsV4 = [];
    component.createSubnetV6 = '';
    component.createSubnetsV6 = [];
    component.createCurrentPorts = '8080';
    component.createPorts = [];
    component.createCurrentRPorts = '';
    component.createRPorts = [];
    component.add = {};
    component.isSysAdmin = false;
    component.createTypeSelected = 'local';
    component.ORG_ID = '1';
    component.createOverrideDpi = false;

    const mockApiResponse = {};
    spyOn(component.apiService, 'DefinitionAdd').and.returnValue(of(mockApiResponse));

    component.submit();

    expect(component.domainName).toEqual('');
    expect(component.showLookUpSuccess).toBe(false);
  });


  it('should show error message when invalid application name is provided', () => {
    component.createName = '';
    component.language = {
      'Invalid Value': 'Invalid Value',
      'Invalid Application Name': 'Invalid Application Name'
    };

    component.submit();

    expect(component.infoTitle).toEqual('Invalid Value');
    expect(component.infoBody).toEqual('Invalid Application Name');
  });


  it('should show error message when application name exceeds 64 characters', () => {
    component.createName = exceedData;
    component.language = {
      'Invalid Value': 'Invalid Value',
      'Invalid Application Name': 'Invalid Application Name'
    };

    component.submit();

    expect(component.infoTitle).toEqual('Invalid Value');
    expect(component.infoBody).toEqual('Invalid Application Name - Name should not exceed 64 characters.');
  });


  it('should show error message when subnet intersects with other subnets in the create list', () => {
    component.createName = 'Valid Name';
    component.createSubnetV4 = '192.168.0.0/24';
    component.createSubnetsV4 = ['192.168.0.0/16', '10.0.0.0/8'];
    component.createSubnetV6 = '';
    component.createSubnetsV6 = [];
    component.createCurrentPorts = '';
    component.createPorts = [];
    component.createCurrentRPorts = '';
    component.createRPorts = [];
    component.IP4s = [];

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('Subnet 192.168.0.0/24 intersects with other subnet in the create list');
  });


  it('should handle IPv6 subnet validation and intersection', () => {
    component.createName = '365datacenters';
    component.createSubnetV6 = '2001:db8::/32';
    component.createSubnetsV6 = ['2001:db8::/16', '2002:db8::/24'];
    component.IP6s = [];

    component.submit();

    component.createSubnetV6 = 'invalid';

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('365datacenters has invalid address format invalid');

    component.createSubnetV6 = '2001:db8::/16';

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('Subnet 2001:db8::/16 intersects with other subnet in the create list');
  });


  it('should handle invalid request when all relevant properties are empty or have no items', () => {
    component.createName = '365datacenters';
    component.createSubnetV4 = '';
    component.createSubnetsV4 = [];
    component.createSubnetV6 = '';
    component.createSubnetsV6 = [];
    component.createCurrentPorts = '';
    component.createPorts = [];
    component.createCurrentRPorts = '';
    component.createRPorts = [];

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('365datacenters has invalid address format');
  });


  it('should handle invalid request when port or ranged port format is invalid', () => {
    component.createName = '365datacenters';
    component.createCurrentPorts = '80';
    component.createCurrentRPorts = '9000-9100';

    spyOn(component.apiService, 'portValidation').and.returnValue(false);
    spyOn(component.apiService, 'rPortValidation').and.returnValue(true);

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('The port 80 format is invalid');
  });


  it('should handle invalid request when ranged port format is invalid', () => {
    component.createName = '365datacenters';
    component.createCurrentPorts = '';
    component.createCurrentRPorts = '9000-9100';

    spyOn(component.apiService, 'portValidation').and.returnValue(true);
    spyOn(component.apiService, 'rPortValidation').and.returnValue(false);

    component.submit();

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('The ranged port 9000-9100 format is invalid');
  });


  it('should transform params object correctly', () => {
    component.createName = '365datacenters';
    component.domainName = '365datacenters.com';
    component.IP4s = ['192.168.0.1', '192.168.0.2'];
    component.IP6s = ['10.245.139.12/32', '10.245.139.12/33'];

    component.appProtocolSelected = 'NONE';
    component.add = { _id: '123', name: '365datacenters' };

    component.submit();

  });


  it('should call DefinitionAdd API with correct parameters', () => {
    component.createName = 'frank';
    component.domainName = 'countrywide.com';
    component.IP4s = ['1.1.1.1/11'];
    component.IP6s = [''];
    component.createPorts = ['80', '443'];
    component.createRPorts = ['2000-3000'];
    component.isSysAdmin = false;
    component.createTypeSelected = 'local';
    component.createOverrideDpi = true;

    spyOn(component.apiService, 'DefinitionAdd').and.returnValue(
      of({ success: true })
    );

    component.submit();

  });


  it('should handle API error', () => {
    component.createName = 'frank';
    component.domainName = 'countrywide.com';
    component.IP4s = ['1.1.1.1/11'];
    component.IP6s = [''];
    component.createPorts = ['80', '443'];
    component.createRPorts = ['2000-3000'];
    component.isSysAdmin = false;
    component.createTypeSelected = 'local';
    component.createOverrideDpi = true;

    spyOn(component.apiService, 'DefinitionAdd').and.returnValue(
      throwError(new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' }))
    );

    spyOn(component, 'cancel');
    spyOn(component, 'pageErrorHandle');

    component.submit();

    expect(component.cancel).toHaveBeenCalledWith(true);
    expect(component.pageErrorHandle).toHaveBeenCalledWith(
      new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' }),
      'add'
    );
  });

  it('should set editData correctly on edit()', () => {



    component.edit(editData);

    expect(component.editData).toEqual(editData);
  });
  it('should update deleteIds, deviceIps, and deleteApps when item._id exists in deleteIds', () => {


    component.deleteIds = ['b03e5655-b8d0-44dd-bb52-32059006af08'];
    component.deviceIps = ['test1256743'];
    component.deleteApps = [{ _id: 'b03e5655-b8d0-44dd-bb52-32059006af08' }];

    component.edit(deleteEditData);

    expect(component.deleteIds).toEqual([]);
    expect(component.deviceIps).toEqual([]);
    expect(component.deleteApps).toEqual([]);
  });
  it('should update selectDeselectAll-span visibility based on deleteIds length', () => {
    const item = {
      _id: 'b03e5655-b8d0-44dd-bb52-32059006af08',
      name: 'test1256743'
    };

    component.deleteIds = ['b03e5655-b8d0-44dd-bb52-32059006af08'];
    const tot = 1;

    component.edit(item);
    fixture.detectChanges();

    const selectDeselectAllSpan = document.querySelector('#selectDeselectAll-span') as HTMLElement;

  });
  it('should update selectDeselectAll-span visibility based on deleteIds length', () => {
    const item = {
      _id: ['b03e5655-b8d0-44dd-bb52-32059006af08', 'b03e5655-b8d0-44dd-bb52-32059006af06'],
      name: 'test1256743'
    };

    component.deleteIds = ['b03e5655-b8d0-44dd-bb52-32059006af06'];
    const tot = 3;

    component.edit(item);
    fixture.detectChanges();

    const selectDeselectAllSpan = document.querySelector('#selectDeselectAll-span') as HTMLElement;

  });
  it('should remove item from deleteIds, deviceIps, and deleteApps arrays', () => {
    component.deleteIds = ['b03e5655-b8d0-44dd-bb52-32059006af09', 'b03e5655-b8d0-44dd-bb52-32059006af07', 'b03e5655-b8d0-44dd-bb52-32059006af06'];
    component.deviceIps = ['domain', 'facebook', 'insta'];
    component.deleteApps = [
      { _id: 'b03e5655-b8d0-44dd-bb52-32059006af09', name: 'domain' },
      { _id: 'b03e5655-b8d0-44dd-bb52-32059006af07', name: 'facebook' },
      { _id: 'b03e5655-b8d0-44dd-bb52-32059006af06', name: 'insta' },
    ];

    const mockNodeList: NodeListOf<Element> = document.querySelectorAll('input[name^="delete_id_"]');
    spyOn(document, 'querySelectorAll').and.callFake(() => mockNodeList);

    component.edit({ _id: 'b03e5655-b8d0-44dd-bb52-32059006af07', name: 'facebook' });

    expect(component.deleteIds).toEqual(['b03e5655-b8d0-44dd-bb52-32059006af09', 'b03e5655-b8d0-44dd-bb52-32059006af06']);
    expect(component.deleteApps).toEqual([
      { _id: 'b03e5655-b8d0-44dd-bb52-32059006af09', name: 'domain' },
      { _id: 'b03e5655-b8d0-44dd-bb52-32059006af06', name: 'insta' },
    ]);

    expect(document.querySelectorAll).toHaveBeenCalledWith(
      'input[name^="delete_id_"]'
    );

  });

  it('should show an error message when editname is not provided', () => {
    component.editname = '';

    component.updateSave('id');

    expect(component.infoTitle).toEqual('Invalid Value');
    expect(component.infoBody).toEqual('Invalid Application Name');
  });


  it('should show an error message when editname exceeds 64 characters', () => {

    component.editname = exceedData;

    component.updateSave('id');

    expect(component.infoTitle).toEqual('Invalid Value');
    expect(component.infoBody).toEqual('Invalid Application Name - Name should not exceed 64 characters.');
  });

  it('should show an error message when all input fields are empty', () => {
    component.editname = 'ApplicationName';
    component.editSubnet4 = '';
    component.editSubnets4 = [];
    component.editSubnet6 = '';
    component.editSubnets6 = [];
    component.editPort = '';
    component.editPortList = [];
    component.editRPort = '';
    component.editRPortList = [];

    component.updateSave('id');

    expect(component.infoTitle).toEqual('Invalid request');
    expect(component.infoBody).toEqual('ApplicationName has invalid address format');
  });
  it('should show an error message when editPort fails port validation', () => {
    component.editname = 'ApplicationName';
    component.editPort = '10000';

    spyOn(component.apiService, 'portValidation').and.returnValue(false);

    component.apiService.portValidation(component.editPort);
    component.updateSave('id');


  });

  it('should handle invalid IPv4 address', () => {
    spyOn(component, 'openInfoModal');
    spyOn(component.apiService, 'portValidation').and.returnValue(true);

    component.editname = 'MyApp';
    component.editSubnet4 = 'invalid';
    component.editSubnets4 = ['192.168.0.1', '192.168.0.2'];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };

    component.updateSave('someId');

  });

  it('should show error message when subnet intersection occurs', () => {
    spyOn(component, 'checkSubnetIntersect').and.returnValue(true);
    spyOn(component, 'openInfoModal');
    component.editname = 'MyApp';
    component.editSubnet4 = '192.168.0.0/24';
    component.editSubnets4 = ['192.168.0.0/24', '10.0.0.0/8'];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };


    component.updateSave('your-id');

  });

  it('should update IP4s array with the provided subnet', () => {

    component.editname = 'MyApp';
    component.editSubnet4 = '192.168.0.0/24';
    component.editSubnets4 = [];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };
    component.updateSave('someId');

    component.IP4s = '192.168.0.0/24'
  });

  it('should prepare params correctly and call the API service', () => {
    spyOn(apiService, 'DefinitionUpdate').and.returnValue(of({}));
    component.editname = 'MyApp';
    component.editSubnet4 = '192.168.0.0/24';
    component.editSubnets4 = [];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };

    component.updateSave('someId');
    component.apiService.DefinitionUpdate('id', updateData, '897980');
    component.params = updateData;
    expect(component.apiService.DefinitionUpdate).toHaveBeenCalledWith('id', updateData, '897980')

  });
  it('should handle API error', () => {
    component.editname = 'test2828';
    component.editSubnet4 = '192.168.0.0/24';
    component.editSubnets4 = [];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: '    "error_code": "Invalid application data provided in request Invalid V4 subnets in application " ' });
    spyOn(component.apiService, 'DefinitionUpdate').and.returnValue(throwError(errorResponse));
    spyOn(component, 'pageErrorHandle');
    component.updateSave('someId');
    component.pageErrorHandle(errorResponse, 'add')

    expect(component.pageErrorHandle).toHaveBeenCalledWith(errorResponse, 'add');

  });


  it('should handle invalid IPv6 address', () => {
    spyOn(component, 'openInfoModal');
    spyOn(component.apiService, 'portValidation').and.returnValue(true);

    component.editname = 'MyApp';
    component.editSubnet6 = 'invalid';
    component.editSubnets6 = ['192.168.0.1', '192.168.0.2'];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };

    component.updateSave('someId');

  });
  it('should show error message when subnet intersection occurs', () => {
    spyOn(component, 'checkSubnetIntersect').and.returnValue(true);
    spyOn(component, 'openInfoModal');
    component.editname = 'MyApp';
    component.editSubnet6 = '2a07:9a40::/29';
    component.editSubnets6 = ['2a07:9a40::/29', '6000::0/64!1000'];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };

    component.updateSave('id');

  });

  it('should update IP6s array with the provided subnet', () => {

    component.editname = 'MyApp';
    component.editSubnet6 = '2a07:9a40::/29';
    component.editSubnets6 = [];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };
    component.updateSave('someId');

    component.IP6s = '2a07:9a40::/29';
  });
  it('should show an error message when editRPort fails port validation', () => {
    component.editname = 'ApplicationName';
    component.editRPort = '10000';

    spyOn(component.apiService, 'rPortValidation').and.returnValue(false);

    component.apiService.portValidation(component.editRPort);
    component.updateSave('id');


  });
  it('should update rport array with the provided subnet', () => {

    component.editname = 'MyApp';
    component.editSubnet6 = '2a07:9a40::/29';
    component.editSubnets6 = [];
    component.editPort = '8080';
    component.editPortList = ['9090'];
    component.editRPort = '13782-13783/TCP';
    component.editRPortList = [];
    component.editData = { _id: 'someId', orgId: 'orgId' };
    component.updateSave('someId');

  });
  it('should update selectDeselectAll-span visibility based on deleteIds length', () => {
    const item = {
      _id: ['b03e5655-b8d0-44dd-bb52-32059006af08', 'b03e5655-b8d0-44dd-bb52-32059006af06'],
      name: 'test1256743'
    };
    component.deleteIds = ['b03e5655-b8d0-44dd-bb52-32059006af08'];
    spyOn(document, 'querySelector').and.returnValue({
      style: { display: "hide" },
    } as HTMLElement);

    component.edit(item);

    const selectDeselectAllSpan = document.querySelector(
      '#selectDeselectAll-span'
    ) as HTMLElement;

  });

  it('should set hideDpiAsmfeatures to true if useAsmApplications is true', fakeAsync(() => {
    const mockResponse = { useAsmApplications: true };
    
    component.endpointManagementService.getOrg = () => of(mockResponse);
    
    component.hideDpiAsm();
    
    tick();
    
    expect(component.hideDpiAsmfeatures).toBe(true);
  }));
  it('should set hideDpiAsmfeatures to false if useAsmApplications is false', fakeAsync(() => {
    const mockResponse = { useAsmApplications: false };
    
    component.endpointManagementService.getOrg = () => of(mockResponse);
    
    component.hideDpiAsm();
    
    tick();
    
    expect(component.hideDpiAsmfeatures).toBe(false);
  }));
  it('should convert boolean properties to "Yes" or "No" and perform property deletes', () => {
    const array =exportData;
  
    const expectedArray = convertedData;
     component.hideDpiAsmfeatures = false;
     
     const convertedArray = component.exportDataConvertor(array);
   expect(convertedArray).toEqual(expectedArray);
  });    
});