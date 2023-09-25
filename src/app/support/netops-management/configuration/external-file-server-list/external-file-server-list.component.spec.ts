import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { ExternalFileServerService } from '../../shared/service/external-file-server.service';

import { ExternalFileServerListComponent } from './external-file-server-list.component';
import { EnglishJSON } from 'src/assets/language/english.service';
import { of, throwError } from 'rxjs';
import { externalFileServerListData } from 'src/assets/mockdata/support/netops-management/configuration/external-fileserver-data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';

describe('ExternalFileServerListComponent', () => {
  let component: ExternalFileServerListComponent;
  let fixture: ComponentFixture<ExternalFileServerListComponent>;
  let router: Router;
  let sso: SsoAuthService;
  let externalFileServerService: ExternalFileServerService;
  let translateService :TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalFileServerListComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule
      ],
      providers: [TranslateService, SsoAuthService, ChangeDetectorRef, NgbModal, ExternalFileServerService, Title]
    })
      .compileComponents()
      .then(() => {
        externalFileServerService = TestBed.inject(ExternalFileServerService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        translateService = TestBed.inject(TranslateService);
        fixture = TestBed.createComponent(ExternalFileServerListComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges();
      });
  });

  it('should initialized onInit()', () => {
    let eng = new EnglishJSON;
    translateService.selectedLanguage.next(of(eng));
    spyOn(component, 'fetchExternalFileServerList').and.callThrough();
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    // expect(component.fetchExternalFileServerList).toHaveBeenCalled();
    // expect(component.fetchExternalFileServerList).toHaveBeenCalledTimes(1);
});

it('should fetchExternalFileServerList data', () => {
  spyOn(externalFileServerService, 'getExternalFileServer').and.returnValue(of(externalFileServerListData))
  component.fetchExternalFileServerList();
  // console.log(component.backgroundSiteScanObj);
   expect(component.externalFileServerObj).toBeTruthy("No data available");
});

it('fetchExternalFileServerList Api error test', () => {
  spyOn(externalFileServerService, 'getExternalFileServer').and.returnValue(throwError(errorStatus401));
  component.fetchExternalFileServerList();
});

it('Check fetchExternalFileServerList if consition works', () => {
  let externalFileServerObj: any = {
    name : 'External file server 1'
  }
  spyOn(externalFileServerService, 'getExternalFileServer').and.returnValue(of(externalFileServerObj))
  component.externalFileServerObj.name = 'External file server 1';component.fetchExternalFileServerList();
  // console.log(component.backgroundSiteScanObj);
   expect(component.addExternalServerForm ).toBeFalsy();
});

it('Check deleteExternalFileServer function works', () => {
  spyOn(externalFileServerService, 'deleteExternalFileServer').and.returnValue(of({}))
  spyOn(component, 'deleteExternalFileServer').and.callThrough()
  component.deleteExternalFileServer()
  // expect(component.successMsg).toMatch('Successfully Deleted')
  expect(component.deleteExternalFileServer).toHaveBeenCalled()
  expect(component.deleteExternalFileServer).toHaveBeenCalledTimes(1)
})

it('Check whether deleteExternalFileServer api error', () => {
  spyOn(externalFileServerService, 'deleteExternalFileServer').and.returnValue(throwError(errorStatus401))
  component.deleteExternalFileServer();
});


it('Check hideError details', () => {
  spyOn(component, 'hideError').and.callThrough()
  component.hideError()
  expect(component.showError).toBeFalsy()
  expect(component.errorMsg).toEqual('')
});

it('Check hideSuccess details', () => {
  spyOn(component, 'hideSuccess').and.callThrough()
  component.hideSuccess()
  expect(component.showSuccess).toBeFalsy()
  expect(component.successMsg).toEqual('')
});

it('Check closeModal function works', () => {
  spyOn(component, 'closeModal').and.callThrough()
  component.closeModal()
  expect(component.deleteData).toEqual('')
});

it('Check deleteConfigFileModal function works', () => {
  spyOn(component, 'deleteConfigFileModal').and.callThrough()
  component.deleteConfigFileModal()
  expect(component.deleteConfigFileModal).toHaveBeenCalled();
  expect(component.modalTitle).toEqual('')
});

// it('Check modalRef if condition works', () => {
//   component.modalRef = true;
//   spyOn(component, 'closeModal').and.callThrough()
//   component.closeModal()
//   expect(component.modalRef.close).toHaveBeenCalled();
// });


});
