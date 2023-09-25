import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FoundationReportsComponent } from './reports.component';
import { InventoryReportComponent } from './../../../support/netops-management/reports/inventory-report/inventory-report.component';
import { CallOutcomeReportComponent } from './../../../support/netops-management/reports/call-outcome-report/call-outcome-report.component';
import { UnassociatedDevicesComponent } from './../../../support/netops-management/reports/../unassociated-devices/unassociated-devices.component';
const routes: Routes = [{
  path: '',
  component: FoundationReportsComponent,
  children: [
    { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'call-outcome-report', component: CallOutcomeReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'unassociated-devices', component: UnassociatedDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
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

export class FoundationReportsRoutingModule { }
