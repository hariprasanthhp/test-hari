import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcoCommonFilterComponent } from './cco-common-filter/cco-common-filter.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedUtilsModule } from 'src/app/shared-utils/shared-utils.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StreamChartComponent } from './stream-chart/stream-chart.component';
import { MultipleChartComponent } from './multiple-chart/multiple-chart.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PonportChartComponent } from './ponport-chart/ponport-chart.component';
import { RecordStreamChartComponent } from './record-stream-chart/record-stream-chart.component';
import { FilterPresetsComponent } from './filter-presets/filter-presets.component';
import { FavoriteEndpointsComponent } from './favorite-endpoints/favorite-endpoints.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [CcoCommonFilterComponent, BarChartComponent, StreamChartComponent, MultipleChartComponent, PonportChartComponent, RecordStreamChartComponent, FilterPresetsComponent, FavoriteEndpointsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CalendarModule,
    HighchartsChartModule,
    SharedUtilsModule,
    NgxSliderModule,
    DataTablesModule,
  ],
  exports: [CcoCommonFilterComponent, BarChartComponent, StreamChartComponent, MultipleChartComponent, PonportChartComponent, RecordStreamChartComponent, FilterPresetsComponent, FavoriteEndpointsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MultipleChartComponent, PonportChartComponent]
})
export class SharedModule { }
