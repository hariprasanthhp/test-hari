import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { UsageComponent } from './usage/usage.component';
import { RateComponent } from './rate/rate.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TopAppTrafficComponent } from './top-app-traffic/top-app-traffic.component';
import { TopEndPointsComponent } from './top-end-points/top-end-points.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: 'usage', component: UsageComponent },
      { path: 'rate', component: RateComponent },
      { path: 'monthly-usage', component: MonthlyUsageComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'top-application-traffic', component: TopAppTrafficComponent },
      { path: 'top-end-points', component: TopEndPointsComponent },
      {
        path: '',
        redirectTo: 'usage',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
