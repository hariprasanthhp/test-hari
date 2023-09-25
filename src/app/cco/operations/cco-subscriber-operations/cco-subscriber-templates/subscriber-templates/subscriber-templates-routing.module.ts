import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberTemplatesComponent } from './subscriber-templates.component';
import { AddComponent } from './subscribers/add/add.component';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [{
  path: '',
  component: SubscriberTemplatesComponent,
  children: [
    { path: 'list', component: SubscribersComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: AddComponent },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberTemplatesRoutingModule { }
