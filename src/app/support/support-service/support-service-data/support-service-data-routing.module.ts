import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportServiceDataComponent } from './support-service-data.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { TrafficReportComponent } from './traffic-report/traffic-report.component';

const routes: Routes = [
  {
    path: '',
    component: SupportServiceDataComponent,
    children: [
      { path: 'speed-test', component: SpeedTestComponent },
      { path: 'traffic-report', component: TrafficReportComponent },
      {
        path: '',
        redirectTo: 'speed-test',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportServiceDataRoutingModule { }
