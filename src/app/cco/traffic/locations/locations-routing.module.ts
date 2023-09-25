import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations.component';


const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
      // { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'reports', loadChildren: () => import('./location-reports/location-reports.module').then(m => m.LocationReportsModule) },
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
export class LocationsRoutingModule { }
