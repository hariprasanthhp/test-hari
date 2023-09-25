import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandwidthTierTemplatesRoutingModule } from './bandwidth-tier-templates-routing.module';
import { BandwidthTierTemplatesComponent } from './bandwidth-tier-templates.component';
import { BandwidthTiersComponent } from './bandwidth-tiers/bandwidth-tiers.component';
import { AddComponent } from './bandwidth-tiers/add/add.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BandwidthTierTemplatesComponent, BandwidthTiersComponent, AddComponent],
  imports: [
    CommonModule,
    BandwidthTierTemplatesRoutingModule,
    DataTablesModule,
    FormsModule
  ]
})
export class BandwidthTierTemplatesModule { }
