import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonReportsRoutingModule } from './common-reports-routing.module';
import { CommonReportsComponent } from './common-reports.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { UsageComponent } from './usage/usage.component';
import { RateComponent } from './rate/rate.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { TopAppTrafficComponent } from './top-app-traffic/top-app-traffic.component';
import { TopEndPointsComponent } from './top-end-points/top-end-points.component';
import { ApplicationsComponent } from './applications/applications.component';


@NgModule({
  declarations: [CommonReportsComponent, UsageComponent, RateComponent, MonthlyUsageComponent, TopAppTrafficComponent, TopEndPointsComponent, ApplicationsComponent],
  imports: [
    CommonModule,
    CommonReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule
  ]
})
export class CommonReportsModule { }
