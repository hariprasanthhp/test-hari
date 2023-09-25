import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ConvertorService } from 'src/app/shared/services/convertor.service';
import { StreamService } from '../stream.service';
import { UnitConversionPipe } from 'src/app/cco/shared/pipes/unit-conversion.pipe';
import { NewStramPathChartComponent } from './new-stram-path-chart.component';

describe('NewStramPathChartComponent', () => {
  let component: NewStramPathChartComponent;
  let fixture: ComponentFixture<NewStramPathChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStramPathChartComponent, UnitConversionPipe],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        UnitConversionPipe,
        ConvertorService,
        DateUtilsService,
        StreamService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStramPathChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
