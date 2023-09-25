import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveissueComponent } from './activeissue.component';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpClient, HttpClientModule
 } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonService } from 'src/app/sys-admin/services/common.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { IssueService } from '../../service/issue.service';
import { HistoryChartOptionsService } from '../../historyreport/service/history-chart-options.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidatorService } from 'src/app-services/validator.services';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { NgSelectModule } from '@ng-select/ng-select';
import { Title } from '@angular/platform-browser';


describe('ActiveissueComponent', () => {
  let component: ActiveissueComponent;
  let fixture: ComponentFixture<ActiveissueComponent>;

  let http: HttpClient;
  let translateService: TranslateService;
  let commonOrgService: CommonService;
  let exportExcelService: ExportExcelService;
  let issueService: IssueService;
  let chartOptionService: HistoryChartOptionsService;
  let dialogService: NgbModal;
  let fb: FormBuilder;
  let ssoService: SsoAuthService;
  let changeDetect: ChangeDetectorRef;
  let dateUtilsService: DateUtilsService;
  let validatorService: ValidatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule
, CalendarModule, NgSelectModule, FormsModule, ReactiveFormsModule ],
      declarations: [ ActiveissueComponent ],
      providers: [TranslateService, CommonService, ExportExcelService, IssueService, HistoryChartOptionsService, NgbModal, FormBuilder, SsoAuthService, ChangeDetectorRef, DateUtilsService, ValidatorService, Title]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
