import { TestBed } from '@angular/core/testing';

import { SsoAuthService } from './sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from './common-functions.service';

describe('IPv6AddressService', () => {
  let service: SsoAuthService,
   http: HttpClient,
   auth: AuthService,
   router: Router,
   dateUtils: DateUtilsService,
   commonFunction: CommonFunctionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule, HttpClientTestingModule
          ],
          providers: [
            HttpClient,
          ]
    });
    service = TestBed.inject(SsoAuthService);
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    dateUtils = TestBed.inject(DateUtilsService);
    commonFunction = TestBed.inject(CommonFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});