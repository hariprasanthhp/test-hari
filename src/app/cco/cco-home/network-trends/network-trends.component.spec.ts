import {
  HttpClient, HttpClientModule
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcochartService } from '../../health/pon-utilization/service/ccochart.service';
import { HistoryChartOptionsService } from '../../issues/historyreport/service/history-chart-options.service';
import { HomeChartOptionsService } from '../services/home-chart-options.service';

import { NetworkTrendsComponent } from './network-trends.component';
import { ActiveissueComponent } from 'src/app/cco/issues/active-reports/activeissue/activeissue.component';
import { SystemTableViewComponent } from 'src/app/cco/system/cco-network-system/system-table-view/system-table-view.component';
import { Active_Alarms, Kpi_Outages, poncapcitycount1, PON_Error_chart, Service_Outage, Subscriber_impacted, total_system, total_Unsynchronized_system } from 'src/assets/mockdata/cco/Home/networktrends';
import { forkJoin } from 'rxjs';
import { ExpectedConditions } from 'protractor';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NetworkTrendsComponent', () => {
  let component: NetworkTrendsComponent;
  let fixture: ComponentFixture<NetworkTrendsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/issues/active-reports', component: ActiveissueComponent },
          { path: 'cco/system/cco-network-system/system-table-view', component: SystemTableViewComponent }
        ]), HttpClientTestingModule
        , NgSelectModule],
      declarations: [NetworkTrendsComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [TranslateService, HttpClient, DateUtilsService, SsoAuthService, HomeChartOptionsService, CommonService, CcochartService, HistoryChartOptionsService, Title]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NetworkTrendsComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
       (component as any).Highcharts = { chart: () => { }, stockChart: () => { } }; 
      })
  });

  // it('Outages kpi', () => {
  //   const req = httpTestingController.expectOne(request => {
  //     if (request.url.includes(`analytics-engine/networkTrendOutages`))
  //       return true;
  //   });
  //   req.flush(Kpi_Outages);
  //   expect(component.outageInfo['percent']).toEqual(2);
  //   expect(component.outageInfo['count']).toEqual('100');
  // });

  // it('total system kpi', () => {
  //   const req = httpTestingController.expectOne(request =>
  //     request.url === 'nfa/systems/count');
  //   req.flush(total_system);
  //   expect(component.newConnectedSystemsInfo['count']).toMatch('2');
  // });


  // it('Total Unsynchronized Systems  kpi', () => { 
  //   const req = httpTestingController.expectOne(request =>
  //     request.url === 'nfa/systems/count?configState=UNSYNCHRONIZED');
  //   req.flush(total_Unsynchronized_system);
  //   expect(component.activeSystemsInfo['count']).toMatch('1');
  // });

  // it('all chart', () => {
  //   component.fullscreen = false;
  //   component.feature = {
  //     activealarm: true,
  //     biperrors: true,
  //     activepons: true,
  //     subscriberimpacted: true
  //   };
  //   spyOn(component, 'getBipError').and.callThrough();
  //   spyOn(component, 'getActiveAlarmReq').and.callThrough();
  //   component.getData();

  //   const biperror = httpTestingController.expectOne(request => request.url.includes('health/reports/ponerror/count?'));
  //   const alarmbySeverity = httpTestingController.expectOne(request => request.url.includes('analytics-engine/alarmbySeverity'));
  //   const Service_outage = httpTestingController.expectOne(request => request.url.includes('analytics-engine/alarmByName'));
  //   const Subscribers_Impacted = httpTestingController.expectOne(request => request.url.includes('analytics-engine/subscriberCount'));
  //   expect(biperror.request.method).toBe('GET');
  //   expect(alarmbySeverity.request.method).toBe('GET');
  //   // const e1 = forkJoin([alarmbySeverity, biperror, Service_Outage, Subscribers_Impacted]);
  //   biperror.flush(PON_Error_chart);
  //   alarmbySeverity.flush(Active_Alarms);
  //   Service_outage.flush(Service_Outage);
  //   Subscribers_Impacted.flush(Subscriber_impacted);
  //   expect(component.getBipError).toHaveBeenCalled();
  //   expect(component.getActiveAlarmReq).toHaveBeenCalled();
  //   expect(component.data['loss-of-pon'][0]['count']).toEqual(3);
  //   expect(component.data['subscriber'][0]['count']).toEqual(407);
  // });

  // afterEach(() => {
  //   fixture.destroy();
  // });
});
