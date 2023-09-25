import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutgeWrkflwMainComponent } from './outge-wrkflw-main.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { CommonWorkflowService } from '../../workflow-shared/common-workflow.service';
import { OutageWorkflowService } from '../outage-workflow.service';

describe('OutgeWrkflwMainComponent', () => {
  let component: OutgeWrkflwMainComponent;
  let fixture: ComponentFixture<OutgeWrkflwMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutgeWrkflwMainComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        ,
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { paramMap: { get: () => ({ "id": 1101 }) } },
          }
        }, DateUtilsService, HttpClient, CommonService, CommonWorkflowService, CommonFunctionsService, OutageWorkflowService, Title
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OutgeWrkflwMainComponent);
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
    expect(component.getRecordById).toHaveBeenCalledWith({ "id": 1101 });
  });
});
