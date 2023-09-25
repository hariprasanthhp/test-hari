import { TestBed } from '@angular/core/testing';

import { OntCategoryConfigurationService } from './ont-category-configuration.service';

describe('OntCategoryConfigurationService', () => {
  let service: OntCategoryConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntCategoryConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
