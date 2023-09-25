import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CcoSubscriberSystemRoutingModule } from './cco-subscriber-system-routing.module';
import { CcoSubscriberSystemComponent } from './cco-subscriber-system.component';
import { DataTablesModule } from 'angular-datatables';


import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/support/shared/shared.module';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component'
import { AddServiceSystemModule } from './add-service-system/add-service-system.module';

@NgModule({
  declarations: [CcoSubscriberSystemComponent, SelectedSystemDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CcoSubscriberSystemRoutingModule,
    DataTablesModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    AddServiceSystemModule
  ]
})
export class CcoSubscriberSystemModule { }
