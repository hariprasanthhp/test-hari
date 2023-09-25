import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';
import { CurrentIssuesComponent } from './current-issues/current-issues.component';
import { GeographicViewComponent } from './geographic-view/geographic-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectedAlarmsComponent } from './current-issues/connected-alarms/connected-alarms.component';
import { DisconnectedAlarmsComponent } from './current-issues/disconnected-alarms/disconnected-alarms.component';
import { CommonAlarmsComponent } from './current-issues/common-alarms/common-alarms.component';
// import { GeomapIssuesViewComponent } from './current-issues/geomap-issues-view/geomap-issues-view.component';
import { AlarmsSharedModule } from '../alarms-shared/alarms-shared.module';
import { DataTablesModule } from 'angular-datatables';
// import { SystemListComponent } from './current-issues/geomap-issues-view/system-list/system-list.component';

@NgModule({
  declarations: [RealtimeComponent, CurrentIssuesComponent, GeographicViewComponent, ConnectedAlarmsComponent, DisconnectedAlarmsComponent, CommonAlarmsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RealtimeRoutingModule,
    ReactiveFormsModule,
    AlarmsSharedModule,
    DataTablesModule
  ]
})
export class RealtimeModule { }
