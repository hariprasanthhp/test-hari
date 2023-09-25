import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceIqComponent } from './experience-iq.component';
import { ProfileComponent } from './profile/profile.component';
import { DevicesComponent } from './devices/devices.component';
import { FiltersComponent } from './filters/filters.component';
import { NotificationComponent } from './notification/notification.component';
import { TimeLimitComponent } from './time-limit/time-limit.component';
import { UsageComponent } from './usage/usage.component';
import { ProfileDetailDeviceComponent } from './profile-detail-device/profile-detail-device.component';

const routes: Routes = [
  {
    path: '',
    component: ExperienceIqComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'devices', component: DevicesComponent, data: { title: 'Calix Suppport Cloud - extender' }
      },
      {
        path: 'filters', component: FiltersComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'notification', component: NotificationComponent, data: { title: 'Calix Suppport Cloud - extender' }
      },
      {
        path: 'timelimit', component: TimeLimitComponent, data: { title: 'Calix Suppport Cloud - rg' }
      },
      {
        path: 'usage', component: UsageComponent, data: { title: 'Calix Suppport Cloud - extender' }
      },
      {
        path: 'profile-detail', component: ProfileDetailDeviceComponent, data: { title: 'Calix Suppport Cloud - extender' }
      }
      // {
      //   path: '',
      //   redirectTo: 'profile',
      //   pathMatch: 'full',
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceIqRoutingModule { }
