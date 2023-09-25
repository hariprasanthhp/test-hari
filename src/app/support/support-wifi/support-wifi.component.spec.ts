import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SharedModule } from '../shared/shared.module';
import { SupportWifiService } from './services/support-wifi.service';

import { SupportWifiComponent } from './support-wifi.component';

describe('SupportWifiComponent', () => {
  let component: SupportWifiComponent;
  let fixture: ComponentFixture<SupportWifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportWifiComponent],
      imports: [
        RouterTestingModule
, SharedModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule
      ],
      providers: [
        SsoAuthService,
        TranslateService,
        NgbModal,
        SupportWifiService,
        DateUtilsService,

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
