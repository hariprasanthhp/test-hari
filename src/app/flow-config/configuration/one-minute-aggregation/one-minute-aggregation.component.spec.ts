import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';

import { OneMinuteAggregationComponent } from './one-minute-aggregation.component';

describe('OneMinuteAggregationComponent', () => {
  let component: OneMinuteAggregationComponent;
  let fixture: ComponentFixture<OneMinuteAggregationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneMinuteAggregationComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule, HttpClientTestingModule, FormsModule, NgSelectModule
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
          getOrg: jasmine.createSpy().and.returnValue(of({ entitlement: 'CC,OC,MC' })),
          add1MinuteAggregation: jasmine.createSpy().and.returnValue(of({})),
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
      },
      {
        provide: SsoAuthService, useValue: {
          getOrganizationID: jasmine.createSpy().and.returnValue(('1333')),
          getRedirectModule: jasmine.createSpy().and.returnValue(''),
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
      ,
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OneMinuteAggregationComponent);
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
    expect((component as any).service.getOrg).toHaveBeenCalledWith('1333');
    expect((component as any).orgData).toEqual({ entitlement: 'CC,OC,MC' });
    expect(component.oneMinuteAggregationStatus).toBeFalsy();
  });

  it('should get submit', () => {
    //arrange  
    component.oneMinuteAggregationStatus = false;
    spyOn((component as any), 'getData');
    spyOn(component, 'closeModal');
    //act
    component.submit();
    //assert
    expect((component as any).commonOrgService.closeAlert).toHaveBeenCalled();
    expect((component as any).service.add1MinuteAggregation).toHaveBeenCalledWith('1333', false);
    expect(component.loading).toBeFalsy();
    expect(component.showButton).toBeFalsy();
    expect((component as any).getData).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();

  });

  it('should change OneMinute Aggregation', () => {
    //arrange
    component.oneMinuteAggregationStatus = true;
    const oneMinuteAggregationFlag = false;
    (component as any).orgData = { entitlement: 'CC,OC,MC' }
    //act
    component.changeOneMinuteAggregation();
    //assert
    expect(component.oneMinuteAggregationStatus).toEqual(oneMinuteAggregationFlag);
    expect(component.showButton).toBeFalsy();
  });
});
