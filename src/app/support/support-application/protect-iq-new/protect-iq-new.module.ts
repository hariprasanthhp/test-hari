import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectIqNewRoutingModule } from './protect-iq-new-routing.module';
import { ProtectIqDetailsComponent } from './protect-iq-details/protect-iq-details.component';
import { ProtectIqAlertsComponent } from './protect-iq-alerts/protect-iq-alerts.component';
import { ProtectIqTrustedListComponent } from './protect-iq-trusted-list/protect-iq-trusted-list.component';
import { ProtectIqSkippedDevicesComponent } from './protect-iq-skipped-devices/protect-iq-skipped-devices.component';
import { ProtectIqSecuritySettingsComponent } from './protect-iq-security-settings/protect-iq-security-settings.component';
import { SupportApplicationModule } from '../support-application.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProtectIqDetailsComponent,
    ProtectIqAlertsComponent,
    ProtectIqTrustedListComponent,
    ProtectIqSkippedDevicesComponent,
    ProtectIqSecuritySettingsComponent,
  ],
  imports: [
    CommonModule,
    ProtectIqNewRoutingModule,
    SupportApplicationModule,
    SharedModule,
    NgSelectModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProtectIqNewModule { }
