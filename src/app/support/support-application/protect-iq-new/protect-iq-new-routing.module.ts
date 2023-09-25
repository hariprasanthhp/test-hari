import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectIqNewComponent } from './protect-iq-new.component';
import { ProtectIqDetailsComponent } from './protect-iq-details/protect-iq-details.component';
import { ProtectIqAlertsComponent } from './protect-iq-alerts/protect-iq-alerts.component';
import { ProtectIqTrustedListComponent } from './protect-iq-trusted-list/protect-iq-trusted-list.component';
import { ProtectIqSkippedDevicesComponent } from './protect-iq-skipped-devices/protect-iq-skipped-devices.component';
import { ProtectIqSecuritySettingsComponent } from './protect-iq-security-settings/protect-iq-security-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProtectIqNewComponent,
    children: [
      {
        path: '',
        redirectTo: 'details',
      },
      {
        path: 'details',
        component: ProtectIqDetailsComponent,
      },
      {
        path: 'alerts',
        component: ProtectIqAlertsComponent,
      },
      {
        path: 'trusted-list',
        component: ProtectIqTrustedListComponent,
      },
      {
        path: 'skipped-devices',
        component: ProtectIqSkippedDevicesComponent,
      },
      {
        path: 'security-settings',
        component: ProtectIqSecuritySettingsComponent,
      },
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectIqNewRoutingModule { }
