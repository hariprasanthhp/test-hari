import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrchestrationRoutingModule } from './orchestration-routing.module';
import { OrchestrationComponent } from './orchestration.component';


@NgModule({
  declarations: [
    OrchestrationComponent
  ],
  imports: [
    CommonModule,
    OrchestrationRoutingModule
  ]
})
export class OrchestrationModule { }
