import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesConfigurationComponent } from './devices-configuration/devices-configuration.component';
import { DevicesStatusComponent } from './devices-status/devices-status.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DevicesConfigurationComponent,
    DevicesStatusComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule,
    FormsModule,
  ]
})
export class DevicesModule { }
