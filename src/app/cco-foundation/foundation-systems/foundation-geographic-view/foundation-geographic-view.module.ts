import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationGeographicViewComponent } from './foundation-geographic-view.component';
import { FoundationGeographicViewRoutingModule } from './foundation-geographic-view-routing.module';



@NgModule({
  declarations: [FoundationGeographicViewComponent],
  imports: [
    CommonModule,
    FoundationGeographicViewRoutingModule
  ]
})
export class FoundationGeographicViewModule { }
