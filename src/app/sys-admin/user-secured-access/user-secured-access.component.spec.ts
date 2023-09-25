import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrgSecureAccessService } from '../services/org-secure-access.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserSecuredAccessComponent } from './user-secured-access.component';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { of } from 'rxjs';

describe('UserSecuredAccessComponent', () => {
  let component: UserSecuredAccessComponent;
  let fixture: ComponentFixture<UserSecuredAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSecuredAccessComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , DataTablesModule, CalendarModule
      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
            pageScrollTop: jasmine.createSpy(),
          }
        },
        {
          provide: Router, useValue: {
            url: 'user-secured',
            navigate: jasmine.createSpy(),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue('443'),
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
          }
        }, {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        }, {
          provide: OrgSecureAccessService, useValue: {
            AddOrgListByUsername: jasmine.createSpy().and.returnValue(of({})),
            getOrgList: jasmine.createSpy().and.returnValue(of({
              username:
                "er@calix.com",
              _id
                :
                "OdT817ItQ"
            })),
            getOrgListByUsername: jasmine.createSpy().and.returnValue(of([{
              username:
                "e1r@calix.com",
              _id
                :
                "OdT817ItQ"
            }])),
            roundOffTimestamp: jasmine.createSpy().and.returnValue(''),
            checkType: jasmine.createSpy().and.returnValue('Read and Write'),
            checkExpiry: jasmine.createSpy().and.returnValue(''),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserSecuredAccessComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //arrange
    component.criteria = [];
    spyOn(component, 'tableLanguageOptions');
    spyOn(component, 'getData');
    spyOn(component, 'setDate');
    //act
    fixture.detectChanges();
    //assert
    expect(component.criteria.length).toEqual(3);
    expect(component.criteria[0].name).toEqual('Test Org');
    expect(component.criteria[0].value).toEqual('test org');
    expect(component.criteria[1].name).toEqual('OneCloudOne');
    expect(component.criteria[1].value).toEqual('onecloudone');
    expect(component.criteria[2].name).toEqual('Srinivas Telephone');
    expect(component.criteria[2].value).toEqual('srinivas telephone');
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
    expect(component.setDate).toHaveBeenCalled();

  });
  it('should get Data ', () => {
    //arrange
    spyOn(component, 'getAllOrgsList');
    //act
    component.getData();
    //assert
    expect(component.getAllOrgsList).toHaveBeenCalled();
  });

  it('should get All Orgs List', () => {
    //arrange  
    spyOn(component, 'getSelectedOrgsList');
    //act
    component.getAllOrgsList();
    //assert
    expect((component as any).service.getOrgList).toHaveBeenCalled();
    expect(component.getSelectedOrgsList).toHaveBeenCalled();
  });

  it('should get Selected OrgsList', () => {
    //arrange  
    component.securedUser = { username: "e1r@calix.com" };
    spyOn(component, 'renderOrgsTable');
    //act
    component.getSelectedOrgsList();
    //assert
    expect((component as any).service.getOrgListByUsername).toHaveBeenCalledWith("e1r@calix.com");
    expect(component.addedOrgsList).toEqual([{
      username:
        "e1r@calix.com",
      _id
        :
        "OdT817ItQ"
    }]);
    expect(component.renderOrgsTable).toHaveBeenCalled();
  });

  it('should get save ', () => {
    //arrange  
    component.securedUser = { username: "e1r@calix.com" };
    spyOn(component, 'closeAlert');
    //act
    component.save();
    //assert
    expect((component as any).service.AddOrgListByUsername).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.successInfo).toEqual('User secured Access saved successfully');
    expect(component.success).toBeTruthy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.loader).toBeFalsy();
  });

  
  it('should set the dates correctly', () => {
    component.setDate();

    const today = new Date();
    const expectedEndDate = new Date(today.getTime() + (1 * 60 * 1000));

    // expect(component.startDate).toEqual(today);
    // // expect(component.endDate).toEqual(expectedEndDate);
    // expect(component.minimumDate).toEqual(today);
  });

  it('should check Type ', () => {
    //arrange
    //act
    component.checkType('string');
    //assert
    expect((component as any).service.checkType).toHaveBeenCalledWith('string');
  });
  it('should get closeAlert ', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.success).toBeFalsy();
  });
  it('should get cancel ', () => {
    //arrange
    spyOn(component, 'goToUsersList');
    //act
    component.cancel();
    //assert
    expect(component.goToUsersList).toHaveBeenCalled();
  });

  it('should check Expiry ', () => {
    //arrange
    //act
    component.checkExpiry('stringobj');
    //assert
    expect((component as any).service.checkExpiry).toHaveBeenCalledWith('stringobj');
  });
});
