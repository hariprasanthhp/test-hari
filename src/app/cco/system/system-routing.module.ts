import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { SubscribersImpactComponent } from './subscribers-impact/subscribers-impact.component';

import { SystemComponent } from './system.component';



const routes: Routes = [{
  path: '', component: SystemComponent,
  children: [

    { path: 'cco-network-system', loadChildren: () => import('./cco-network-system/cco-network-system.module').then(m => m.CcoNetworkSystemModule), canActivate: [AuthGuard] },
    { path: 'cco-subscriber-system', loadChildren: () => import('./cco-subscriber-system/cco-subscriber-system.module').then(m => m.CcoSubscriberSystemModule), canActivate: [AuthGuard] },
    { path: '', redirectTo: 'cco-network-system', pathMatch: 'full' },
    { path: 'subscribers-impact', component: SubscribersImpactComponent }
    // { path: '', redirectTo: 'cco-network-system', pathMatch: 'full' }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
