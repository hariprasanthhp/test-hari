import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { UsageComponent } from './usage/usage.component';
import { RateComponent } from './rate/rate.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TopAppTrafficComponent } from './top-app-traffic/top-app-traffic.component';
import { TopEndPointsComponent } from './top-end-points/top-end-points.component';
import { CommonFilterComponent } from "./common-filter/common-filter.component";
import { SharedUtilsModule } from "../../../shared-utils/shared-utils.module"

@NgModule({
  declarations: [ReportsComponent, UsageComponent, RateComponent, MonthlyUsageComponent, ApplicationsComponent, TopAppTrafficComponent, TopEndPointsComponent, CommonFilterComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportsModule {

}
