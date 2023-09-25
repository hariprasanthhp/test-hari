import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoNetworkOperationsComponent } from './cco-network-operations.component';
import { CcoNetworkOperationsRoutingModule } from './cco-network-operations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
// import { OrgAdminComponent } from './cco-org-admin/org-admin.component';
import { CcoAlarmRulesComponent } from './cco-alarm-rules/cco-alarm-rules.component';
import { AlarmGroupsComponent } from './cco-alarm-groups/alarm-groups/alarm-groups.component';
// import { CcoAlarmNotificationsComponent } from './cco-alarm-notifications/cco-alarm-notifications.component';
import { AlarmGroupsDatatableComponent } from './cco-alarm-groups/alarm-groups/shared/alarm-groups-datatable/alarm-groups-datatable.component';
import { CcoAlarmGroupsComponent } from './cco-alarm-groups/cco-alarm-groups.component';



@NgModule({
  declarations: [CcoNetworkOperationsComponent, CcoAlarmRulesComponent, AlarmGroupsComponent, AlarmGroupsDatatableComponent, CcoAlarmGroupsComponent],
  imports: [
    CommonModule,
    CcoNetworkOperationsRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule
  ]
})
export class CcoNetworkOperationsModule { }
