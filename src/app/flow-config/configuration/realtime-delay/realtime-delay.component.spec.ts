import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { RealtimeDelayComponent } from './realtime-delay.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RealtimeDelayComponent', () => {
  let component: RealtimeDelayComponent;
  let fixture: ComponentFixture<RealtimeDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealtimeDelayComponent],
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
        SsoAuthService, {
          provide: Title, useValue: {
            setTitle: jasmine.createSpy(),
          }
        },
        {
          provide: EndpointManagementService, useValue: {
            getOrg: jasmine.createSpy().and.returnValue(of({ realtimeLateflowDelay: '65' })),
            updateOrgPatch: jasmine.createSpy().and.returnValue(of({})),
            getDelay: jasmine.createSpy().and.returnValue(of({ summarize: '', curDelay: '', })),
          }
        },
        {
          provide: Router, useValue: {
            url: 'sso',
          }
        },
        {
          provide: SsoAuthService, useValue: {
            getOrganizationID: jasmine.createSpy().and.returnValue(('3333')),
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
        fixture = TestBed.createComponent(RealtimeDelayComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'tableLanguageOptions');
    spyOn(component, 'getData');
    spyOn(component, 'getDelayData');

    //act
    fixture.detectChanges();
    //assert
    expect(component.renderedOnce).toBeTruthy();
    expect(component.tableLanguageOptions).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
    expect(component.getDelayData).toHaveBeenCalledWith(true,false);

  });

  it('should get Data', () => {
    //arrange
    //act
    (component as any).getData();
    //assert
    expect((component as any).service.getOrg).toHaveBeenCalledWith('3333');
    expect((component as any).orgData).toEqual({ realtimeLateflowDelay: '65' });

    expect(component.loading).toBeFalsy();
  });

  it('should get save', () => {
    //arrange
    component.delay = 10;
    spyOn(component, 'getData');
    spyOn(component, 'getDelayData');
    spyOn(component, 'closeModal');
    //act
    component.save();
    //assert
    expect((component as any).commonOrgService.closeAlert).toHaveBeenCalled();
    expect((component as any).service.updateOrgPatch).toHaveBeenCalledWith('3333', { realtimeLateflowDelay: 600 });
    expect((component as any).orgData).toEqual({});
    expect(component.loading).toBeFalsy();
    expect(component.showButton).toBeFalsy();
    expect(component.getData).toHaveBeenCalled();
    expect(component.getDelayData).toHaveBeenCalledWith(true,false);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should get DelayData', () => {
    //arrange
    spyOn(component, 'renderTable');
    //act
    component.getDelayData();
    //assert
    expect((component as any).service.getDelay).toHaveBeenCalledWith('3333');
    expect(component.loading).toBeFalsy();
    expect((component as any).delaydata).toEqual({ summarize: '', curDelay: '', });
    expect(component.interval).toEqual([]);
    expect(component.renderTable).toHaveBeenCalledWith(false);


  });
});
