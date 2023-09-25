import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationProfilesComponent } from './foundation-profiles.component';
import { RouterModule, Routes } from '@angular/router';
import { CcoSubscriberProfileComponent } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/cco-subscriber-profile.component';
import { AddComponent } from 'src/app/cco/operations/cco-subscriber-operations/cco-subscriber-profile/add/add.component';
import { ProfilesComponent } from '../../../../support/netops-management/operations/profiles/profiles.component';
import { ProfileWizardComponent } from '../../../../support/netops-management/operations/profiles/profile-wizard/profile-wizard.component';
const routes: Routes = [
  { path: 'profiles', component: ProfilesComponent },
  { path: 'profiles/profile-wizard', component: ProfileWizardComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
  { path: 'ONT-profile', component: CcoSubscriberProfileComponent },
  { path:'ONT-profile/add',component:AddComponent},
  { path:'ONT-profile/edit',component:AddComponent},
  { path:'',redirectTo:'ONT-profile',pathMatch:'full'}
]
@NgModule({
  declarations: [FoundationProfilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FoundationProfilesModule { }
