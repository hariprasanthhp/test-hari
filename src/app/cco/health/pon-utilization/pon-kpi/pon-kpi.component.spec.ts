import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonKpiComponent } from './pon-kpi.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { HealthService } from '../../service/health.service';
import { CcochartService } from '../service/ccochart.service';
import { NfainventoryService } from '../service/nfainventory.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { Title } from '@angular/platform-browser';
import { PonUtilizationComponent } from '../pon-utilization.component';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

describe('PonKpiComponent', () => {
  let component: PonKpiComponent;
  let fixture: ComponentFixture<PonKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonKpiComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule, HighchartsChartModule, FormsModule, DataTablesModule, NgSelectModule, ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        HealthService,
        CcochartService,
        NfainventoryService,
        ExportExcelService,
        NgbModal, HttpClient,
        CommonService,
        CommonFunctionsService,
        ShortnumberPipe,
        DateUtilsService, Title, PonUtilizationComponent,
        SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
