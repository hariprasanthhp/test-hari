import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemServiceTrendsComponent } from './system-service-trends.component';

const routes: Routes = [{ path: '', component: SystemServiceTrendsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemServiceTrendsRoutingModule { }
