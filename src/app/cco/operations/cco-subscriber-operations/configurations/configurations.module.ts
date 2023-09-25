import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationsRoutingModule } from './configurations-routing.module';



@NgModule({
  declarations: [ConfigurationsComponent],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule
  ]
})
export class ConfigurationsModule { }
