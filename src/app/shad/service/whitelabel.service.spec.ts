import { HttpClient, HttpClientModule
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { WhitelabelService } from './whitelabel.service';

describe('WhitelabelService', () => {
  let service: WhitelabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
, RouterTestingModule
      ],
      providers: [
        HttpClient, SsoAuthService
      ]
    });
    service = TestBed.inject(WhitelabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
