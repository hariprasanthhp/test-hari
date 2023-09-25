import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StreamService } from 'src/app/cco/shared/services/stream.service';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RealtimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RealtimeRoutingModule,
    HighchartsChartModule,
    SharedModule,
    CalendarModule,
    shared,
  ]
})
export class RealtimeModule {
  constructor(public streamService: StreamService) {
    this.streamService.getData();
  }

}
