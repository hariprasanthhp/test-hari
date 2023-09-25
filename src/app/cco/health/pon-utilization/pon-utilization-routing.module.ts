import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PonUtilizationComponent } from './pon-utilization.component';
import { PonKpiComponent } from './pon-kpi/pon-kpi.component';
import { PonFsanComponent } from './pon-fsan/pon-fsan.component';

// const routes: Routes = [{ path: '', component: PonUtilizationComponent },
// { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
// { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) }];

const routes: Routes = [{
  path: '', component: PonUtilizationComponent,
  children: [
    {
      path: '',
      redirectTo: 'realtime',
      pathMatch: 'full',
    },
    { path: 'realtime', loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule) },
    { path: 'overview/basic', loadChildren:() => import('./reports/reports.module').then(m=> m.ReportsModule)},
    { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) },
    { path: 'ONT', component:PonKpiComponent },
    { path:'TopOnt',component:PonFsanComponent}
  ]
}]                      


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PonUtilizationRoutingModule { }
