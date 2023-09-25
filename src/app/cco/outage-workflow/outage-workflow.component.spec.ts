import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageWorkflowComponent } from './outage-workflow.component';

describe('OutageWorkflowComponent', () => {
  let component: OutageWorkflowComponent;
  let fixture: ComponentFixture<OutageWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutageWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutageWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
