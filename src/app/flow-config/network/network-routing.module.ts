import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { NetworkComponent } from './network.component';
import { RadiusServersComponent } from './radius-servers/radius-servers.component';
import { StaticSubnetsComponent } from './static-subnets/static-subnets.component';
import { SubnetsComponent } from './subnets/subnets.component';
import { CombinedSubnetsComponent } from './combined-subnets/combined-subnets.component';

const routes: Routes = [{
  path: '',
  component: NetworkComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: "devices",
      loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule)
    },
    // { path: 'devices', component: DevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    //{ path: 'subnets', component: SubnetsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'subnets', component: CombinedSubnetsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'combinedSubnets', component: CombinedSubnetsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'static_subnets', component: StaticSubnetsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'radius-servers', component: RadiusServersComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: '', redirectTo: 'devices', pathMatch: 'full', data: { title: 'Calix Cloud - Flow Configuration' }, }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
