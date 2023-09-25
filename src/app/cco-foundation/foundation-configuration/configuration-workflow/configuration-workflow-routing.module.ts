import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultWorkFlowComponent } from 'src/app/support/netops-management/operations/workflows/default-work-flow/default-work-flow.component';
import { WorkflowWizardComponent } from 'src/app/support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowsComponent } from 'src/app/support/netops-management/operations/workflows/workflows.component';
import { WorkflowDetailsComponent } from 'src/app/support/netops-management/workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from 'src/app/support/netops-management/workflow-status/workflow-status.component';
import { ConfigurationWorkflowComponent } from './configuration-workflow.component';


const routes: Routes = [{
  path: '', component: ConfigurationWorkflowComponent,
  children: [
    { path: 'workflows', component: WorkflowsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/official-workflow-wizard', component: DefaultWorkFlowComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/workflow-status', component: WorkflowStatusComponent},
    { path: 'workflows/workflow-details', component: WorkflowDetailsComponent},
    { path: '', redirectTo: 'workflows', pathMatch: 'full' }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationWorkflowRoutingModule { }
