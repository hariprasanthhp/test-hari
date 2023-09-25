import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficComponent } from './traffic.component';
import { TrafficRoutingModule } from './traffic-routing.module';
import { TrafficModule } from 'src/app/cco/traffic/traffic.module';
import { FormsModule } from '@angular/forms';
import { InputBoxComponent } from './input-box/input-box.component';
import { SharedModule } from 'src/app/cco/traffic/shared/shared.module';



@NgModule({
  declarations: [
    TrafficComponent,
    InputBoxComponent
  ],
  imports: [
    CommonModule,
    TrafficRoutingModule,
    TrafficModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    InputBoxComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlowconfigTrafficModule { }
