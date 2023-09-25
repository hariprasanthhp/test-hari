import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { FoundationHomeService } from './foundation-home.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('FoundationHomeService', () => {
  let service: FoundationHomeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule
]
    });
    service = TestBed.inject(FoundationHomeService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
