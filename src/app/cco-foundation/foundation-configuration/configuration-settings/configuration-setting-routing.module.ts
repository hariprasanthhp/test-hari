import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationSettingComponent } from './configuration-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { SubnetConfigComponent } from './../../../support/netops-management/configuration/subnet-config/subnet-config.component';
import { StaleDevicePurgeComponent } from 'src/app/support/netops-management/configuration/stale-device-purge/stale-device-purge.component';
import { SecureOnboardingComponent } from 'src/app/support/netops-management/configuration/secure-onboarding/secure-onboarding.component';
import { SystemDeleteSettingsComponent } from 'src/app/sys-admin/foundation/system-delete-settings/system-delete-settings.component';
import { BlockPageTemplateListComponent } from 'src/app/shad/block-page-template-list/block-page-template-list.component';
import { WhitelabelComponent } from 'src/app/shad/whitelabel/whitelabel.component';
import { BulkIqConfigurationComponent } from 'src/app/sys-admin/foundation/bulk-iq-configuration/bulk-iq-configuration.component';
import { BlockPageTemplateCreateComponent } from 'src/app/shad/block-page-template-create/block-page-template-create.component';
import { BlockPageTemplateUpdateComponent } from 'src/app/shad/block-page-template-update/block-page-template-update.component';
import { WhitelabelCreateComponent } from 'src/app/shad/whitelabel-create/whitelabel-create.component';
import { WhitelabelUpdateComponent } from 'src/app/shad/whitelabel-update/whitelabel-update.component';
import { CommandIQWhiteLabelComponent } from 'src/app/shad/command-iq-white-label/command-iq-white-label.component';

const routes: Routes = [{
  path: '', component: ConfigurationSettingComponent, children: [
    { path: 'subnet-configuration', component: SubnetConfigComponent },
    { path: 'secure-onboard', component: SecureOnboardingComponent },
    { path: 'system_settings', component: SystemDeleteSettingsComponent },
    { path: 'stale-device', component: StaleDevicePurgeComponent },
    { path: 'block_page_template_list', component: BlockPageTemplateListComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template/:id', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template', component: BlockPageTemplateCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'block_page_template_update/:id', component: BlockPageTemplateUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel', component: WhitelabelComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel-create', component: WhitelabelCreateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'whitelabel-update', component: WhitelabelUpdateComponent, data: { title: 'Calix Cloud - Org Admin' } },
    { path: 'edge-suites-provision', component: BulkIqConfigurationComponent },
    { path: 'commandIQ', component: CommandIQWhiteLabelComponent, data: { title: 'Calix Cloud - SHAD' } },
    { path: '', redirectTo: 'subnet-configuration', pathMatch: 'full' },
    {
      path: 'migrations-rg',
      loadChildren: () =>
        import('./migrations-rg/migrations-rg.module').then(
          (m) => m.MigrationsRgModule
        ),
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationSettingRoutingModule { }
