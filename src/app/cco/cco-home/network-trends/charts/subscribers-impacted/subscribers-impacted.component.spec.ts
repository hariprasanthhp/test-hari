import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { Subscriber_impacted } from 'src/assets/mockdata/cco/Home/networktrends';
import { DataService } from '../../../services/data.service';
import { HomeChartOptionsService } from '../../../services/home-chart-options.service';

import { SubscribersImpactedComponent } from './subscribers-impacted.component';

describe('SubscribersImpactedComponent', () => {
  let component: SubscribersImpactedComponent;
  let fixture: ComponentFixture<SubscribersImpactedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [SubscribersImpactedComponent],
      providers: [DataService, HomeChartOptionsService, TranslateService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersImpactedComponent);
    component = fixture.componentInstance;
    (component as any).Highcharts = { chart: () => { }, stockChart: () => { } };
    fixture.detectChanges();
  });

  it('load charts', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.data = Subscriber_impacted;
    component.loadChart();
    console.log(component.chartDataOptions);
    setTimeout(() => {
      expect(component.chartDataOptions.yAxis[0].title.text).toMatch("Number of Subscribers");
    }, 1000)
    flush(1500);
  }));

  afterEach(() => {
    fixture.destroy();
  });

});
