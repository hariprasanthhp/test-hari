import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemComponent } from './system.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { HistoryChartOptionsService } from 'src/app/cco/issues/historyreport/service/history-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { OutlierWorkflowService } from '../../outlier-workflow.service';

describe('SystemComponent', () => {
  let component: SystemComponent;
  let fixture: ComponentFixture<SystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule 
      ],
      providers: [TranslateService, CommonService, HttpClient, FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
