import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutageWorkflowRoutingModule } from './outage-workflow-routing.module';
import { OutageWorkflowComponent } from './outage-workflow.component';
import { OutgeWrkflwNotificationTriggerComponent } from './outge-wrkflw-notification-trigger/outge-wrkflw-notification-trigger.component';
import { OutgeWrkflwSummaryComponent } from './outge-wrkflw-summary/outge-wrkflw-summary.component';
import { OutgeWrkflwMainComponent } from './outge-wrkflw-main/outge-wrkflw-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { WorkflowSharedModule } from '../workflow-shared/workflow-shared.module';



@NgModule({
  declarations: [OutageWorkflowComponent, OutgeWrkflwNotificationTriggerComponent, OutgeWrkflwSummaryComponent, OutgeWrkflwMainComponent],
  imports: [
    CommonModule,
    OutageWorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CalendarModule,
    shared,
    WorkflowSharedModule
  ]
})
export class OutageWorkflowModule { }
