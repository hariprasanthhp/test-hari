import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoReportsComponent } from './cco-reports.component';
import { CcoReportsRoutingModule } from './cco-reports-routing.module';
import { UnmappedIpsComponent } from './unmapped-ips/unmapped-ips.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { MappedEndpointListComponent } from './mapped-endpoint-list/mapped-endpoint-list.component';
import { EndpointCountBymapperComponent } from './endpoint-count-bymapper/endpoint-count-bymapper.component';
import { DataTablesModule } from 'angular-datatables';
import { OntDevicesComponent } from './ont-devices/ont-devices.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [CcoReportsComponent, UnmappedIpsComponent, MappedEndpointListComponent, EndpointCountBymapperComponent, OntDevicesComponent],
  imports: [
    CommonModule,
    CcoReportsRoutingModule,
    NgSelectModule,
    CalendarModule,
    DataTablesModule,
    FormsModule,
    HighchartsChartModule
  ],
  exports: [MappedEndpointListComponent, UnmappedIpsComponent, EndpointCountBymapperComponent]
})
export class CcoReportsModule { }
