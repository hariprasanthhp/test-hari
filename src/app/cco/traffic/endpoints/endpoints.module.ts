import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointsRoutingModule } from './endpoints-routing.module';
import { EndpointsComponent } from './endpoints.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [EndpointsComponent],
  imports: [
    CommonModule,
    EndpointsRoutingModule,
    HighchartsChartModule,
    NgSelectModule,
  ]
})
export class EndpointsModule { }
