import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyDataComponent } from '../shared/components/dummy-component/dummy.component';
import { RgComponent } from '../support/support-wifi/rg/rg.component';
import { CcoSystemSearchComponent } from './cco-system-search/cco-system-search.component';

import { CcoComponent } from './cco.component';
import { NetworkTopologyComponent } from './network-topology/network-topology.component';
import { RecordViewComponent } from './traffic/record-view/record-view.component';
import { RecordListComponent } from './traffic/record-list/record-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/services/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: CcoComponent,

    children: [

      { path: 'home', loadChildren: () => import('./cco-home/cco-home.module').then(m => m.CcoHomeModule) },
      { path: 'issues', loadChildren: () => import('./issues/issues.module').then(m => m.IssuesModule) },
      { path: 'health', loadChildren: () => import('./health/health.module').then(m => m.HealthModule) },
      { path: 'traffic', loadChildren: () => import('./traffic/traffic.module').then(m => m.TrafficModule) },
      { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
      { path: 'operations', loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule) },
      { path: 'alarm-notifications/new', loadChildren: () => import('./alarm-notifications/alarm-notifications.module').then(m => m.AlarmNotificationsModule) },
      { path: 'alarm-notifications/edit/:workflowId', loadChildren: () => import('./alarm-notifications/alarm-notifications.module').then(m => m.AlarmNotificationsModule) },
      // { path: 'new-traffic-workflow', loadChildren: () => import('./new-traffic-workflow/new-traffic-workflow.module').then(m => m.NewTrafficWorkflowModule) },
      { path: 'network-topology', component: NetworkTopologyComponent },
      { path: 'search-system-list', component: CcoSystemSearchComponent },
      {
        path: 'overview', loadChildren: () => import('../support/support-overview/support-overview.module').then(m => m.SupportOverviewModule)
      },
      { path: 'service', loadChildren: () => import('../support/support-service/support-service.module').then(m => m.SupportServiceModule) },
      { path: 'router', loadChildren: () => import('../support/support-system/support-system.module').then(m => m.SupportSystemModule) },
      { path: 'wifi', loadChildren: () => import('../support/support-wifi/support-wifi.module').then(m => m.SupportWifiModule) },
      //{ path: 'wifi', loadChildren: () => import('./cco-wifi/cco-wifi.module').then(m => m.CcoWifiModule) },
      { path: 'device', loadChildren: () => import('../support/support-device/support-device.module').then(m => m.SupportDeviceModule) },
      { path: 'application', loadChildren: () => import('../support/support-application/support-application.module').then(m => m.SupportApplicationModule) },
      { path: 'netops-management', loadChildren: () => import('../support/netops-management/netops-management.module').then(m => m.NetopsManagementModule) },
      { path: 'traffic-reports', loadChildren: () => import('../support/support-traffic-reports/support-traffic-reports.module').then(m => m.SupportTrafficReportsModule) },
      { path: 'dummy', component: EmptyDataComponent },
      { path: 'rg/:fsan', component: RgComponent },
      { path: 'record', component: RecordViewComponent },
      { path: 'record/list', component: RecordListComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'outliers-workflow', loadChildren: () => import('./outliers-workflow/outliers-workflow.module').then(m => m.OutliersWorkflowModule) },
      { path: 'outage-workflow', loadChildren: () => import('./outage-workflow/outage-workflow.module').then(m => m.OutageWorkflowModule) },
      { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
      { path: 'notifications/health/:type', loadChildren: () => import('./outliers-workflow/outliers-workflow.module').then(m => m.OutliersWorkflowModule) },
      { path: 'alerts/:type', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcoRoutingModule { }
