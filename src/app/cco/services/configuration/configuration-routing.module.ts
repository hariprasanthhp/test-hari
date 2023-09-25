import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ServiceProvisioningComponent } from 'src/app/sys-admin/cco-admin/service-provisioning/service-provisioning.component';
import { ExternalFileServerFormComponent } from 'src/app/support/netops-management/configuration/external-file-server-form/external-file-server-form.component';
import { ExternalFileServerListComponent } from 'src/app/support/netops-management/configuration/external-file-server-list/external-file-server-list.component';
import { SecureOnboardingComponent } from 'src/app/support/netops-management/configuration/secure-onboarding/secure-onboarding.component';
import { StaleDevicePurgeComponent } from 'src/app/support/netops-management/configuration/stale-device-purge/stale-device-purge.component';
import { SubnetConfigComponent } from 'src/app/support/netops-management/configuration/subnet-config/subnet-config.component';
import { SpeedTestComponent } from 'src/app/support/netops-management/configuration/speed-test/speed-test.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      { path: 'ONT-configurations', component: ServiceProvisioningComponent },
      { path: 'stale-system-purge', component: StaleDevicePurgeComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'secure-onboarding', component: SecureOnboardingComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'subnet-configuration', component: SubnetConfigComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'external-file-server-list', component: ExternalFileServerListComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'external-file-server-form', component: ExternalFileServerFormComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'speed-test', component: SpeedTestComponent, data: { title: 'Calix Cloud - Flow Configuration' } },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
