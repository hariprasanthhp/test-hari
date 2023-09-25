import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpectedConditions } from 'protractor';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule, FormsModule
      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            validateEmail: jasmine.createSpy().and.returnValue(of('')),
          }
        }, {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(of('')),
            getRedirectModule: jasmine.createSpy().and.returnValue(of('')),
            getRoles: jasmine.createSpy().and.returnValue(of('')),
            getOrgSFID: jasmine.createSpy().and.returnValue(of('')),
            isSecureAccess: jasmine.createSpy().and.returnValue(of({})),
          }
        }, {
          provide: OrganizationApiService, useValue: {
            UserAdd: jasmine.createSpy().and.returnValue(of({})),
            pageScrollTop: jasmine.createSpy(),
            validateEmail: jasmine.createSpy().and.returnValue(of('')),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),
            url: jasmine.createSpy(),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddUserComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'closeAlert');
    //act
    fixture.detectChanges();
    //assert
    expect(component.saveClicked).toBeFalsy();
    expect(component.closeAlert).toHaveBeenCalled();

  });
  it('should  get closeAlert', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.success).toBeFalsy();
  });
  it('should add User', () => {
    //arrange
    spyOn(component, 'closeAlert');
    component.addUserEmail = 'someone@example.com';
    component.addUserName = 'someone';
    component.addUserPassword = 'someone@pass';
    component.addUserCPassword = 'someone@pass';
    //act
    component.addUser();
    //assert
    expect(component.saveClicked).toBeTruthy();
    expect(component.formError).toBeFalsy();
    expect(component.emailError).toBeFalsy();
    expect((component as any).organizationApiService.UserAdd).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.success).toBeTruthy();
  });
});
