import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HistoryissueComponent } from './historyreport/historyissue/historyissue.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HighchartsChartModule } from 'highcharts-angular';
import { ActiveissueComponent } from './active-reports/activeissue/activeissue.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { AlarmsSharedModule } from './alarms-shared/alarms-shared.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [IssuesComponent, HistoryissueComponent, ActiveissueComponent],
  imports: [
    CommonModule,
    IssuesRoutingModule,
    FormsModule,
    NgSelectModule,
    NgxSliderModule,
    HighchartsChartModule,
    CalendarModule,
    DataTablesModule,
    ReactiveFormsModule,
    AlarmsSharedModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssuesModule { }
