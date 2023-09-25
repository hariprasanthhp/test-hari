import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { RolesComponent } from './roles.component';
import { HttpErrorResponse } from '@angular/common/http';

describe('RolesComponent', () => {
  let commonOrgService: CommonService;
  let router: Router;
  let organizationApiService: OrganizationApiService;
  let sso: SsoAuthService;
  let dialogService: NgbModal;
  let translateService: TranslateService;
  let titleService: Title;
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,

      ],
      providers: [
        CommonService, OrganizationApiService, SsoAuthService, NgbModal, TranslateService, Title

      ]
    })
      .compileComponents().then(() => {
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        dialogService = TestBed.inject(NgbModal);
        commonOrgService = TestBed.inject(CommonService);
        organizationApiService = TestBed.inject(OrganizationApiService);
        titleService = TestBed.inject(Title);
        fixture = TestBed.createComponent(RolesComponent);
        component = fixture.componentInstance;
      });
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {

    spyOn(component, 'closeAlert');
    spyOn(component, 'tableLanguageOptions');
    component.ngOnInit();
  });


  it('should set sessionStorage values & navigate', () => {
    spyOn(sessionStorage, 'setItem');

    spyOn(router, 'navigate');


    const testData = { _id: 'testRoleId' };
    const testPage = 'testPage';

    component.gotoRoleDetail(testData, testPage);

    expect(sessionStorage.setItem).toHaveBeenCalledWith('calixAdminAddRole', testPage);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('calixAdminAddRoleId', testData._id);
    expect(router.navigate).toHaveBeenCalledWith([`${component.MODULE}/roleDetails`]);
  });
  it('should set sessionStorage value and navigate to addRole', () => {
    spyOn(sessionStorage, 'setItem');

    spyOn(router, 'navigate');


    const testPage = 'testPage';

    component.addRole(testPage);

    expect(sessionStorage.setItem).toHaveBeenCalledWith('calixAdminAddRole', testPage);
    expect(router.navigate).toHaveBeenCalledWith([`${component.MODULE}/addRole`]);
  });

  it('should reset error and success flags', () => {

    component.error = true;
    component.success = true;

    component.closeAlert();

    expect(component.error).toBeFalse();
    expect(component.success).toBeFalse();
  });


  it('should delete role and handle success response', () => {

    const deleteData = { _id: '2mvtG5eU0fmHWPosEw' };
    spyOn(component, 'closeModal');
    spyOn(component, 'closeAlert');
    spyOn(component, 'getData');

    spyOn(organizationApiService, 'RoleDelete').and.returnValue(of({}));

    component.deleteData = deleteData;

    component.confirmDelete();

    expect(component.closeModal).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
  });
  it('should handle error response', () => {

    const errorResponse = new HttpErrorResponse({ status: 500 });

    component.deleteData = { _id: '2mvtG5eU0fmHWPosEw' };
    spyOn(component, 'closeModal');
    spyOn(component, 'pageErrorHandle');
    spyOn(component, 'getData');

    spyOn(organizationApiService, 'RoleDelete').and.returnValue(throwError(errorResponse));

    component.confirmDelete();

  });

});
