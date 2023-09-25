import { HttpClientTestingModule } from '@angular/common/http/testing';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FaUtilsService } from '../service/fa-utils.service';
import { OptionsManagerService } from '../service/options-manager.service';
import { RealTimeCommonFunctionService } from '../service/realtime-common-functions.service';
import { SupportRealtimeService } from '../support-realtime.service';

import { RealtimeComponent } from './realtime.component';

describe('RealtimeComponent', () => {
  let component: RealtimeComponent;
  let fixture: ComponentFixture<RealtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealtimeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule],
      providers: [
        TranslateService,
        SsoAuthService,
        OptionsManagerService,
        RealTimeCommonFunctionService,
        FaUtilsService,
        SupportRealtimeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
