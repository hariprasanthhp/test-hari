import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CcoAdminRoutingModule } from './cco-admin-routing.module';
import { CcoAdminComponent } from './cco-admin.component';
import { AddComponent } from './call-home/add/add.component';
import { CallHomeComponent } from './call-home/call-home.component';
import { DataTablesModule } from 'angular-datatables';
import { CcoAdminConfigurationsComponent } from './cco-admin-configurations/cco-admin-configurations.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/support/shared/shared.module';
import { OperationsCloudAlarmsComponent } from './operations-cloud-alarms/operations-cloud-alarms.component';
import { CcoHealthThresholdComponent } from './cco-health-threshold/cco-health-threshold.component';
import { ServiceProvisioningComponent } from './service-provisioning/service-provisioning.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CcoAdminComponent,
    AddComponent, CallHomeComponent, CcoAdminConfigurationsComponent, OperationsCloudAlarmsComponent, CcoHealthThresholdComponent, ServiceProvisioningComponent],
  imports: [
    CommonModule,
    CcoAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule,
    shared,
  ]
})
export class CcoAdminModule { }
