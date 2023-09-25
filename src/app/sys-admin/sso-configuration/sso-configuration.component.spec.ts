import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { OrganizationApiService } from '../services/organization-api.service';
import { SsoConfigurationComponent } from './sso-configuration.component';

describe('SsoConfigurationComponent', () => {
  let component: SsoConfigurationComponent;
  let fixture: ComponentFixture<SsoConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SsoConfigurationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule, FormsModule
      ],
      providers: [
        {
          provide: CommonService, useValue: {
            currentPageAdder: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            pageErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        }, {
          provide: OrganizationApiService, useValue: {
            GetHostData: jasmine.createSpy().and.returnValue(of({ hostdata: '' })),
            SSOConfigGet: jasmine.createSpy().and.returnValue(of({ _id: 'jEzetoQd', domain: 'sso.com', config: { idp_options: { certificates: 'vJPCXjbVk-----END CERTIFICATE', sso_login_url: 'https://accounts', sso_logout_url: 'https://www.calix' }, sp_options: { entity_id: 'https:sso-metadata', assert_endpoint: 'https://samlid=nEtmr' } } })),
            SSOConfigUpdate: jasmine.createSpy().and.returnValue(of({})),
            SSOConfigAdd: jasmine.createSpy().and.returnValue(of({})),
            SSOConfigDelete: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: Router, useValue: {
            url: 'sso',
          }
        },
        {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        }, {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(('1133')),
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SsoConfigurationComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange 
    spyOn(component, 'reset');
    //act
    fixture.detectChanges();
    //assert
    expect(component.success).toBeFalsy();
    expect(component.error).toBeFalsy();
    expect(component.logoutFieldHide).toBeTruthy();
    expect(component.reset).toHaveBeenCalled();
  });

  it('should get reset', () => {
    //arrange
    //act
    component.reset();
    //assert
    expect(component.entity).toEqual('');
    expect(component.acs).toEqual('');
    expect(component.emaildomainname).toEqual('');
    expect(component.idp).toEqual('');
    expect(component.ssologin).toEqual('');
    expect(component.ssologout).toEqual('');
    expect(component.SSOconfigData).toEqual(undefined);
    expect(component.configId).toEqual(undefined);
    expect(component.savebuttonDisabled).toBeTruthy();
    expect(component.deletebuttonDisabled).toBeTruthy();

  });

  it('should get HostData ', () => {
    //arrange
    spyOn(component, 'getSSOConfigData');
    //act
    component.getHostData();
    //assert
    expect((component as any).organizationApiService.GetHostData).toHaveBeenCalledWith('assets/config/config.json');
    expect(component.HOSTDATA).toEqual({ hostdata: '' });
    expect(component.getSSOConfigData).toHaveBeenCalled();

  });

  it('should get SSO ConfigData ', () => {
    //arrange
    //act
    component.getSSOConfigData();
    //assert
    expect((component as any).organizationApiService.SSOConfigGet).toHaveBeenCalledWith('1133');
    expect(component.SSOconfigData).toEqual({ _id: 'jEzetoQd', domain: 'sso.com', config: { idp_options: { certificates: 'vJPCXjbVk-----END CERTIFICATE', sso_login_url: 'https://accounts', sso_logout_url: 'https://www.calix' }, sp_options: { entity_id: 'https:sso-metadata', assert_endpoint: 'https://samlid=nEtmr' } } });
    expect(component.configId).toEqual('jEzetoQd');
    expect(component.entity).toEqual('https:sso-metadata');
    expect(component.acs).toEqual('https://samlid=nEtmr');
    expect(component.emaildomainname).toEqual('sso.com');
    expect(component.idp).toEqual('vJPCXjbVk-----END CERTIFICATE');
    expect(component.ssologin).toEqual('https://accounts');
    expect(component.ssologout).toEqual('https://www.calix');
    expect(component.configId).toEqual('jEzetoQd');
    expect(component.deletebuttonDisabled).toBeFalsy();
    expect(component.savebuttonDisabled).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should get confirm Delete Secleted ', () => {
    //arrange
    component.configId = 'jEzetoQd';
    spyOn(component, 'closeModal');
    spyOn(component, 'closeAlert');
    spyOn(component, 'reset');
    spyOn(component, 'getSSOConfigData');
    component.language = [];
    //act
    component.confirmDeleteSecleted();
    //assert
    expect(component.closeModal).toHaveBeenCalled();
    expect((component as any).organizationApiService.SSOConfigDelete).toHaveBeenCalledWith('jEzetoQd');
    expect(component.closeAlert).toHaveBeenCalled();
    expect(component.success).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect((component as any).commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.reset).toHaveBeenCalled();
    expect(component.getSSOConfigData).toHaveBeenCalled();

  });

});


