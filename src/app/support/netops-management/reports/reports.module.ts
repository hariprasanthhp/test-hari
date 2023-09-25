import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { CallOutcomeReportComponent } from './call-outcome-report/call-outcome-report.component';
import { UnassociatedDevicesComponent } from '../unassociated-devices/unassociated-devices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { SharedUtilsModule } from '../../../../app/shared-utils/shared-utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartComponent } from 'highcharts-angular';
import { CallAvoidanceReportComponent } from './call-avoidance-report/call-avoidance-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AuditReportComponent } from './audit-report/audit-report.component';


@NgModule({
  declarations: [ReportsComponent, InventoryReportComponent, CallOutcomeReportComponent, UnassociatedDevicesComponent, CallAvoidanceReportComponent, AddReportComponent, ReportDetailsComponent, AuditReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgbModule,
    NgSelectModule,
    DataTablesModule,
    SharedUtilsModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule

  ],
  exports: [AddReportComponent, ReportsComponent, InventoryReportComponent, UnassociatedDevicesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReportsModule { }
