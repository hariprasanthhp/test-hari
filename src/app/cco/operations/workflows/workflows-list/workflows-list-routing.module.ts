import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowsListComponent } from './workflows-list.component';

const routes: Routes = [{ path: '', component: WorkflowsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsListRoutingModule { }
