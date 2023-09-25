import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndpointComponent } from './endpoint.component';
import { ManagementComponent } from './management/management.component';
import { MappingSourceComponent } from './mapping-source/mapping-source.component';
import { SettingsComponent } from './settings/settings.component';
import { SubnetComponent } from './subnet/subnet.component';

const routes: Routes = [{
  path: '',
  component: EndpointComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: 'management', component: ManagementComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'mapping_source', component: MappingSourceComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'settings', component: SettingsComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'subnets', component: SubnetComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    { path: '', redirectTo: 'mapping_source', pathMatch: 'full', }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointRoutingModule { }
