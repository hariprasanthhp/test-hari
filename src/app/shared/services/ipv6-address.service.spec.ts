import { TestBed } from '@angular/core/testing';

import { IPv6AddressService } from './ipv6-address.service';

describe('IPv6AddressService', () => {
  let service: IPv6AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IPv6AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
