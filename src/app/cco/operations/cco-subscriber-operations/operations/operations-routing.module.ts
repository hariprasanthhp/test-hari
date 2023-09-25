import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationFilesFormComponent } from 'src/app/support/netops-management/operations/configuration-files-form/configuration-files-form.component';
import { ConfigurationFilesListComponent } from 'src/app/support/netops-management/operations/configuration-files-list/configuration-files-list.component';
import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';
import { PerformanceTestingComponent } from 'src/app/support/netops-management/operations/performance-testing/performance-testing.component';
import { ProfileWizardComponent } from 'src/app/support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';
import { ProfilesComponent } from 'src/app/support/netops-management/operations/profiles/profiles.component';
import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
import { SoftwareImagesListComponent } from 'src/app/support/netops-management/operations/software-images-list/software-images-list.component';
import { WorkflowAlarmWizardComponent } from 'src/app/support/netops-management/operations/workflows/alarm-workflow-wizard/alarm-workflow-wizard.component';
import { DefaultWorkFlowComponent } from 'src/app/support/netops-management/operations/workflows/default-work-flow/default-work-flow.component';
import { WorkflowWizardComponent } from 'src/app/support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowsComponent } from 'src/app/support/netops-management/operations/workflows/workflows.component';
import { WorkflowDetailsComponent } from 'src/app/support/netops-management/workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from 'src/app/support/netops-management/workflow-status/workflow-status.component';
import { AddComponent } from '../cco-subscriber-profile/add/add.component';
import { CcoSubscriberProfileComponent } from '../cco-subscriber-profile/cco-subscriber-profile.component';
import { OperationsComponent } from './operations.component';




const routes: Routes = [{
  path: '',
  component: OperationsComponent,
  children: [
    { path: 'devices-groups', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles', component: ProfilesComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'software-images-list', component: SoftwareImagesListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows', component: WorkflowsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/workflow-alarm-wizard', component: WorkflowAlarmWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/official-workflow-wizard', component: DefaultWorkFlowComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'performance-testing', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'performance-testing/:id', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'configuration-files-list', component: ConfigurationFilesListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'configuration-files-form', component: ConfigurationFilesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'workflows/workflow-status',
      component: WorkflowStatusComponent
    },
    {
      path: 'workflows/workflow-details',
      component: WorkflowDetailsComponent
    },
    {
      path: '',
      redirectTo: 'devices-groups',
      pathMatch: 'full',
    },
    {
      path: 'ONT-profile',
      component: CcoSubscriberProfileComponent
    },
    { path: 'ONT-profile/add', component: AddComponent },
    // { path: 'ONT-profile/edit/:id/:type', component: AddComponent },
    { path: 'ONT-profile/edit', component: AddComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OperationsRoutingModule { }
