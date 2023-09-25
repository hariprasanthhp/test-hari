import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MycommunityIqService } from './mycommunity-iq.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('MycommunityIqService', () => {
  let service: MycommunityIqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [MycommunityIqService, SsoAuthService]
    });
    service = TestBed.inject(MycommunityIqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
