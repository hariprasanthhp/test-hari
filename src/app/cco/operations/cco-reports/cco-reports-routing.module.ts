import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CcoReportsComponent } from './cco-reports.component';
import { InventoryReportComponent } from './../../../support/netops-management/reports/inventory-report/inventory-report.component';
import { CallOutcomeReportComponent } from './../../../support/netops-management/reports/call-outcome-report/call-outcome-report.component';
import { UnassociatedDevicesComponent } from './../../../support/netops-management/reports/../unassociated-devices/unassociated-devices.component';
import { EndpointCountBymapperComponent } from './endpoint-count-bymapper/endpoint-count-bymapper.component';
import { MappedEndpointListComponent } from './mapped-endpoint-list/mapped-endpoint-list.component';
import { OntDevicesComponent } from './ont-devices/ont-devices.component';
import { UnmappedIpsComponent } from './unmapped-ips/unmapped-ips.component';
import { AuditReportComponent } from 'src/app/support/netops-management/reports/audit-report/audit-report.component';
const routes: Routes = [{
  path: '',
  component: CcoReportsComponent,
  children: [
    { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'call-outcome-report', component: CallOutcomeReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    { path: 'Audit-report', component: AuditReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
    {
      path: 'unassociated-devices', component: UnassociatedDevicesComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'mapped-endpoint-list', component: MappedEndpointListComponent, data: { title: 'Calix Cloud' },
    },
    {
      path: 'endpoint-count-bymapper', component: EndpointCountBymapperComponent, data: { title: 'Calix Cloud' },
    },
    {
      path: 'ont-devices', component: OntDevicesComponent, data: { title: 'Calix cloud' }
    },
    {
      path: 'unmapped-ips', component: UnmappedIpsComponent, data: { title: 'Calix Cloud' },
    },
    {
      path: '',
      redirectTo: 'mapped-endpoint-list',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CcoReportsRoutingModule { }
