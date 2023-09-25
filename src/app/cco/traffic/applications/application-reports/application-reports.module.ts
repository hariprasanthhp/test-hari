import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationReportsComponent } from './application-reports.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TopLocationsComponent } from './top-locations/top-locations.component';
import { TopSubscribersComponent } from './top-subscribers/top-subscribers.component';
import { ApplicationReportsRoutingModule } from './application-reports-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ApplicationReportsComponent, TrafficComponent, TopLocationsComponent, TopSubscribersComponent],
  imports: [
    CommonModule,
    ApplicationReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    NgbModule,
    DataTablesModule,
    NgxSliderModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationReportsModule { }
