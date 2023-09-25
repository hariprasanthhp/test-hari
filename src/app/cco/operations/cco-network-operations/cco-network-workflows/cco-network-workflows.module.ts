import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoNetworkWorkflowsComponent } from './cco-network-workflows.component';
import { CcoNetworkWorkflowsRoutingModule } from './cco-network-workflows-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [CcoNetworkWorkflowsComponent, CategoryListComponent],
  imports: [
    CommonModule,
    CcoNetworkWorkflowsRoutingModule,
    NgbModule
  ] 
})
export class CcoNetworkWorkflowsModule { }
