import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { modifiedApplication } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../shared/chart-options.service';

import { NetworkReportsComponent } from './network-reports.component';
import { TrafficComponent } from './traffic/traffic.component';

describe('NetworkReportsComponent', () => {
  let component: NetworkReportsComponent;
  let fixture: ComponentFixture<NetworkReportsComponent>;
  let commonOrgService: CommonService
  let customTranslateService: CustomTranslateService
  let pageDetails = {
    main_route: 'network',
    sub_route: 'top-subscribers',
    showCriteria: true,
    showStartDate: true,
    showEndDate: true,
    showLimit: true,
    showGroup: false,
    showDirection: true,
    showRate: false
  }
  let criteria = [
    {
      name: 'Usage',
      value: 'usage'
    },
    {
      name: 'Rate',
      value: 'rate'
    }
  ];
  let directions = [
    {
      name: 'Down',
      value: 'Down'
    },
    {
      name: 'Up',
      value: 'Up'
    },
    {
      name: 'Both(Down+Up)',
      value: 'both'
    }
  ];
  let params = {
    "criteriaSelected": "usage",
    "startDate": "2022-09-06T15:49:40.416Z",
    "endDate": "2022-09-12T15:49:40.416Z",
    "limit": 10,
    "groupSelected": "no",
    "directionSelected": "Down",
    "rateSelected": "Average",
    "monthCount": 3,
    "threshold": "0",
    "metric": "Rate",
    "monthSelected": "2022-09-12",
    "eliminateUnknownSelected": "no",
    "aggregateSelected": "false",
    "thresholdTypeSelected": "AllEndpoints",
    "scopeSelected": "1",
    "startHour": 0,
    "endHour": 23,
    "periodSelected": "-1",
    "peakRateFrom": 4,
    "peakRateTo": 5,
    "startTime": 0,
    "endTime": 25,
    "showTimeRange": false,
    "groupBy": "location"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkReportsComponent, TrafficComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        HighchartsChartModule,
        SharedUtilsModule,
        NgbModule,
        DataTablesModule,
        NgxSliderModule],
      providers: [
        CustomTranslateService,
        HttpClient,
        SsoAuthService,
        PrimeNGConfig,
        NgbModal,
        WebsocketService,
        CommonService,
        ChartOptionsService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NetworkReportsComponent);
        commonOrgService = TestBed.inject(CommonService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.typeSelected = 'traffic';
        const loadChartComponent = {
          loadChartData: () => { }
        };
        (component as any).TrafficComponent = loadChartComponent;
        (component as any).TopSubscribersComponent = loadChartComponent;
        (component as any).TopApplicationsComponent = loadChartComponent;
        (component as any).TopApplicationTrafficComponent = loadChartComponent;
        (component as any).SubscriberDistributionComponent = loadChartComponent;
        (component as any).MonthlyUsageByserviceCategoryComponent = loadChartComponent;
        (component as any).MonthlyUsageByapplicationComponent = loadChartComponent;
        (component as any).MaxDailyRateComponent = loadChartComponent;
        (component as any).AverageSubscriberRateComponent = loadChartComponent;
        (component as any).ActiveSubscribersComponent = loadChartComponent;
        (component as any).TopLocationsComponent = loadChartComponent;
        (component as any).PowerUsersComponent = loadChartComponent;
        (component as any).ApplicationTrafficComponent = loadChartComponent;
      });
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized ngOnInit()', () => {
    spyOn(component, 'intializeValues');
    component.ngOnInit();
    expect(component.intializeValues).toHaveBeenCalled();
    environment.VALIDATE_SCOPE = 'true';
    window.sessionStorage.setItem('traffic_TopSub_Endpoint_filters', JSON.stringify(params))
    component.ngOnInit();
  });

  it('should intializeValues', () => {
    component.intializeValues();
    //expect(component.typeSelected).toMatch('traffic');
    expect(component.criteria).toEqual(criteria);
    expect(component.directions).toEqual(directions);
    // component.typeSelected = 'power_users'
    // component.intializeValues();
    // component.typeSelected = 'traffic';
  });


  // it('should call loadChartData()', () => {
  //   spyOn(component.TrafficComponent, 'loadChartData').and.callThrough();
  //   component.typeSelected = 'traffic';
  //   component.pageDetails = pageDetails;
  //   component.loadChartData();
  //   expect(component.service.btnDisabled).toBeTrue();
  //   expect(component.typeSelected).toEqual('traffic');
  //   expect(component.TrafficComponent.loadChartData).toHaveBeenCalled();
  // });

  // it('should call setHideShowFilter()', () => {
  //   component.setHideShowFilter();
  //   expect(component.pageDetails).toEqual(pageDetails);

  //   component.typeSelected = 'top_applications';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'top_locations';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'top_subscribers';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'power_users';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'top_application_traffic';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'active_subscribers';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'subscriber_distribution';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'monthly_usage_byapplication';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'monthly_usage_byservice_category';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'max_daily_rate';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'average_subscriber_rate';
  //   component.setHideShowFilter();
  //   component.typeSelected = 'application_traffic';
  //   component.setHideShowFilter();
  // });

  it('should handle error 401', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should handle error 500', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should change type', () => {
    spyOn(component, 'setHideShowFilter').and.callThrough();
    component.changeType();
    expect(component.service.btnDisabled).toBeFalse();
    expect(component.setHideShowFilter).toHaveBeenCalled();
  });

  it('should get application', () => {
    spyOn(component, 'makeParallelRequest').and.callThrough();
    component.getApps();
    expect(component.makeParallelRequest).toHaveBeenCalled();
  });

  it('should call make Parallel Request', () => {
    spyOn(component, 'combineApps').and.callThrough();
    const observableData = combineLatest([
      of(modifiedApplication)
    ]);
    component.combineLatest = observableData;
    component.makeParallelRequest();
    expect(component.applications[0]).toEqual(modifiedApplication[0]);
    expect(component.globalApps).toEqual(modifiedApplication);
    expect(component.combineApps).toHaveBeenCalled();
  });

  it('changeApplication', () => {
    spyOn(component, 'getApplicationNames').and.callThrough();
    component.applicationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.changeApplication();
    expect(component.getApplicationNames).toHaveBeenCalled();

    component.applicationsSelected = ['e48a915f-2393-4917-bf6e-2f7280b5f7aa', 'All'];
    component.changeApplication();
  });

  it('getApplicationNames', () => {
    component.applicationsSelected = ['e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.getApplicationNames();
    //component.applicationsSelected = undefined
    component.getApplicationNames();
  });

  it('viewScheduleReport and changeType and getISOEndOfDay', () => {
    component.service.btnDisabled = true;
    component.viewScheduleReport();
    component.newTrafficWorkFlow();
    component.openModalInfo();
    component.changeType();
    component.getISOEndOfDay(new Date());
  });

  it('changeTimeRange', fakeAsync(() => {
    component.changeTimeRange();
    flush(500);
  }));

  it('changelimit and changeDate and slideChangeDate and changeCriteria', () => {
    component.limit = 2;
    component.changelimit();
    component.limit = 501;
    component.changelimit();
    component.changeDate();
    component.startDate = new Date();
    component.endDate = new Date();
    component.changeDate();
    component.slideChangeDate(73);
    component.criteriaSelected = 'rate';
    component.changeCriteria();
  });

  // it('validatePeakRate', () => {
  //   component.pageDetails = pageDetails
  //   component.peakRateFrom = null;
  //   // component.validatePeakRate();
  //   // component.validatePeakRateLimit();

  // });

  describe('RealtimeComponent', () => {

    beforeEach(() => {
      (<any>component).websocketservice = {
        connectWS$: of({}),
        wsConnectionError$: of(true),
        delay$: of({}),
        //rtData$: new Subject(),
        cacheData$: of({}),
        //ratePacketStreamData$: new Subject(),
        endPointSearch$: of({}),
        clearReplayData: () => { },
        WebSocketServer: { hasDisconnectedOnce: true },
        getCurrentMonitorInfo: () => ({ monitorId: "test@@once" }),
        listen: () => { },
        emit: () => { },
        setWindowLen: () => { },
        getWindowLen: () => { },
        setMonitorType: () => { },
        calculatePercentage: () => { },
        previousURL: ""
      };
      component.typeSelected = 'traffic';
      (component as any).TrafficComponent = {
        loadChartData: () => { }
      };
    });

    it('should load ChartData Or Modal', () => {
      //arrange
      let modal: 'warningModalConfirmation';
      spyOn(component, 'modalOpener');
      sessionStorage.setItem("showSensitiveInfo", "false");
      //act
      component.loadChartDataOrModal(true, modal);
      //assert
      expect(component.modalOpener).toHaveBeenCalledWith(modal);
    });

    it('should load ChartData Or Modal-else case', () => {
      //arrange
      let showSensitiveChecked = false;
      let modal: 'warningModalConfirmation';
      sessionStorage.setItem("showSensitiveInfo", "true");
      spyOn(component, 'loadChartData');
      //act
      component.loadChartDataOrModal(showSensitiveChecked, modal);
      //assert
      expect(component.loadChartData).toHaveBeenCalled();
    });

    it('should load Chart Data', () => {
      //arrange
      component.typeSelected = "traffic"
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "top_applications";
      (component as any).TopApplicationsComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "top_subscribers";
      (component as any).TopSubscribersComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "top_application_traffic";
      (component as any).TopApplicationTrafficComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "subscriber_distribution";
      (component as any).SubscriberDistributionComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "monthly_usage_byservice_category";
      (component as any).MonthlyUsageByserviceCategoryComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "monthly_usage_byapplication";
      (component as any).MonthlyUsageByapplicationComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "max_daily_rate";
      (component as any).MaxDailyRateComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "average_subscriber_rate";
      (component as any).AverageSubscriberRateComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();

      //arrange
      component.typeSelected = "active_subscribers";
      (component as any).ActiveSubscribersComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData();


    });

    it('should confirmShow', () => {
      //arrange
      spyOn(component, 'loadChartData');
      spyOn((<any>component).callOutComeService, 'Savepasspharseauditlog').and.returnValue(of("success"));
      sessionStorage.setItem("showSensitiveInfo", "true");
      //act
      component.confirmShow();
      //assert
      expect((<any>component).callOutComeService.Savepasspharseauditlog).toHaveBeenCalled();
      expect(component.loading).toBeFalsy();
      expect(component.loadChartData).toHaveBeenCalled();
    });

    it('should confirmShow,if error response', () => {
      //arrange
      spyOn(component, 'loadChartData');
      spyOn((<any>component).callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(''));
      //act
      component.confirmShow();
      //assert
      expect(component.loadChartData).toHaveBeenCalled();
    });

  });


});
