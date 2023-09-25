import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers.component';
import { CcoSystemSearchComponent } from '../../cco-system-search/cco-system-search.component';
import { SelectedSystemDetailsComponent } from '../../system/cco-subscriber-system/selected-system-details/selected-system-details.component';

const routes: Routes = [
  {
    path: 'system', component: SubscribersComponent,
    children: [
      { path: 'list', component: CcoSystemSearchComponent },
      { path: 'details', component: SelectedSystemDetailsComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'add', loadChildren: () => import('src/app/cco/system/cco-subscriber-system/add-service-system/add-service-system.module').then(m => m.AddServiceSystemModule) },
      { path: 'edit', loadChildren: () => import('src/app/cco/system/cco-subscriber-system/add-service-system/add-service-system.module').then(m => m.AddServiceSystemModule) },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
