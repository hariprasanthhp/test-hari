import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HighchartsChartModule } from 'highcharts-angular';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';

import { RecordStreamChartComponent } from './record-stream-chart.component';

describe('RecordStreamChartComponent', () => {
  let component: RecordStreamChartComponent;
  let fixture: ComponentFixture<RecordStreamChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordStreamChartComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HighchartsChartModule
      ],
      providers: [
        TranslateService,
        DateUtilsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordStreamChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
