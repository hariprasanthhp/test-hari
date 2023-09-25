import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { CallOutcomeReportService } from '../../shared/service/call-outcome-report.service';

import { CallOutcomeReportComponent } from './call-outcome-report.component';

describe('CallOutcomeReportComponent', () => {
  let component: CallOutcomeReportComponent;
  let fixture: ComponentFixture<CallOutcomeReportComponent>;
  let callOutcomeReportService: CallOutcomeReportService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallOutcomeReportComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
        , NgSelectModule],
      providers: [TranslateService, DownloadService, SsoAuthService, WindowRefService, CallOutcomeReportService, Title]
    })
      .compileComponents().then(() => {
        callOutcomeReportService = TestBed.inject(CallOutcomeReportService);
        fixture = TestBed.createComponent(CallOutcomeReportComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should download the file', () => {
    spyOn(callOutcomeReportService, 'getCallOutcomeFilePath').and.returnValue(of())
    spyOn(component, 'downloadReportFile').and.callThrough();
    component.downloadReportFile();
    expect(component.downloadReportFile).toHaveBeenCalled();

  });
});
