import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { of, Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ApiUsageService } from '../services/api-usage.service';
import { CommonService } from '../services/common.service';
import { OrganizationsService } from '../services/organizations.service';
import { OrganizationsListComponent } from './organizations-list.component';

describe('OrganizationsListComponent', () => {
  let component: OrganizationsListComponent;
  let fixture: ComponentFixture<OrganizationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsListComponent],
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
            pageScrollTop: jasmine.createSpy(),
            showApiUsage: new Subject<any>(),
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
            url: 'org list',
            navigate: jasmine.createSpy(),
            navigateByUrl: jasmine.createSpy(),

          }
        },
        {
          provide: OrganizationsService, useValue: {
            DeleteOrg: jasmine.createSpy().and.returnValue(of({})),

          }
        },
        {
          provide: ApiUsageService, useValue: {
            getaApiQuotaDetails: jasmine.createSpy().and.returnValue(of({ allowed_count: '21' })),

          }
        }, {
          provide: SsoAuthService, useValue: {
            getRoles: jasmine.createSpy().and.returnValue('OrgAccess'),
          }
        }, {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        },
        {
          provide: HttpClient, useValue: {
            get: () => of([]),
          }
        },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OrganizationsListComponent);
        component = fixture.componentInstance;
        // @ts-ignore
        component.dtElement = { dtInstance: Promise.resolve({ destroy: () => { }, draw: () => { } }) };
      });
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    spyOn(component, 'getOrgsCount');
    spyOn(component, 'closeAlert');
    //act
    fixture.detectChanges();
    //assert
    expect(component.showSecureAccess).toBeTruthy();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.getOrgsCount).toHaveBeenCalled();
    expect(component.closeAlert).toHaveBeenCalled();
  });

  it('should get OrgsCount', () => {
    //arrange 
    let url = `organizations/count`;
    spyOn(component, 'redraw');

    const httpGetSpy = spyOn((<any>component).http, 'get').and.returnValue(of(10));
    //act
    component.getOrgsCount(true);
    //assert
    expect(httpGetSpy).toHaveBeenCalledWith(url);
    expect(component.orgsCount).toEqual(10);
    expect(component.countReceived).toBeTruthy();
    expect(component.redraw).toHaveBeenCalled();

  });

  it('should confirm Delete as Selected', () => {
    //arrange 
    component.deletedata = { id: '12w21' };
    spyOn(component, 'closeModal');
    spyOn(component, 'closeAlert');
    component.language = [];
    //act
    component.confirmDeleteSecleted();
    //assert
    expect(component.closeModal).toHaveBeenCalled();
    expect((component as any).api.DeleteOrg).toHaveBeenCalledWith('12w21');
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.success).toBeTruthy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
  });

  it('should get ApiUsage Quota', () => {
    //arrange 
    let orgID = '1211';
    spyOn((component as any).commonOrgService.showApiUsage, 'next');
    //act
    component.getApiUsageQuota(orgID);
    //assert
    expect((component as any).apiUsageService.getaApiQuotaDetails).toHaveBeenCalledWith('1211');
    expect((component as any).commonOrgService.showApiUsage.next).toHaveBeenCalled();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['systemAdministration/users']);
  });

  it('should get FilterCount', () => {
    //arrange 
    const stri = '121133';
    const url = `organizations/count?filter=${stri}`;
    const httpGetSpy1 = spyOn((<any>component).http, 'get').and.returnValue(of(11));

    spyOn((component as any).commonOrgService.showApiUsage, 'next');
    //act
    component.getFilterCount(stri);
    //assert
    expect(httpGetSpy1).toHaveBeenCalledWith(url);
    expect(component.filterCount).toEqual(11);
  });

  it('should get tableRender', () => {
    //arrange 
    spyOn(component, 'tableLanguageOptions');
    //act
    component.tableRender();
    //assert
    expect(component.tableLanguageOptions).toHaveBeenCalled();
  });
  it('should delete Org ', () => {
    //arrange  
    const dorg = { name: 'user1' };
    component.language = [];
    spyOn(component, 'closeModal');
    //act
    component.deleteOrg(dorg);
    //assert
    expect(component.deletedata).toEqual(dorg);
    expect(component.modalInfo).toEqual('user1');
    expect(component.closeModal).toHaveBeenCalled();
    expect((component as any).dialogService.open).toHaveBeenCalled();

  });
  it('should go to Secured Access Data', () => {
    //arrange
    spyOn(component, 'setOrganization');
    //act
    component.gotoSecuredAccess('org user');
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['systemAdministration/orgSecuredAccess']);
    expect(component.setOrganization).toHaveBeenCalled();
  });

  it('should go to Org Detail', () => {
    //arrange
    spyOn(component, 'setOrganization');
    //act
    component.gotoOrgDetail('org user');
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['systemAdministration/orgDetail']);
    expect(component.setOrganization).toHaveBeenCalled();
  });

  it('should go to Users', () => {
    //arrange
    const item = { name: 'user1', id: '12w3' }
    spyOn(component, 'setOrganization');
    spyOn(component, 'getApiUsageQuota');
    //act
    component.gotoUsers(item);
    //assert
    expect(component.setOrganization).toHaveBeenCalledWith(item);
    expect(component.getApiUsageQuota).toHaveBeenCalledWith('12w3');

  });

});
