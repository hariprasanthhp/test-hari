import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { DialPlanComponent } from './dial-plan/dial-plan.component';
import { ExternalFileServerListComponent } from './external-file-server-list/external-file-server-list.component';
import { ExternalFileServerFormComponent } from './external-file-server-form/external-file-server-form.component';
import { SecureOnboardingComponent } from './secure-onboarding/secure-onboarding.component';
import { SelfHealComponent } from './self-heal/self-heal.component';
import { StaleDevicePurgeComponent } from './stale-device-purge/stale-device-purge.component';
import { SubnetConfigComponent } from './subnet-config/subnet-config.component';
import { DialPlanNewComponent } from './dial-plan/dial-plan-new/dial-plan-new.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';
import { BackgroundSiteScanComponent } from './background-site-scan/background-site-scan.component';
import { SystemDeleteSettingsComponent } from 'src/app/sys-admin/foundation/system-delete-settings/system-delete-settings.component';
import { EdgeSuiteComponent } from './edge-suite/edge-suite.component';
import { QualityExperienceComponent } from './quality-experience/quality-experience.component'

const routes: Routes = [{
  path: '',
  component: ConfigurationComponent,
  children: [
    { path: 'background-site-scan', component: BackgroundSiteScanComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'dial-plan', component: DialPlanComponent, data: { title: 'Calix Cloud - Flow Configuration' },
      children: [
        {
          path: 'add',
          component: DialPlanNewComponent,
          data: { title: 'Calix Cloud - Flow Configuration' }
        },
        {
          path: ':id',
          component: DialPlanNewComponent,
          data: { title: 'Calix Cloud - Flow Configuration' }
        }
      ]
    },
    { path: 'external-file-server-list', component: ExternalFileServerListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'secure-onboarding', component: SecureOnboardingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'self-heal', component: SelfHealComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'stale-device-purge', component: StaleDevicePurgeComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'subnet-configuration', component: SubnetConfigComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'dial-plan-new', component: DialPlanNewComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'external-file-server-form', component: ExternalFileServerFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'speed-test', component: SpeedTestComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
    // { path: 'edge-suites', component: EdgeSuiteComponent, data: { title: 'Calix Cloud - Bulk IQ suites' } },
    { path: 'quality-experience', component: QualityExperienceComponent, data: { title: 'Calix Cloud - Quality of Experience' } },

    // { path: 'system_settings', component: SystemDeleteSettingsComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
    {

      path: '',
      redirectTo: 'background-site-scan',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
