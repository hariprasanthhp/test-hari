import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndpointsComponent } from './endpoints.component';


const routes: Routes = [
  {
    path: '',
    component: EndpointsComponent,
    children: [
      { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
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
export class EndpointsRoutingModule { }
