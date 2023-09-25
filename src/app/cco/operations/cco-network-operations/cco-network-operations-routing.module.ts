import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoNetworkOperationsComponent } from './cco-network-operations.component';

import { SubnetConfigComponent } from './../../../support/netops-management/configuration/subnet-config/subnet-config.component';
import { ConfigurationFilesListComponent } from './../../../support/netops-management/operations/configuration-files-list/configuration-files-list.component';
import { WorkflowsComponent } from './../../../support/netops-management/operations/workflows/workflows.component';
import { ConfigurationFilesFormComponent } from './../../../support/netops-management/operations/configuration-files-form/configuration-files-form.component';
import { WorkflowWizardComponent } from './../../../support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowDetailsComponent } from './../../../support/netops-management/workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from './../../../support/netops-management/workflow-status/workflow-status.component';
import { SecureOnboardingComponent } from './../../../support/netops-management/configuration/secure-onboarding/secure-onboarding.component';
import { SelfHealComponent } from './../../../support/netops-management/configuration/self-heal/self-heal.component';
import { StaleDevicePurgeComponent } from './../../../support/netops-management/configuration/stale-device-purge/stale-device-purge.component';
import { CcoNetworkWorkflowsComponent } from './cco-network-workflows/cco-network-workflows.component';
import { CcoNetworkPolicesComponent } from './cco-network-polices/cco-network-polices.component';
import { AlarmGroupsComponent } from './cco-alarm-groups/alarm-groups/alarm-groups.component';
import { CcoAlarmRulesComponent } from './cco-alarm-rules/cco-alarm-rules.component';
import { OrgAdminComponent } from 'src/app/org-admin/org-admin.component';
// import { CcoAlarmNotificationsComponent } from './cco-alarm-notifications/cco-alarm-notifications.component';
import { CcoAlarmGroupsComponent } from './cco-alarm-groups/cco-alarm-groups.component';
import { WorkflowSummaryComponent } from '../../alarm-notifications/workflow-summary/workflow-summary.component';
import { OutgeWrkflwSummaryComponent } from '../../outage-workflow/outge-wrkflw-summary/outge-wrkflw-summary.component';
import { SummaryComponent } from '../../outliers-workflow/outliers-workflow-wizward/summary/summary.component';

const routes: Routes = [{
  path: '', component: CcoNetworkOperationsComponent, children: [

    // { path: 'secure-onboard', component: SecureOnboardingComponent },
    // { path: 'self-heal', component: SelfHealComponent },
    // { path: 'stale-device', component: StaleDevicePurgeComponent },
    // { path: 'configuration-files', component: ConfigurationFilesListComponent },
    // { path: 'configuration-files/configuration-files-form', component: ConfigurationFilesFormComponent },
    { path: 'cco-network-polices', loadChildren: () => import('./cco-network-polices/cco-network-polices.module').then(m => m.CcoNetworkPolicesModule) },
    // { path: 'cco-alarm-notifications', component: CcoAlarmNotificationsComponent },

    { path: 'workflows', loadChildren: () => import('./cco-network-workflows/cco-network-workflows.module').then(m => m.CcoNetworkWorkflowsModule) },
    { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'workflows/workflow-status',
      component: WorkflowStatusComponent
    },
    {
      path: 'workflows/workflow-details',
      component: WorkflowDetailsComponent
    },
    {
      path: '',
      redirectTo: 'cco-alarm-rules',
      pathMatch: 'full',
    },
    { path: 'org-admin', component: OrgAdminComponent },
    { path: 'cco-alarm-rules', component: CcoAlarmRulesComponent },
    { path: 'cco-alarm-groups/new', component: AlarmGroupsComponent },
    { path: 'cco-alarm-groups', component: CcoAlarmGroupsComponent },
    { path: 'cco-alarm-groups/edit/:alarmGroupId/:wfLinkedFlag', component: AlarmGroupsComponent },
    { path: 'cco-alarm-notifications/view/:notificationId', component: WorkflowSummaryComponent },
    { path: 'outage-workflow/view/:notificationId', component: OutgeWrkflwSummaryComponent },
    { path: 'outliers-workflow/view/:notificationId', component: SummaryComponent },
  ]
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoNetworkOperationsRoutingModule { }
