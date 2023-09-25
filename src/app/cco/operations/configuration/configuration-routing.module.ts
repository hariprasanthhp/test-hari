import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationFilesFormComponent } from 'src/app/support/netops-management/operations/configuration-files-form/configuration-files-form.component';
import { ConfigurationFilesListComponent } from 'src/app/support/netops-management/operations/configuration-files-list/configuration-files-list.component';
import { PerformanceTestingComponent } from 'src/app/support/netops-management/operations/performance-testing/performance-testing.component';

import { SoftwareImagesListComponent } from 'src/app/support/netops-management/operations/software-images-list/software-images-list.component';
import { WorkflowAlarmWizardComponent } from 'src/app/support/netops-management/operations/workflows/alarm-workflow-wizard/alarm-workflow-wizard.component';
import { DefaultWorkFlowComponent } from 'src/app/support/netops-management/operations/workflows/default-work-flow/default-work-flow.component';
import { WorkflowWizardComponent } from 'src/app/support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowsComponent } from 'src/app/support/netops-management/operations/workflows/workflows.component';
import { WorkflowDetailsComponent } from 'src/app/support/netops-management/workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from 'src/app/support/netops-management/workflow-status/workflow-status.component';
import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';
import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
import { JobsComponent } from './migrations/jobs/jobs.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'workflows',
        component: WorkflowsComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'workflows/workflow-wizard',
        component: WorkflowWizardComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'workflows/workflow-alarm-wizard',
        component: WorkflowAlarmWizardComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'workflows/official-workflow-wizard',
        component: DefaultWorkFlowComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'performance-testing',
        component: PerformanceTestingComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'performance-testing/:id',
        component: PerformanceTestingComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'configuration-files-list',
        component: ConfigurationFilesListComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'configuration-files-form',
        component: ConfigurationFilesFormComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      { path: 'workflows/workflow-status', component: WorkflowStatusComponent },
      {
        path: 'workflows/workflow-details',
        component: WorkflowDetailsComponent,
      },
      {
        path: 'system-groups',
        component: DevicesGroupsComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'system-groups/add',
        component: DevicesGroupsComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'system-groups/:id',
        component: DevicesGroupsComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'devices-group/workflow',
        component: DevicesGroupsComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'software/software-images-list',
        component: SoftwareImagesListComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      {
        path: 'software/software-images-form',
        component: SoftwareImagesFormComponent,
        data: { title: 'Calix Cloud - Flow Configuration' },
      },
      
      {
        path: 'migrations',
        loadChildren: () =>
          import('./migrations/migrations.module').then(
            (m) => m.MigrationsModule
          ),
      },
      { path: '', redirectTo: 'workflows', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
