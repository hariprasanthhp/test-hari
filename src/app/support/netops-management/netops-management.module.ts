import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NetopsManagementRoutingModule } from './netops-management-routing.module';
import { NetopsManagementComponent } from './netops-management.component';
import { SubscriberManagementComponent } from './subscriber-management/subscriber-management.component';
import { ReportsModule } from './reports/reports.module';
import { OperationsModule } from './operations/operations.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigurationModule } from './configuration/configuration.module';
import { SubscriberWizardComponent } from './subscriber-management/subscriber-wizard/subscriber-wizard.component';
import { DeviceWizardComponent } from './subscriber-management/subscriber-wizard/device-wizard/device-wizard.component';
import { ServiceWizardComponent } from './subscriber-management/subscriber-wizard/service-wizard/service-wizard.component';
import { SettingsWizardComponent } from './subscriber-management/subscriber-wizard/settings-wizard/settings-wizard.component';
import { VoiceLineServiceComponent } from './subscriber-management/subscriber-wizard/service-wizard/voice-line-service/voice-line-service.component';
import { WifiSsidServiceComponent } from './subscriber-management/subscriber-wizard/service-wizard/wifi-ssid-service/wifi-ssid-service.component';
import { SharedModule } from './../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { WorkflowStatusComponent } from './workflow-status/workflow-status.component';
import { WorkflowDetailsComponent } from './workflow-details/workflow-details.component';
import { CalendarModule } from 'primeng/calendar';
import { PatternValidatorDirectiveDirective } from './shared/custome-directive/pattern-validator-directive.directive';
import { OrphanDevicesComponent } from './orphan-devices/orphan-devices.component';

import { SysAdminModule } from "src/app/sys-admin/sys-admin.module";
//import { ManagementService } from './subscriber-management/service/management.service';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NetopsManagementComponent,
    SubscriberManagementComponent,
    SubscriberWizardComponent,
    DeviceWizardComponent,
    ServiceWizardComponent,
    SettingsWizardComponent,
    VoiceLineServiceComponent,
    WifiSsidServiceComponent,
    WorkflowStatusComponent,
    WorkflowDetailsComponent,
    PatternValidatorDirectiveDirective,
    OrphanDevicesComponent,


  ],
  imports: [
    CommonModule,
    NetopsManagementRoutingModule,
    ReportsModule,
    OperationsModule,
    ConfigurationModule,
    DataTablesModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    SysAdminModule,
    shared,
  ],
  exports: [
    WifiSsidServiceComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NetopsManagementModule { }
