import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CcoRoutingModule } from './cco-routing.module';
import { CcoComponent } from './cco.component';
import { CcoHeaderComponent } from './cco-header/cco-header.component';
import { CcoFooterComponent } from './cco-footer/cco-footer.component';

import { SharedUtilsModule } from "../shared-utils/shared-utils.module";
import { NetworkTopologyComponent } from './network-topology/network-topology.component';
import { SharedModule } from '../support/shared/shared.module';
import { CcoSystemSearchComponent } from './cco-system-search/cco-system-search.component';
import { DataTablesModule } from 'angular-datatables';
import { SupportOverviewModule } from '../support/support-overview/support-overview.module';
import { SupportServiceModule } from '../support/support-service/support-service.module';
import { SupportSystemModule } from '../support/support-system/support-system.module';
import { SupportWifiModule } from '../support/support-wifi/support-wifi.module';
import { SupportDeviceModule } from '../support/support-device/support-device.module';
import { SupportApplicationModule } from '../support/support-application/support-application.module';
import { NetopsManagementModule } from '../support/netops-management/netops-management.module';
import { SupportTrafficReportsModule } from '../support/support-traffic-reports/support-traffic-reports.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [CcoComponent, CcoHeaderComponent, CcoFooterComponent, NetworkTopologyComponent, CcoSystemSearchComponent, DashboardComponent],
  imports: [
    CommonModule,
    CcoRoutingModule,
    SharedModule,
    SharedUtilsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    SupportOverviewModule,
    SupportServiceModule,
    SupportSystemModule,
    SupportWifiModule,
    SupportDeviceModule,
    SupportApplicationModule,
    NetopsManagementModule,
    SupportTrafficReportsModule
  ]
})
export class CcoModule { }
