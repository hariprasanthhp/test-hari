import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CcoAlarmNotificationsRoutingModule } from './cco-alarm-notifications-routing.module';
import { CcoAlarmNotificationsComponent } from './cco-alarm-notifications.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { RecipientsComponent } from './recipients/recipients.component';
@NgModule({
  declarations: [
    CcoAlarmNotificationsComponent,
    RecipientsComponent
  ],
  imports: [
    CommonModule,
    CcoAlarmNotificationsRoutingModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class CcoAlarmNotificationsModule { }
