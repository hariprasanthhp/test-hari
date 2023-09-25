import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { EndpointManagementService } from '../services/endpoint-management.service';
import { ConfigurationComponent } from './configuration.component';
import { Router, Routes } from '@angular/router';
const routes: Routes = [];

describe('ConfigurationComponent', () => {
  let router: Router;
  let customTranslateService: CustomTranslateService;
  let sso: SsoAuthService;
  let service: EndpointManagementService;
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes(routes),
       HttpClientTestingModule

      ],
      providers: [CustomTranslateService,SsoAuthService,EndpointManagementService]
    })
      .compileComponents().then(() => {
        customTranslateService = TestBed.inject(CustomTranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        service = TestBed.inject(EndpointManagementService);
        fixture = TestBed.createComponent(ConfigurationComponent);
        component = fixture.componentInstance;
        component.language = {
          '1-Minute Aggregation': '1-Minute Aggregation',
          'Unmapped IP Aggregation': 'Unmapped IP Aggregation',
          'Flow Data': 'Flow Data',
        };
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should initialize language', () => {
    component.language = component.customTranslateService.defualtLanguage;

    
    component.ngOnInit();
    
    expect(component.pageAvailable).toBe(true);
  });
  

  it('should remove menu item  flowDataTab is false', () => {
    const mockResponse = { flowDataTab: false };
    service.flowDataSync.next(mockResponse);

    component.menus = [
      {
        title: '',
        link: 'realtime-delay',
        subMenuLink: `/${component.MODULE}/flowAnalyze/configurations/realtime-delay`
      },
      {
        title: '',
        link: 'flow-data',
        subMenuLink: `/${component.MODULE}/flowAnalyze/configurations/flow-data`
      }
    ];

    component.ngOnInit();

    expect(component.menus.length).toBe(1);
    expect(component.menus[0].link).not.toContain('flow-data');
  });

  it('should set menus correctly when org has entitlement ', fakeAsync(() => {
    const orgResponse = {
      entitlement: 'COC',
      useAsmApplications: true,
    };

    spyOn(service, 'getOrg').and.returnValue({ subscribe: (callback: any) => callback(orgResponse) });

    component.getData();
    tick(); 

    expect(component.cocEntitlementCheck).toBeTrue();
    expect(component.menus.length).toBe(1);
    
  }));
  
  
  it('should set menus correctly when org does not have entitlement ', fakeAsync(() => {
    const orgResponse = {
      entitlement: '',
      useAsmApplications: true,
    };

    spyOn(service, 'getOrg').and.returnValue({ subscribe: (callback: any) => callback(orgResponse) });

    component.getData();
    tick();

    expect(component.cocEntitlementCheck).toBeFalse();
    expect(component.menus.length).toBe(1);
  }));

});
