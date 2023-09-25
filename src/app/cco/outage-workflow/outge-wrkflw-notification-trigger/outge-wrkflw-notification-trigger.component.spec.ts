import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgeWrkflwNotificationTriggerComponent } from './outge-wrkflw-notification-trigger.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { OutageWorkflowService } from '../outage-workflow.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { HttpClient } from '@angular/common/http';
import { HistoryChartOptionsService } from '../../issues/historyreport/service/history-chart-options.service';
import { IssueService } from '../../issues/service/issue.service';

describe('OutgeWrkflwNotificationTriggerComponent', () => {
  let component: OutgeWrkflwNotificationTriggerComponent;
  let fixture: ComponentFixture<OutgeWrkflwNotificationTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutgeWrkflwNotificationTriggerComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [FormBuilder]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OutgeWrkflwNotificationTriggerComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    (component as any).otgWrkflwSrvc = { outageTabChanged$: of({}), updateRegLocToAll: () => { } };
    spyOn(component, 'getRegions');
    spyOn(component, 'generateExclusion');
    spyOn((component as any).triggerForm.valueChanges, 'subscribe');
    //act
    fixture.detectChanges();
    //assert 
    expect(component.submitted).toBeTruthy();
    expect(component.getRegions).toHaveBeenCalled();
    expect(component.generateExclusion).toHaveBeenCalled();
    expect((component as any).triggerForm.valueChanges.subscribe).toHaveBeenCalled();
  });

  it('should get Regions', () => {
    //arrange
    spyOn((component as any).issueService, 'getRegions').and.returnValue(of({}));
    //act
    component.getRegions();
    //assert 
    expect((component as any).issueService.getRegions).toHaveBeenCalled();
  });
});
