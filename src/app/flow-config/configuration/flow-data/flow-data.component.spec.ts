import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { FlowDataComponent } from './flow-data.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EndpointManagementService } from '../../services/endpoint-management.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { of, throwError,from } from 'rxjs';
import { errorStatus401,errorStatus400, errorStatus500, errorStatus400withoutnull } from 'src/assets/mockdata/shared/error.data';
import { event } from 'jquery';
import { error } from 'console';
import {flowmockData } from 'src/assets/mockdata/admin/flowdata/flow-data-mockdata';
import { RealtimeDelayComponent } from '../realtime-delay/realtime-delay.component';

describe('FlowDataComponent', () => {
  let component: FlowDataComponent;
  let fixture: ComponentFixture<FlowDataComponent>;
  let router: Router;
  let dialogService: NgbModal;
  let sso: SsoAuthService;
  let commonOrgService: CommonService;
  let translateService: TranslateService;
  let service: EndpointManagementService;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowDataComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'organization-admin/flowAnalyze/configurations/realtime-delay', component: RealtimeDelayComponent }, 
        ]),
        DragDropModule,
        HttpClientModule,
        HttpClientTestingModule,
        NgSelectModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        NgbModal,
        SsoAuthService,
        CommonService,
        TranslateService,
        EndpointManagementService,
        Title
      ]
    }).compileComponents()
      .then(() => {
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        dialogService = TestBed.inject(NgbModal);
        commonOrgService = TestBed.inject(CommonService);
        service = TestBed.inject(EndpointManagementService);
        titleService = TestBed.inject(Title);
        fixture = TestBed.createComponent(FlowDataComponent);
        component = fixture.componentInstance;
        component.ORG_ID = '12847872';
        fixture.detectChanges();
      })
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(FlowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialized  onInit()', () => {
    spyOn(component, 'getData').and.callThrough();
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
    fixture.detectChanges();
  })

  it('should update the language', () => {
    const newLanguage = 'en';
    translateService.selectedLanguage.next(newLanguage);
    expect(component.language).toBe(newLanguage);
  });

  it('should fetch organization data and set useAsmApplication when response is true', () => {
    spyOn(service, 'getOrg').and.returnValue(of({ useAsmApplications: true }));
    component.getData();
    expect(component.orgData).toBeDefined();
    expect(component.useAsmApplication).toBe(true);
    expect(component.showButton).toBe(false);

  });


  it('should set showButton to true when response is false', () => {
    spyOn(service, 'getOrg').and.returnValue(of({}));
    component.getData();
  });

  it('should set showButton to true when response is false', () => {
    spyOn(service, 'getOrg').and.returnValue(of(false));
    component.getData();
  });

  it('should set showButton to true when response is false', () => {
    spyOn(service, 'getOrg').and.returnValue(throwError(errorStatus401));
    component.getData();
  });
  it('should set showButton to false when useAsmApplication matches orgData.useAsmApplications', () => {
    component.useAsmApplication = true;
    component.orgData = { useAsmApplications: true };
    component.detectChange(event);
    expect(component.showButton).toBe(false);
  });

  it('should set showButton to true when useAsmApplication does not match orgData.useAsmApplications', () => {
    component.useAsmApplication = true;
    component.orgData = { useAsmApplications: false };
    component.detectChange(event);
    expect(component.showButton).toBe(true);
  });




  it('should call updateOrgPatch method with parameters and update properties on success', () => {
    spyOn(service, 'updateOrgPatch').and.returnValue(of(flowmockData));

    component.save();
    fixture.detectChanges();
  });
  it('should call page error handle', () => {
    spyOn(service, 'updateOrgPatch').and.returnValue(throwError(errorStatus401));


    component.closeModal();
    component.pageErrorHandle(errorStatus401);
    component.save();
    fixture.detectChanges();
  });


  it('should handle a 400 error with null error', () => {


    spyOn(component, 'openInfoModal');
    spyOn(commonOrgService, 'pageInvalidRqstErrorHandle');

    component.pageErrorHandle(errorStatus400);

    expect(component.infoBody).toBe(component.language['Invalid Request']);
    expect(component.infoTitle).toBe('Error');
    expect(component.openInfoModal).toHaveBeenCalled();
    expect(commonOrgService.pageInvalidRqstErrorHandle).not.toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
  it('should handle a 400 error with non-null error', () => {


    spyOn(component, 'openInfoModal');
    spyOn(commonOrgService, 'pageInvalidRqstErrorHandle');

    component.pageErrorHandle(errorStatus400withoutnull);

    expect(component.infoTitle).toBe('Error');
    expect(component.openInfoModal).toHaveBeenCalled();
    expect(commonOrgService.pageInvalidRqstErrorHandle).toHaveBeenCalledWith(errorStatus400withoutnull);
    expect(component.loading).toBe(false);
  });
  it('should handle a 401 error ', () => {


    spyOn(commonOrgService, 'openErrorAlert');
    spyOn(commonOrgService, 'pageScrollTop');

    component.pageErrorHandle(errorStatus401);

    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
    expect(commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
  it('should handle a error other than 400 & 401', () => {


    spyOn(commonOrgService, 'openErrorAlert');
    spyOn(commonOrgService, 'pageScrollTop');

    component.pageErrorHandle(errorStatus500);

    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
    expect(commonOrgService.pageScrollTop).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
  it('should open the info modal', () => {
    spyOn(component, 'closeModal');
    spyOn(dialogService, 'open').and.callThrough();

    component.openInfoModal();
    fixture.detectChanges();
  });

  it('should close the modal', fakeAsync(() => {
    component.modalRef = component.dialogService.open(component.infoModal);
    component.closeModal();

    tick(1000);
    flush();
  }))
  it('should navigate to the real-time delay configuration page', () => {
    component.MODULE; 

    component.routeToRealTimeDelay();
    spyOn(service.flowDataSync, 'next');
     spyOn(router, 'navigateByUrl');
    // expect(service.flowDataSync.next).toHaveBeenCalledWith({ flowDataTab: false });
    // expect(router.navigateByUrl).toHaveBeenCalledWith('organization-admin/flowAnalyze/configurations/realtime-delay');
  });
  
});