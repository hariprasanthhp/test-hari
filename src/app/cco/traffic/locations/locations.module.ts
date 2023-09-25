import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';


@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
