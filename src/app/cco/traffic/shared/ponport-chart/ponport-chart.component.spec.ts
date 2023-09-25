import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HighchartsChartModule } from 'highcharts-angular';
import { TranslateService } from 'src/app-services/translate.service';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

import { PonportChartComponent } from './ponport-chart.component';

describe('PonportChartComponent', () => {
  let component: PonportChartComponent;
  let fixture: ComponentFixture<PonportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PonportChartComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
,
        HighchartsChartModule
      ],
      providers: [
        SsoAuthService,
        WebsocketService,
        TranslateService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
