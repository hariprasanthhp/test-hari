import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location-routing.module';
import { FlowconfigTrafficModule } from '../traffic.module';



@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FlowconfigTrafficModule
  ]
})
export class LocationModule { }
