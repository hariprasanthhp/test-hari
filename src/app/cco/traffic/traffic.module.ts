import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TrafficRoutingModule } from './traffic-routing.module';

import { TrafficComponent } from './traffic.component';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { WebsocketService } from '../shared/services/websocket.service';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordViewComponent } from './record-view/record-view.component';
import { SharedModule } from './shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [TrafficComponent, RecordListComponent, RecordViewComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    TrafficRoutingModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    SharedModule,
    DataTablesModule,
    NgxSliderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrafficModule {
  constructor(private wsService: WebsocketService) {
    this.wsService.getRealtimeDelay();
    this.wsService.getUnSignedUrl().subscribe((res: any) => {
      this.wsService.Checkconnectornot(res.signedurl);
    });
  }

}
