import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordListComponent } from 'src/app/cco/traffic/record-list/record-list.component';
import { RecordViewComponent } from 'src/app/cco/traffic/record-view/record-view.component';
import { FlowConfigComponent } from '../../flow-config/flow-config.component';
import { LocationsComponent } from '../../flow-config/locations/locations.component'

const routes: Routes = [
  {
    path: '',
    component: FlowConfigComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "network",
        loadChildren:
          () => import('./../../flow-config/network/network.module').then(m => m.NetworkModule)
      },
      {
        path: "locations",
        component: LocationsComponent,
      },
      {
        path: "applications",
        loadChildren:
          () => import('./../../flow-config/applications/applications.module').then(m => m.ApplicationsModule)
      },
      {
        path: "endpoint",
        loadChildren:
          () => import('./../../flow-config/endpoint/endpoint.module').then(m => m.EndpointModule)
      },
      {
        path: "configurations",
        loadChildren:
          () => import('./../../flow-config/configuration/configuration.module').then(m => m.ConfigurationModule)
      },
      {
        path: "traffic",
        loadChildren:
          () => import('./../../flow-config/traffic/traffic.module').then(m => m.FlowconfigTrafficModule)
      },
      { path: 'recording/list', component: RecordListComponent},
      { path: 'record-view', component: RecordViewComponent},
      {
        path: '',
        redirectTo: 'network',
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowConfigurationRoutingModule { }
