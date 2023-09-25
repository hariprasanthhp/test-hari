import { TestBed } from '@angular/core/testing';
import { ThresholdService } from './threshold.service';
import { HttpClient } from '@angular/common/http';
import { of, } from 'rxjs';

describe('ThresholdService', () => {
  let service: ThresholdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, useValue: {
            get: () => of({}),
            put: () => of({}),
            post: () => of({}),
          }
        },
      ]
    });
    service = TestBed.inject(ThresholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getThresholds', () => {
    //arrange
    spyOn((service as any).httpClient, 'get').and.returnValue(of({}));
    //act
    service.getThresholds();
    //assert
    expect((service as any).httpClient.get).toHaveBeenCalled();
  });

  it('should Add Thresholds', () => {
    //arrange
    const data = { ponPortHiUtilThreshold: 26, etyPortHiUtilThreshold: 56 }
    spyOn((service as any).httpClient, 'post').and.returnValue(of({}));
    //act
    service.AddThresholds(data);
    //assert
    expect((service as any).httpClient.post).toHaveBeenCalled();
  });
  it('should updateThreshold', () => {
    //arrange
    const data = { ponPortHiUtilThreshold: 27, etyPortHiUtilThreshold: 76 }
    spyOn((service as any).httpClient, 'put').and.returnValue(of({}));
    //act
    service.updateThreshold(data);
    //assert
    expect((service as any).httpClient.put).toHaveBeenCalled();
  });

  it('should handleError', () => {
    //act
    const res = (service as any).handleError({});
    //assert
    expect(res).toBeTruthy();
  });
});
