import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportSystemRoutingModule } from './support-system-routing.module';
import { RouterNewComponent } from './router-new/router-new.component';
import { SupportSystemComponent } from './support-system.component';
import { SharedModule } from "../shared/shared.module";
import { SupportRouterComponent } from './support-router/support-router.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedHealthModule } from 'src/app/cco/health/shared/shared-health.module';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule as shared } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RouterNewComponent,
    SupportSystemComponent,
    SupportRouterComponent
  ],
  imports: [
    CommonModule,
    SupportSystemRoutingModule,
    SharedModule,
    NgSelectModule,
    NgxJsonViewerModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    SharedHealthModule,
    DataTablesModule,
    shared,
  ]
})
export class SupportSystemModule { }
