import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: LocationComponent,
  children: [
    { path: 'realtime', loadChildren: () => import('src/app/cco/traffic/locations/realtime/realtime.module').then(m => m.RealtimeModule) },
    { path: 'reports', loadChildren: () => import('src/app/cco/traffic/locations/location-reports/location-reports.module').then(m => m.LocationReportsModule) },
    {
      path: '',
      redirectTo: 'realtime',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})


export class LocationRoutingModule { }
