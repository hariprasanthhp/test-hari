import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoNetworkSystemComponent } from './cco-network-system.component';
import { RouterModule, Routes } from '@angular/router';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { SystemTableViewComponent } from './system-table-view/system-table-view.component';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component';
import { AddComponent } from './add/add.component';
import { ShowSystemDetailsComponent } from './show-system-details/show-system-details.component';
// import { CardDetailsComponent } from './show-system-details/card-details/card-details.component';



const routes: Routes = [{
  path: '', component: CcoNetworkSystemComponent,
  children: [
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: AddComponent },
    { path: 'system-table-view', component: SystemTableViewComponent },
    { path: 'system-details/:SN', component: SelectedSystemDetailsComponent },
    { path: 'show-details', component: ShowSystemDetailsComponent },
    // { path: 'show-details/card-details', component: CardDetailsComponent },
    { path: 'system-topology-view', loadChildren: () => import('./system-topology-view/system-topology-view.module').then(m => m.SystemTopologyViewModule) },
    { path: '', redirectTo: 'system-table-view', pathMatch: 'full' }
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
export class CcoNetworkSystemRoutingModule { }
