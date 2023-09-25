import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';


@NgModule({
  declarations: [
    SubscribersComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule
  ]
})
export class SubscribersModule { }
