import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClient
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ApplicationReportApiService } from '../../applications/reports/application-report-api.service';

import { CcoCommonFilterComponent } from './cco-common-filter.component';

describe('CcoCommonFilterComponent', () => {
  let component: CcoCommonFilterComponent;
  let fixture: ComponentFixture<CcoCommonFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule
,
        NgSelectModule,
        FormsModule,
        CalendarModule,
        SharedUtilsModule,
        NgxSliderModule],
      declarations: [CcoCommonFilterComponent],
      providers: [CustomTranslateService, HttpClient, SsoAuthService, PrimeNGConfig, NgbModal, ApplicationReportApiService, CommonService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoCommonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
