import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoSystemsOperationsComponent } from './systems-operations.component';
import { CcoSystemsOperationsRoutingModule } from './systems-operations-routing.module';


@NgModule({
  declarations: [CcoSystemsOperationsComponent],
  imports: [
    CommonModule,
    CcoSystemsOperationsRoutingModule
  ]
})
export class CcoSystemOperationsModule { }
