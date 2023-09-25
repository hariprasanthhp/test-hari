import { TestBed } from '@angular/core/testing';

import { OutageWorkflowService } from './outage-workflow.service';

describe('OutageWorkflowService', () => {
  let service: OutageWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutageWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
