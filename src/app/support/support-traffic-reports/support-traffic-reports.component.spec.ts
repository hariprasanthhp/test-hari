import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SupportTrafficReportsComponent } from './support-traffic-reports.component';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../data.service';
import { SupportRealtimeService } from './support-realtime.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('SupportTrafficReportsComponent', () => {
  let component: SupportTrafficReportsComponent;
  let fixture: ComponentFixture<SupportTrafficReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportTrafficReportsComponent],
      imports: [RouterTestingModule
, SharedModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule],
      providers: [
        TranslateService,
        SsoAuthService,
        SupportRealtimeService,
        DataServiceService,
        Router
      ]
    })

      .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SupportTrafficReportsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
