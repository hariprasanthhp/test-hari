import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveDevicesGeomapComponent } from './active-devices-geomap.component';

const routes: Routes = [{ path: '', component: ActiveDevicesGeomapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveDevicesGeomapRoutingModule { }
