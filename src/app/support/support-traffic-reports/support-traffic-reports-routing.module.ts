import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportTrafficReportsComponent } from './support-traffic-reports.component';
import { RealtimeComponent } from "./realtime/realtime.component";
import { BarchartComponent } from "./barchart/barchart.component";
import { StreamPathChartComponent } from "./stream-path-chart/stream-path-chart.component";
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SupportTrafficReportsComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'realtime', component: RealtimeComponent },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'common-reports', loadChildren: () => import('./common-reports/common-reports.module').then(m => m.CommonReportsModule) },
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
export class SupportTrafficReportsRoutingModule { }
