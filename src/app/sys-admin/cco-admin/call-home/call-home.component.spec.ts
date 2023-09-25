import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { CallHomeComponent } from './call-home.component';

describe('CallHomeComponent', () => {
  let component: CallHomeComponent;
  let fixture: ComponentFixture<CallHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallHomeComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule
        , RouterTestingModule, DataTablesModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue('121'),
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
            getScopes: jasmine.createSpy().and.returnValue(''),
            setPageAccess: jasmine.createSpy().and.returnValue('')
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),
            url: jasmine.createSpy(),
          }
        },
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of([])),
            delete: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        }, {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        }, FormBuilder
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CallHomeComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange  
    spyOn(component, 'getList');
    spyOn(component, 'tableLanguageOptions');
    //act
    fixture.detectChanges();
    //assert
    expect(component.ORG_ID).toEqual('121');
    expect(component.getList).toHaveBeenCalled();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
  });

  it('should get List', () => {
    //arrange
    component.isRerender = true;
    spyOn(component, 'rerender');

    //act
    component.getList();
    //assert
    expect((component as any).http.get).toHaveBeenCalled();
    expect(component.list).toEqual([]);
    expect(component.loading).toBeFalsy();
    expect(component.rerender).toHaveBeenCalled();
    expect(component.isRerender).toBeTruthy();

  });
  it('should go to Add ', () => {
    //arrange
    //act
    component.goToAdd();
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/organization-admin/call-home/add']);
  });

  it('should go to Edit ', () => {
    //arrange
    //act
    component.gotoEdit(141);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith([`/organization-admin/call-home/edit/${encodeURIComponent(141)}`]);
  });
});
