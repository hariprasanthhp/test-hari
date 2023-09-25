import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EndpointRoutingModule } from './endpoint-routing.module';
import { MappingSourceComponent } from './mapping-source/mapping-source.component';
import { ManagementComponent } from './management/management.component';
import { SubnetComponent } from './subnet/subnet.component';
import { SettingsComponent } from './settings/settings.component';
import { EndpointComponent } from './endpoint.component';

import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [MappingSourceComponent, ManagementComponent, SubnetComponent, SettingsComponent, EndpointComponent],
  imports: [
    CommonModule,
    FormsModule,
    EndpointRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule,
    DragDropModule
  ]
})
export class EndpointModule { }
