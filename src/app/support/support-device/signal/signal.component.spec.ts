import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SupportWifiChartOptionsService } from '../../support-wifi/services/support-wifi-chart-options.service';
import { SupportWifiService } from '../../support-wifi/services/support-wifi.service';

import { SignalComponent } from './signal.component';

describe('SignalComponent', () => {
  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
],
      providers: [SupportWifiService, SupportWifiChartOptionsService, CommonService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
