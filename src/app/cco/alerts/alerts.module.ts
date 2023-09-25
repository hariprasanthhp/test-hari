import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import { ServiceDisruptionsComponent } from './service-disruptions/service-disruptions.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlertsComponent,
    ServiceDisruptionsComponent
  ],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class AlertsModule { }
