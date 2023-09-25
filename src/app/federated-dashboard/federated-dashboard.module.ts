import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederatedDashboardRoutingModule } from './federated-dashboard-routing.module';
import { SharedUtilsModule } from '../shared-utils/shared-utils.module';
import { FederatedDashboardHeaderComponent } from './federated-dashboard-header/federated-dashboard-header.component';
import { FederatedDashboardFooterComponent } from './federated-dashboard-footer/federated-dashboard-footer.component';
import { FederatedDashboardLayoutComponent } from './federated-dashboard-layout/federated-dashboard-layout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { FederatedDashboardComponent } from './federated-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FederatedDashboardHeaderComponent,
    FederatedDashboardFooterComponent,
    FederatedDashboardLayoutComponent,
    FederatedDashboardComponent
  ],
  imports: [
    CommonModule,
    FederatedDashboardRoutingModule,
    SharedUtilsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FederatedDashboardModule { }
