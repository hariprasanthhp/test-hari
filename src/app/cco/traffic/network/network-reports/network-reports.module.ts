import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkReportsComponent } from './network-reports.component';
import { NetworkReportsRoutingModule } from './network-reports-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrafficComponent } from './traffic/traffic.component';
import { TopApplicationsComponent } from './top-applications/top-applications.component';
import { TopLocationsComponent } from './top-locations/top-locations.component';
import { TopSubscribersComponent } from './top-subscribers/top-subscribers.component';
import { PowerUsersComponent } from './power-users/power-users.component';
import { TopApplicationTrafficComponent } from './top-application-traffic/top-application-traffic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ApplicationTrafficComponent } from './application-traffic/application-traffic.component';
import { LocationReportsModule } from '../../locations/location-reports/location-reports.module';
import { SharedModule as shared } from 'src/app/shared/shared.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [NetworkReportsComponent, TrafficComponent, TopApplicationsComponent, TopLocationsComponent, TopSubscribersComponent, PowerUsersComponent, TopApplicationTrafficComponent, ApplicationTrafficComponent],
  imports: [
    CommonModule,
    NetworkReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    NgbModule,
    DataTablesModule,
    NgxSliderModule,
    LocationReportsModule,
    SharedModule,
    shared,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NetworkReportsModule { }
