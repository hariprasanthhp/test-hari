import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { CallOutcomeReportComponent } from './call-outcome-report/call-outcome-report.component';
import { UnassociatedDevicesComponent } from '../unassociated-devices/unassociated-devices.component';
import { OrphanDevicesComponent } from '../orphan-devices/orphan-devices.component';
import { CallAvoidanceReportComponent } from './call-avoidance-report/call-avoidance-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AuditReportComponent } from './audit-report/audit-report.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'call-outcome-report', component: CallOutcomeReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'audit-report', component: AuditReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'unassociated-devices', component: UnassociatedDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'orphan-devices', component: OrphanDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'call-avoidance-report', component: CallAvoidanceReportComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'add-report', component: AddReportComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'report-details', component: ReportDetailsComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: '',
      redirectTo: 'inventory-report',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
