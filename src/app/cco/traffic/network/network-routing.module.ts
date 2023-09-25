import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetworkComponent } from './network.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkComponent,
    children: [
      { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
      // { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'reports', loadChildren: () => import('./network-reports/network-reports.module').then(m => m.NetworkReportsModule) },
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
export class NetworkRoutingModule { }
