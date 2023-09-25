import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CalendarModule } from 'primeng/calendar';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedHealthModule } from '../../shared/shared-health.module';
//import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    CommonModule,
    NgxSliderModule,
    CalendarModule, 
    SharedHealthModule,
    FormsModule, 
    DataTablesModule
  ]
})
export class ReportsModule { }
