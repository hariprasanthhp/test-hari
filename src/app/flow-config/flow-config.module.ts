import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowConfigRoutingModule } from './flow-config-routing.module';
import { FlowConfigComponent } from './flow-config.component';
import { LocationsComponent } from './locations/locations.component';
import { FcHeaderComponent } from './fc-header/fc-header.component';
import { FcFooterComponent } from './fc-footer/fc-footer.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';

import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FlowConfigComponent, LocationsComponent, FcHeaderComponent, FcFooterComponent, TabMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlowConfigRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    LocationsComponent,
    FlowConfigComponent
  ],
})
export class FlowConfigModule { }
