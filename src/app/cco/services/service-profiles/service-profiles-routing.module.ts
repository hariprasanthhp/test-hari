import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProfilesComponent } from './service-profiles.component';
import { CcoSubscriberProfileComponent } from '../../operations/cco-subscriber-operations/cco-subscriber-profile/cco-subscriber-profile.component';
import { AddComponent } from '../../operations/cco-subscriber-operations/cco-subscriber-profile/add/add.component';
import { ProfilesComponent } from 'src/app/support/netops-management/operations/profiles/profiles.component';
import { DialPlanComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan.component';
import { DialPlanNewComponent } from 'src/app/support/netops-management/configuration/dial-plan/dial-plan-new/dial-plan-new.component';
import { ProfileWizardComponent } from 'src/app/support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';

const routes: Routes = [{
  path: '', component: ServiceProfilesComponent,
  children: [
    { path: 'ONT-profile', component: CcoSubscriberProfileComponent },
    { path: 'ONT-profile/add', component: AddComponent },
    { path: 'ONT-profile/edit', component: AddComponent },
    { path: 'profiles', component: ProfilesComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
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
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProfilesRoutingModule { }
