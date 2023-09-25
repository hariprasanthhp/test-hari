import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetopsManagementComponent } from './netops-management.component';
import { DevicesGroupsComponent } from './operations/devices-groups/devices-groups.component';
import { SoftwareImagesFormComponent } from './operations/software-images-form/software-images-form.component';
/* Start of component import */
import { SubscriberManagementComponent } from './subscriber-management/subscriber-management.component';
import { SubscriberWizardComponent } from './subscriber-management/subscriber-wizard/subscriber-wizard.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from './workflow-status/workflow-status.component';
/* End of component import */

const routes: Routes = [
  {
    path: '',
    component: NetopsManagementComponent,
    children: [
      {
        path: 'subscriber-management',
        component: SubscriberManagementComponent
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'operations',
        loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)
      },

      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
      },


      // {
      //   path: 'workflow-status',
      //   component : WorkflowStatusComponent
      // },
      // {
      //   path: 'workflow-details',
      //   component : WorkflowDetailsComponent
      // },
      {
        path: 'subscriber-wizard',
        component: SubscriberWizardComponent
      },
      {
        path: '',
        redirectTo: 'subscriber-management',
        pathMatch: 'full',
      },
      {
        path: 'subscriber-management/manage',
        component: SubscriberManagementComponent
      }
    ]
    /* children: [
      {
        path: 'configuration-files', component: ConfigurationFilesComponent, data: { title: 'Calix Suppport Cloud - Netops management - configuration-files' }
      },
      {
        path: 'configuration-files-upload', component: ConfigurationFilesUploadComponent, data: { title: 'Calix Suppport Cloud - Netops management - configuration-files-upload' }
      },
      {
        path: 'device-group', component: DeviceGroupComponent, data: { title: 'Calix Suppport Cloud - Netops management - device-group' },
      },
      {
        path: 'group-detail', component: GroupDetailComponent, data: { title: 'Calix Suppport Cloud - Netops management - group-detail' },
      },
      {
        path: 'external-file-server', component: ExternalFileServerComponent, data: { title: 'Calix Suppport Cloud - Netops management - external-file-server' },
      },
      {
        path: 'external-file-server-new', component: ExternalFileServerNewComponent, data: { title: 'Calix Suppport Cloud - Netops management - external-file-server-new' },
      },
      {
        path: 'netop-policies', component: NetopPoliciesComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-policies' },
      },
      {
        path: 'netop-profiles', component: NetopProfilesComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-profiles' },
      },
      {
        path: 'netop-profiles-new', component: NetopProfilesNewComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-profiles-new' },
      },
      {
        path: 'device-reports', component: DeviceReportsComponent, data: { title: 'Calix Suppport Cloud - Netops management - device-reports' },
      },
      {
        path: 'call-outcome-reports', component: CallOutcomeReportsComponent, data: { title: 'Calix Suppport Cloud - Netops management - call-outcome-reports' },
      },
      {
        path: 'netop-swImage', component: NetopSwImageComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-swImage' },
      },
      {
        path: 'netop-swImage-upload', component: NetopSwImageUploadComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-swImage-upload' },
      },
      {
        path: 'subnet-config', component: SubnetConfigComponent, data: { title: 'Calix Suppport Cloud - Netops management - subnet-config' },
      },
      {
        path: 'dial-plan', component: DialPlanComponent, data: { title: 'Calix Suppport Cloud - Netops management - dial-plan' },
      },
      {
        path: 'dial-plan-new', component: DialPlanNewComponent, data: { title: 'Calix Suppport Cloud - Netops management - dial-plan-new' },
      },
      {
        path: 'device-unlinked', component: DeviceUnlinkedComponent, data: { title: 'Calix Suppport Cloud - Netops management - device-unlinked' },
      },
      {
        path: 'netop-workflows', component: NetopWorkflowsComponent, data: { title: 'Calix Suppport Cloud - Netops management - netop-workflows' },
      },
      {
        path: 'netop-workflows-new', component: NetopWorkflowsNewComponent, data: { title: 'Calix Suppport Cloud - Netops management - group-detail' },
      },
      {
        path: '',
        redirectTo: 'configuration-files',
        pathMatch: 'full',
      }
    ], */
  }, { path: 'software-images-form', component: SoftwareImagesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'devices-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'devices-groups-add', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'devices-groups-workflow', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetopsManagementRoutingModule { }
