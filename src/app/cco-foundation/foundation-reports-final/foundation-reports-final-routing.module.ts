import { NgModule } from '@angular/core';
import { FoundationReportsFinalComponent } from './foundation-reports-final.component';
import { InventoryReportComponent } from '../../support/netops-management/reports/inventory-report/inventory-report.component';
import { UnassociatedDevicesComponent } from '../../support/netops-management/reports/../unassociated-devices/unassociated-devices.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =
  [
    {
      path: '', component: FoundationReportsFinalComponent,
      children: [
        { path: 'inventory-report', component: InventoryReportComponent, data: { title: 'Calix Cloud - Flow Configuration' }, },
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
export class FoundationReportsFinalRoutingModule { }
