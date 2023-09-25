import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmAckShelveComponent } from './alarm-ack-shelve/alarm-ack-shelve.component';
import { AlarmDetailsComponent } from './alarm-details/alarm-details.component';
import { CommonRealtimeFilterComponent } from './common-realtime-filter/common-realtime-filter.component';
import { CommonActiveFilterComponent } from './common-active-filter/common-active-filter.component';
import { CommonHistoryFilterComponent } from './common-history-filter/common-history-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';

const COMPONENTS = [
  AlarmAckShelveComponent,
  AlarmDetailsComponent,
  CommonRealtimeFilterComponent,
  CommonActiveFilterComponent,
  CommonHistoryFilterComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  exports: COMPONENTS
})
export class AlarmsSharedModule { }
