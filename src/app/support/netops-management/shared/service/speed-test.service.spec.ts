import { HttpClient
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpeedTestService } from './speed-test.service';

describe('SpeedTestService', () => {
  let service: SpeedTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule
],
      providers: [HttpClient]
    });
    service = TestBed.inject(SpeedTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
