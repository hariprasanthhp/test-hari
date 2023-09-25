import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemTopologyViewComponent } from './system-topology-view.component';
import { SystemTopologyViewRoutingModule } from './system-topology-view-routing.module';



@NgModule({
  declarations: [SystemTopologyViewComponent],
  imports: [
    CommonModule,
    SystemTopologyViewRoutingModule
  ]
})
export class SystemTopologyViewModule { }
