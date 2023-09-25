import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { ReportsService } from '../reports.service';
import { SsoAuthService } from '../../../../shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CallAvoidanceReportComponent } from './call-avoidance-report.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('CallAvoidanceReportComponent', () => {
  let component: CallAvoidanceReportComponent;
  let fixture: ComponentFixture<CallAvoidanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallAvoidanceReportComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [ReportsService, TranslateService, NgbModal, SsoAuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallAvoidanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
