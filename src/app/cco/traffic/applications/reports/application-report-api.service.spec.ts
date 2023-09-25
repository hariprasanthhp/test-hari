import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Traffic } from 'src/assets/mockdata/cco/traffic/network/reports.data';
import { errorStatus401 } from 'src/assets/mockdata/shared/error.data';
import { ApplicationReportApiService } from './application-report-api.service';

describe('ApplicationReportApiService', () => {
  let service: ApplicationReportApiService,
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
    service = TestBed.inject(ApplicationReportApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
    service.getTraffic(params, 'location');
    service.getTraffic(params, 'applications');
  });

  it('get callRestApi to endpoint', () => {
    service.callRestApi('/endpoint')
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
    service.getEndDate(new Date(), 48, 3)
  });

  it('handleError', () => {
    service.handleError(errorStatus401)
  });

});
