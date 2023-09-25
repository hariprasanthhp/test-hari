import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentIssuesComponent } from './current-issues/current-issues.component';
import { GeographicViewComponent } from './geographic-view/geographic-view.component';

import { RealtimeComponent } from './realtime.component';

const routes: Routes = [
  {
    path: '',
    component: RealtimeComponent,
    children: [
      
      { path: 'current-issues', component: CurrentIssuesComponent, data: { title: 'Calix Cloud - ' } },
      {
        path: '',
        redirectTo: 'current-issues',
        pathMatch: 'full',
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealtimeRoutingModule { }
