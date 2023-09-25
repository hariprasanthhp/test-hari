import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/cco/traffic/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RealtimeComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    RealtimeRoutingModule,
    DataTablesModule,
    SharedModule,
    FormsModule
  ]
})
export class RealtimeModule { }
