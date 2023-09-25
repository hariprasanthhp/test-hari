import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationConfigurationComponent } from './foundation-configuration.component';
import { FoundationConfigurationRoutingModule } from './foundation-configuration-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select'
import { CalendarModule } from 'primeng/calendar';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NgSelect2Module } from 'ng-select2';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [FoundationConfigurationComponent,

  ],
  imports: [
    FoundationConfigurationRoutingModule, NgbModule,



    CommonModule,
    DataTablesModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CalendarModule,
    NgSelect2Module,
    NgxMaterialTimepickerModule,

  ]
})
export class FoundationConfigurationModule { }
