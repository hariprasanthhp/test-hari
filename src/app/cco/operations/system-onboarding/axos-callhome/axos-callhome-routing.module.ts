import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AxosCallhomeComponent } from './axos-callhome.component';
import { CallHomeComponent } from 'src/app/sys-admin/cco-admin/call-home/call-home.component';
import { AddComponent } from 'src/app/sys-admin/cco-admin/call-home/add/add.component';
import { SystemTableViewComponent } from 'src/app/cco/system/cco-network-system/system-table-view/system-table-view.component';

const routes: Routes = [{
  path: '', component: AxosCallhomeComponent,
  children: [
    {
      path: "axos/list", component: SystemTableViewComponent
    },
    {
      path: "callhome/list", component: CallHomeComponent
    },
    {
      path: "callhome/add",
      component: AddComponent,
      data: { title: 'Calix Cloud - Call Home' }
    },
    {
      path: "callhome/edit/:id",
      component: AddComponent,
      data: { title: 'Calix Cloud - Call Home' }
    },
    { path: '', redirectTo: 'axos/list', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AxosCallhomeRoutingModule { }
