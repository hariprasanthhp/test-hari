import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowConfigurationRoutingModule } from './flow-configuration-routing.module';
import { FlowConfigurationComponent } from './flow-configuration.component';


@NgModule({
  declarations: [FlowConfigurationComponent],
  imports: [
    CommonModule,
    FlowConfigurationRoutingModule
  ]
})
export class FlowConfigurationModule { }
