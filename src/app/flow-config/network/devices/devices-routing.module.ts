import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices.component';
import { DevicesStatusComponent } from './devices-status/devices-status.component';
import { DevicesConfigurationComponent } from './devices-configuration/devices-configuration.component';

const routes: Routes = [{
  path: '',
  component: DevicesComponent,
  children: [
    { path: 'devices-status', component: DevicesStatusComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'devices-configuration', component: DevicesConfigurationComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: '', redirectTo: 'devices-configuration', pathMatch: 'full', data: { title: 'Calix Cloud - Flow Configuration' }, }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
