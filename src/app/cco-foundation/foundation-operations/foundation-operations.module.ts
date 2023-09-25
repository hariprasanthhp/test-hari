import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationOperationsComponent } from './foundation-operations.component';
import { FoundationOperationsRoutingModule } from './foundation-operations-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [FoundationOperationsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FoundationOperationsRoutingModule
  ]
})
export class FoundationOperationsModule { }
