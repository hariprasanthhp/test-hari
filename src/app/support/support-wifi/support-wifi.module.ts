import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SupportWifiRoutingModule } from './support-wifi-routing.module';
import { SupportWifiComponent } from './support-wifi.component';
import { RgComponent } from './rg/rg.component';
import { ExtenderComponent } from './extender/extender.component';
import { SSIDComponent } from './ssid/ssid.component';
import { HistorySiteScanComponent } from './charts/history-site-scan/history-site-scan.component';
import { AirTimeAnalysisComponent } from './charts/air-time-analysis/air-time-analysis.component';
import { HistoricalAirTimeComponent } from './charts/historical-air-time/historical-air-time.component';
import { ChannelScoreComponent } from './charts/channel-score/channel-score.component';
import { SignalStrengthComponent } from './extender/signal-strength/signal-strength.component';
import { TxRxComponent } from './extender/tx-rx/tx-rx.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { DataTablesModule } from 'angular-datatables';
import { WifiDownstreamTrafficComponent } from './charts/wifi-downstream-traffic/wifi-downstream-traffic.component';

import { CalendarModule } from 'primeng/calendar';
import { DygraphHistorySiteScanComponent } from './charts/dygraph-history-site-scan/dygraph-history-site-scan.component';

import { wifiMockData } from '../support-wifi/services/wifi-mock-data';
import { DygraphSiteScanService } from './services/dygraph-sitescan.service';
import { DygraphSiteScanUtilsService } from './services/dygraph-sitescan-utils.service';
import { SsidPoolingComponent } from './ssid-pooling/ssid-pooling.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { WanFailoverComponent } from './wan-failover/wan-failover.component';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SupportWifiComponent, RgComponent,
    ExtenderComponent, SSIDComponent, HistorySiteScanComponent,
    AirTimeAnalysisComponent, HistoricalAirTimeComponent, ChannelScoreComponent,
    SignalStrengthComponent, TxRxComponent, WifiDownstreamTrafficComponent, DygraphHistorySiteScanComponent, SsidPoolingComponent, WanFailoverComponent],
  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule,
    SupportWifiRoutingModule,
    SharedModule,
    NgSelectModule,
    HighchartsChartModule,
    DataTablesModule,
    CalendarModule,
    shared,
    ReactiveFormsModule
  ],
  exports: [
    SignalStrengthComponent,
    TxRxComponent,
    RgComponent
  ],
  schemas: [
    /* NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA */
  ],
  providers: [DygraphSiteScanService, DygraphSiteScanUtilsService, wifiMockData]
})
export class SupportWifiModule { }
