import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NetworkRoutingModule } from './network-routing.module';
import { NetworkComponent } from './network.component';
import { DevicesComponent } from './devices/devices.component';
import { SubnetsComponent } from './subnets/subnets.component';
import { StaticSubnetsComponent } from './static-subnets/static-subnets.component';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { RadiusServersComponent } from './radius-servers/radius-servers.component';
import { CombinedSubnetsComponent } from './combined-subnets/combined-subnets.component';


@NgModule({
  declarations: [NetworkComponent, DevicesComponent, SubnetsComponent, StaticSubnetsComponent, RadiusServersComponent, CombinedSubnetsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NetworkRoutingModule,
    DataTablesModule,
    NgSelectModule,
    SharedUtilsModule
  ]
})
export class NetworkModule { }
