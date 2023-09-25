import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationReportsComponent } from './reports.component';
import { FoundationReportsRoutingModule } from './reports-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [FoundationReportsComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FoundationReportsRoutingModule
  ]
})
export class FoundationReportsModule { }
