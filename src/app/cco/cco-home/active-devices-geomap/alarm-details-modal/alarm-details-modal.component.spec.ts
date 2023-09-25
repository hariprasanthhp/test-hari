import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmDetailsModalComponent } from './alarm-details-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { IssueService } from 'src/app/cco/issues/service/issue.service';
import { HomeGeomapService } from '../../services/home-geomap.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { FormBuilder } from '@angular/forms';

describe('AlarmDetailsModalComponent', () => {
  let component: AlarmDetailsModalComponent;
  let fixture: ComponentFixture<AlarmDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmDetailsModalComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        { provide: TranslateService, useClass: CustomTranslateService }
        , {
          provide: SsoAuthService, useValue: {
            getScopes: () => ({ "cloud.rbac.coc.insights.activdevicesgeomap": 'write' }),
          }
        },
        {
          provide: Router, useValue: {
            routeReuseStrategy: { shouldReuseRoute: () => false }
          },
        }, IssueService, HomeGeomapService, HttpClient, CommonService, FormBuilder
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AlarmDetailsModalComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange      
    spyOn((component as any).issueService, 'getgeoMapHomeFilterParams');
    spyOn(component, 'getAlarmDetails');
    //act
    fixture.detectChanges();
    //assert
    expect(component.getAlarmDetails).toHaveBeenCalled();
    expect((component as any).issueService.getgeoMapHomeFilterParams).toHaveBeenCalled();
  });
});
