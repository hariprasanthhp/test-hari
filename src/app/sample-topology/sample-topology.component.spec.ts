import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';

import { SampleTopologyComponent } from './sample-topology.component';

describe('SampleTopologyComponent', () => {
  let component: SampleTopologyComponent;
  let fixture: ComponentFixture<SampleTopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleTopologyComponent ],
      imports: [HttpClientTestingModule
,RouterTestingModule],
      providers: [NgxSpinnerService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
