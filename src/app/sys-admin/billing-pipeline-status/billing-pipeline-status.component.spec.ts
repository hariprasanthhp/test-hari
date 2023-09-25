import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPipelineStatusComponent } from './billing-pipeline-status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BillingPipelineStatusComponent', () => {
  let component: BillingPipelineStatusComponent;
  let fixture: ComponentFixture<BillingPipelineStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPipelineStatusComponent ],
      imports: [RouterTestingModule,HttpClientModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPipelineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
