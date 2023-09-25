import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationConfigurationComponent } from './foundation-configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';

const routes: Routes =
  [
    {
      path: '', component: FoundationConfigurationComponent,
      children: [
        {
          path: '',
          redirectTo: 'configuration-settings',
          pathMatch: 'full',
        },
        { path: 'configuration-settings', loadChildren: () => import('./configuration-settings/configuration-settings.module').then(m => m.ConfigurationSettingsModule) },
        { path: 'configuration-prerequisites', loadChildren: () => import('./configuration-prerequisites/configuration-prerequisites.module').then(m => m.ConfigurationPrerequisitesModule) },
        { path: 'configuration-workflow', loadChildren: () => import('./configuration-workflow/configuration-workflow.module').then(m => m.ConfigurationWorkflowModule) },

      ]
    }, { path: 'software-images-list/software-images-form', component: SoftwareImagesFormComponent },
    { path: 'device-groups-add', component: DevicesGroupsComponent },
    { path: 'device-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'device-groups-workflow', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  ]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FoundationConfigurationRoutingModule { }
