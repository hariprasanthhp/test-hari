import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActiveDevicesGeomapRoutingModule } from './active-devices-geomap-routing.module';
import { AlarmsSharedModule } from '../../issues/alarms-shared/alarms-shared.module';
import { ActiveDevicesGeomapComponent } from './active-devices-geomap.component';
import { SystemListComponent } from './system-list/system-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ActiveDevicesGeomapComponent,
    SystemListComponent
  ],
  imports: [
    CommonModule,
    ActiveDevicesGeomapRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AlarmsSharedModule,
    SharedModule
  ]
})
export class ActiveDevicesGeomapModule { }
