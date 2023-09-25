import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { AdminFoundationService } from './admin-foundation.service';

describe('AdminFoundationService', () => {
  let service: AdminFoundationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule
]
    });
    service = TestBed.inject(AdminFoundationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
