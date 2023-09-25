import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { CommonReportsComponent } from './common-reports.component';

describe('CommonReportsComponent', () => {
  let component: CommonReportsComponent;
  let fixture: ComponentFixture<CommonReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonReportsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
, NgSelectModule, CalendarModule],
      providers: [
        CustomTranslateService,
        SsoAuthService, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
