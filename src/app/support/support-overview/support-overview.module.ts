import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportOverviewRoutingModule } from './support-overview-routing.module';
import { SupportOverviewComponent } from './support-overview.component';
import { IssuesComponent } from './issues/issues.component';
import { TopologyComponent } from './topology/topology.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from "../shared/shared.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { DemoTopologyComponent } from './demo-topology/demo-topology.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportTopologyComponent } from './support-topology/support-topology.component';
import { QualityOfExperienceComponent } from './quality-of-experience/quality-of-experience.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxSliderModule } from '@angular-slider/ngx-slider';




@NgModule({
  declarations: [SupportOverviewComponent, IssuesComponent, TopologyComponent, DemoTopologyComponent, SupportTopologyComponent, QualityOfExperienceComponent],
  imports: [
    CommonModule,
    SupportOverviewRoutingModule,
    SharedModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NgxSliderModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SupportOverviewModule { }
