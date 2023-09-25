import { TestBed } from '@angular/core/testing';

import { IpSubnetCalculatorService } from './ip-subnet-calculator.service';

describe('IpSubnetCalculatorService', () => {
  let service: IpSubnetCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpSubnetCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
