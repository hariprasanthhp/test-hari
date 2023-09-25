import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriberTemplatesRoutingModule } from './subscriber-templates-routing.module';
import { SubscriberTemplatesComponent } from './subscriber-templates.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { AddComponent } from './subscribers/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [SubscriberTemplatesComponent, SubscribersComponent, AddComponent],
  imports: [
    CommonModule,
    SubscriberTemplatesRoutingModule, ReactiveFormsModule, DataTablesModule
  ]
})
export class SubscriberTemplatesModule { }
