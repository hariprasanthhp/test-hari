import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { Service_Outage } from 'src/assets/mockdata/cco/Home/networktrends';
import { DataService } from '../../../services/data.service';
import { HomeChartOptionsService } from '../../../services/home-chart-options.service';

import { NetworkAvailabilityComponent } from './network-availability.component';

describe('NetworkAvailabilityComponent', () => {
  let component: NetworkAvailabilityComponent;
  let fixture: ComponentFixture<NetworkAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [NetworkAvailabilityComponent],
      providers: [DataService, HomeChartOptionsService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
  });

  it('load chart', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.data = Service_Outage;
    component.loadChart();
    console.log(component.chartDataOptions);
    setTimeout(() => {
      expect(component.chartDataOptions.yAxis[0].title.text).toMatch("Number of PON Interfaces");
    }, 1000)
    flush(1500);
  }));
  afterEach(() => {
    fixture.destroy();
  });
});
