import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';
import { StreamService } from 'src/app/cco/shared/services/stream.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { UnitConversionPipe } from 'src/app/cco/shared/pipes/unit-conversion.pipe';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule as shared } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RealtimeComponent,
    UnitConversionPipe],
  imports: [
    CommonModule,
    RealtimeRoutingModule,
    HighchartsChartModule,
    NgSelectModule,
    FormsModule,
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
