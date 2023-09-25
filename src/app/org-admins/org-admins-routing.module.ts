import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { OrgAdminsComponent } from './org-admins.component';

const routes: Routes = [
  {
    path: '',
    component: OrgAdminsComponent,
    //canActivate: [AuthGuard],
    data: { title: 'Calix Cloud - Org Admins' },
    children: [
      {
        path: 'all',
        component: AdminsListComponent,
        data: { title: 'Calix Cloud - Org Admins' },
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgAdminsRoutingModule { }
