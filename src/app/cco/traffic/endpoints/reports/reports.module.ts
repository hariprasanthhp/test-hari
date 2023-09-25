import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { UsageComponent } from './usage/usage.component';
import { RateComponent } from './rate/rate.component';
import { MonthlyUsageComponent } from './monthly-usage/monthly-usage.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TopApplicationTrafficComponent } from './top-application-traffic/top-application-traffic.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApplicationGroupsComponent } from './application-groups/application-groups.component';


@NgModule({
  declarations: [ReportsComponent, UsageComponent, RateComponent, MonthlyUsageComponent, ApplicationsComponent, TopApplicationTrafficComponent, ApplicationGroupsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    NgbModule,
    DataTablesModule,
    NgxSliderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
