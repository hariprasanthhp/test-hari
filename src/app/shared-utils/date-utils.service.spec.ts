import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

describe('DateUtilsService', () => {
  let service: DateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilsService);
  });

  it('should be created', () => {
    service.getCurrentUtcTime();
    service.getUserDateTime(new Date(), "UTC");
    service.getUtcTimeByBeforeDays('2022-12-10');
    service.getUtcTimeByEndDate(new Date(), 1, 23, 55);
    service.getUtcTimeByDate(new Date(), 1, 23, 55);
    service.getMonthYear(new Date());
    service.getChartFormat(1666895400);
    service.getIsoDate(new Date());
    service.timezoneDetected();
    //service.getChartFormatDate('1666895400');
    //service.getChartFormatDate('1666895400', 'MM/dd/yyyy', true);
    service.getLocalTimeZoneName();
    service.getISODate(new Date());
    service.getUserDatefromIsoDate('2022-09-12T15:49:40.416Z');
    service.getChartFormatDateInUtc(1666895400);
    service.getChartFormatNew(1666895400);
    service.getOffsetInHoursAndMin();
    service.secondsToHms(1800);
    service.getUserDateTimeByTimeZone('2022-09-12T15:49:40.416Z')
    expect(service).toBeTruthy();
  });
  
});
