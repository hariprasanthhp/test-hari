import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcochartService } from '../pon-utilization/service/ccochart.service';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { HealthService } from '../service/health.service';

import { CcoAeComponent } from './cco-ae.component';
import { DataTablesModule } from 'angular-datatables';


describe('CcoAeComponent', () => {
  let component: CcoAeComponent;
  let fixture: ComponentFixture<CcoAeComponent>;
  let httpTestingController: HttpTestingController;
  let NfaService: NfainventoryService;
  let healthService: HealthService;
  let Ccochartservice: CcochartService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoAeComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , CalendarModule, HighchartsChartModule, FormsModule, DataTablesModule, NgSelectModule, 
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        HealthService,
        CcochartService,
        NfainventoryService,
        ExportExcelService,
        NgbModal,
        CommonService,
        CommonFunctionsService,
        ShortnumberPipe,
        DateUtilsService,
        SsoAuthService,
        Title]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CcoAeComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        NfaService = TestBed.inject(NfainventoryService);
        healthService = TestBed.inject(HealthService);
        Ccochartservice = TestBed.inject(CcochartService);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
