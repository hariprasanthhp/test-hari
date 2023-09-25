import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { ShortnumberPipe } from 'src/app/support/shared/custom-pipes/shortnumber.pipe';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CcochartService } from '../pon-utilization/service/ccochart.service';
import { NfainventoryService } from '../pon-utilization/service/nfainventory.service';
import { HealthService } from '../service/health.service';

import { CcoOntComponent } from './cco-ont.component';

describe('CcoOntComponent', () => {
  let component: CcoOntComponent;
  let fixture: ComponentFixture<CcoOntComponent>;
  let httpTestingController: HttpTestingController;
  let NfaService: NfainventoryService;
  let healthService: HealthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoOntComponent],
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule, 
        CalendarModule, 
        HighchartsChartModule, 
        FormsModule, 
        DataTablesModule, 
        NgSelectModule, 
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        CcochartService,
        HealthService,
        ExportExcelService,
        NgbModal,
        DateUtilsService,
        NfainventoryService,
        CommonService,
        ShortnumberPipe, 
        Title,
        SsoAuthService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CcoOntComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        NfaService = TestBed.inject(NfainventoryService);
        healthService = TestBed.inject(HealthService);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoOntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
        expect(component).toBeTruthy();
  });

});