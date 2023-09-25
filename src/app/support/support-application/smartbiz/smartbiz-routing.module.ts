import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartbizComponent } from './smartbiz.component';

const routes: Routes = [
  {
    path: '',
    component: SmartbizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartbizRoutingModule { }
