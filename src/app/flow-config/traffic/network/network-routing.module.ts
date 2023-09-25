import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NetworkComponent } from './network.component';

const routes: Routes = [{
  path: '',
  component: NetworkComponent,
  children: [
    { path: 'realtime', loadChildren: () => import('src/app/cco/traffic/network/realtime/realtime.module').then(m => m.RealtimeModule) },
    { path: 'reports', loadChildren: () => import('src/app/cco/traffic/network/network-reports/network-reports.module').then(m => m.NetworkReportsModule) },
    {
      path: '',
      redirectTo: 'realtime',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
