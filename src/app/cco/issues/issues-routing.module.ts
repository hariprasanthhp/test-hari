import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuesComponent } from './issues.component';

const routes: Routes = [{
  path: '', component: IssuesComponent,
  children: [
    { path: 'device/realtime/current-issues', redirectTo: '/cco/alerts/system/realtime/current-issues', pathMatch: 'full' },
    { path: 'device/active-reports', redirectTo: '/cco/alerts/system/active-reports', pathMatch: 'full' },
    { path: 'device/history-reports', redirectTo: '/cco/alerts/system/history-reports', pathMatch: 'full' },
    { path: 'cloud-health/realtime/current-issues', redirectTo: '/cco/alerts/health/realtime/current-issues', pathMatch: 'full' },
    { path: 'connectivity/realtime/current-issues', redirectTo: '/cco/alerts/connectivity/realtime/current-issues', pathMatch: 'full' },
    { path: '', redirectTo: 'device/realtime/current-issues', pathMatch: 'full' },

  ],

}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
