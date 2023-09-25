import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { CcoSubscriberProfileComponent } from './cco-subscriber-profile.component';
import { CcoSubscriberProfileRoutingModule } from './cco-subscriber-profile-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StartComponent } from './add/start/start.component';

import { ProcessComponent } from './add/process/process.component';
import { AddNewcategoriesOntComponent } from './add/process/add-newcategories-ont/add-newcategories-ont.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CcoSubscriberProfileComponent, AddComponent, StartComponent, ProcessComponent, AddNewcategoriesOntComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CcoSubscriberProfileRoutingModule,
    DataTablesModule, ReactiveFormsModule,
    shared,


  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CcoSubscriberProfileModule { }

