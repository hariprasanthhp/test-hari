import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationReportsComponent } from './location-reports.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TopSubscribersComponent } from './top-subscribers/top-subscribers.component';
import { TopApplicationsComponent } from './top-applications/top-applications.component';
import { TopApplicationTrafficComponent } from './top-application-traffic/top-application-traffic.component';
import { SubscriberDistributionComponent } from './subscriber-distribution/subscriber-distribution.component';
import { MaxDailyRateComponent } from './max-daily-rate/max-daily-rate.component';
import { ActiveSubscribersComponent } from './active-subscribers/active-subscribers.component';
import { AverageSubscriberRateComponent } from './average-subscriber-rate/average-subscriber-rate.component';
import { MonthlyUsageByapplicationComponent } from './monthly-usage-byapplication/monthly-usage-byapplication.component';
import { MonthlyUsageByserviceCategoryComponent } from './monthly-usage-byservice-category/monthly-usage-byservice-category.component';
import { LocationReportsRoutingModule } from './location-reports-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LocationReportsComponent, TrafficComponent, TopSubscribersComponent, TopApplicationsComponent, TopApplicationTrafficComponent, SubscriberDistributionComponent, MaxDailyRateComponent, ActiveSubscribersComponent, AverageSubscriberRateComponent, MonthlyUsageByapplicationComponent, MonthlyUsageByserviceCategoryComponent],
  imports: [
    CommonModule,
    LocationReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    NgbModule,
    DataTablesModule,
    NgxSliderModule,
    SharedModule,
    shared,
  ],
  exports: [
    MaxDailyRateComponent,
    SubscriberDistributionComponent,
    ActiveSubscribersComponent,
    AverageSubscriberRateComponent,
    MonthlyUsageByapplicationComponent,
    MonthlyUsageByserviceCategoryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationReportsModule { }
