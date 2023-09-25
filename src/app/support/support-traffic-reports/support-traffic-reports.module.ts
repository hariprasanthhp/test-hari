import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';

import { SupportTrafficReportsRoutingModule } from './support-traffic-reports-routing.module';
import { SupportTrafficReportsComponent } from './support-traffic-reports.component';
import { RealtimeComponent } from "./realtime/realtime.component";
import { BarchartComponent } from "./barchart/barchart.component";
import { StreamPathChartComponent } from "./stream-path-chart/stream-path-chart.component";
import { SharedModule } from '../shared/shared.module';
import { PocRealtimeChartComponent } from './poc-realtime-chart/poc-realtime-chart.component'//begin-aswin-20-04-2021-highchart-realtimechart-when-tab-change-data-error-check-poc-
import { SupportRealtimeService } from './support-realtime.service';

@NgModule({
  declarations: [SupportTrafficReportsComponent, RealtimeComponent, BarchartComponent, StreamPathChartComponent, PocRealtimeChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SupportTrafficReportsRoutingModule,
    HighchartsChartModule,
    NgSelectModule,
    SharedModule,
  ],
})
export class SupportTrafficReportsModule {
  constructor(private service: SupportRealtimeService) {
    this.service.getRealtimeDelay();
  }

}
