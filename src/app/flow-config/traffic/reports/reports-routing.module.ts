import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { MappedEndpointListComponent } from 'src/app/cco/operations/cco-reports/mapped-endpoint-list/mapped-endpoint-list.component';
import { EndpointCountBymapperComponent } from 'src/app/cco/operations/cco-reports/endpoint-count-bymapper/endpoint-count-bymapper.component';
import { UnmappedIpsComponent } from 'src/app/cco/operations/cco-reports/unmapped-ips/unmapped-ips.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    { path: 'mapped-endpoint-list', component: MappedEndpointListComponent },
    { path: 'endpoint-count-bymapper', component: EndpointCountBymapperComponent },
    { path: 'unmapped-ips', component: UnmappedIpsComponent },
    {
      path: '',
      redirectTo: 'mapped-endpoint-list',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
