import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowSummaryComponent } from '../../../alarm-notifications/workflow-summary/workflow-summary.component';
import { OutgeWrkflwSummaryComponent } from '../../../outage-workflow/outge-wrkflw-summary/outge-wrkflw-summary.component';
import { SummaryComponent } from '../../../outliers-workflow/outliers-workflow-wizward/summary/summary.component';
import { CcoAlarmNotificationsComponent } from './cco-alarm-notifications.component';
import { RecipientsComponent } from './recipients/recipients.component';

const routes: Routes = [
  {
    path: '',
    component: CcoAlarmNotificationsComponent,
    // children: [

    // ]
  },
  {
    path: 'recipients',
    component: RecipientsComponent,
  },
  {
    path: 'alarm-notifications/view/:notificationId',
    component: WorkflowSummaryComponent,
  },
  {
    path: 'outage-workflow/view/:notificationId',
    component: OutgeWrkflwSummaryComponent,
  },
  {
    path: 'workflow/view/:notificationId',
    component: SummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcoAlarmNotificationsRoutingModule { }
