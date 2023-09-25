import { HttpClient, HttpClientModule
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CcoOrgAdminService } from './cco-org-admin.service';

describe('CcoOrgAdminService', () => {
  let service: CcoOrgAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule
],
      providers: [HttpClient]
    });
    service = TestBed.inject(CcoOrgAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
