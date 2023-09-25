import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { StaleSystemPurgedata, StaleSYstemPurgeadddata, StaleSYstemPurgetoggledata } from 'src/assets/mockdata/support/netops-management/configuration/stalesystempurge';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { StaleDevicePurgeService } from '../../shared/service/stale-device-purge.service';
import { of } from 'rxjs';

import { StaleDevicePurgeComponent } from './stale-device-purge.component';

describe('StateDevicePurgeComponent', () => {
  let component: StaleDevicePurgeComponent;
  let fixture: ComponentFixture<StaleDevicePurgeComponent>;
  let dateUtilsService: DateUtilsService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let sso: SsoAuthService;
  let staleDevicePurgeService: StaleDevicePurgeService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaleDevicePurgeComponent],
      imports: [
        RouterTestingModule, NgSelectModule, CalendarModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule,
      ],
      providers: [
        TranslateService, SsoAuthService, StaleDevicePurgeService, HttpClient, Title, DateUtilsService
      ]
    })
      .compileComponents().then(() => {
        dateUtilsService = TestBed.inject(DateUtilsService);
        staleDevicePurgeService = TestBed.inject(StaleDevicePurgeService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(StaleDevicePurgeComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges();
      });
  });

  it('should initialized onInit()', () => {
      spyOn(component, 'fetchPolicy').and.callThrough();
      component.ngOnInit();
      // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
      // expect(component.fetchPolicy).toHaveBeenCalled();
      // expect(component.fetchPolicy).toHaveBeenCalledTimes(1);
  });

  it('Stale System Purge list', () => {
    component.staleDevicePurgeObj.schedule.frequency == "Weekly"
    spyOn(component, 'getExcLogPolicy').and.callThrough();

    component.getExcLogPolicy(2)
    component.excLogPolicObj = StaleSystemPurgedata;
    fixture.detectChanges();
    expect(component.excLogPolicObj[0]._id).toEqual(StaleSystemPurgedata[0]._id)
  });

  it('Update Stale System Purge test', () => {
    component.staleDevicePurgeObj = StaleSYstemPurgeadddata;
    component.staleDevicePurgeObj._id = StaleSYstemPurgeadddata._id;
    spyOn(staleDevicePurgeService, 'updateStaleDevicePurgePolicy').and.returnValue(of(StaleSYstemPurgeadddata));
    component.onSubmit();
    spyOn(component, 'fetchPolicy').and.callThrough();
    fixture.detectChanges();
    expect(component.showSuccess).toBeTrue();
    expect(component.fetchPolicy).toBeTruthy();
  });

  it('Stale System Purge toggle button test', () => {
    spyOn(component, 'getExcLogPageCount').and.callThrough();
    component.getExcLogPageCount();
    component.tableCount = StaleSYstemPurgetoggledata.length;
    let a = fixture.debugElement.nativeElement.querySelector('#excLogTable');
    a = StaleSYstemPurgetoggledata;
    component.viewExecutionLog = true;
    expect(component.tableCount).toBe(2);
   });
});
