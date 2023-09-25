import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { InventoryReportComponent } from 'src/app/support/netops-management/reports/inventory-report/inventory-report.component';
import { CallOutcomeReportComponent } from 'src/app/support/netops-management/reports/call-outcome-report/call-outcome-report.component';
import { UnassociatedDevicesComponent } from 'src/app/support/netops-management/unassociated-devices/unassociated-devices.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'call-outcome-report', component: CallOutcomeReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'unassociated-devices', component: UnassociatedDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    // {
    //   path: 'call-avoidance-report', component: CallAvoidanceReportComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    // },
    // {
    //   path: 'add-report', component: AddReportComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    // },
    // {
    //   path: 'report-details', component: ReportDetailsComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    // },
    {
      path: '',
      redirectTo: 'inventory-report',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
