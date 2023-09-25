import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { BehaviorSubject, of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { AddRoleService } from '../services/add-role.service';
import { CommonService } from '../services/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoleDetailsComponent } from './role-details.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [];

describe('RoleDetailsComponent', () => {
  let component: RoleDetailsComponent;
  let fixture: ComponentFixture<RoleDetailsComponent>;
  let location: Location;
  let commonOrgService: CommonService;
  let customTranslateService: CustomTranslateService;
  let addRoleService: AddRoleService;
  let router: Router;
  let sso: SsoAuthService;
  let dialogService: NgbModal;
  let titleService: Title;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [RoleDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        NgSelectModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        DragDropModule,
      ],
      providers: [
        Location,
        CommonService,
        CustomTranslateService,
        AddRoleService,
        SsoAuthService,
        NgbModal,
        Title,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RoleDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


  });

  it('should load data', () => {
    spyOn(component, 'closeAlert');
    spyOn(component, 'tableLanguageOptions');
    fixture.detectChanges();
  });
  it('should  get closeAlert', () => {

    component.closeAlert();
    expect(component.error).toBeFalsy();
    expect(component.success).toBeFalsy();
  });

  it('should get Role Data', () => {
    component.editRoleId = '011541';

    const mockRoleData = {
      apptype: '1010',
      name: 'service supp',
      description: 'service supp role',
      users: 'user1@calix.com'
    };

    spyOn(component.addRoleService, 'RoleData').and.returnValue(of(mockRoleData));
    spyOn(component, 'processData');
    spyOn(component, 'getAllPermissions');
    spyOn(component, 'changeUsersData');

    component.getRoleData();

  });





  it('should get All Permissions Alert', () => {
    component.appType = '011';
    spyOn(component.addRoleService, 'AllPemissionsData').and.returnValue(of(['read']));
    spyOn(component, 'allPermissionsDataProcess');

    component.getAllPermissions();

    expect(component.addRoleService.AllPemissionsData).toHaveBeenCalledWith('011');
    expect(component.allPrmsnfrmApi).toEqual(['read']);
    expect(component.allPermissionsDataProcess).toHaveBeenCalledWith(['read']);
  });

  it('should get User List', () => {
    component.ORG_ID = '100';

    spyOn((component as any).addRoleService, 'UsersCountByOrgId').and.returnValue(of('12'));
    spyOn((component as any).addRoleService, 'UsersListByOrgId').and.returnValue(of(['user1', 'user2']));

    component.getUserList();

    expect((component as any).addRoleService.UsersCountByOrgId).toHaveBeenCalledWith('100');
    expect(component.usersCount).toEqual('12');
    expect((component as any).addRoleService.UsersListByOrgId).toHaveBeenCalledWith('100', '12');
    expect(component.usersList).toEqual(['user1', 'user2']);
    expect(component.selectedUsers).toEqual('user1');
  });

  it('should add Role', () => {
    component.roleName = 'testing';
    spyOn(component.addRoleService, 'RoleUpdate').and.returnValue(of({}));
    spyOn(component, 'addOtherDetailsToRole');

    component.addRole();

    expect(component.addRoleService.RoleUpdate).toHaveBeenCalledWith({
      apptype: component.appType,
      name: component.roleName,
      description: component.roleDescription ? component.roleDescription : '',
      orgDefault: true,
      orgId: component.ORG_ID
    }, component.editRoleId);
    expect(component.addOtherDetailsToRole).toHaveBeenCalled();
  });


  it('should add Other Details ToRole', () => {
    const data = ['read', 'write'];
    component.roleDatas = { _id: '121' };
    spyOn(component.addRoleService, 'AddUsersByRoleId').and.returnValue(of({}));
    spyOn(component.addRoleService, 'AddRolePermissions').and.returnValue(of({}));

    component.addOtherDetailsToRole(data);

    expect(component.addRoleService.AddUsersByRoleId).toHaveBeenCalledWith([], '121');
    expect(component.addRoleService.AddRolePermissions).toHaveBeenCalledWith(data, '121');
  });

  it('destroy',fakeAsync(()=>{
      component.parallelReqSubscribtion = new BehaviorSubject({});
      component.translateSubscribe = new BehaviorSubject({});
      component.allPermsSubs = new BehaviorSubject({});
      component.usersCountSubs = new BehaviorSubject({});
      component.usersListSubs = new BehaviorSubject({});
      component.roleGetSubs = new BehaviorSubject({});
      component.roleUpdateSubs = new BehaviorSubject({});

      fixture.detectChanges();
      component.ngOnDestroy();
      expect(component).toBeTruthy();
  }))




});
