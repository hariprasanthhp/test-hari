import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../../data.service';
import { SubscribeService } from '../../shared/service/subscriber.service';
import { SupportRadioService } from '../../shared/service/support-radio.service';
import { SupportWifiService } from '../services/support-wifi.service';

import { SSIDComponent } from './ssid.component';

describe('SSIDComponent', () => {
  let component: SSIDComponent;
  let fixture: ComponentFixture<SSIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SSIDComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
        , NgSelectModule, CalendarModule
      ],
      providers: [
        TranslateService, SupportRadioService, SsoAuthService, SubscribeService, NgbModal, SupportWifiService, DataServiceService
      ]
    })
      .compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SSIDComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();

  // });
});
