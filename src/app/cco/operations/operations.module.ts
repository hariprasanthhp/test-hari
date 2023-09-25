import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { NgSelectModule } from '@ng-select/ng-select';

// import { SubCategoryListComponent } from './cco-network-workflows/category-list/sub-category-list/sub-category-list.component';

@NgModule({
  declarations: [OperationsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    OperationsRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class OperationsModule { }
