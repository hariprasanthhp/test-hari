import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmsComponent } from './alarms.component';
import { CcoAlarmRulesComponent } from '../cco-network-operations/cco-alarm-rules/cco-alarm-rules.component';
import { OperationsCloudAlarmsComponent } from 'src/app/sys-admin/cco-admin/operations-cloud-alarms/operations-cloud-alarms.component';

const routes: Routes = [{
  path: '', component: AlarmsComponent,
  children: [
    { path: 'transform-alarm-rules', component: CcoAlarmRulesComponent },
    { path: 'health-alarm-notifications', loadChildren: () => import('../cco-network-operations/cco-alarm-notifications/cco-alarm-notifications.module').then(m => m.CcoAlarmNotificationsModule) },
    {
      path: "settings",
      component: OperationsCloudAlarmsComponent,
      data: { title: 'Calix Cloud - Alarms' }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmsRoutingModule { }
