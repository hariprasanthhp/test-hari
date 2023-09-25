import { ConfigurationFilesListComponent } from './configuration-files-list/configuration-files-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { DevicesGroupsComponent } from './devices-groups/devices-groups.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SoftwareImagesListComponent } from './software-images-list/software-images-list.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { PerformanceTestingComponent } from './performance-testing/performance-testing.component';
import { WorkflowWizardComponent } from './workflows/workflow-wizard/workflow-wizard.component';
import { ProfileWizardComponent } from './profiles/profile-wizard/profile-wizard.component';
import { ConfigurationFilesFormComponent } from './configuration-files-form/configuration-files-form.component';
import { SoftwareImagesFormComponent } from './software-images-form/software-images-form.component';
import { WorkflowStatusComponent } from '../workflow-status/workflow-status.component';
import { WorkflowDetailsComponent } from '../workflow-details/workflow-details.component';
import { DummyComponent } from './dummy/dummy.component';


const routes: Routes = [{
  path: '',
  component: OperationsComponent,
  children: [
    { path: 'devices-groups', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'devices-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles', component: ProfilesComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'software-images-list', component: SoftwareImagesListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows', component: WorkflowsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'performance-testing', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'performance-testing/:id', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'configuration-files-list', component: ConfigurationFilesListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'configuration-files-form', component: ConfigurationFilesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'dummy', component: DummyComponent },
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
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
