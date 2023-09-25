import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetworkTrendsComponent } from './network-trends.component';

const routes: Routes = [{ path: '', component: NetworkTrendsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkTrendsRoutingModule { }
