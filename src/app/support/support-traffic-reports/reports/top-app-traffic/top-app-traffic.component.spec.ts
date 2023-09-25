import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ReportsModule } from '../reports.module';
import { ReportApiService } from '../service/report-api.service';

import { TopAppTrafficComponent } from './top-app-traffic.component';

describe('TopAppTrafficComponent', () => {
  let component: TopAppTrafficComponent;
  let fixture: ComponentFixture<TopAppTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopAppTrafficComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReportsModule],
      providers: [
        CustomTranslateService,
        ReportApiService,
        DateUtilsService,
        CommonService,
        ExportExcelService,
        SsoAuthService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
