import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoNetworkPolicesComponent } from './cco-network-polices.component';
import { CcoNetworkPolicesRoutingModule } from './cco-network-polices-routing.module';
import { OntAgeOutComponent } from './ont-age-out/ont-age-out.component';
import { CcoOrgAdminComponent } from './cco-org-admin/cco-org-admin.component';
import { CcoOrgAdminAddComponent } from './cco-org-admin-add/cco-org-admin-add.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [CcoNetworkPolicesComponent, OntAgeOutComponent, CcoOrgAdminComponent, CcoOrgAdminAddComponent],
  imports: [
    CommonModule,
    CcoNetworkPolicesRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule
  ]
})
export class CcoNetworkPolicesModule { }
