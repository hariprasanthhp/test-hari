import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { OptionsManagerService } from '../../service/options-manager.service';
import { ReportsModule } from '../reports.module';
import { ReportApiService } from '../service/report-api.service';

import { TopEndPointsComponent } from './top-end-points.component';

describe('TopEndPointsComponent', () => {
  let component: TopEndPointsComponent;
  let fixture: ComponentFixture<TopEndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopEndPointsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReportsModule],
      providers: [
        CustomTranslateService,
        ReportApiService,
        OptionsManagerService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopEndPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
