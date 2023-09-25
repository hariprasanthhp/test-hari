import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SupportRealtimeService } from '../support-realtime.service';

import { PocRealtimeChartComponent } from './poc-realtime-chart.component';

describe('PocRealtimeChartComponent', () => {
  let component: PocRealtimeChartComponent;
  let fixture: ComponentFixture<PocRealtimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PocRealtimeChartComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [
        DateUtilsService,
        SsoAuthService, SupportRealtimeService
      ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocRealtimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
