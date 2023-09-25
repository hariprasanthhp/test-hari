import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportComponent } from './support.component';
import { HomeComponent } from "./home/home.component";
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { SearchListComponent } from './search-list/search-list.component';
import { FrameComponent } from './frame/frame.component';
import { EmptyDataComponent } from '../shared/components/dummy-component/dummy.component';
import { ProfileComponent } from './support-application/experience-iq/profile/profile.component';
import { InsightsComponent } from './insights/insights.component'
import { EncryptionComponent } from './encryption/encryption.component';
import { SearchComponent } from './search/search.component';
import { DeviceGroupDeletionComponent } from './netops-management/operations/devices-groups/device-group-deletion/device-group-deletion.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
      { path: 'insights', component: InsightsComponent },
      { path: 'home', component: HomeComponent, canDeactivate: [AuthGuard] },
      { path: 'subscriber/list', component: SubscriberListComponent },
      { path: 'subscriber/search', component: SearchListComponent },
      { path: 'dashboard', component: FrameComponent, canDeactivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'overview', loadChildren: () => import('./support-overview/support-overview.module').then(m => m.SupportOverviewModule)
      },
      { path: 'service', loadChildren: () => import('./support-service/support-service.module').then(m => m.SupportServiceModule) },
      { path: 'router', loadChildren: () => import('./support-system/support-system.module').then(m => m.SupportSystemModule) },
      { path: 'wifi', loadChildren: () => import('./support-wifi/support-wifi.module').then(m => m.SupportWifiModule) },
      { path: 'device', loadChildren: () => import('./support-device/support-device.module').then(m => m.SupportDeviceModule) },
      { path: 'application', loadChildren: () => import('./support-application/support-application.module').then(m => m.SupportApplicationModule) },
      { path: 'netops-management', loadChildren: () => import('./netops-management/netops-management.module').then(m => m.NetopsManagementModule), canDeactivate: [AuthGuard] },
      { path: 'traffic-reports', loadChildren: () => import('./support-traffic-reports/support-traffic-reports.module').then(m => m.SupportTrafficReportsModule) },
      { path: 'dummy', component: EmptyDataComponent },
      { path: 'search', component: SearchComponent },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'encryption', component: EncryptionComponent },
      { path: 'device-group-deltion', component: DeviceGroupDeletionComponent },
      { path: 'cco', loadChildren: () => import('src/app/cco/system/cco-network-system/cco-network-system.module').then(m => m.CcoNetworkSystemModule) },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
