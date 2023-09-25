import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoSystemsOperationsComponent } from './systems-operations.component';

import { SubnetConfigComponent } from './../../../support/netops-management/configuration/subnet-config/subnet-config.component';
import { PerformanceTestingComponent } from './../../../support/netops-management/operations/performance-testing/performance-testing.component';
import { SpeedTestComponent } from './../../../support/netops-management/configuration/speed-test/speed-test.component';
import { SoftwareImagesListComponent } from './../../../support/netops-management/operations/software-images-list/software-images-list.component';
import { ConfigurationFilesListComponent } from './../../../support/netops-management/operations/configuration-files-list/configuration-files-list.component';
import { ExternalFileServerListComponent } from './../../../support/netops-management/configuration/external-file-server-list/external-file-server-list.component';
import { DevicesGroupsComponent } from './../../../support/netops-management/operations/devices-groups/devices-groups.component';
import { ProfilesComponent } from './../../../support/netops-management/operations/profiles/profiles.component';
import { WorkflowsComponent } from './../../../support/netops-management/operations/workflows/workflows.component';
import { DialPlanComponent } from './../../../support/netops-management/configuration/dial-plan/dial-plan.component';
import { ConfigurationFilesFormComponent } from './../../../support/netops-management/operations/configuration-files-form/configuration-files-form.component';
import { ExternalFileServerFormComponent } from './../../../support/netops-management/configuration/external-file-server-form/external-file-server-form.component'
import { SoftwareImagesFormComponent } from './../../../support/netops-management/operations/software-images-form/software-images-form.component';
import { ProfileWizardComponent } from './../../../support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';
import { WorkflowWizardComponent } from './../../../support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowDetailsComponent } from './../../../support/netops-management/workflow-details/workflow-details.component';
import { WorkflowStatusComponent } from './../../../support/netops-management/workflow-status/workflow-status.component';
import { DialPlanNewComponent } from './../../../support/netops-management/configuration/dial-plan/dial-plan-new/dial-plan-new.component';
import { SecureOnboardingComponent } from './../../../support/netops-management/configuration/secure-onboarding/secure-onboarding.component';
import { SelfHealComponent } from './../../../support/netops-management/configuration/self-heal/self-heal.component';
import { StaleDevicePurgeComponent } from './../../../support/netops-management/configuration/stale-device-purge/stale-device-purge.component';
import { BlockPageTemplateListComponent } from 'src/app/shad/block-page-template-list/block-page-template-list.component';
import { BlockPageTemplateCreateComponent } from 'src/app/shad/block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateUpdateComponent } from 'src/app/shad/block-page-template-update/block-page-template-update.component';
import { WhitelabelComponent } from 'src/app/shad/whitelabel/whitelabel.component';
import { WhitelabelCreateComponent } from 'src/app/shad/whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from 'src/app/shad/whitelabel-update/whitelabel-update.component';
import { SystemDeleteSettingsComponent } from 'src/app/sys-admin/foundation/system-delete-settings/system-delete-settings.component';
import { DefaultWorkFlowComponent } from 'src/app/support/netops-management/operations/workflows/default-work-flow/default-work-flow.component';
import { BulkIqConfigurationComponent } from 'src/app/sys-admin/foundation/bulk-iq-configuration/bulk-iq-configuration.component';

const routes: Routes = [{
  path: '', component: CcoSystemsOperationsComponent, children: [

    { path: 'secure-onboard', component: SecureOnboardingComponent },
    { path: 'self-heal', component: SelfHealComponent },
    { path: 'stale-device', component: StaleDevicePurgeComponent },
    { path: 'subnet-configuration', component: SubnetConfigComponent },
    { path: 'sub-profile', component: DialPlanComponent },
    { path: 'performance-testing', component: PerformanceTestingComponent },
    { path: 'performance-testing/:id', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'speed-testing', component: SpeedTestComponent },
    { path: 'software-image', component: SoftwareImagesListComponent },
    { path: 'configuration-files', component: ConfigurationFilesListComponent },
    { path: 'configuration-files/configuration-files-form', component: ConfigurationFilesFormComponent },
    { path: 'external-file-server', component: ExternalFileServerListComponent },
    { path: 'external-file-server/external-file-server-form', component: ExternalFileServerFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows', component: WorkflowsComponent },
    { path: 'device-groups', component: DevicesGroupsComponent },
    { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'workflows/official-workflow-wizard', component: DefaultWorkFlowComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'sub-profile/add', component: DialPlanNewComponent },
    { path: 'sub-profile/:id', component: DialPlanNewComponent },
    {
      path: 'workflows/workflow-status',
      component: WorkflowStatusComponent
    },
    {
      path: 'workflows/workflow-details',
      component: WorkflowDetailsComponent
    },
    { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'system_settings', component: SystemDeleteSettingsComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
    { path: 'edge-suites-provision', component: BulkIqConfigurationComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
    {
      path: '',
      redirectTo: 'secure-onboard',
      pathMatch: 'full',
    }]
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

export class CcoSystemsOperationsRoutingModule { }
