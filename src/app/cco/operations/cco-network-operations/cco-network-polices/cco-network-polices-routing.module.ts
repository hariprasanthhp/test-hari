import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoNetworkPolicesComponent } from './cco-network-polices.component';
import { OntAgeOutComponent } from './ont-age-out/ont-age-out.component';
import { CcoOrgAdminComponent } from './cco-org-admin/cco-org-admin.component';
import { CcoOrgAdminAddComponent } from './cco-org-admin-add/cco-org-admin-add.component';

const routes: Routes = [{
  path: '',
  component: CcoNetworkPolicesComponent,
  children: [
    { path: 'ont-age-out', component: OntAgeOutComponent, data: { title: 'Calix Cloud - ' } },
    // { path: 'cco-org-admin', component: CcoOrgAdminComponent, data: { title: 'Calix Cloud - ' } },
    // { path: 'cco-org-admin-add', component: CcoOrgAdminAddComponent, data: { title: 'Calix Cloud - ' } },
    // { path: 'edit/org-admin/:id', component: CcoOrgAdminAddComponent },
    // {
    //   path: '',
    //   redirectTo: 'cco-org-admin-add',
    //   pathMatch: 'full',
    // }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoNetworkPolicesRoutingModule { }
