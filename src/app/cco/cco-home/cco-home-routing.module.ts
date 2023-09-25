import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CcoHomeComponent } from './cco-home.component';

const routes: Routes = [{
  path: '', component: CcoHomeComponent,
  children: [
    { path: 'network-trends', loadChildren: () => import('./network-trends/network-trends.module').then(m => m.NetworkTrendsModule) },
    //{ path: 'subscriber-trends', loadChildren: () => import('./subscriber-trends/subscriber-trends.module').then(m => m.SubscriberTrendsModule) },
    { path: 'system-service-trends', loadChildren: () => import('./system-service-trends/system-service-trends.module').then(m => m.SystemServiceTrendsModule) },
    { path: 'active-systems-geomap', loadChildren: () => import('./active-devices-geomap/active-devices-geomap.module').then(m => m.ActiveDevicesGeomapModule) },
    { path: 'operations', loadChildren: () => import('../operations/operations.module').then(m => m.OperationsModule) },
    { path: '', redirectTo: 'network-trends', pathMatch: 'full' }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcoHomeRoutingModule { }
