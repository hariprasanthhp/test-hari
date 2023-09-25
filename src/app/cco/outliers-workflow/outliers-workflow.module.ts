import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutliersWorkflowRoutingModule } from './outliers-workflow-routing.module';
import { OutliersWorkflowComponent } from './outliers-workflow.component';
import { OutliersWorkflowWizwardComponent } from './outliers-workflow-wizward/outliers-workflow-wizward.component';
import { SystemComponent } from './outliers-workflow-wizward/system/system.component';
import { SummaryComponent } from './outliers-workflow-wizward/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { WorkflowSharedModule } from '../workflow-shared/workflow-shared.module';


@NgModule({
  declarations: [
    OutliersWorkflowComponent,
    OutliersWorkflowWizwardComponent,
    SystemComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    OutliersWorkflowRoutingModule,
    WorkflowSharedModule
  ]
})
export class OutliersWorkflowModule { }
