import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BSPInformationComponent } from './bsp-information/bsp-information.component';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunityUsersComponent } from './community-users/community-users.component';
import { ConfirmUsersComponent } from './confirm-users/confirm-users.component';
import { DataTablesModule } from 'angular-datatables';

let routes :Routes = [
  {
    path:'bsp-information',
    component:BSPInformationComponent
  },
  {
    path:'communities',
    component:CommunitiesComponent
  },
  {
    path:'community-users',
    component:CommunityUsersComponent
  },
 
{
  path:'',redirectTo:'bsp-information'
},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule
  ]
})
export class MyCommunityIqModule { }
