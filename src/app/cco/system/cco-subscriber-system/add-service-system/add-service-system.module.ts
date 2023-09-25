import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceSystemComponent } from './add-service-system.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { AddEdgeSuitesComponent } from './add-edge-suites/add-edge-suites.component';
import { AddSystemComponent } from './add-system/add-system.component';
import { AddSummaryComponent } from './add-summary/add-summary.component';
import { AddServiceSystemRoutingModule } from './add-service-system-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/support/shared/shared.module';

import { AdvancedSystemComponent } from './advanced-system/advanced-system.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { WifiSsidServiceComponent } from 'src/app/support/netops-management/subscriber-management/subscriber-wizard/service-wizard/wifi-ssid-service/wifi-ssid-service.component';
import { NetopsManagementModule } from 'src/app/support/netops-management/netops-management.module';
import { LanSettingsComponent } from './advanced-system/lan-settings/lan-settings.component';
import { AdvancedSystemOntComponent } from './advanced-system-ont/advanced-system-ont.component';
import { WifiSsidServiceComponent } from './advanced-system/wifi-ssid-service/wifi-ssid-service.component';
import { FieldErrorDirective } from 'src/app/shared/directives/field-error.directive';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddServiceSystemComponent, AddDetailsComponent,  AddEdgeSuitesComponent, AddSystemComponent, AddSummaryComponent, AdvancedSystemComponent, LanSettingsComponent, AdvancedSystemOntComponent, WifiSsidServiceComponent,
    FieldErrorDirective
  ],
  imports: [
    CommonModule,
    AddServiceSystemRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    shared
    //NetopsManagementModule

  ],
  exports: [
    AddServiceSystemComponent,
  ],
  entryComponents: [
    AddServiceSystemComponent,
  ]
})
export class AddServiceSystemModule { }
