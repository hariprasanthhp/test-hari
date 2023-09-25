import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgAccessLayoutComponent } from './org-access-layout/org-access-layout.component';
import { OrgAccessComponent } from './org-access/org-access.component';

const routes: Routes = [
  {
    path: '',
    component: OrgAccessLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrgAccessComponent,
        pathMatch: 'full',
        data: { title: 'Calix Cloud - Secure Access' }

      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgAccessRoutingModule { }
