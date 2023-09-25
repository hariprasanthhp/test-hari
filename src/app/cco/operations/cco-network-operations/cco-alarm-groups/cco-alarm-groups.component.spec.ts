import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

import { CcoAlarmGroupsComponent } from './cco-alarm-groups.component';

describe('CcoAlarmGroupsComponent', () => {
  let component: CcoAlarmGroupsComponent;
  let fixture: ComponentFixture<CcoAlarmGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcoAlarmGroupsComponent ],
      imports : [RouterTestingModule, HttpClientTestingModule
],
      providers : [TranslateService, CommonService, SsoAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoAlarmGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
