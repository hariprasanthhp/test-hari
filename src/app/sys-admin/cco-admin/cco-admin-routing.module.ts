import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallHomeComponent } from './call-home/call-home.component';
import { CcoAdminConfigurationsComponent } from './cco-admin-configurations/cco-admin-configurations.component';

import { CcoAdminComponent } from './cco-admin.component';
import { SystemTableViewComponent } from 'src/app/cco/system/cco-network-system/system-table-view/system-table-view.component';
import { AddComponent } from 'src/app/cco/system/cco-network-system/add/add.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { OperationsCloudAlarmsComponent } from './operations-cloud-alarms/operations-cloud-alarms.component';
import { CcoHealthThresholdComponent } from './cco-health-threshold/cco-health-threshold.component';
import { ServiceProvisioningComponent } from './service-provisioning/service-provisioning.component';
import { BSPInformationComponent } from '../my-community-iq/bsp-information/bsp-information.component';

const routes: Routes = [
  {
    path: '',
    component: CcoAdminComponent,
    children: [
      // {
      //   path: "call-home",
      //   component: CallHomeComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      // {
      //   path: "cco-admin-configurations",
      //   component: CcoAdminConfigurationsComponent,
      //   data: { title: 'Calix Cloud - Configurations' }
      // },
      // {
      //   path: "operations-cloud-alarms",
      //   component: OperationsCloudAlarmsComponent,
      //   data: { title: 'Calix Cloud - Alarms' }
      // },

      // {
      //   path: "call-home/add",
      //   component: AddComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      // {
      //   path: "call-home/edit/:id",
      //   component: AddComponent,
      //   data: { title: 'Calix Cloud - Call Home' }
      // },
      // { path: 'network-systems/add', component: AddComponent, canActivate: [AuthGuard] },
      // { path: 'network-systems/edit/:id', component: AddComponent, canActivate: [AuthGuard] },
      // { path: 'network-systems/list', component: SystemTableViewComponent, canActivate: [AuthGuard] },
      // {
      //   path: 'network-systems',
      //   redirectTo: 'network-systems/list',
      //   pathMatch: 'full',
      // },
      // {
      //   path: "threshold",
      //   component: CcoHealthThresholdComponent,
      // },
      // {
      //   path: "service-provisioning",
      //   component: ServiceProvisioningComponent,
      // },
      {
        path: "bsp-information",
        component: BSPInformationComponent,
      },
      {
        path: '',
        redirectTo: 'bsp-information',
        pathMatch: 'full',
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcoAdminRoutingModule { }
