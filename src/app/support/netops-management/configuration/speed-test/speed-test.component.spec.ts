import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from 'src/app/support/data.service';
import { Router } from '@angular/router';
import { SpeedTestService } from '../../shared/service/speed-test.service';

import { SpeedTestComponent } from './speed-test.component';
import { of, throwError } from 'rxjs';
import { SpeedtestData } from 'src/assets/mockdata/support/netops-management/configuration/speedtest';
import { EnglishJSON } from 'src/assets/language/english.service';
import { errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('SpeedTestComponent', () => {
  let component: SpeedTestComponent;
  let fixture: ComponentFixture<SpeedTestComponent>;
  let router: Router;
  let sso: SsoAuthService;
  let speedTestService: SpeedTestService;
  let translateService :TranslateService;
  let mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/operations/workflows/workflow-wizard' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeedTestComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [
        Title, SsoAuthService, TranslateService, DataServiceService, SpeedTestService,
        { provide: Router, useValue: mockUrl },
      ]
    })
      .compileComponents()
      .then(() => {
        speedTestService = TestBed.inject(SpeedTestService);
        translateService = TestBed.inject(TranslateService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(SpeedTestComponent);
        component = fixture.componentInstance;
        component.orgId = '470053';
        fixture.detectChanges();
      });
  });

  it('ngOninit test for CCO', fakeAsync(() => {
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: 'cco/services/configuration/speed-test' };
    component.ngOnInit();
    let eng = new EnglishJSON();
    translateService.selectedLanguage.next(eng);
    flush(2000);
  }))

  it('ngOninit test for CSC', fakeAsync(() => {
    mockUrl = { navigate: jasmine.createSpy('navigate'), url: '/support/netops-management/configuration/speed-test' };
    component.ngOnInit();
    let eng = new EnglishJSON();
    translateService.selectedLanguage.next(eng);
    flush(2000);
  }))

  it('GetSpeedtestdetails for calixsmart', fakeAsync(() => {
    let response = SpeedtestData;
    response.calixnetspeed = 'calix_smart';
    response.calixEnabled = false;
    response.calixTr143Servers = [...response.calixTr143Servers,...response.calixTr143Servers];
    spyOn(speedTestService, 'speedTestDetails').and.returnValue(of(response));
    component.getSpeedtestDetails();
    fixture.detectChanges();
    flush(2000);
    expect(component.loading).toBeFalsy();
  }));

  it('GetSpeedtestdetails calix_tr143', fakeAsync(() => {
    let response = SpeedtestData;
    response.calixnetspeed = 'calix_tr143';
    response.calixEnabled = true;
    response.calixTr143Servers = [];
    response.tr143Servers = [];
    spyOn(speedTestService, 'speedTestDetails').and.returnValue(of(response));    
    component.getSpeedtestDetails();
    fixture.detectChanges();
    flush(2000);
    expect(component.loading).toBeFalsy();
  }));

  it('GetSpeedtestdetails Ookla', fakeAsync(() => {
    let response = SpeedtestData;
    response.calixnetspeed = 'ookla';
    response.ooklaEnabled = true;
    spyOn(speedTestService, 'speedTestDetails').and.returnValue(of(response));        
    component.getSpeedtestDetails();
    fixture.detectChanges();
    flush(2000);
    expect(component.loading).toBeFalsy();
  }));

  it('GetSpeedtestdetails API error case', fakeAsync(() => {
    spyOn(speedTestService, 'speedTestDetails').and.returnValue(throwError(errorStatus504));        
    component.getSpeedtestDetails();
    fixture.detectChanges();
    flush(2000);
    expect(component.loading).toBeFalsy();
  }));
  
  it('updateSpeedTest', fakeAsync(() => {
    const testForm = <NgForm><any>{
      value: {
        downloadUrl: '',
        uploadUrl: '',
        uploadSize: 10
      },
      controls:{
        pingTarget:{
          value: '0.0.0.1'
        }
      }
    };
    spyOn(speedTestService, 'speedTestDetails').and.returnValue(throwError(errorStatus504));
    // component.updateSpeedTest(testForm, 'Thirdpartyconfig');
    fixture.detectChanges();
    flush(2000);
    expect(component.loading).toBeFalsy();
  }));

});
