import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , DataTablesModule
      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(of('')),
          }
        },
    
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(of('')),
            getRedirectModule: jasmine.createSpy().and.returnValue(of('')),
            setAdminOrgInfo: jasmine.createSpy(),
            getRoles: jasmine.createSpy().and.returnValue(of('')),
            getOrgSFID: jasmine.createSpy().and.returnValue(of('')),
            isSecureAccess: jasmine.createSpy().and.returnValue(of({})),
            getOrgId: jasmine.createSpy().and.returnValue(of('')),
          }
        },
        
        {
          provide: OrganizationApiService, useValue: {
            orgInformation: jasmine.createSpy().and.returnValue(of({})),
            UsersCountByOrgId: jasmine.createSpy().and.returnValue(of('21')),
            DeleteRolesListByUserId: jasmine.createSpy().and.returnValue(of({})),
            UserDelete: jasmine.createSpy().and.returnValue(of({})),

          }
        },
        {
          provide: HttpClient, useValue: {
            get: jasmine.createSpy().and.returnValue(of([{}])),
          }
        },
        {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
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
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  // it('should load data', waitForAsync(() => {
  //   const ddtOptions: DataTables.Settings = {
  //     pagingType: 'full_numbers',
  //     pageLength: 20,
  //     lengthChange: false,
  //     serverSide: true,
  //     processing: true,
  //     dom: 'tipr',
  //     columnDefs: [
  //       { targets: [3, 4], orderable: false },
  //       { targets: [0], orderable: true }
  //     ],
  //     order: [0, 'asc'],
  //     drawCallback: (settings) => {
  //       let total = settings._iRecordsDisplay;
  //       let length = settings._iDisplayLength;
  //       if (total <= length) {
  //         $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
  //       } else {
  //       }
  //     }
  //   };
  
  //   const testData = [
  //     { username: 'user1', email: 'user1@example.com', firstName: 'test1', lastName: 'test2' },
  //     { username: 'user2', email: 'user2@example.com', firstName: 'test2', lastName: 'test1' },
  //   ];
  
  //   component.usersTableData = testData;
  
  //   fixture.detectChanges();
  
  //   fixture.whenStable().then(() => {
  
  //     const tableElement = fixture.nativeElement.querySelector('#users-list-table');
  //     $(tableElement).DataTable(ddtOptions);
  
  //   });
  // }));
  
  

  it('should  get tableRender', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    //act
    component.tableRender();
    //assert
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

  it('should  get UserOrg Details', () => {
    //arrange
    component.ORG_ID = '1001'
    //act
    component.getUserOrgDetails();
    //assert
    expect((component as any).organizationApiService.orgInformation).toHaveBeenCalledOnceWith('1001');
    expect((component as any).sso.setAdminOrgInfo).toHaveBeenCalled();
  });

  it('should  get UsersCount', () => {
    //arrange
    component.ORG_ID = '1001'
    //act
    component.getUsersCount();
    //assert
    expect((component as any).organizationApiService.UsersCountByOrgId).toHaveBeenCalledWith('1001');
    expect(component.usersCount).toEqual('21');
    expect(component.countReceived).toBeTruthy();
  });
});
