import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { AddRoleService } from '../services/add-role.service';
import { CommonService } from '../services/common.service';

import { AddRoleComponent } from './add-role.component';

describe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let fixture: ComponentFixture<AddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, DataTablesModule, FormsModule
      ],
      providers: [
        {
          provide: Location, useValue: {
            back: jasmine.createSpy(),

          }
        }, {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
            allSupportDataProcessV21: jasmine.createSpy().and.returnValue([]),
            getSelectedSubScopeNames: jasmine.createSpy().and.returnValue([]),
          }
        }, {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(of('')),
            getRedirectModule: jasmine.createSpy().and.returnValue(of('')),
          }
        }, {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        , {
          provide: AddRoleService, useValue: {
            AddUsersByRoleId: jasmine.createSpy().and.returnValue(of([])),
            RoleAdd: jasmine.createSpy().and.returnValue(of('service supp')),
            UsersCountByOrgId: jasmine.createSpy().and.returnValue(of('12')),
            UsersListByOrgId: jasmine.createSpy().and.returnValue(of(['user1', 'user2'])),
            AllPemissionsData: jasmine.createSpy().and.returnValue(of(['read'])),
            AddRolePermissions: jasmine.createSpy().and.returnValue(of([])),
          }
        },
        {
          provide: Router, useValue: {
            navigate: jasmine.createSpy(),
            url: jasmine.createSpy(),
          }
        },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddRoleComponent);
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
    spyOn(component, 'tableLanguageOptions');
    //act
    fixture.detectChanges();
    //assert
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
  });
  it('should  get closeAlert', () => {
    //arrange
    //act
    component.closeAlert();
    //assert
    expect(component.error).toBeFalsy();
    expect(component.success).toBeFalsy();
  });

  it('should  get All Permissions Alert', () => {
    //arrange
    component.appType = '011';
    spyOn(component, 'allPermissionsDataProcess');

    //act
    component.getAllPermissions();
    //assert
    expect((component as any).addRoleService.AllPemissionsData).toHaveBeenCalledWith('011');
    expect(component.allPrmsnfrmApi).toEqual(['read']);
    expect(component.allPermissionsDataProcess).toHaveBeenCalledWith(['read']);
  });

  it('should  get User List ', () => {
    //arrange
    component.ORG_ID = '100'

    //act
    component.getUserList();
    //assert
    expect((component as any).addRoleService.UsersCountByOrgId).toHaveBeenCalledWith('100');
    expect(component.usersCount).toEqual('12');
    expect((component as any).addRoleService.UsersListByOrgId).toHaveBeenCalledWith('100', '12');
    expect(component.usersList).toEqual(['user1', 'user2']);
    expect(component.selectedUsers).toEqual('user1');
  });

  it('should add Role', () => {
    //arrange
    component.roleName = 'testing'
    spyOn(component, 'addOtherDetailsToRole');
    //act
    component.addRole();
    //assert
    expect((component as any).addRoleService.RoleAdd).toHaveBeenCalled();
    expect(component.roleDatas).toEqual('service supp');
    expect((component as any).addOtherDetailsToRole).toHaveBeenCalled();
  });

  it('should add Other Details ToRole', () => {
    //arrange
    const data = ['read', 'write'];
    component.roleDatas = { _id: '121' };
    //act
    component.addOtherDetailsToRole(data);
    //assert
    expect((component as any).addRoleService.AddUsersByRoleId).toHaveBeenCalledWith([], '121');
    expect((component as any).addRoleService.AddRolePermissions).toHaveBeenCalledWith(data, '121');
  });
});

