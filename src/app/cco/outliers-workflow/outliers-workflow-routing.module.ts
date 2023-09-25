import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutliersWorkflowWizwardComponent } from './outliers-workflow-wizward/outliers-workflow-wizward.component';
import { OutliersWorkflowComponent } from './outliers-workflow.component';

const routes: Routes = [
  {
    path: '', component: OutliersWorkflowComponent,
    children: [
      { path: 'add', component: OutliersWorkflowWizwardComponent },
      { path: 'edit/:id', component: OutliersWorkflowWizwardComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutliersWorkflowRoutingModule { }
