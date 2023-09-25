import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';
import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
import { OperationsComponent } from './operations.component';
import { JobsComponent } from './configuration/migrations/jobs/jobs.component';
import { MigrationMappingComponent } from './configuration/migrations/migration-mapping/migration-mapping.component';

const routes: Routes =
  [
    { path: 'configuration/migrations/migration-mapping', component: MigrationMappingComponent },
    {
      path: '', component: OperationsComponent,
      children: [
        { path: 'system-onboarding', loadChildren: () => import('./system-onboarding/system-onboarding.module').then(m => m.SystemOnboardingModule) },
        { path: 'alarms', loadChildren: () => import('./alarms/alarms.module').then(m => m.AlarmsModule) },
        { path: 'health', loadChildren: () => import('./health/health.module').then(m => m.HealthModule) },
        { path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) },
        { path: 'cco-reports', loadChildren: () => import('./cco-reports/cco-reports.module').then(m => m.CcoReportsModule) },
        { path: 'cco-network-operations', loadChildren: () => import('./cco-network-operations/cco-network-operations.module').then(m => m.CcoNetworkOperationsModule) },
        { path: 'cco-subscriber-operations', loadChildren: () => import('./cco-subscriber-operations/cco-subscriber-operations.module').then(m => m.CcoSubscriberOperationsModule) },
        //{ path: 'cco-system-operations', loadChildren: () => import('./cco-system-operations/cco-system-operations.module').then(m => m.CcoSystemOperationsModule) },
        {
          path: '',
          redirectTo: 'cco-network-operations',
          pathMatch: 'full',
        }
      ]
    }, { path: 'software-images-form', component: SoftwareImagesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'device-groups-add', component: DevicesGroupsComponent },
    { path: 'device-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'device-groups-workflow', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },





  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
