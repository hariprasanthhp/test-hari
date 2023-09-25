import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrgSecureAccessService } from '../services/org-secure-access.service';
import { SecuredAccessComponent } from './secured-access.component';

describe('SecuredAccessComponent', () => {
  let component: SecuredAccessComponent;
  let fixture: ComponentFixture<SecuredAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecuredAccessComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , DataTablesModule
      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: Router, useValue: {
            url: 'secure',
            navigate: jasmine.createSpy(),
          }
        }, {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue('443'),
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
          }
        }, { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        }, {
          provide: OrgSecureAccessService, useValue: {
            getSCLByOrg: jasmine.createSpy().and.returnValue(of([{
              username:
                "er@calix.com",
              _id
                :
                "OdT817ItQ"
            }])),
            checkType: jasmine.createSpy().and.returnValue('Read and Write'),
            checkExpiry: jasmine.createSpy().and.returnValue(''),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SecuredAccessComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    spyOn(component, 'closeAlert');
    spyOn(component, 'getSAList');
    //act
    fixture.detectChanges();
    //assert
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.getSAList).toHaveBeenCalled();


  });

  it('should get closeAlert ', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
  });

  it('should check Type ', () => {
    //arrange
    //act
    component.checkType('string');
    //assert
    expect((component as any).service.checkType).toHaveBeenCalledWith('string');
  });

  it('should check Expiry ', () => {
    //arrange
    //act
    component.checkExpiry('stringobj');
    //assert
    expect((component as any).service.checkExpiry).toHaveBeenCalledWith('stringobj');
  });

  it('should get secure access List', () => {
    //arrange  
    spyOn(component, 'setTableOptions');

    //act
    component.getSAList();
    //assert
    expect((component as any).service.getSCLByOrg).toHaveBeenCalledWith('443');
    expect(component.securedTableData).toEqual([{
      username:
        "er@calix.com",
      _id
        :
        "OdT817ItQ"
    }]);
    expect(component.setTableOptions).toHaveBeenCalled();
  });

  it('should go to Org List', () => {
    //arrange
    //act
    component.goToOrgList();
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['systemAdministration/organizations']);
  });

  it('should go to Secured Access Data', () => {
    //arrange
    const suser = 'secured user';
    //act
    component.gotoSecuredAccessData(suser);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['systemAdministration/UserSecuredAccess']);
  });
});
