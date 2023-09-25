import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { Subject, of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
import { CcoHealthThresholdComponent } from './cco-health-threshold.component';
import { ThresholdService } from './threshold.service';

describe('CcoHealthThresholdComponent', () => {
  let component: CcoHealthThresholdComponent;
  let fixture: ComponentFixture<CcoHealthThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoHealthThresholdComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule, DataTablesModule, FormsModule, RouterTestingModule, ReactiveFormsModule
      ],
      providers: [
        {
          provide: SsoAuthService, useValue: {
            getRedirectModule: () => "",
            getScopes: () => ({
              'cloud.rbac.coc.operations.health.monitoringthresholds': 'write'
            }),
            setPageAccess: () => { true },
          }
        },
        {
          provide: Title, useValue: {
            setTitle: () => { },
          }
        },
        { provide: TranslateService, useClass: CustomTranslateService }
        , FormBuilder,
        {
          provide: Router, useValue: {
            url: "",
          }
        },
        {
          provide: CommonService, useValue: {
            pageErrorHandle: () => ('Erro Info'),
          }
        },
        {
          provide: ThresholdService, useValue: {
            getThresholds: () => of({}),
            AddThresholds: () => of({}),
            updateThreshold: () => of({}),
          }
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CcoHealthThresholdComponent);
        component = fixture.componentInstance;
        component.languageSubject = new Subject();
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    //arrange  
    spyOn(component, 'getData');
    spyOn(component.thresholdForm.valueChanges, 'subscribe');
    //act
    component.ngOnInit();
    //assert
    expect(component.getData).toHaveBeenCalled();
    expect(component.thresholdForm.valueChanges.subscribe).toHaveBeenCalled();
    expect(component.save_disable).toBeTruthy();
  });

  it('should get data', () => {
    //arrange
    spyOn((component as any).service, 'getThresholds').and.returnValue(of({ ponPortHiUtilThreshold: '12', etyPortHiUtilThreshold: '10', ponPortHiUtilThresholdWarn: '30', etyPortHiUtilThresholdWarn: '40' }));
    spyOn(component.thresholdForm, 'patchValue');
    //act
    component.getData();
    //assert
    expect((component as any).service.getThresholds).toHaveBeenCalled();
    expect(component.isnewuser).toBeFalsy();
    expect(component.thresholdForm.patchValue).toHaveBeenCalledWith({ ponPortHiUtilThreshold: '12', etyPortHiUtilThreshold: '10', ponPortHiUtilThresholdWarn: '30', etyPortHiUtilThresholdWarn: '40' });
    expect(component.save_disable).toBeTruthy();
  });

  it('should get data,error response', () => {
    //arrange
    spyOn((component as any).service, 'getThresholds').and.returnValue(throwError(''));
    spyOn(component, 'pageErrorHandle');
    //act
    component.getData();
    //assert
    expect(component.loading).toBeFalsy();
    expect(component.successInfo).toEqual('');
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should save data', () => {
    //arrange
    spyOn((component as any).service, 'AddThresholds').and.returnValue(of('Saved Successfully'));
    spyOn(component, 'getData');
    (component as any).thresholdForm = { valid: true, value: { ponPortHiUtilThreshold: 26, etyPortHiUtilThreshold: 56, oltPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ontPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ponPortHiUtilThresholdClear: 35, etyPortHiUtilThresholdClear: 45, ponPortHiUtilThresholdWarn: 30, etyPortHiUtilThresholdWarn: 40 } };
    //act
    component.saveData();
    //assert
    expect(component.issubmit).toBeTruthy();
    expect((component as any).service.AddThresholds).toHaveBeenCalled();
    expect(component.isnewuser).toBeFalsy();
    expect(component.save_disable).toBeTruthy();
    expect(component.getData).toHaveBeenCalled();
  });

  it('should save data,error response', () => {
    //arrange
    (component as any).thresholdForm = { valid: true, value: { ponPortHiUtilThreshold: 26, etyPortHiUtilThreshold: 56, oltPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ontPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ponPortHiUtilThresholdClear: 35, etyPortHiUtilThresholdClear: 45, ponPortHiUtilThresholdWarn: 30, etyPortHiUtilThresholdWarn: 40 } };
    spyOn((component as any).service, 'AddThresholds').and.returnValue(throwError(''));
    spyOn(component, 'pageErrorHandle');
    //act
    component.saveData();
    //assert
    expect(component.loading).toBeFalsy();
    expect(component.successInfo).toEqual('');
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should save data,return case', () => {
    //arrange
    (component as any).thresholdForm = { valid: false };
    spyOn((component as any).service, 'AddThresholds');

    //act
    component.saveData();
    //assert
    expect(component.issubmit).toBeTruthy();
    expect((component as any).service.AddThresholds).not.toHaveBeenCalled();
  });

  it('should Handle the pageError', () => {
    //arrange
    let err: any = { status: 401 };
    component.language = { 'Access Denied': 'Access Denied' };
    //act
    component.pageErrorHandle(err);
    //assert
    expect(component.errorInfo).toEqual('Access Denied');

  });

  it('should Handle the pageError,else case', () => {
    //arrange
    let err: any = { status: 500 };
    //act
    component.pageErrorHandle(err);
    //assert
    expect(component.errorInfo).toEqual('Erro Info');

  });

  it('should update data', () => {
    //arrange
    spyOn((component as any).service, 'updateThreshold').and.returnValue(of('Saved Successfully'));
    spyOn(component, 'getData');
    (component as any).thresholdForm = { valid: true, value: { ponPortHiUtilThreshold: 26, etyPortHiUtilThreshold: 56, oltPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ontPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ponPortHiUtilThresholdClear: 35, etyPortHiUtilThresholdClear: 45, ponPortHiUtilThresholdWarn: 30, etyPortHiUtilThresholdWarn: 40 } };
    //act
    component.updataData();
    //assert
    expect(component.issubmit).toBeTruthy();
    expect((component as any).service.updateThreshold).toHaveBeenCalled();
    expect(component.isnewuser).toBeFalsy();
    expect(component.save_disable).toBeTruthy();
    expect(component.getData).toHaveBeenCalled();

  });

  it('should update data,error response', () => {
    //arrange    
    spyOn((component as any).service, 'updateThreshold').and.returnValue(throwError(''));
    spyOn(component, 'pageErrorHandle');
    (component as any).thresholdForm = { valid: true, value: { ponPortHiUtilThreshold: 26, etyPortHiUtilThreshold: 56, oltPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ontPonPowerLevelThresholdsWarn: { gponRxSignalLoThreshold: 0, xponRxSignalLoThreshold: 0 }, ponPortHiUtilThresholdClear: 35, etyPortHiUtilThresholdClear: 45, ponPortHiUtilThresholdWarn: 30, etyPortHiUtilThresholdWarn: 40 } };
    //act
    component.updataData();
    //assert
    expect(component.loading).toBeFalsy();
    expect(component.successInfo).toEqual('');
    expect(component.pageErrorHandle).toHaveBeenCalled();
  });

  it('should update data,return case', () => {
    //arrange
    (component as any).thresholdForm = { valid: false };
    spyOn((component as any).service, 'updateThreshold');
    //act
    component.updataData();
    //assert
    expect(component.issubmit).toBeTruthy();
    expect((component as any).service.updateThreshold).not.toHaveBeenCalled();
  });
});
