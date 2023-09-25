import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BandwidthTierTemplatesComponent } from './bandwidth-tier-templates.component';
import { AddComponent } from './bandwidth-tiers/add/add.component';
import { BandwidthTiersComponent } from './bandwidth-tiers/bandwidth-tiers.component';

const routes: Routes = [{
  path: '',
  component: BandwidthTierTemplatesComponent,
  children: [
    { path: 'list', component: BandwidthTiersComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit/:name', component: AddComponent },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandwidthTierTemplatesRoutingModule { }
