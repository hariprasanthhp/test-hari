import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoFoundationModule } from 'src/app/cco-foundation/cco-foundation.module';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataService } from '../services/data.service';
import { HomeChartOptionsService } from '../services/home-chart-options.service';

import { SystemServiceTrendsComponent } from './system-service-trends.component';

describe('SystemServiceTrendsComponent', () => {
  let component: SystemServiceTrendsComponent;
  let fixture: ComponentFixture<SystemServiceTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemServiceTrendsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgSelectModule, CcoFoundationModule],
      providers: [TranslateService, DataService, SsoAuthService, HomeChartOptionsService, Title]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemServiceTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
