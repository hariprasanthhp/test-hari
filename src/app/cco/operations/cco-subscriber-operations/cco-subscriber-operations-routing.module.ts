import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoSubscriberOperationsComponent } from './cco-subscriber-operations.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
// import { WorkflowStatusComponent } from 'src/app/support/netops-management/workflow-status/workflow-status.component';
// import { WorkflowDetailsComponent } from 'src/app/support/netops-management/workflow-details/workflow-details.component';
// import { SecureOnboardingComponent } from 'src/app/support/netops-management/configuration/secure-onboarding/secure-onboarding.component';
// import { SelfHealComponent } from 'src/app/support/netops-management/configuration/self-heal/self-heal.component';
// import { StaleDevicePurgeComponent } from 'src/app/support/netops-management/configuration/stale-device-purge/stale-device-purge.component';
// import { SubnetConfigComponent } from 'src/app/support/netops-management/configuration/subnet-config/subnet-config.component';
// import { DialPlanComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan.component';
// import { PerformanceTestingComponent } from 'src/app/support/netops-management/operations/performance-testing/performance-testing.component';
// import { SoftwareImagesListComponent } from 'src/app/support/netops-management/operations/software-images-list/software-images-list.component';
// import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
// import { ConfigurationFilesListComponent } from 'src/app/support/netops-management/operations/configuration-files-list/configuration-files-list.component';
// import { ConfigurationFilesFormComponent } from 'src/app/support/netops-management/operations/configuration-files-form/configuration-files-form.component';
// import { ExternalFileServerListComponent } from 'src/app/support/netops-management/configuration/external-file-server-list/external-file-server-list.component';
// import { ExternalFileServerFormComponent } from 'src/app/support/netops-management/configuration/external-file-server-form/external-file-server-form.component';
// import { WorkflowsComponent } from 'src/app/support/netops-management/operations/workflows/workflows.component';
// import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';
// import { WorkflowWizardComponent } from 'src/app/support/netops-management/operations/workflows/workflow-wizard/workflow-wizard.component';
// import { DefaultWorkFlowComponent } from 'src/app/support/netops-management/operations/workflows/default-work-flow/default-work-flow.component';
// import { DialPlanNewComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan-new/dial-plan-new.component';
// import { ProfilesComponent } from 'src/app/support/netops-management/operations/profiles/profiles.component';
// import { ProfileWizardComponent } from 'src/app/support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';
// import { InventoryReportComponent } from 'src/app/support/netops-management/reports/inventory-report/inventory-report.component';
// import { UnassociatedDevicesComponent } from 'src/app/support/netops-management/unassociated-devices/unassociated-devices.component';
// import { CallOutcomeReportComponent } from 'src/app/support/netops-management/reports/call-outcome-report/call-outcome-report.component';
// import { SpeedTestComponent } from 'src/app/support/netops-management/configuration/speed-test/speed-test.component';
// import { BackgroundSiteScanComponent } from 'src/app/support/netops-management/configuration/background-site-scan/background-site-scan.component';




const routes: Routes = [{
  path: '', component: CcoSubscriberOperationsComponent,
  children: [
    // {
    //   path: 'reports',
    //   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
    // },
    {
      path: 'operations',
      loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'configurations',
      loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule)
    },
    { path: 'profiles', loadChildren: () => import('./cco-subscriber-profile/cco-subscriber-profile.module').then(m => m.CcoSubscriberProfileModule) },
    { path: 'templates', loadChildren: () => import('./cco-subscriber-templates/cco-subscriber-templates.module').then(m => m.CcoSubscriberTemplatesModule) },
    // { path: 'secure-onboard', component: SecureOnboardingComponent },
    // { path: 'self-heal', component: SelfHealComponent },
    // { path: 'site-scan', component: BackgroundSiteScanComponent },
    // { path: 'stale-device', component: StaleDevicePurgeComponent },
    // { path: 'subnet-configuration', component: SubnetConfigComponent },
    // { path: 'sub-profile', component: DialPlanComponent },
    // { path: 'performance-testing', component: PerformanceTestingComponent },
    // { path: 'performance-testing/:id', component: PerformanceTestingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'speed-testing', component: SpeedTestComponent },
    // { path: 'software-image', component: SoftwareImagesListComponent },
    // { path: 'software-image/software-images-form', component: SoftwareImagesFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'configuration-files', component: ConfigurationFilesListComponent },
    // { path: 'configuration-files/configuration-files-form', component: ConfigurationFilesFormComponent },
    // { path: 'external-file-server', component: ExternalFileServerListComponent },
    // { path: 'external-file-server/external-file-server-form', component: ExternalFileServerFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'netprofiles', component: ProfilesComponent },
    // { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'workflows', component: WorkflowsComponent },
    // { path: 'device-groups', component: DevicesGroupsComponent },
    // { path: 'device-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'workflows/workflow-wizard', component: WorkflowWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'workflows/official-workflow-wizard', component: DefaultWorkFlowComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'sub-profile/add', component: DialPlanNewComponent },
    // { path: 'sub-profile/:id', component: DialPlanNewComponent },
    // {
    //   path: 'workflows/workflow-status',
    //   component: WorkflowStatusComponent
    // },
    // {
    //   path: 'workflows/workflow-details',
    //   component: WorkflowDetailsComponent
    // },
    // { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // { path: 'call-outcome-report', component: CallOutcomeReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    // {
    //   path: 'unassociated-devices', component: UnassociatedDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    // },
    {
      path: '',
      redirectTo: 'operations',
      pathMatch: 'full',
    }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CcoSubscriberOperationsRoutingModule { }
