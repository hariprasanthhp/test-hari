import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EndpointComponent } from './endpoint.component';


const routes: Routes = [{
  path: '',
  component: EndpointComponent,
  children: [
    { path: 'realtime', loadChildren: () => import('src/app/cco/traffic/endpoints/realtime/realtime.module').then(m => m.RealtimeModule) },
    { path: 'reports', loadChildren: () => import('src/app/cco/traffic/endpoints/reports/reports.module').then(m => m.ReportsModule) },
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
export class EndpointRoutingModule { }
