import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkTrendsRoutingModule } from './network-trends-routing.module';
import { NetworkTrendsComponent } from './network-trends.component';
import { NetworkAvailabilityComponent } from './charts/network-availability/network-availability.component';
import { SubscribersImpactedComponent } from './charts/subscribers-impacted/subscribers-impacted.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [NetworkTrendsComponent, NetworkAvailabilityComponent, SubscribersImpactedComponent],
  imports: [
    CommonModule,
    NetworkTrendsRoutingModule,
    FormsModule,
    DataTablesModule,
    FormsModule, NgSelectModule
  ]
})
export class NetworkTrendsModule { }
