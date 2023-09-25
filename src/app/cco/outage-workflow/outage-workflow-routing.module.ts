import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutageWorkflowComponent } from './outage-workflow.component';
import { OutgeWrkflwMainComponent } from './outge-wrkflw-main/outge-wrkflw-main.component';


const routes: Routes = [
  {
    path: '',
    component: OutageWorkflowComponent,
    children: [
      { path: 'add', component: OutgeWrkflwMainComponent },
      { path: 'edit/:id', component: OutgeWrkflwMainComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutageWorkflowRoutingModule { }
