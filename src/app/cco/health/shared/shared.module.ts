import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeserieschartComponent } from './timeserieschart/timeserieschart.component';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [TimeserieschartComponent],
  imports: [
    CommonModule, TimeserieschartComponent, CalendarModule
  ],
  exports: [TimeserieschartComponent],


})
export class SharedModule { }
