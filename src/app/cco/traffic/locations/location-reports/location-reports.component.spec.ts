import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import {
  HttpClient, HttpClientModule
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ApplicationReportApiService } from '../../applications/reports/application-report-api.service';
import { ChartOptionsService } from '../../shared/chart-options.service';
import { combineLatest, of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { LocationReportsComponent } from './location-reports.component';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { locations, modifiedApplication, modifiedLocation } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { EnglishJSON } from 'src/assets/language/english.service';
import { environment } from 'src/environments/environment';

describe('LocationReportsComponent', () => {
  let component: LocationReportsComponent;
  let fixture: ComponentFixture<LocationReportsComponent>;
  let route: ActivatedRoute;
  let commonOrgService: CommonService
  let customTranslateService: CustomTranslateService
  let httpTestingController: HttpTestingController;
  let pageDetails = {
    main_route: 'locations',
    sub_route: 'traffic',
    showLocation: true,
    showApplication: false,
    showCriteria: true,
    showStartDate: true,
    showEndDate: true,
    showLimit: false
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
    "groupBy": "location",
    "locationsSelected": ["21076ef9-6e82-4b92-b879-578ef125e838"]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationReportsComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
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
        ChartOptionsService,
        ApplicationReportApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              criteria: 'usage',
              locationsSelected: '21076ef9-6e82-4b92-b879-578ef125e838',
              applicationsSelected: '134dac7b-7207-472b-a21a-42ba827b95ca'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationReportsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    commonOrgService = TestBed.inject(CommonService);
    customTranslateService = TestBed.inject(CustomTranslateService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
  });

  it('should initialized constructor()', () => {
    let englishJSON = new EnglishJSON;
    customTranslateService.selectedLanguage.next(englishJSON.data);
    component.constructor;
  });

  it('should initialized ngOnInit()', () => {
    spyOn(component, 'intializeValues');
    component.ngOnInit();
    fixture.detectChanges();
    route.queryParams.subscribe((value) => {
      component.applicationsSelected = value.applicationsSelected;
      expect(value).toEqual({ criteria: 'usage', locationsSelected: '21076ef9-6e82-4b92-b879-578ef125e838', applicationsSelected: '134dac7b-7207-472b-a21a-42ba827b95ca' })
      expect(component.runActive).toBeTruthy(false);
    })
    expect(component.intializeValues).toHaveBeenCalled();
    environment.VALIDATE_SCOPE = 'true';
    window.sessionStorage.setItem('traffic_TopSub_Endpoint_filters', JSON.stringify(params))
    component.ngOnInit();
  });

  // it('should intializeValues', () => {
  //   component.intializeValues();
  //   expect(component.typeSelected).toEqual('top_subscribers');
  //   expect(component.criteria).toEqual(criteria);
  //   expect(component.directions).toEqual(directions);
  // });


  // it('should call loadChartData()', () => {
  //   spyOn(component.TrafficComponent, 'loadChartData').and.callThrough();
  //   component.typeSelected = 'traffic';
  //   component.pageDetails = pageDetails;
  //   component.loadChartData(0);
  //   expect(component.service.btnDisabled).toEqual(true);
  //   expect(component.typeSelected).toEqual('traffic');
  //   expect(component.TrafficComponent.loadChartData).toHaveBeenCalled();
  // });

  it('should call setHideShowFilter()', () => {
    spyOn(component, 'changeCriteria').and.callThrough()
    component.setHideShowFilter();
    expect(component.changeCriteria).toHaveBeenCalled();
    component.typeSelected = 'top_applications';
    component.setHideShowFilter();
    component.typeSelected = 'top_locations';
    component.setHideShowFilter();
    component.typeSelected = 'top_subscribers';
    component.setHideShowFilter();
    component.typeSelected = 'power_users';
    component.setHideShowFilter();
    component.typeSelected = 'top_application_traffic';
    component.setHideShowFilter();
    component.typeSelected = 'active_subscribers';
    component.setHideShowFilter();
    component.typeSelected = 'subscriber_distribution';
    component.setHideShowFilter();
    component.typeSelected = 'monthly_usage_byapplication';
    component.setHideShowFilter();
    component.typeSelected = 'monthly_usage_byservice_category';
    component.setHideShowFilter();
    component.typeSelected = 'max_daily_rate';
    component.setHideShowFilter();
    component.typeSelected = 'average_subscriber_rate';
    component.setHideShowFilter();
    component.typeSelected = 'application_traffic';
    component.setHideShowFilter();
  });

  it('should handle error', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus401);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should change type', () => {
    spyOn(component, 'setHideShowFilter').and.callThrough();
    component.changeType();
    expect(component.service.btnDisabled).toBeFalse();
    expect(component.setHideShowFilter).toHaveBeenCalled();
  });

  it('should get location', () => {
    component.getLocations();
    const req = httpTestingController.match(request => request.url === `config/location?org-id=`);
    req[0].flush(locations);
    expect(component.locations.length).toEqual(2);
    expect(component.locations[1].name).toMatch("XGS_Manual");
    expect(component.locations[0].name).toEqual("Location-FWU-239-214");
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
    component.applicationsSelected = undefined
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

  it('keyPress and changeLocation', () => {
    let event = { keyCode: 8 };
    component.getAppsOld();
    spyOn(component, 'getLocationNames').and.callThrough();
    component.locationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.changeLocation();
    expect(component.getLocationNames).toHaveBeenCalled();

    component.locationsSelected = ['e48a915f-2393-4917-bf6e-2f7280b5f7aa', 'All'];
    component.changeLocation();
    component.keyPress(event);
  });

  // it('validatePeakRate and validateStartEndDates', () => {
  //   component.validatePeakRate();
  //   component.validateStartEndDates();
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
      expect(component.loadChartData).toHaveBeenCalledWith(false);
    });

    it('should load Chart Data', () => {
      //arrange
      component.typeSelected = "traffic";
      // (component as any).TrafficComponent = {
      //   loadChartData: () => { }
      // }
      component.validateStartEndDates = () => true;
      //component.validatePeakRate = () => true;
      //component.limit = 510;
      //component.treshold = 9223372036854760000;
      spyOn(component, 'validatePeakRate');
      //act
      component.loadChartData(false);
      //assert
      expect(component.validatePeakRate).toHaveBeenCalled();


      //arrange
      component.typeSelected = "top_applications";
      (component as any).TopApplicationsComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "top_subscribers";
      (component as any).TopSubscribersComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "top_application_traffic";
      (component as any).TopApplicationTrafficComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "subscriber_distribution";
      (component as any).SubscriberDistributionComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "monthly_usage_byservice_category";
      (component as any).MonthlyUsageByserviceCategoryComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "monthly_usage_byapplication";
      (component as any).MonthlyUsageByapplicationComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "max_daily_rate";
      (component as any).MaxDailyRateComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "average_subscriber_rate";
      (component as any).AverageSubscriberRateComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);

      //arrange
      component.typeSelected = "active_subscribers";
      (component as any).ActiveSubscribersComponent = {
        loadChartData: () => { }
      }
      //act
      component.loadChartData(false);


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
      expect(component.loadChartData).toHaveBeenCalledWith(false);
    });

    it('should confirmShow,if error response', () => {
      //arrange
      spyOn(component, 'loadChartData');
      spyOn((<any>component).callOutComeService, 'Savepasspharseauditlog').and.returnValue(throwError(''));
      //act
      component.confirmShow();
      //assert
      expect(component.loadChartData).toHaveBeenCalledWith(false);
    });

  });

});
