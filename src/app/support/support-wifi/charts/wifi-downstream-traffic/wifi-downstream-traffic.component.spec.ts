import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { SupportWifiService } from '../../services/support-wifi.service';

import { WifiDownstreamTrafficComponent } from './wifi-downstream-traffic.component';

describe('WifiDownstreamTrafficComponent', () => {
  let component: WifiDownstreamTrafficComponent;
  let fixture: ComponentFixture<WifiDownstreamTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WifiDownstreamTrafficComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      providers: [
        SupportWifiService,
        SupportWifiChartOptionsService,
        CommonService,
        TranslateService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiDownstreamTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
