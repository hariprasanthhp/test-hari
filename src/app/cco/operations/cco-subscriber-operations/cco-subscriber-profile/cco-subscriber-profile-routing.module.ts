import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoSubscriberProfileComponent } from './cco-subscriber-profile.component';
import { AddComponent } from './add/add.component';
import { SubscribersComponent } from '../cco-subscriber-templates/subscriber-templates/subscribers/subscribers.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'edit/:id/:type', component: AddComponent }, {
    path: '', component: CcoSubscriberProfileComponent,

    children: [
      { path: 'list', component: CcoSubscriberProfileComponent },

      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      }
    ]
  }]
// { path: '/add', component: AddComponent },
// { path: 'edit/:id', component: AddComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoSubscriberProfileRoutingModule { }
