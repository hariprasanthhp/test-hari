import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationWorkflowComponent } from './configuration-workflow.component';
import { ConfigurationWorkflowRoutingModule } from './configuration-workflow-routing.module';
// import { WorkflowsPocComponent } from '../workflows-poc/workflows-poc.component';



@NgModule({
  declarations: [ConfigurationWorkflowComponent],
  imports: [
    CommonModule,
    ConfigurationWorkflowRoutingModule
  ]
})
export class ConfigurationWorkflowModule { }
