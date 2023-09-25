import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PonUtilizationRoutingModule } from './pon-utilization-routing.module';
import { PonUtilizationComponent } from './pon-utilization.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataTablesModule } from 'angular-datatables';
import { PonKpiComponent } from './pon-kpi/pon-kpi.component';
import { PonFsanComponent } from './pon-fsan/pon-fsan.component';

@NgModule({
  declarations: [PonUtilizationComponent, PonKpiComponent, PonFsanComponent],
  imports: [
    CommonModule,
    PonUtilizationRoutingModule,
    NgxSliderModule,
    DataTablesModule,
  ]
})
export class PonUtilizationModule { }
