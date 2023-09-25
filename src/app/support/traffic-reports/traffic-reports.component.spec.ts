import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';

import { TrafficReportsComponent } from './traffic-reports.component';

describe('TrafficReportsComponent', () => {
  let component: TrafficReportsComponent;
  let fixture: ComponentFixture<TrafficReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficReportsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, SharedModule, FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
