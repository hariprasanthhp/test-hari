import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrafficComponent } from './traffic.component';


const routes: Routes = [{
  path: '',
  component: TrafficComponent,
  children: [
    { path: 'network', loadChildren: () => import('./network/network.module').then(m => m.NetworkModule) },
    { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
    { path: 'application', loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule) },
    { path: 'endpoint', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) },
    { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
    { path: '', redirectTo: 'network', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class TrafficRoutingModule { }
