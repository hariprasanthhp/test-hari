import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcoWifiRoutingModule } from './cco-wifi-routing.module';
import { SupportWifiModule } from 'src/app/support/support-wifi/support-wifi.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CcoWifiRoutingModule,
    SupportWifiModule
  ]
})
export class CcoWifiModule { }
