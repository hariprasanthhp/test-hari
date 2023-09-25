import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { CcoSubscriberOperationsComponent } from './cco-subscriber-operations.component';
import { CcoSubscriberOperationsRoutingModule } from './cco-subscriber-operations-routing.module';



@NgModule({
  declarations: [CcoSubscriberOperationsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    CcoSubscriberOperationsRoutingModule
  ]
})

export class CcoSubscriberOperationsModule { }
