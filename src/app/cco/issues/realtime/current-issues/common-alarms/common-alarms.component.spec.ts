import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HistoryChartOptionsService } from '../../../historyreport/service/history-chart-options.service';
import { IssueService } from '../../../service/issue.service';

import { CommonAlarmsComponent } from './common-alarms.component';
import { forkJoin, of, throwError } from 'rxjs';
import { TOP_ALARMS } from 'src/assets/mockdata/cco/issues/service/top-alarms';

describe('CommonAlarmsComponent', () => {
  let component: CommonAlarmsComponent;
  let fixture: ComponentFixture<CommonAlarmsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [CommonAlarmsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, IssueService, CommonService, HttpClient, ExportExcelService, HistoryChartOptionsService]

    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CommonAlarmsComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
      });

  });

  // it('should get the alarms data', () => {
  //   component.loadIntialData();
  //   const req = httpTestingController.expectOne(request => {
  //     return true;
  //   });
  //   req.flush({ top: TOP_ALARMS });

  //   fixture.detectChanges();
  //   console.log(component.list);
  //   expect(component.list).toBeTruthy("Could not find the data");
  // });


  it('should call make alarms data', () => {
    const observableData = forkJoin([
      of({ top: TOP_ALARMS })
    ]);
    fixture.detectChanges();
    //component.listObs = observableData;
    component.loadIntialData();
    console.log(component.list);
    expect(component.list).toBeTruthy("Could not find the data");
    // expect(component.applications[1]).toEqual(modifiedApplication[0]);
    // expect(component.globalApps).toEqual(modifiedApplication);
    // expect(component.combineApps).toHaveBeenCalled();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
