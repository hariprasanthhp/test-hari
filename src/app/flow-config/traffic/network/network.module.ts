import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network.component';
import { NetworkRoutingModule } from './network-routing.module';
import { FlowconfigTrafficModule } from '../traffic.module';



@NgModule({
  declarations: [
    NetworkComponent
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule,
    FlowconfigTrafficModule
  ]
})
export class NetworkModule { }
