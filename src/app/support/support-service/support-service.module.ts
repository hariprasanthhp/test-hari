import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SupportServiceRoutingModule } from './support-service-routing.module';
import { SupportServiceComponent } from './support-service.component';
import { SharedModule } from "../shared/shared.module";
import { DataComponent } from './data/data.component';
import { VideoComponent } from './video/video.component';
import { VoiceComponent } from './voice/voice.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { XdslComponent } from './xdsl/xdsl.component';
import { DataTablesModule } from 'angular-datatables';
import { GfastComponent } from './gfast/gfast.component';


@NgModule({
  declarations: [SupportServiceComponent, DataComponent, VideoComponent, VoiceComponent, XdslComponent, GfastComponent],
  imports: [
    CommonModule,
    SupportServiceRoutingModule,
    SharedModule,
    HighchartsChartModule,
    NgbModule,
    NgSelectModule,
    DataTablesModule
  ]
})
export class SupportServiceModule { }
