import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeserieschartComponent } from './timeserieschart/timeserieschart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { AetimeseriesComponent } from './aetimeseries/aetimeseries.component';

@NgModule({
  declarations: [TimeserieschartComponent, AetimeseriesComponent],
  imports: [
    FormsModule, CommonModule, CalendarModule, NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TimeserieschartComponent, AetimeseriesComponent]
  // entryComponents: [TimeserieschartComponent]


})
export class SharedHealthModule { }
