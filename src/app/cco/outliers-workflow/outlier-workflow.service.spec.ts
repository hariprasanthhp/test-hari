import { TestBed } from '@angular/core/testing';

import { OutlierWorkflowService } from './outlier-workflow.service';

describe('OutlierWorkflowService', () => {
  let service: OutlierWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutlierWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
