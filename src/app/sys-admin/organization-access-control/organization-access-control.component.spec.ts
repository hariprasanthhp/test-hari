import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { OrganizationAccessControlComponent } from './organization-access-control.component';

describe('OrganizationAccessControlComponent', () => {
  let component: OrganizationAccessControlComponent;
  let fixture: ComponentFixture<OrganizationAccessControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationAccessControlComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: CommonFunctionsService, useValue: {
            trimSubnet: jasmine.createSpy().and.returnValue('10'),
            isValidSubnetV4: jasmine.createSpy().and.returnValue(false),
            isValidSubnetV6: jasmine.createSpy().and.returnValue(false),
          }
        },
        {
          provide: OrganizationApiService, useValue: {
            AclList: jasmine.createSpy().and.returnValue(of({ acl: '' })),
            AclAdd: jasmine.createSpy().and.returnValue(of({})),
            AclDelete: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: Router, useValue: {
            url: 'acl',
          }
        }, { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(('1131')),
            getRedirectModule: jasmine.createSpy().and.returnValue(('acl.com')),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OrganizationAccessControlComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange 
    spyOn(component, 'getACLList');
    //act
    fixture.detectChanges();
    //assert
    expect(component.success).toBeFalsy();
    expect(component.error).toBeFalsy();
    expect(component.showBtns).toBeFalsy();
    expect(component.getACLList).toHaveBeenCalled();
  });

  it('should get ACL List', () => {
    //arrange
    //act
    component.getACLList();
    //assert
    expect((component as any).organizationApiService.AclList).toHaveBeenCalledWith('1131');
    expect(component.allSubnets).toEqual({ acl: '' });
    expect(component.allsub).toEqual([]);
    expect(component.oldSubnets).toEqual([]);
    expect(component.showBtns).toBeTruthy();

  });

  it('should update Subnet', () => {
    //arrange
    component.allsub = '10.22.1/18';
    spyOn(component, 'resetData');
    component.language = [];

    //act
    component.updateSubnet();
    //assert
    expect((component as any).organizationApiService.AclAdd).toHaveBeenCalledWith('10.22.1/18', '1131');
    expect(component.success).toBeTruthy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.resetData).toHaveBeenCalled();

  });
  it('should delete Subnet', () => {
    //arrange
    spyOn(component, 'resetData');
    component.language = [];

    //act
    component.deleteSubnet();
    //assert
    expect((component as any).organizationApiService.AclDelete).toHaveBeenCalledWith('1131');
    expect(component.success).toBeTruthy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.resetData).toHaveBeenCalled();

  });
  it('should add Subnet', () => {
    //arrange
    component.createCurrentSubnet = '10.127.20.15/22';
    spyOn(component, 'validateSubnet');
    component.language = [];
    //act
    component.addSubnet();
    //assert
    expect((component as any).validateSubnet).toHaveBeenCalledWith('10.127.20.15/22');
    expect(component.subnetError).toBeFalsy();
  });

});
