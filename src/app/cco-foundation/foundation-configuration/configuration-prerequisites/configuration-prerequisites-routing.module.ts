import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationSettingComponent } from '../configuration-settings/configuration-setting.component';
import { ConfigurationPrerequisitesComponent } from './configuration-prerequisites.component';
import { ProfilesComponent } from './../../../support/netops-management/operations/profiles/profiles.component';
import { ProfileWizardComponent } from './../../../support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';
import { DevicesGroupsComponent } from 'src/app/support/netops-management/operations/devices-groups/devices-groups.component';
import { DialPlanComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan.component';
import { SoftwareImagesListComponent } from 'src/app/support/netops-management/operations/software-images-list/software-images-list.component';
import { DialPlanNewComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan-new/dial-plan-new.component';
import { SoftwareImagesFormComponent } from 'src/app/support/netops-management/operations/software-images-form/software-images-form.component';
import { CcoSubscriberProfileComponent } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/cco-subscriber-profile.component';
import { FoundationProfilesComponent } from './foundation-profiles/foundation-profiles.component';
// import { AddComponent } from 'src/app/cco/system/cco-network-system/add/add.component';




const routes: Routes = [
  {
    path: '', component: ConfigurationPrerequisitesComponent,
    children: [

      { path: 'device-groups', component: DevicesGroupsComponent },
      { path: 'device-groups/:id', component: DevicesGroupsComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
      { path: 'dial-plan', component: DialPlanComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
      { path: 'dial-plan/add', component: DialPlanNewComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
      { path: 'dial-plan/:id', component: DialPlanNewComponent, data: { title: 'Calix Cloud - Flow Configuration' } },
      { path: 'software-images-list', component: SoftwareImagesListComponent },
      { path: '', redirectTo: 'device-groups', pathMatch: 'full' },
      { path: 'service-profile', component: SoftwareImagesListComponent },

      { path: 'foundation-profiles' , component : FoundationProfilesComponent,loadChildren: () => import('./foundation-profiles/foundation-profiles.module').then(m => m.FoundationProfilesModule) },

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationPrerequisitesRoutingModule { }
