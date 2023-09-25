import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

import { SupportDeviceRoutingModule } from './support-device-routing.module';
import { SupportDeviceComponent } from './support-device.component';
import { DeviceComponent } from './device/device.component';
import { SignalComponent } from './signal/signal.component';
import { TXRXComponent } from './txrx/txrx.component';
import { SupportWifiModule } from '../support-wifi/support-wifi.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EfficiencyComponent } from './efficiency/efficiency.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [SupportDeviceComponent, DeviceComponent, SignalComponent, TXRXComponent, EfficiencyComponent],
  imports: [
    CommonModule,
    SupportDeviceRoutingModule,
    SharedModule,
    SupportWifiModule,
    NgSelectModule,
    CalendarModule,
    NgxSliderModule,
    DataTablesModule
  ]
})
export class SupportDeviceModule { }
