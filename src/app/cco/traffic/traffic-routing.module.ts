import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrafficComponent } from './traffic.component';

const routes: Routes = [{
  path: '', component: TrafficComponent,
  children: [

    { path: 'network', loadChildren: () => import('./network/network.module').then(m => m.NetworkModule) },
    { path: 'locations', loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule) },
    { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule) },
    { path: 'endpoints', loadChildren: () => import('./endpoints/endpoints.module').then(m => m.EndpointsModule) },
    { path: '', redirectTo: 'network', pathMatch: 'full' }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficRoutingModule { }
