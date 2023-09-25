import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProfilesRoutingModule } from './service-profiles-routing.module';
import { ServiceProfilesComponent } from './service-profiles.component';


@NgModule({
  declarations: [
    ServiceProfilesComponent
  ],
  imports: [
    CommonModule,
    ServiceProfilesRoutingModule
  ]
})
export class ServiceProfilesModule { }
