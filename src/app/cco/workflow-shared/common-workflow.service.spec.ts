import { TestBed } from '@angular/core/testing';

import { CommonWorkflowService } from './common-workflow.service';

describe('CommonWorkflowService', () => {
  let service: CommonWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
