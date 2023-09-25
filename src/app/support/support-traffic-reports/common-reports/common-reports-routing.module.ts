import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonReportsComponent } from './common-reports.component';

const routes: Routes = [
  {
    path: 'all',
    component: CommonReportsComponent,
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonReportsRoutingModule { }
