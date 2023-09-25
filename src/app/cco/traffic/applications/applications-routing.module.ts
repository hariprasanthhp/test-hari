import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsComponent } from './applications.component';


const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
      // { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'reports', loadChildren: () => import('./application-reports/application-reports.module').then(m => m.ApplicationReportsModule) },
      {
        path: '',
        redirectTo: 'realtime',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
