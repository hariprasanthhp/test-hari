import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UnmappedIpAggregationComponent } from './unmapped-ip-aggregation.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('UnmappedIpAggregationComponent', () => {
  let component: UnmappedIpAggregationComponent;
  let fixture: ComponentFixture<UnmappedIpAggregationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnmappedIpAggregationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
        ,
        FormsModule,
        NgSelectModule,
        DataTablesModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService },
        {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        {
          provide: EndpointManagementService, useValue: {
            getOrg: jasmine.createSpy().and.returnValue(of({ entitlement: "SC,OC,MC" })),
            addUnmappedIdAggregation: jasmine.createSpy().and.returnValue(of({})),
          }
        },
        {
          provide: Router, useValue: {
            url: 'unmapped',
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(('4333')),
            getRedirectModule: jasmine.createSpy().and.returnValue(''),
          }
        },
        {
          provide: NgbModal, useValue: {
            open: jasmine.createSpy(),
          }
        },
        {
          provide: CommonService, useValue: {
            closeAlert: jasmine.createSpy(),
            openErrorAlert: jasmine.createSpy(),
            pageScrollTop: jasmine.createSpy(),
            pageInvalidRqstErrorHandle: jasmine.createSpy().and.returnValue(''),
          }
        },
      ]

    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UnmappedIpAggregationComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn((component as any), 'getData');

    //act
    fixture.detectChanges();
    //assert
    expect((component as any).getData).toHaveBeenCalled();

  });

  it('should get Data', () => {
    //arrange
    //act
    (component as any).getData();
    //assert
    expect((component as any).service.getOrg).toHaveBeenCalledWith('4333');
    expect((component as any).orgData).toEqual({ entitlement: "SC,OC,MC" });
    expect(component.unmappedIpAggregationStatus).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should get submit', () => {  
    //arrange
    component.unmappedIpAggregationStatus = false;
    spyOn((component as any), 'getData');
    spyOn(component, 'closeModal');
    //act
    (component as any).submit();
    //assert
    expect((component as any).commonOrgService.closeAlert).toHaveBeenCalled();
    expect((component as any).service.addUnmappedIdAggregation).toHaveBeenCalledWith('4333', false);
    expect(component.loading).toBeFalsy();
    expect(component.showButton).toBeFalsy();
    expect((component as any).getData).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
