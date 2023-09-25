import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: '', component: ProfilesComponent,
  children: [
    { path: 'list', component: ListComponent },
    { path: 'add', component: AddComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'edit/:id', component: AddComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
