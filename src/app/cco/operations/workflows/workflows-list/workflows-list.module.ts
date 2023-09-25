import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowsListRoutingModule } from './workflows-list-routing.module';
import { WorkflowsListComponent } from './workflows-list.component';


@NgModule({
  declarations: [WorkflowsListComponent],
  imports: [
    CommonModule,
    WorkflowsListRoutingModule
  ]
})
export class WorkflowsListModule { }
