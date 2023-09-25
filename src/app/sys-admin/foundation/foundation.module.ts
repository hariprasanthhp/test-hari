import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundationRoutingModule } from './foundation-routing.module';
import { SystemDeleteSettingsComponent } from './system-delete-settings/system-delete-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkIqConfigurationComponent } from './bulk-iq-configuration/bulk-iq-configuration.component';


@NgModule({
  declarations: [SystemDeleteSettingsComponent, BulkIqConfigurationComponent],
  imports: [
    CommonModule,
    FoundationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoundationModule { }
