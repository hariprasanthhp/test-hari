import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AddServiceSystemComponent } from './add-service-system.component';

const routes: Routes = [{
  path: '',
  component: AddServiceSystemComponent,
  children: [
    { path: 'add-details', component: AddDetailsComponent, data: { title: 'Calix Cloud - Add Subscriber' }, },

  ],
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddServiceSystemRoutingModule { }
