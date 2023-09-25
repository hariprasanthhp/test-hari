import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { SupportServiceService } from './support-service.service';

describe('SupportServiceService', () => {
  let service: SupportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule
],
      providers:[SsoAuthService]
    });
    service = TestBed.inject(SupportServiceService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
