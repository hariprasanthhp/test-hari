import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundationAddSystemComponent } from './foundation-add-system.component';

const routes: Routes = [
  {
    path: '',
    component: FoundationAddSystemComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationAddSystemRoutingModule { }
