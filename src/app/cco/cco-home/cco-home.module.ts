import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CcoHomeRoutingModule } from './cco-home-routing.module';
import { CcoHomeComponent } from './cco-home.component';
import { FormsModule } from '@angular/forms';
import { SystemServiceTrendsModule } from './system-service-trends/system-service-trends.module';
import { ActiveDevicesGeomapModule } from './active-devices-geomap/active-devices-geomap.module';
import { AlarmDetailsModalComponent } from './active-devices-geomap/alarm-details-modal/alarm-details-modal.component';
import { AlarmsSharedModule } from '../issues/alarms-shared/alarms-shared.module';

@NgModule({
  declarations: [CcoHomeComponent, AlarmDetailsModalComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    CcoHomeRoutingModule,
    FormsModule, SystemServiceTrendsModule, ActiveDevicesGeomapModule, AlarmsSharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CcoHomeModule { }
