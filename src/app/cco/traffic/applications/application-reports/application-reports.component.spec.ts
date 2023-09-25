import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import {
  HttpClient, HttpClientModule
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { request } from 'http';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { combineLatest, of, throwError } from 'rxjs';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { EnglishJSON } from 'src/assets/language/english.service';
import { applicationGroup, locations, modifiedApplication, modifiedLocation } from 'src/assets/mockdata/cco/traffic/shared/sharedApi.data';
import { errorStatus401, errorStatus500 } from 'src/assets/mockdata/shared/error.data';
import { environment } from 'src/environments/environment';
import { ChartOptionsService } from '../../shared/chart-options.service';
import { ApplicationReportApiService } from '../reports/application-report-api.service';

import { ApplicationReportsComponent } from './application-reports.component';

describe('ApplicationReportsComponent', () => {
  let component: ApplicationReportsComponent;
  let fixture: ComponentFixture<ApplicationReportsComponent>;
  let route: ActivatedRoute;
  let commonOrgService: CommonService
  let httpTestingController: HttpTestingController;
  let customTranslateService: CustomTranslateService
  let pageDetails = {
    main_route: 'applications',
    sub_route: 'traffic',
    showLocation: true,
    showApplication: true,
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
    "locationsSelected": ["21076ef9-6e82-4b92-b879-578ef125e838", "All"],
    "applicationsSelected": ["134dac7b-7207-472b-a21a-42ba827b95ca", "All"]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationReportsComponent],
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
        ChartOptionsService,
        ApplicationReportApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              typeSelected: 'traffic',
              criteria: 'usage',
              applicationsSelected: ['134dac7b-7207-472b-a21a-42ba827b95ca', 'All'],
              locationsSelected: ['21076ef9-6e82-4b92-b879-578ef125e838', 'All'],
              startDate: new Date(),
              endDate: new Date(),
              isApplicationGroup: 'no'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ApplicationReportsComponent);
        commonOrgService = TestBed.inject(CommonService);
        customTranslateService = TestBed.inject(CustomTranslateService);
        route = TestBed.inject(ActivatedRoute);
        httpTestingController = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
        component.typeSelected = 'traffic';
        fixture.detectChanges();
        const loadChartComponent = {
          loadChartData: () => { }
        };
        (component as any).TrafficComponent = loadChartComponent;
        (component as any).TopSubscribersComponent = loadChartComponent;
        (component as any).TopLocationsComponent = loadChartComponent;
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
    fixture.detectChanges();
    route.queryParams.subscribe((value) => {
      component.applicationsSelected = value.applicationsSelected;
      expect(component.runActive).toBeTruthy(false);
    })
    expect(component.intializeValues).toHaveBeenCalled();
    environment.VALIDATE_SCOPE = 'true';
    window.sessionStorage.setItem('traffic_TopSub_Endpoint_filters', JSON.stringify(params))
    component.ngOnInit();
  });

  it('should intializeValues', () => {
    component.intializeValues();
    expect(component.typeSelected).toEqual('traffic');
    expect(component.criteria).toEqual(criteria);
    expect(component.directions).toEqual(directions);
  });


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
    component.typeSelected = 'top_locations';
    component.setHideShowFilter();
    component.typeSelected = 'top_subscribers';
    component.setHideShowFilter();
  });

  it('should handle error 500', () => {
    spyOn(commonOrgService, 'openErrorAlert').and.callThrough()
    component.pageErrorHandle(errorStatus500);
    expect(component.loading).toBeFalse();
    expect(commonOrgService.openErrorAlert).toHaveBeenCalled();
  });

  it('should handle error 401', () => {
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
    sessionStorage.setItem("traffic_TopSub_Endpoint_filters", JSON.stringify({
      "criteriaSelected": "usage",
      "startDate": "2022-09-06T15:49:40.416Z",
      "endDate": "2022-09-12T15:49:40.416Z",
      "limit": 10,
      "directionSelected": "Down",
      "locationsSelected": ["21076ef9-6e82-4b92-b879-578ef125e838", "All"],
      "applicationsSelected": ["134dac7b-7207-472b-a21a-42ba827b95ca", "All"]
    })
    );
    spyOn(component, 'combineApps').and.callThrough();
    spyOn(component, 'setTopSubEndpointFilters').and.callThrough();
    const observableData = combineLatest([
      of(modifiedApplication)
    ]);
    component.combineLatest = observableData;
    component.makeParallelRequest();
    expect(component.applications[0]).toEqual(modifiedApplication[0]);
    expect(component.globalApps).toEqual(modifiedApplication);
    expect(component.combineApps).toHaveBeenCalled();
    expect(component.setTopSubEndpointFilters).toHaveBeenCalled();
  });

  it('changeApplication', () => {
    spyOn(component, 'getApplicationNames').and.callThrough();
    component.applicationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.changeApplication();
    expect(component.getApplicationNames).toHaveBeenCalled();

    component.applicationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.changeApplication();
  });

  it('getApplicationNames', () => {
    component.applicationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
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

  // it('changeTimeRange', fakeAsync(() => {
  //   component.changeTimeRange();
  //   flush(500);
  // }));

  // it('changelimit and changeDate and slideChangeDate and changeCriteria', () => {
  //   component.limit = 2;
  //   component.changelimit();
  //   component.limit = 501;
  //   component.changelimit();
  //   component.changeDate();
  //   component.startDate = new Date();
  //   component.endDate = new Date();
  //   component.changeDate();
  //   component.slideChangeDate(73);
  //   component.criteriaSelected = 'rate';
  //   component.changeCriteria();
  // });

  it('changeLocation', () => {
    spyOn(component, 'getLocationNames').and.callThrough();
    component.locationsSelected = ['All', 'e48a915f-2393-4917-bf6e-2f7280b5f7aa'];
    component.changeLocation();
    expect(component.getLocationNames).toHaveBeenCalled();

    component.locationsSelected = ['e48a915f-2393-4917-bf6e-2f7280b5f7aa', 'All'];
    component.changeLocation();
  });

  it('validatePeakRate and validateStartEndDates', () => {
    component.validatePeakRate();
    component.validateStartEndDates();
  });

  it('validatePeakRate and validateStartEndDates', () => {
    component.validatePeakRate();
    component.validateStartEndDates();
  });

  it('get application group name', () => {
    // component.getAppilcationId('Gaming');
    const req = httpTestingController.match(request => request.url === `config/application-group/Gaming?org-id=undefined`);
    //req[0].flush(applicationGroup);
  });

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
      component.typeSelected = "traffic"
      spyOn(component, 'getApplicationNames');
      spyOn(component, 'getLocationNames');
      (component as any).TrafficComponent = {
        loadChartData: () => { }
      };
      //act
      component.loadChartData(false);
      //assert
      expect(component.getApplicationNames).toHaveBeenCalled();
      expect(component.getLocationNames).toHaveBeenCalled();

      //arrange
      component.typeSelected = "top_locations";
      (component as any).TopLocationsComponent = {
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

    it('should set Top SubEndpointFilters', () => {
      //arrange
      sessionStorage.setItem("traffic_TopSub_Endpoint_filters", JSON.stringify({
        "criteriaSelected": "usage",
        "startDate": "2022-09-06T15:49:40.416Z",
        "endDate": "2022-09-12T15:49:40.416Z",
        "limit": 10,
        "directionSelected": "Down",
        "locationsSelected": ["21076ef9-6e82-4b92-b879-578ef125e838", "All"],
        "applicationsSelected": ["134dac7b-7207-472b-a21a-42ba827b95ca", "All"]
      })
      );
      sessionStorage.setItem('Orgacceforssid', 'Calix');
      component.typeSelected = 'top_subscribers';
      spyOn(component, 'setHideShowFilter');
      //act
      component.setTopSubEndpointFilters();
      //assert
      expect(component.runActive).toBeTruthy();
      expect(component.setHideShowFilter).toHaveBeenCalled();
      expect(component.secureAccessRole).toEqual('Calix');
    });

  });

});
