import { TestBed } from '@angular/core/testing';

import { IncrementalLayoutService } from './incremental-layout.service';

describe('IncrementalLayoutService', () => {
  let service: IncrementalLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncrementalLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
