import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
//import { TimeserieschartComponent } from '../../shared/timeserieschart/timeserieschart.component';
import { SharedHealthModule } from '../../shared/shared-health.module';


@NgModule({
  // entryComponents: [TimeserieschartComponent],
  declarations: [OverviewComponent, AdvancedComponent],
  imports: [
    NgSelectModule, CommonModule,
    OverviewRoutingModule,
    NgxSliderModule,
    CalendarModule, SharedHealthModule,
    FormsModule, DataTablesModule
  ],

})
export class OverviewModule { }
