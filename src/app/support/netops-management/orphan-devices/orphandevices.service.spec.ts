import { TestBed } from '@angular/core/testing';

import { OrphandevicesService } from './orphandevices.service';

describe('OrphandevicesService', () => {
  let service: OrphandevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrphandevicesService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
