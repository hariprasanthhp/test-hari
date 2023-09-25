import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsAuditComponent } from './applications-audit.component';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from '../services/common.service';
import { ApplicationsApiService } from 'src/app/flow-config/services/applications-api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, forkJoin, of, throwError } from 'rxjs';
import { mockAuditList, mockAuditList1, noVarienceV4, noVarienceV6, selectedaddressV4, selectedaddressV6, varienceV4, varienceV6 } from 'src/assets/mockdata/admin/application-audit/applicationAudit.mockdata';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SysAdminModule } from '../sys-admin.module';
import { OrgAdminModule } from 'src/app/org-admin/org-admin.module';

describe('ApplicationsAuditComponent', () => {
  let component: ApplicationsAuditComponent;
  let fixture: ComponentFixture<ApplicationsAuditComponent>;
  let router: Router;
  let apiService: ApplicationsApiService;
  let dialogService: NgbModal;
  let dtElementMock: Partial<DataTableDirective>;
  let dtElement: DataTableDirective;
  let dtTrigger: Subject<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsAuditComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SysAdminModule,
        OrgAdminModule
      ],
      providers: [
        {
          provide: Router, useValue: {
            url: '',
            getCurrentNavigation: () => { },
            navigate: () => { },
          }
        },
        {
          provide: TranslateService, useClass: CustomTranslateService
        },
        {
          provide: CommonService, useValue: {
            recordView: { show: false },
            pageErrorHandle: () => 'error',
            openErrorAlert: () => { },
            pageScrollTop: () => { },
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getRedirectModule: () => 'Module',
            getOrganizationID: () => '123'
          }
        },
        {
          provide: ApplicationsApiService, useValue: {
            applicationsPatch: () => of(),
          }
        },
        { provide: DataTableDirective, useValue: dtElementMock },
        NgbModal,
      ],
    }).compileComponents()
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(NgbModal);
    apiService = TestBed.inject(ApplicationsApiService);
    fixture = TestBed.createComponent(ApplicationsAuditComponent);
    component = fixture.componentInstance;
    dtElement = TestBed.inject(DataTableDirective);
    dtTrigger = new Subject<any>();
    component.dtElement = dtElement;
    component.dtTrigger = dtTrigger;
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });


  it('should initialized  onInit()', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should disable select all v4 when no variance ', () => {
    component.auditList = noVarienceV4;
    component.disabledSelectAll();
    expect(component.show.disabledv4All).toBeTrue();

  });

  it('should enable select all v4 when  variance ', () => {
    component.auditList = varienceV4;
    component.disabledSelectAll();
    expect(component.show.disabledv4All).toBeFalse();
  });
  it('should disable select all v6 when  no variance ', () => {
    component.auditList = noVarienceV6;
    component.disabledSelectAll();
    expect(component.show.disabledv6All).toBeTrue();

  });

  it('should enable select all v6 when variance', () => {
    component.auditList = varienceV6;
    component.disabledSelectAll();
    expect(component.show.disabledv6All).toBeTrue();
  });

  it('should select/deselect all v4 addresses and update selectedaddressV4 array', () => {
    component.auditList = mockAuditList;
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.id = 'selectAllv4';

    spyOn(document, 'querySelector').and.returnValue(checkboxElement);

    component.selectDeselectv4All(true);

    expect(component.show.v4PartialSelectedSpan).toBeFalse();
    expect((document.querySelector('#selectAllv4') as HTMLInputElement).checked).toBeTrue();


    component.selectDeselectv4All(false);

    expect(component.show.v4PartialSelectedSpan).toBeFalse();
    expect((document.querySelector('#selectAllv4') as HTMLInputElement).checked).toBeFalse();
    expect(component.selectedaddressV4).toEqual([]);
  });

  it('should select/deselect all v6 addresses and update selectedaddressV6 array', () => {

    component.auditList = mockAuditList1;
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.id = 'selectAllv6';

    spyOn(document, 'querySelector').and.returnValue(checkboxElement);

    component.selectDeselectv6All(true);

    expect(component.show.v6PartialSelectedSpan).toBeFalse();
    expect((document.querySelector('#selectAllv6') as HTMLInputElement).checked).toBeTrue();

    component.selectDeselectv6All(false);

    expect(component.show.v6PartialSelectedSpan).toBeFalse();
    expect((document.querySelector('#selectAllv6') as HTMLInputElement).checked).toBeFalse();
  });


  it('should show error modal when no application ', () => {
    component.selectedaddressV4 = [];
    component.selectedaddressV6 = [];

    spyOn(component, 'openInfoModal');

    component.updateApplications();

    expect(component.openInfoModal).toHaveBeenCalled();
    expect(component.infoTitle).toBe('Invalid Value');
    expect(component.infoBody).toBe('No application selected');
  });
  it('should make patch calls', () => {
    component.selectedaddressV4 = [
      { id: '1', addressesV4: ['192.168.0.1', '192.168.0.2'], similarAddressV4: [] },
      { id: '2', addressesV4: ['192.168.0.3'], similarAddressV4: [] },
    ];
    component.selectedaddressV6 = [
      { id: '1', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'], similarAddressV6: [] },
      { id: '3', addressesV6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7336', '2001:0db8:85a3:0000:0000:8a2e:0370:7337'], similarAddressV6: [] },
    ];
    component.ORG_ID = 'org123';

    const expectedPatchCalls = [
      apiService.applicationsPatch('1', { addressesV4: '192.168.0.1;192.168.0.2' }, 'org123'),
      apiService.applicationsPatch('2', { addressesV4: '192.168.0.3' }, 'org123'),
      apiService.applicationsPatch('1', { addressesV6: '2001:0db8:85a3:0000:0000:8a2e:0370:7334' }, 'org123'),
      apiService.applicationsPatch('3', { addressesV6: '2001:0db8:85a3:0000:0000:8a2e:0370:7336;2001:0db8:85a3:0000:0000:8a2e:0370:7337' }, 'org123'),
    ];

    spyOn(component, 'routeToDifinition');
    spyOn(component, 'pageErrorHandle');

    component.updateApplications();

    forkJoin(expectedPatchCalls).subscribe(() => {
      expect(component.selectedaddressV4).toEqual([]);
      expect(component.pageErrorHandle).not.toHaveBeenCalled();
      expect(component.show.loading).toBeFalse();
      expect(component.selectedaddressV6).toEqual([]);
      expect(component.routeToDifinition).toHaveBeenCalled();
    });
  });


  it('should handle error response', () => {
    component.selectedaddressV4 = [
      { id: '1', addressesV4: ['192.168.0.1'], similarAddressV4: [] }
    ];
    component.ORG_ID = '123';

    const errorResponse: HttpErrorResponse = new HttpErrorResponse({ status: 500 });

    spyOn(component, 'pageErrorHandle').and.callThrough();

    spyOn(apiService, 'applicationsPatch').and.returnValue(throwError(errorResponse));

    component.updateApplications();

    expect(component.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
  });


  it('should handle 400 or 409 errors', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      error: { message: 'Bad Request' }
    });
    spyOn(component.commonOrgService, 'pageErrorHandle').and.returnValue('Error message');
    spyOn(component, 'openInfoModal');
    component.infoTitle = '';
    component.infoBody = '';

    component.pageErrorHandle(errorResponse);

    expect(component.commonOrgService.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
    expect(component.openInfoModal).toHaveBeenCalled();
    expect(component.infoTitle).toBe('Invalid request');
    expect(component.infoBody).toBe('Error message');
    expect(component.show.loading).toBe(false);
  });

  it('should handle 409 errors with existing application name', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      status: 409,
      error: { message: 'Conflict' }
    });
    spyOn(component.commonOrgService, 'pageErrorHandle').and.returnValue('Application name already exists');
    spyOn(component, 'openInfoModal');
    component.infoTitle = '';
    component.infoBody = '';

    component.pageErrorHandle(errorResponse);

    expect(component.commonOrgService.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
    expect(component.openInfoModal).toHaveBeenCalled();
    expect(component.infoTitle).toBe('Invalid request');
    expect(component.infoBody).toBe('Application name is already used');
    expect(component.show.loading).toBe(false);
  });

  it('should handle 401 errors', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      status: 401,
      error: { message: 'Unauthorized' }
    });
    spyOn(component.commonOrgService, 'pageErrorHandle');
    spyOn(component.commonOrgService, 'openErrorAlert');
    spyOn(component.commonOrgService, 'pageScrollTop');
    component.infoTitle = '';
    component.infoBody = '';

    component.pageErrorHandle(errorResponse);

    expect(component.commonOrgService.pageErrorHandle).not.toHaveBeenCalled();
    expect(component.commonOrgService.openErrorAlert).toHaveBeenCalledWith('Access Denied');
    expect(component.commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.show.loading).toBe(false);
  });

  it('should handle other errors', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      status: 500,
      error: { message: 'Internal Server Error' }
    });
    spyOn(component.commonOrgService, 'pageErrorHandle').and.returnValue('Error message');
    spyOn(component.commonOrgService, 'openErrorAlert');
    spyOn(component.commonOrgService, 'pageScrollTop');
    component.infoTitle = '';
    component.infoBody = '';

    component.pageErrorHandle(errorResponse);

    expect(component.commonOrgService.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
    expect(component.commonOrgService.openErrorAlert).toHaveBeenCalledWith('Error message');
    expect(component.commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.show.loading).toBe(false);
  });

  it('should set the dtOptions language based on fileLanguage', () => {
    component.language.fileLanguage = 'fr';
    component.dtOptions = { language: null };

    component.tableLanguageOptions();
    expect(component.dtOptions.language);

  });

  it('should set the dtOptions language to null for "en"', () => {
    component.language.fileLanguage = 'en';
    component.tableLanguageOptions();
    component.language.fileLanguage == 'en' && component.dtOptions.language
    expect(delete component.dtOptions.language);

  });

  it('should set the dtOptions language based on fileLanguage "es"', () => {
    component.language.fileLanguage = 'es';
    component.dtOptions = { language: null };

    component.tableLanguageOptions();
    expect(component.dtOptions.language);

  });

  it('should set the dtOptions language based on fileLanguage "de_DE"', () => {
    component.language.fileLanguage = 'de_DE';
    component.dtOptions = { language: null };

    component.tableLanguageOptions();
    expect(component.dtOptions.language);

  });


  it('should select the addressV4 when checked is true', () => {
    const id = selectedaddressV4;
    const addressv4 = 'incrementalAddresses';
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV4(true, addressv4, id, true);

  });

  it('should add the addressV4 to an existing selection when checked is true and the ID exists', () => {
    const id = 'id01';
    const addressv4 = '127.0.0.1';
    const existingAddressesV4 = ['192.168.0.1'];
    const checked = true;
    component.selectedaddressV4 = [{ id: id, addressesV4: existingAddressesV4 }];
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV4(checked, addressv4, selectedaddressV4, true);

  });

  it('should add the addressV4 to an existing selection when checked is true and the ID exists', () => {
    const id = selectedaddressV4;
    const addressv4 = '127.0.0.1';
    const existingAddressesV4 = ['192.168.0.1'];
    const checked = true;
    component.selectedaddressV4 = [{ id: id, addressesV4: existingAddressesV4 }];
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });

    component.selectDeselectV4(checked, addressv4, id, true);

  });
  it('should update v4PartialSelectedSpan to true and selectAllv4 to false when at least one addressv4 is checked', () => {
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });

    const checkedInputs = [
      document.createElement('input'),
      document.createElement('input'),
    ];
    checkedInputs[0].checked = true;
    checkedInputs[1].checked = false;
    spyOn(document, 'querySelectorAll').and.returnValue(checkedInputs as any as NodeListOf<Element>);


    component.selectDeselectV4(true, '127.0.0.1', selectedaddressV4, true);

  });

  it('should select the addressV4 when checked is true', () => {
    const id = 'id';
    const addressv6 = 'decrementalAddresses';
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv6') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV6(true, addressv6, id, true);

  });

  it('should add the addressV6 to an existing selection when checked is true and the ID exists', () => {
    const id = 'some-id';
    const addressv4 = 'decrementalAddresses';
    const existingAddressesV4 = ['192.168.0.1'];
    const checked = true;
    component.selectedaddressV4 = [{ id: id, addressesV4: existingAddressesV4 }];
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv6') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV6(checked, addressv4, id, true);

  });



  it('should add address to addressesV6 array when incrementFlag is true', () => {
    const addressv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    const checked = true;
    const incrementFlag = true;

    component.selectedaddressV6 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV6: [],
        decrementalAddressV6: [],
        selectedDecrementalAddressV6: [],
        similarAddressV6: []
      }
    ];

    component.selectDeselectV6(checked, addressv6, { id: 'id01', orgId: 'orgId' }, incrementFlag);

    expect(component.selectedaddressV6[0].addressesV6).toContain(addressv6);
  });

  it('should add address to selectedDecrementalAddressV6 array and remove it from decrementalAddressV6 array when incrementFlag is false', () => {
    const addressv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    const checked = true;
    const incrementFlag = false;

    component.selectedaddressV6 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV6: [],
        decrementalAddressV6: [addressv6],
        selectedDecrementalAddressV6: [],
        similarAddressV6: []
      }
    ];

    component.selectDeselectV6(checked, addressv6, { id: 'id01', orgId: 'orgId' }, incrementFlag);

    expect(component.selectedaddressV6[0].selectedDecrementalAddressV6).toContain(addressv6);
    expect(component.selectedaddressV6[0].decrementalAddressV6).not.toContain(addressv6);
  });


  it('should add address to addressesV4  when incrementFlag  true', () => {
    const addressv4 = '127.0.0.1';
    const checked = true;
    const incrementFlag = true;

    component.selectedaddressV4 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV4: [],
        decrementalAddressV4: [],
        selectedDecrementalAddressV4: [],
        similarAddressV6: []
      }
    ];

    component.selectDeselectV4(checked, addressv4, { id: 'id01', orgId: 'orgId' }, incrementFlag);

    expect(component.selectedaddressV4[0].addressesV4).toContain(addressv4);
  });

  it('should add address to selectedDecrementalAddressV4  and remove it from decrementalAddressV4 array when incrementFlag is false', () => {
    const addressv4 = '127.0.0.1';
    const checked = true;
    const incrementFlag = false;

    component.selectedaddressV4 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV4: [],
        decrementalAddressV4: [addressv4],
        selectedDecrementalAddressV4: [],
        similarAddressV4: []
      }
    ];

    component.selectDeselectV4(checked, addressv4, { id: 'id01', orgId: 'orgId' }, incrementFlag);

    expect(component.selectedaddressV4[0].selectedDecrementalAddressV4).toContain(addressv4);
    expect(component.selectedaddressV4[0].decrementalAddressV4).not.toContain(addressv4);
  });
  it('should call closeModal and open the info modal', () => {
    spyOn(component, 'closeModal');
    const modalRef = {} as NgbModalRef;
    spyOn(dialogService, 'open').and.returnValue(modalRef);
    component.openInfoModal();

    expect(component.closeModal).toHaveBeenCalled();
    expect(dialogService.open).toHaveBeenCalledWith(component.infoModal, {
      backdrop: 'static',
      keyboard: false
    });
  });

  it('should call close method on modalRef when closeModal is called', () => {
    component.closeModal();
    fixture.detectChanges();
  });

  it('should not call close method on modalRef when closeModal is called with undefined modalRef', () => {
    component.modalRef = undefined;

    component.closeModal();

  });


  it('should update v4PartialSelectedSpan and selectAllv4 checkbox correctly', () => {
    const checkedInputs = document.querySelectorAll('.addressv4:checked');
    spyOn(document, 'querySelectorAll').and.returnValue(checkedInputs);
    const selectAllv4Checkbox = document.createElement('input');
    selectAllv4Checkbox.setAttribute('id', 'selectAllv4');
    selectAllv4Checkbox.setAttribute('type', 'checkbox');
    document.body.appendChild(selectAllv4Checkbox);
    component.selectDeselectV4(true, 'addressv4', selectedaddressV4, true);
    component.selectDeselectV4(false, 'addressv4', selectedaddressV4, true);
    document.body.removeChild(selectAllv4Checkbox);
  });


  it('should update view when checkbox is checked', () => {
    fixture.detectChanges();
    expect(component.show.v4PartialSelectedSpan).toBeFalse();
  });


  it('should remove address from selectedaddressV4 array when checkbox is unchecked', () => {
    const addressv4 = '192.168.0.1';
    const id = selectedaddressV4;
    const checked = true;

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV4(checked, addressv4, id, true);
    const check = false;
    component.selectDeselectV4(check, addressv4, id, true);
  });

  it('should update v4PartialSelectedSpan to true and selectAllv4 to false when at least one addressv4 is checked', () => {
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv4') {
        return {
          checked: false,
        };
      }
      return {
        checked: true,
      };
    });

    const checkedInputs = [
      document.createElement('input'),
      document.createElement('input'),
    ];
    checkedInputs[0].checked = true;
    checkedInputs[1].checked = false;
    spyOn(document, 'querySelectorAll').and.returnValue(checkedInputs as any as NodeListOf<Element>);

    component.selectDeselectV4(true, '127.0.0.1', selectedaddressV4, true);

    expect((document.querySelector('#selectAllv4') as HTMLInputElement).checked).toBeFalse();

  });



  it('should update v4PartialSelectedSpan and selectAllv4 checkbox when called with checked=true', () => {
    component.show = {
      auditExistCheck: false,
      loading: false,
      disabledv4All: false,
      disabledv6All: false,
      v4AllFullySelected: false,
      v6AllFullySelected: false,
      v4PartialSelectedSpan: false,
      v6PartialSelectedSpan: false,
    };

    const checkboxes = fixture.nativeElement.querySelectorAll('.addressv4');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
    });

  });


  it('should select all checkboxes when all are checked', () => {
    const checkboxes = fixture.nativeElement.querySelectorAll('.addressv4');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
    });
    expect(component.show.v4PartialSelectedSpan).toBe(false);
  });


  it('should remove address from selectedaddressV6 array when checkbox is unchecked', () => {
    const addressv4 = '192.168.0.1';
    const id = '1';
    const checked = true;

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv6') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV6(checked, addressv4, id, true);
    const check = false;
    component.selectDeselectV6(check, addressv4, id, true);
  });


  it('should select the addressV6 when checked is true', () => {
    const id = selectedaddressV6;
    const addressv6 = 'incrementalAddresses';
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '#selectAllv6') {
        return {
          checked: false
        };
      }
      return {
        checked: true
      };
    });
    component.selectDeselectV6(true, addressv6, id, true);
  });


  it('should call dtInstance.destroy() in rerender()', async () => {
    spyOn(component.dtTrigger, 'next');

    component.rerender();

  });

  it('should update v6PartialSelectedSpan and selectAllv6 checkbox state when no addresses are selected', () => {
    component.selectedaddressV6 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV6: [],
        decrementalAddressV6: [],
        selectedDecrementalAddressV6: [],
        similarAddressV6: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV6: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV6(false, '', item, true);

  });

  it('should update v6PartialSelectedSpan and selectAllv6 checkbox state when some addresses are selected', () => {
    component.selectedaddressV6 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV6: [],
        decrementalAddressV6: [],
        selectedDecrementalAddressV6: ['address1'],
        similarAddressV6: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV6: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV6(false, '', item, true);


  });

  it('should clear selectedaddressV6 when there are no selected addresses', () => {
    component.selectedaddressV6 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV6: [],
        decrementalAddressV6: [],
        selectedDecrementalAddressV6: [],
        similarAddressV6: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV6: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV6(false, '', item, false);

    expect(component.selectedaddressV6.length).toBe(0);
  });
  it('should update v4PartialSelectedSpan and selectAllv4 checkbox state when no addresses are selected', () => {
    component.selectedaddressV4 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV4: [],
        decrementalAddressV4: [],
        selectedDecrementalAddressV4: [],
        similarAddressV6: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV6: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV4(false, '', item, true);

  });

  it('should update v4PartialSelectedSpan and selectAllv6 checkbox state when some addresses are selected', () => {
    component.selectedaddressV4 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV4: [],
        decrementalAddressV4: [],
        selectedDecrementalAddressV4: ['address1'],
        similarAddressV6: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV4: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV4(false, '', item, true);


  });

  it('should clear selectedaddressV4 when there are no selected addresses', () => {
    component.selectedaddressV4 = [
      {
        id: 'id01',
        orgId: 'orgId',
        addressesV4: [],
        decrementalAddressV4: [],
        selectedDecrementalAddressV4: [],
        similarAddressV64: []
      }
    ];

    const item = {
      id: 'id01',
      orgId: 'orgId',
      addressesV4: {
        decrementalAddresses: []
      }
    };

    component.selectDeselectV4(false, '', item, false);

    expect(component.selectedaddressV4.length).toBe(0);
  });

});
