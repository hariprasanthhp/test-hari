import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MaxDailyRate, MonthlyUsageByApplication, MonthlyUsageByService, SubscriberDistribution } from 'src/assets/mockdata/cco/traffic/locaion/reports.data';
import { PowerUser, TopApplication, TopApplicationTraffic, Traffic } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { LocationReportApiService } from './location-report-api.service';


describe('LocationReportApiService', () => {
  let service: LocationReportApiService,
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
      imports: [
          HttpClientTestingModule,
          RouterTestingModule
      ],
      providers: [
        SsoAuthService
      ]
    });
    service = TestBed.inject(LocationReportApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
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

    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    params['type'] = 'location';
    service.getAppTraffic(params)
  });


  it('get monthly usage by application Api data', () => {
    service.getMonthlyUsageByApp(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].name).toMatch("Zynga")
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(MonthlyUsageByApplication);

    params['locationsSelected'] = undefined;
    service.getMonthlyUsageByApp(params)
  });


  it('get subscriber distributions Api data', () => {
    service.getSubDistributions(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[0].strInterval).toMatch('5G');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(SubscriberDistribution);

    params.endDate = '2022-09-06T15:49:40.416Z';
    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    service.getSubDistributions(params)
  });


  it('get monthly usage by service Api data', () => {
    service.getMonthlyUsageByService(params).subscribe((data: any) => {
      expect(data).toBeTruthy("No data available");
      expect(data.length).toBe(2, "Data length is wrong");
      expect(data[1].name).toMatch('Social');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(MonthlyUsageByService);

    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    service.getMonthlyUsageByService(params)
  });


  it('get top traffic Api data', () => {
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
    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    params['applicationsSelected'] = ['33a05cfa-efcd-4fcc-9253-a1951ae617b7'];
    service.getTraffic(params)
    service.getTraffic(params, 'applications');
  });


  it('get top application Api data', () => {
    service.TopApplication(params).subscribe((data: any) => {
      expect(data).toBeTruthy("Data has not matched");
      expect(data.length).toBe(2, "Data has not matched");
      expect(data[0].name).toMatch('Netflix_VisionNet');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(TopApplication);

    params['type'] = 'location';
    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    service.TopApplication(params);
  });


  it('get max daily rate Api data', () => {
    service.getMaxDailyRate(params).subscribe((data: any) => {
      expect(data).toBeTruthy("Data has not matched");
      expect(data.length).toBe(2, "Data has not matched");
      expect(data[1].subscriber).toMatch('user-radius10');
    })
    const req = httpTestingController.expectOne(request => {
      return true;
    });
    req.flush(MaxDailyRate);

    params['locationsSelected'] = ['134dac7b-7207-472b-a21a-42ba827b95ca'];
    params['eliminateUnknownSelected'] = 'yes';
    params['type'] = 'location';
    service.getMaxDailyRate(params)
  });

  it('getISOStartEndDate and getISOLocalStartEndDate', () => {
    service.getISOStartEndDate(new Date())
    service.getISOStartEndDate(new Date(), true);

    service.getISOLocalStartEndDate('2022-10-28T00:00:00Z');
    service.getISOLocalStartEndDate('2022-10-28T00:00:00Z', true, 12);
  });

  it('getStartDate and getEndDate', () => {
    service.getStartDate(new Date(), 14, 3);
    service.getStartDate(new Date(), 14, 2);
    service.getStartDate(new Date(), 45, 3);

    service.getEndDate(new Date(), 14, 3);
    service.getEndDate(new Date(), 14, 2);
    service.getEndDate(new Date(), 45, 3);
  });

  it('makeIsoDate and makeIsoDateZero', () => {
    service.makeIsoDate('2022-10-28T00:00:00Z');
    service.makeIsoDateZero('2022-10-28T00:00:00Z');
  });

  it('getStartOfMonth and getEndOfMonth', () => {
    service.getStartOfMonth('2022-10-28T00:00:00Z');
  });

  it('getData', () => {
    service.getData('/locations');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
