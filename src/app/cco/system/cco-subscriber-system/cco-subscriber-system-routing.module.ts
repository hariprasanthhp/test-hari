import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoSubscriberSystemComponent } from './cco-subscriber-system.component';
//import { SubscriberTableViewComponent } from './subscriber-table-view/subscriber-table-view.component';
//import { SelectedSystemDetailsComponent } from '../cco-network-system/selected-system-details/selected-system-details.component';
import { CcoSystemSearchComponent } from '../../cco-system-search/cco-system-search.component';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component';


const routes: Routes = [{
  path: '', component: CcoSubscriberSystemComponent,
  children: [
    //{ path: 'system-table-view', component: SubscriberTableViewComponent },
    { path: 'system-table-view', component: CcoSystemSearchComponent },
    { path: 'system-details', component: SelectedSystemDetailsComponent },
    // { path: 'system-map-view', component: SystemMapViewComponent },
    { path: '', redirectTo: 'system-table-view', pathMatch: 'full' },
    { path: 'add-service-system', loadChildren: () => import('./add-service-system/add-service-system.module').then(m => m.AddServiceSystemModule) },
    { path: 'edit-service-system', loadChildren: () => import('./add-service-system/add-service-system.module').then(m => m.AddServiceSystemModule) },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcoSubscriberSystemRoutingModule { }
