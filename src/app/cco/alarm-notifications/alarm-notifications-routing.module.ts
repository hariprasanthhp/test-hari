import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmNotificationsComponent } from './alarm-notifications.component';

const routes: Routes = [{ path: '', component: AlarmNotificationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmNotificationsRoutingModule { }
