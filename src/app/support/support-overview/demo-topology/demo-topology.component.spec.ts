import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { DataServiceService } from '../../data.service';
import { SharedModule } from '../../shared/shared.module';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';
import { IssuesService } from '../services/issues.service';

import { DemoTopologyComponent } from './demo-topology.component';

describe('DemoTopologyComponent', () => {
  let component: DemoTopologyComponent;
  let fixture: ComponentFixture<DemoTopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoTopologyComponent],
      imports: [HttpClientTestingModule
, RouterTestingModule, SharedModule, FormsModule, ReactiveFormsModule],
      providers: [TranslateService, IssuesService, NgxSpinnerService, SsoAuthService, DataServiceService, CommonService, SupportWifiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
