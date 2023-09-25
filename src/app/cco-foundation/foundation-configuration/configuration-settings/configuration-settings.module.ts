import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationSettingComponent } from './configuration-setting.component';
import { ConfigurationSettingRoutingModule } from './configuration-setting-routing.module';



@NgModule({
  declarations: [ConfigurationSettingComponent],
  imports: [
    CommonModule,
    ConfigurationSettingRoutingModule
  ]
})
export class ConfigurationSettingsModule { }
