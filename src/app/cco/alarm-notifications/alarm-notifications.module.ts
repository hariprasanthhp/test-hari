import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmNotificationsRoutingModule } from './alarm-notifications-routing.module';
import { AlarmNotificationsComponent } from './alarm-notifications.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { WorkflowAlarmsComponent } from './workflow-alarms/workflow-alarms.component';
import { WorkflowConditionsComponent } from './workflow-conditions/workflow-conditions.component';
import { WorkflowScheduleComponent } from './workflow-schedule/workflow-schedule.component';
import { WorkflowSummaryComponent } from './workflow-summary/workflow-summary.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowDatatableComponent } from './shared/workflow-datatable/workflow-datatable.component';
//import { TagInputModule } from 'ngx-chips';
import { CalendarModule } from 'primeng/calendar';
import { MaskDirective } from './shared/mask-directive';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { WorkflowSharedModule } from '../workflow-shared/workflow-shared.module';
@NgModule({
  declarations: [MaskDirective, AlarmNotificationsComponent, WorkflowDetailsComponent, WorkflowAlarmsComponent, WorkflowConditionsComponent, WorkflowScheduleComponent, WorkflowSummaryComponent, WorkflowDatatableComponent],
  imports: [
    CommonModule,
    AlarmNotificationsRoutingModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    //TagInputModule,
    CalendarModule,
    shared,
    WorkflowSharedModule
  ],
  exports: [MaskDirective]
})
export class AlarmNotificationsModule { }
