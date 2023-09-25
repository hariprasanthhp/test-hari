import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RealtimeDelayComponent } from './realtime-delay/realtime-delay.component';
import { FormsModule } from '@angular/forms';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { OneMinuteAggregationComponent } from './one-minute-aggregation/one-minute-aggregation.component';
import { UnmappedIpAggregationComponent } from './unmapped-ip-aggregation/unmapped-ip-aggregation.component';
import { FlowDataComponent } from './flow-data/flow-data.component';



@NgModule({
  declarations: [
    ConfigurationComponent,
    RealtimeDelayComponent,
    OneMinuteAggregationComponent,
    UnmappedIpAggregationComponent,
    FlowDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConfigurationRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule,
  ]
})
export class ConfigurationModule { }
