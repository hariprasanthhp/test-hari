import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowsComponent } from './workflows.component';

const routes: Routes =
[{ path: '', component: WorkflowsComponent ,children: [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full',
  },
{ path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
 { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
 { path: 'workflows-list', loadChildren: () => import('./workflows-list/workflows-list.module').then(m => m.WorkflowsListModule) }]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
