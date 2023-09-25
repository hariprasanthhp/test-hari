import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OptionsManagerService } from '../../service/options-manager.service';
import { ReportsModule } from '../reports.module';
import { ReportApiService } from '../service/report-api.service';

import { MonthlyUsageComponent } from './monthly-usage.component';

describe('MonthlyUsageComponent', () => {
  let component: MonthlyUsageComponent;
  let fixture: ComponentFixture<MonthlyUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyUsageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReportsModule],
      providers: [
        CustomTranslateService,
        ReportApiService,
        OptionsManagerService,
        CommonService,
        SsoAuthService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
