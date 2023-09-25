import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportDeviceComponent } from './support-device.component';

const routes: Routes = [{ path: '', component: SupportDeviceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportDeviceRoutingModule { }
