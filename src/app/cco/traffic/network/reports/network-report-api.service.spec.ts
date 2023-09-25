import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { PowerUser, TopApplication, TopApplicationTraffic, TopLocation, TopSubscriber, Traffic } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { NetworkReportApiService } from './network-report-api.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NetworkReportApiService', () => {
  let service: NetworkReportApiService,
    httpTestingController: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        NetworkReportApiService,
        SsoAuthService
      ]
    });
    service = TestBed.inject(NetworkReportApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('get top traffic Api data', () => {
    params.criteriaSelected = 'usage';
    service.getTraffic(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].startPeriodSec).toMatch("1663113600")
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(Traffic);

    params.startDate = '2022-09-10T15:49:40.416Z'
    params.criteriaSelected = 'rate';
    service.getTraffic(params)
  });


  it('get top location Api data', () => {
    service.getTopLocations(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].name).toBe('Unknown', 'Unexpected name');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(TopLocation);

    params.criteriaSelected = 'rate';
    params["applicationsSelected"] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    service.getTopLocations(params, 'apps-top-locations');
  });


  it('get top application Api data', () => {
    params.criteriaSelected = 'rate';
    service.TopApplication(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].name).toBe('Netflix_VisionNet', 'Unexpected name');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(TopApplication);
  });


  it('get top application traffic Api data', () => {
    service.getAppTraffic(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].name).toMatch("Zoom Video Conferencing")
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(TopApplicationTraffic);
  });

  it('get top subscriber Api data', () => {
    service.getTopSubdata(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(TopSubscriber);
    params.criteriaSelected = 'rate';
    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    params['applicationsSelected'] = ['33a05cfa-efcd-4fcc-9253-a1951ae617b7'];
    params['type'] = 'location';
    service.getTopSubdata(params, 'location');
    service.getTopSubdata(params, 'application');
  });


  it('get power user Api data', () => {
    service.getPowerUsers(params).subscribe((data: any) => {
      expect(data).toBeTruthy("Data has not matched");
      expect(data.length).toBe(2, "Data has not matched");
      expect(data[0].name).toBe('Unknown Subscriber', 'Unexpected name');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(PowerUser);
  });

  it('getISOStartEndDate', () => {
    service.getISOStartEndDate(new Date())
    service.getISOStartEndDate(new Date(), true);
  });

  it('getStartDate', () => {
    service.getStartDate(new Date(), 14, 3)
    service.getStartDate(new Date(), 14, 2)
    service.getStartDate(new Date(), 45, 3)
  });

  it('getEndDate', () => {
    service.getEndDate(new Date(), 14, 3)
    service.getEndDate(new Date(), 14, 2)
    service.getEndDate(new Date(), 45, 3)
  });

  it('getDatePrevMonth', () => {
    service.getDatePrevMonth(3);
  });

  it('makeIsoDate', () => {
    service.makeIsoDate('2022-10-28T00:00:00Z');
  });

  afterEach(() => {
    httpTestingController.verify();
  });



});
