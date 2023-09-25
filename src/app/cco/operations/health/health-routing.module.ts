import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './health.component';
import { CcoHealthThresholdComponent } from 'src/app/sys-admin/cco-admin/cco-health-threshold/cco-health-threshold.component';

const routes: Routes = [{
  path: '', component: HealthComponent,
  children: [{
    path: "monitoring-thresholds",
    component: CcoHealthThresholdComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
