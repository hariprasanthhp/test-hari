import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutgeWrkflwSummaryComponent } from './outge-wrkflw-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { IssueService } from '../../issues/service/issue.service';
import { OutageWorkflowService } from '../outage-workflow.service';
import { FormBuilder } from '@angular/forms';

describe('OutgeWrkflwSummaryComponent', () => {
  let component: OutgeWrkflwSummaryComponent;
  let fixture: ComponentFixture<OutgeWrkflwSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutgeWrkflwSummaryComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { paramMap: { get: () => ({ "notificationId": 1101 }) } },
          }
        }, DateUtilsService, HttpClient, CommonService, OutageWorkflowService, IssueService, Title, FormBuilder
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OutgeWrkflwSummaryComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange
    spyOn(component, 'getRecordById');
    //act
    fixture.detectChanges();
    //assert 
    expect(component.showTitle).toBeTruthy();
    expect(component.getRecordById).toHaveBeenCalledWith({ "notificationId": 1101 });
  });
});
